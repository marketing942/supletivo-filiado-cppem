import { SparkIcon, WhatsAppIcon } from "./icons";
import { WHATSAPP_URL } from "@/lib/constants";

const dreams = [
  "Passar em um concurso público",
  "Fazer aquela faculdade que você sempre sonhou",
  "Conquistar uma promoção no trabalho",
  "Sair do subemprego e ganhar mais",
  "Dar orgulho aos seus pais e aos seus filhos",
  "Ter estabilidade financeira e tranquilidade",
  "Finalmente ter a Ficha 19 em mãos",
  "Ser o herói da sua família",
];

export default function Dreams() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="pointer-events-none absolute -left-20 top-1/2 h-[340px] w-[340px] -translate-y-1/2 rounded-full bg-brand/15 blur-[120px]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
              <SparkIcon className="h-3.5 w-3.5" />
              Seu futuro mudando
            </span>
            <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              Imagine sua vida{" "}
              <span className="text-gradient-brand">daqui a 90 dias</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              Não é sonho. É o que acontece com quem dá o primeiro passo hoje.
              Você vai poder dizer com orgulho:{" "}
              <strong className="text-white">
                “eu terminei meus estudos”
              </strong>{" "}
              — e destravar portas que antes pareciam fechadas para sempre.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-black text-ink-950 shadow-glow transition hover:-translate-y-0.5 hover:bg-brand-400"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Quero transformar minha vida
            </a>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {dreams.map((d) => (
              <li
                key={d}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-ink-950">
                  <SparkIcon className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium text-white/90">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
