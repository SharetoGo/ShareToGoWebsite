import { Sprout, BadgeEuro, Users } from 'lucide-react';
import Image from "next/image"

export default function FeaturesBlocks() {
  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* App preview */}
          <div className="relative order-2 lg:order-1">
              <Image
                src="/images/captura_inicio.jpg"
                priority={true}
                width={100}
                height={100}
                alt="SharetoGo dashboard preview"
                className="w-xs h-xs rounded-4xl shadow-2xl mx-auto lg:mx-0 border-10 border-white object-cover"
              />
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                ¿Por qué empezar a usar <span className="text-primary">SharetoGo</span>?
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Transforma la movilidad de tu empresa con nuestra plataforma inteligente de carpooling corporativo.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Sprout className="text-primary-foreground text-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Reducción de emisiones de CO₂</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     El coche privado es la principal fuente de emisiones. Reducir su uso disminuye la huella de carbono además de la congestión en los alrededores de la empresa.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <Users className="text-accent-foreground text-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Beneficios sociales y laborales</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    El coche compartido favorece el bienestar y la cohesión del equipo, mejora la experiencia diaria de los trabajadores y permite deducir fiscalmente los gastos vinculados a la movilidad.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <BadgeEuro className="text-primary-foreground text-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Ahorro económico</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Ahorro en infraestructuras, menos demanda de aparcamiento y mayor eficiencia para los desplazamientos diarios de los trabajadores
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
