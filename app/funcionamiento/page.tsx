"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { Badge } from "@/components/ui/badge"; // Assuming Badge component exists
import {
  Smartphone,
  UserPlus,
  MapPin,
  Users,
  Car,
  CheckCircle,
  Star,
  Shield,
  Clock,
  Bell,
  CreditCard,
  BarChart3,
  Play,
  ArrowRight,
} from "lucide-react";

export default function Funcionamiento() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const driverSlides = [
    {
      image: "/images/conductor1.PNG",
      title: "Publica tu trayecto",
      description:
        "Abre la app y publica fácilmente tu ruta diaria. Indica tu origen, destino, horario y las plazas que tienes disponibles.",
    },
    {
      image: "/images/conductor2.PNG",
      title: "Recibe solicitudes",
      description:
        "Tus compañeros de empresa verán tus trayectos y podrán solicitar unirse. Recibirás notificaciones al instante.",
    },
    {
      image: "/images/conductor3.PNG",
      title: "Ahorra y comparte",
      description:
        "Acepta a tus pasajeros, comparte gastos de forma automática y disfruta de un trayecto más ameno y sostenible.",
    },
  ];

  const passengerSlides = [
    {
      image: "/images/movil2.png",
      title: "Busca tu trayecto",
      description:
        "Introduce tu destino y encuentra trayectos compatibles publicados por otros usuarios.",
    },
    {
      image: "/images/info_trayecto.png",
      title: "Reserva tu plaza",
      description:
        "Revisa los detalles del trayecto, el perfil del conductor y reserva tu asiento con un solo toque.",
    },
    {
      image: "/images/chat1.png",
      title: "Coordina y viaja",
      description:
        "Usa el chat integrado para coordinar los últimos detalles y prepárate para un trayecto cómodo y seguro.",
    },
  ];

  return (
    <main className="scroll-smooth">
      {/* Hero section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-16"
      >
        <section className="py-16 md:py-24 bg-linear-to-br from-[#2a2c38] to-[#1a1c24] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="bg-white/10 text-white mb-6">
              Funcionamiento de la App
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Compartir trayectos nunca fue tan fácil
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-300 italic mb-8">
              Actúa como conductor y/o pasajero
            </h2>
            <p className="text-xl text-gray-300 mb-8 text-balance">
              Descubre cómo SharetoGo conecta a tus empleados de forma
              inteligente, segura y eficiente para crear una experiencia de
              carpooling excepcional.
            </p>
            <Button className="bg-[#9dd187] hover:bg-[#8bc475] text-[#2a2c38] font-semibold px-8 py-4 text-lg">
              <Play className="mr-2" size={20} />
              Ver demo en vivo
            </Button>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">
                Para conductores y pasajeros
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Tanto si ofreces tu coche como si buscas un trayecto, el proceso es sencillo, intuitivo y gratificante.
              </p>
            </div>

            <div className="flex flex-col items-center gap-12 lg:gap-16">
              <motion.section
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="w-full"
              >
                <InteractiveCard
                  title="Si eres conductor"
                  subtitle="Gana dinero sin cambiar tu rutina"
                  slides={driverSlides}
                  isDriver
                />
              </motion.section>

              <motion.section
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="w-full"
              >
                <InteractiveCard
                  title="Si eres pasajero"
                  subtitle="Viaja cómodo, ahorra y conecta"
                  slides={passengerSlides}
                />
              </motion.section>
            </div>
          </div>
        </section>
      </motion.section>

      {/* Step by step process */}
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">
              Proceso paso a paso
            </h2>
            <p className="text-lg text-gray-600">
              Desde el registro hasta el trayecto completado
            </p>
          </div>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#9dd187] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-[#2a2c38]">
                    Registro y configuración
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-lg">
                  Los empleados se registran con su dirección de correo
                  electrónico personal o corporativo y añaden sus credenciales para
                  configurar su cuenta.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle
                      className="text-[#9dd187] shrink-0"
                      size={20}
                    />
                    <span>
                      Inicia sesión y regístrate introduciendo tus datos básicos.
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle
                      className="text-[#9dd187] shrink-0"
                      size={20}
                    />
                    <span>
                      Asegúrate de que todo está configurado en la sección de tu
                      cuenta.
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle
                      className="text-[#9dd187] shrink-0"
                      size={20}
                    />
                    <span>
                      Navega por la aplicación para publicar tus plazas libres o encontrar los mejores trayectos disponibles.
                    </span>
                  </li>
                </ul>
              </div>
              <Card className="p-8 bg-gray-50/50 border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-[#9dd187] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <UserPlus className="text-white text-2xl" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-[#2a2c38] mb-2">
                      Onboarding intuitivo
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Proceso de registro de menos de 5 minutos con guía paso a
                      paso. 
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Card className="p-8 bg-gray-50/50 border-2 border-dashed order-2 lg:order-1">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-[#2a2c38] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MapPin className="text-white text-2xl" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-[#2a2c38] mb-2">
                      Búsqueda y coincidencia
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Encuentra el destino que más te convenga y resérvalo con un
                      simple clic.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#2a2c38] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-[#2a2c38]">
                    Búsqueda y matching
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-lg">
                  ¿Buscas un trayecto? Solo tienes que escribir tu destino en la
                  sección de reservas y encontrar tu coincidencia.
                </p>
                <div className="flex flex-col md:flex-row md:items-center md:gap-8">
                  <ul className="space-y-3 flex-1">
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="text-[#9dd187] shrink-0"
                        size={20}
                      />
                      <span>Ve a la página de reservas.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="text-[#9dd187] shrink-0"
                        size={20}
                      />
                      <span>Busca tu punto de origen o destino.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="text-[#9dd187] shrink-0"
                        size={20}
                      />
                      <span>Reserva tu trayecto coincidente.</span>
                    </li>
                  </ul>
                  <div className="my-6 h-px bg-[#2a2c38] md:my-0 md:w-px md:h-full md:self-stretch" />
                  <ul className="space-y-3 flex-1">
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="text-[#9dd187] shrink-0"
                        size={20}
                      />
                      <span>Ve al apartado de zonas favoritas en tu cuenta.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="text-[#9dd187] shrink-0"
                        size={20}
                      />
                      <span>Añádete a la zona que prefieras.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="text-[#9dd187] shrink-0"
                        size={20}
                      />
                      <span>
                        Filtra en “Reservar” para ver los mejores trayectos y
                        confirma tu plaza.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#9dd187] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-[#2a2c38]">
                    Conexión y coordinación
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-lg">
                  Los empleados se conectan directamente a través de la app,
                  coordinan detalles del trayecto y confirman su participación.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle
                      className="text-[#9dd187] shrink-0"
                      size={20}
                    />
                    <span>Chat integrado para coordinación.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle
                      className="text-[#9dd187] shrink-0"
                      size={20}
                    />
                    <span>Confirmación automática de disponibilidad.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle
                      className="text-[#9dd187] shrink-0"
                      size={20}
                    />
                    <span>Notificaciones push en tiempo real.</span>
                  </li>
                </ul>
              </div>
              <Card className="p-8 bg-gray-50/50 border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-[#9dd187] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="text-white text-2xl" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-[#2a2c38] mb-2">
                      Comunicación fluida
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Herramientas integradas para coordinar cada detalle del
                      trayecto.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
