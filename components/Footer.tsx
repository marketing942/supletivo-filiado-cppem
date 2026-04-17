import { WHATSAPP_URL } from "@/lib/constants";
import { WhatsAppIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-950/80 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand font-black text-ink-950">
                C
              </span>
              <div>
                <p className="text-lg font-black text-brand">CPPem Concursos</p>
                <p className="text-[11px] uppercase tracking-widest text-white/45">
                  Parceiro oficial Estação Cursos
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Ajudamos pessoas como você a conquistarem o certificado do Ensino
              Médio e Fundamental de forma simples, rápida e 100% online.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/50">
              Atendimento
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-ink-950 shadow-glow transition hover:bg-brand-400"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Fale no WhatsApp
            </a>
            <p className="mt-3 text-sm text-white/60">
              Atendimento humano de segunda a sábado.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/50">
              Importante
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Este supletivo é oferecido pela <strong>Estação Cursos</strong>.
              O <strong>CPPem Concursos</strong> atua como parceiro revendedor
              oficial, responsável pelo atendimento e matrícula dos alunos.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} CPPem Concursos. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}
