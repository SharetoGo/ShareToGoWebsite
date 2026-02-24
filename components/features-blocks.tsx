"use client";

import { Sprout, BadgeEuro, Users } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: Sprout, titleKey: "reduccion_emisiones" },
  { icon: Users, titleKey: "beneficios_sociales" },
  { icon: BadgeEuro, titleKey: "ahorro_economico" },
];

export default function FeaturesBlocks() {
  const { t } = useTranslation();
  const headingParts = t("motivo_sharetogo").split("SharetoGo");

  const [animate, setAnimate] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (blockRef.current) observer.observe(blockRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={blockRef}
      className="py-12 md:py-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground">
            {headingParts[0]}
            <span className="text-primary">{t("nombre_sharetogo")}</span>
            {headingParts[1] ?? ""}
          </h2>

          <p className="mt-4 text-md md:text-xl text-muted-foreground">
            {t("transforma_movilidad")}
          </p>
        </div>

        {/* LABELS */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {features.map((f) => {
            const Icon = f.icon;

            return (
              <div
                key={f.titleKey}
                className="px-4 py-2 rounded-full border border-primary/30
                           bg-primary/15 text-primary text-sm font-semibold"
              >
                <Icon className="inline-block w-4 h-4 mr-2 -mt-[2px]" />
                {t(f.titleKey)}
              </div>
            );
          })}
        </div>

        {/* PHONES */}
        <div className="relative mt-12 flex justify-center mb-12">
          <div className="relative w-full max-w-5xl h-[360px] sm:h-[400px] md:h-[460px]">

            <AnimatedPhone
              src="/images/homeScreen.png"
              alt={t("preview_alt")}
              from="center-left"
              active={animate}
              className="hidden md:block"
            />

            <AnimatedPhone
              src="/images/publishScreen.png"
              alt={t("preview_alt")}
              from="center"
              active={animate}
              main
            />

            <AnimatedPhone
              src="/images/bookScreen.png"
              alt={t("preview_alt")}
              from="center-right"
              active={animate}
              className="hidden md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedPhone({
  src,
  alt,
  active,
  from,
  main,
  className = "",
}: {
  src: string;
  alt: string;
  active: boolean;
  from: "center" | "center-left" | "center-right";
  main?: boolean;
  className?: string;
}) {
  const base =
    "absolute left-1/2 transition-all duration-700 ease-out will-change-transform";

  const size = main
    ? "w-[200px] sm:w-[230px] md:w-[260px]"
    : "w-[170px] sm:w-[190px] md:w-[220px]";

  const depth = main ? "top-0 z-20" : "top-10 md:top-14 z-10";

  const hidden = "translate-x-[-50%] scale-75 opacity-0";

  const visibleMap = {
    center: "translate-x-[-50%] scale-100 opacity-100",
    "center-left": "translate-x-[-145%] rotate-[-8deg] scale-95 opacity-100",
    "center-right": "translate-x-[45%] rotate-[8deg] scale-95 opacity-100",
  };

  // Float duration offset gives each phone a different rhythm
  const floatDuration = main ? 3.6 : from === "center-left" ? 4.2 : 3.0;

  return (
    <div
      className={`${base} ${size} ${depth} ${
        active ? visibleMap[from] : hidden
      } ${className}`}
    >
      <motion.div
        animate={active ? { y: [0, -7, 0] } : { y: 0 }}
        transition={
          active
            ? { duration: floatDuration, repeat: Infinity, ease: "easeInOut" }
            : {}
        }
      >
        <div className="rounded-[2rem] overflow-hidden shadow-xl">
          <div className="relative w-full aspect-[9/19]">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 240px, 280px"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
