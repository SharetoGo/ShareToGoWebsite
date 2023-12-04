import { useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import DiversPic from '@/public/images/driver-hero.png';
import PassengerPic from '@/public/images/passenger-hero.png';

export default function Options() {
  return (
    <section className="relative bg-green-50 pb-20">
      <div className="absolute inset-0 bg-green-50 pointer-events-none mb-16" aria-hidden="true"></div>
      <div className="absolute left-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 ">
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl w-full mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 text-teal-950">Pruébanos y …</h1>
          </div>

          {/* Driver's section */}
          <div className="relative bg-green-50 border-2 border-green-600 rounded-xl lg:h-full overflow-hidden shadow-2xl">
            <div className="lg:flex">
              <div className="lg:w-1/2 p-8 rounded-lg overflow-hidden">
                <div className="lg:pt-10 lg:pb-10 lg:pl-10 lg:pr-5">
                  <h1 className="mb-2 md:text-4xl text-3xl font-bold tracking-tight text-teal-950 dark:text-teal-950 text-center pt-4">"Ahorra dinero sin cambiar tu rutina"</h1>
                  <h1 className="text-lg text-teal-950 pt-2 text-center">Publica las plazas libres de tu coche y consigue ahorrar en gastos sin cambiar tu trayecto. Conecta con otras personas.</h1>
                  <div className="bg-green-600 w-60 hover:bg-green-700 rounded-2xl mx-auto mb-3 mt-4 shadow-2xl text-center">
                    <a href="/driver">
                      <button className="pt-4 pb-4 text-white font-bold text-center">Conviértete en conductor</button>
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
          <div className="relative bg-green-50 border-2 border-green-600 rounded-xl lg:h-full mt-10 overflow-hidden shadow-2xl">
            <div className="lg:flex">
              <div className="lg:w-1/2">
                <div className="relative h-80 sm:h-96 lg:h-full">
                  <Image className="absolute inset-0 w-full h-full object-cover object-center rounded-lg" src={PassengerPic} alt="Driver" />
                </div>
              </div>
              <div className="lg:w-1/2 p-8 rounded-lg overflow-hidden">
                <div className="lg:pt-10 lg:pb-10 lg:pl-10 lg:pr-5">
                  <h1 className="mb-2 md:text-3xl text-3xl font-bold tracking-tight text-teal-950 dark:text-teal-950 text-center pt-4">"Busca las mejores plazas libres para moverte"</h1>
                  <h1 className="text-lg text-teal-950 pt-2 text-center">Gracias a SharetoGo, según tus preferencias podrás encontrar las mejores opciones para realizar tus trayectos diarios.</h1>
                  <div className="bg-green-600 hover:bg-green-700 w-60 rounded-2xl mx-auto mb-3 mt-4 shadow-2xl text-center">
                    <a href="/passenger">
                      <button className="pt-4 pb-4 text-white font-bold text-center">Conviértete en pasajero</button>
                    </a>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
