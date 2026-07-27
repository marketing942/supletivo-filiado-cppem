"use client";

import { useEffect, useState } from "react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import { CloseIcon, WhatsAppIcon, StarIcon, ClockIcon } from "./icons";
import { useLeadCapture } from "./LeadCapture";

const STORAGE_KEY = "cppem_popup_shown_v1";
const DELAY_MS = 20_000;

export default function OfferPopup() {
  const [open, setOpen] = useState(false);
  const { openLeadForm } = useLeadCapture();

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }

    const timer = setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-brand/50 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-950 p-8 text-center shadow-glow-lg animate-fade-in-up sm:p-10">
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-brand/30 blur-[100px]"
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fechar pop-up"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/60 bg-brand/15 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-brand">
            <StarIcon className="h-3.5 w-3.5" />
            Só pra você, só agora
          </span>

          <h3
            id="offer-title"
            className="mt-5 text-2xl font-black leading-tight text-white sm:text-3xl"
          >
            Você ganhou uma{" "}
            <span className="text-gradient-brand">condição especial!</span>
          </h3>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
            Se iniciar seu supletivo <strong>HOJE</strong>, liberamos uma{" "}
            <strong className="text-brand">oferta exclusiva</strong> com
            desconto e condição facilitada no pagamento. Fale com um consultor
            no WhatsApp agora mesmo e garanta sua vaga.
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/60">
            <ClockIcon className="h-4 w-4 text-brand" />
            Válido apenas enquanto as vagas de hoje durarem
          </div>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openLeadForm(WHATSAPP_MESSAGES.popup, "popup-oferta");
            }}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-black text-ink-950 shadow-glow transition hover:-translate-y-0.5 hover:bg-brand-400 sm:text-base"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Quero minha condição especial
          </button>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 text-xs font-medium text-white/50 underline-offset-4 transition hover:text-white/80 hover:underline"
          >
            Não, obrigado, prefiro deixar para depois
          </button>
        </div>
      </div>
    </div>
  );
}
