import Image from 'next/image';
import StockImage from '@/public/images/chica_coche.jpg';
import Link from 'next/link';

export default function Options() {
  return (
    <section className="relative bg-[#9dd187] py-20">
      <div className="max-w-screen-2xl mx-auto sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2a2c38] mb-4 px-4 sm:px-0">
            Ponlo en marcha en tu empresa
          </h2>
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="flex w-full justify-center items-center">
            <div className="w-1/3 flex justify-center items-center pl-4 sm:pl-0">
              <Image src={StockImage} priority={true} width={300} height={220} alt="App preview 1" data-aos="zoom-y-out" data-aos-delay="180" className="rounded-xl" />
            </div>
            <div className="w-2/3 flex flex-col justify-start items-start text-left relative pl-16 pr-4 sm:pr-0">
              <span className="font-bold text-[#2a2c38] text-xl">Integra SharetoGo en tu negocio. Empieza desde hoy mismo.</span>
              <Link href="/contratar">
                <button className="mt-4 px-8 py-4 bg-[#2a2c38] text-white font-bold rounded-lg hover:bg-[#1a1c28] transition-colors mb-8 text-lg">
                  Prueba ya
                </button>
              </Link>
              <span className="font-bold text-[#2a2c38] text-xl">¿Tienes alguna duda?</span>
              <span className="font-medium text-[#2a2c38] text-lg">Ponte en contacto con nuestro servicio de atención al cliente. </span>
              <Link href="/contact">
                <button className="mt-4 px-8 py-4 bg-[#2a2c38] text-white font-bold rounded-lg hover:bg-[#1a1c28] transition-colors text-lg">
                  Contacta con nosotros
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
