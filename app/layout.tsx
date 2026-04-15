import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Suspense } from "react";
import ClientI18nProvider from "@/components/ClientI18nProvider";
import ConditionalFooterWrapper from "../components/common/ConditionalFooterWrapper";

export const metadata: Metadata = {
  title: "SharetoGo - Plataforma de coche compartido para empresas",
  description:
    "Impulsa la movilidad sostenible en tu empresa con SharetoGo, la plataforma que permite a los empleados compartir coche y registrar trayectos sostenibles, mientras la empresa obtiene datos ESG verificables sobre su movilidad.",
  keywords: [
    "SharetoGo",
    "carpooling",
    "coche compartido",
    "carpooling corporativo",
    "coche compartido empresa",
    "movilidad corporativa",
    "movilidad sostenible empresas",
    "movilidad al trabajo",
    "plan de movilidad sostenible",
    "PMST",
    "software movilidad corporativa",
    "plataforma movilidad empleados",
    "optimización de transporte",
    "sostenibilidad empresarial",
    "alcance 3 commuting",
    "huella de carbono empleados",
    "datos ESG movilidad",
    "ISO 14064-1",
    "GHG Protocol commuting",
    "reducir CO2 commuting"
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
        <SpeedInsights />
      </body>
    </html>
  );
}
