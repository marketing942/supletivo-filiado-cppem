"use client";

import { useEffect, useState } from "react";
import { WHATSAPP_URL, WHATSAPP_MESSAGES } from "@/lib/constants";
import { WhatsAppIcon } from "./icons";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_MESSAGES.default)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com atendente no WhatsApp"
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-glow transition-all duration-500 hover:-translate-y-1 hover:bg-[#1fba57] sm:bottom-6 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
        <WhatsAppIcon className="relative h-6 w-6" />
      </span>
      <span className="hidden sm:inline">Fale conosco</span>
    </a>
  );
}
