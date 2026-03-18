"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

type Faq = {
  question: string;
  answer: ReactNode;
};

const FaqItem = ({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`border rounded-2xl mb-4 transition-all duration-300 ${
        isOpen ? "border-[#9dd187] bg-white shadow-sm" : "border-gray-100 bg-[#fcfdfc]"
      }`}
    >
      <button
        type="button"
        className="w-full flex justify-between items-center text-left p-5 sm:p-6 focus:outline-none group"
        onClick={onToggle}
      >
        <span
          className={`text-lg font-semibold pr-4 transition-colors duration-300 ${
            isOpen ? "text-[#9dd187]" : "text-[#2a2c38]"
          }`}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={`shrink-0 p-1.5 rounded-full transition-colors ${
            isOpen ? "bg-[#9dd187] text-white" : "bg-gray-100 text-[#2a2c38]"
          }`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 sm:px-6 pb-6 text-[#2a2c38]/80 leading-relaxed border-t border-gray-50 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Faqs() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqData: Faq[] = [
    { question: t("coche_pregunta"), answer: t("coche_respuesta") },
    { question: t("beneficios_pregunta"), answer: t("beneficios_respuesta") },
    { question: t("pasajeros_pregunta"), answer: t("pasajeros_respuesta") },
    { question: t("gastos_pregunta"), answer: t("gastos_respuesta") },
    { question: t("servicios_pregunta"), answer: t("servicios_respuesta") },
    { question: t("obligatorio_pregunta"), answer: t("obligatorio_respuesta") },
    { question: t("espera_pregunta"), answer: t("espera_respuesta") },
    { question: t("anulacion_pregunta"), answer: t("anulacion_respuesta") },
    { question: t("politicas_pregunta"), answer: t("politicas_respuesta") },
  ];

  return (
    <main className="bg-white">
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* Left Column: Context & CTA */}
          <div className="md:w-1/3 md:sticky md:top-24 h-fit">
            <div className="flex items-center gap-2 mb-4 text-[#9dd187] bg-[#9dd187]/10 w-fit px-3 py-1 rounded-full">
              <HelpCircle size={20} />
              <span className="font-bold uppercase tracking-wider text-sm">
                FAQ
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-[#9dd187] leading-tight">
              {t("_preguntas_frecuentes")}
            </h2>
            
            <p className="text-gray-500 mt-6 mb-8 text-lg">
              {t("pf_descripcion")}
            </p>

            <Link href="/contact">
              <button className="flex items-center justify-between w-full sm:w-auto gap-4 bg-[#2a2c38] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#9dd187] transition-all duration-300 group shadow-lg shadow-gray-200">
                {t("pf_button")}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Right Column: The Accordion */}
          <div className="md:w-2/3">
            {faqData.map((faq, idx) => (
              <FaqItem
                key={idx}
                index={idx}
                faq={faq}
                isOpen={activeIndex === idx}
                onToggle={() => setActiveIndex(activeIndex === idx ? null : idx)}
              />
            ))}
          </div>
          
        </div>
      </section>
    </main>
  );
}