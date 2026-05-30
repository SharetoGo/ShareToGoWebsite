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
  Share2 
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
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-2"
          >
            <Badge className="bg-[#9dd187]/20 text-[#2a2c38] hover:bg-[#9dd187]/30 border-none px-4 py-1.5 text-sm font-bold uppercase tracking-widest">
              <Leaf size={14} className="mr-2" />
              {t("ts_hero_badge")}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-[#2a2c38] leading-tight">
              {t("ts_hero_title")}
            </h1>
            <p className="text-lg italic md:text-xl text-gray-600 leading-relaxed">
              {t("ts_hero_sub")}
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {t("ts_hero_desc")}
            </p>
          </motion.div>
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
                  "Capture 100% of employee commuting data",
                  "Precise Scope 3 Emissions tracking",
                  "Seamless integration into ESG reporting",
                  "Incentivize healthy habits (walking & cycling)"
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
              <div className="relative w-1/2 max-w-[260px] aspect-[9/19] rounded-[2.5rem] transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/previews/homeScreen.png"
                  alt="App Screenshot 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Right Phone Screenshot */}
              <div className="relative w-1/2 max-w-[260px] aspect-[9/19] rounded-[2.5rem] transform -rotate-3 hover:rotate-0 transition-transform duration-500">
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
              { icon: Share2, title: "ts_how_step1_title", desc: "ts_how_step1_desc" },
              { icon: MessageSquare, title: "ts_how_step2_title", desc: "ts_how_step2_desc" },
              { icon: Users, title: "ts_how_step3_title", desc: "ts_how_step3_desc" },
            ].map((step, i) => (
              <Card key={i} className="p-8 rounded-3xl border-none shadow-xl hover:shadow-2xl transition-shadow bg-white space-y-4">
                <div className="w-12 h-12 bg-[#9dd187]/10 rounded-2xl flex items-center justify-center text-[#2a2c38]">
                  <step.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#2a2c38]">{t(step.title)}</h3>
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
            className="mt-16 relative aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#2a2c38] border-8 border-white"
          >
            <div className="absolute inset-0 flex items-center justify-center text-white/30 font-bold uppercase tracking-widest text-xs">
              [CANVA JE DOIS AJOUTER UNE PHOTO OU QUELQUE CHOSE ICI POUR ILLUSTRER LE COTE SUSTAINABLE SOCIAL/TRANSPORT]
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
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </Link>
            </motion.div>
            <div className="flex-1 w-full grid grid-cols-2 gap-4">
              <div className="h-64 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                [UN BON SCREENSHOT DE LA PARTIE REPORTING DE L'APP POUR ILLUSTRER LE COTE SUSTAINABLE REPORTING/ESG]
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}