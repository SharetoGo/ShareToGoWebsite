export const metadata = {
  title: 'SharetoGo - Funcionamiento',
  description: 'Página que explica como funciona SharetoGo',
}

import Header from '@/components/ui/header'
import Image from 'next/image'

export default function Funcionamiento() {
  return (
    <div className="bg-white">
      <Header />
      <div className="pt-24 items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-[#2a2c38] mb-4">
          ¿Cómo Funciona?
        </h1>
        <h1 className="text-2xl font-medium text-[#2a2c38] mb-4 italic">
          Actua como conductor y/o pasajero
        </h1>
        <div className="flex flex-col gap-4 text-left">
          <h2 className="text-2xl font-bold text-[#2a2c38] mb-4 pl-4 md:pl-20"> Si eres conductor: </h2>
          <span className="block text-center font-semibold text-xl text-[#2a2c38] italic">
            "Gana dinero sin cambiar tu rutina"
          </span>
          {/* Images row: conductor1, conductor2, conductor3 */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-6">
            <div className="p-4 md:p-10 w-full md:w-auto flex justify-center">
              <Image src={require('@/public/images/conductor1.png')} alt="Conductor 1" width={300} height={300} className="rounded-lg w-full max-w-xs md:max-w-none" />
            </div>
            <div className="p-4 md:p-10 w-full md:w-auto flex justify-center">
              <Image src={require('@/public/images/conductor2.png')} alt="Conductor 2" width={300} height={300} className="rounded-lg w-full max-w-xs md:max-w-none" />
            </div>
            <div className="p-4 md:p-10 w-full md:w-auto flex justify-center">
              <Image src={require('@/public/images/conductor3.png')} alt="Conductor 3" width={300} height={300} className="rounded-lg w-full max-w-xs md:max-w-none" />
            </div>
          </div>
          <div className="mb-0"></div>
          <div className="mb-8 px-4 md:px-24">
            <div className="flex justify-center">
              <span className="font-bold text-xl text-[#2a2c38] text-center">¿Tienes plazas libres en tu coche?</span>
            </div>
            <p className="text-center text-lg text-[#2a2c38]">
              Si quieres ahorrar en gastos, contribuir con el medioambiente y compartir momentos conociendo gente nueva, SharetoGo es lo que necesitas. Gracias a nuestra aplicación, podrás publicar el trayecto que recorres cotidianamente indicando las plazas libres que dispones. Tus futuros compañeros de trayecto se irán uniendo a tu coche. Para nosotros es clave premiar económicamente a los conductores.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[#2a2c38] mb-4 pl-4 md:pl-20"> Si eres pasajero: </h2>
        </div>
        {/* Section: text left, image right (responsive) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8 px-4 md:px-32">
          <div className="max-w-xl w-full mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-[#2a2c38] mb-2 text-center md:text-left">Busca las mejores plazas libres para moverte</h3>
            <p className="text-base text-[#2a2c38] text-center md:text-left">Gracias a SharetoGo, según tus preferencias podrás encontrar las mejores opciones para realizar tus trayectos diarios. </p>
          </div>
          <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
            <Image src={require('@/public/images/movil2.PNG')} alt="Reservar" width={300} height={300} className="rounded-lg w-full max-w-xs md:max-w-none" />
          </div>
        </div>
        {/* Section: image left, text right (responsive) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8 px-4 md:px-32">
          <div className="flex-shrink-0 flex justify-center w-full md:w-auto mb-4 md:mb-0">
            <Image src={require('@/public/images/info_trayecto.PNG')} alt="info" width={300} height={300} className="rounded-lg w-full max-w-xs md:max-w-none" />
          </div>
          <div className="max-w-xl w-full">
            <h3 className="text-2xl font-bold text-[#2a2c38] mb-2 text-center md:text-left">¿Quieres ahorrar dinero y hacer tus trayectos diarios de manera mucho más cómoda?</h3>
            <p className="text-base text-[#2a2c38] text-center md:text-left">Con SharetoGo encontrarás las plazas libres que más te convengan según tus preferencias. Gracias a la app, podrás reservar tu plaza cada día en el coche que prefieras y desplazarte al trabajo con un compañero de manera económica.  </p>
          </div>
        </div>
        {/* Section: text left, image right (responsive) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8 px-4 md:px-32">
          <div className="max-w-xl w-full mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-[#2a2c38] mb-2 text-center md:text-left">Únete al coche de un compañero y comparte tu trayecto diario. </h3>
            <p className="text-base text-[#2a2c38] text-center md:text-left">Una vez confirmada la reserva, se abriría un chat interno entre los integrantes del trayecto, incluyendo al conductor, en el cual se puede acabar de resolver cualquier duda pediente.  </p>
          </div>
          <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
            <Image src={require('@/public/images/chat1.PNG')} alt="chat" width={300} height={300} className="rounded-lg w-full max-w-xs md:max-w-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
