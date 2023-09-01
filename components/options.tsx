'use client'

import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import DiversPic from '@/public/images/Publicar.png'
import PassengerPic from '@/public/images/Reservar.png'


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
    <section className="relative bg-green-100">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 bg-green-100 pointer-events-none mb-16" aria-hidden="true"></div>
      <div className="absolute left-0  m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 ">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl w-full mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2">Pruébanos y …</h1>
          </div>
          {/* Section content */}
          {/* Driver's section */}
          <div className="relative bg-green-800 rounded-lg py-10 md:py-8 px-4 sm:px-8 md:px-20 shadow-2xl overflow-hidden" data-aos="zoom-y-out">
            <div className="relative flex flex-col lg:flex-row justify-between items-center">
              <div className="flex flex-col justify-between p-4 leading-normal text-center items-center">
                <h5 className="mb-2 md:text-4xl text-3xl font-bold tracking-tight text-gray-900 dark:text-white">"Ahorra dinero sin cambiar tu rutina"</h5>
                <p className="mb-3 md:text-2xl text-xl font-normal text-gray-300 dark:text-gray-300">Publica las plazas libres de tu coche y consigue ahorrar en gastos sin cambiar tu trayecto. Conecta con otras personas.</p>
                <div className="bg-green-200 w-60 rounded-full justify-between items-center mt-4 shadow-2xl">
                  <a href="/driver">
                    <button className="pt-4 pb-4">Conviértete en conductor</button>
                  </a>
                </div>
              </div>
              <Image className="object-cover w-full rounded-t-lg h-full lg:h-auto lg:w-48 lg:rounded-none lg:rounded-l-lg" src={DiversPic} alt="" />
            </div>
          </div>

          {/* Passenger's section */}
          <div className="relative bg-green-700 rounded-lg py-10 md:py-8 px-4 sm:px-8 mt-20 md:mt-16 md:px-20 shadow-2xl overflow-hidden" data-aos="zoom-y-out">
            <div className="relative flex flex-col lg:flex-row justify-between items-center">
              <Image className="object-cover w-full rounded-t-lg h-full lg:h-auto lg:w-48 lg:rounded-none lg:rounded-l-lg" src={PassengerPic} alt="" />
              <div className="flex flex-col justify-between p-4 leading-normal text-center items-center">
                <h5 className="mb-2 md:text-4xl text-3xl font-bold tracking-tight text-gray-900 dark:text-white">"Busca las mejores plazas libres para moverte"</h5>
                <p className="mb-3 md:text-2xl text-xl font-normal text-gray-300 dark:text-gray-300">Gracias a SharetoGo, según tus preferencias podrás encontrar las mejores opciones para realizar tus trayectos diarios.</p>
                <div className="bg-green-600 w-60 rounded-full justify-between items-center mt-4 shadow-2xl">
                  <a href="/passenger">
                    <button className="pt-4 pb-4 text-white">Conviértete en pasajero</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}