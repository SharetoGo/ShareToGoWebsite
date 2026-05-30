"use client";

import { motion } from "framer-motion";
import { Car, Flag } from "lucide-react";

export function RoadTimeline({ t }: { t: any }) {
  // Easing to match your HeroSection's smooth feel
  const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section className="relative py-16  bg-linear-to-br from-[#2a2c38] via-[#1a1c24] to-[#2a2c38] text-white overflow-hidden border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title / Context Section */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#9dd187]">
            {t("ee_timeline_law_title")}
          </h2>
          <p className="text-lg text-gray-300 italic font-light border-l-2 border-[#9dd187] pl-4 text-pretty">
            {t("ee_timeline_law_quote")}
          </p>
        </div>

        {/* The Road Graphic Container */}
        <div className="relative mt-20 mb-10 w-full pt-8 pb-6">
          
          {/* Black Asphalt Road Background */}
          <div className="absolute inset-x-0 bottom-6 h-16 bg-[#2a2c38] rounded-sm flex items-center shadow-inner">
            {/* Dashed White Lane Divider */}
            <div className="w-full h-0.5 border-t-2 border-dashed border-gray-400 opacity-60" />
          </div>

          {/* Road Visual Layout Map */}
          <div className="relative w-full h-24 flex items-end">
            
            {/* CAR / "TODAY" POSITION (Left Side) */}
            <div className="absolute left-[10%] sm:left-[20%] bottom-6 transform -translate-x-1/2 flex flex-col items-center z-10">
              {/* "Hoy" Label */}
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[#9dd187] font-bold text-xl mb-3 tracking-wide"
              >
                {t("ee_timeline_today") || "Hoy"}
              </motion.span>
              
              {/* Car Icon with Subtle Driving Animation */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{ y: [0, -2, 0] }}
                transition={{
                  opacity: { duration: 0.8, ease: EASE_OUT },
                  x: { duration: 0.8, ease: EASE_OUT },
                  y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
                className="text-[#9dd187] filter drop-shadow-[0_0_8px_rgba(157,209,135,0.3)]"
              >
                <Car className="w-12 h-12 stroke-[1.5]" />
              </motion.div>
            </div>

            {/* FINISH LINE / "DECEMBER 2026" POSITION (Right Side) */}
            <div className="absolute right-[10%] sm:right-[15%] bottom-6 transform translate-x-1/2 flex flex-col items-center z-10">
              {/* Date Flag Label */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center mb-1 text-right sm:text-center"
              >
                <span className="text-[#9dd187] font-bold text-xl leading-none">
                  {t("ee_timeline_deadline_month")}
                </span>
                <span className="text-[#9dd187] font-bold text-xl leading-none">
                  {t("ee_timeline_deadline_year")}
                </span>
              </motion.div>
              
              {/* Checkered Finish Flag Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                className="text-white bg-[#1a1c24] p-1 rounded-full border border-gray-700"
              >
                <Flag className="w-10 h-10 stroke-[1.5] fill-white text-white" />
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}