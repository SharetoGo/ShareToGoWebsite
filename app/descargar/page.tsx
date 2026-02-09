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
      image: "/images/descargar/empresa-descargar.jpg",
      link: "/contratar",
    },
    {
      titleKey: "dl_card_uni_title",
      textKey: "dl_card_uni_text",
      image: "/images/descargar/uni.jpg",
      bgFallback: "linear-gradient(135deg,#0f172a,#1e293b)",
      link: "/contratar",
    },
    {
      titleKey: "dl_card_workers_title",
      textKey: "dl_card_workers_text",
      image: "/images/descargar/charla.jpg",
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
                src="/images/descargar/inicio.jpeg"
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
        <section className="bg-gray-50 py-16 flex flex-col justify-center gap-4">
          <h1 className="text-4xl md:text-4xl font-extrabold leading-tight text-[#2a2c38] text-center">
            {t("dl_mid_title")}
          </h1>
          <h2 className="text-4xl md:text-2xl font-medium leading-tight text-[#2a2c38] text-center pb-12">
            {t("dl_mid_subtitle")}
          </h2>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* LEFT SIDE - Photo */}
              <div className="md:w-1/2 flex justify-center">
                <Image
                  src="/images/descargar/movil.png"
                  alt={t("dl_mid_phone_alt")}
                  width={320}
                  height={640}
                  className="max-w-xs w-full h-120 object-cover object-top drop-shadow-lg rounded-xl"
                  priority
                />
              </div>

              {/* RIGHT SIDE - Content */}
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] text-center">
                  {t("dl_mid_block_title")}
                </h2>
                <ul className="text-[#2a2c38] text-lg leading-relaxed list-disc list-inside space-y-2">
                  <li>{tBold("dl_mid_b1")}</li>
                  <li>{tBold("dl_mid_b2")}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </motion.section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2a2c38]">
            {t("dl_zones_section_title")}
          </h2>
          <ul className="space-y-4 text-lg text-[#2a2c38] text-center">
            {[
              tBold("dl_zones_b1"),
              tBold("dl_zones_b2"),
              tBold("dl_zones_b3"),
            ].map((item) => (
              <li
                key={item as unknown as string}
                className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:text-left"
              >
                <FaCheckCircle className="text-[#9dd187]" />
                <span>{item}</span>
              </li>
            ))}
            <li className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:text-left">
              <FaCheckCircle className="text-[#9dd187]" />
              <span>
                {t("dl_zones_b4_prefix")}{" "}
                <Link
                  href="/contratar"
                  className="text-[#4d7c41] underline underline-offset-4 font-semibold"
                >
                  {t("dl_zones_b4_link")}
                </Link>
                .
              </span>
            </li>
          </ul>
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
                <h3 className="text-white text-3xl font-bold transition-transform duration-500 group-hover:-translate-y-12">
                  {t(card.titleKey)}
                </h3>
                <ArrowRight
                  className="mt-4 text-white w-8 h-8 opacity-100 translate-y-0 transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-6"
                  strokeWidth={2.5}
                />
              </div>

              {/* Hover content (desktop only) */}
              <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center text-center text-white opacity-0 translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 z-10 px-4">
                <p className="text-lg mb-4 max-w-sm text-center">
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
