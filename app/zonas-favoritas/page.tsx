"use client";

import { motion, AnimatePresence } from "framer-motion";
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
import CapturaPoligonosImage from "@/public/images/eventos/captura-poligonos.png";
import ImagenPoligonos from "@/public/images/eventos/imagen-poligonos.jpg";
import TPImage from "@/public/images/eventos/TP.jpg";
import CapturaUnisImage from "@/public/images/eventos/captura-unis.png";
import CapturaFavImage from "@/public/images/eventos/captura-fav.png";
import CocheFelizImage from "@/public/images/eventos/coche-feliz.jpeg";
import AeropuertoImage from "@/public/images/eventos/aeropuerto.jpg";
import EstadioFotoImage from "@/public/images/eventos/estadio-foto.jpg";
import DiscoPhotoImage from "@/public/images/eventos/disco-photo.jpg";
import LogoZonasFav from "@/public/images/eventos/logo_zonas_fav.png";
import UniversidadImage from "@/public/images/eventos/universidad.jpeg";
import EstadioImage from "@/public/images/eventos/estadio.png";
import FeriaImage from "@/public/images/eventos/feria.jpg";
import EnvironmentImage from "@/public/images/eventos/environment.png";
import SocialPeopleImage from "@/public/images/eventos/socialpeople.png";
import SavingImage from "@/public/images/eventos/saving.png";
import { FaHandshakeSimple } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

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
        <p className="text-gray-600 text-sm">{text}</p>
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

export default function EspacioEventos() {
  const { t } = useTranslation();
  const formatBold = (value: string) => {
    const parts = value.split("<bold>");
    if (parts.length === 1) return value;
    return parts.map((part, idx) =>
      idx % 2 === 1 ? (
        <span key={`bold-${value}-${idx}`} className="font-semibold text-[#1a1c24]">
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  const tBold = (key: string) => formatBold(t(key));

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

  // Bubbles content
  const BUBBLE_GROUPS = [
    ["POLÍGONOS INDUSTRIALES?", "UNIVERSIDADES", "AEROPUERTO"],
    ["DISCOTECAS", "ESTADIOS DEPORTIVOS", "FERIAS"],
  ];

  // Layout + crooked rotations for each word
  // (Group 0 moved up; "FERIAS" moved up in group 1)
  const BUBBLE_LAYOUTS = [
    [
      { top: "4%", right: "0%", rotate: -14 },   // POLÍGONOS INDUSTRIALES?
      { top: "32%", right: "50%", rotate: 7 },   // UNIVERSIDADES
      { top: "60%", right: "-10%", rotate: -5 }, // AEROPUERTO
    ],
    [
      { top: "2%", right: "40%", rotate: 10 },   // DISCOTECAS
      { top: "40%", right: "-5%", rotate: -11 }, // ESTADIOS DEPORTIVOS
      { top: "68%", right: "35%", rotate: 4 },   // FERIAS (moved up)
    ],
  ];

  const SLIDES = useMemo(
    () => [BASE_IMAGES.at(-1)!, ...BASE_IMAGES, BASE_IMAGES[0]],
    []
  );

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,
    []
  );

  const [current, setCurrent] = useState(1);
  const [enableTransition, setEnableTransition] = useState(true);

  const [activeBubbleGroup, setActiveBubbleGroup] = useState(0);

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
    const id = setInterval(() => setCurrent((c) => c + 1), 4500);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  // Auto-switch bubble groups
  useEffect(() => {
    const interval = setInterval(
      () => setActiveBubbleGroup((prev) => (prev === 0 ? 1 : 0)),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (!enableTransition) return;

    // END → BEGINNING jump
    if (current === SLIDES.length - 1) {
      setEnableTransition(false);
      setCurrent(1);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setEnableTransition(true))
      );
    }

    // BEGINNING → END jump
    if (current === 0) {
      setEnableTransition(false);
      setCurrent(SLIDES.length - 2);
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
        <section className="relative isolate min-h-[520px] md:min-h-[60vh] lg:min-h-[68vh] overflow-hidden py-10 sm:py-12">
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

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="flex w-full flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-10">
              {/* LEFT: text content */}
              <div className="max-w-2xl text-white text-center lg:text-left mx-auto">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-white/10 text-[#9dd187] ring-1 ring-white/20 backdrop-blur">
                  {t("ev_hero_tag")}
                </span>
                <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
                  {t("ev_hero_title")}
                </h1>
                <p className="mt-3 md:mt-4 text-lg md:text-xl text-white/90 text-balance">
                  {t("ev_hero_sub")}
                </p>
                <p className="mt-3 md:mt-4 text-lg md:text-xl text-white/90 text-balance">
                  {t("ev_hero_sub2")}
                </p>
                <p className="mt-3 md:mt-4 text-lg md:text-xl text-white/90 text-balance">
                  {t("ev_hero_sub3")}
                </p>
                <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-3">
                  <a
                    href="/descargar"
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

              {/* RIGHT: animated messy circular bubbles */}
              <div className="mt-8 lg:mt-0 hidden md:flex items-center justify-center w-full lg:w-[480px] h-[320px] lg:h-[420px] relative lg:-translate-x-[140px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBubbleGroup}
                    initial={{ opacity: 0, scale: 0.85, x: 40 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 40 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    className="relative w-full h-full"
                  >
                    {BUBBLE_GROUPS[activeBubbleGroup].map((word, index) => {
                      const layout =
                        BUBBLE_LAYOUTS[activeBubbleGroup][index];

                      return (
                        <motion.span
                          key={word}
                          style={{
                            position: "absolute",
                            top: layout.top,
                            right: layout.right,
                          }}
                          initial={{
                            opacity: 0,
                            scale: 0.4,
                            y: 12,
                            rotate: layout.rotate,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            rotate: layout.rotate,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.4,
                            y: -12,
                            rotate: layout.rotate,
                          }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                          className="flex items-center justify-center h-36 w-36 rounded-full bg-[#9dd187] text-white text-[14px] font-semibold text-center leading-tight p-4 shadow-lg shadow-black/30"
                        >
                          {word}
                        </motion.span>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
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
                <p className="text-lg md:text-xl font-light leading-relaxed text-left text-[#2a2c38]">
                  {tBold("ev_intro_text")}
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed text-left text-[#2a2c38]">
                  {t("ev_intro_text2")}
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

      {/* Polígonos industriales */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-12 md:py-16 bg-[#ffffff]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
          <div className="text-left">
            <p className="inline-flex items-center rounded-full border border-[#9dd187]/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#6c8560]">
              {t("ev_poly_badge")}
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#1f202a]">
              {t("ev_poly_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-10 items-start md:items-center">
            <div className="w-full">
              <Image
                src={CapturaPoligonosImage}
                alt="Captura SharetoGo polígono"
                className="mx-auto w-full max-w-sm object-contain rounded-[36px]"
                priority
              />
            </div>
            <div className="space-y-4 text-[#2a2c38]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9dd187]">
                {t("ev_poly_tagline")}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1f202a]">
                {t("ev_poly_h3")}
              </h3>
              <p className="text-lg leading-relaxed">
                {tBold("ev_poly_p1")}
              </p>
              <p className="text-lg leading-relaxed">
                {tBold("ev_poly_p2")}
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-[#e0edc5] p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(25,46,21,0.08)] space-y-6">
            <div className="space-y-4 text-lg md:text-xl text-[#1f202a]">
              <p>{tBold("ev_poly_stats_intro1")}</p>
              <p>{tBold("ev_poly_stats_intro2")}</p>
              <p>{tBold("ev_poly_stats_intro3")}</p>
              <p>{tBold("ev_poly_stats_intro4")}</p>
            </div>
            <ul className="text-left text-base md:text-lg text-[#2a2c38] mx-auto space-y-3 max-w-3xl">
              <li className="flex items-start gap-3">
                <span className="text-xl">🌱</span>
                <span>{tBold("ev_poly_stats_b1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">🚗</span>
                 <span>{tBold("ev_poly_stats_b2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">🅿️</span>
                 <span>{tBold("ev_poly_stats_b3")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">💶</span>
                 <span>{tBold("ev_poly_stats_b4")}</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-10 items-start md:items-center">
            <div className="space-y-4 text-lg text-[#2a2c38]">
              <p>{tBold("ev_poly_impact_p1")}</p>
              <p>{tBold("ev_poly_impact_p2")}</p>
              <p>{tBold("ev_poly_impact_p3")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-semibold text-[#1f202a]">
                {[
                  t("ev_poly_list1"),
                  t("ev_poly_list2"),
                  t("ev_poly_list3"),
                  t("ev_poly_list4"),
                ].map((sentence) => (
                  <div
                    key={sentence}
                    className="flex items-start gap-3"
                  >
                    <FaCheckCircle className="text-[#9dd187] mt-1 shrink-0" />
                    <span>{sentence}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full">
              <Image
                src={ImagenPoligonos}
                alt="Vehículos en polígono industrial"
                className="mx-auto w-full max-w-sm h-[420px] object-cover rounded-[36px]"
                priority
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg font-bold text-[#1f202a]">
              {tBold("ev_poly_cta")}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Universidad + impacto */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-12 md:py-16 bg-white mb-6"
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

          <div className="mt-12 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
              <div className="w-full">
                <Image
                  src={TPImage}
                  alt="Campus SharetoGo"
                  className="mx-auto w-full max-w-sm h-[360px] object-cover rounded-[30px]"
                  priority
                />
              </div>
              <p className="text-lg text-[#2a2c38]">
                {tBold("ev_uni_desc1")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              <div className="order-2 md:order-1">
                <p className="text-lg text-[#2a2c38]">
                  {tBold("ev_uni_desc2")}
                </p>
              </div>
              <div className="order-1 md:order-2 w-full">
                <Image
                  src={CapturaUnisImage}
                  alt="Interfaz estudiantes SharetoGo"
                  className="mx-auto w-full max-w-sm object-contain rounded-[30px]"
                  priority
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
              <div className="w-full">
                <Image
                  src={CocheFelizImage}
                  alt="Usuarios compartiendo coche contentos"
                  className="mx-auto w-full max-w-sm h-[220px] md:h-[360px] object-cover rounded-[30px]"
                  priority
                />
              </div>
              <p className="text-lg text-[#2a2c38]">
                {tBold("ev_uni_desc3")}
              </p>
            </div>
          </div>

          <div className="mt-12 mb-12 rounded-3xl bg-[#e0edc5] p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(25,46,21,0.08)] space-y-6">
            <div className="space-y-3 text-lg md:text-xl text-[#1f202a]">
              <p className="text-2xl md:text-3xl font-extrabold text-[#1a1c24]">
                {tBold("ev_uni_impact_title")}
              </p>
              <p>{tBold("ev_uni_impact_p1")}</p>
              <p>{tBold("ev_uni_impact_p2")}</p>
            </div>
            <ul className="text-left text-base md:text-lg text-[#2a2c38] mx-auto space-y-3 max-w-3xl">
              <li className="flex items-start gap-3">
                <span className="text-xl">✈️</span>
                <span>{tBold("ev_uni_impact_b1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">💡</span>
                <span>{tBold("ev_uni_impact_b2")}</span>
              </li>
            </ul>
            <div className="space-y-4 text-lg md:text-xl text-[#1f202a]">
              <p className="font-semibold text-[#1a1c24]">
                {tBold("ev_uni_impact_example_label")}
              </p>
              <p>{tBold("ev_uni_impact_example_p1")}</p>
              <p>{tBold("ev_uni_impact_example_p2")}</p>
            </div>
            <ul className="text-left text-base md:text-lg text-[#2a2c38] mx-auto space-y-3 max-w-3xl">
              <li className="flex items-start gap-3">
                <span className="text-xl">🚗</span>
                <span>{tBold("ev_uni_impact_example_b1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">🌳</span>
                <span>{tBold("ev_uni_impact_example_b2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">⛽</span>
                <span>{tBold("ev_uni_impact_example_b3")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">💡</span>
                <span>{tBold("ev_uni_impact_example_b4")}</span>
              </li>
            </ul>
          </div>

          <div className="mt-10 space-y-6">
            <div className="rounded-2xl bg-white/80 ring-1 ring-[#9dd187]/30 p-6 md:p-8 text-lg text-[#1f202a] leading-relaxed">
              <p>{tBold("ev_uni_benefits_p1")}</p>
              <p className="mt-4">{tBold("ev_uni_benefits_p2")}</p>
            </div>
            <div className="rounded-full bg-[#1a1c24] text-white text-center text-lg md:text-xl font-semibold py-4 px-6">
              {tBold("ev_uni_pill")}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Bloque final de estadísticas universidad */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
        className="pt-8 md:pt-12 pb-12 md:pb-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className="order-2 md:order-1 space-y-4">
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
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-12 md:py-16 bg-[#f4f9eb]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1f202a]">
            {t("ev_event_section_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-[#9dd187]/40 space-y-4">
              <p className="text-lg text-[#2a2c38]">
                {t("ev_event_card1")}
              </p>
              <div className="flex justify-center">
                <Image
                  src={LogoZonasFav}
                  alt="SharetoGo evento"
                  className="h-24 w-auto"
                  priority
                />
              </div>
            </div>
            <div className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-[#9dd187]/40 space-y-3">
              <p className="text-lg text-[#2a2c38]">
                <Link href="/contacto" className="font-semibold text-[#4d7c41] underline underline-offset-4">
                  {t("ev_event_card2_link")}
                </Link>{" "}
                {t("ev_event_card2_text")}
              </p>
              <p className="text-lg text-[#2a2c38]">
                {t("ev_event_card2_extra")}
              </p>
            </div>
          </div>
          <div>
            <Link href="/contratar">
              <Button className="bg-[#1a1c24] text-white px-8 py-3 rounded-full hover:bg-[#2f3140]">
                {t("ev_event_button")}
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-12 md:py-16 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f202a]">
              {t("ev_zones_section_title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div className="space-y-5 text-lg text-[#2a2c38]">
              <p>{tBold("ev_zones_p1")}</p>
              <p>{tBold("ev_zones_p2")}</p>
            </div>
            <div className="w-full">
              <Image
                src={CapturaFavImage}
                alt="Captura zonas favoritas"
                className="mx-auto w-64 max-w-sm object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-12 md:py-16 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1f202a]">
            {t("ev_airport_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 items-center">
            <div className="w-full">
              <div className="mx-auto w-full max-w-sm h-[220px] md:h-[380px] overflow-hidden rounded-[30px]">
                <Image
                  src={AeropuertoImage}
                  alt="Vehículos compartidos rumbo al aeropuerto"
                  className="w-full h-full object-cover object-bottom"
                  priority
                />
              </div>
            </div>
            <div className="space-y-5 text-lg text-[#2a2c38]">
              <p>{tBold("ev_airport_p1")}</p>
              <p>{tBold("ev_airport_p2")}</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-12 md:py-16 bg-[#f7fbff]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1f202a]">
            {t("ev_stadium_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 items-center">
            <div className="space-y-5 text-lg text-[#2a2c38]">
              <p>{tBold("ev_stadium_p1")}</p>
              <p>{tBold("ev_stadium_p2")}</p>
            </div>
            <div className="w-full">
              <Image
                src={EstadioFotoImage}
                alt="Afluencia a estadio"
                className="mx-auto w-full max-w-sm h-[220px] md:h-[380px] object-cover rounded-[30px]"
                priority
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-12 md:py-16 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1f202a]">
            {t("ev_fair_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 items-center">
            <div className="w-full">
              <div className="mx-auto flex h-[220px] md:h-[380px] w-full max-w-sm items-center justify-center rounded-[30px] border-2 border-dashed border-[#9dd187] bg-white text-[#6c8560] text-xl font-bold uppercase tracking-[0.3em]">
                {t("ev_capture_placeholder")}
              </div>
            </div>
            <div className="space-y-5 text-lg text-[#2a2c38]">
              <p>{tBold("ev_fair_p1")}</p>
              <p>{tBold("ev_fair_p2")}</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-12 md:py-16 bg-[#fef8ff]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1f202a]">
            {t("ev_nightlife_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div className="space-y-5 text-lg text-[#2a2c38]">
              <p>{tBold("ev_nightlife_p")}</p>
            </div>
            <div className="w-full">
              <Image
                src={DiscoPhotoImage}
                alt="Zonas de ocio compartiendo trayecto"
                className="mx-auto w-full max-w-sm h-[220px] md:h-[380px] object-cover rounded-[30px]"
                priority
              />
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
