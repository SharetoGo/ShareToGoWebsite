"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FaHandshakeSimple } from "react-icons/fa6";
import {
  Building2,
  TrendingUp,
  Shield,
  BarChart3,
  Users,
  Leaf,
  Clock,
  Award,
  CheckCircle,
  Target,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EspacioEmpresas() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

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
              <Badge className="bg-[#9dd187] text-white mb-4">
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
                  <Button className="bg-[#9dd187] hover:bg-[#8bc475] text-white px-8 py-4 text-lg">
                    {t("ee_hero_cta_demo")}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#2a2c38] px-8 py-4 text-lg bg-transparent"
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
              <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-[#9dd187] mb-2">
                    20
                  </div>
                  <p className="text-white text-sm">
                    {t("ee_hero_stat1_label")}
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-[#9dd187] mb-2">
                    300T
                  </div>
                  <p className="text-white text-sm">
                    {t("ee_hero_stat2_label")}
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-[#9dd187] mb-2">
                    40%
                  </div>
                  <p className="text-white text-sm">
                    {t("ee_hero_stat3_label")}
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6 text-center">
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
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("ee_sol_sub2")}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("ee_sol_sub3")}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">
              {t("ee_part_title")}
            </h2>
            <h3 className="text-xl font-medium text-[#2a2c38] max-w-2xl mx-auto mb-6">
              {t("ee_part_sub")}
            </h3>
            <div className="flex justify-center mb-6">
              <div className="bg-[#9dd187] w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                <FaHandshakeSimple className="text-white text-4xl" />
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center mb-2">
              {t("ee_part_p1")}
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center">
              {t("ee_part_p2")}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">
              {t("ee_ben_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Benefit
              icon={
                <BarChart3 className="text-white text-3xl" />
              }
              title={t("ee_ben1_title")}
              text={t("ee_ben1_text")}
              bg="bg-[#9dd187]"
            />
            <Benefit
              icon={
                <Shield className="text-white text-3xl" />
              }
              title={t("ee_ben2_title")}
              text={t("ee_ben2_text")}
              bg="bg-[#2a2c38]"
            />
            <Benefit
              icon={
                <Users className="text-white text-3xl" />
              }
              title={t("ee_ben3_title")}
              text={t("ee_ben3_text")}
              bg="bg-[#9dd187]"
            />
            <Benefit
              icon={
                <Leaf className="text-white text-3xl" />
              }
              title={t("ee_ben4_title")}
              text={t("ee_ben4_text")}
              bg="bg-[#2a2c38]"
            />
            <Benefit
              icon={
                <Clock className="text-white text-3xl" />
              }
              title={t("ee_ben5_title")}
              text={t("ee_ben5_text")}
              bg="bg-[#9dd187]"
            />
            <Benefit
              icon={
                <Award className="text-white text-3xl" />
              }
              title={t("ee_ben6_title")}
              text={t("ee_ben6_text")}
              bg="bg-[#2a2c38]"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">
              {t("ee_cases_title")}
            </h2>
            <p className="text-xl text-gray-600 font-bold">
              {t("ee_cases_sub")}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
              {t("ee_cases_sub2")}
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
              <p className="text-xl text-[#2a2c38] mx-auto font-bold">
                {t("ee_cases_sub3")}
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Case 1 */}
            <Card className="p-8">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#9dd187] rounded-lg flex items-center justify-center">
                    <Building2 className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2a2c38]">Parque Industrial España</h3>
                    <p className="text-gray-600 text-sm">1,200 empleados • Tecnología</p>
                  </div>
                </div>
                <blockquote className="text-gray-600 mb-6 italic">
                  {t("ee_case1_quote")}
                </blockquote>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#9dd187]">
                      60%
                    </div>
                    <div className="text-xs text-gray-600">
                      {t("ee_case1_m1_label")}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#9dd187]">
                      78%
                    </div>
                    <div className="text-xs text-gray-600">
                      {t("ee_case1_m2_label")}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#9dd187]">
                      92%
                    </div>
                    <div className="text-xs text-gray-600">
                      {t("ee_case1_m3_label")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Case 2 */}
            <Card className="p-8">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#2a2c38] rounded-lg flex items-center justify-center">
                    <Target className="text-white" size={24} />
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
                <blockquote className="text-gray-600 mb-6 italic">
                  {t("ee_case2_quote")}
                </blockquote>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#9dd187]">
                      45%
                    </div>
                    <div className="text-xs text-gray-600">
                      {t("ee_case2_m1_label")}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#9dd187]">
                      85%
                    </div>
                    <div className="text-xs text-gray-600">
                      {t("ee_case2_m2_label")}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#9dd187]">
                      €180k
                    </div>
                    <div className="text-xs text-gray-600">
                      {t("ee_case2_m3_label")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <p className="text-xl text-[#2a2c38] mx-auto font-medium">
                  {t("ee_reality")}
                </p>
                <p className="text-l text-[#2a2c38] mx-auto font-normal text-center">
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
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  bg: string;
}) {
  return (
    <div className="text-center">
      <div
        className={`w-20 h-20 ${bg} rounded-full flex items-center justify-center mx-auto mb-6`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#2a2c38] mb-3">
        {title}
      </h3>
      <p className="text-gray-600">
        {text}
      </p>
    </div>
  );
}
