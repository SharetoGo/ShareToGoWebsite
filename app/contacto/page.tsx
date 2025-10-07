"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, MessageSquare, Users, Building } from "lucide-react"

import { useToast } from "@/components/ui/use-toast"
export default function Contacto() {
const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    empresa: '', 
    telefono: '',
    asunto: '',
    mensaje: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('Submitting form...');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Email sent successfully!');
        setIsSuccess(true);
        toast({
          title: "Mensaje enviado",
          description: "Tu mensaje ha sido enviado correctamente. Te responderemos en breve.",
        })
        const form = e.target as HTMLFormElement;
        form.reset();
      } else {
        console.error('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <main>
      {/* Hero section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2a2c38] mb-6">Contacta con nosotros</h1>
          <p className="text-xl text-gray-600 mb-8 text-balance">
            ¿Tienes preguntas sobre SharetoGo? Nuestro equipo está aquí para ayudarte a transformar la movilidad de tu
            empresa.
          </p>
        </div>
      </section>
      

      {/* Contact content */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <Card className="p-8 bg-white shadow-lg">
              <CardContent className="pt-0">
                <h2 className="text-2xl font-bold text-[#2a2c38] mb-6">Información de contacto</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#9dd187]/10 rounded-lg flex items-center justify-center">
                      <Phone className="text-[#9dd187]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2a2c38]">Teléfono</h3>
                      <p className="text-gray-600">+34 608 057 220</p>
                      <p className="text-sm text-gray-500">L-V: 9:00 - 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#9dd187]/10 rounded-lg flex items-center justify-center">
                      <Mail className="text-[#9dd187]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2a2c38]">Email</h3>
                      <p className="text-gray-600">contactosharetogo@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#9dd187]/10 rounded-lg flex items-center justify-center">
                      <MapPin className="text-[#9dd187]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2a2c38]">Oficinas</h3>
                      <p className="text-gray-600">Castelldefels, Barcelona, Espana</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-[#2a2c38] mb-6">Envíanos un mensaje</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-3 pl-2" htmlFor="nombre">Nombre completo *</Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          placeholder="Tu nombre"
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-3 pl-2" htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-3 pl-2" htmlFor="empresa">Empresa</Label>
                        <Input
                          id="empresa"
                          name="empresa" // Added name attribute
                          onChange={handleChange}
                          placeholder="Nombre de tu empresa"
                        />
                      </div>
                      <div>
                        <Label className="mb-3 pl-2" htmlFor="telefono">Teléfono</Label>
                        <Input
                          id="telefono"
                          type="tel"
                          name="telefono" // Added name attribute
                          onChange={handleChange}
                          placeholder="+34 600 000 000"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="mb-3 pl-2" htmlFor="asunto">Asunto *</Label>
                      <Select onValueChange={(value) => handleSelectChange("asunto", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el motivo de tu consulta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="demo">Solicitar demo</SelectItem>
                          <SelectItem value="pricing">Información de precios</SelectItem>
                          <SelectItem value="support">Soporte técnico</SelectItem>
                          <SelectItem value="partnership">Alianzas comerciales</SelectItem>
                          <SelectItem value="other">Otros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-3 pl-2" htmlFor="mensaje">Mensaje *</Label>
                      <Textarea
                        id="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#9dd187] hover:bg-[#8bc475] text-white py-3 text-lg">
                      Enviar mensaje
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      Al enviar este formulario, aceptas nuestra política de privacidad. Responderemos en menos de 24
                      horas.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2a2c38] text-center mb-12">Preguntas frecuentes</h2>
          <div className="space-y-6">
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <MessageSquare className="text-[#9dd187] mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-[#2a2c38] mb-2">¿Cuánto tiempo toma recibir una respuesta?</h3>
                    <p className="text-gray-600">
                      Nuestro equipo responde a todas las consultas en menos de 24 horas durante días laborables.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Users className="text-[#9dd187] mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-[#2a2c38] mb-2">¿Ofrecen soporte en otros idiomas?</h3>
                    <p className="text-gray-600">
                      Sí, ofrecemos soporte en español, inglés, francés, italiano y portugués para nuestros clientes
                      internacionales.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Building className="text-[#9dd187] mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-[#2a2c38] mb-2">¿Es posible recibir una visita de un comercial?</h3>
                    <p className="text-gray-600">
                      Por supuesto. Nuestro equipo comercial puede desplazarse a tu empresa para presentaciones
                      personalizadas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
