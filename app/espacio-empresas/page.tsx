"use client";

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
  CheckCircle2,
  Target,
  Zap,
  ArrowRight,
  Sparkles,
  Briefcase,
  CheckCircle,
  Handshake
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EspacioEmpresas() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const SectionHeader = ({ badge, title, sub, className = "", icon: Icon }: { badge: string; title: string; sub?: string, className?: string, icon?: any }) => (
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

  return (
    <main className="scroll-smooth">
      {/* Hero section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-gradient-to-br from-[#2a2c38] via-[#2a2c38] to-[#1a1c24]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column */}
            <div className="text-white">
              <Badge className="bg-[#9dd187] text-[#1a1c24] mb-6 px-4 py-1.5 text-sm font-bold flex w-fit items-center gap-2 hover:bg-[#8bc374] transition-colors">
                <Sparkles className="w-4 h-4" />
                {t("ee_hero_badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                {t("ee_hero_title")}
              </h1>
              <p className="text-xl text-gray-300 mb-8 text-pretty">
                {t("ee_hero_sub")}
              </p>
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
                  onClick={() =>
                    document
                      .getElementById("casos-exito")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {t("ee_hero_cta_cases")}
                </Button>
              </div>
            </div>

            {/* Right column stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-[#9dd187] mb-2">
                    20
                  </div>
                  <p className="text-white text-sm">
                    {t("ee_hero_stat1_label")}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-[#9dd187] mb-2">
                    300T
                  </div>
                  <p className="text-white text-sm">
                    {t("ee_hero_stat2_label")}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-[#9dd187] mb-2">
                    40%
                  </div>
                  <p className="text-white text-sm">
                    {t("ee_hero_stat3_label")}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-[#9dd187] mb-2">
                    95%
                  </div>
                  <p className="text-white text-sm">
                    {t("ee_hero_stat4_label")}
                  </p>
                </CardContent>
              </Card>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">
              {t("ee_sol_title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("ee_sol_sub")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Large enterprises */}
            <Card className="p-8 border-2 hover:border-[#9dd187] transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#2a2c38] rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="text-white text-2xl" />
                </div>
                <Badge className="bg-[#9dd187] text-white mb-4">
                  {t("ee_sol_large_badge")}
                </Badge>
                <h3 className="text-xl font-semibold text-[#2a2c38] mb-4">
                  {t("ee_sol_large_title")}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t("ee_sol_large_text")}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={28} />
                    <span>{t("ee_sol_large_b1")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={28} />
                    <span>{t("ee_sol_large_b2")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={28} />
                    <span>{t("ee_sol_large_b3")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={28} />
                    <span>{t("ee_sol_large_b4")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={28} />
                    <span>{t("ee_sol_large_b5")}</span>
                  </li>
                </ul>
                <Link href="/contratar">
                  <Button className="w-full bg-[#2a2c38] hover:bg-[#1a1c24] text-white">
                    {t("ee_sol_more")}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Medium companies */}
            <Card className="p-8 border-2 hover:border-[#9dd187] transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#9dd187] rounded-xl flex items-center justify-center mb-6">
                  <Building2 className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#2a2c38] mb-4">
                  {t("ee_sol_mid_title")}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t("ee_sol_mid_text")}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={28} />
                    <span>{t("ee_sol_mid_b1")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={24} />
                    <span>{t("ee_sol_mid_b2")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={20} />
                    <span>{t("ee_sol_mid_b3")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={28} />
                    <span>{t("ee_sol_mid_b4")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={28} />
                    <span>{t("ee_sol_mid_b5")}</span>
                  </li>
                </ul>
                <Link href="/contratar">
                  <Button className="w-full bg-[#9dd187] hover:bg-[#8bc475] text-white">
                    {t("ee_sol_more")}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Startups & SMEs */}
            <Card className="p-8 border-2 hover:border-[#9dd187] transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#9dd187] rounded-xl flex items-center justify-center mb-6">
                  <Zap className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#2a2c38] mb-4">
                  {t("ee_sol_small_title")}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t("ee_sol_small_text")}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={28} />
                    <span>{t("ee_sol_small_b1")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={28} />
                    <span>{t("ee_sol_small_b2")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={28} />
                    <span>{t("ee_sol_small_b3")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={28} />
                    <span>{t("ee_sol_small_b4")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={28} />
                    <span>{t("ee_sol_small_b5")}</span>
                  </li>
                </ul>
                <Link href="/contratar">
                  <Button className="w-full bg-[#9dd187] hover:bg-[#8bc475] text-white">
                    {t("ee_sol_more")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Partnership / industrial park section */}
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1c24] mb-6">
              {t("ee_part_title")}
            </h2>
            <h3 className="text-xl font-medium text-[#4d7c41] max-w-2xl mx-auto mb-8">
              {t("ee_part_sub")}
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
              {t("ee_part_p1")}
            </p>
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
          <SectionHeader 
            badge="Beneficios"
            title={t("ee_ben_title")}
            icon={Award}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Benefit
              icon={
                <BarChart3 className="text-[#9dd187] w-8 h-8" />
              }
              title={t("ee_ben1_title")}
              text={t("ee_ben1_text")}
            />
            <Benefit
              icon={
                <Shield className="text-[#9dd187] w-8 h-8" />
              }
              title={t("ee_ben2_title")}
              text={t("ee_ben2_text")}
            />
            <Benefit
              icon={
                <Users className="text-[#9dd187] w-8 h-8" />
              }
              title={t("ee_ben3_title")}
              text={t("ee_ben3_text")}
            />
            <Benefit
              icon={
                <Leaf className="text-[#9dd187] w-8 h-8" />
              }
              title={t("ee_ben4_title")}
              text={t("ee_ben4_text")}
            />
            <Benefit
              icon={
                <Clock className="text-[#9dd187] w-8 h-8" />
              }
              title={t("ee_ben5_title")}
              text={t("ee_ben5_text")}
            />
            <Benefit
              icon={
                <Award className="text-[#9dd187] w-8 h-8" />
              }
              title={t("ee_ben6_title")}
              text={t("ee_ben6_text")}
            />
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
          <SectionHeader 
            badge="Casos de Éxito"
            title={t("ee_cases_title")}
            sub={t("ee_cases_sub2")}
            icon={Target}
          />

          <div className="text-center">
            <p className="text-xl text-[#1a1c24] font-bold">
              {t("ee_cases_sub3")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Case 1 */}
            <Card className="border-gray-100 shadow-xl shadow-gray-200/50 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#9dd187]/10 rounded-2xl flex items-center justify-center">
                    <Building2 className="text-[#4d7c41]" size={28} />
                  </div>  
                  <div>
                    <h3 className="font-semibold text-[#2a2c38]">Parque Industrial España</h3>
                    <p className="text-gray-600 text-sm">1,200 empleados • Tecnología</p>
                  </div>
                </div>
                <blockquote className="text-gray-600 mb-8 italic text-lg leading-relaxed">
                  {t("ee_case1_quote")}
                </blockquote>
                <div className="grid grid-cols-3 gap-4 text-center bg-gray-50 rounded-2xl p-6">
                  <div className="border-r border-gray-200 last:border-0">
                    <div className="text-3xl font-bold text-[#1a1c24]">
                      60%
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
                      {t("ee_case1_m1_label")}
                    </div>
                  </div>
                  <div className="border-r border-gray-200 last:border-0">
                    <div className="text-3xl font-bold text-[#1a1c24]">
                      78%
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
                      {t("ee_case1_m2_label")}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#1a1c24]">
                      92%
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
                      {t("ee_case1_m3_label")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Case 2 */}
            <Card className="border-gray-100 shadow-xl shadow-gray-200/50 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#1a1c24] rounded-2xl flex items-center justify-center">
                    <Target className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2a2c38]">
                      {t("ee_case2_name")}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t("ee_case2_meta")}
                    </p>
                  </div>
                </div>
                <blockquote className="text-gray-600 mb-8 italic text-lg leading-relaxed">
                  {t("ee_case2_quote")}
                </blockquote>
                <div className="grid grid-cols-3 gap-4 text-center bg-gray-50 rounded-2xl p-6">
                  <div className="border-r border-gray-200 last:border-0">
                    <div className="text-3xl font-bold text-[#1a1c24]">
                      45%
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
                      {t("ee_case2_m1_label")}
                    </div>
                  </div>
                  <div className="border-r border-gray-200 last:border-0">
                    <div className="text-3xl font-bold text-[#1a1c24]">
                      85%
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
                      {t("ee_case2_m2_label")}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#1a1c24]">
                      €180k
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
                      {t("ee_case2_m3_label")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <p className="text-xl text-[#2a2c38] mx-auto font-medium">
                  {t("ee_reality")}
                </p>
                <p className="text-lg text-gray-600 mx-auto font-normal mt-4">
                  {t("ee_reality2")}
                </p>
              </div>
          
        </div>
      </motion.section>
    </main>
  );
}

function Benefit({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="text-center p-8 bg-white rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#9dd187]/10 transition-all duration-300 group">
      <div className="w-16 h-16 bg-[#f4f9eb] rounded-2xl flex items-center justify-center mx-auto mb-6 duration-300">
        <div className="group-hover:text-[#1a1c24] transition-colors duration-300">
        {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-[#1a1c24] mb-3">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
