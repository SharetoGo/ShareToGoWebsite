import Hero from "@/components/hero"
import FeaturesBlocks from "@/components/features-blocks"
import Options from "@/components/options"
import Faqs from "@/app/faqs/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, MapPin, Shield, Clock, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturesBlocks />
      <Options />

      {/* How it works section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">Cómo funciona SharetoGo</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Implementar carpooling corporativo nunca fue tan sencillo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-2 hover:border-[#9dd187] transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#9dd187] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#2a2c38] mb-2">1. Registro</h3>
                <p className="text-gray-600">
                  Los empleados se registran con su email corporativo y configuran sus preferencias de viaje
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-[#9dd187] transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#9dd187] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#2a2c38] mb-2">2. Matching</h3>
                <p className="text-gray-600">
                  Nuestro algoritmo conecta automáticamente empleados con rutas y horarios compatibles
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-[#9dd187] transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#9dd187] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#2a2c38] mb-2">3. Trayecto</h3>
                <p className="text-gray-600">
                  Comparten el trayecto de forma segura con seguimiento en tiempo real y sistema de valoraciones
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
