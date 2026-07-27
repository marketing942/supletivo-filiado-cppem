import { BookIcon } from "./icons";

const fundamental = [
  "Língua Portuguesa",
  "Matemática",
  "História",
  "Geografia",
  "Ciências",
  "Inglês",
  "Artes",
  "Educação Física",
  "Ensino Religioso",
];

const medio = [
  "Língua Portuguesa",
  "Matemática",
  "Física",
  "Química",
  "Biologia",
  "História",
  "Geografia",
  "Filosofia",
  "Sociologia",
  "Inglês",
  "Educação Física",
  "Artes",
  "Ensino Religioso",
  "Redação",
];

export default function Subjects() {
  return (
    <section id="disciplinas" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/70">
            <BookIcon className="h-3.5 w-3.5 text-brand" />
            Disciplinas
          </span>
          <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            O que você vai <span className="text-gradient-brand">estudar</span>
          </h2>
          <p className="mt-4 text-white/70">
            Todas as matérias exigidas pelo MEC, explicadas de forma simples e
            objetiva. Você não precisa ser especialista, as aulas foram feitas
            para todo mundo entender.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-black text-white">
              Ensino Fundamental
            </h3>
            <p className="mt-1 text-sm text-white/60">Anos finais</p>
            <ul className="mt-5 grid grid-cols-2 gap-2">
              {fundamental.map((s) => (
                <li
                  key={s}
                  className="rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm text-white/85"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-brand/30 bg-gradient-to-b from-brand/10 to-transparent p-6">
            <h3 className="text-xl font-black text-white">Ensino Médio</h3>
            <p className="mt-1 text-sm text-white/60">Completo</p>
            <ul className="mt-5 grid grid-cols-2 gap-2">
              {medio.map((s) => (
                <li
                  key={s}
                  className="rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm text-white/90"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
