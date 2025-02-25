import Plant from '@/public/images/plant.png';
import People from '@/public/images/people.png';
import Money from '@/public/images/money.png';
import Image from 'next/image';

export default function FeaturesBlocks() {
  return (
<section className="bg-gradient-to-b from-green-200 to-green-600 text-white py-16">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
          {/* 1st item */}
          <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-3xl shadow-xl transition-transform transform hover:-translate-y-2 hover:scale-105">
            <Image src={Money} width={120} height={120} alt="Money Icon" />
            <h4 className="text-xl font-bold leading-snug tracking-tight mt-4 mb-2">Ahorra</h4>
            <p className="text-center">Ahorra dinero en tus trayectos diarios al trabajo.</p>
            <p className="text-teal-950 text-center italic mt-4">"SharetoGo es la herramienta que necesitas para empezar a ahorrar."</p>
          </div>

          {/* 2nd item */}
          <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-3xl shadow-xl transition-transform transform hover:-translate-y-2 hover:scale-105">
            <Image src={Plant} width={120} height={120} alt="Plant Icon" />
            <h4 className="text-xl font-bold leading-snug tracking-tight mt-4 mb-2">Medioambiente</h4>
            <p className="text-center">Cuida el medioambiente y reduce tu huella de carbono.</p>
            <p className="text-teal-950 text-center italic mt-4 mb-6">"La vida sostenible es para gente valiente."</p>
          </div>

          {/* 3rd item */}
          <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-3xl shadow-xl transition-transform transform hover:-translate-y-2 hover:scale-105">
            <Image src={People} width={120} height={120} alt="People Icon" />
            <h4 className="text-xl font-bold leading-snug tracking-tight mt-4 mb-2">Comparte</h4>
            <p className="text-center">Comparte los asientos libres de tu vehículo. Comparte y vive.</p>
            <p className="text-teal-950 text-center italic mt-4 mb-6">"El acto de compartir, te hace más feliz."</p>
          </div>
        </div>
      </div>
    </section>
  );
}
