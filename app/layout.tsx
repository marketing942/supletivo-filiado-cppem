import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Supletivo Online em 90 Dias | CPPem Concursos",
  description:
    "Termine o Ensino Médio ou Fundamental + Médio em apenas 90 dias, 100% online e com certificado válido em todo o Brasil. Atendimento humano pelo WhatsApp.",
  keywords: [
    "supletivo online",
    "EJA",
    "ensino médio supletivo",
    "terminar ensino médio",
    "certificado MEC",
    "CPPem Concursos",
    "Estação Cursos",
  ],
  openGraph: {
    title: "Termine seus estudos em 90 dias — Supletivo 100% online",
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
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
