"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Building2, BarChart3, Leaf, LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.65,
      ease: "easeOut" as const,
    },
  }),
};

export default function EnterpriseCards() {
  const { t } = useTranslation();

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Background watermark */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/phone_sharetogo_logo.png"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-[0.06]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Section title */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="inline-block text-3xl font-black uppercase tracking-[0.2em] text-primary mb-3">
            {t("que_ofrecemos")}
          </span>
        </motion.div>

        {/* Alternating cards */}
        <motion.div
          className="space-y-8 md:space-y-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Card 1: image LEFT, text RIGHT */}
          <AlternatingCard
            custom={0}
            variants={cardVariant}
            image="/images/home/company-workers.jpg"
            imageAlt={t("espacio_movilidad")}
            badgeText={t("movility_tag")}
            title={t("espacio_movilidad")}
            items={[
              { icon: Building2, title: t("espacio_privado") },
              { icon: Leaf, title: t("conectamos_trayectos") },
              { icon: Building2, title: t("activacion_facil") },
            ]}
            imageOnLeft
            highlight={false}
          />

          {/* Card 2: text LEFT, image RIGHT */}
          <AlternatingCard
            custom={1}
            variants={cardVariant}
            image="/images/home/dashboard-mockup.png"
            imageAlt={t("medimos_comunicamos")}
            badgeText={t("impact_tag")}
            title={t("medimos_comunicamos")}
            items={[
              { icon: BarChart3, title: t("panel_control") },
              { icon: Leaf, title: t("datos_esg") },
              { icon: BarChart3, title: t("insights_contenidos") },
            ]}
            imageOnLeft={false}
            highlight
          />
        </motion.div>
      </div>
    </section>
  );
}

function AlternatingCard({
  image,
  imageAlt,
  badgeText,
  title,
  items,
  highlight,
  imageOnLeft,
  custom,
  variants,
}: {
  image: string;
  imageAlt: string;
  badgeText: string;
  title: string;
  items: { icon: LucideIcon; title: string }[];
  highlight: boolean;
  imageOnLeft: boolean;
  custom: number;
  variants: Variants;
}) {
  const textContent = (
    <div
      className={`flex flex-col justify-center p-8 md:p-12
        ${highlight ? "bg-[#2A2C38]" : "bg-white"}`}
    >
      {/* Badge */}
      <span
        className={`text-xs font-bold uppercase tracking-widest mb-3
          ${highlight ? "text-primary" : "text-primary"}`}
      >
        {badgeText}
      </span>

      {/* Title */}
      <h3
        className={`text-2xl md:text-3xl font-bold leading-tight mb-6
          ${highlight ? "text-white" : "text-[#2A2C38]"}`}
      >
        {title}
      </h3>

      {/* Items */}
      <ul className="space-y-4">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <li key={i} className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Icon size={18} color="white" />
              </div>
              <p
                className={`font-semibold text-sm md:text-base leading-relaxed pt-2
                  ${highlight ? "text-white/80" : "text-[#2A2C38]"}`}
              >
                {item.title}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const imageContent = (
    <div className="relative min-h-[260px] md:h-full overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );

  return (
    <motion.div
      custom={custom}
      variants={variants}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className={`grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden
        shadow-lg hover:shadow-2xl transition-shadow duration-300
        ${highlight ? "ring-2 ring-primary/30" : ""}`}
    >
      {imageOnLeft ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        <>
          {/* On mobile image always comes first (natural order), on md+ swap */}
          <div className="order-2 md:order-1">{textContent}</div>
          <div className="order-1 md:order-2">{imageContent}</div>
        </>
      )}
    </motion.div>
  );
}
