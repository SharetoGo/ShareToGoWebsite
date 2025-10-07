"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Slide = {
  image: string
  title: string
  description: string
}

type InteractiveCardProps = {
  title: string
  subtitle: string
  slides: Slide[]
  isDriver?: boolean
}

export function InteractiveCard({ title, subtitle, slides, isDriver = false }: InteractiveCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }, [slides.length])

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(nextSlide, 6000)
  }, [nextSlide])

  useEffect(() => {
    resetInterval()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [resetInterval])

  const handleSlideClick = (index: number) => {
    setCurrentIndex(index)
    resetInterval() // ✅ Reset the timer when user clicks
  }

  const cardVariants = {
    driver: "bg-gradient-to-br from-[#9dd187] to-[#8bc475] text-[#2a2c38]",
    passenger: "bg-gradient-to-br from-[#2a2c38] to-[#1a1c24] text-white",
  }

  const progressVariants = {
    driver: "bg-white/50",
    passenger: "bg-white/50",
  }

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 w-full">
      <CardHeader className={cn("p-8", isDriver ? cardVariants.driver : cardVariants.passenger)}>
        <CardTitle className="text-3xl font-bold">{title}</CardTitle>
        <p className={cn("text-xl font-semibold italic pt-2", isDriver ? "text-[#2a2c38]/90" : "text-gray-300")}>
          "{subtitle}"
        </p>
      </CardHeader>
      <CardContent className="p-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative h-96 md:h-96 rounded-lg overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[currentIndex].image}
                  alt={slides[currentIndex].title}
                  layout="fill"
                  objectFit="contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center h-full space-y-6 text-center md:text-left">
            <div>
              <h4 className="text-2xl font-bold text-[#2a2c38] mb-2">{slides[currentIndex].title}</h4>
              <p className="text-gray-600 leading-relaxed min-h-[6em]">{slides[currentIndex].description}</p>
            </div>
            <div className="flex justify-center md:justify-start gap-2 pt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideClick(index)} // ✅ Reset on click
                  className={cn(
                    "w-10 h-1.5 rounded-full transition-all duration-300 relative overflow-hidden",
                    currentIndex === index ? ("bg-[#9dd187]") : "bg-gray-300 hover:bg-gray-400"
                  )}
                >
                  <span className="sr-only">Go to slide {index + 1}</span>
                  {currentIndex === index && (
                    <motion.div
                      className={cn("absolute left-0 top-0 h-full rounded-full", isDriver ? progressVariants.driver : progressVariants.passenger)}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5.5, ease: "linear" }} // 5.5s for visual match with 6s timer
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
