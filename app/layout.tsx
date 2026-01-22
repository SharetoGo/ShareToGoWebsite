import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Suspense } from "react";
import ClientI18nProvider from "@/components/ClientI18nProvider";
import ConditionalFooterWrapper from "../components/common/ConditionalFooterWrapper";

export const metadata: Metadata = {
  title: "ShareToGo - Plataforma de coche compartido para empresas",
  description:
    "Optimiza la movilidad corporativa y fomenta la sostenibilidad con ShareToGo, la plataforma de coche compartido diseñada para empresas.",
  keywords: [
    "ShareToGo",
    "coche compartido",
    "movilidad corporativa",
    "sostenibilidad empresarial",
    "plataforma de coche compartido",
    "optimización de transporte",
    "empleados",
  ],
 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientI18nProvider>
            <Navigation />
            {children}
            <ConditionalFooterWrapper>
              <Footer />
            </ConditionalFooterWrapper>
          </ClientI18nProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
