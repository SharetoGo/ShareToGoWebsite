"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Share2,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function TrayectosSostenibles() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-[#9dd187]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left space-y-6"
            >
              <div>
                <Badge className="bg-[#9dd187]/20 text-[#2a2c38] hover:bg-[#9dd187]/30 border-none px-4 py-1.5 text-sm font-bold uppercase tracking-widest mb-4">
                  <Leaf size={14} className="mr-2" />
                  {t("ts_hero_badge")}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-black text-[#2a2c38] leading-tight">
                  {t("ts_hero_title")}
                </h1>
              </div>
              <p className="text-lg italic md:text-xl text-[#9dd187] font-semibold leading-relaxed">
                {t("ts_hero_sub")}
              </p>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                {t("ts_hero_desc")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[300px] md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/trayectos-sostenibles/ts-street.jpg"
                alt={t("ts_hero_title")}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The "Why" Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38]">
                {t("ts_why_title")}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("ts_why_text")}
              </p>
              <div className="space-y-4">
                {[
                  t("ts_why_list1"),
                  t("ts_why_list2"),
                  t("ts_why_list3"),
                  t("ts_why_list4"),
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#9dd187]" size={20} />
                    <span className="font-semibold text-[#2a2c38]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative flex items-center justify-center gap-4 md:gap-8"
            >
              {/* Left Phone Screenshot */}
              <div className="relative w-1/2 max-w-65 aspect-9/19 rounded-[2.5rem] transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/previews/homeScreen.png"
                  alt="App Screenshot 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Right Phone Screenshot */}
              <div className="relative w-1/2 max-w-65 aspect-9/19 rounded-[2.5rem] transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/previews/PublishSustainable.png"
                  alt="App Screenshot 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The "How" Section (Social Focus) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38]">
              {t("ts_how_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Share2,
                title: "ts_how_step1_title",
                desc: "ts_how_step1_desc",
              },
              {
                icon: MessageSquare,
                title: "ts_how_step2_title",
                desc: "ts_how_step2_desc",
              },
              {
                icon: Users,
                title: "ts_how_step3_title",
                desc: "ts_how_step3_desc",
              },
            ].map((step, i) => (
              <Card
                key={i}
                className="p-8 rounded-3xl border-none shadow-xl hover:shadow-2xl transition-shadow bg-white space-y-4"
              >
                <div className="w-12 h-12 bg-[#9dd187]/10 rounded-2xl flex items-center justify-center text-[#2a2c38]">
                  <step.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#2a2c38]">
                  {t(step.title)}
                </h3>
                <p className="text-gray-600 leading-relaxed">{t(step.desc)}</p>
              </Card>
            ))}
          </div>

          {/* Social Feed Interaction Placeholder */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="relative aspect-video lg:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src="/images/trayectos-sostenibles/company-dashboard.png"
                alt="Dashboard Preview"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-[#2a2c38]">
                {t("ts_dashboard_title")}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("ts_dashboard_desc")}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">{t("ts_dashboard_desc2")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reporting Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex-1 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9dd187]/10 text-[#2a2c38] font-black text-xs uppercase tracking-widest">
                <BarChart3 size={14} />
                ESG Insight
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38]">
                {t("ts_esg_report_title")}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("ts_esg_report_desc")}
              </p>
              <Link href="/contacto">
                <Button className="bg-[#2a2c38] hover:bg-black text-white px-8 py-6 rounded-2xl font-bold text-base group shadow-lg">
                  {t("ts_cta_button")}
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative aspect-3/4 w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-[12px] border-white rotate-2 hover:rotate-0 transition-transform duration-500"
            >
              <Image
                src="/images/trayectos-sostenibles/ts-flyer.png"
                alt="SharetoGo Flyer"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Final Impact CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-5xl mx-auto px-4 mt-16"
        >
          <Card className="bg-[#2a2c38] rounded-[3rem] p-8 md:p-16 text-center overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Leaf size={120} className="text-[#9dd187]" />
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
              {t("ts_final_cta_title", "Ve más allá del carpooling")}
            </h3>
            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
              {t("ts_final_cta_desc", "Transforma cada paso, pedalada o trayecto en transporte público en un dato de valor para tu estrategia ESG. Es hora de liderar el cambio.")}
            </p>
            <Button asChild className="bg-[#9dd187] hover:bg-[#8fd07a] text-[#2a2c38] font-bold px-10 py-7 rounded-2xl text-lg shadow-xl transition-all hover:scale-105">
              <Link href="/contratar">
                {t("ts_final_cta_btn", "Activar mi Espacio de Empresa")}
              </Link>
            </Button>
          </Card>
        </motion.div>
      </section>
    </main>
  );
}
