import Plant from '@/public/images/plant.png';
import People from '@/public/images/people.png';
import Money from '@/public/images/money.png';

import Image from 'next/image';

export default function FeaturesBlocks() {
  return (
    <section className="relative bg-gradient-to-br from-green-200 via-green-500 to-green-700 text-white py-16">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
      <p className="text-4xl text-center text-gray-800 font-bold mb-8">Tu applicación para compartir coche diariamente</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
          {/* 1st item */}
          <div className="relative flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-3xl shadow-xl transition-transform transform hover:-translate-y-2 hover:scale-105">
            <Image src={Money} width={200} height={200} alt="App preview" />
            <h4 className="text-3xl font-bold leading-snug tracking-tight mb-1">Ahorra</h4>
            <p className="text-gray-800 text-center font-bold mt-6 mb-6">Ahorra dinero y consigue premios irresistibles.</p>
            <p className="text-gray-700 text-center italic">"SharetoGo es la herramienta que necesitas para empezar a ahorrar."</p>
          </div>

          {/* 2nd item */}
          <div className="relative flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-3xl shadow-xl transition-transform transform hover:-translate-y-2 hover:scale-105">
            <Image src={Plant} width={200} height={200} alt="App preview" />
            <h4 className="text-3xl font-bold leading-snug tracking-tight mb-1">Medioambiente</h4>
            <p className="text-gray-800 text-center font-bold pt-6">Cuida el medioambiente y reduce tu huella de carbono.</p>
            <p className="text-gray-700 text-center italic pt-6 mb-6">"La vida sostenible es para gente valiente."</p>
          </div>

          {/* 3rd item */}
          <div className="relative flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-3xl shadow-xl transition-transform transform hover:-translate-y-2 hover:scale-105">
            <Image src={People} width={200} height={200} alt="App preview" />
            <h4 className="text-3xl font-bold leading-snug tracking-tight mb-1">Comparte</h4>
            <p className="text-gray-800 text-center font-bold mt-6 mb-6">Comparte los asientos libres de tu vehículo. Comparte y vive.</p>
            <p className="text-gray-700 text-center italic mb-5">"El acto de compartir, te hace más feliz."</p>
          </div>
        </div>
      </div>
    </section>
  );
}
