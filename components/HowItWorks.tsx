import { PlayIcon, BookIcon, CertificateIcon, HeartIcon } from "./icons";

const steps = [
  {
    icon: HeartIcon,
    title: "1. Fale com nosso time no WhatsApp",
    desc: "Nosso atendente vai tirar suas dúvidas, entender seu caso e te mandar o link da matrícula com segurança.",
  },
  {
    icon: PlayIcon,
    title: "2. Assista às aulas gravadas",
    desc: "Acesso imediato. Estude quando e onde quiser — pelo celular, computador ou tablet. No seu ritmo, sem pressão.",
  },
  {
    icon: BookIcon,
    title: "3. Faça as avaliações online",
    desc: "Ao terminar cada matéria, você faz a prova direto pela internet, com material em PDF para revisar.",
  },
  {
    icon: CertificateIcon,
    title: "4. Receba seu certificado",
    desc: "Em até 40 dias após a conclusão, o certificado chega em suas mãos — válido em todo o Brasil e reconhecido pelo MEC.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
            Como funciona
          </span>
          <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            Simples, rápido e{" "}
            <span className="text-gradient-brand">sem complicação</span>.
          </h2>
          <p className="mt-4 text-white/70">
            Em apenas 4 passos, você sai da dúvida e entra no caminho do seu
            certificado.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.title}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {s.desc}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
