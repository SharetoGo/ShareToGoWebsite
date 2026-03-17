"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { ArrowRight } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function DownloadSection() {
  const { t } = useTranslation();
  const formatBold = (value: string) => {
    const parts = value.split("<bold>");
    if (parts.length === 1) return value;
    return parts.map((part, idx) =>
      idx % 2 === 1 ? (
        <span key={`${value}-${idx}`} className="font-semibold text-[#1f202a]">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };
  const tBold = (key: string) => formatBold(t(key));

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const qrLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/downloads`
      : "/downloads";

  const cards = [
    {
      titleKey: "dl_card_company_title",
      textKey: "dl_card_company_text",
      image: "/images/descargar/empresa.jpg",
      link: "/contratar",
    },
    {
      titleKey: "dl_card_event_title",
      textKey: "dl_card_event_text",
      image: "/images/descargar/law-card.jpg",
      link: "/contratar",
    },
    {
      titleKey: "dl_card_uni_title",
      textKey: "dl_card_uni_text",
      image: "/images/descargar/poligono-card.jpg",
      bgFallback: "linear-gradient(135deg,#0f172a,#1e293b)",
      link: "/contratar",
    },
    {
      titleKey: "dl_card_workers_title",
      textKey: "dl_card_workers_text",
      image: "/images/descargar/eoliene-card.jpg",
      bgFallback: "linear-gradient(135deg,#142c1b,#1f4428)",
      link: "/contratar",
    },
  ];

  return (
    <main className="scroll-smooth space-y-10 md:space-y-16 bg-gray-50">
      {/* QR Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-16"
      >
        <section className="bg-[#2a2c38] py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
            {/* LEFT SIDE */}
            <div className="flex flex-col items-center text-center md:w-1/2">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <QRCodeCanvas value={qrLink} size={160} />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-white">
                {t("dl_qr_title")}
              </h2>
              <p className="mt-2 text-white max-w-sm">{t("dl_qr_text")}</p>
            </div>

            {/* RIGHT SIDE */}
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="/images/descargar/inicio.png"
                alt={t("dl_qr_mock_alt")}
                width={320}
                height={640}
                className="max-w-xs w-full drop-shadow-lg rounded-xl"
                priority
              />
            </div>
          </div>
        </section>

        {/* Middle Section */}
        <section className="bg-linear-to-b from-gray-50 to-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-[#9dd187]/5 to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col gap-3">
            <div className="text-center space-y-4 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#2a2c38]">
                {t("dl_mid_title")}
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-gray-600">
                {t("dl_mid_subtitle")}
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 mt-4">
              {/* LEFT SIDE - Photo */}
              <div className="md:w-1/2 flex justify-center relative">
                <div className="absolute inset-0 bg-[#9dd187]/20 blur-[60px] rounded-full transform scale-75" />
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Image
                    src="/images/descargar/movil.png"
                    alt={t("dl_mid_phone_alt")}
                    width={320}
                    height={640}
                    className="max-w-70 sm:max-w-xs w-full h-auto drop-shadow-2xl rounded-3xl border-6 border-white"
                    priority
                  />
                </motion.div>
              </div>

              {/* RIGHT SIDE - Impactful Content */}
              <div className="md:w-1/2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] leading-tight">
                    {t("dl_mid_block_title")}
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p>{tBold("dl_mid_b1")}</p>
                    <p>{tBold("dl_mid_b2")}</p>
                    <p className="bg-[#9dd187]/10 p-4 rounded-xl border-l-4 border-[#9dd187] text-[#2a2c38]">
                      {t("dl_mid_b3")}
                    </p>
                  </div>

                  <div className="pt-4 space-y-6">
                    <div className="p-6 rounded-2xl bg-[#2a2c38] text-white shadow-xl">
                      <p className="text-sm font-medium opacity-80 mb-3">
                        {t("dl_mid_b4_title")}
                      </p>
                      <p className="text-lg font-semibold mb-4">
                        {t("dl_mid_b4_text")}
                      </p>
                      <Button
                        asChild
                        className="w-full bg-[#9dd187] hover:bg-[#8bc475] text-[#2a2c38] font-bold py-6 rounded-xl transition-all"
                      >
                        <Link href="/contacto">{t("dl_mid_b4_link")}</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </motion.section>

      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-center text-[#2a2c38] mb-16">
            {t("dl_zones_section_title")}
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex gap-6 group">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#9dd187]/10 flex items-center justify-center text-[#9dd187] group-hover:bg-[#9dd187] group-hover:text-white transition-colors duration-300">
                    <FaCheckCircle size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#2a2c38]">
                      {t(`dl_zones_b${num}_title`)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(`dl_zones_b${num}_text`)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t border-gray-100">
                <Button
                  asChild
                  className="w-full bg-[#2a2c38] hover:bg-[#9dd187] text-white font-bold px-8 h-14 rounded-2xl transition-all shadow-lg hover:shadow-[#9dd187]/20"
                >
                  <Link href="/contratar">{t("dl_zones_b4_link")}</Link>
                </Button>
              </div>
            </div>

            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square lg:aspect-auto lg:h-125">
              <Image
                src="/images/descargar/map-zonas.png"
                alt="Zonas de cobertura ShareToGo"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Empresa y Evento Section */}
      <section className="py-12 md:py-16 space-y-10">
        <div className="bg-white rounded-3xl shadow-sm ring-1 ring-[#9dd187]/30 max-w-4xl mx-auto px-6 md:px-10 py-8 text-center space-y-4">
          <h3 className="text-3xl md:text-4xl font-bold text-[#2a2c38]">
            {t("dl_individual_title")}
          </h3>
          <p className="text-lg text-[#2a2c38]">{t("dl_individual_text")}</p>
          <Button
            className="bg-[#9dd187] text-[#2a2c38] font-semibold hover:bg-[#8bc475] rounded-full px-8"
            asChild
          >
            <Link href="/downloads">{t("dl_individual_cta")}</Link>
          </Button>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 flex-wrap">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative md:w-[calc(50%-1rem)] w-full h-72 sm:h-80 rounded-xl overflow-hidden flex flex-col items-center justify-center text-center group cursor-pointer"
              style={{
                backgroundImage: card.image
                  ? `url(${card.image})`
                  : (card.bgFallback ?? undefined),
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: card.bgFallback ? undefined : "#0f172a",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-40 md:group-hover:opacity-60 transition-opacity" />

              {/* Mobile (no hover) */}
              <div className="relative z-10 flex flex-col items-center justify-center text-white px-4 md:hidden">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                  {t(card.titleKey)}
                </h3>
                <p className="text-base mb-4 max-w-xs">{t(card.textKey)}</p>
                <Button
                  variant="secondary"
                  className="bg-[#9dd187] text-[#2a2c38] font-semibold hover:bg-[#8bc475]"
                  asChild
                >
                  <a href={card.link}>{t("dl_card_cta")}</a>
                </Button>
              </div>

              {/* Desktop (hover) */}
              <div className="relative z-10 hidden md:flex flex-col items-center justify-center transition-all duration-500">
                <h3 className="text-white text-2xl font-bold transition-transform duration-500 group-hover:-translate-y-12">
                  {t(card.titleKey)}
                </h3>
                <ArrowRight
                  className="mt-4 text-white w-8 h-8 opacity-100 translate-y-0 transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-6"
                  strokeWidth={2.5}
                />
              </div>

              {/* Hover content (desktop only) */}
              <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center text-center text-white opacity-0 translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 z-10 px-4">
                <p className="text-md mt-6 mb-2 max-w-sm text-center">
                  {t(card.textKey)}
                </p>
                <Button
                  variant="secondary"
                  className="bg-[#9dd187] text-[#2a2c38] font-semibold hover:bg-[#8bc475] mx-auto"
                  asChild
                >
                  <a href={card.link}>{t("dl_card_cta")}</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
