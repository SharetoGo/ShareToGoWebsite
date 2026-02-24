"use client";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Shield,
  CheckCircle,
  Globe,
  Award,
  FileText,
  ArrowLeft,
  Sparkle,
  ExternalLink,
  Landmark,
  GraduationCap,
  Recycle,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useTranslation } from "react-i18next";

// ─── Typed easing curves ──────────────────────────────────────────────────────
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_OUT },
  },
};

const fadeSlideLeft = {
  hidden: { opacity: 0, x: -30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

const barReveal = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: EASE_OUT, delay: 0.3 },
  },
};

// ─── Counter component ────────────────────────────────────────────────────────
function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => String(Math.round(v)).padStart(2, "0"));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, value, {
      duration: 1.4,
      ease: EASE_OUT,
      delay: 0.2,
    });
    return controls.stop;
  }, [inView, motionVal, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ConsultoriaSostenibilidad() {
  const { t } = useTranslation();

  const getTranslatedList = (key: string): string[] => {
    const list = t(key, { returnObjects: true });
    return Array.isArray(list) ? (list as string[]) : [];
  };

  return (
    <main className="bg-white min-h-screen">
      {/* ── HERO ── */}
      <section className="relative pt-24 pb-20 bg-[#1a1c24] overflow-hidden">
        {/* Animated diagonal background */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="absolute top-0 right-0 w-1/2 h-full bg-[#9dd187]/5 skew-x-12 transform translate-x-32"
        />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link
              href="/espacio-empresas"
              className="inline-flex items-center text-[#9dd187] mb-12 hover:-translate-x-2 transition-all"
            >
              <ArrowLeft size={20} className="mr-2" /> {t("back_to_empresas")}
            </Link>
          </motion.div>

          <div className="max-w-3xl">
            {/* Badge bounce */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_SPRING }}
            >
              <Badge className="bg-[#9dd187] text-[#1a1c24] mb-6 px-4 py-1 font-bold text-sm">
                <Sparkle size={16} className="inline-block mr-1" />
                {t("consultancy_page_badge")}
              </Badge>
            </motion.div>

            {/* Heading word-by-word reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight"
            >
              {t("consultancy_full_title")}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-12">
            {[1, 2, 3, 4].map((num) => (
              <motion.div
                key={num}
                id={`service-${num}`}
                initial="hidden"
                whileInView="visible"
                variants={cardVariant}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
                className="scroll-mt-24 bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-100 transition-shadow hover:shadow-xl hover:shadow-gray-200/50"
              >
                <div className="grid lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-4">
                    {/* Animated counter */}
                    <span className="text-[#9dd187] font-black text-6xl opacity-20 block mb-4">
                      <AnimatedNumber value={num} />
                    </span>
                    <motion.h2
                      variants={fadeSlideLeft}
                      className="text-3xl font-bold text-[#2a2c38] mb-6"
                    >
                      {t(`cons_item${num}_title`)}
                    </motion.h2>
                    {/* Bar expands on scroll */}
                    <motion.div
                      variants={barReveal}
                      className="w-20 h-1.5 bg-[#9dd187] rounded-full"
                    />
                  </div>

                  <motion.div variants={containerVariants} className="lg:col-span-8">
                    <motion.p
                      variants={fadeSlideUp}
                      className="text-xl text-gray-600 mb-10 leading-relaxed"
                    >
                      {t(`cons_item${num}_text`)}
                    </motion.p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {getTranslatedList(`cons_item${num}_list`).map((item, i) => (
                        <motion.div
                          key={i}
                          variants={fadeSlideUp}
                          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                          className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100"
                        >
                          <CheckCircle
                            className="text-[#9dd187] mt-1 shrink-0"
                            size={18}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-60px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeSlideUp} className="text-3xl md:text-4xl font-bold text-[#1a1c24] mb-6">
              {t("methodology_title")}
            </motion.h2>
            <motion.p variants={fadeSlideUp} className="text-xl text-gray-600">
              {t("methodology_subtitle")}
            </motion.p>
          </motion.div>

          {/* Methodology cards — staggered fan entrance */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {[
              { icon: Globe, label: "GHG Protocol", delay: 0 },
              { icon: Shield, label: "ISO 14064-1", delay: 0.08 },
              { icon: Award, label: "SBTi", delay: 0.16 },
              { icon: FileText, label: null, delay: 0.24 },
            ].map(({ icon: Icon, label, delay }, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 40, rotateX: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: { duration: 0.6, delay, ease: EASE_OUT },
                  },
                }}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.25, ease: "easeOut" } }}
                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-shadow group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
                  className="w-16 h-16 bg-[#f4f9eb] rounded-2xl flex items-center justify-center text-[#9dd187] mb-6"
                >
                  <Icon size={32} />
                </motion.div>
                {label ? (
                  <h3 className="text-xl font-bold text-[#1a1c24]">{label}</h3>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-[#1a1c24] mb-2">
                      {t("methodology_norm")}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {t("methodology_norm_sub")}
                    </p>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Dark guarantee banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE_OUT }}
            viewport={{ once: true }}
            className="bg-[#1a1c24] rounded-[3rem] p-8 md:p-12 text-center relative overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: EASE_OUT }}
              viewport={{ once: true }}
              className="absolute top-0 right-0 w-1/2 h-full bg-[#9dd187]/5 skew-x-12 transform translate-x-32"
            />
            <div className="relative z-10 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: EASE_SPRING, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-16 h-16 rounded-full bg-[#9dd187]/20 flex items-center justify-center mb-6"
              >
                <CheckCircle className="text-[#9dd187]" size={32} />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold text-white mb-4 max-w-2xl"
              >
                {t("methodology_guarantee") ||
                  "Garantizamos que cada dato es válido, auditable y comparable."}
              </motion.h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STRATEGIC PARTNER ESC ── */}
      <section id="strategic-partner-esc" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-16"
          >
            <motion.div variants={scaleIn}>
              <Badge className="bg-[#9dd187] text-[#1a1c24] mb-4 px-4 py-1 font-bold">
                {t("esc_badge")}
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeSlideUp} className="text-4xl md:text-5xl font-bold text-[#1a1c24] mb-6">
              {t("esc_title")}
            </motion.h2>
          </motion.div>

          {/* 4 Pillars */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 gap-8 mb-24"
          >
            {[
              { icon: Globe, titleKey: "esc_benefit1_title", textKey: "esc_benefit1_text" },
              { icon: Shield, titleKey: "esc_benefit2_title", textKey: "esc_benefit2_text" },
              { icon: FileText, titleKey: "esc_benefit3_title", textKey: "esc_benefit3_text" },
              { icon: Recycle, titleKey: "esc_benefit4_title", textKey: "esc_benefit4_text" },
            ].map(({ icon: Icon, titleKey, textKey }, i) => (
              <motion.div
                key={i}
                variants={cardVariant}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
                className="bg-gray-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-shadow"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
                  className="w-14 h-14 bg-[#1a1c24] rounded-2xl flex items-center justify-center text-[#9dd187] mb-6"
                >
                  <Icon size={28} />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#1a1c24] mb-4">{t(titleKey)}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{t(textKey)}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Team & Trust — dark */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            viewport={{ once: true, margin: "-60px" }}
            className="bg-[#1a1c24] rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden mb-24"
          >
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: EASE_OUT }}
              viewport={{ once: true }}
              className="absolute top-0 right-0 w-2/3 h-full bg-[#9dd187]/5 skew-x-12 transform translate-x-32 pointer-events-none"
            />

            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              {/* Team credentials */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                viewport={{ once: true }}
              >
                <motion.h3 variants={fadeSlideUp} className="text-3xl font-bold mb-8">
                  {t("expert_team_title")}
                </motion.h3>
                <ul className="space-y-8 mb-8">
                  {[
                    { icon: Globe, titleKey: "credential_un_title", descKey: "credential_un_description" },
                    { icon: Landmark, titleKey: "credential_gov_title", descKey: "credential_gov_description" },
                    { icon: GraduationCap, titleKey: "credential_edu_title", descKey: "credential_edu_description" },
                  ].map(({ icon: Icon, titleKey, descKey }, i) => (
                    <motion.li
                      key={i}
                      variants={fadeSlideLeft}
                      className="flex gap-5"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: -5, transition: { duration: 0.25 } }}
                        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0"
                      >
                        <Icon className="text-[#9dd187]" size={24} />
                      </motion.div>
                      <div>
                        <p className="font-bold text-lg mb-1">{t(titleKey)}</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{t(descKey)}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  variants={scaleIn}
                  className="p-6 bg-[#9dd187]/10 rounded-2xl border border-[#9dd187]/20"
                >
                  <p className="text-[#9dd187] font-medium italic">&quot{t("partner_help")}&quot</p>
                </motion.div>
              </motion.div>

              {/* Client logos */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                viewport={{ once: true }}
              >
                <motion.h3 variants={fadeSlideUp} className="text-3xl font-bold mb-8">
                  {t("partner_clients_trust")}
                </motion.h3>
                <motion.p variants={fadeSlideUp} className="text-gray-400 mb-8 text-lg">
                  {t("partner_clients_trust_desc")}
                </motion.p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Stadler Rail", url: "https://www.stadlerrail.com/" },
                    { name: "Veolia", url: "https://www.veolia.com/" },
                    { name: "Grupo Agbar", url: "https://www.agbar.es/" },
                    { name: "Roca", url: "https://www.roca.es/" },
                    { name: "Boehringer Ingelheim", url: "https://www.boehringer-ingelheim.com/" },
                    { name: "Walmart", url: "https://www.walmart.com/" },
                  ].map((client, i) => (
                    <motion.a
                      key={client.name}
                      variants={{
                        hidden: { opacity: 0, scale: 0.85, y: 20 },
                        visible: {
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          transition: { duration: 0.45, delay: i * 0.07, ease: EASE_OUT },
                        },
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -3,
                        borderColor: "rgba(157,209,135,0.5)",
                        transition: { duration: 0.2 },
                      }}
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 bg-white/5 px-6 py-4 rounded-xl border border-white/10 text-center font-bold text-gray-300 hover:bg-white/10 hover:text-[#9dd187] transition-colors"
                    >
                      {client.name}
                      <ExternalLink
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Value & Deliverables */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-60px" }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Impact */}
            <motion.div
              variants={cardVariant}
              className="bg-[#f4f9eb] rounded-[2.5rem] p-10 border border-[#9dd187]/20"
            >
              <h3 className="text-2xl font-bold text-[#1a1c24] mb-8">{t("impact_title")}</h3>
              <ul className="space-y-5">
                {getTranslatedList("impact_list").map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: EASE_OUT }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="text-[#9dd187] mt-1 shrink-0" size={20} />
                    <span className="text-[#1a1c24] font-medium text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Deliverables */}
            <motion.div
              variants={cardVariant}
              className="bg-[#1a1c24] rounded-[2.5rem] p-10 text-white shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Package className="text-[#9dd187]" />
                {t("deliverables_title")}
              </h3>
              <ul className="space-y-5">
                {getTranslatedList("deliverables_list").map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: EASE_OUT }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#9dd187] flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle className="text-[#1a1c24]" size={12} />
                    </div>
                    <span className="text-gray-200 text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.4, ease: EASE_OUT }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <Link href="/contratar">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-[#9dd187] text-[#1a1c24] hover:bg-[#8bc475] rounded-xl py-6 font-bold text-lg">
                      {t("request_info_cta")}
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
