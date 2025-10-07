'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Link from 'next/link';

import EventoImage from '@/public/images/eventos/evento.jpg';
import Movil1EventosImage from '@/public/images/eventos/movil1eventos.png';
import Movil2EventosImage from '@/public/images/eventos/movil2eventos.png';
import Movil3EventosImage from '@/public/images/eventos/movil3eventos.png';
import Movil4EventosImage from '@/public/images/eventos/movil4eventos.png';
import UniversidadImage from '@/public/images/eventos/universidad.jpeg';
import EstadioImage from '@/public/images/eventos/estadio.png';
import FeriaImage from '@/public/images/eventos/feria.jpg';
import EnvironmentImage from '@/public/images/eventos/environment.png';
import SocialPeopleImage from '@/public/images/eventos/socialpeople.png';
import SavingImage from '@/public/images/eventos/saving.png';

export default function EspacioEventos() {
  const [faqOpen, setFaqOpen] = useState(false);

  const handleToggleFaq = () => setFaqOpen(prev => !prev);

  return (
    <>
      <section className="bg-white pt-24 pb-20 px-4 md:pt-32 md:pb-24 md:px-8">
        {/* Top Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-5xl md:text-4xl font-bold text-[#2a2c38] mb-6 drop-shadow-lg">
            Espacio Eventos
          </h2>
          <div className="w-24 h-1 bg-[rgb(42,44,56)] mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-[#2a2c38] font-medium max-w-2xl mx-auto leading-relaxed">
            ¿Vas a algún evento, festival, congreso, feria, escapada, discoteca, concierto, esquiada, evento deportivo...?
          </p>
        </div>

        {/* Main Event Info */}
        <div className="flex justify-center">
          <div className="bg-[#9dd187] w-5/6 rounded-lg shadow-md p-12 md:p-16 min-h-[400px]">
            <div className="flex flex-col md:flex-row items-center gap-8 h-full">
              <div className="flex-1 flex items-center">
                <p className="text-lg md:text-xl text-[#2a2c38] font-medium leading-relaxed text-center">
                  <span className="font-bold">SharetoGo</span> está presente dónde hayan desplazamientos. El objetivo es reducir las congestiones en las aglomeraciones poniendo en contacto a los asistentes para compartir coche.
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-full h-80 rounded-lg overflow-hidden">
                  <Image
                    src={EventoImage}
                    alt="Evento con multitud y luces de escenario"
                    className="w-full h-full object-cover"
                    width={400}
                    height={320}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <div className="w-full h-[700px] rounded-2xl overflow-hidden flex items-center justify-center">
                <Image
                  src={Movil1EventosImage}
                  alt="Persona usando móvil en evento"
                  className="max-w-full max-h-full object-contain rounded-xl"
                  width={600}
                  height={500}
                  priority
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-6 text-center">
                ¿Conduces?
              </h3>
              <p className="text-lg md:text-xl text-[#2a2c38] font-medium leading-relaxed mb-8 text-center">
                Selecciona el evento al que te diriges y futuros asistentes se unirán a tu trayecto.
              </p>
              {/* Feria Image */}
              <div className="w-4/5 h-80 mx-auto rounded-lg overflow-hidden">
                <Image
                  src={FeriaImage}
                  alt="Feria comercial con stands y luces"
                  className="w-full h-full object-cover"
                  width={400}
                  height={320}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="w-full bg-[#9dd187] rounded-2xl p-6 md:p-8 min-h-[150px]">
            <button
              type="button"
              className="w-full flex justify-between items-center text-left p-4 sm:p-6 focus:outline-none"
              aria-expanded={faqOpen}
              onClick={handleToggleFaq}
            >
              <h3 className="text-lg sm:text-2xl font-semibold text-[#2a2c38] flex-1 pr-4">
                ¿Eres un evento y quieres contratar SharetoGo a medida?
              </h3>
              {faqOpen ? (
                <CiCircleMinus className="text-4xl text-[#2a2c38] flex-shrink-0" />
              ) : (
                <CiCirclePlus className="text-4xl text-[#2a2c38] flex-shrink-0" />
              )}
            </button>
            <div
              className={`grid transition-all duration-500 ease-in-out ${faqOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <div className="px-4 sm:px-6 pb-6 text-base sm:text-lg text-[#2a2c38]">
                  <p>
                    Podemos añadirte como evento disponible cuando quieras.{" "}
                    <Link
                      href="/contratar-sharetogo"
                      className="font-bold text-black underline hover:text-gray-700"
                    >
                      Más info aquí
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Section: Movil 2 y 3 */}
        <div className="max-w-6xl mx-auto mt-16 flex flex-col md:flex-row items-start gap-8">
          {/* Movil 2 */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="w-full h-[600px] rounded-2xl overflow-hidden flex items-center justify-center mb-4">
              <Image
                src={Movil2EventosImage}
                alt="Movil mostrando eventos disponibles"
                className="max-w-full max-h-full object-contain rounded-xl"
                width={400}
                height={600}
                priority
              />
            </div>
            <p className="text-lg md:text-xl font-medium text-center text-[#2a2c38]">
              Busca entre todos nuestros eventos disponibles para poder seleccionar y ver en{" "}
              <a href="#reservar-section" className="font-bold text-[#2a2c38] underline">
                RESERVAR
              </a>{" "}
              los trayectos disponibles desde o hacia ese evento
            </p>
          </div>

          {/* Movil 3 */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="w-full h-[600px] rounded-2xl overflow-hidden flex items-center justify-center mb-4">
              <Image
                src={Movil3EventosImage}
                alt="Movil guardando eventos favoritos"
                className="max-w-full max-h-full object-contain rounded-xl"
                width={400}
                height={600}
                priority
              />
            </div>
            <p className="text-lg md:text-xl font-medium text-center text-[#2a2c38]">
              Guarda tus eventos favoritos para poder ver y filtrar en{" "}
              <a href="#reservar-section" className="font-bold text-[#2a2c38] underline">
                RESERVAR
              </a>{" "}
              todos los trayectos desde o hacia ese evento
            </p>
          </div>
        </div>

        {/* New Section: Reservar */}
        <div
          id="reservar-section"
          className="max-w-6xl mx-auto mt-20 scroll-mt-32"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-12 text-center">
            ¿Reservar para ir a un evento?
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Imagen izquierda */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-full h-[600px] rounded-2xl overflow-hidden flex items-center justify-center">
                <Image
                  src={Movil4EventosImage}
                  alt="Movil mostrando opciones de reserva"
                  className="max-w-full max-h-full object-contain rounded-xl"
                  width={400}
                  height={600}
                  priority
                />
              </div>
            </div>
            {/* Texto derecha */}
            <div className="w-full md:w-1/2">
              <p className="text-lg md:text-xl font-medium text-[#2a2c38] leading-relaxed text-center md:text-left">
                <span className="font-bold">FILTRA</span> para ver los trayectos hacia o desde el evento que quieras ir o volver y reserva la plaza que más te convenga.
              </p>
            </div>
          </div>
        </div>

        {/* New Section: Universidad + Estadio */}
        <div className="flex justify-center mt-16">
          <div className="bg-[#9dd187] w-4/5 rounded-lg shadow-md p-8 md:p-10">
            <div className="flex flex-col gap-12">
              {/* Fila 1 */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 flex justify-center">
                  <div className="w-full h-60 rounded-lg overflow-hidden">
                    <Image
                      src={UniversidadImage}
                      alt="Universidad"
                      className="w-full h-full object-cover"
                      width={350}
                      height={260}
                      priority
                    />
                  </div>
                </div>
                <div className="flex-1 flex items-center">
                  <p className="text-base md:text-lg text-[#2a2c38] font-medium leading-relaxed text-center md:text-left">
                    En el espacio eventos lo que buscamos es que cualquier persona pueda ofrecer las plazas libres de su coche cuando se dirige a un evento o lugar específico, concurrido por muchas personas.
                  </p>
                </div>
              </div>
              {/* Fila 2 */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 flex items-center">
                  <p className="text-base md:text-lg text-[#2a2c38] font-medium leading-relaxed text-center md:text-left">
                    Los asistentes, en lugar de ir solos, utilizar medios más contaminantes, o arriesgarse confiando en el transporte público, gracias a SharetoGo reservarán el trayecto que más les convenga. Ecológico, fácil y sencillo, además de económico.
                  </p>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-full h-60 rounded-lg overflow-hidden">
                    <Image
                      src={EstadioImage}
                      alt="Estadio"
                      className="w-full h-full object-cover"
                      width={350}
                      height={260}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Section: Environment, SocialPeople, Saving */}
        <div className="max-w-6xl mx-auto mt-20 flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="w-1/3 flex justify-center">
            <Image
              src={EnvironmentImage}
              alt="Beneficio medioambiental"
              className="max-w-[500px] object-contain"
              width={500}
              height={500}
              priority
            />
          </div>
          <div className="w-1/3 flex justify-center">
            <Image
              src={SocialPeopleImage}
              alt="Beneficio social"
              className="max-w-[500px] object-contain"
              width={500}
              height={500}
              priority
            />
          </div>
          <div className="w-1/3 flex justify-center">
            <Image
              src={SavingImage}
              alt="Ahorro económico"
              className="max-w-[500px] object-contain"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}