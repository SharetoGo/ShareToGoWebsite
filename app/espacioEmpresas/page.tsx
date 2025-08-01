export const metadata = {
  title: 'SharetoGo - Idioma',
  description: 'Idioma page of SharetoGo',
}

import Header from '@/components/ui/header'

export default function EspacioEmpresas() {
  return (
    <div className="bg-white">
      <Header />
      
      <div className="bg-transparent py-8 pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center text-[#2a2c38]">¡Bienvenido!</h1>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="w-4/5 h-1 bg-black"></div>
      </div>
      
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center text-black">Tu empresa tiene...</h2>
        </div>
      </div>
      
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-black mb-2">XX</div>
              <div className="text-gray-600 text-lg">Trayectos Completados</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-black mb-2">XX</div>
              <div className="text-gray-600 text-lg">Kg de CO2 ahorrados</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-black mb-2">XX</div>
              <div className="text-gray-600 text-lg">Km completados</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-black mb-2">XX</div>
              <div className="text-gray-600 text-lg">Personas Transportadas</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8">
            <div className="flex flex-col flex-shrink-0">
              <h3 className="text-3xl font-semibold text-black mb-4">Consulta la actividad de tus empleados:</h3>
              <div className="flex justify-center">
                <button className="bg-[#9dd187] text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-[#8bc176] transition-colors w-fit">
                  Ir al panel de empleados
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-96 h-32 bg-[#9dd187] rounded-lg shadow-md flex flex-col justify-start pt-4">
                <h4 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent text-center">
                  Top Conductores del Mes:
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-black mb-8">Report de Sostenibilidad</h3>
          
          <div className="flex gap-6">
            <div className="w-2/3">
              <h4 className="text-2xl font-semibold text-[#2a2c38] mb-4 pl-4">Trayectos Compartidos</h4>
              <div className="bg-[#9dd187] rounded-lg shadow-md h-48"></div>
            </div>
            
            <div className="w-1/3">
              <h4 className="text-2xl font-semibold text-[#2a2c38] mb-4 pl-4">Kilómetros Recorridos</h4>
              <div className="bg-[#9dd187] rounded-lg shadow-md h-48"></div>
            </div>
          </div>
          
          <div className="flex gap-6 mt-8">
            <div className="w-2/5">
              <h4 className="text-2xl font-semibold text-[#2a2c38] mb-4 pl-4">CO2 Ahorrado</h4>
              <div className="bg-[#9dd187] rounded-lg shadow-md h-48"></div>
            </div>
            
            <div className="w-3/5">
              <h4 className="text-2xl font-semibold text-[#2a2c38] mb-4 pl-4">Coches Eliminados de la Vía</h4>
              <div className="bg-[#9dd187] rounded-lg shadow-md h-48"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Total a Subvencionar Header */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-black">Total a Subvencionar</h3>
        </div>
      </div>
      
      {/* Thank You and Invoice Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-24">
            <div className="text-xl font-bold text-black text-center">
              ¡Gracias por contar con<br />SharetoGo!
            </div>
            <button className="bg-[#2a2c38] text-white px-12 py-4 rounded-lg font-bold text-xl hover:bg-[#1a1c28] transition-colors">
              Ver Factura
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

