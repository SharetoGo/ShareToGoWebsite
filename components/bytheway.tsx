"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BytheWay() {
  const { t } = useTranslation();

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-2">
        {/* Banner card (wide + low) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-[#2A2C38]/15"
          style={{ backgroundColor: "#2A2C38" }}
        >
          {/* very subtle green accents (no blur, no shadow) */}
          <div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
            style={{ backgroundColor: "rgba(157, 209, 135, 0.08)" }}
          />
          <div
            className="absolute -bottom-28 -left-28 w-72 h-72 rounded-full pointer-events-none"
            style={{ backgroundColor: "rgba(157, 209, 135, 0.08)" }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-center gap-10 px-10 py-4 md:px-14 md:py-8">
            {/* Left: text */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {t("bytheway_titulo_1")}
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-[#FFD700] leading-tight">
                  {t("bytheway_titulo_2")}
                </h3>
                <p className="text-gray-400 text-base md:text-lg max-w-xl">
                  {t("bytheway_desc")}
                </p>
              </div>

              <Link
                href="https://www.bythewaycarpool.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#FFD700] hover:bg-[#FFC700] text-[#2A2C38] font-bold px-8 py-5 text-base md:text-lg rounded-md group">
                  {t("bytheway_cta")}
                  <ArrowRight
                    className="ml-3 group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </Button>
              </Link>
            </div>

            {/* Right: big round logo (no wrapper, no border) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="flex justify-center lg:justify-end"
            >
              <Image
                src="/logos/logo_BTW.png"
                alt="ByTheWay logo"
                width={320}
                height={320}
                priority
                className="rounded-full object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
