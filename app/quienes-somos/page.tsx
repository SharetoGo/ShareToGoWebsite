"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Users, Quote } from "lucide-react";
import { ODSSection } from "@/components/ODSSection";
import { useTranslation } from "react-i18next";

export default function QuienesSomos() {
  const { t } = useTranslation();

  const formatBold = (value: string) => {
    const parts = value.split("<bold>");
    if (parts.length === 1) return value;
    return parts.map((part, idx) =>
      idx % 2 === 1 ? (
        <span key={`${value}-${idx}`} className="font-semibold text-[#eaeaea]">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const formatBoldBlack = (value: string) => {
    const parts = value.split("<bold>");
    if (parts.length === 1) return value;
    return parts.map((part, idx) =>
      idx % 2 === 1 ? (
        <span key={`${value}-${idx}`} className="font-semibold text-[#2a2c38]">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };
  const tBold = (key: string) => formatBold(t(key));
  const tBoldBlack = (key: string) => formatBoldBlack(t(key));
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="bg-white overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 md:py-32 bg-[#2a2c38] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-[#9dd187]/20 text-[#9dd187] rounded-full">
                {t("qs_badge")}
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1]">
                {t("qs_hero_titulo")}
              </h1>
              <p className="mb-4 text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                {tBold("qs_hero_texto")}
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                {tBold("qs_hero_texto1")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block aspect-square"
            >
              <div className="absolute inset-0 bg-[#9dd187]/10 rounded-[3rem] rotate-3" />
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                <Image src="/images/about-us-2.png" fill alt="SharetoGo Community" className="object-cover" priority />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MISSION SECTION (The "Editorial" Look) --- */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/about-us.png"
                fill
                alt={t("qs_mision_alt")}
                className="object-cover"
              />
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="space-y-8"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#9dd187]/10 text-[#9dd187]">
                <Target size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2a2c38]">
                {t("qs_mision_titulo")}
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p className="mb-3 leading-relaxed whitespace-pre-line text-xl">
                  {tBoldBlack("qs_mision_texto")}
                </p>
                <p className="leading-relaxed whitespace-pre-line text-xl">
                  {tBoldBlack("qs_mision_texto1")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- STATS / DIVIDER (Impactful Dark Break) --- */}
      <section className="bg-[#f8fafc] py-20 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col items-center text-center">
                <Quote className="text-[#9dd187] mb-6 opacity-40" size={48} />
                <h3 className="text-2xl md:text-3xl italic font-medium text-[#2a2c38] leading-snug">
                   {/* Optional: Add a powerful short quote or leave as space */}
                  {t("qs_tagline")}
                </h3>
            </div>
        </div>
      </section>

      {/* --- TEAM/WHO WE ARE SECTION (Inverted Layout) --- */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="order-2 lg:order-1 space-y-8"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#9dd187]/10 text-[#9dd187]">
                <Users size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2a2c38]">
                {t("qs_equipo_titulo")}
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p className="leading-relaxed text-xl">
                  {tBoldBlack("qs_equipo_texto")}
                </p>
                <p className="mt-3 leading-relaxed text-xl">
                  {tBoldBlack("qs_equipo_texto1")}
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="order-1 lg:order-2 relative aspect-4/5 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.pexels.com/photos/6592674/pexels-photo-6592674.jpeg?_gl=1*u0v39s*_ga*OTcxMTQyMjQ1LjE3NzExNzM3ODY.*_ga_8JE65Q40S6*czE3NzQ5NTY2NTIkbzQkZzEkdDE3NzQ5NTY2ODQkajI4JGwwJGgw"
                fill
                alt={t("qs_equipo_alt")}
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ODS SECTION --- */}
      <section className="bg-[#2a2c38] rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <ODSSection dark />
        </motion.div>
      </section>
    </main>
  );
}