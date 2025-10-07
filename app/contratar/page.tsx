"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Users, Building, Calendar, Phone, Mail, MapPin } from "lucide-react"

export default function Contratar() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    telefono: "",
    empleados: "",
    mensaje: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <main>
      {/* Hero section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#2a2c38] to-[#1a1c24]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Solicita tu demo gratuita</h1>
          <p className="text-xl text-gray-300 mb-8 text-balance">
            Descubre cómo SharetoGo puede transformar la movilidad de tu empresa en solo 30 minutos
          </p>
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 text-white">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle className="text-[#9dd187]" size={20} />
              <span>Demo personalizada</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle className="text-[#9dd187]" size={20} />
              <span>Sin compromiso</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle className="text-[#9dd187]" size={20} />
              <span>Implementación rápida</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle className="text-[#9dd187]" size={20} />
              <span>Período de prueba de dos semanas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <Card className="p-8">
                <CardContent className="pt-6">
                  {submitted ? (
                    <div className="py-10 text-center">
                      <p className="text-lg text-gray-700">
                        Hemos recibido tu petición, en breves te contactaremos, muchas gracias.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-[#2a2c38] mb-6">Información de contacto</h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="mb-2 pl-2" htmlFor="nombre">Nombre completo *</Label>
                            <Input
                              id="nombre"
                              value={formData.nombre}
                              onChange={(e) => handleInputChange("nombre", e.target.value)}
                              placeholder="Tu nombre"
                              required
                            />
                          </div>
                          <div>
                            <Label className="mb-2 pl-2" htmlFor="email">Email corporativo *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder="tu@empresa.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="mb-2 pl-2" htmlFor="empresa">Empresa *</Label>
                            <Input
                              id="empresa"
                              value={formData.empresa}
                              onChange={(e) => handleInputChange("empresa", e.target.value)}
                              placeholder="Nombre de tu empresa"
                              required
                            />
                          </div>
                          <div>
                            <Label className="mb-2 pl-2" htmlFor="telefono">Teléfono</Label>
                            <Input
                              id="telefono"
                              type="tel"
                              value={formData.telefono}
                              onChange={(e) => handleInputChange("telefono", e.target.value)}
                              placeholder="+34 600 000 000"
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="mb-2 pl-2" htmlFor="empleados">Número de empleados *</Label>
                          <Select onValueChange={(value) => handleInputChange("empleados", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona el tamaño de tu empresa" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="50-100">10-50 empleados</SelectItem>
                              <SelectItem value="50-100">51-100 empleados</SelectItem>
                              <SelectItem value="100-500">101-250 empleados</SelectItem>
                              <SelectItem value="500-1000">Más de 250 empleados</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="mb-2 pl-2" htmlFor="mensaje">Mensaje adicional</Label>
                          <Textarea
                            id="mensaje"
                            value={formData.mensaje}
                            onChange={(e) => handleInputChange("mensaje", e.target.value)}
                            placeholder="Cuéntanos sobre tus necesidades específicas de movilidad..."
                            rows={4}
                          />
                        </div>

                        <Button type="submit" className="w-full bg-[#9dd187] hover:bg-[#8bc475] text-white py-3 text-lg">
                          Solicitar demo gratuita
                        </Button>

                        <p className="text-sm text-gray-500 text-center">
                          Al enviar este formulario, aceptas que nos pongamos en contacto contigo para programar tu demo.
                        </p>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#2a2c38] mb-6">¿Qué incluye tu demo?</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-[#9dd187] rounded-full flex items-center justify-center">
                        <Users className="text-white" size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2a2c38] mb-1">Análisis personalizado</h3>
                      <p className="text-gray-600">
                        Evaluamos las necesidades específicas de movilidad de tu empresa y calculamos el ROI potencial.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-[#2a2c38] rounded-full flex items-center justify-center">
                        <Building className="text-white" size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2a2c38] mb-1">Demo en vivo</h3>
                      <p className="text-gray-600">
                        Te mostramos la plataforma en funcionamiento con datos simulados de tu empresa.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-[#9dd187] rounded-full flex items-center justify-center">
                        <Calendar className="text-white" size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2a2c38] mb-1">Plan de implementación</h3>
                      <p className="text-gray-600">
                        Diseñamos un roadmap personalizado para la implementación en tu empresa. 
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <Card className="p-4 bg-[#2a2c38] text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">¿Prefieres hablar directamente?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone size={20} className="text-[#9dd187]" />
                      <span>+34 608 057 220</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={20} className="text-[#9dd187]" />
                      <span>contactosharetogo@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-[#9dd187]" />
                      <span>Castelldefels, Barcelona, España</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mt-4">Horario de atención: Lunes a Viernes, 9:00 - 18:00</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2a2c38] text-center mb-12">Preguntas frecuentes</h2>
          <div className="space-y-6">
            <Card className="p-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-[#2a2c38] mb-2">¿Cuánto tiempo toma implementar SharetoGo?</h3>
                <p className="text-gray-600">
                  La implementación típica toma hasta 2 semanas, incluyendo configuración, integración con sistemas
                  existentes y formación del equipo.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-[#2a2c38] mb-2">¿Qué nivel de adopción puedo esperar?</h3>
                <p className="text-gray-600">
                  Nuestros clientes ven típicamente una adopción del 60-80% en los primeros 3 meses, con tasas de
                  satisfacción superiores al 95%.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-[#2a2c38] mb-2">¿Cómo garantizan la seguridad de los empleados?</h3>
                <p className="text-gray-600">
                  Incluimos verificación de identidad, seguimiento GPS en tiempo real, sistema de valoraciones y soporte
                  24/7 para emergencias.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
