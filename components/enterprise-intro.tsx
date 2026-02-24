"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EnterpriseIntro() {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/carpool_video.mp4"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#1a1c26]/75" />

      {/* Subtle color accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1c26]/60 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Badge */}
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/15">
            {t("company_intro_tag")}
          </span>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {t("empresa_titulo")}
            </h2>

            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              {t("empresa_subtitulo")}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/espacio-empresas">
              <Button
                className="group bg-primary hover:bg-primary/90 text-white px-8 py-6
                           text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl
                           transition-all duration-300"
                size="lg"
              >
                {t("soluciones_empresas")}
                <ArrowRight
                  className="ml-3 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
