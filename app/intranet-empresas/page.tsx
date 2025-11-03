'use client'

import { useEffect } from 'react'
import { useAuth } from './auth/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function EspacioEmpresas() {
  const { user, companyData, loading } = useAuth()
  const router = useRouter()

  // 🔹 Manejar redirección segura
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/intranet-empresas/auth') // usamos replace para no dejar el back en el historial
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await signOut(auth)
    router.replace('/intranet-empresas/auth')
  }

  // 🔹 Mostrar pantalla de carga mientras validamos sesión
  if (loading || (!user && !loading)) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-[#2a2c38]">Cargando...</div>
      </div>
    )
  }

  // 🔹 Si no hay usuario, no renderizamos nada más (evitamos parpadeo)
  if (!user) return null

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-transparent py-8 pt-24">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[#2a2c38]">
            ¡Bienvenida, {companyData?.name}!
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="flex justify-center">
        <div className="w-4/5 h-1 bg-black" />
      </div>

      {/* Estadísticas principales */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-semibold text-center text-black">
            Tu empresa tiene...
          </h2>
        </div>
      </div>

      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: 'Trayectos Completados', value: 'XX' },
              { label: 'Kg de CO2 ahorrados', value: 'XX' },
              { label: 'Km completados', value: 'XX' },
              { label: 'Personas Transportadas', value: 'XX' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-black mb-2">{item.value}</div>
                <div className="text-gray-600 text-sm md:text-lg">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel de empleados */}
      <div className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
            <div className="flex flex-col text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-semibold text-black mb-4">
                Consulta la actividad de tus empleados:
              </h3>
              <div className="flex justify-center lg:justify-start">
                <button className="bg-[#9dd187] text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-[#8bc176] transition-colors">
                  Ir al panel de empleados
                </button>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-sm lg:w-96 h-24 md:h-32 bg-[#9dd187] rounded-lg shadow-md flex flex-col justify-center">
                <h4 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent text-center">
                  Top Conductores del Mes:
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reportes */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-4xl font-bold text-center text-black mb-8">
            Report de Sostenibilidad
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-[#2a2c38] mb-4">Trayectos Compartidos</h4>
              <div className="bg-[#9dd187] rounded-lg shadow-md h-40 md:h-48"></div>
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-[#2a2c38] mb-4">Kilómetros Recorridos</h4>
              <div className="bg-[#9dd187] rounded-lg shadow-md h-40 md:h-48"></div>
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-[#2a2c38] mb-4">CO2 Ahorrado</h4>
              <div className="bg-[#9dd187] rounded-lg shadow-md h-40 md:h-48"></div>
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-[#2a2c38] mb-4">Coches Eliminados de la Vía</h4>
              <div className="bg-[#9dd187] rounded-lg shadow-md h-40 md:h-48"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Total a Subvencionar */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-4xl font-bold text-center text-black">
            Total a Subvencionar
          </h3>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="text-lg md:text-xl font-bold text-black text-center">
            ¡Gracias por contar con <br /> SharetoGo!
          </div>
          <button className="bg-[#2a2c38] text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold text-lg md:text-xl hover:bg-[#1a1c28] transition-colors">
            Ver Factura
          </button>
        </div>
      </div>
    </div>
  )
}
