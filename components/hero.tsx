import AppPreview from '@/public/images/couple-preview.png';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-green-100 py-20 md:py-32 lg:py-40 min-h-screen">
      <div className="max-w-screen-2xl mx-auto sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left pt-20">
            <span className="bg-clip-text md:text-9xl text-5xl md:pl-10 text-center font-extrabold tracking-tighter text-transparent bg-green-800" data-aos="zoom-y-out">SharetoGo</span>
            <h1 className="text-4xl md:text-3xl font-bold text-teal-950 text-center pt-10" data-aos="zoom-y-out">
              Tu aplicación para compartir coche diariamente
            </h1>
            <p className="text-xl text-teal-950 mb-8 italic text-center pt-4" data-aos="zoom-y-out" data-aos-delay="300">
              La aplicación que hace que compartir coche sea más fácil y accesible para todos.
            </p>
            <div className="flex flex-col items-center md:flex-row md:justify-center">
              <a href="#" data-aos="zoom-y-out" className="w-full md:w-auto bg-green-600 hover:bg-green-600 focus:ring-4 focus:ring-green-200 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 mb-2 md:mb-0 md:mr-2 sm:w-1/2">
                <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                </svg>
                <span className="text-left">
                  <span className="-mt-1 font-sans text-sm font-semibold">Descarga desde la App Store</span>
                </span>
              </a>
              <a href="#" data-aos="zoom-y-out" className="w-full md:w-auto bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 sm:w-1/2">
                <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path>
                </svg>
                <span className="text-left">
                  <span className="-mt-1 font-sans text-sm font-semibold">Consíguelo en Google Play</span>
                </span>
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <Image src={AppPreview} width={2000} height={1910} alt="App preview" data-aos="zoom-y-out" data-aos-delay="180" />
          </div>
        </div>
      </div>
    </section>
  );
}
