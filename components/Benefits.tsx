import {
  CheckIcon,
  ClockIcon,
  HomeIcon,
  CertificateIcon,
  PlayIcon,
  BookIcon,
  ShieldIcon,
  HeartIcon,
} from "./icons";

const benefits = [
  {
    icon: ClockIcon,
    title: "Pronto em 90 dias",
    desc: "Esqueça anos de sala de aula. Em 3 meses você já pode ter seu certificado.",
  },
  {
    icon: HomeIcon,
    title: "100% de casa",
    desc: "Não precisa sair, não precisa pedir folga. Estude onde você já está.",
  },
  {
    icon: PlayIcon,
    title: "Aulas gravadas em estúdio",
    desc: "Conteúdo claro, didático e direto ao ponto, feito para quem quer aprender de verdade.",
  },
  {
    icon: BookIcon,
    title: "Materiais em PDF",
    desc: "Baixe, imprima e revise o conteúdo das aulas quantas vezes quiser.",
  },
  {
    icon: CertificateIcon,
    title: "Certificado MEC",
    desc: "Válido em todo o Brasil para concursos, faculdade e mercado de trabalho.",
  },
  {
    icon: HeartIcon,
    title: "Apoio humano de verdade",
    desc: "Uma equipe especializada em supletivos para te orientar do início ao fim.",
  },
  {
    icon: ShieldIcon,
    title: "Garantia de 7 dias",
    desc: "Experimente sem medo. Se não for para você, devolvemos seu investimento.",
  },
  {
    icon: CheckIcon,
    title: "Acesso imediato",
    desc: "Assim que confirmar a matrícula, você já pode começar a estudar.",
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/70">
            Benefícios
          </span>
          <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            Tudo que você precisa para{" "}
            <span className="text-gradient-brand">dar o passo</span>
          </h2>
          <p className="mt-4 text-white/70">
            Feito para quem trabalha, para quem cuida da família e para quem
            quer mudar de vida sem complicar.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-brand/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand/15 text-brand transition group-hover:bg-brand group-hover:text-ink-950">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-white">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
