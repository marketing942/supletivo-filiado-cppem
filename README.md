# Supletivo CPPem

Landing page em Next.js (App Router) e Tailwind CSS para apresentação do
Supletivo EJA (Estação Cursos), tendo a CPPem Concursos como parceira oficial
de atendimento e matrícula.

## Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS 3

## Desenvolvimento

```bash
npm install
npm run dev
```

O site abre em `http://localhost:3000`.

## Deploy na Vercel

1. Crie um projeto em [vercel.com/new](https://vercel.com/new).
2. Importe este repositório.
3. A Vercel detecta o Next.js automaticamente — nenhuma configuração extra é
   necessária.

## Recursos principais

- Header com navegação e botão de WhatsApp.
- Hero persuasivo focado nas dores e sonhos do público.
- Seções de benefícios, como funciona, planos (sem valores fechados), FAQ.
- Botão flutuante de WhatsApp no canto inferior direito.
- Pop-up com condição especial exibido após 20 segundos de navegação.

## Customização rápida

- Link do WhatsApp: `lib/constants.ts` (`WHATSAPP_URL`).
- Links do menu: `lib/constants.ts` (`NAV_LINKS`).
- Cores da marca: `tailwind.config.ts` (palette `brand`).
