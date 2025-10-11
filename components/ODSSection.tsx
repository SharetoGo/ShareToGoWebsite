"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, HeartPulse, Building2, Landmark, Recycle } from "lucide-react"
import clsx from "clsx"

type ODSItem = {
  code: string
  title: string
  desc: string
  icon: React.ReactNode
}

const ODS: ODSItem[] = [
  { code: "SDG 3",  title: "Salud y bienestar",    desc: "Menos contaminación y tráfico para una mejor calidad del aire.", icon: <HeartPulse className="w-5 h-5" /> },
  { code: "SDG 9",  title: "Industria e innovación", desc: "Movilidad inteligente con tecnología y rutas compartidas.",     icon: <Building2 className="w-5 h-5" /> },
  { code: "SDG 11", title: "Ciudades sostenibles",  desc: "Menos congestión y emisiones; ciudades más habitables.",        icon: <Landmark className="w-5 h-5" /> },
  { code: "SDG 12", title: "Consumo responsable",   desc: "Uso compartido del vehículo y recursos más eficientes.",         icon: <Recycle className="w-5 h-5" /> },
  { code: "SDG 13", title: "Acción por el clima",   desc: "Carpooling que reduce directamente el CO₂.",                    icon: <Leaf className="w-5 h-5" /> },
]

export function ODSSection({ dark = false }: { dark?: boolean }) {
  return (
    <section className={clsx("py-12 md:py-16", dark ? "bg-[#1a1c24]" : "bg-white")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge className="bg-[#9dd187] text-white">Sostenibilidad</Badge>
          <h2 className={clsx("mt-3 text-3xl md:text-4xl font-bold", dark ? "text-white" : "text-[#2a2c38]")}>
            ¿A qué ODS contribuimos?
          </h2>
          <p className={clsx("mt-2 max-w-2xl mx-auto", dark ? "text-gray-300" : "text-gray-600")}>
            SharetoGo impulsa una movilidad colaborativa alineada con los Objetivos de Desarrollo Sostenible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ODS.map((o) => {
            const isKey = o.code === "SDG 11"
            return (
              <Card
                key={o.code}
                className={clsx(
                  "p-0 relative transition-shadow",
                  // tema base
                  dark
                    ? "bg-white/10 backdrop-blur border-white/20"
                    : "bg-white border border-gray-200 shadow-sm",
                  // 🔥 destacado solo para SDG 11 (sin cambiar tamaño)
                  isKey &&
                    (dark
                      ? "ring-2 ring-[#9dd187] shadow-[0_0_0_4px_rgba(157,209,135,0.15)]"
                      : "ring-2 ring-[#9dd187] shadow-[0_0_0_6px_rgba(157,209,135,0.10)] bg-gradient-to-br from-white to-[#f6fbf1]")
                )}
              >
                {/* Badge "Clave" en esquina */}
                {isKey && (
                  <span
                    className={clsx(
                      "absolute -top-2 -right-2 rounded-md px-2 py-1 text-[10px] font-bold",
                      dark ? "bg-[#9dd187] text-[#1a1c24]" : "bg-[#9dd187] text-white"
                    )}
                    aria-label="ODS prioritario"
                  >
                    Clave
                  </span>
                )}

                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={clsx("w-8 h-8 rounded-md flex items-center justify-center", "bg-[#9dd187]")}>
                      {o.icon}
                    </div>
                    <span className={clsx("text-xs font-semibold tracking-wide", dark ? "text-white" : "text-[#2a2c38]")}>
                      {o.code}
                    </span>
                  </div>
                  <p className={clsx("font-semibold", dark ? "text-white" : "text-[#2a2c38]")}>{o.title}</p>
                  <p className={clsx("text-sm mt-1", dark ? "text-gray-300" : "text-gray-600")}>{o.desc}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
