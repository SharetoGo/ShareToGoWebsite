"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Plane,
  Trophy,
  GraduationCap,
  Leaf,
  Car,
  SquareParking,
  Coins,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Search,
  Building2,
  Sparkles,
  Factory,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import EventoImage from "@/public/images/eventos/evento.jpg";
import GenteFiestaImage from "@/public/images/eventos/GenteFiesta.jpg";
import CapturaPoligonosImage from "@/public/images/eventos/captura-poligonos.png";
import AeropuertoImage from "@/public/images/eventos/aeropuerto.jpg";
import EstadioFotoImage from "@/public/images/eventos/estadio-foto.jpg";
import UniversidadImage from "@/public/images/eventos/universidad.jpeg";

const SectionHeader = ({
  badge,
  title,
  sub,
  className = "",
  icon: Icon,
}: {
  badge: string;
  title: string;
  sub?: string;
  className?: string;
  icon?: any;
}) => (
  <div className={`mb-12 ${className}`}>
    <Badge
      variant="outline"
      className="bg-[#9dd187]/10 text-[#4d7c41] border-[#9dd187]/20 pl-3 pr-4 py-1.5 mb-6 rounded-full text-sm font-semibold tracking-wide uppercase flex w-fit items-center gap-2 shadow-sm"
    >
      {Icon && <Icon className="w-4 h-4" />}
      {badge}
    </Badge>
    <h2 className="text-3xl md:text-5xl font-bold text-[#1a1c24] tracking-tight mb-6 leading-tight">
      {title}
    </h2>
    {sub && (
      <p className="text-gray-500 max-w-2xl text-lg leading-relaxed">{sub}</p>
    )}
  </div>
);

const FeatureCard = ({ icon: Icon, title, children }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="group p-8 rounded-4xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#9dd187]/10 hover:border-[#9dd187]/30 transition-all duration-300"
  >
    <div className="h-14 w-14 rounded-2xl bg-[#f4f9eb] group-hover:bg-[#9dd187] transition-colors duration-300 flex items-center justify-center mb-6">
      <Icon className="text-[#5a8c46] group-hover:text-[#1a1c24] h-7 w-7 transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-[#1a1c24]">{title}</h3>
    <div className="text-gray-600 leading-relaxed">{children}</div>
  </motion.div>
);

export default function EspacioEventos(): ReactNode {
  const { t } = useTranslation();

  const formatBold = (value: string) => {
    const parts = value.split("<bold>");
    if (parts.length === 1) return value;
    return parts.map((part, idx) =>
      idx % 2 === 1 ? (
        <span key={idx} className="font-semibold text-[#1a1c24]">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };
  const tBold = (key: string) => formatBold(t(key));

  // Shared Animation Config
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <main className="bg-[#fafafa] overflow-x-hidden">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1a1c24]">
        <div className="absolute inset-0 opacity-40">
          <Image
            src={EventoImage}
            alt="Hero"
            fill
            className="object-cover transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#1a1c24]/50 to-[#1a1c24]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <Badge className="bg-[#9dd187] text-gray-100 mb-6 px-4 py-1.5 text-sm font-bold flex w-fit items-center gap-2 rounded-3xl">
              <Sparkles className="w-4 h-4" />
              {t("ev_hero_tag")}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1]">
              {t("ev_hero_title")}
            </h1>
            <div className="space-y-4 text-white/80 text-lg md:text-xl max-w-xl mb-10">
              <p>{t("ev_hero_sub")}</p>
              <p>{t("ev_hero_sub2")}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/descargar">
                <Button
                  size="lg"
                  className="bg-[#9dd187] text-[#1a1c24] hover:bg-[#8bc374] rounded-full px-8"
                >
                  {t("ev_hero_cta_search")}
                </Button>
              </Link>
              <Link href="/funcionamiento">
                <Button
                  size="lg"
                  className="text-white border-white/20 bg-white/10 rounded-full px-8"
                >
                  {t("ev_hero_cta_how")}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Abstract Floating UI Elements instead of messy bubbles */}
          <div className="hidden lg:flex relative h-[500px] items-center justify-center">
            <motion.div
              {...fadeUp}
              className="bg-white/10 backdrop-blur-xl p-8 rounded-4xl border border-white/20 shadow-2xl max-w-md w-full"
            >
              <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                <div className="h-12 w-12 rounded-full bg-[#9dd187] flex items-center justify-center text-[#1a1c24]">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">
                    Find your zone
                  </div>
                  <div className="text-white/60 text-sm">
                    Select where you want to go
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Universities", icon: GraduationCap },
                  { label: "Stadiums", icon: Trophy },
                  { label: "Industrial", icon: Building2 },
                  { label: "Airports", icon: Plane },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 bg-white/5 duration-300 rounded-2xl border border-white/10 group cursor-pointer"
                  >
                    <item.icon className="h-6 w-6 text-[#9dd187] mb-2" />
                    <div className="font-semibold text-white">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- BENTO STYLE INTRODUCTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#9dd187] rounded-[3rem] p-10 md:p-16 flex flex-col justify-center shadow-xl shadow-[#9dd187]/20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1c24] mb-6">
              {t("ev_intro_title")}
            </h2>
            <p className="text-xl text-[#1a1c24]/80 leading-relaxed mb-8">
              {tBold("ev_intro_text")}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {["ev_intro_b1", "ev_intro_b2", "ev_intro_b3", "ev_intro_b4"].map(
                (key) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 font-medium"
                  >
                    <CheckCircle2 className="text-white h-5 w-5" />
                    {t(key)}
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="rounded-[3rem] overflow-hidden relative min-h-[400px] shadow-lg">
            <Image
              src={GenteFiestaImage}
              alt="Social"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* --- INDUSTRIAL POLYGONS: REFINED TWO-COL --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <div className="absolute -inset-4 rounded-[3rem] -z-10 blur-xl" />
              <Image
                src={CapturaPoligonosImage}
                alt="App"
                className="mx-auto max-w-[320px]"
              />
            </motion.div>
            <div className="space-y-1">
              <SectionHeader
                badge={t("ev_poly_badge")}
                title={t("ev_poly_title")}
                icon={Factory}
              />
              <div className="text-lg text-gray-600">
                <p>{tBold("ev_poly_p1")}</p>
                <p>{tBold("ev_poly_p2")}</p>
              </div>

              {/* Stat Pills */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[
                  { icon: Leaf, k: "ev_poly_stats_b1" },
                  { icon: Car, k: "ev_poly_stats_b2" },
                  { icon: SquareParking, k: "ev_poly_stats_b3" },
                  { icon: Coins, k: "ev_poly_stats_b4" },
                ].map((item) => (
                  <div
                    key={item.k}
                    className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#9dd187]/30 hover:bg-[#9dd187]/5 transition-all duration-300"
                  >
                    <item.icon className="text-[#9dd187] h-6 w-6 shrink-0" />
                    <span className="text-sm font-semibold">
                      {tBold(item.k)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- UNIVERSITIES: FEATURE GRID --- */}
      <section className="py-24 bg-[#f4f9eb]">
        <div className="max-w-7xl mx-auto px-3">
          <SectionHeader
            badge={t("ev_venues_badge")}
            title={t("ev_venues_title")}
            sub={t("ev_venues_sub")}
            icon={GraduationCap}
          />

          <div className="grid md:grid-cols-3 gap-8 mb-16 items-center">
            <FeatureCard icon={GraduationCap} title="Campus Inteligente">
              {tBold("ev_uni_desc1")}
            </FeatureCard>
            <FeatureCard icon={MapPin} title="Movilidad Estudiantil">
              {tBold("ev_uni_desc2")}
            </FeatureCard>

            <div className="relative md:pl-8">
              <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 text-[#9dd187]">
                <ArrowRight className="w-8 h-8" />
              </div>
              <div className="md:hidden flex justify-center py-6">
                <ArrowRight className="w-8 h-8 text-[#9dd187] rotate-90" />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-[#9dd187] flex items-center justify-center text-[#1a1c24] shadow-lg shadow-[#9dd187]/20">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1c24]">
                    Impacto Real
                  </h3>
                </div>
                <div className="text-lg text-gray-600 leading-relaxed font-medium">
                  {tBold("ev_uni_impact_p1")}
                </div>
              </div>
            </div>
          </div>

          {/* Large University Stat Card */}
          <div className="bg-[#1a1c24] rounded-[3rem] p-10 md:p-16 text-white grid lg:grid-cols-2 gap-12 items-center shadow-2xl">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-[#9dd187]">
                {t("ev_uni_impact_title")}
              </h3>
              <ul className="space-y-4 opacity-90">
                <li className="flex gap-4 items-start">
                  <Plane className="text-[#9dd187] h-6 w-6 shrink-0 mt-1" />
                  <span>{tBold("ev_uni_impact_b1")}</span>
                </li>
                <li className="flex gap-4 items-start">
                  <Lightbulb className="text-[#9dd187] h-6 w-6 shrink-0 mt-1" />
                  <span>{tBold("ev_uni_impact_b2")}</span>
                </li>
              </ul>
              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#9dd187]">
                    {t("ev_uni_stat1_title")}
                  </div>
                  <div className="text-xs opacity-60 mt-1">
                    {t("ev_uni_stat1_text")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#9dd187]">
                    {t("ev_uni_stat2_title")}
                  </div>
                  <div className="text-xs opacity-60 mt-1">
                    {t("ev_uni_stat2_text")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#9dd187]">
                    {t("ev_uni_stat3_title")}
                  </div>
                  <div className="text-xs opacity-60 mt-1">
                    {t("ev_uni_stat3_text")}
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-4xl overflow-hidden h-[300px] relative border border-white/10">
              <Image
                src={UniversidadImage}
                alt="Uni"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SPECIFIC VENUES (Stadium, Airport, etc) - Modern Horizontal Scroll or Alternating --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {/* Airport */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-600 border-blue-100 px-4 py-1.5 mb-6 rounded-full text-sm font-bold flex w-fit items-center gap-2"
              >
                <Plane className="w-4 h-4" /> Airport
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1c24]">
                {t("ev_airport_title")}
              </h3>
              <div className="text-lg text-gray-600 space-y-6">
                <p>{tBold("ev_airport_p1")}</p>
                <p>{tBold("ev_airport_p2")}</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 rounded-[3rem] overflow-hidden shadow-2xl h-[450px] relative group">
              <Image
                src={AeropuertoImage}
                alt="Airport"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </div>

          {/* Stadium */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[450px] relative group">
              <Image
                src={EstadioFotoImage}
                alt="Stadium"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div>
              <Badge
                variant="outline"
                className="bg-orange-50 text-orange-600 border-orange-100 px-4 py-1.5 mb-6 rounded-full text-sm font-bold flex w-fit items-center gap-2"
              >
                <Trophy className="w-4 h-4" /> Stadiums & Events
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1c24]">
                {t("ev_stadium_title")}
              </h3>
              <div className="text-lg text-gray-600 space-y-6">
                <p>{tBold("ev_stadium_p1")}</p>
                <p>{tBold("ev_stadium_p2")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-[#9dd187] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-[#9dd187]/30">
          {/* Abstract Circle Decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl" />

          <h2 className="text-4xl md:text-6xl font-black text-[#1a1c24] mb-8 relative z-10">
            {t("ev_event_section_title")}
          </h2>
          <p className="text-xl text-[#1a1c24]/70 mb-10 max-w-2xl mx-auto relative z-10">
            {t("ev_event_card2_text")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/contratar">
              <Button
                size="lg"
                className="bg-[#1a1c24] text-white hover:bg-[#2f3140] rounded-full px-12 h-16 text-lg group"
              >
                {t("ev_event_button")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contacto">
              <Button className="bg-white text-[#1a1c24] hover:bg-[#2f3140] hover:text-white rounded-full px-12 h-16 text-lg">
                {t("ev_event_card2_link")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
