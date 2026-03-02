import { motion } from "framer-motion";
import {
  Globe,
  Shield,
  FileText,
  Recycle,
  Landmark,
  GraduationCap,
  Package,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  cardVariant,
  containerVariants,
  fadeSlideUp,
  fadeSlideLeft,
  scaleIn,
} from "@/utils/animations";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PartnerSection({ t }: { t: any }) {
  const getTranslatedList = (key: string): string[] => {
    const list = t(key, { returnObjects: true });
    return Array.isArray(list) ? (list as string[]) : [];
  };

  return (
    <section
      id="strategic-partner-esc"
      className="py-24 bg-white overflow-hidden"
    >
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
          <motion.h2
            variants={fadeSlideUp}
            className="text-4xl md:text-5xl font-bold text-[#1a1c24] mb-6"
          >
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
            {
              icon: Globe,
              titleKey: "esc_benefit1_title",
              textKey: "esc_benefit1_text",
            },
            {
              icon: Shield,
              titleKey: "esc_benefit2_title",
              textKey: "esc_benefit2_text",
            },
            {
              icon: FileText,
              titleKey: "esc_benefit3_title",
              textKey: "esc_benefit3_text",
            },
            {
              icon: Recycle,
              titleKey: "esc_benefit4_title",
              textKey: "esc_benefit4_text",
            },
          ].map(({ icon: Icon, titleKey, textKey }, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="bg-gray-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-shadow"
            >
              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 },
                }}
                className="w-14 h-14 bg-[#1a1c24] rounded-2xl flex items-center justify-center text-[#9dd187] mb-6"
              >
                <Icon size={28} />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#1a1c24] mb-4">
                {t(titleKey)}
              </h3>
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
            className="absolute top-0 right-0 w-2/3 h-full skew-x-12 transform translate-x-32 pointer-events-none"
          />

          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            {/* Team credentials */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
            >
              <motion.h3
                variants={fadeSlideUp}
                className="text-3xl font-bold mb-8"
              >
                {t("expert_team_title")}
              </motion.h3>
              <ul className="space-y-8 mb-8">
                {[
                  {
                    icon: Globe,
                    titleKey: "credential_un_title",
                    descKey: "credential_un_description",
                  },
                  {
                    icon: Landmark,
                    titleKey: "credential_gov_title",
                    descKey: "credential_gov_description",
                  },
                  {
                    icon: GraduationCap,
                    titleKey: "credential_edu_title",
                    descKey: "credential_edu_description",
                  },
                ].map(({ icon: Icon, titleKey, descKey }, i) => (
                  <motion.li
                    key={i}
                    variants={fadeSlideLeft}
                    className="flex gap-5"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.15,
                        rotate: -5,
                        transition: { duration: 0.25 },
                      }}
                      className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0"
                    >
                      <Icon className="text-[#9dd187]" size={24} />
                    </motion.div>
                    <div>
                      <p className="font-bold text-lg mb-1">{t(titleKey)}</p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {t(descKey)}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                variants={scaleIn}
                className="p-6 bg-[#9dd187]/10 rounded-2xl border border-[#9dd187]/20"
              >
                <p className="text-[#9dd187] font-medium italic">
                  &quot;{t("partner_help")}&quot;
                </p>
              </motion.div>
            </motion.div>

            {/* Client logos */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
            >
              <motion.h3
                variants={fadeSlideUp}
                className="text-3xl font-bold mb-8"
              >
                {t("partner_clients_trust")}
              </motion.h3>
              <motion.p
                variants={fadeSlideUp}
                className="text-gray-400 mb-8 text-lg"
              >
                {t("partner_clients_trust_desc")}
              </motion.p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Stadler Rail", url: "https://www.stadlerrail.com/" },
                  { name: "Veolia", url: "https://www.veolia.com/" },
                  { name: "Grupo Agbar", url: "https://www.agbar.es/" },
                  { name: "Roca", url: "https://www.roca.es/" },
                  {
                    name: "Boehringer Ingelheim",
                    url: "https://www.boehringer-ingelheim.com/",
                  },
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
                        transition: {
                          duration: 0.45,
                          delay: i * 0.07,
                          ease: EASE_OUT,
                        },
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
            <h3 className="text-2xl font-bold text-[#1a1c24] mb-8">
              {t("impact_title")}
            </h3>
            <ul className="space-y-5">
              {getTranslatedList("impact_list").map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.08,
                    ease: EASE_OUT,
                  }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    className="text-[#9dd187] mt-1 shrink-0"
                    size={20}
                  />
                  <span className="text-[#1a1c24] font-medium text-lg">
                    {item}
                  </span>
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
                  transition={{
                    duration: 0.45,
                    delay: i * 0.08,
                    ease: EASE_OUT,
                  }}
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
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
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
  );
}
