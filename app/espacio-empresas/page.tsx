"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { HeroSection } from "@/components/espacio-empresa/HeroSection";
import { BenefitSection } from "@/components/espacio-empresa/BenefitSection";
import { ConsultancySection } from "@/components/espacio-empresa/ConsultancySection";
import { ImpactSection } from "@/components/espacio-empresa/ImpactSection";
import { CTASection } from "@/components/espacio-empresa/CTASection";
import { PartnerSection } from "@/components/contenido-sostenible/PartnerSection";

export default function EspacioEmpresas() {
  const { t } = useTranslation();

  return (
    <main className="scroll-smooth">
      <HeroSection t={t} />
      <BenefitSection t={t} />
      <ConsultancySection t={t} />
      <ImpactSection t={t} />
      <CTASection t={t} />
      <PartnerSection t={t} />
    </main>
  );
}
