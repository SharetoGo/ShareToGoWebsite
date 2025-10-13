"use client"

import { QRCodeCanvas } from "qrcode.react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DownloadSection() {
  const qrLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/downloads`
      : "/downloads"

  return (
    <main className="space-y-10 md:space-y-16 bg-gray-50">
      {/* QR Section */}
      <section className="bg-[#2a2c38] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* LEFT SIDE */}
          <div className="flex flex-col items-center text-center md:w-1/2">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <QRCodeCanvas value={qrLink} size={160} />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-white">
              Descarga nuestra aplicación
            </h2>
            <p className="mt-2 text-white max-w-sm">
              Comparte tus trayectos diarios y ahorra todo el año. Optimiza las
              plazas libres de tu coche y obten beneficios económicos con
              SharetoGo.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/descargar/inicio.jpeg"
              alt="imagen"
              className="max-w-xs w-full drop-shadow-lg rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Middle Section */}
      <section className="bg-gray-50 py-16 flex flex-col justify-center gap-4">
        <h1 className="text-4xl md:text-4xl font-extrabold leading-tight text-[#2a2c38] text-center">
          Todo en dos clicks
        </h1>
        <h2 className="text-4xl md:text-2xl font-medium leading-tight text-[#2a2c38] text-center pb-12">
          ¿Empezamos?
        </h2>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* LEFT SIDE - Photo */}
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/images/descargar/movil.png"
                alt="imagen"
                className="max-w-xs w-full h-120 object-cover object-top drop-shadow-lg rounded-xl"
              />
            </div>

            {/* RIGHT SIDE - Content */}
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] text-center">
                Empresas y eventos
              </h2>
              <ul className="text-[#2a2c38] text-lg leading-relaxed list-disc list-inside space-y-2">
                <li>
                  Recuerda compartir tu coche cada día o al asistir a un evento.
                </li>
                <li>
                  Futuros compañeros de trayecto pueden unirse a tu coche
                  ahorrando juntos.
                </li>
                <li>
                  Contribuye a un transporte más sostenible mientras conoces a
                  gente nueva o fortaleces relaciones.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Empresa y Evento Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row gap-8">
          {/* Left Division - Empresa */}
          <div
            className="relative md:w-1/2 h-64 rounded-xl overflow-hidden flex flex-col items-center justify-center text-center group cursor-pointer"
            style={{
              backgroundImage: "url('/images/descargar/empresa.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-60"></div>

            {/* Default content */}
            <div className="relative z-10 flex flex-col items-center justify-center transition-all duration-500">
              <h3 className="text-white text-3xl font-bold transition-transform duration-500 group-hover:-translate-y-12">
                ¿Eres una empresa?
              </h3>
              <ArrowRight
                className="mt-4 text-white w-8 h-8 opacity-100 translate-y-0 transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-6"
                strokeWidth={2.5}
              />
            </div>

             {/* Hover content */}
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white opacity-0 translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 z-10 px-4">
               <p className="text-lg mb-4 max-w-sm text-center">
                 Empieza ya con tu solución para movilidad corporativa
               </p>
               <Button
                 variant="secondary"
                 className="bg-[#9dd187] text-[#2a2c38] font-semibold hover:bg-[#8bc475] mx-auto"
                 asChild
               >
                 <a href="/contratar">Agenda reunión</a>
               </Button>
             </div>
          </div>

          {/* Right Division - Evento */}
          <div
            className="relative md:w-1/2 h-64 rounded-xl overflow-hidden flex flex-col items-center justify-center text-center group cursor-pointer"
            style={{
              backgroundImage: "url('/images/descargar/evento.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-60"></div>

            {/* Default content */}
            <div className="relative z-10 flex flex-col items-center justify-center transition-all duration-500">
              <h3 className="text-white text-3xl font-bold transition-transform duration-500 group-hover:-translate-y-12">
                ¿Eres un evento?
              </h3>
              <ArrowRight
                className="mt-4 text-white w-8 h-8 opacity-100 translate-y-0 transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-6"
                strokeWidth={2.5}
              />
            </div>

             {/* Hover content */}
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white opacity-0 translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 z-10 px-4">
               <p className="text-lg mb-4 max-w-sm text-center">
                 Contacta para añadirte como evento elegible
               </p>
               <Button
                 variant="secondary"
                 className="bg-[#9dd187] text-[#2a2c38] font-semibold hover:bg-[#8bc475] mx-auto"
                 asChild
               >
                 <a href="/contratar">Agenda reunión</a>
               </Button>
             </div>
          </div>
        </div>
      </section>
    </main>
  )
}
