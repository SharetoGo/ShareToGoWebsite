import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  MessageSquare,
  LayoutDashboard,
  CalendarDays,
  Check,
  ChevronRight,
  Copy,
  Share2,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { containerVariants, fadeSlideUp } from "@/utils/animations";
import SectionHeader from "./SectionHeader";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ImpactSection({ t }: { t: any }) {
  const [openAccordionItem, setOpenAccordionItem] = React.useState<
    number | null
  >(null);

  const getTranslatedList = (key: string): string[] => {
    const list = t(key, { returnObjects: true });
    return Array.isArray(list) ? (list as string[]) : [];
  };
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("comm_badge")}
          title={t("comm_title")}
          sub={t("comm_sub")}
          icon={Sparkles}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Accordion — left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-5 space-y-6"
          >
            <motion.h3
              variants={fadeSlideUp}
              className="text-2xl font-bold text-[#1a1c24] mb-8 flex items-center gap-3"
            >
              <Target className="text-[#9dd187]" />
              {t("comm_include_title") || "¿Qué incluye este servicio?"}
            </motion.h3>

            {[
              { id: 1, icon: MessageSquare, key: "feat1" },
              { id: 2, icon: LayoutDashboard, key: "feat2" },
              { id: 3, icon: CalendarDays, key: "feat3" },
            ].map((item, i) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, x: -24 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.5,
                      delay: i * 0.1,
                      ease: EASE_OUT,
                    },
                  },
                }}
                onClick={() =>
                  setOpenAccordionItem(
                    openAccordionItem === item.id ? null : item.id,
                  )
                }
                className={`cursor-pointer rounded-3xl border-2 transition-[background-color,border-color,box-shadow] duration-300 p-6 ${
                  openAccordionItem === item.id
                    ? "bg-white border-[#9dd187] shadow-xl shadow-[#9dd187]/10"
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
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  >
                    <ChevronRight
                      className={
                        openAccordionItem === item.id
                          ? "text-[#9dd187]"
                          : "text-gray-300"
                      }
                    />
                  </motion.div>
                </div>

                <AnimatePresence initial={false}>
                  {openAccordionItem === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 mt-4 leading-relaxed italic">
                        {t(`comm_${item.key}_text`)}
                      </p>
                      <ul className="mt-4 grid grid-cols-1 gap-2">
                        {getTranslatedList(`comm_${item.key}_list`).map(
                          (li, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: idx * 0.06,
                                ease: EASE_OUT,
                              }}
                              className="flex items-center gap-3 text-sm text-gray-700 font-medium bg-[#9dd187]/5 p-2 rounded-lg"
                            >
                              <Check
                                className="text-[#9dd187]"
                                size={14}
                                strokeWidth={3}
                              />
                              {li}
                            </motion.li>
                          ),
                        )}
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
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.38, ease: EASE_OUT }}
              viewport={{ once: true, margin: "-60px" }}
              className="relative"
            >
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#9dd187]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

              <Card className="relative border-gray-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden bg-white">
                <div className="bg-gray-50/80 backdrop-blur-md border-b p-5 flex items-center justify-between">
                  <div className="flex gap-2">
                    {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
                      <div
                        key={color}
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
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
                          transition={{ duration: 0.3, ease: EASE_OUT }}
                          className="absolute inset-0 bg-[#2a2c38]/40 flex items-center justify-center p-8"
                        >
                          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
                            <div className="flex items-center gap-3 mb-4 text-[#4d7c41]">
                              <Copy size={18} />
                              <span className="text-xs font-bold uppercase tracking-wider">
                                {t("comm_copy")}
                              </span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.6, ease: EASE_OUT }}
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

              {/* Floating badge */}
              <div className="absolute -bottom-6 right-2 md:-right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#f4f9eb] rounded-full flex items-center justify-center">
                  <Share2 size={16} className="text-[#4d7c41]" />
                </div>
                <p className="text-xs font-bold text-[#1a1c24]">
                  ¡Listo para publicar!
                </p>
              </div>
            </motion.div>

            {/* Why section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.1, ease: EASE_OUT }}
              viewport={{ once: true }}
              className="mt-10 p-8 bg-[#2a2c38] rounded-4xl text-white"
            >
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-[#9dd187]" />
                {t("comm_why_title")}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {t("comm_why_text_p1")}
              </p>
              <p className="text-lg font-bold text-[#8ecb7f]">
                {t("comm_why_text_p3")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
