import type { Metadata } from "next";
import Script from "next/script";
import { GTM_LOADER_URL } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: "Supletivo Online em 90 Dias | Cppem Concursos",
  description:
    "Termine o Ensino Médio ou Fundamental + Médio em apenas 90 dias, 100% online e com certificado válido em todo o Brasil. Atendimento humano pelo WhatsApp.",
  keywords: [
    "supletivo online",
    "EJA",
    "ensino médio supletivo",
    "terminar ensino médio",
    "certificado MEC",
    "Cppem Concursos",
    "Estação Cursos",
  ],
  openGraph: {
    title: "Termine seus estudos em 90 dias | Supletivo 100% online",
    description:
      "Ensino Médio e Fundamental completos em 90 dias, de casa, com certificado válido em todo o Brasil.",
    type: "website",
    locale: "pt_BR",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans">
        {/* GTM server-side (carrega a PixelX). Sem `id=GTM-XXXX`: o container
            está no path do loader first-party. */}
        <Script id="gtm-loader" strategy="afterInteractive">
          {`(function(w,d,s,l){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'?l='+l:'';j.async=true;j.src=
'${GTM_LOADER_URL}'+dl;f.parentNode.insertBefore(j,f);})
(window,document,'script','dataLayer');`}
        </Script>
        {children}
      </body>
    </html>
  );
}
