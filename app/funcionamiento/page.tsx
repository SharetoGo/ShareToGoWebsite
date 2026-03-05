"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function Funcionamiento() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const driverSlides = [
    {
      image: "/images/publishScreen2.jpg",
      title: t("driver1_titulo"),
      description: t("driver1_texto"),
    },
    {
      image: "/images/publishScreen2.jpg",
      title: t("driver2_titulo"),
      description: t("driver2_texto"),
    },
    {
      image: "/images/publishScreen2.jpg",
      title: t("driver3_titulo"),
      description: t("driver3_texto"),
    },
  ];

  const passengerSlides = [
    {
      image: "/images/movil2.png",
      title: t("pass1_titulo"),
      description: t("pass1_texto"),
    },
    {
      image: "/images/info_trayecto.PNG",
      title: t("pass2_titulo"),
      description: t("pass2_texto"),
    },
    {
      image: "/images/chat1.png",
      title: t("pass3_titulo"),
      description: t("pass3_texto"),
    },
  ];

  const processSteps = [
    {
      number: 1,
      colorClass: "bg-[#9dd187]",
      title: t("paso1_titulo"),
      description: t("paso1_texto"),
      bullets: [t("paso1_b1"), t("paso1_b2"), t("paso1_b3"), t("paso1_b4")],
      image: "/images/descargar/empresa.jpg",
      imageAlt: t("paso1_img_alt"),
    },
    {
      number: 2,
      colorClass: "bg-[#2a2c38]",
      title: t("paso2_titulo"),
      description: t("paso2_texto"),
      bullets: [t("paso2_b1"), t("paso2_b2"), t("paso2_b3"), t("paso2_b4"), t("paso2_b5")],
      image: "/images/descargar/charla.jpg",
      imageAlt: t("paso2_img_alt"),
    },
    {
      number: 3,
      colorClass: "bg-[#9dd187]",
      title: t("paso3_titulo"),
      description: t("paso3_texto"),
      bullets: [t("paso3_b1"), t("paso3_b2"), t("paso3_b3"), t("paso3_b4")],
      image: "/images/descargar/evento.jpg",
      imageAlt: t("paso3_img_alt"),
    },
    {
      number: 4,
      colorClass: "bg-[#2a2c38]",
      title: t("paso4_titulo"),
      description: t("paso4_texto"),
      bullets: [t("paso4_b1"), t("paso4_b2"), t("paso4_b3"), t("paso4_b4")],
      image: "/images/home/dashboard-mockup.png",
      imageAlt: t("paso4_img_alt"),
    },
  ];

  return (
    <main className="scroll-smooth">
      {/* Hero */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-16"
      >
        <section className="py-16 md:py-24 bg-linear-to-br from-[#eaf6e4] via-[#dff0d7] to-[#f5faf2] text-[#2a2c38]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge
              variant="secondary"
              className="bg-[#2a2c38]/10 text-[#2a2c38] border border-[#2a2c38]/20 mb-6"
            >
              {t("func_app")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("hero_titulo")}
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-[#2a2c38]/80 italic mb-8">
              {t("hero_sub")}
            </h2>
            <p className="text-xl text-[#2a2c38]/80 mb-8 text-balance">
              {t("hero_texto")}
            </p>
          </div>
        </section>

        {/* Conductores / Pasajeros */}
        <section className="py-16 md:py-24 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">
                {t("dual_titulo")}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t("dual_texto")}
              </p>
            </div>

            <div className="flex flex-col items-center gap-12 lg:gap-16">
              <motion.section
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="w-full"
              >
                <InteractiveCard
                  title={t("driver_titulo")}
                  subtitle={t("driver_sub")}
                  slides={driverSlides}
                  isDriver
                />
              </motion.section>

              <motion.section
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="w-full"
              >
                <InteractiveCard
                  title={t("pass_titulo")}
                  subtitle={t("pass_sub")}
                  slides={passengerSlides}
                />
              </motion.section>
            </div>
          </div>
        </section>
      </motion.section>

      {/* Proceso paso a paso */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">
              {t("pasos_titulo")}
            </h2>
            <p className="text-lg text-gray-600">{t("pasos_sub")}</p>
          </div>

          <div className="space-y-16">
            {processSteps.map((step, index) => {
              const textOrderClass = index % 2 === 0 ? "order-1" : "order-1 lg:order-2";
              const imageOrderClass = index % 2 === 0 ? "order-2" : "order-2 lg:order-1";

              return (
                <div key={step.number} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={textOrderClass}>
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-12 h-12 ${step.colorClass} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                      >
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold text-[#2a2c38]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-6 text-lg">{step.description}</p>
                    <ul className="space-y-3">
                      {step.bullets.map((bullet) => (
                        <li key={`${step.number}-${bullet}`} className="flex items-center gap-3">
                          <CheckCircle className="text-[#9dd187] shrink-0" size={20} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Card className={`overflow-hidden ${imageOrderClass}`}>
                    <div className="relative h-72 md:h-80">
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="rounded-3xl border border-[#9dd187]/40 bg-white shadow-sm">
            <div className="px-8 py-10 md:px-12 md:py-12 text-center space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-[#2a2c38]">
                {t("func_contact_title")}
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t("func_contact_text")}
              </p>
              <Button
                asChild
                className="bg-[#2a2c38] text-white hover:bg-[#1e2029] rounded-full px-8"
              >
                <Link href="/contacto">{t("func_contact_cta")}</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
