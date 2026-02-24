"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, BarChart3, Leaf, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EnterpriseSolutions() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/phone_sharetogo_logo.png"
        alt="Enterprise background"
        fill
        priority={false}
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay (adjust opacity here) */}
      <div className="absolute inset-0 bg-[#2A2C38]/55" />

      {/* Optional: subtle gradient for nicer contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A2C38]/55 via-[#2A2C38]/45 to-[#2A2C38]/65" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Intro */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("empresa_titulo")}
          </h2>

          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            {t("empresa_subtitulo")}
          </p>

          <Link href="/soluciones-empresas">
            <Button className="bg-white text-[#2A2C38] px-8 py-6 rounded-lg shadow-lg hover:scale-[1.04] transition-transform group">
              {t("soluciones_empresas")}
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <ModernCard
            image="/images/enterprise-1.jpg"
            highlight={false}
            badgeText={t("movility_tag")}
            title={t("espacio_movilidad")}
            items={[
              { icon: Building2, title: t("espacio_privado") },
              { icon: Leaf, title: t("conectamos_trayectos") },
              { icon: Building2, title: t("activacion_facil") },
            ]}
          />

          <ModernCard
            image="/images/enterprise-2.jpg"
            highlight
            badgeText={t("impact_tag")}
            title={t("medimos_comunicamos")}
            items={[
              { icon: BarChart3, title: t("panel_control") },
              { icon: Leaf, title: t("datos_esg") },
              { icon: BarChart3, title: t("insights_contenidos") },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function ModernCard({
  image,
  badgeText,
  title,
  items,
  highlight,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      className={`rounded-3xl overflow-hidden transition-shadow shadow-xl hover:shadow-2xl
        ${highlight ? "ring-2 ring-[#9DD187]/50" : ""}`}
    >
      {/* Image */}
      <div className="relative h-64 md:h-72">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="bg-white p-10 space-y-6">
        <div className="text-sm font-semibold text-[#9DD187] uppercase tracking-wide">
          {badgeText}
        </div>

        <h3 className="text-3xl font-bold text-[#2A2C38]">
          {title}
        </h3>

        <div className="space-y-5">
          {items.map((item: any, i: number) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-11 h-11 rounded-xl bg-[#9DD187] flex items-center justify-center">
                  <Icon size={20} color="#2A2C38" />
                </div>
                <p className="font-semibold text-[#2A2C38]">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
