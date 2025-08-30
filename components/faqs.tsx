"use client";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useState } from "react";
import Link from "next/link";

export default function Faqs() {
    const [open, setOpen] = useState([false, false, false, false, false]);
    const handleToggle = (idx: number) => {
        setOpen(prev => prev.map((v, i) => i === idx ? !v : v));
    };
    return(
         <section className="relative bg-white py-20">
            <div className="max-w-screen-2xl mx-auto sm:px-6">
                <h2 className="text-4xl font-bold text-[#2a2c38] mb-4 pl-6">
                    Preguntas frecuentes                
                </h2>
            </div>
            {/* FAQ 1 */}
            <div className={`w-full sm:w-[80rem] bg-[#9dd187] rounded-2xl mt-6 mx-auto flex flex-col px-4 sm:px-16 transition-all duration-300 ${open[0] ? 'sm:h-[18rem]' : 'sm:h-48'} ${open[0] ? 'h-auto' : 'h-auto'} justify-center`}>
                <div className="w-full flex flex-col sm:flex-row items-center relative h-full">
                    <span className="text-4xl font-bold text-[#2a2c38] mb-4 text-center sm:text-left flex-1">¿De quién es el coche?</span>
                    <button
                        type="button"
                        className="focus:outline-none p-2 rounded-full hover:bg-[#b6e2b8] transition-colors sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2"
                        aria-label={open[0] ? "Collapse FAQ" : "Expand FAQ"}
                        onClick={() => handleToggle(0)}
                    >
                        {open[0] ? (
                            <CiCircleMinus className="text-6xl text-[#2a2c38]" />
                        ) : (
                            <CiCirclePlus className="text-6xl text-[#2a2c38]" />
                        )}
                    </button>
                </div>
                {open[0] && (
                    <div className="w-full mt-4 mb-8 text-2xl text-[#2a2c38] text-left">
                        El coche es de uno de los empleados de la empresa. La idea es que los diferentes empleados de las empresas, se vayan organizando para que siempre haya una persona que ofrezca las plazas de su coche y otras que les cuadre para reservarlas. 
                    </div>
                )}
            </div>
            {/* FAQ 2 */}
            <div className={`w-full sm:w-[80rem] bg-[#9dd187] rounded-2xl mt-6 mx-auto flex flex-col px-4 sm:px-16 transition-all duration-300 ${open[1] ? 'sm:h-[18rem]' : 'sm:h-48'} ${open[1] ? 'h-auto' : 'h-auto'} justify-center`}>
                <div className="w-full flex flex-col sm:flex-row items-center relative h-full">
                    <span className="inline-block text-4xl font-bold text-[#2a2c38] mb-4 text-left flex-1">¿Si actúo como conductor, cuáles son los<br></br>beneficios económicos? </span>
                    <button
                        type="button"
                        className="focus:outline-none p-2 rounded-full hover:bg-[#b6e2b8] transition-colors sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2"
                        aria-label={open[1] ? "Collapse FAQ" : "Expand FAQ"}
                        onClick={() => handleToggle(1)}
                    >
                        {open[1] ? (
                            <CiCircleMinus className="text-6xl text-[#2a2c38]" />
                        ) : (
                            <CiCirclePlus className="text-6xl text-[#2a2c38]" />
                        )}
                    </button>
                </div>
                {open[1] && (
                    <div className="w-full mt-4 mb-8 text-2xl text-[#2a2c38] text-left">
                        Los beneficios dependerán del uso que se haga de la plataforma y las plazas libres que se ofrezcan. Garantizamos que la mitad de los gastos están cubiertos en cada trayecto compartido. 
                    </div>
                )}
            </div>
            {/* FAQ 3 */}
            <div className={`w-full sm:w-[80rem] bg-[#9dd187] rounded-2xl mt-6 mx-auto flex flex-col px-4 sm:px-16 transition-all duration-300 ${open[2] ? 'sm:h-[18rem]' : 'sm:h-48'} ${open[2] ? 'h-auto' : 'h-auto'} justify-center`}>
                <div className="w-full flex flex-col sm:flex-row items-center relative h-full">
                    <span className="text-4xl font-bold text-[#2a2c38] mb-4 text-center sm:text-left flex-1">¿Los pasajeros pagan? ¿Cuánto?</span>
                    <button
                        type="button"
                        className="focus:outline-none p-2 rounded-full hover:bg-[#b6e2b8] transition-colors sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2"
                        aria-label={open[2] ? "Collapse FAQ" : "Expand FAQ"}
                        onClick={() => handleToggle(2)}
                    >
                        {open[2] ? (
                            <CiCircleMinus className="text-6xl text-[#2a2c38]" />
                        ) : (
                            <CiCirclePlus className="text-6xl text-[#2a2c38]" />
                        )}
                    </button>
                </div>
                {open[2] && (
                    <div className="w-full mt-4 mb-8 text-2xl text-[#2a2c38] text-left">
                       Si, según la distancia del trayecto los pasajeros deberán pagar una cantidad u otra. Intentamos que el pago de los pasajeros sea lo más bajo posible para poder ser altamente  competitivos con otras alternativas.
                    </div>
                )}
            </div>
            {/* FAQ 4 */}
            <div className={`w-full sm:w-[80rem] bg-[#9dd187] rounded-2xl mt-6 mx-auto flex flex-col px-4 sm:px-16 transition-all duration-300 ${open[3] ? 'sm:h-[18rem]' : 'sm:h-48'} ${open[3] ? 'h-auto' : 'h-auto'} justify-center`}>
                <div className="w-full flex flex-col sm:flex-row items-center relative h-full">
                    <span className="text-4xl font-bold text-[#2a2c38] mb-4 text-center sm:text-left flex-1">¿Cuáles son los gastos asociados para la empresa? </span>
                    <button
                        type="button"
                        className="focus:outline-none p-2 rounded-full hover:bg-[#b6e2b8] transition-colors sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2"
                        aria-label={open[3] ? "Collapse FAQ" : "Expand FAQ"}
                        onClick={() => handleToggle(3)}
                    >
                        {open[3] ? (
                            <CiCircleMinus className="text-6xl text-[#2a2c38]" />
                        ) : (
                            <CiCirclePlus className="text-6xl text-[#2a2c38]" />
                        )}
                    </button>
                </div>
              {open[3] && (
                <div className="w-full mt-4 mb-8 text-2xl text-[#2a2c38] text-left">
                    La empresa y SharetoGo valorarán la situación conjuntamente y llegarán al mejor acuerdo posible.{" "}
                    <Link href="/contratar" className="font-bold text-black hover:underline">
                    Solicitar una prueba
                    </Link>{" "}
                    puede ser el primer paso
                </div>
                )}
            </div>
            {/* FAQ 5 */}
            <div className={`w-full sm:w-[80rem] bg-[#9dd187] rounded-2xl mt-6 mx-auto flex flex-col px-4 sm:px-16 transition-all duration-300 ${open[4] ? 'sm:h-[22rem]' : 'sm:h-48'} ${open[4] ? 'h-auto' : 'h-auto'} justify-center`}>
                <div className="w-full flex flex-col sm:flex-row items-center relative h-full">
                    <span className="inline-block text-4xl font-bold text-[#2a2c38] mb-4 text-left flex-1">¿A parte de le gestión de la movilidad, la empresa<br></br>puede beneficiarse de otros servicios? </span>
                    <button
                        type="button"
                        className="focus:outline-none p-2 rounded-full hover:bg-[#b6e2b8] transition-colors sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2"
                        aria-label={open[4] ? "Collapse FAQ" : "Expand FAQ"}
                        onClick={() => handleToggle(4)}
                    >
                        {open[4] ? (
                            <CiCircleMinus className="text-6xl text-[#2a2c38]" />
                        ) : (
                            <CiCirclePlus className="text-6xl text-[#2a2c38]" />
                        )}
                    </button>
                </div>
                {open[4] && (
                    <div className="w-full mt-4 mb-8 text-2xl text-[#2a2c38] text-left">
                        Sí. Desde la página web, la empresa puede acceder a una Intranet en la cual puede encontrar todos los datos de su empresa generales, y por empleados, estrechamente ligados con la sostenibilidad y el cumplimiento de nuevas normativas. 
                    </div>
                )}
            </div>
        </section>
    );
}