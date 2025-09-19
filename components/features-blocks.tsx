import AppImage from '@/public/images/captura_inicio.jpg';
import { MdOutlineEco } from "react-icons/md";
import { MdOutlineEuroSymbol } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import Image from 'next/image';

export default function FeaturesBlocks() {
  return (
    <section className="relative bg-white py-8 md:py-12">
      <div className="max-w-screen-2xl mx-auto sm:px-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 flex justify-center items-center mb-8 md:mb-0">
            <Image src={AppImage} priority={true} width={300} height={220} alt="app carpooling empresa" data-aos="zoom-y-out" data-aos-delay="180" className="rounded-xl" />
          </div>
          <div className="w-full md:w-2/3 flex flex-col justify-center">
            <span className="md:text-4xl text-5xl text-center font-bold tracking-tighter text-[#2a2c38] px-4 md:px-0" data-aos="zoom-y-out">¿Por qué empezar a usar SharetoGo?</span>
            <div className="flex flex-col space-y-2 md:space-y-6 mt-8 items-start">
              <div className="rounded-lg flex items-center space-x-4 pl-4 py-6">
                <div className="w-12 h-12 bg-[#9dd187] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MdOutlineEco className="text-white text-2xl" />
                </div>
                <div className="text-lg font-medium text-gray-800 pr-4">
                  <span className="font-bold">Reducción de emisiones de CO₂:</span> El coche privado es la principal fuente de emisiones. Reducir su uso disminuye la huella de carbono además de la congestión en los alrededores de la empresa.
                </div>
              </div>
              <div className="rounded-lg flex items-center space-x-4 pl-4 py-6">
                <div className="w-12 h-12 bg-[#9dd187] rounded-lg flex items-center justify-center flex-shrink-0">
                  <IoIosPeople className="text-white text-2xl" />
                </div>
                <div className="text-lg font-medium text-gray-800 pr-4">
                  <span className="font-bold">Beneficios sociales y laborales:</span> El coche compartido favorece el bienestar y la cohesión del equipo, mejora la experiencia diaria de los trabajadores y permite deducir fiscalmente los gastos vinculados a la movilidad.
                </div>
              </div>
              <div className="rounded-lg flex items-center space-x-4 pl-4 py-6">
                <div className="w-12 h-12 bg-[#9dd187] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MdOutlineEuroSymbol className="text-white text-2xl" />
                </div>
                <div className="text-lg font-medium text-gray-800 pr-4">
                  <span className="font-bold">Ahorro económico:</span> Ahorro en infraestructuras, menos demanda de aparcamiento y mayor eficiencia para los desplazamientos diarios de los trabajadores
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
