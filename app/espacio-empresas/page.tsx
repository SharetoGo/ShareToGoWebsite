'use client'

import Header from '@/components/ui/header'
import { useAuth } from './auth/AuthContext'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function EspacioEmpresas() {
  const { user, companyData, loading } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/espacio-empresas')
  }

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Header />
        <div className="flex items-center justify-center pt-48">
          <div className="text-2xl font-semibold">Cargando...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-white">
        <Header />
        <div className="bg-transparent py-8 pt-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-[#2a2c38]">¡Bienvenido!</h1>
          </div>
        </div>
        <div className="py-8">
          <div className="container mx-auto px-4 text-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold text-black mb-2">Tu empresa tiene...</h2>
              <span className="text-gray-600 text-sm md:text-lg">Para  obtener toda la información sostenible de tu empresa, pide aquí tu usuario y contraseña</span>
            </div>
            <Link href="/espacio-empresas/auth">
              <button className="bg-[#9dd187] text-white px-8 mt-8 md:px-12 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-[#8bc176] transition-colors">
                Acceder a tu espacio
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <Header />
      
      <div className="bg-transparent py-8 pt-24">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl md:text-5xl font-bold text-[#2a2c38]">¡Bienvenida, {companyData?.name}!</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="w-4/5 h-1 bg-black"></div>
      </div>
      
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-semibold text-center text-black">Tu empresa tiene...</h2>
        </div>
      </div>
      
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-black mb-2">XX</div>
              <div className="text-gray-600 text-sm md:text-lg">Trayectos Completados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-black mb-2">XX</div>
              <div className="text-gray-600 text-sm md:text-lg">Kg de CO2 ahorrados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-black mb-2">XX</div>
              <div className="text-gray-600 text-sm md:text-lg">Km completados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-black mb-2">XX</div>
              <div className="text-gray-600 text-sm md:text-lg">Personas Transportadas</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
            <div className="flex flex-col flex-shrink-0 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-semibold text-black mb-4">Consulta la actividad de tus empleados:</h3>
              <div className="flex justify-center lg:justify-start">
                <button className="bg-[#9dd187] text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-[#8bc176] transition-colors w-fit">
                  Ir al panel de empleados
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center w-full lg:w-auto">
              <div className="w-full max-w-sm lg:w-96 h-24 md:h-32 bg-[#9dd187] rounded-lg shadow-md flex flex-col justify-start pt-4">
                <h4 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent text-center">
                  Top Conductores del Mes:
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-4xl font-bold text-center text-black mb-6 md:mb-8">Report de Sostenibilidad</h3>
          
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
            <div className="w-full lg:w-2/3">
              <h4 className="text-xl md:text-2xl font-semibold text-[#2a2c38] mb-4 pl-2 md:pl-4">Trayectos Compartidos</h4>
              <div className="bg-[#9dd187] rounded-lg shadow-md h-32 md:h-48"></div>
            </div>
            
            <div className="w-full lg:w-1/3">
              <h4 className="text-xl md:text-2xl font-semibold text-[#2a2c38] mb-4 pl-2 md:pl-4">Kilómetros Recorridos</h4>
              <div className="bg-[#9dd187] rounded-lg shadow-md h-32 md:h-48"></div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mt-6 md:mt-8">
            <div className="w-full lg:w-2/5">
              <h4 className="text-xl md:text-2xl font-semibold text-[#2a2c38] mb-4 pl-2 md:pl-4">CO2 Ahorrado</h4>
              <div className="bg-[#9dd187] rounded-lg shadow-md h-32 md:h-48"></div>
            </div>
            
            <div className="w-full lg:w-3/5">
              <h4 className="text-xl md:text-2xl font-semibold text-[#2a2c38] mb-4 pl-2 md:pl-4">Coches Eliminados de la Vía</h4>
              <div className="bg-[#9dd187] rounded-lg shadow-md h-32 md:h-48"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Total a Subvencionar Header */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-4xl font-bold text-center text-black">Total a Subvencionar</h3>
        </div>
      </div>
      
      {/* Thank You and Invoice Section */}
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24">
            <div className="text-lg md:text-xl font-bold text-black text-center">
              ¡Gracias por contar con<br />SharetoGo!
            </div>
            <button className="bg-[#2a2c38] text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold text-lg md:text-xl hover:bg-[#1a1c28] transition-colors">
              Ver Factura
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
