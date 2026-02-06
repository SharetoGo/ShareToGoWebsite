"use client";
import { motion } from "framer-motion";
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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ConsultoriaSostenibilidad() {
  const { t } = useTranslation();

  const getTranslatedList = (key: string): string[] => {
    const list = t(key, { returnObjects: true });
    return Array.isArray(list) ? (list as string[]) : [];
  };

  return (
    <main className="bg-white min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 bg-[#1a1c24] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#9dd187]/5 skew-x-12 transform translate-x-32" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link
            href="/espacio-empresas"
            className="inline-flex items-center text-[#9dd187] mb-12 hover:-translate-x-2 transition-all"
          >
            <ArrowLeft size={20} className="mr-2" /> {t("back_to_empresas")}
          </Link>
          <div className="max-w-3xl">
            <Badge className="bg-[#9dd187] text-[#1a1c24] mb-6 px-4 py-1 font-bold text-sm">
              <Sparkle size={16} className="inline-block mr-1" />
              {t("consultancy_page_badge")}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
              {t("consultancy_full_title")}
            </h1>
          </div>
        </div>
      </section>

      {/* --- SERVICES DETAILED --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-12">
            {[1, 2, 3, 4].map((num) => (
              <motion.div
                key={num}
                id={`service-${num}`}
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
                className="scroll-mt-24 bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-100 transition-all hover:shadow-xl hover:shadow-gray-200/50"
              >
                <div className="grid lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-4">
                    <span className="text-[#9dd187] font-black text-6xl opacity-20 block mb-4">
                      0{num}
                    </span>
                    <h2 className="text-3xl font-bold text-[#2a2c38] mb-6">
                      {t(`cons_item${num}_title`)}
                    </h2>
                    <div className="w-20 h-1.5 bg-[#9dd187] rounded-full" />
                  </div>
                  <div className="lg:col-span-8">
                    <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                      {t(`cons_item${num}_text`)}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {getTranslatedList(`cons_item${num}_list`).map(
                        (item, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100"
                          >
                            <CheckCircle
                              className="text-[#9dd187] mt-1 shrink-0"
                              size={18}
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {item}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* --- METHODOLOGY  --- */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1c24] mb-6">
              {t("methodology_title")}
            </h2>
            <p className="text-xl text-gray-600">{t("methodology_subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
            >
              <div className="w-16 h-16 bg-[#f4f9eb] rounded-2xl flex items-center justify-center text-[#9dd187] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1a1c24]">GHG Protocol</h3>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
            >
              <div className="w-16 h-16 bg-[#f4f9eb] rounded-2xl flex items-center justify-center text-[#9dd187] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1a1c24]">ISO 14064-1</h3>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
            >
              <div className="w-16 h-16 bg-[#f4f9eb] rounded-2xl flex items-center justify-center text-[#9dd187] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1a1c24]">SBTi</h3>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
            >
              <div className="w-16 h-16 bg-[#f4f9eb] rounded-2xl flex items-center justify-center text-[#9dd187] mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1a1c24] mb-2">
                {t("methodology_norm")}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t("methodology_norm_sub")}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#1a1c24] rounded-[3rem] p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#9dd187]/5 skew-x-12 transform translate-x-32" />
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#9dd187]/20 flex items-center justify-center mb-6">
                <CheckCircle className="text-[#9dd187]" size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 max-w-2xl">
                {t("methodology_guarantee") ||
                  "Garantizamos que cada dato es válido, auditable y comparable."}
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- STRATEGIC PARTNER ESC --- */}
      <section
        id="strategic-partner-esc"
        className="py-24 bg-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="bg-[#9dd187] text-[#1a1c24] mb-4 px-4 py-1 font-bold">
              {t("esc_badge")}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1c24] mb-6">
              {t("esc_title")}
            </h2>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all">
              <div className="w-14 h-14 bg-[#1a1c24] rounded-2xl flex items-center justify-center text-[#9dd187] mb-6">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1c24] mb-4">
                {t("esc_benefit1_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("esc_benefit1_text")}
              </p>
            </div>

            <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all">
              <div className="w-14 h-14 bg-[#1a1c24] rounded-2xl flex items-center justify-center text-[#9dd187] mb-6">
                <Shield size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1c24] mb-4">
                {t("esc_benefit2_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("esc_benefit2_text")}
              </p>
            </div>

            <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all">
              <div className="w-14 h-14 bg-[#1a1c24] rounded-2xl flex items-center justify-center text-[#9dd187] mb-6">
                <FileText size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1c24] mb-4">
                {t("esc_benefit3_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("esc_benefit3_text")}
              </p>
            </div>

            <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all">
              <div className="w-14 h-14 bg-[#1a1c24] rounded-2xl flex items-center justify-center text-[#9dd187] mb-6">
                <Recycle size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1c24] mb-4">
                {t("esc_benefit4_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("esc_benefit4_text")}
              </p>
            </div>
          </div>

          {/* Team & Trust Section (Dark) */}
          <div className="bg-[#1a1c24] rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden mb-24">
            <div className="absolute top-0 right-0 w-2/3 h-full bg-[#9dd187]/5 skew-x-12 transform translate-x-32 pointer-events-none" />

            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              <div>
                <h3 className="text-3xl font-bold mb-8">
                  {t("expert_team_title")}
                </h3>
                <ul className="space-y-8 mb-8">
                  <li className="flex gap-5">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Globe className="text-[#9dd187]" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1">
                        {t("credential_un_title")}
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {t("credential_un_description")}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-5">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Landmark className="text-[#9dd187]" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1">
                        {t("credential_gov_title")}
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {t("credential_gov_description")}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-5">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="text-[#9dd187]" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1">
                        {t("credential_edu_title")}
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {t("credential_edu_description")}
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="p-6 bg-[#9dd187]/10 rounded-2xl border border-[#9dd187]/20">
                  <p className="text-[#9dd187] font-medium italic">
                    "{t("partner_help")}"
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold mb-8">
                  {t("partner_clients_trust")}
                </h3>
                <p className="text-gray-400 mb-8 text-lg">
                  {t("partner_clients_trust_desc")}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      name: "Stadler Rail",
                      url: "https://www.stadlerrail.com/",
                    },
                    { name: "Veolia", url: "https://www.veolia.com/" },
                    { name: "Grupo Agbar", url: "https://www.agbar.es/" },
                    { name: "Roca", url: "https://www.roca.es/" },
                    {
                      name: "Boehringer Ingelheim",
                      url: "https://www.boehringer-ingelheim.com/",
                    },
                    { name: "Walmart", url: "https://www.walmart.com/" },
                  ].map((client) => (
                    <a
                      key={client.name}
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 bg-white/5 px-6 py-4 rounded-xl border border-white/10 text-center font-bold text-gray-300 hover:bg-white/10 hover:text-[#9dd187] hover:border-[#9dd187]/50 transition-all"
                    >
                      {client.name}
                      <ExternalLink
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Value & Deliverables */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* What it means */}
            <div className="bg-[#f4f9eb] rounded-[2.5rem] p-10 border border-[#9dd187]/20">
              <h3 className="text-2xl font-bold text-[#1a1c24] mb-8">
                {t("impact_title")}
              </h3>
              <ul className="space-y-5">
                {getTranslatedList("impact_list").map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-[#9dd187] mt-1 shrink-0"
                      size={20}
                    />
                    <span className="text-[#1a1c24] font-medium text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What you receive */}
            <div className="bg-[#1a1c24] rounded-[2.5rem] p-10 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Package className="text-[#9dd187]" />
                {t("deliverables_title")}
              </h3>
              <ul className="space-y-5">
                {getTranslatedList("deliverables_list").map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#9dd187] flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle className="text-[#1a1c24]" size={12} />
                    </div>
                    <span className="text-gray-200 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="/contratar">
                  <Button className="w-full bg-[#9dd187] text-[#1a1c24] hover:bg-[#8bc475] rounded-xl py-6 font-bold text-lg">
                    {t("request_info_cta")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
