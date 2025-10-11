"use client"

import { QRCodeCanvas } from "qrcode.react"

export default function DownloadSection() {
  const qrLink = typeof window !== "undefined" ? `${window.location.origin}/downloads` : "/downloads"

  return (
    <main className="space-y-10 md:space-y-16 bg-gray-50">
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
            Comparte tus trayectos diarios y ahorra todo el año. Optimiza las plazas libres de tu coche y obten beneficios económicos con SharetoGo.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/images/app-preview.png"
            alt="Imagen aquí"
            className="max-w-xs w-full drop-shadow-lg rounded-xl"
          />
        </div>
      </div>
    </section>
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
                    src="/images/app-preview.png"
                    alt="Imagen aquí"
                    className="max-w-xs w-full drop-shadow-lg rounded-xl"
                    />
                </div>
                
                {/* RIGHT SIDE - Content */}
                <div className="md:w-1/2 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] text-center">
                        Empresas y eventos
                    </h2>
                    <ul className="text-[#2a2c38] text-lg leading-relaxed list-disc list-inside space-y-2">
                        <li>Recuerda compartir tu coche cada día o al asistir a un evento.</li>
                        <li>Futuros compañeros de trayecto pueden unirse a tu coche ahorrando juntos.</li>
                        <li>Contribuye a un transporte más sostenible mientras conoces a gente nueva o fortaleces relaciones.</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    </main>

  )
}
