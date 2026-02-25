"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  MessageSquare,
  LayoutDashboard,
  CalendarDays,
  ChevronRight,
  Check,
  Copy,
  Share2,
  Shield,
  BarChart3,
  Users,
  Leaf,
  Clock,
  Award,
  Target,
  Sparkles,
  Handshake,
  ArrowRight,
  Globe,
  LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

// ─── Easing ───────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Variants — only opacity + y, no blur, no scale, no spring ───────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({
  badge, title, sub, className = "", icon: Icon,
}: {
  badge: string; title: string; sub?: string; className?: string; icon?: LucideIcon;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={stagger}
    className={`text-center max-w-3xl mx-auto mb-16 ${className}`}
  >
    <motion.div variants={fadeUp}>
      <Badge
        variant="outline"
        className="bg-[#9dd187]/10 text-[#4d7c41] border-[#9dd187]/20 pl-3 pr-4 py-1.5 mb-6 rounded-full text-sm font-semibold tracking-wide uppercase flex w-fit mx-auto items-center gap-2 shadow-sm"
      >
        {Icon && <Icon className="w-4 h-4" />}
        {badge}
      </Badge>
    </motion.div>
    <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-[#1a1c24] tracking-tight mb-6 leading-tight">
      {title}
    </motion.h2>
    {sub && (
      <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed">
        {sub}
      </motion.p>
    )}
  </motion.div>
);

// ─── Benefit Card ─────────────────────────────────────────────────────────────
const Benefit = ({ icon, title, text, index }: { icon: React.ReactNode; title: string; text: string; index: number }) => (
  <motion.div
    variants={fadeUp}
    className="relative group p-8 bg-white rounded-[2.5rem] border-t-4 border-t-[#9dd187] border-x border-b border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
  >
    <span className="absolute -bottom-4 -right-2 text-9xl font-black text-gray-50 pointer-events-none select-none">
      0{index + 1}
    </span>
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-[#f4f9eb] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#9dd187] transition-colors duration-300">
          <div className="group-hover:text-white transition-colors duration-300">{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-[#1a1c24] group-hover:text-[#4d7c41] transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-gray-500 text-lg leading-relaxed">
        {text}
      </p>
    </div>
    <div className="absolute bottom-0 left-0 h-0.5 bg-[#9dd187] w-0 group-hover:w-full transition-all duration-500" />
  </motion.div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function EspacioEmpresas() {
  const { t } = useTranslation();
  const [openAccordionItem, setOpenAccordionItem] = React.useState<number | null>(null);

  const getTranslatedList = (key: string): string[] => {
    const list = t(key, { returnObjects: true });
    return Array.isArray(list) ? (list as string[]) : [];
  };

  return (
    <main className="scroll-smooth">
      {/* ── HERO ── */}
      <section className="py-16 md:py-24 bg-linear-to-br from-[#2a2c38] via-[#2a2c38] to-[#1a1c24] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="text-white"
            >
              <motion.div variants={fadeUp}>
                <Badge className="bg-[#9dd187] text-[#1a1c24] mb-6 px-4 py-1.5 text-sm font-bold flex w-fit items-center gap-2 hover:bg-[#8bc374] transition-colors">
                  <Sparkles className="w-4 h-4" />
                  {t("ee_hero_badge")}
                </Badge>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                {t("ee_hero_title")}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-gray-300 mb-8 text-pretty">
                {t("ee_hero_sub")}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <Link href="/contratar">
                  <Button size="lg" className="bg-[#9dd187] text-[#1a1c24] hover:bg-[#8bc374] rounded-full px-8 h-12">
                    {t("ee_hero_cta_demo")}
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-[#9dd187] hover:text-[#1a1c24] rounded-full px-8 h-12 transition-all">
                    {t("ee_hero_cta_contact")}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            >
              <Image
                src="/images/empresas/hero-image.jpg"
                alt="Espacio Empresas Hero"
                width={320}
                height={640}
                className="w-full h-auto rounded-3xl shadow-xl shadow-black/20"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#9dd187]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader badge={t("beneficios_badge")} title={t("ee_ben_title")} icon={Award} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: <BarChart3 size={28} />, title: "ee_ben1_title", text: "ee_ben1_text" },
              { icon: <Shield size={28} />, title: "ee_ben2_title", text: "ee_ben2_text" },
              { icon: <Leaf size={28} />, title: "ee_ben3_title", text: "ee_ben3_text" },
              { icon: <Award size={28} />, title: "ee_ben4_title", text: "ee_ben4_text" },
              { icon: <Clock size={28} />, title: "ee_ben5_title", text: "ee_ben5_text" },
              { icon: <Users size={28} />, title: "ee_ben6_title", text: "ee_ben6_text" },
            ].map((ben, idx) => (
              <Benefit key={idx} index={idx} icon={ben.icon} title={t(ben.title)} text={t(ben.text)} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SUSTAINABILITY CONSULTANCY ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t("consultancy_badge")}
            title={t("consultancy_title")}
            sub={t("consultancy_sub")}
            icon={Globe}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={stagger}
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch"
          >
            {/* Service list */}
            <motion.div variants={fadeUp} className="flex flex-col justify-center">
              <Badge className="bg-[#9dd187]/20 text-[#4d7c41] w-fit mb-6 italic border-[#9dd187]/30">
                {t("consultancy_badge")}
              </Badge>
              <h2 className="text-4xl font-bold text-[#1a1c24] mb-8 leading-tight">
                {t("consultancy_title_short")}
              </h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((num) => (
                  <Link
                    key={num}
                    href={`/consultoria-de-sostenibilidad#service-${num}`}
                    className="group flex items-center justify-between p-6 bg-white rounded-2xl border border-transparent hover:border-[#9dd187] hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[#9dd187] font-bold text-lg">0{num}.</span>
                      <span className="text-[#2a2c38] font-semibold group-hover:text-[#4d7c41] transition-colors">
                        {t(`cons_item${num}_title`)}
                      </span>
                    </div>
                    <ArrowRight className="text-gray-300 group-hover:text-[#9dd187] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Partner spotlight */}
            <motion.div
              variants={fadeUp}
              className="bg-[#2a2c38] rounded-[3rem] p-10 text-white flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-2/3 h-full bg-[#9dd187]/5 skew-x-12 transform translate-x-32 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-white rounded-xl">
                    <Image src="/images/empresas/esc-logo.jpg" alt="ESC Logo" width={320} height={640} className="w-20 h-20 object-contain" priority />
                  </div>
                  <div>
                    <p className="text-[#9dd187] text-xs font-bold uppercase tracking-widest">{t("partner_badge")}</p>
                    <h3 className="text-xl font-bold">European Sustainability Consulting</h3>
                  </div>
                </div>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  {t("partner_description_short") || "Un equipo experto que aporta rigor técnico, metodologías internacionales y resultados auditables."}
                </p>
                <div className="mt-auto">
                  <p className="text-sm text-gray-400 mb-4 font-medium italic">
                    {t("partner_clients_trust") || "Confianza respaldada por:"}
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    {["STADLER", "VEOLIA", "AGBAR", "WALMART"].map((name) => (
                      <span key={name} className="font-bold text-sm tracking-tighter">{name}</span>
                    ))}
                  </div>
                  <Link href="/consultoria-de-sostenibilidad/#strategic-partner-esc">
                    <Button className="mt-10 w-full bg-[#9dd187] hover:bg-[#8bc475] text-[#1a1c24] font-bold py-6 rounded-2xl">
                      {t("see_technical_details") || "Ver detalles técnicos y equipo"}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── COMMUNICATE IMPACT ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={t("comm_badge")} title={t("comm_title")} sub={t("comm_sub")} icon={Sparkles} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Accordion — left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={stagger}
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-5 space-y-6"
            >
              <motion.h3 variants={fadeUp} className="text-2xl font-bold text-[#1a1c24] mb-8 flex items-center gap-3">
                <Target className="text-[#9dd187]" />
                {t("comm_include_title") || "¿Qué incluye este servicio?"}
              </motion.h3>

              {[
                { id: 1, icon: MessageSquare, key: "feat1" },
                { id: 2, icon: LayoutDashboard, key: "feat2" },
                { id: 3, icon: CalendarDays, key: "feat3" },
              ].map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  onClick={() => setOpenAccordionItem(openAccordionItem === item.id ? null : item.id)}
                  className={`cursor-pointer rounded-3xl border-2 transition-colors duration-300 p-6 ${
                    openAccordionItem === item.id
                      ? "bg-white border-[#9dd187] shadow-lg shadow-[#9dd187]/10"
                      : "bg-gray-50 border-transparent hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#9dd187] text-white">
                        <item.icon size={22} />
                      </div>
                      <h4 className="text-lg font-bold text-[#1a1c24]">
                        {t(`comm_${item.key}_title`)}
                      </h4>
                    </div>
                    <motion.div
                      animate={{ rotate: openAccordionItem === item.id ? 90 : 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                    >
                      <ChevronRight className={openAccordionItem === item.id ? "text-[#9dd187]" : "text-gray-300"} />
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {openAccordionItem === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-600 mt-4 leading-relaxed italic">
                          {t(`comm_${item.key}_text`)}
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2">
                          {getTranslatedList(`comm_${item.key}_list`).map((li, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-3 text-sm text-gray-700 font-medium bg-[#9dd187]/5 p-2 rounded-lg"
                            >
                              <Check className="text-[#9dd187]" size={14} strokeWidth={3} />
                              {li}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            {/* Dashboard mockup — right */}
            <div className="lg:col-span-7 sticky top-24">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true, amount: 0.2 }}
                className="relative"
              >
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#9dd187]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

                <Card className="relative border-gray-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden bg-white">
                  <div className="bg-gray-50/80 backdrop-blur-md border-b p-5 flex items-center justify-between">
                    <div className="flex gap-2">
                      {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
                        <div key={color} className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                    <div className="px-3 py-1 bg-white border rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <LayoutDashboard size={12} /> Dashboard Live Preview
                    </div>
                  </div>

                  <div className="bg-gray-100">
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-inner border border-white">
                      <Image
                        src="/images/empresas/contenido-sostenible.png"
                        alt="Sustainable Content Preview"
                        width={320}
                        height={640}
                        className="object-cover w-full h-full"
                        priority
                      />
                      <AnimatePresence mode="wait">
                        {openAccordionItem === 2 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="absolute inset-0 bg-[#2a2c38]/40 flex items-center justify-center p-8"
                          >
                            <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
                              <div className="flex items-center gap-3 mb-4 text-[#4d7c41]">
                                <Copy size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider">{t("comm_copy")}</span>
                              </div>
                              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 1.0, ease: EASE }}
                                  className="h-full bg-[#9dd187]"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </Card>

                {/* Floating badge — static, no loop animation */}
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#f4f9eb] rounded-full flex items-center justify-center">
                    <Share2 size={16} className="text-[#4d7c41]" />
                  </div>
                  <p className="text-xs font-bold text-[#1a1c24]">¡Listo para publicar!</p>
                </div>
              </motion.div>

              {/* Why section */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true, amount: 0.3 }}
                className="mt-10 p-8 bg-[#2a2c38] rounded-4xl text-white"
              >
                <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Sparkles size={18} className="text-[#9dd187]" />
                  {t("comm_why_title")}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">{t("comm_why_text_p1")}</p>
                <p className="text-lg font-bold text-[#8ecb7f]">{t("comm_why_text_p3")}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden bg-[#1a1c24] rounded-[3rem] p-8 md:p-20"
          >
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#9dd187]/10 skew-x-12 transform translate-x-20 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#9dd187]/5 rounded-full blur-3xl pointer-events-none" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={stagger}
              viewport={{ once: true }}
              className="relative z-10 grid lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeUp}>
                <Badge className="bg-[#9dd187] text-[#1a1c24] mb-6 px-4 py-1 font-bold">
                  {t("cta_contact_badge") || "Hablemos de movilidad"}
                </Badge>
                <h2 className="text-4xl md:text-2xl font-bold text-white mb-6 leading-tight">
                  {t("cta_contact_title") || "¿Listo para transformar la movilidad de tu empresa?"}
                </h2>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <Link href="/contacto">
                  <Button size="lg" className="w-full sm:w-auto bg-[#9dd187] text-[#1a1c24] hover:bg-[#8bc475] font-bold py-7 px-10 rounded-2xl text-lg">
                    {t("cta_contact_button") || "Contactar ahora"}
                  </Button>
                </Link>
                <Link href="/contratar">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white bg-transparent hover:bg-white/10 font-bold py-7 px-10 rounded-2xl text-lg">
                    {t("cta_demo_button") || "Solicitar Demo"}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PARTNERSHIP ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={stagger}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            className="bg-linear-to-br from-[#f4f9eb] to-white rounded-[3rem] p-12 md:p-16 text-center border border-[#9dd187]/20 shadow-xl shadow-[#9dd187]/5"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#9dd187] text-white mb-8 shadow-lg shadow-[#9dd187]/30 -rotate-3">
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
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
