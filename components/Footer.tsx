import Image from "next/image";
import LeadCtaButton from "./LeadCtaButton";
import { WhatsAppIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-950/80 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo-cppem.png"
                alt="Cppem Concursos"
                width={96}
                height={96}
                className="h-12 w-12 object-contain"
              />
              <div>
                <p className="text-lg font-black text-brand">Cppem Concursos</p>
                <p className="text-[11px] uppercase tracking-widest text-white/45">
                  Parceiro filiado · Estação e Cursos
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Ajudamos você a conquistar o certificado do Ensino Médio e
              Fundamental de forma simples, rápida e 100% online.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/50">
              Atendimento
            </p>
            <LeadCtaButton
              origin="rodape"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-ink-950 shadow-glow transition hover:bg-brand-400"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Fale no WhatsApp
            </LeadCtaButton>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/50">
              Sobre este supletivo
            </p>
            <div className="mt-4 rounded-xl border border-brand/20 bg-brand/5 p-4">
              <p className="text-sm leading-relaxed text-white/75">
                Este supletivo é um produto da{" "}
                <strong className="text-white">Estação e Cursos</strong>. A{" "}
                <strong className="text-brand">Cppem Concursos</strong> é
                parceira filiada oficial, responsável pelo seu atendimento,
                orientação e matrícula junto à Estação e Cursos.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Cppem Concursos · Parceiro filiado
          Estação e Cursos. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
