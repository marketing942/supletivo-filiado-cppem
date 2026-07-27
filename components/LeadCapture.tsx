"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { LEADS_URL, WHATSAPP_MESSAGES, WHATSAPP_URL } from "@/lib/constants";
import { CloseIcon, WhatsAppIcon } from "./icons";

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

type Errors = Partial<Record<"nome" | "email" | "whatsapp", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function validate(nome: string, email: string, whatsapp: string): Errors {
  const errors: Errors = {};

  const nomeLimpo = nome.trim();
  if (!nomeLimpo) errors.nome = "Informe seu nome completo.";
  else if (nomeLimpo.length < 3) errors.nome = "Nome muito curto.";

  const emailLimpo = email.trim();
  if (!emailLimpo) errors.email = "Informe seu melhor e-mail.";
  else if (!EMAIL_RE.test(emailLimpo)) errors.email = "E-mail inválido.";

  const digitos = whatsapp.replace(/\D/g, "");
  if (!digitos) errors.whatsapp = "Informe seu WhatsApp com DDD.";
  else if (digitos.length < 10 || digitos.length > 15)
    errors.whatsapp = "WhatsApp inválido. Inclua o DDD.";

  return errors;
}

/** Envia o lead para a planilha sem bloquear o redirecionamento. */
function enviarParaPlanilha(payload: Record<string, string>) {
  const corpo = JSON.stringify(payload);

  try {
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([corpo], { type: "text/plain;charset=utf-8" });
      if (navigator.sendBeacon(LEADS_URL, blob)) return Promise.resolve();
    }
  } catch {
    /* segue para o fallback */
  }

  return fetch(LEADS_URL, {
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
  const [message, setMessage] = useState(WHATSAPP_MESSAGES.default);
  const [origin, setOrigin] = useState("site");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [enviando, setEnviando] = useState(false);

  const openLeadForm = useCallback(
    (msg?: string, from?: string) => {
      setMessage(msg || WHATSAPP_MESSAGES.default);
      setOrigin(from || "site");
      setErrors({});
      setEnviando(false);
      setOpen(true);
    },
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enviando) return;

    const found = validate(nome, email, whatsapp);
    setErrors(found);
    // Só conta como lead depois de tudo preenchido corretamente.
    if (Object.keys(found).length > 0) return;

    setEnviando(true);

    const digitos = whatsapp.replace(/\D/g, "");
    const envio = enviarParaPlanilha({
      nome: nome.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      telefone: digitos,
      origem: origin,
      mensagem: message,
      pagina: window.location.href,
      data: new Date().toLocaleString("pt-BR", {
        timeZone: "America/Recife",
      }),
    });

    // Não deixa a planilha atrasar o redirecionamento.
    await Promise.race([
      envio,
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);

    window.location.href = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  }

  const value = useMemo<LeadContextValue>(() => ({ openLeadForm }), [openLeadForm]);

  return (
    <LeadContext.Provider value={value}>
      {children}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-title"
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4"
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

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                <Field
                  id="lead-nome"
                  label="Nome completo"
                  placeholder="Seu nome completo"
                  value={nome}
                  autoComplete="name"
                  error={errors.nome}
                  onChange={(v) => {
                    setNome(v);
                    if (errors.nome) setErrors((p) => ({ ...p, nome: undefined }));
                  }}
                />

                <Field
                  id="lead-email"
                  label="E-mail"
                  type="email"
                  inputMode="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  autoComplete="email"
                  error={errors.email}
                  onChange={(v) => {
                    setEmail(v);
                    if (errors.email)
                      setErrors((p) => ({ ...p, email: undefined }));
                  }}
                />

                <Field
                  id="lead-whatsapp"
                  label="WhatsApp"
                  type="tel"
                  inputMode="tel"
                  placeholder="Ex: (81) 99999-9999"
                  value={whatsapp}
                  autoComplete="tel"
                  error={errors.whatsapp}
                  onChange={(v) => {
                    setWhatsapp(v);
                    if (errors.whatsapp)
                      setErrors((p) => ({ ...p, whatsapp: undefined }));
                  }}
                />

                <button
                  type="submit"
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
      )}
    </LeadContext.Provider>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  inputMode,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  type?: string;
  inputMode?: "text" | "email" | "tel";
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-erro` : undefined}
        className={`w-full rounded-2xl border bg-ink-950/70 px-5 py-4 text-base text-white placeholder:text-white/40 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/40 ${
          error ? "border-red-500/70" : "border-white/10"
        }`}
      />
      {error && (
        <p id={`${id}-erro`} className="mt-1.5 pl-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
