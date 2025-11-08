"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FaHandshakeSimple } from "react-icons/fa6"
import {
  Building2,
  TrendingUp,
  Shield,
  BarChart3,
  Users,
  Leaf,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  Target,
  Zap,
} from "lucide-react"

export default function EspacioEmpresas() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <main className="scroll-smooth">
      {/* Hero section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-gradient-to-br from-[#2a2c38] via-[#2a2c38] to-[#1a1c24]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="bg-[#9dd187] text-white mb-4">Soluciones Empresariales</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Transforma la movilidad de tu empresa
              </h1>
              <p className="text-xl text-gray-300 mb-8 text-pretty">
                Soluciones de carpooling corporativo diseñadas para empresas que buscan reducir costos, mejorar el
                bienestar de sus empleados y alcanzar sus objetivos de sostenibilidad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contratar">
                  <Button className="bg-[#9dd187] hover:bg-[#8bc475] text-white px-8 py-4 text-lg">Solicitar demo</Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#2a2c38] px-8 py-4 text-lg bg-transparent"
                  onClick={() => document.getElementById('casos-exito')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver casos de éxito
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-[#9dd187] mb-2">20</div>
                  <p className="text-white text-sm">Empresas activas</p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-[#9dd187] mb-2">300T</div>
                  <p className="text-white text-sm">De CO₂ ahorrado</p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-[#9dd187] mb-2">40%</div>
                  <p className="text-white text-sm">Ahorro costos</p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-[#9dd187] mb-2">95%</div>
                  <p className="text-white text-sm">Satisfacción</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Solutions section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">Soluciones adaptadas a tu empresa</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada empresa es única. Por eso ofrecemos soluciones flexibles que se adaptan a tus necesidades
              específicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-2 hover:border-[#9dd187] transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#9dd187] rounded-xl flex items-center justify-center mb-6">
                  <Building2 className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#2a2c38] mb-4">Empresas Medianas</h3>
                <p className="text-gray-600 mb-6">
                  Solución completa para empresas de 50-250 empleados que buscan optimizar la movilidad corporativa.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={8} />
                    <span>Dashboard de sostenibilidad personalizado</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={8} />
                    <span>Implementación en 2 semanas</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={8} />
                    <span>Formación de equipo y profesionales dedicados</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={8} />
                    <span>Integración con herramientas existentes</span>
                  </li>
                </ul>
                <Link href="/contratar">
                <Button className="w-full bg-[#9dd187] hover:bg-[#8bc475] text-white">Más información</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="p-8 border-2 hover:border-[#9dd187] transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#2a2c38] rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="text-white text-2xl" />
                </div>
                <Badge className="bg-[#9dd187] text-white mb-4">Más popular</Badge>
                <h3 className="text-xl font-semibold text-[#2a2c38] mb-4">Grandes Empresas</h3>
                <p className="text-gray-600 mb-6">
                  Solución enterprise para organizaciones de 250+ empleados con múltiples ubicaciones.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={8} />
                    <span>Dashboard de sostenibilidad personalizado</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={8} />
                    <span>Integraciones e interfaces personalizadas</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={8} />
                    <span>Formación y soporte para equipos grandes</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={8} />
                    <span>Account Manager dedicado</span>
                  </li>
                </ul>
                <Link href="/contratar">
                  <Button className="w-full bg-[#2a2c38] hover:bg-[#1a1c24] text-white">Más información</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="p-8 border-2 hover:border-[#9dd187] transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#9dd187] rounded-xl flex items-center justify-center mb-6">
                  <Zap className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#2a2c38] mb-4">Startups & Pymes</h3>
                <p className="text-gray-600 mb-6">
                  Solución ágil y económica para empresas en crecimiento de 10-50 empleados.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={8} />
                    <span>Dashboard de sostenibilidad personalizado</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={8} />
                    <span>Setup rápido: 1 semana</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={8} />
                    <span>Soporte dedicado</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-[#9dd187]" size={8} />
                    <span>Sin costos de implementación</span>
                  </li>
                </ul>
                <Link href="/contratar">
                <Button className="w-full bg-[#9dd187] hover:bg-[#8bc475] text-white">Más información</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

        <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-white"
        >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">¿Perteneces a un parque industrial o quieres asociarte con otra empresa?</h2>
            <h3 className="text-xl font-medium text-[#2a2c38] max-w-2xl mx-auto mb-6">
                Os unimos como partnership empresarial
            </h3>
            <div className="flex justify-center mb-6">
              <div className="bg-[#9dd187] w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                <FaHandshakeSimple className="text-white text-4xl" />
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center mb-2">
                En parques empresariales, polígonos o zonas industriales donde coexisten varias empresas  SharetoGo permite establecer acuerdos de unión entre empresas para optimizar todos los desplazamientos desde esas zonas.            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center">
                Cada empresa mantiene su propio panel de control si lo desea, con sus respectivos reportes de sostenibilidad. 
                Existe la posibilidad de que sea el mismo reporte para toda la zona.            </p>
          </div>
        </div>
      </motion.section>

      {/* Benefits section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">
              ¿Por qué las empresas eligen SharetoGo?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#9dd187] rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#2a2c38] mb-3">ROI Medible</h3>
              <p className="text-gray-600">
                Dashboard completo con métricas de ahorro, impacto ambiental y adopción en tiempo real.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#2a2c38] rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#2a2c38] mb-3">Máxima Seguridad</h3>
              <p className="text-gray-600">
                Verificación de identidad, seguimiento GPS y protocolos de seguridad empresarial.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#9dd187] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#2a2c38] mb-3">Adopción Garantizada</h3>
              <p className="text-gray-600">
                Programa de onboarding y gamificación que asegura alta participación de empleados.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#2a2c38] rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#2a2c38] mb-3">Impacto Sostenible</h3>
              <p className="text-gray-600">
                Contribuye a los objetivos ESG de tu empresa con métricas verificables de reducción de CO₂.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#9dd187] rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#2a2c38] mb-3">Implementación Rápida</h3>
              <p className="text-gray-600">De la firma del contrato a la primera semana de uso en menos de 14 días.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#2a2c38] rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#2a2c38] mb-3">Soporte Premium</h3>
              <p className="text-gray-600">
                Account manager dedicado, soporte 24/7 y actualizaciones continuas incluidas.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Case studies section */}
      <motion.section
        id="casos-exito"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">Casos de éxito</h2>
            <p className="text-lg text-gray-600">Empresas que ya están transformando su movilidad</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#9dd187] rounded-lg flex items-center justify-center">
                    <Building2 className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2a2c38]">TechCorp España</h3>
                    <p className="text-gray-600 text-sm">1,200 empleados • Tecnología</p>
                  </div>
                </div>
                <blockquote className="text-gray-600 mb-6 italic">
                  "SharetoGo nos ayudó a reducir un 60% los costos de parking y mejorar significativamente la
                  satisfacción de nuestros empleados. La implementación fue sorprendentemente rápida."
                </blockquote>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#9dd187]">60%</div>
                    <div className="text-xs text-gray-600">Ahorro parking</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#9dd187]">78%</div>
                    <div className="text-xs text-gray-600">Adopción</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#9dd187]">92%</div>
                    <div className="text-xs text-gray-600">Satisfacción</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#2a2c38] rounded-lg flex items-center justify-center">
                    <Target className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2a2c38]">Consultoría Global</h3>
                    <p className="text-gray-600 text-sm">800 empleados • Consultoría</p>
                  </div>
                </div>
                <blockquote className="text-gray-600 mb-6 italic">
                  "La plataforma se integró perfectamente con nuestros sistemas existentes. Nuestros empleados la
                  adoptaron inmediatamente y los resultados superaron expectativas."
                </blockquote>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#9dd187]">45%</div>
                    <div className="text-xs text-gray-600">Reducción CO₂</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#9dd187]">85%</div>
                    <div className="text-xs text-gray-600">Adopción</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#9dd187]">€180k</div>
                    <div className="text-xs text-gray-600">Ahorro anual</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
