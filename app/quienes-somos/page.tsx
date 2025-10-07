"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Reviews from "@/components/ui/reviews";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, TrendingUp, Leaf } from "lucide-react";

export default function QuienesSomos() {
  const [trayectos, setTrayectos] = useState<number>(0);
  const [personas, setPersonas] = useState<number>(0);
  const [co2Saved] = useState<number>(3);

  const fetchTravels = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "travels"));
      setTrayectos(querySnapshot.size);
    } catch (error) {
      console.error("Error fetching travels:", error);
    }
  };
  const fetchPeople = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "travels"));
      let totalPeople = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        totalPeople += Array.isArray(data.reservedBy)
          ? data.reservedBy.length
          : 0;
      });
      setPersonas(totalPeople);
    } catch (error) {
      console.error("Error fetching travels:", error);
    }
  };

  useEffect(() => {
    fetchTravels();
    fetchPeople();
  }, []);

  return (
    <main>
      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-[#2a2c38]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#9dd187] mb-6">Quiénes somos</h1>
          <p className="text-xl text-gray-300 mb-8 text-balance">
            Somos el equipo detrás de la revolución del carpooling corporativo, comprometidos con crear un futuro más
            sostenible y conectado para las empresas.
          </p>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Mission Card */}
            <div className="lg:col-span-7">
              <Card className="h-full bg-[#9dd187] border-none shadow-xl">
                <CardContent className="p-8 md:p-12 h-full flex flex-col justify-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-8">
                      <Target className="text-white text-2xl" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-[#2a2c38] mb-8 text-balance">
                      Nuestra misión
                    </h1>
                  </div>
                  <p className="text-base md:text-lg font-medium text-[#2a2c38] leading-relaxed">
                    Compartir nos mueve, por ello, en SharetoGo nos hemos propuesto ser la solución lógica y la herramienta real para llevar a cabo el carpooling corporativo en España. Durante muchos meses hemos pensado, diseñado, programado toda nuestra aplicación para conectar mediante ubicación, a personas que tienen plazas libres en sus coches con personas que se dirigen a un mismo destino o similar y el cómo podemos llegar a ser masivos a la par que disruptivos realizando esta conexión. SharetoGo es ilusión, compañerismo, sacrificio, trabajo y, sobre todo, ganas de solucionar un problema y hacerlo bien.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Mission Image */}
            <div className="lg:col-span-5">
              <div className="h-full min-h-[400px] relative">
                <Image
                  src="/images/about-us.png"
                  width={500}
                  height={500}
                  alt="Nuestra misión SharetoGo"
                  className="rounded-xl shadow-xl object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-20 bg-[#2a2c38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            Nuestro impacto hasta la fecha
          </h2>
          <p className="text-xl text-gray-300 mb-16 text-center">
            Gracias a SharetoGo, estas son algunas de las cifras que reflejan nuestro compromiso con la movilidad sostenible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-white border-2 hover:border-[#9dd187] transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#9dd187] rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="text-white text-2xl" />
                </div>
                <div className="text-4xl md:text-6xl font-extrabold text-[#2a2c38] mb-4">
                  {trayectos.toLocaleString()}
                </div>
                <div className="text-base md:text-lg font-semibold text-[#2a2c38] uppercase tracking-wide">
                  Trayectos Completados
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white border-2 hover:border-[#9dd187] transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#2a2c38] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-white text-2xl" />
                </div>
                <div className="text-4xl md:text-6xl font-extrabold text-[#2a2c38] mb-4">
                  {personas.toLocaleString()}
                </div>
                <div className="text-base md:text-lg font-semibold text-[#2a2c38] uppercase tracking-wide">
                  Personas Transportadas
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white border-2 hover:border-[#9dd187] transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#9dd187] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="text-white text-2xl" />
                </div>
                <div className="text-4xl md:text-6xl font-extrabold text-[#2a2c38] mb-4">
                  {co2Saved}
                </div>
                <div className="text-base md:text-lg font-semibold text-[#2a2c38] uppercase tracking-wide">
                  Toneladas CO₂ Ahorradas
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Logo Image */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="h-full min-h-[400px] flex items-center justify-center">
                <Image
                src="/images/about-us-2.png"
                width={500}
                height={500}
                alt="Nuestra misión SharetoGo"
                className="rounded-xl shadow-xl object-cover w-full h-full"
              />
              </div>
            </div>

            {/* Who We Are Card */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <Card className="h-full bg-[#9dd187] border-none shadow-xl">
                <CardContent className="p-8 md:p-12 h-full flex flex-col justify-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-8">
                      <Users className="text-white text-2xl" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#2a2c38] mb-8 text-balance">
                      Quiénes Somos
                    </h2>
                  </div>
                  <p className="text-base md:text-lg font-medium text-[#2a2c38] leading-relaxed">
                    Somos un grupo de personas que trabajamos ambiciosamente día
                    tras día para poder conseguir un cambio de hábitos en la
                    movilidad de la ciudadanía. Para nosotros, mantener al
                    equipo unido y conectado ha sido siempre una pieza angular y
                    prioritaria para que "la idea" inicial se materialice en un
                    proyecto de aplicación móvil sólido. Esto sólo es la
                    parrilla de salida. Entre todos, lo conseguiremos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* Reviews Section */}
      <Reviews />
    </main>
  );
}
