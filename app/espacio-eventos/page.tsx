"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Heart,
  MapPin,
  Calendar,
  Filter,
  ListChecks,
} from "lucide-react";
import { TwoSlideCard } from "@/components/TwoSlideCard";
import { useTranslation } from "react-i18next";

import EventoImage from "@/public/images/eventos/evento.jpg";
import DJEventoImage from "@/public/images/eventos/dj-event.jpg";
import TrabajoEventoImage from "@/public/images/eventos/work-event.jpg";
import GenteFiestaImage from "@/public/images/eventos/GenteFiesta.jpg";
import Movil1EventosImage from "@/public/images/eventos/favoritos.png";
import Movil2EventosImage from "@/public/images/eventos/conduces.png";
import Movil3EventosImage from "@/public/images/eventos/busca.png";
import Movil4EventosImage from "@/public/images/eventos/movil4eventos.png";
import UniversidadImage from "@/public/images/eventos/universidad.jpeg";
import EstadioImage from "@/public/images/eventos/estadio.png";
import FeriaImage from "@/public/images/eventos/feria.jpg";
import EnvironmentImage from "@/public/images/eventos/environment.png";
import SocialPeopleImage from "@/public/images/eventos/socialpeople.png";
import SavingImage from "@/public/images/eventos/saving.png";
import { FaHandshakeSimple } from "react-icons/fa6";

export default function EspacioEventos() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [faqOpen, setFaqOpen] = useState(false);
  const handleToggleFaq = () => setFaqOpen((prev) => !prev);

  // HERO slideshow
  const BASE_IMAGES = [
    EventoImage.src,
    TrabajoEventoImage.src,
    EstadioImage.src,
    DJEventoImage.src,
  ];

  const SLIDES = useMemo(
    () => [BASE_IMAGES.at(-1)!, ...BASE_IMAGES, BASE_IMAGES[0]],
    []
  );

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window
        .matchMedia?.("(prefers-reduced-motion: reduce)")
        ?.matches,
    []
  );

  const [current, setCurrent] = useState(1);
  const [enableTransition, setEnableTransition] = useState(true);

  // Preload slides
  useEffect(() => {
    SLIDES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [SLIDES]);

  // Auto-slide
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(
      () => setCurrent((c) => c + 1),
      4500
    );
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  // Loop edges
  const handleTransitionEnd = () => {
    if (!enableTransition) return;
    if (current === SLIDES.length - 1) {
      setEnableTransition(false);
      setCurrent(1);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setEnableTransition(true))
      );
    }
  };

  return (
    <main className="scroll-smooth space-y-10 md:space-y-16">
      {/* HERO */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-16"
      >
        <section className="relative isolate h-[50vh] min-h-[380px] md:h-[60vh] lg:h-[68vh] overflow-hidden">
          <div
            className="absolute inset-0 flex h-full will-change-transform"
            style={{
              width: `${SLIDES.length * 100}%`,
              transform: `translate3d(-${
                current * (100 / SLIDES.length)
              }%,0,0)`,
              transition: enableTransition
                ? "transform 700ms ease-out"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
            aria-hidden
          >
            {SLIDES.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative h-full w-full flex-shrink-0 bg-[#1a1c24] bg-center bg-cover"
                style={{
                  backgroundImage: `url(${src})`,
                  width: `${100 / SLIDES.length}%`,
                  transform: "translateZ(0)",
                }}
              >
                <div className="absolute inset-0 bg-black/55 md:bg-black/60" />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full grid items-center">
            <div className="max-w-2xl text-white">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-white/10 text-white/90 ring-1 ring-white/20 backdrop-blur">
                {t("ev_hero_tag")}
              </span>
              <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
                {t("ev_hero_title")}
              </h1>
              <p className="mt-3 md:mt-4 text-lg md:text-xl text-white/90 text-balance">
                {t("ev_hero_sub")}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="#reservar-section"
                  className="rounded-full bg-[#9dd187] px-5 py-3 text-sm font-semibold text-[#1a1c24] hover:brightness-110 transition"
                >
                  {t("ev_hero_cta_search")}
                </a>
                <Link
                  href="/funcionamiento"
                  className="rounded-full px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/50 hover:bg-white/10 transition"
                >
                  {t("ev_hero_cta_how")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Intro SharetoGo */}
        <section className="relative overflow-hidden py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#9dd187]">
                  <span className="inline-block border-b-4 border-[#9dd187] pb-1">
                    {t("ev_intro_title")}
                  </span>
                </h1>
                <p className="text-lg md:text-xl font-medium leading-relaxed text-left text-[#2a2c38]">
                  {t("ev_intro_text")}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-[#2a2c38]">
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#9dd187]" />
                    {t("ev_intro_b1")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#9dd187]" />
                    {t("ev_intro_b2")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#9dd187]" />
                    {t("ev_intro_b3")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#9dd187]" />
                    {t("ev_intro_b4")}
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-xl rounded-sm shadow-[0_0_24px_rgba(157,209,135,0.14)]">
                  <div className="rounded-2xl overflow-hidden">
                    <Image
                      src={GenteFiestaImage}
                      alt={t("ev_intro_img_alt")}
                      className="w-full h-[20rem] object-cover"
                      width={800}
                      height={500}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.section>

      {/* ¿Conduces? */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="bg-white py-2 md:py-2 px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-10">
            {/* Mockup móvil */}
            <div>
              <div className="w-full h-[520px] md:h-[560px]">
                <Image
                  src={Movil1EventosImage}
                  alt={t("ev_drive_badge")}
                  className="w-full h-full object-contain"
                  width={600}
                  height={500}
                  priority
                />
              </div>
            </div>

            {/* Contenido */}
            <div>
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold bg-[#9dd187]/20 text-[#2a2c38]">
                {t("ev_drive_badge")}
              </span>

              <h3 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#2a2c38] leading-tight">
                <span className="inline-block border-b-4 border-[#9dd187] pb-1">
                  {t("ev_drive_title")}
                </span>
              </h3>

              <p className="mt-3 text-lg md:text-xl text-[#2a2c38] leading-relaxed">
                {t("ev_drive_text")}
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-sm text-[#2a2c38]">
                  <MapPin size={16} className="text-[#9dd187]" />
                  <span>{t("ev_drive_p1")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#2a2c38]">
                  <Calendar size={16} className="text-[#9dd187]" />
                  <span>{t("ev_drive_p2")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#2a2c38]">
                  <ListChecks size={16} className="text-[#9dd187]" />
                  <span>{t("ev_drive_p3")}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/funcionamiento">
                  <Button
                    variant="outline"
                    className="border-gray-300 text-[#2a2c38] hover:bg-[#2a2c38] hover:text-white"
                  >
                    {t("ev_drive_cta_how")}
                  </Button>
                </Link>
              </div>

              <div className="mt-6 rounded-xl overflow-hidden ring-1 ring-gray-200 bg-white">
                <div className="w-full h-56">
                  <Image
                    src={FeriaImage}
                    alt={t("ev_drive_feria_alt")}
                    className="w-full h-full object-cover"
                    width={800}
                    height={320}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ evento */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className="bg-[#1a1c24] py-12 md:py-16 px-4 md:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="w-full rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur">
            <button
              type="button"
              aria-expanded={faqOpen}
              aria-controls="faq-panel"
              className="w-full flex items-center justify-between gap-4 px-5 py-5 md:px-6 md:py-6 text-left"
              onClick={handleToggleFaq}
            >
              <div className="flex-1 pr-2">
                <h3 className="mt-2 text-lg sm:text-2xl font-semibold text-[#E0ECD5]">
                  {t("ev_faq_title")}
                </h3>
              </div>
              {faqOpen ? (
                <CiCircleMinus className="text-4xl text-[#9dd187] flex-shrink-0" />
              ) : (
                <CiCirclePlus className="text-4xl text-[#E0ECD5] flex-shrink-0" />
              )}
            </button>

            <div
              id="faq-panel"
              className={`grid transition-all duration-500 ease-in-out ${
                faqOpen
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-white/10 px-5 py-5 md:px-6 md:py-6">
                  <p className="text-base sm:text-lg text-[#E0ECD5]/90">
                    {t("ev_faq_text_pre")}{" "}
                    <Link
                      href="/quienes-somos"
                      className="font-semibold text-[#9dd187] underline underline-offset-4 hover:opacity-90"
                    >
                      {t("ev_faq_link_text")}
                    </Link>{" "}
                    {t("ev_faq_text_post")}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href="/contratar"
                      className="inline-flex items-center rounded-lg bg-[#9dd187] px-4 py-2 text-sm font-semibold text-[#1a1c24] hover:brightness-110 transition"
                    >
                      {t("ev_faq_cta_demo")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* TwoSlideCard sección */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-12 md:py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TwoSlideCard
            title={t("ev_two_title")}
            subtitle={t("ev_two_sub")}
            dark={false}
            intervalMs={9000}
            slides={[
              {
                image: Movil2EventosImage.src,
                title: t("ev_two_slide1_title"),
                description: t("ev_two_slide1_text"),
              },
              {
                image: Movil3EventosImage.src,
                title: t("ev_two_slide2_title"),
                description: t("ev_two_slide2_text"),
              },
            ]}
          />
        </div>
      </motion.section>

      {/* Universidad + Estadio */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-12 md:py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <Badge className="bg-[#9dd187] text-white">
              {t("ev_venues_badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mt-3">
              {t("ev_venues_title")}
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              {t("ev_venues_sub")}
            </p>
          </div>

          {/* Universidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className="order-2 md:order-1 space-y-4">
              <Card className="p-0 bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-[#2a2c38] mb-2">
                    {t("ev_uni_title")}
                  </h3>
                  <p className="text-gray-600 text-pretty">
                    {t("ev_uni_text")}
                  </p>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <StatCard
                  title={t("ev_uni_stat1_title")}
                  text={t("ev_uni_stat1_text")}
                />
                <StatCard
                  title={t("ev_uni_stat2_title")}
                  text={t("ev_uni_stat2_text")}
                />
                <StatCard
                  title={t("ev_uni_stat3_title")}
                  text={t("ev_uni_stat3_text")}
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-full h-[16rem] md:h-[22rem] rounded-2xl overflow-hidden bg-gray-50">
                <Image
                  src={UniversidadImage}
                  alt={t("ev_uni_img_alt")}
                  className="w-full h-full object-cover"
                  width={500}
                  height={300}
                  priority
                />
              </div>
            </div>
          </div>

          <div className="h-8 md:h-10" />

          {/* Estadio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className="order-1">
              <div className="w-full h-[16rem] md:h-[22rem] rounded-2xl overflow-hidden bg-gray-50">
                <Image
                  src={EstadioImage}
                  alt={t("ev_stadium_img_alt")}
                  className="w-full h-full object-cover"
                  width={800}
                  height={600}
                  priority
                />
              </div>
            </div>
            <div className="order-2 space-y-4">
              <Card className="p-0 bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-[#2a2c38] mb-2">
                    {t("ev_stadium_title")}
                  </h3>
                  <p className="text-gray-600 text-pretty">
                    {t("ev_stadium_text")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Banda final */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
        className="px-4 mb-12 md:mb-16 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-5">
            <BandCard
              img={EnvironmentImage}
              title={t("ev_band_env_title")}
              text={t("ev_band_env_text")}
            />
            <BandCard
              img={SocialPeopleImage}
              title={t("ev_band_soc_title")}
              text={t("ev_band_soc_text")}
            />
            <BandCard
              img={SavingImage}
              title={t("ev_band_save_title")}
              text={t("ev_band_save_text")}
            />
          </div>
        </div>
      </motion.section>
    </main>
  );
}

function StatCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <Card className="p-0 bg-white border border-gray-200 shadow-sm">
      <CardContent className="pt-5 pb-4 px-5 text-center">
        <div className="text-xl font-bold text-[#9dd187] mb-1">
          {title}
        </div>
        <p className="text-gray-600 text-sm">
          {text}
        </p>
      </CardContent>
    </Card>
  );
}

function BandCard({
  img,
  title,
  text,
}: {
  img: any;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-5 flex items-start gap-4">
      <Image
        src={img}
        alt={title}
        className="h-16 w-16 md:h-20 md:w-20 object-contain"
        priority
      />
      <div>
        <p className="font-semibold text-[#1f202a] text-lg">
          {title}
        </p>
        <p className="text-sm md:text-base text-[#2a2c38]/70">
          {text}
        </p>
      </div>
    </div>
  );
}
