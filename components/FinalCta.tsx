import LeadCtaButton from "./LeadCtaButton";
import { WhatsAppIcon, StarIcon } from "./icons";

export default function FinalCta() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-brand/40 bg-gradient-to-br from-brand/25 via-ink-900 to-ink-950 p-10 shadow-glow-lg sm:p-14">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/30 blur-[100px]"
            aria-hidden="true"
          />
          <div className="relative text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/60 bg-ink-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
              <StarIcon className="h-3.5 w-3.5" /> Comece hoje mesmo
            </span>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              Não deixe o tempo passar de novo.{" "}
              <span className="text-gradient-brand">
                Sua nova vida começa agora.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/80 sm:text-lg">
              Fale com um consultor no WhatsApp. É rápido, humano e sem
              compromisso. A gente te mostra como funciona e ainda pode
              liberar uma condição especial para você começar hoje.
            </p>
            <div className="mt-8 flex justify-center">
              <LeadCtaButton
                origin="cta-final"
                className="inline-flex items-center gap-3 rounded-full bg-brand px-8 py-4 text-base font-black text-ink-950 shadow-glow-lg transition hover:-translate-y-0.5 hover:bg-brand-400"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Falar com consultor agora
              </LeadCtaButton>
            </div>
            <p className="mt-4 text-xs text-white/55">
              Atendimento humano • Resposta rápida • Sem enrolação
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
