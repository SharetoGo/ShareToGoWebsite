"use client";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
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
              <Link
                href="/contratar-sharetogo"
                className="font-bold text-black underline hover:text-gray-700"
              >
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
        question: "¿Eres un evento y quieres contratar SharetoGo a medida?",
        answer: (
            <>
                Podemos añadirte como evento disponible cuando quieras.{" "}
                <Link
                    href="/contratar-sharetogo"
                    className="font-bold text-black underline hover:text-gray-700"
                >
                    Más info aquí
                </Link>
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
                    <CiCircleMinus className="text-4xl text-[#2a2c38] flex-shrink-0" />
                ) : (
                    <CiCirclePlus className="text-4xl text-[#2a2c38] flex-shrink-0" />
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
         <section className="relative bg-white py-8 md:py-12">
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