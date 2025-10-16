"use client"

import { motion } from "framer-motion"
import Hero from "@/components/hero"
import FeaturesBlocks from "@/components/features-blocks"
import Options from "@/components/options"
import Faqs from "@/app/faqs/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, MapPin } from "lucide-react"

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <main className="scroll-smooth">
      {/* Hero */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Hero />
      </motion.section>

      {/* Features */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <FeaturesBlocks />
      </motion.section>

      {/* Options */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Options />
      </motion.section>

      {/* Cómo funciona */}
      <motion.section
        className="py-16 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">Cómo funciona SharetoGo</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Implementar carpooling corporativo nunca fue tan sencillo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="text-white text-2xl" />,
                title: "1. Registro",
                text: "Los empleados se registran con su email corporativo y configuran sus preferencias de viaje",
              },
              {
                icon: <MapPin className="text-white text-2xl" />,
                title: "2. Matching",
                text: "Nuestro algoritmo conecta automáticamente empleados con rutas y horarios compatibles",
              },
              {
                icon: <CheckCircle className="text-white text-2xl" />,
                title: "3. Trayecto",
                text: "Comparten el trayecto de forma segura con seguimiento en tiempo real y sistema de valoraciones",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="text-center p-6 border-2 hover:border-[#9dd187] transition-colors">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-[#9dd187] rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-[#2a2c38] mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  )
}
