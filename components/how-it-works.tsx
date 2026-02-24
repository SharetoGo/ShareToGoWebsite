"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const steps = [
  { icon: Users, titleKey: "paso_registro", descKey: "desc_paso_registro", number: "01" },
  { icon: MapPin, titleKey: "paso_matching", descKey: "desc_paso_matching", number: "02" },
  { icon: CheckCircle, titleKey: "paso_trayecto", descKey: "desc_paso_trayecto", number: "03" },
];

// Shared animation variant — no opacity:0 in hidden state keeps elements
// visible even if viewport threshold is never reached on fast scroll
const itemVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="relative py-14 md:py-20 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(157,209,135,0.15) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(157,209,135,0.1) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3 px-3 py-1 rounded-full bg-primary/10">
            {t("como_funciona_titulo")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A2C38] leading-tight">
            {t("carpooling_sencillo")}
          </h2>
        </motion.div>

        {/* STEPS */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* connector line — desktop only */}
          <motion.div
            className="hidden md:block absolute top-11 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px"
            style={{ background: "linear-gradient(to right, #9DD187 0%, #9DD187 100%)" }}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                variants={itemVariant}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Step icon circle */}
                <div className="relative z-10 mb-5">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-md
                               transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{ backgroundColor: "#9DD187" }}
                  >
                    <Icon size={28} color="#2A2C38" strokeWidth={2} />
                  </div>
                  {/* Step number badge */}
                  <span
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-[10px] font-black
                               flex items-center justify-center border-2 border-white"
                    style={{ backgroundColor: "#2A2C38", color: "#fff" }}
                  >
                    {i + 1}
                  </span>
                </div>

                {/* Step number text (decorative) */}
                <span className="text-[3.5rem] font-black leading-none text-[#2A2C38]/5 select-none mb-1">
                  {step.number}
                </span>

                <h3 className="font-bold text-[#2A2C38] mb-2 text-base md:text-lg -mt-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-sm text-[#2A2C38]/60 leading-relaxed max-w-[220px] mx-auto">
                  {t(step.descKey)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/funcionamiento">
            <Button
              className="font-semibold px-8 py-5 rounded-md shadow-md group
                         bg-[#2A2C38] hover:bg-[#9DD187] text-white transition-all duration-300"
            >
              {t("ver_como_funciona")}
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={17}
              />
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
