import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const interSans = localFont({
  src: "../_fonts/Inter-Medium.ttf",
  variable: "--font-inter-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gabriel Müller | Desenvolvedor Fullstack",
  description: "Desenvolvedor Fullstack especializado em criar soluções web escaláveis e eficientes. Ofereço serviços de desenvolvimento backend, frontend, APIs, automações e muito mais. Vamos transformar sua ideia em realidade!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} ${interSans.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
