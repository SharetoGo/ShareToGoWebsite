"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, MapPin, Users, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Funcionamiento() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const driverSlides = [
    {
      image: "/images/conductor1.PNG",
      title: t("driver1_titulo"),
      description: t("driver1_texto"),
    },
    {
      image: "/images/conductor2.PNG",
      title: t("driver2_titulo"),
      description: t("driver2_texto"),
    },
    {
      image: "/images/conductor3.PNG",
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
        <section className="py-16 md:py-24 bg-linear-to-br from-[#2a2c38] to-[#1a1c24] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="bg-white/10 text-white mb-6">
              {t("func_app")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("hero_titulo")}
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-300 italic mb-8">
              {t("hero_sub")}
            </h2>
            <p className="text-xl text-gray-300 mb-8 text-balance">
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
            {/* Paso 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#9dd187] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-[#2a2c38]">
                    {t("paso1_titulo")}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-lg">
                  {t("paso1_texto")}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle
                      className="text-[#9dd187] shrink-0"
                      size={20}
                    />
                    <span>{t("paso1_b1")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle
                      className="text-[#9dd187] shrink-0"
                      size={20}
                    />
                    <span>{t("paso1_b2")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle
                      className="text-[#9dd187] shrink-0"
                      size={20}
                    />
                    <span>{t("paso1_b3")}</span>
                  </li>
                </ul>
              </div>
              <Card className="p-8 bg-gray-50/50 border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-[#9dd187] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <UserPlus className="text-white text-2xl" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-[#2a2c38] mb-2">
                      {t("paso1c_titulo")}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t("paso1c_texto")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Paso 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Card className="p-8 bg-gray-50/50 border-2 border-dashed order-2 lg:order-1">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-[#2a2c38] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MapPin className="text-white text-2xl" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-[#2a2c38] mb-2">
                      {t("paso2c_titulo")}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t("paso2c_texto")}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#2a2c38] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-[#2a2c38]">
                    {t("paso2_titulo")}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-lg">
                  {t("paso2_texto")}
                </p>
                <div className="flex flex-col md:flex-row md:items-center md:gap-8">
                  <ul className="space-y-3 flex-1">
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="text-[#9dd187] shrink-0"
                        size={20}
                      />
                      <span>{t("paso2_b1")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="text-[#9dd187] shrink-0"
                        size={20}
                      />
                      <span>{t("paso2_b2")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="text-[#9dd187] shrink-0"
                        size={20}
                      />
                      <span>{t("paso2_b3")}</span>
                    </li>
                  </ul>
                  <div className="my-6 h-px bg-[#2a2c38] md:my-0 md:w-px md:h-full md:self-stretch" />
                  <ul className="space-y-3 flex-1">
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="text-[#9dd187] shrink-0"
                        size={20}
                      />
                      <span>{t("paso2_b4")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="text-[#9dd187] shrink-0"
                        size={20}
                      />
                      <span>{t("paso2_b5")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="text-[#9dd187] shrink-0"
                        size={20}
                      />
                      <span>{t("paso2_b6")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#9dd187] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-[#2a2c38]">
                    {t("paso3_titulo")}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-lg">
                  {t("paso3_texto")}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle
                      className="text-[#9dd187] shrink-0"
                      size={20}
                    />
                    <span>{t("paso3_b1")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle
                      className="text-[#9dd187] shrink-0"
                      size={20}
                    />
                    <span>{t("paso3_b2")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle
                      className="text-[#9dd187] shrink-0"
                      size={20}
                    />
                    <span>{t("paso3_b3")}</span>
                  </li>
                </ul>
              </div>
              <Card className="p-8 bg-gray-50/50 border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-[#9dd187] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="text-white text-2xl" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-[#2a2c38] mb-2">
                      {t("paso3c_titulo")}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t("paso3c_texto")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
