import Header from '@/components/ui/header'
import Image from 'next/image'

export default function Funcionamiento() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="pt-28 pb-16 px-4 md:px-8 lg:px-16 max-w-none mx-auto space-y-16">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2a2c38] mb-4">
            ¿Cómo Funciona?
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-[#2a2c38] italic">
            Actua como conductor y/o pasajero
          </h2>
        </div>

        {/* Conductor Section */}
        <section className="bg-[#9dd187] rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2a2c38]">
            Si eres conductor:
          </h2>
          <p className="text-center font-semibold text-xl text-[#2a2c38] italic">
            "Gana dinero sin cambiar tu rutina"
          </p>

          {/* Images Row */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex justify-center w-full md:w-auto">
                <Image
                  src={require(`@/public/images/conductor${num}.PNG`)}
                  alt={`Conductor ${num}`}
                  width={300}
                  height={300}
                  className="rounded-lg w-full max-w-xs md:max-w-sm"
                />
              </div>
            ))}
          </div>

          {/* Text */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-10 text-center">
            <h3 className="font-bold text-xl text-[#2a2c38] mb-4">
              ¿Tienes plazas libres en tu coche?
            </h3>
            <p className="text-lg text-[#2a2c38]">
              Si quieres ahorrar en gastos, contribuir con el medioambiente y compartir momentos conociendo gente nueva, SharetoGo es lo que necesitas. Gracias a nuestra aplicación, podrás publicar el trayecto que recorres cotidianamente indicando las plazas libres que dispones. Tus futuros compañeros de trayecto se irán uniendo a tu coche. Para nosotros es clave premiar económicamente a los conductores.
            </p>
          </div>
        </section>

        {/* Pasajero Section */}
        <section className="bg-[#9dd187] rounded-2xl shadow-lg p-6 md:p-8 space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2a2c38]">
            Si eres pasajero:
          </h2>

          {/* Block 1 */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
              <div className="max-w-lg w-full text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#2a2c38] mb-4">
                  Busca las mejores plazas libres para moverte
                </h3>
                <p className="text-lg text-[#2a2c38]">
                  Gracias a SharetoGo, según tus preferencias podrás encontrar las mejores opciones para realizar tus trayectos diarios.
                </p>
              </div>
              <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
                <Image
                  src={require('@/public/images/movil2.PNG')}
                  alt="Reservar"
                  width={300}
                  height={300}
                  className="w-full max-w-xs md:max-w-sm"
                />
              </div>
            </div>
          </div>

          {/* Block 2 */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
              <div className="flex-shrink-0 flex justify-center w-full md:w-auto order-1 md:order-none">
                <Image
                  src={require('@/public/images/info_trayecto.PNG')}
                  alt="info"
                  width={300}
                  height={300}
                  className="w-full max-w-xs md:max-w-sm"
                />
              </div>
              <div className="max-w-lg w-full text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#2a2c38] mb-4">
                  ¿Quieres ahorrar dinero y hacer tus trayectos diarios de manera mucho más cómoda?
                </h3>
                <p className="text-lg text-[#2a2c38]">
                  Con SharetoGo encontrarás las plazas libres que más te convengan según tus preferencias. Gracias a la app, podrás reservar tu plaza cada día en el coche que prefieras y desplazarte al trabajo con un compañero de manera económica.
                </p>
              </div>
            </div>
          </div>

          {/* Block 3 */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
              <div className="max-w-lg w-full text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#2a2c38] mb-4">
                  Únete al coche de un compañero y comparte tu trayecto diario.
                </h3>
                <p className="text-lg text-[#2a2c38]">
                  Una vez confirmada la reserva, se abriría un chat interno entre los integrantes del trayecto, incluyendo al conductor, en el cual se puede acabar de resolver cualquier duda pediente.
                </p>
              </div>
              <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
                <Image
                  src={require('@/public/images/chat1.PNG')}
                  alt="chat"
                  width={300}
                  height={300}
                  className="w-full max-w-xs md:max-w-sm"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
