import AppPreview from '@/public/images/couple-preview.png'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative">
      <div className="max-w-9xl mx-80 px-10 sm:px-6">
        <div className="pt-32 pb-20 md:pt-40 md:pb-20 flex flex-col md:flex-row-reverse items-center">
          <div className="md:max-w-none mx-auto rounded md:flex-shrink-0 md:mr-10">
            <Image src={AppPreview} width={700} height={772} alt="App preview" />
          </div>
          <div className="text-center md:text-left pb-2 md:pb-16 md:w-1/2">
            <h1 className="text-5xl text-center md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Bienvenido a <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500">ShareToGo</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-center text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Para ti, para todos, comparte</p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a className="btn text-white bg-green-600 hover:bg-green-700 w-full mb-4 sm:w-auto sm:mb-0 shadow-lg" href="#0">Download on AppStore</a>
                </div>
                <div>
                  <a className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">Download on GooglePlay</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
