"use client";

import { useState } from "react";
import { ChevronIcon } from "./icons";

const faqs = [
  {
    q: "Em quanto tempo eu termino o supletivo?",
    a: "O prazo mínimo é de 90 dias. Depois de concluir todas as disciplinas e avaliações, o certificado é emitido em até 35 dias úteis.",
  },
  {
    q: "O certificado é reconhecido pelo MEC?",
    a: "Sim. O certificado é válido em todo o território nacional e pode ser usado para concursos públicos, faculdade, promoções no trabalho e qualquer processo que exija nível médio.",
  },
  {
    q: "Eu preciso ir em alguma escola presencial?",
    a: "Não. Tudo é feito 100% online — aulas, materiais e avaliações. Você estuda de casa, no seu celular, computador ou tablet.",
  },
  {
    q: "E se eu não tiver tempo de estudar todo dia?",
    a: "Sem problema. O supletivo é flexível: você define seu horário e estuda no seu ritmo. O mais importante é dar o primeiro passo.",
  },
  {
    q: "Preciso de algum conhecimento prévio?",
    a: "Não precisa ser especialista. As aulas foram gravadas em linguagem simples, pensadas para quem está há muito tempo longe dos estudos.",
  },
  {
    q: "Qual a idade mínima?",
    a: "A idade mínima é de 18 anos.",
  },
  {
    q: "Posso fazer faculdade depois?",
    a: "Sim. Com o certificado em mãos você pode se matricular em qualquer faculdade do Brasil, tanto pública quanto particular.",
  },
  {
    q: "Tem garantia? E se eu me arrepender?",
    a: "Sim. Você tem 7 dias de garantia para experimentar. Se não for para você, devolvemos o seu investimento.",
  },
  {
    q: "O supletivo é da CPPem Concursos?",
    a: "O supletivo é da Estação Cursos, uma empresa especialista em EJA. A CPPem Concursos é parceira oficial, responsável pelo seu atendimento e pela sua matrícula.",
  },
  {
    q: "Posso parcelar no cartão?",
    a: "Sim. Parcelamos em até 12x no cartão. As condições e formas de pagamento são passadas diretamente no WhatsApp.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/70">
            Perguntas frequentes
          </span>
          <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            Tirando suas <span className="text-gradient-brand">dúvidas</span>
          </h2>
          <p className="mt-4 text-white/70">
            Se ainda ficar com alguma pergunta, chama a gente no WhatsApp — a
            resposta é rápida e humana.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`rounded-2xl border transition ${
                  isOpen
                    ? "border-brand/50 bg-brand/[0.04]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-white sm:text-lg">
                    {f.q}
                  </span>
                  <ChevronIcon
                    className={`h-5 w-5 shrink-0 text-brand transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-white/75 sm:text-base">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
