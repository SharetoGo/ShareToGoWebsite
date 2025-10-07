"use client";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, ReactNode } from "react";
import Link from "next/link";

const faqData: { question: string; answer: ReactNode }[] = [
    {
        question: "¿De quién es el coche?",
        answer: "El coche es de uno de los empleados de la empresa. La idea es que los diferentes empleados de las empresas, se vayan organizando para que siempre haya una persona que ofrezca las plazas de su coche y otras que les cuadre para reservarlas."
    },
    {
        question: "¿Si actúo como conductor, cuáles son los beneficios económicos?",
        answer: "Los beneficios dependerán del uso que se haga de la plataforma y las plazas libres que se ofrezcan. Garantizamos que la mitad de los gastos están cubiertos en cada trayecto compartido."
    },
    {
        question: "¿Los pasajeros pagan? ¿Cuánto?",
        answer: "Si, según la distancia del trayecto los pasajeros deberán pagar una cantidad u otra. Intentamos que el pago de los pasajeros sea lo más bajo posible para poder ser altamente  competitivos con otras alternativas."
    },
    {
        question: "¿Cuáles son los gastos asociados para la empresa?",
        answer: (
            <>
                La empresa y SharetoGo valorarán la situación conjuntamente y llegarán al mejor acuerdo posible.{" "}
                <Link href="/contratar" className="font-bold text-black hover:underline">
                    Solicitar una prueba
                </Link>{" "}
                puede ser el primer paso
            </>
        )
    },
    {
        question: "¿A parte de le gestión de la movilidad, la empresa puede beneficiarse de otros servicios?",
        answer: "Sí. Desde la página web, la empresa puede acceder a una Intranet en la cual puede encontrar todos los datos de su empresa generales, y por empleados, estrechamente ligados con la sostenibilidad y el cumplimiento de nuevas normativas."
    },
    {
        question: "¿Es obligatorio ir y volver con la misma persona?",
        answer: (
            <>
                <p className="mb-3">NO</p>
                <p className="mb-2"><span className="font-semibold">Conductor:</span> No, no es obligatorio. No tienes el compromiso de llevar a las mismas personas en el trayecto de ida y vuelta, salvo que hayas publicado un trayecto específico para ambos recorridos.</p>
                <p><span className="font-semibold">Pasajero:</span> No, no es obligatorio. No tienes el compromiso de volver en el mismo coche que usaste para la ida, salvo que hayas reservado un trayecto específico de ida y vuelta con el mismo conductor.</p>
            </>
        )
    },
    {
        question: "¿Cuánto tiempo debo esperar si el conductor o el pasajero no llega?",
        answer: (
            <>
                <p className="mb-2"><span className="font-semibold">Conductor:</span> Debes esperar a los pasajeros en el punto de encuentro acordado al menos 15 minutos después de la hora establecida.</p>
                <p><span className="font-semibold">Pasajero:</span> Debes esperar al conductor en el punto de encuentro acordado al menos 15 minutos después de la hora establecida.</p>
            </>
        )
    },
    {
        question: "Si anulo, ¿se devuelve el dinero?",
        answer: (
            <>
                <p className="mb-2 font-semibold">Conductor:</p>
                <ul className="list-disc pl-6 mb-3">
                    <li>Si el conductor anula el trayecto y ya ha recibido el pago, debe devolver a los pasajeros el importe íntegro.</li>
                    <li>Si el conductor llega con más de 20 minutos de retraso, también se devuelve el importe completo al pasajero.</li>
                </ul>
                <p className="mb-2 font-semibold">Pasajero:</p>
                <ul className="list-disc pl-6">
                    <li>Si cancelas con 24 horas de antelación, recibes el reembolso total.</li>
                    <li>Si cancelas con menos de 24 horas pero más de 30 minutos antes del trayecto, el importe se divide: la mitad para el conductor y la otra mitad para el pasajero.</li>
                    <li>Si cancelas con menos de 30 minutos antes del trayecto, no recibes devolución y el conductor recibe el importe completo.</li>
                </ul>
            </>
        )
    },
    {
        question: "¿Dónde puedo saber todos los detalles de las políticas de SharetoGo?",
        answer: (
            <>
                <p className="mb-2">
                    Puedes mandarnos un correo a {""}
                    <Link href="/contacto" className="font-bold text-black hover:underline">
                        contactosharetogo@gmail.com
                    </Link>{" "}
                    o llamarnos a través del apartado de {""}
                    <Link href="/contacto" className="font-bold text-black hover:underline">Contacto</Link>{" "}
                    con cualquier pregunta.
                </p>
                <p>
                    También puedes visitar nuestras {""}
                    <Link href="/privacidad" className="font-bold text-black hover:underline">Políticas de Privacidad</Link>{" "}
                    y Términos y Condiciones de Uso.
                </p>
            </>
        )
    }
];

const FaqItem = ({ faq, isOpen, onToggle }: { faq: typeof faqData[0], isOpen: boolean, onToggle: () => void }) => {
    const questionId = faq.question.replace(/\s+/g, '-').toLowerCase();
    return (
        <div className="w-full bg-[#9dd187] rounded-2xl mt-4">
            <button
                type="button"
                className="w-full flex justify-between items-center text-left p-4 sm:p-6 focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${questionId}`}
                onClick={onToggle}
            >
                <h3 className="text-lg sm:text-xl font-semibold text-[#2a2c38] flex-1 pr-4">
                    {faq.question}
                </h3>
                {isOpen ? (
                    <ChevronUp className="text-4xl text-[#2a2c38] flex-shrink-0" />
                ) : (
                    <ChevronDown className="text-4xl text-[#2a2c38] flex-shrink-0" />
                )}
            </button>
            <div
                id={`faq-answer-${questionId}`}
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-6 text-base sm:text-lg text-[#2a2c38]">
                        {faq.answer}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Faqs() {
    const [open, setOpen] = useState(Array(faqData.length).fill(false));

    const handleToggle = (idx: number) => {
        setOpen(prev => prev.map((v, i) => i === idx ? !v : v));
    };

    return(
         <section className="relative bg-white py-16 sm:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#2a2c38] mb-8 text-center sm:text-left">
                    Preguntas frecuentes                
                </h2>
                <div className="w-full">
                    {faqData.map((faq, idx) => (
                        <FaqItem 
                            key={idx}
                            faq={faq}
                            isOpen={open[idx]}
                            onToggle={() => handleToggle(idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}