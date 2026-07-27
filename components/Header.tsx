"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import PartnerBanner from "./PartnerBanner";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // Tarja de parceiro e barra ficam empilhadas no mesmo container fixo,
    // para que o banner nunca cubra a logo.
    <header className="fixed inset-x-0 top-0 z-40">
      <PartnerBanner />

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-ink-950/85 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/40"
            : "bg-gradient-to-b from-ink-950/80 to-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="#topo"
            className="flex items-center gap-2"
            aria-label="Cppem Concursos"
          >
            <Image
              src="/logo-cppem.png"
              alt="Cppem Concursos"
              width={96}
              height={96}
              priority
              className="h-11 w-11 object-contain"
            />
            <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50">
              Supletivo
            </span>
          </Link>

          <nav className="flex items-center gap-5 sm:gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 transition hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
