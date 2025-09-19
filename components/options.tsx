import Image from 'next/image';
import StockImage from '@/public/images/chica_coche.jpg';
import Link from 'next/link';

export default function Options() {
  return (
    <div className="py-8 md:py-12 bg-white flex items-center justify-center">
      <section className="relative bg-[rgb(157,209,135)] py-8 px-6 rounded-2xl max-w-5xl w-full mx-2">
        <div className="max-w-2xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold text-[#2a2c38] mb-0 px-4 sm:px-0">
              Ponlo en marcha en tu empresa
            </h2>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-col md:flex-row w-auto justify-center items-center gap-8">
              <div className="md:w-auto flex justify-center items-center pl-0 md:pr-6">
                <Image
                  src={StockImage}
                  priority={true}
                  width={600}
                  height={400}
                  alt="App preview 1"
                  data-aos="zoom-y-out"
                  data-aos-delay="180"
                  className="rounded-2xl w-48 h-auto md:w-[600px] md:h-[400px]"
                />
              </div>
              <div className="md:w-auto flex flex-col justify-start items-start text-left relative md:pl-8 pr-0">
                <div className="flex flex-col items-center text-center w-full">
                  <span className="font-bold text-[#2a2c38] text-xl">
                    Integra SharetoGo en tu negocio. Empieza desde hoy mismo.
                  </span>
                  <Link href="/contratar">
                    <button className="mt-4 px-8 py-4 bg-[#2a2c38] text-white font-bold rounded-lg hover:bg-[#1a1c28] transition-colors mb-8 text-lg">
                      Prueba ya
                    </button>
                  </Link>
                </div>
                <div className="flex flex-col items-center text-center w-full">
                  <span className="font-bold text-[#2a2c38] text-xl">¿Tienes alguna duda?</span>
                  <span className="font-medium text-[#2a2c38] text-lg">
                    Ponte en contacto con nuestro servicio de atención al cliente.
                  </span>
                  <Link href="/contact">
                    <button className="mt-4 px-8 py-4 bg-[#2a2c38] text-white font-bold rounded-lg hover:bg-[#1a1c28] transition-colors text-lg">
                      Contacta con nosotros
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
