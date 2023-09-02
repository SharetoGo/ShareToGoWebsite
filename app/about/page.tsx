export const metadata = {
    title: 'SharetoGo - About',
    description: 'AboutSharetoGo',
};

import Image from 'next/image'
import AboutPic from '@/public/images/about.png'
   
export default function About() {
  return (
        <section className="bg-green-50 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mt-10">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Quiénes somos?</h2>
              <p className="text-gray-800 mb-2 font-bold text-2xl">Nosotros</p>
              <p className="text-gray-800 mb-8 text-lg">
              Compartir nos mueve, por ello, en SharetoGo nos hemos propuesto ser la solución lógica y la herramienta real para llevar a cabo el carpooling.
              </p>
              <p className="text-gray-800 mb-8 text-lg">Somos personas que trabajamos ambiciosamente día tras día para poder conseguir un cambio de hábitos en la movilidad de la ciudadanía. Entre todos, lo conseguiremos.</p>
              <p className="text-gray-800 mb-8 text-lg font-bold italic">
              Para ti, para todos, comparte.
              </p>
            </div>
            <Image src={ AboutPic } alt="about picture"/>
    
          </div>
        </section>    
  );
}
