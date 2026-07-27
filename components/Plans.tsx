import { WHATSAPP_MESSAGES } from "@/lib/constants";
import { CheckIcon, WhatsAppIcon, StarIcon } from "./icons";
import LeadCtaButton from "./LeadCtaButton";

const plans = [
  {
    name: "Ensino Médio",
    tag: "Ideal para quem já concluiu o fundamental",
    teaser: "A partir de 12x no cartão",
    description:
      "Conclua o ensino médio 100% online, em 90 dias, com certificado válido em todo o Brasil.",
    features: [
      "Todas as disciplinas do ensino médio",
      "Aulas gravadas em estúdio",
      "Material em PDF para revisar",
      "Apoio especializado no WhatsApp",
      "Certificado reconhecido pelo MEC",
      "Garantia incondicional de 7 dias",
    ],
    ctaMessage: WHATSAPP_MESSAGES.plan_medio,
    highlight: false,
  },
  {
    name: "Fundamental + Médio",
    tag: "Mais completo • Mais escolhido",
    teaser: "A partir de 12x no cartão",
    description:
      "O combo completo para quem precisa recuperar o fundamental e o médio de uma só vez.",
    features: [
      "Ensino Fundamental (anos finais) completo",
      "Ensino Médio completo",
      "Aulas gravadas em estúdio",
      "Materiais em PDF para todas as matérias",
      "Apoio especializado do início ao fim",
      "Certificado único reconhecido pelo MEC",
      "Garantia incondicional de 7 dias",
    ],
    ctaMessage: WHATSAPP_MESSAGES.plan_completo,
    highlight: true,
  },
];

export default function Plans() {
  return (
    <section id="planos" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
            Planos
          </span>
          <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            Escolha o supletivo que{" "}
            <span className="text-gradient-brand">muda sua história</span>
          </h2>
          <p className="mt-4 text-white/70">
            Parcelamos no cartão em até 12x para caber no seu bolso. Os valores
            atualizados e as condições especiais são passadas direto no
            WhatsApp.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`relative flex flex-col rounded-3xl border p-8 transition ${
                p.highlight
                  ? "border-brand/60 bg-gradient-to-b from-brand/10 to-transparent shadow-glow"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand px-4 py-1 text-xs font-black uppercase tracking-wider text-ink-950">
                  <StarIcon className="h-3.5 w-3.5" /> Mais escolhido
                </span>
              )}
              <header>
                <p className="text-xs uppercase tracking-wider text-brand/80">
                  {p.tag}
                </p>
                <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-white/70">{p.description}</p>
              </header>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-wider text-white/60">
                  Investimento
                </p>
                <p className="mt-1 text-2xl font-black text-white">
                  {p.teaser}
                </p>
                <p className="mt-1 text-sm text-white/65">
                  Valor final e condição especial no WhatsApp.
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/85">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/20 text-brand">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <LeadCtaButton
                message={p.ctaMessage}
                origin={`plano-${p.name}`}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black transition ${
                  p.highlight
                    ? "bg-brand text-ink-950 shadow-glow hover:-translate-y-0.5 hover:bg-brand-400"
                    : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Falar com um consultor
              </LeadCtaButton>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center text-sm text-white/65">
          <strong className="text-white">Atenção:</strong> Este supletivo é um
          produto da{" "}
          <strong className="text-brand">Estação e Cursos</strong>. A{" "}
          <strong className="text-white">Cppem Concursos</strong> é parceira
          filiada oficial, cuidamos do seu atendimento, tiramos suas dúvidas
          e fazemos sua matrícula junto à Estação e Cursos.
        </div>
      </div>
    </section>
  );
}
