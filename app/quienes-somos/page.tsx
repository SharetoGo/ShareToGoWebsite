"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Reviews from "@/components/ui/reviews";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, TrendingUp, Leaf } from "lucide-react";
import { ODSSection } from "@/components/ODSSection";
import { useTranslation } from "react-i18next";

export default function QuienesSomos() {
  const { t } = useTranslation();
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [totalTravels, setTotalTravels] = useState<number>(0);
  const [personas, setPersonas] = useState<number>(0);
  const [co2Saved, setCo2Saved] = useState<number>(0);

  const fetchGlobalStats = async () => {
    try {
      const snap = await getDoc(doc(db, "generalInfo", "globalStats"));

      if (snap.exists()) {
        const data = snap.data();

        // totalTravels
        setTotalTravels(
          typeof data.totalTravels === "number" ? data.totalTravels : 0,
        );

        // totalPassengers
        setPersonas(
          typeof data.totalPassengers === "number" ? data.totalPassengers : 0,
        );

        // totalCo2 (redondeado)
        setCo2Saved(
          typeof data.totalCo2 === "number" ? Math.round(data.totalCo2) : 0,
        );
      }
    } catch (error) {
      console.error("Error fetching global stats:", error);
    }
  };

  useEffect(() => {
    fetchGlobalStats();
  }, []);

  return (
    <main className="scroll-smooth">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-[#2a2c38]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#9dd187] mb-6">
            {t("qs_hero_titulo")}
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-balance">
            {t("qs_hero_texto")}
          </p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Mission Card */}
            <div className="lg:col-span-7">
              <Card className="h-full bg-[#9dd187] border-none shadow-xl">
                <CardContent className="p-8 md:p-12 h-full flex flex-col justify-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-8">
                      <Target className="text-white text-2xl" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-[#2a2c38] mb-8 text-balance">
                      {t("qs_mision_titulo")}
                    </h1>
                  </div>
                  <p className="text-base md:text-lg font-medium text-[#2a2c38] leading-relaxed whitespace-pre-line">
                    {t("qs_mision_texto")}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Mission Image */}
            <div className="lg:col-span-5">
              <div className="h-full min-h-[400px] relative">
                <Image
                  src="/images/about-us.png"
                  width={500}
                  height={500}
                  alt={t("qs_mision_alt")}
                  className="rounded-xl shadow-xl object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-20 bg-[#2a2c38]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            {t("qs_impacto_titulo")}
          </h2>
          <p className="text-xl text-gray-300 mb-16 text-center">
            {t("qs_impacto_texto")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-white border-2 hover:border-[#9dd187] transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#9dd187] rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="text-white text-2xl" />
                </div>
                <div className="text-4xl md:text-6xl font-extrabold text-[#2a2c38] mb-4">
                  {totalTravels.toLocaleString()}
                </div>
                <div className="text-base md:text-lg font-semibold text-[#2a2c38] uppercase tracking-wide">
                  {t("qs_trayectos_label")}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white border-2 hover:border-[#9dd187] transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#2a2c38] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-white text-2xl" />
                </div>
                <div className="text-4xl md:text-6xl font-extrabold text-[#2a2c38] mb-4">
                  {personas.toLocaleString()}
                </div>
                <div className="text-base md:text-lg font-semibold text-[#2a2c38] uppercase tracking-wide">
                  {t("qs_personas_label")}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white border-2 hover:border-[#9dd187] transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#9dd187] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="text-white text-2xl" />
                </div>
                <div className="text-4xl md:text-6xl font-extrabold text-[#2a2c38] mb-4">
                  {co2Saved}
                </div>
                <div className="text-base md:text-lg font-semibold text-[#2a2c38] uppercase tracking-wide">
                  {t("qs_co2_label")}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Who We Are Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Image */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="h-full min-h-[400px] flex items-center justify-center">
                <Image
                  src="/images/about-us-2.png"
                  width={500}
                  height={500}
                  alt={t("qs_equipo_alt")}
                  className="rounded-xl shadow-xl object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Text */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <Card className="h-full bg-[#9dd187] border-none shadow-xl">
                <CardContent className="p-8 md:p-12 h-full flex flex-col justify-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-8">
                      <Users className="text-white text-2xl" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#2a2c38] mb-8 text-balance">
                      {t("qs_equipo_titulo")}
                    </h2>
                  </div>
                  <p className="text-base md:text-lg font-medium text-[#2a2c38] leading-relaxed">
                    {t("qs_equipo_texto")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ODS + Reviews */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <ODSSection dark />
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Reviews />
      </motion.section>
    </main>
  );
}
