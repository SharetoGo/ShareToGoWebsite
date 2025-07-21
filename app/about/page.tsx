export const metadata = {
  title: 'SharetoGo',
  description: 'Quien es SharetoGo?',
};

import Image from 'next/image';
import AboutPic from '@/public/images/about.png';
import Traffic from '@/public/images/traffic.png';
import Logo from '@/public/images/logos/logocoche.png';
import NuestraMision from '@/public/images/about.png';
import QuienesSomos from '@/public/images/logo.png';

export default function About() {
  return (
    <>
      <section className="bg-white pt-24 pb-8 px-4 md:pt-32 md:pb-16 md:px-8 flex flex-col md:flex-row items-stretch min-h-[300px] gap-6">
        <div className="bg-[#9dd187] w-full md:w-7/12 rounded-lg shadow-md p-6 md:p-10 flex items-start justify-center mb-6 md:mb-0">
          <div className="flex flex-col gap-6 md:gap-8 w-full">
            <span className="text-center text-3xl md:text-5xl font-bold text-[#2a2c38]">Nuestra misión</span>
            <p className="text-base md:text-lg font-medium text-[#2a2c38]">
              Compartir nos mueve, por ello, en SharetoGo nos hemos propuesto ser la solución lógica y la herramienta real para llevar a cabo el carpooling corporativo en España. Durante muchos meses hemos pensado, diseñado, programado toda nuestra aplicación para conectar mediante ubicación, a personas que tienen plazas libres en sus coches con personas que se dirigen a un mismo destino o similar y el cómo podemos llegar a ser masivos a la par que disruptivos realizando esta conexión. SharetoGo es ilusión, compañerismo, sacrificio, trabajo y, sobre todo, ganas de solucionar un problema y hacerlo bien.
            </p>
          </div>
        </div>
        <div className="w-full md:w-5/12 flex items-center justify-center">
          <div className="block md:hidden w-full max-w-xs">
            <Image
              src={NuestraMision}
              alt="Nuestra misión SharetoGo"
              className="rounded-lg shadow-lg object-cover w-full h-auto"
              width={400}
              height={400}
              priority
            />
          </div>
          <div className="hidden md:flex w-full h-full relative p-4">
            <Image
              src={NuestraMision}
              alt="Nuestra misión SharetoGo"
              className="rounded-lg shadow-lg object-cover"
              fill
              priority
            />
          </div>
        </div>
      </section>
      <section className="bg-white pb-8 md:pb-16 px-4 md:px-8 flex flex-col md:flex-row items-stretch min-h-[200px] gap-6 md:gap-0">
        <div className="flex-1 flex flex-col items-center justify-center gap-1 md:gap-2 py-4">
          <span className="text-4xl md:text-6xl font-extrabold text-[#2a2c38]">XX</span> 
          <span className="text-center text-base md:text-lg font-semibold text-[#2a2c38]">TOTAL DE TRAYECTOS COMPLETADOS</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-1 md:gap-2 py-4">
          <span className="text-4xl md:text-6xl font-extrabold text-[#2a2c38]">XX</span>
          <span className="text-center text-base md:text-lg font-semibold text-[#2a2c38]">TOTAL DE EMPRESAS USANDO SHARETOGO</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-1 md:gap-2 py-4">
          <span className="text-4xl md:text-6xl font-extrabold text-[#2a2c38]">XX</span>
          <span className="text-center text-base md:text-lg font-semibold text-[#2a2c38]">TOTAL DE TONELADAS CO2 AHORRADAS</span>
        </div>
      </section>
      <section className="bg-white pb-8 md:pb-16 px-4 md:px-8 flex flex-col md:flex-row items-stretch min-h-[300px] gap-6 md:gap-0">
        <div className="w-full md:w-2/5 flex items-center justify-center order-1 md:order-none mb-6 md:mb-0">
          <div className="w-full max-w-xs md:max-w-[400px] bg-white rounded-lg">
            <Image
              src={QuienesSomos}
              alt="Quienes Somos SharetoGo"
              className="rounded-lg object-cover w-full h-auto"
              width={400}
              height={400}
              priority
            />
          </div>
        </div>
        <div className="bg-[#9dd187] w-full md:w-3/5 rounded-lg shadow-md p-6 md:p-10 flex items-center justify-center">
          <div className="flex flex-col gap-6 md:gap-8 w-full">
            <span className="text-center text-3xl md:text-5xl font-bold text-[#2a2c38]">Quiénes Somos</span>
            <p className="text-base md:text-lg font-medium text-[#2a2c38]">
            Somos un grupo de personas que trabajamos ambiciosamente día tras día para poder conseguir un cambio de hábitos en la movilidad de la ciudadanía. Para nosotros, mantener al equipo unido y conectado ha sido siempre una pieza angular y prioritaria para que “la idea” inicial se materialice en un proyecto de aplicación móvil sólido. Esto sólo es la parrilla de salida. Entre todos, lo conseguiremos.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
