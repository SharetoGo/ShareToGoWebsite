"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Building2,
  TrendingUp,
  Shield,
  BarChart3,
  Users,
  Leaf,
  Clock,
  Award,
  Target,
  Zap,
  Sparkles,
  CheckCircle,
  Handshake,
  LucideIcon
} from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * ANIMATION CONSTANTS
 */
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

/**
 * REUSABLE SUB-COMPONENTS
 */

const SectionHeader = ({ badge, title, sub, className = "", icon: Icon }: { badge: string; title: string; sub?: string; className?: string; icon?: LucideIcon }) => (
  <div className={`text-center max-w-3xl mx-auto mb-16 ${className}`}>
    <Badge variant="outline" className="bg-[#9dd187]/10 text-[#4d7c41] border-[#9dd187]/20 pl-3 pr-4 py-1.5 mb-6 rounded-full text-sm font-semibold tracking-wide uppercase flex w-fit mx-auto items-center gap-2 shadow-sm">
      {Icon && <Icon className="w-4 h-4" />}
      {badge}
    </Badge>
    <h2 className="text-3xl md:text-5xl font-bold text-[#1a1c24] tracking-tight mb-6 leading-tight">
      {title}
    </h2>
    {sub && <p className="text-gray-500 text-lg leading-relaxed">{sub}</p>}
  </div>
);

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors duration-300">
    <CardContent className="p-6 text-center">
      <div className="text-3xl font-bold text-[#9dd187] mb-2">{value}</div>
      <p className="text-white text-sm">{label}</p>
    </CardContent>
  </Card>
);

const SolutionCard = ({ icon: Icon, badge, title, text, items, primaryIcon = false, t }: any) => (
  <Card className="p-8 border-2 hover:border-[#9dd187] transition-colors flex flex-col h-full">
    <CardContent className="pt-6 flex-1 flex flex-col p-0">
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${primaryIcon ? "bg-[#2a2c38]" : "bg-[#9dd187]"}`}>
        <Icon className="text-white w-8 h-8" />
      </div>
      {badge && <Badge className="bg-[#9dd187] text-white mb-4 w-fit">{badge}</Badge>}
      <h3 className="text-xl font-semibold text-[#2a2c38] mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{text}</p>
      <ul className="space-y-2 mb-8 flex-1">
        {items.map((item: string, idx: number) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <CheckCircle className="text-[#9dd187] mt-0.5 shrink-0" size={18} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link href="/contratar" className="mt-auto">
        <Button className={`w-full ${primaryIcon ? "bg-[#2a2c38] hover:bg-[#1a1c24]" : "bg-[#9dd187] hover:bg-[#8bc475]"} text-white`}>
          {t("ee_sol_more")}
        </Button>
      </Link>
    </CardContent>
  </Card>
);

const CaseStudyCard = ({ icon: Icon, name, meta, quote, metrics, darkIcon = false }: any) => (
  <Card className="border-gray-100 shadow-xl shadow-gray-200/50 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-300">
    <CardContent className="p-10">
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${darkIcon ? "bg-[#1a1c24]" : "bg-[#9dd187]/10"}`}>
          <Icon className={darkIcon ? "text-white" : "text-[#4d7c41]"} size={28} />
        </div>
        <div>
          <h3 className="font-semibold text-[#2a2c38]">{name}</h3>
          <p className="text-gray-600 text-sm">{meta}</p>
        </div>
      </div>
      <blockquote className="text-gray-600 mb-8 italic text-lg leading-relaxed">
        {quote}
      </blockquote>
      <div className="grid grid-cols-3 gap-4 text-center bg-gray-50 rounded-2xl p-6">
        {metrics.map((m: any, i: number) => (
          <div key={i} className="border-r border-gray-200 last:border-0">
            <div className="text-2xl md:text-3xl font-bold text-[#1a1c24]">{m.val}</div>
            <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mt-1">{m.label}</div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const Benefit = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="text-center p-8 bg-white rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#9dd187]/10 transition-all duration-300 group">
    <div className="w-16 h-16 bg-[#f4f9eb] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
      <div className="group-hover:scale-110 transition-transform duration-300">{icon}</div>
    </div>
    <h3 className="text-xl font-bold text-[#1a1c24] mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{text}</p>
  </div>
);

/**
 * MAIN COMPONENT
 */
export default function EspacioEmpresas() {
  const { t } = useTranslation();

  const solutionData = [
    {
      icon: Zap,
      title: t("ee_sol_small_title"),
      text: t("ee_sol_small_text"),
      items: [t("ee_sol_small_b1"), t("ee_sol_small_b2"), t("ee_sol_small_b3"), t("ee_sol_small_b4"), t("ee_sol_small_b5")],
    },
    {
      icon: TrendingUp,
      badge: t("ee_sol_mid_badge"),
      title: t("ee_sol_mid_title"),
      text: t("ee_sol_mid_text"),
      primaryIcon: true,
      items: [t("ee_sol_mid_b1"), t("ee_sol_mid_b2"), t("ee_sol_mid_b3"), t("ee_sol_mid_b4"), t("ee_sol_mid_b5")],
    },
    {
      icon: Building2,
      title: t("ee_sol_large_title"),
      text: t("ee_sol_large_text"),
      items: [t("ee_sol_large_b1"), t("ee_sol_large_b2"), t("ee_sol_large_b3"), t("ee_sol_large_b4"), t("ee_sol_large_b5")],
    },
  ];

  return (
    <main className="scroll-smooth">
      {/* Hero section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-linear-to-br from-[#2a2c38] via-[#2a2c38] to-[#1a1c24]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="bg-[#9dd187] text-[#1a1c24] mb-6 px-4 py-1.5 text-sm font-bold flex w-fit items-center gap-2 hover:bg-[#8bc374] transition-colors">
                <Sparkles className="w-4 h-4" />
                {t("ee_hero_badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t("ee_hero_title")}</h1>
              <p className="text-xl text-gray-300 mb-8 text-pretty">{t("ee_hero_sub")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contratar">
                  <Button size="lg" className="bg-[#9dd187] text-[#1a1c24] hover:bg-[#8bc374] rounded-full px-8 h-12">
                    {t("ee_hero_cta_demo")}
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full px-8 h-12 bg-transparent backdrop-blur-sm"
                  onClick={() => document.getElementById("casos-exito")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {t("ee_hero_cta_cases")}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StatCard value="20" label={t("ee_hero_stat1_label")} />
              <StatCard value="300 tCO₂e" label={t("ee_hero_stat2_label")} />
              <StatCard value="40%" label={t("ee_hero_stat3_label")} />
              <StatCard value="95%" label={t("ee_hero_stat4_label")} />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Solutions section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">{t("ee_sol_title")}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("ee_sol_sub")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutionData.map((sol, idx) => (
              <SolutionCard key={idx} {...sol} t={t} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Partnership section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-[#f4f9eb] to-white rounded-[3rem] p-12 md:p-16 text-center border border-[#9dd187]/20 shadow-xl shadow-[#9dd187]/5">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#9dd187] text-white mb-8 shadow-lg shadow-[#9dd187]/30 transform -rotate-3">
              <Handshake className="w-10 h-10" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1c24] mb-6">{t("ee_part_title")}</h2>
            <h3 className="text-xl font-medium text-[#4d7c41] max-w-2xl mx-auto mb-8">{t("ee_part_sub")}</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">{t("ee_part_p1")}</p>
          </div>
        </div>
      </motion.section>

      {/* Benefits section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge={t("beneficios_badge")} title={t("ee_ben_title")} icon={Award} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Benefit icon={<BarChart3 className="text-[#9dd187] w-8 h-8" />} title={t("ee_ben1_title")} text={t("ee_ben1_text")} />
            <Benefit icon={<Shield className="text-[#9dd187] w-8 h-8" />} title={t("ee_ben2_title")} text={t("ee_ben2_text")} />
            <Benefit icon={<Users className="text-[#9dd187] w-8 h-8" />} title={t("ee_ben3_title")} text={t("ee_ben3_text")} />
            <Benefit icon={<Leaf className="text-[#9dd187] w-8 h-8" />} title={t("ee_ben4_title")} text={t("ee_ben4_text")} />
            <Benefit icon={<Clock className="text-[#9dd187] w-8 h-8" />} title={t("ee_ben5_title")} text={t("ee_ben5_text")} />
            <Benefit icon={<Award className="text-[#9dd187] w-8 h-8" />} title={t("ee_ben6_title")} text={t("ee_ben6_text")} />
          </div>
        </div>
      </motion.section>

      {/* Case studies section */}
      <motion.section
        id="casos-exito"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-background"
      >
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge={t("ee_cases_title")} title={t("ee_cases_title")} sub={t("ee_cases_sub2")} icon={Target} />

          <div className="text-center mb-12">
            <p className="text-xl text-[#1a1c24] font-bold">{t("ee_cases_sub3")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <CaseStudyCard
              icon={Building2}
              name="Parque Industrial España"
              meta={t("ee_case1_meta")}
              quote={t("ee_case1_quote")}
              metrics={[
                { val: "60%", label: t("ee_case1_m1_label") },
                { val: "78%", label: t("ee_case1_m2_label") },
                { val: "92%", label: t("ee_case1_m3_label") },
              ]}
            />
            <CaseStudyCard
              icon={Target}
              darkIcon
              name={t("ee_case2_name")}
              meta={t("ee_case2_meta")}
              quote={t("ee_case2_quote")}
              metrics={[
                { val: "45%", label: t("ee_case2_m1_label") },
                { val: "85%", label: t("ee_case2_m2_label") },
                { val: "€180k", label: t("ee_case2_m3_label") },
              ]}
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-xl text-[#2a2c38] font-medium">{t("ee_reality")}</p>
            <p className="text-lg text-gray-600 mt-4">{t("ee_reality2")}</p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}