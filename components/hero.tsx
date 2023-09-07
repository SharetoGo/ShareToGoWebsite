import AppPreview from '@/public/images/couple-preview.png';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-green-50 py-16">
      <div className="max-w-6xl mx-auto sm:px-6">
        <div className="pt-12 pb-20 md:pt-40 md:pb-20 flex flex-col md:flex-row-reverse justify-around items-center">
          <div className="md:max-w-none mx-auto md:flex-shrink-0 md:mr-50">
            <Image src={AppPreview} width={900} height={862} alt="App preview" data-aos="zoom-y-out" data-aos-delay="180" />
          </div>
          <div className="text-center md:text-left pb-2 md:pb-16 md:w-1/2">
            <h1 className="text-center md:text-6xl font-bold leading-tighter tracking-tighter" data-aos="zoom-y-out">
              <span className="hidden md:inline">Bienvenido a</span>
              <span className="md:hidden text-4xl">Bienvenido a</span>
            </h1>
            <span className="bg-clip-text md:text-9xl text-5xl text-center font-extrabold tracking-tighter text-transparent bg-gradient-to-r from-green-500 to-green-700" data-aos="zoom-y-out">SharetoGo</span>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-center text-gray-700 mb-8 italic" data-aos="zoom-y-out" data-aos-delay="150">Para ti, para todos, comparte.</p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center justify-center items-center" data-aos="zoom-y-out" data-aos-delay="300">
              <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <a href="#"
                className="w-full sm:w-auto bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-green-200 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5">
                <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple"
                  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z">
                  </path>
                </svg>
                <div className="text-left">
                  <div className="mb-1 text-xs">Descarga desde la</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a href="#"
                className="w-full sm:w-auto bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5">
                <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play"
                  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z">
                  </path>
                </svg>
                <div className="text-left">
                  <div className="mb-1 text-xs">Consiguelo en</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">Google Play</div>
                </div>
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
