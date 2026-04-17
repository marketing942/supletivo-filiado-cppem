import { CheckIcon, ShieldIcon } from "./icons";

const docs = [
  "Idade mínima de 18 anos",
  "Documento de identificação (RG)",
  "CPF",
  "Foto 3x4",
  "Certidão de nascimento ou casamento",
  "Comprovante de conclusão do ensino fundamental e histórico (quando aplicável)",
  "Título de eleitor",
];

export default function Requirements() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:grid-cols-2 md:p-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
              <ShieldIcon className="h-3.5 w-3.5" />
              Requisitos simples
            </span>
            <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl">
              Só precisa ter <span className="text-gradient-brand">18 anos</span>{" "}
              e vontade de mudar
            </h2>
            <p className="mt-4 leading-relaxed text-white/70">
              Nada de prova de admissão. Nada de burocracia. É só separar os
              documentos, fazer sua matrícula e começar a estudar no mesmo
              dia.
            </p>
          </div>

          <ul className="space-y-3">
            {docs.map((d) => (
              <li
                key={d}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-ink-950">
                  <CheckIcon className="h-3.5 w-3.5" />
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
