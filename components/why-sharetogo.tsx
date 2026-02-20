"use client";
import { motion } from "framer-motion";
import { Leaf, Users, TrendingDown, Shield, Clock, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const reasons = [
  { icon: Leaf, titleKey: "razon_ambiente", descKey: "desc_ambiente" },
  { icon: Users, titleKey: "razon_social", descKey: "desc_social" },
  { icon: TrendingDown, titleKey: "razon_ahorro", descKey: "desc_ahorro" },
  { icon: Shield, titleKey: "razon_seguridad", descKey: "desc_seguridad" },
  { icon: Clock, titleKey: "razon_tiempo", descKey: "desc_tiempo" },
  { icon: Zap, titleKey: "razon_facilidad", descKey: "desc_facilidad" },
];

export default function WhySharetoGoV3() {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-2">
            {t("porque_sharetogo")}
          </h2>
          <p className="text-[#666] mb-8">{t("razon_principal")}</p>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f8faf6] border border-[#e5e7eb] hover:border-[#9dd187] hover:bg-[#9dd187]/5 transition-all cursor-help"
                  title={t(reason.descKey)}
                >
                  <Icon className="text-[#9dd187] w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-[#2a2c38] text-sm">
                    {t(reason.titleKey)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}