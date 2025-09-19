import AppPreview1 from '@/public/images/movil1.png';
import AppPreview2 from '@/public/images/movil2.png';
import Image from 'next/image';

export default function Hero() {

  return (
    <section className="relative bg-white pt-28 md:pt-32 pb-8 md:pb-12">
      <div className="max-w-screen-2xl mx-auto sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-center pt-4 md:pt-8">
            <span className="md:text-9xl text-5xl text-center font-extrabold tracking-tighter text-[#2a2c38]" data-aos="zoom-y-out">SharetoGo</span>
            <h1 className="text-4xl md:text-3xl font-bold text-[#2a2c38] text-center pt-10" data-aos="zoom-y-out">
              La aplicación de carpooling corporativo
            </h1>
            <p className="text-xl text-teal-950 mb-8 italic text-center pt-4" data-aos="zoom-y-out" data-aos-delay="300">
              Cada empresa es única, por ello, gestionamos la movilidad diaria de los trabajadores según sus necesidades. 
            </p>
            <div className="flex flex-col items-center md:flex-row md:justify-center px-4">
              <a href="/contratar-sharetogo" className="w-full md:w-auto bg-[#9dd187] hover:bg-[#bad6ae] focus:ring-4 focus:ring-green-200 text-white rounded-lg inline-flex items-center justify-center px-8 py-4 mb-2 md:mb-0 md:mr-2 sm:w-1/2">
                <span className="text-center">
                  <span className="-mt-1 font-sans text-lg font-semibold">Solicita una prueba</span>
                </span>
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Image src={AppPreview1} priority={true} width={600} height={574} alt="corporate ride sharing app" data-aos="zoom-y-out" data-aos-delay="180" />
              </div>
              <div>
                <Image src={AppPreview2} priority={true} width={600} height={574} alt="event carpooling platform" data-aos="zoom-y-out" data-aos-delay="180" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
