import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, MessageCircle, Rocket } from "lucide-react"

export default function Options() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#9dd187] to-[#8bc475]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">Ponlo en marcha en tu empresa</h2>
          <p className="text-lg text-[#2a2c38]/80 max-w-2xl mx-auto">
            Integra SharetoGo en tu negocio y empieza a transformar la movilidad corporativa desde hoy mismo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
          {/* Image Section */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/images/woman-in-car-2.jpg"
              width={500}
              height={500}
              alt="Profesional junto a coche corporativo"
              className="w-full h-full object-fit rounded-3xl"
            />
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <Card className="bg-[#9dd187]/95 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="px-4 py-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2a2c38] rounded-full flex items-center justify-center flex-shrink-0">
                    <Rocket className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2a2c38] mb-2">Integra SharetoGo en tu negocio</h3>
                    <p className="text-gray-600 mb-4">
                      Empieza desde hoy mismo y transforma la movilidad de tus empleados
                    </p>
                    <Link href="/contratar">
                      <Button className="bg-[#2a2c38] hover:bg-[#1a1c28] text-white group">
                        Prueba ya
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#9dd187]/95 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="px-4 py-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2a2c38] rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2a2c38] mb-2">¿Tienes alguna duda?</h3>
                    <p className="text-gray-600 mb-4">
                      Ponte en contacto con nuestro servicio de atención al cliente especializado
                    </p>
                    <Link href="/contacto">
                      <Button className="bg-[#2a2c38] hover:bg-[#1a1c28] text-white group">
                        Contacta con nosotros
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
