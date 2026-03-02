import React from "react";
import { motion } from "framer-motion";
import {
    EASE_SPRING,
    fadeSlideUp,
    containerVariants,
} from "@/utils/animations";
import { Handshake } from "lucide-react";

export function PartnerSection({ t }: { t: any }) { 
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-60px" }}
            className="bg-linear-to-br from-[#f4f9eb] to-white rounded-[3rem] p-12 md:p-16 text-center border border-[#9dd187]/20 shadow-xl shadow-[#9dd187]/5"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.5, rotate: -20 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  rotate: -3,
                  transition: { duration: 0.65, ease: EASE_SPRING },
                },
              }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#9dd187] text-white mb-8 shadow-lg shadow-[#9dd187]/30 -rotate-3"
            >
              <Handshake className="w-10 h-10" />
            </motion.div>

            <motion.h2
              variants={fadeSlideUp}
              className="text-3xl md:text-4xl font-bold text-[#1a1c24] mb-6"
            >
              {t("ee_part_title")}
            </motion.h2>
            <motion.h3
              variants={fadeSlideUp}
              className="text-xl font-medium text-[#4d7c41] max-w-2xl mx-auto mb-8"
            >
              {t("ee_part_sub")}
            </motion.h3>
            <motion.p
              variants={fadeSlideUp}
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4"
            >
              {t("ee_part_p1")}
            </motion.p>
          </motion.div>
        </div>
      </section>
    );
}