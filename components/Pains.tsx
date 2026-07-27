import { HeartIcon } from "./icons";

const pains = [
  {
    title: "Sem o ensino médio, perdeu concursos e vagas que queria?",
    desc: "Sabemos como dói ver uma oportunidade boa passar só porque faltou o certificado. Isso muda agora.",
  },
  {
    title: "Tem vergonha de mostrar o currículo?",
    desc: "Você não é menos que ninguém. Em 90 dias você pode entregar seu currículo com a cabeça erguida.",
  },
  {
    title: "Sonha com uma faculdade mas acha que é tarde?",
    desc: "Não é tarde. Com o supletivo você sai pronto para se matricular em qualquer faculdade do Brasil.",
  },
  {
    title: "Quer dar orgulho para sua família e seus filhos?",
    desc: "Terminar os estudos é um dos maiores presentes que você pode dar para quem te ama, e para você.",
  },
];

export default function Pains() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/70">
            <HeartIcon className="h-3.5 w-3.5 text-brand" />
            A gente entende você
          </span>
          <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            Se você se identifica com algum desses pontos, chegou sua vez de{" "}
            <span className="text-gradient-brand">virar o jogo</span>.
          </h2>
          <p className="mt-4 text-white/70">
            O mundo cobra um certificado para quase tudo. Mas não precisa ser
            assim para sempre, a solução é mais simples do que você imagina.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {pains.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand/40 hover:bg-white/[0.05]"
            >
              <h3 className="text-lg font-bold text-white sm:text-xl">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70 sm:text-base">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
