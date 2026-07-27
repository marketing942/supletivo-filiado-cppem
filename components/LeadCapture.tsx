"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  LEADS_URL,
  PIXELX_FORM_ID,
  WHATSAPP_MESSAGES,
  WHATSAPP_URL,
} from "@/lib/constants";
import { CloseIcon, WhatsAppIcon } from "./icons";

/**
 * Captação de lead + rastreamento (GTM server-side + PixelX).
 *
 * Regras que NÃO podem ser quebradas (ver TRACKING.md):
 *
 * 1. A PixelX se engancha no evento `submit` NATIVO do formulário. Por isso não
 *    existe `onSubmit` do React aqui: o React 18 delega eventos na raiz da
 *    aplicação, então o handler dele rodaria DEPOIS do listener que a PixelX
 *    registra no próprio <form>. Toda a lógica vive num único listener de
 *    `submit` no `document` em FASE DE CAPTURA, que roda sempre antes.
 *
 * 2. Submit inválido morre com `stopImmediatePropagation()`: a PixelX não chega
 *    a ver o evento e nenhum Lead é registrado.
 *
 * 3. Nenhum `send_event('Lead')` manual. Quem dispara o Lead é a regra do painel
 *    da PixelX, no submit. Disparar aqui também geraria lead duplicado.
 *
 * 4. Os inputs são NÃO CONTROLADOS (defaultValue + ref). A PxaMask reescreve
 *    `input.value` direto no DOM e o power-up `form_auto_fill` preenche campos
 *    vazios a cada 5s — um input controlado pelo React brigaria com os dois e a
 *    validação leria um valor diferente do que está na tela.
 *
 * 5. O formulário fica SEMPRE montado (escondido com `display:none` quando o
 *    modal está fechado). `monitor_forms()` roda em `setInterval(..., 5000)`;
 *    se o form só existisse ao abrir o modal, quem preenchesse rápido submeteria
 *    antes da PixelX ter enganchado nele.
 *
 * 6. Sem `form.reset()` e redirecionamento só depois de REDIRECT_DELAY_MS.
 */

/** Alinhado ao debounce de 1500 ms do listener de submit da PixelX. */
const REDIRECT_DELAY_MS = 1500;

type LeadContextValue = {
  /** Abre o pop-up de captação. `message` é o texto que segue para o WhatsApp. */
  openLeadForm: (message?: string, origin?: string) => void;
};

const LeadContext = createContext<LeadContextValue | null>(null);

export function useLeadCapture() {
  const ctx = useContext(LeadContext);
  if (!ctx) {
    throw new Error("useLeadCapture precisa estar dentro de <LeadProvider>");
  }
  return ctx;
}

type FieldName = "name" | "email" | "phone";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * Valida por DÍGITOS, removendo o prefixo do país pelo `+` literal.
 *
 * Contar `length` da string quebra com a máscara, e contar dígitos sem tirar o
 * país aceita número incompleto: `+55 (81) 9996-741` tem 11 dígitos porque o
 * `{55}` da máscara é texto fixo, não algo que o visitante digitou.
 *
 * Remover pelo `+` (e não pelos dígitos "55") é proposital: o DDD 55 existe
 * (Santa Maria/RS), e tanto a máscara quanto o `phone_valid()` da PixelX sempre
 * escrevem o `+`.
 */
function isPhone(value: string) {
  const nacional = value.trim().replace(/^\+\s*55\s*/, "");
  const digitos = nacional.replace(/\D/g, "");

  return digitos.length === 11 && digitos[2] === "9";
}

function validate(nome: string, email: string, phone: string): Errors {
  const errors: Errors = {};

  const nomeLimpo = nome.trim();
  if (!nomeLimpo) errors.name = "Informe seu nome completo.";
  else if (nomeLimpo.length < 3) errors.name = "Nome muito curto.";

  const emailLimpo = email.trim();
  if (!emailLimpo) errors.email = "Informe seu melhor e-mail.";
  else if (!EMAIL_RE.test(emailLimpo)) errors.email = "E-mail inválido.";

  const phoneLimpo = phone.trim();
  if (!phoneLimpo) errors.phone = "Informe seu WhatsApp com DDD.";
  else if (!isPhone(phoneLimpo))
    errors.phone = "WhatsApp inválido. Use DDD + 9 dígitos.";

  return errors;
}

/** Número nacional só com dígitos, sem o país, para gravar na planilha. */
function digitosNacionais(value: string) {
  return value.trim().replace(/^\+\s*55\s*/, "").replace(/\D/g, "");
}

/** Envia o lead para a planilha sem bloquear o redirecionamento. */
function enviarParaPlanilha(payload: Record<string, string>) {
  const corpo = JSON.stringify(payload);

  try {
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([corpo], { type: "text/plain;charset=utf-8" });
      if (navigator.sendBeacon(LEADS_URL, blob)) return;
    }
  } catch {
    /* segue para o fallback */
  }

  void fetch(LEADS_URL, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: corpo,
  }).catch(() => undefined);
}

export default function LeadProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [enviando, setEnviando] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);

  // Refs (e não state) porque o listener de captura é registrado uma única vez.
  const messageRef = useRef(WHATSAPP_MESSAGES.default);
  const originRef = useRef("site");
  /** Trava anti-duplicidade: um envio válido por carregamento de página. */
  const enviadoRef = useRef(false);

  const openLeadForm = useCallback((msg?: string, from?: string) => {
    messageRef.current = msg || WHATSAPP_MESSAGES.default;
    originRef.current = from || "site";
    setErrors({});
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !enviadoRef.current) setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    nameRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Barreira única de submit. Registrada no document, em fase de captura, para
  // rodar antes de qualquer listener que a PixelX registre no <form>.
  useEffect(() => {
    const onSubmitCapture = (event: Event) => {
      const form = formRef.current;
      if (!form || event.target !== form) return;

      // Nunca recarregar a página.
      event.preventDefault();

      // Segundo submit (duplo clique, Enter repetido): o evento morre aqui,
      // então a PixelX não registra um segundo Lead.
      if (enviadoRef.current) {
        event.stopImmediatePropagation();
        return;
      }

      const nome = nameRef.current?.value ?? "";
      const email = emailRef.current?.value ?? "";
      const phone = phoneRef.current?.value ?? "";

      const encontrados = validate(nome, email, phone);

      if (Object.keys(encontrados).length > 0) {
        // Inválido: mata o evento antes da PixelX. Não conta como lead.
        event.stopImmediatePropagation();
        setErrors(encontrados);

        const primeiro: FieldName = encontrados.name
          ? "name"
          : encontrados.email
            ? "email"
            : "phone";
        const alvo =
          primeiro === "name"
            ? nameRef.current
            : primeiro === "email"
              ? emailRef.current
              : phoneRef.current;
        alvo?.focus();
        return;
      }

      // Válido: trava, grava na planilha e DEIXA O EVENTO PROPAGAR para que a
      // regra do painel da PixelX registre o Lead. Nada de send_event aqui.
      enviadoRef.current = true;
      setErrors({});
      setEnviando(true);

      enviarParaPlanilha({
        nome: nome.trim(),
        email: email.trim(),
        whatsapp: phone.trim(),
        telefone: digitosNacionais(phone),
        origem: originRef.current,
        mensagem: messageRef.current,
        pagina: window.location.href,
        data: new Date().toLocaleString("pt-BR", {
          timeZone: "America/Recife",
        }),
      });

      // Sem form.reset(): a PixelX ainda vai ler os campos depois do submit.
      window.setTimeout(() => {
        window.location.href = `${WHATSAPP_URL}?text=${encodeURIComponent(
          messageRef.current,
        )}`;
      }, REDIRECT_DELAY_MS);
    };

    document.addEventListener("submit", onSubmitCapture, true);
    return () => document.removeEventListener("submit", onSubmitCapture, true);
  }, []);

  const value = useMemo<LeadContextValue>(() => ({ openLeadForm }), [openLeadForm]);

  const limparErro = (campo: FieldName) =>
    setErrors((anteriores) =>
      anteriores[campo] ? { ...anteriores, [campo]: undefined } : anteriores,
    );

  return (
    <LeadContext.Provider value={value}>
      {children}

      {/* Sempre montado: `display:none` quando fechado tira do foco e da árvore
          de acessibilidade, mas mantém o <form> no DOM para a PixelX enganchar. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-title"
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] items-center justify-center overflow-y-auto p-4 ${
          open ? "flex" : "hidden"
        }`}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <div className="relative my-auto w-full max-w-md overflow-hidden rounded-3xl border border-brand/50 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-950 p-7 shadow-glow-lg animate-fade-in-up sm:p-9">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-brand/25 blur-[100px]"
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar formulário"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <CloseIcon className="h-4 w-4" />
          </button>

          <div className="relative">
            <h3
              id="lead-title"
              className="pr-10 text-2xl font-black uppercase leading-tight tracking-tight text-brand sm:text-3xl"
            >
              Falta só um passo!
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Já vamos te levar direto para o nosso atendimento no WhatsApp.
              Antes, preencha seus dados abaixo:
            </p>

            <form
              ref={formRef}
              id={PIXELX_FORM_ID}
              name="lead_form"
              noValidate
              className="mt-6 space-y-4"
            >
              <Field
                id="lead_name"
                name="name"
                label="Nome completo"
                placeholder="Seu nome completo"
                autoComplete="name"
                inputRef={nameRef}
                error={errors.name}
                onInput={() => limparErro("name")}
              />

              <Field
                id="lead_email"
                name="email"
                label="E-mail"
                type="email"
                inputMode="email"
                placeholder="seuemail@exemplo.com"
                autoComplete="email"
                inputRef={emailRef}
                error={errors.email}
                onInput={() => limparErro("email")}
              />

              <Field
                id="lead_phone"
                name="phone"
                label="WhatsApp"
                type="tel"
                inputMode="tel"
                placeholder="Ex: (81) 99999-9999"
                autoComplete="tel"
                /* pxa_mask_phone: a PixelX só aplica máscara se `phone_mask`
                   estiver configurado no painel. Sem isso, digitação livre. */
                inputClassName="pxa_mask_phone"
                inputRef={phoneRef}
                error={errors.phone}
                onInput={() => limparErro("phone")}
              />

              {/* type="submit" e id próprio. Nunca name="submit": um controle
                  com esse nome sobrescreve o método form.submit(). */}
              <button
                type="submit"
                id="lead_submit"
                disabled={enviando}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-black uppercase tracking-wide text-ink-950 shadow-glow transition hover:-translate-y-0.5 hover:bg-[#1fba57] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:text-base"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {enviando ? "Redirecionando..." : "Enviar e falar no WhatsApp"}
              </button>
            </form>

            <p className="mt-4 text-center text-[11px] text-white/45">
              Seus dados estão seguros. Redirecionamento imediato.
            </p>
          </div>
        </div>
      </div>
    </LeadContext.Provider>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  error,
  inputRef,
  onInput,
  type = "text",
  inputMode,
  autoComplete,
  inputClassName = "",
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  error?: string;
  inputRef: React.Ref<HTMLInputElement>;
  onInput: () => void;
  type?: string;
  inputMode?: "text" | "email" | "tel";
  autoComplete?: string;
  inputClassName?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {/* Não controlado de propósito: a máscara e o auto-fill da PixelX escrevem
          direto no DOM. Ver nota 4 no topo do arquivo. */}
      <input
        ref={inputRef}
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        onInput={onInput}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}_erro` : undefined}
        className={`w-full rounded-2xl border bg-ink-950/70 px-5 py-4 text-base text-white placeholder:text-white/40 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/40 ${
          error ? "border-red-500/70" : "border-white/10"
        } ${inputClassName}`}
      />
      {error && (
        <p id={`${id}_erro`} className="mt-1.5 pl-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
