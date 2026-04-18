import { WHATSAPP_URL } from "@/lib/constants";
import {
  WhatsAppIcon,
  CheckIcon,
  ClockIcon,
  ShieldIcon,
  StarIcon,
} from "./icons";

export default function Hero() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden pt-36 pb-20 sm:pt-40 sm:pb-28"
    >
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 bg-radial-glow" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
            <StarIcon className="h-3.5 w-3.5" />
            Supletivo EJA reconhecido pelo MEC
          </span>

          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Termine o Ensino Fundamental + Médio em{" "}
            <span className="text-gradient-brand">apenas 90 dias!</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/75 sm:text-xl">
            Estude de casa, no seu tempo, com videoaulas e apoio humano. No
            final, você recebe o certificado que abre portas para{" "}
            <strong className="text-white">emprego, faculdade e concursos</strong>{" "}
            em todo o Brasil.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-black text-ink-950 shadow-glow-lg transition hover:-translate-y-0.5 hover:bg-brand-400 sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Quero começar agora
            </a>
            <a
              href="#como-funciona"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Ver como funciona
            </a>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-3 text-sm text-white/80 sm:grid-cols-3 sm:gap-6">
            <li className="flex items-center justify-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand/15 text-brand">
                <ClockIcon className="h-4 w-4" />
              </span>
              100% online, no seu ritmo
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand/15 text-brand">
                <CheckIcon className="h-4 w-4" />
              </span>
              Acesso imediato às aulas
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand/15 text-brand">
                <ShieldIcon className="h-4 w-4" />
              </span>
              Certificado válido em todo o Brasil
            </li>
          </ul>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 text-center sm:mt-20 sm:grid-cols-4 sm:gap-6">
          {[
            { k: "90 dias", v: "para concluir" },
            { k: "100%", v: "online, de casa" },
            { k: "+4.000", v: "alunos formados" },
            { k: "MEC", v: "certificado reconhecido" },
          ].map((item) => (
            <div
              key={item.k}
              className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur"
            >
              <div className="text-2xl font-black text-brand sm:text-3xl">
                {item.k}
              </div>
              <div className="mt-1 text-xs text-white/60 sm:text-sm">{item.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
