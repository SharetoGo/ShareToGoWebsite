import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Leaf, Bike, Footprints, Zap, Bus, Car } from "lucide-react";
import Image from "next/image";

export default function BytheWay() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="text-[#9dd187] mb-3" size={45} />
            <h2 className="text-3xl md:text-4xl font-black text-[#2a2c38] mb-4 leading-tight">
              {t("sust_main_title")}
            </h2>
          </div>
          <p className="text-base md:text-lg text-gray-500 font-medium">
            {t("sust_main_desc")}
          </p>
        </motion.div>
        {/* Compact Transport Icons Integrated Here */}
        <motion.div
          className="flex flex-wrap text-center justify-center gap-4 p-4 pb-8  border-t border-white/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest opacity-70">
            <Bike size={14} className="text-[#9dd187]" /> {t("mobility2")}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest opacity-70">
            <Footprints size={14} className="text-[#9dd187]" /> {t("mobility3")}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest opacity-70">
            <Zap size={14} className="text-[#9dd187]" /> {t("mobility4")}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest opacity-70">
            <Bus size={14} className="text-[#9dd187]" /> {t("mobility5")}
          </div>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Carpooling */}
          <motion.div
            className="bg-[#f9fafb] rounded-[2.5rem] hover:shadow-xl transition-all duration-500 group flex flex-col overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="p-4 md:p-10">
              <div className="flex gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <Car className="text-[#2a2c38]" size={28} />
                </div>
                <h3 className="text-xl font-black text-[#2a2c38] mt-4">
                  {t("sust_carpooling_title")}
                </h3>
              </div>
              <p className="text-[#9dd187] font-bold text-lg mb-4">
                {t("sust_carpooling_sub")}
              </p>
              <p className="text-gray-500 text-md leading-relaxed font-medium">
                {t("sust_carpooling_text")}
              </p>
            </div>
            <div className="relative h-64 w-full mt-auto">
              <Image
                src="/images/home/carpooling.jpg"
                alt="Carpooling"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Right: Sustainable Journeys */}
          <motion.div
            className="bg-[#2a2c38] rounded-[2.5rem] text-white hover:shadow-xl hover:shadow-[#9dd187]/5 transition-all duration-500 group flex flex-col overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="p-8 md:p-10">
              <div className="flex gap-2">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <Leaf className="text-[#9dd187]" size={28} />
                </div>
                <h3 className="text-xl font-black text-white mt-4">
                  {t("sust_journeys_title")}
                </h3>
              </div>
              <p className="text-[#9dd187] font-bold text-lg mb-4">
                {t("sust_journeys_sub")}
              </p>
              <p className="text-gray-400 text-md leading-relaxed font-medium mb-2">
                {t("sust_journeys_text")}
              </p>
            </div>
            <div className="relative h-64 w-full mt-auto">
              <Image
                src="/images/home/trayecto-sostenible.jpg"
                alt="Sustainable Journeys"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
