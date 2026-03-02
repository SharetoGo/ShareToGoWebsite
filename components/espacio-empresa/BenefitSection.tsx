"use client";
import { motion } from "framer-motion";
import { Award, BarChart3, Clock, Leaf, Shield, Users } from "lucide-react";
import {
  barReveal,
  cardVariant,
  fadeSlideLeft,
  fadeSlideUp,
  containerVariants,
} from "@/utils/animations";
import SectionHeader from "./SectionHeader";
import { AnimatedNumber } from "./AnimatedNumber";

const Benefit = ({
  icon,
  title,
  text,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  index: number;
}) => (
  <motion.div
    variants={cardVariant}
    whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
    className="relative group p-8 bg-white rounded-[2.5rem] border-t-4 border-t-[#9dd187] border-x border-b border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-shadow duration-300 overflow-hidden"
  >
    <span className="absolute -bottom-4 -right-2 text-9xl font-black text-gray-50 pointer-events-none select-none">
      <AnimatedNumber value={index + 1} />
    </span>
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
          className="w-14 h-14 bg-[#f4f9eb] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#9dd187] transition-colors duration-500"
        >
          <div className="group-hover:text-white transition-colors duration-500">
            {icon}
          </div>
        </motion.div>
        <motion.h3
          variants={fadeSlideLeft}
          className="text-xl font-bold text-[#1a1c24] group-hover:text-[#4d7c41] transition-colors"
        >
          {title}
        </motion.h3>
      </div>
      <motion.p
        variants={fadeSlideUp}
        className="text-gray-500 text-lg leading-relaxed"
      >
        {text}
      </motion.p>
    </div>
    <motion.div
      variants={barReveal}
      className="absolute bottom-0 left-0 h-1 bg-[#9dd187] w-full origin-left"
    />
  </motion.div>
);

export function BenefitSection({ t }: { t: any }) {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#9dd187]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge={t("ee_beneficios_badge")}
          title={t("ee_ben_title")}
          icon={Award}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <BarChart3 size={28} />,
              title: "ee_ben1_title",
              text: "ee_ben1_text",
            },
            {
              icon: <Shield size={28} />,
              title: "ee_ben2_title",
              text: "ee_ben2_text",
            },
            {
              icon: <Leaf size={28} />,
              title: "ee_ben3_title",
              text: "ee_ben3_text",
            },
            {
              icon: <Award size={28} />,
              title: "ee_ben4_title",
              text: "ee_ben4_text",
            },
            {
              icon: <Clock size={28} />,
              title: "ee_ben5_title",
              text: "ee_ben5_text",
            },
            {
              icon: <Users size={28} />,
              title: "ee_ben6_title",
              text: "ee_ben6_text",
            },
          ].map((ben, idx) => (
            <Benefit
              key={idx}
              index={idx}
              icon={ben.icon}
              title={t(ben.title)}
              text={t(ben.text)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
