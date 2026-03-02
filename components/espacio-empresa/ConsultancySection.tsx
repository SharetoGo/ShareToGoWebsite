import { motion } from "framer-motion";
import { Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  cardVariant,
  fadeSlideLeft,
  containerVariants
} from "@/utils/animations";
import SectionHeader from "./SectionHeader";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ConsultancySection({ t }: { t: any }) {
  return (
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
            variants={containerVariants}
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch"
          >
            {/* Service list */}
            <motion.div variants={fadeSlideLeft} className="flex flex-col justify-center">
              <Badge className="bg-[#9dd187]/20 text-[#4d7c41] w-fit mb-6 italic border-[#9dd187]/30">
                {t("consultancy_badge")}
              </Badge>
              <h2 className="text-4xl font-bold text-[#1a1c24] mb-8 leading-tight">
                {t("consultancy_title_short")}
              </h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((num, i) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_OUT }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  >
                    <Link
                      href={`/consultoria-de-sostenibilidad#service-${num}`}
                      className="group flex items-center justify-between p-6 bg-white rounded-2xl border border-transparent hover:border-[#9dd187] hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[#9dd187] font-bold text-lg">
                          0{num}.
                        </span>
                        <span className="text-[#2a2c38] font-semibold group-hover:text-[#4d7c41] transition-colors">
                          {t(`cons_item${num}_title`)}
                        </span>
                      </div>
                      <ArrowRight className="text-gray-300 group-hover:text-[#9dd187] group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Partner spotlight */}
            <motion.div
              variants={cardVariant}
              className="bg-[#2a2c38] rounded-[3rem] p-10 text-white flex flex-col relative overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: EASE_OUT }}
                viewport={{ once: true }}
                className="absolute top-0 right-0 w-2/3 h-full skew-x-12 transform translate-x-32 pointer-events-none"
              />
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 mb-8"
                >
                  <div className="bg-white rounded-xl">
                    <Image
                      src="/images/empresas/esc-logo.jpg"
                      alt="ESC Logo"
                      width={320}
                      height={640}
                      className="w-20 h-20 object-contain"
                      priority
                    />
                  </div>
                  <div>
                    <p className="text-[#9dd187] text-xs font-bold uppercase tracking-widest">
                      {t("partner_badge")}
                    </p>
                    <h3 className="text-xl font-bold">
                      European Sustainability Consulting
                    </h3>
                  </div>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
                  viewport={{ once: true }}
                  className="text-gray-300 mb-8 leading-relaxed"
                >
                  {t("partner_description_short") ||
                    "Un equipo experto que aporta rigor técnico, metodologías internacionales y resultados auditables."}
                </motion.p>
                <div className="mt-auto">
                  <p className="text-sm text-gray-400 mb-4 font-medium italic">
                    {t("partner_clients_trust") || "Confianza respaldada por:"}
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    {["STADLER", "VEOLIA", "AGBAR", "WALMART"].map((name, i) => (
                      <motion.span
                        key={name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.07, ease: EASE_OUT }}
                        viewport={{ once: true }}
                        className="font-bold text-sm tracking-tighter"
                      >
                        {name}
                      </motion.span>
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
  );
}