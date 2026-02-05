"use client";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, ReactNode } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

type Faq = {
  question: string;
  answer: ReactNode;
};

const FaqItem = ({
  faq,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const questionId = faq.question.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="w-full bg-[#9dd187] rounded-2xl mt-4">
      <button
        type="button"
        className="w-full flex justify-between items-center text-left p-4 sm:p-6 focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${questionId}`}
        onClick={onToggle}
      >
        <h3 className="text-lg sm:text-xl font-semibold text-[#2a2c38] flex-1 pr-4">
          {faq.question}
        </h3>
        {isOpen ? (
          <ChevronUp className="text-4xl text-[#2a2c38] shrink-0" />
        ) : (
          <ChevronDown className="text-4xl text-[#2a2c38] shrink-0" />
        )}
      </button>
      <div
        id={`faq-answer-${questionId}`}
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 sm:px-6 pb-6 text-base sm:text-lg text-[#2a2c38]">{faq.answer}</div>
        </div>
      </div>
    </div>
  );
};

export default function Faqs() {
  const { t } = useTranslation();

  const faqData: Faq[] = [
    {
      question: t("coche_pregunta"),
      answer: t("coche_respuesta"),
    },
    {
      question: t("beneficios_pregunta"),
      answer: t("beneficios_respuesta"),
    },
    {
      question: t("pasajeros_pregunta"),
      answer: t("pasajeros_respuesta"),
    },
    {
      question: t("gastos_pregunta"),
      answer: t("gastos_respuesta"),
    },
    {
      question: t("servicios_pregunta"),
      answer: t("servicios_respuesta"),
    },
    {
      question: t("obligatorio_pregunta"),
      answer: t("obligatorio_respuesta"),
    },
    {
      question: t("espera_pregunta"),
      answer: t("espera_respuesta"),
    },
    {
      question: t("anulacion_pregunta"),
      answer: t("anulacion_respuesta"),
    },
    {
      question: t("politicas_pregunta"),
      answer: t("politicas_respuesta"),
    },
  ];

  const [open, setOpen] = useState<boolean[]>(Array(faqData.length).fill(false));

  const handleToggle = (idx: number) => {
    setOpen((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="scroll-smooth">
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative bg-white py-16 sm:py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2a2c38] mb-8 text-center sm:text-left">
            {t("_preguntas_frecuentes")}
          </h2>
          <div className="w-full">
            {faqData.map((faq, idx) => (
              <FaqItem key={idx} faq={faq} isOpen={open[idx]} onToggle={() => handleToggle(idx)} />
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
