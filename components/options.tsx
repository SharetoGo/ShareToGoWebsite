'use client'

import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import DiversPic from '@/public/images/driver-hero.png'
import PassengerPic from '@/public/images/passenger-hero.png'

export default function Options() {
  
  const [tab, setTab] = useState<number>(1)

  const tabs = useRef<HTMLDivElement>(null)

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement) tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`
  }

  useEffect(() => {
    heightFix()
  }, []) 

  return (
    <section className="relative bg-green-50">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 bg-green-50 pointer-events-none mb-16" aria-hidden="true"></div>
      <div className="absolute left-0  m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 ">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl w-full mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2">Pruébanos y …</h1>
          </div>
          {/* Section content */}
          {/* Driver's section */}
          <div className="relative bg-green-300 rounded-xl lg:h-full">
            <div className="lg:flex">
              <div className="lg:w-1/2">
                <div className="lg:pt-10 lg:pb-10 lg:pl-10 lg:pr-5">
                  <h1 className="mb-2 md:text-4xl text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-900 text-center pt-4">"Ahorra dinero sin cambiar tu rutina"</h1>
                  <h1 className="text-lg text-gray-600 pt-2 text-center">Publica las plazas libres de tu coche y consigue ahorrar en gastos sin cambiar tu trayecto. Conecta con otras personas.</h1>
                  <div className="bg-green-500 w-60 rounded-full mx-auto mb-3 mt-4 shadow-2xl text-center">
                    <a href="/driver">
                      <button className="pt-4 pb-4 text-gray-900 font-bold text-center">Conviértete en conductor</button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="relative h-80 sm:h-96 lg:h-full">
                  <Image className="absolute inset-0 w-full h-full object-cover object-center rounded-lg" src={DiversPic} alt="Driver" />
                </div>
              </div>
            </div>
          </div>
        
          {/* Passenger's section */}
          <div className="relative bg-green-300 rounded-xl lg:h-full mt-10">
            <div className="lg:flex">
            <div className="lg:w-1/2">
                <div className="relative h-80 sm:h-96 lg:h-full">
                  <Image className="absolute inset-0 w-full h-full object-cover object-center rounded-lg" src={PassengerPic} alt="Driver" />
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="lg:pt-10 lg:pb-10 lg:pl-10 lg:pr-5">
                  <h1 className="mb-2 md:text-3xl text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-900 text-center pt-4">"Busca las mejores plazas libres para moverte"</h1>
                  <h1 className="text-lg text-gray-600 pt-2 text-center">Gracias a SharetoGo, según tus preferencias podrás encontrar las mejores opciones para realizar tus trayectos diarios.</h1>
                  <div className="bg-green-500 w-60 rounded-full mx-auto mb-3 mt-4 shadow-2xl text-center">
                    <a href="/passenger">
                      <button className="pt-4 pb-4 text-gray-900 font-bold text-center">Conviértete en pasajero</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}