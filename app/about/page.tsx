import Image from 'next/image';
import AboutPic from '@/public/images/about.png';
import Traffic from '@/public/images/traffic.png';
import Logo from '@/public/images/logos/logocoche.png';

export default function About() {
  return (
    <section className="bg-green-50 py-16 px-8">
        <h1 className="text-5xl font-extrabold text-teal-950 mb-4 py-8 text-center">Quiénes somos?</h1>
      <div className="max-w-screen-2xl mx-auto sm:px-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left pt-20">
          <div className="text-3xl font-bold text-teal-950 mb-4">Nuestra misión</div>
          <p className="text-teal-950 mb-12 text-lg text-justify">
              Compartir nos mueve, por ello, en SharetoGo nos hemos propuesto ser la solución lógica y la herramienta real para llevar a cabo el carpooling.
              Durante muchos meses hemos pensado, diseñado, programado toda nuestra aplicación para conectar mediante ubicación, a personas que tienen plazas libres en sus coches con personas que se dirigen a un mismo destino o similar y el cómo podemos llegar a ser masivos a la par que disruptivos realizando esta conexión. 
              SharetoGo es ilusión, compañerismo, sacrificio, trabajo y, sobre todo, ganas de solucionar un problema y hacerlo bien. 
            </p>
          </div>
          <div className="text-center md:text-righ">
            <Image src={Traffic} width={1200} height={1148} alt="App preview" data-aos="zoom-y-out" data-aos-delay="180" />
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto sm:px-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left pt-20">
            <Image src={AboutPic} alt="about picture" width={800} height={600} />
          </div>
          <div className="text-center md:text-right">
          <div className="text-3xl font-bold text-teal-950 mb-4 pt-16">Nuestra historía</div>
          <p className="text-teal-950 mb-12 text-lg text-justify">
              Compartir nos mueve, por ello, en SharetoGo nos hemos propuesto ser la solución lógica y la herramienta real para llevar a cabo el carpooling.
              Durante muchos meses hemos pensado, diseñado, programado toda nuestra aplicación para conectar mediante ubicación, a personas que tienen plazas libres en sus coches con personas que se dirigen a un mismo destino o similar y el cómo podemos llegar a ser masivos a la par que disruptivos realizando esta conexión. 
              SharetoGo es ilusión, compañerismo, sacrificio, trabajo y, sobre todo, ganas de solucionar un problema y hacerlo bien. 
            </p>
          </div>
        </div>
        <p className="text-teal-950 mb-4 py-12 text-2xl text-center font-bold italic">
          Para ti, para todos, comparte.
        </p>
        <div className="flex justify-center items-center">
          <div className="text-center">
            <Image src={Logo} alt="logo picture" width={100} height={100} />
          </div>
        </div>
      </div>
    </section>
  );
}
