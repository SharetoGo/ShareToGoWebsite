"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

// ==== Tipos ====
type Slide = {
  image: string
  title: string
  description: string
}

type TwoSlideCardProps = {
  title: string
  subtitle?: string
  slides: [Slide, Slide] // <-- exactamente dos
  dark?: boolean         // header oscuro tipo pasajero
  intervalMs?: number    // por defecto 6000
}

// ==== Componente Card con 2 slides ====
export function TwoSlideCard({
  title,
  subtitle,
  slides,
  dark = false,
  intervalMs = 6000,
}: TwoSlideCardProps) {
  const [index, setIndex] = useState<0 | 1>(0)
  const timer = useRef<NodeJS.Timeout | null>(null)

  const next = useCallback(() => {
    setIndex((prev) => (prev === 0 ? 1 : 0))
  }, [])

  const reset = useCallback(() => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(next, intervalMs)
  }, [next, intervalMs])

  useEffect(() => {
    reset()
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [reset])

  const isDark = dark
  const headerClass = isDark
    ? "bg-gradient-to-br from-[#2a2c38] to-[#1a1c24] text-white"
    : "bg-gradient-to-br from-[#9dd187] to-[#8bc475] text-[#2a2c38]"

  const progressBarBg = "bg-white/50"

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500">
      <CardHeader className={cn("p-7 md:p-8", headerClass)}>
        <CardTitle className="text-2xl md:text-3xl font-bold">{title}</CardTitle>
        {subtitle && (
          <p className={cn("text-base md:text-lg font-semibold italic pt-2", isDark ? "text-gray-300" : "text-[#2a2c38]/85")}>
            “{subtitle}”
          </p>
        )}
      </CardHeader>

      <CardContent className="p-6 md:p-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Imagen */}
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[index].image}
                  alt={slides[index].title}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Texto */}
          <div className="flex flex-col justify-center h-full">
            <motion.h4
              key={`title-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-2xl font-bold text-[#2a2c38] mb-2"
            >
              {slides[index].title}
            </motion.h4>
            <motion.p
              key={`desc-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="text-gray-600 leading-relaxed min-h-[5.5rem]"
            >
              {slides[index].description}
            </motion.p>

            {/* Controles / progreso */}
            <div className="mt-5 flex items-center gap-2">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIndex(i as 0 | 1)
                    reset()
                  }}
                  className={cn(
                    "relative h-1.5 w-12 rounded-full transition-colors",
                    index === i ? "bg-[#9dd187]" : "bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`Ir al slide ${i + 1}`}
                >
                  {index === i && (
                    <motion.span
                      className={cn("absolute left-0 top-0 h-full rounded-full", progressBarBg)}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: (intervalMs - 400) / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ==== SECCIÓN DE EJEMPLO (usa exactamente 2 slides) ====
// Puedes duplicar <TwoSlideCard ... /> si necesitas otra tarjeta con diferente tema.
export function TwoSlideSection() {
  const driverSlides: [Slide, Slide] = [
    {
      image: "/images/eventos/movil2eventos.png", // Movil2EventosImage.src si lo importas
      title: "Publica tu trayecto",
      description: "Selecciona evento, punto de salida y asientos. Pon precio y deja que otros se unan a tu ruta.",
    },
    {
      image: "/images/eventos/movil3eventos.png",
      title: "Gestiona reservas",
      description: "Confirma pasajeros y coordina la hora de encuentro desde la app de forma segura.",
    },
  ]

  const passengerSlides: [Slide, Slide] = [
    {
      image: "/images/eventos/movil4eventos.png",
      title: "Busca y reserva",
      description: "Filtra por hora, precio y cercanía. Reserva tu plaza en segundos para llegar al evento.",
    },
    {
      image: "/images/eventos/movil1eventos.png",
      title: "Sigue tu viaje",
      description: "Recibe notificaciones y chatea con el conductor. Todo centralizado en tu móvil.",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        <TwoSlideCard
          title="Conductores"
          subtitle="Comparte tu ruta y ahorra"
          slides={driverSlides}
          dark={false}
          intervalMs={6000}
        />
        <TwoSlideCard
          title="Pasajeros"
          subtitle="Llega fácil a tu evento"
          slides={passengerSlides}
          dark
          intervalMs={6000}
        />
      </div>
    </section>
  )
}
