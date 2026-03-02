"use client";

import { HeroSection } from "@/components/contenido-sostenible/HeroSection";
import { Services } from "@/components/contenido-sostenible/ServicesSection";
import { useTranslation } from "react-i18next";
import { MethodologySection } from "@/components/contenido-sostenible/MethodologySection";
import { PartnerSection } from "@/components/contenido-sostenible/PartnerSection";

export default function ConsultoriaSostenibilidad() {
  const { t } = useTranslation();

  return (
    <main className="bg-white min-h-screen">
      <HeroSection t={t} />
      <Services t={t} />
      <MethodologySection t={t} />
      <PartnerSection t={t} />
    </main>
  );
}
