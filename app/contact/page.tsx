'use client'

import { useState } from 'react';
import { metadata } from './metadata';
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    sujeto: '',
    mensaje: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('Submitting form...');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Email sent successfully!');
        setIsSuccess(true);
        const form = e.target as HTMLFormElement;
        form.reset();
      } else {
        console.error('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 pt-12">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4 mb-8 md:mb-0">
            <form className="bg-[#9dd187] rounded-lg shadow-2xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
              onSubmit={handleSubmit}>
              {isSuccess ? (
                <div className="col-span-2 text-center">
                  <p className="text-[#2a2c38] text-xl font-bold">Hemos recibido tu mensaje con éxito. En breves te contactaremos.</p>
                </div>
              ) : (
                <>
                  <div className="col-span-2">
                    <div className="mb-2 pb-4 text-center mx-auto max-w-xs sm:max-w-md">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#2a2c38]">¡Contáctanos!</h2>
                      <p className="text-sm sm:text-base font-normal text-[#2a2c38] mt-1">¿Tienes alguna pregunta o feedback que darnos? Encantados de escucharte. Deja tu mensaje y te responderemos en un plazo máximo de 24 horas.</p>
                    </div>
                    <div className="h-1 bg-[#2a2c38] w-40 sm:w-72 rounded mx-auto mb-4"></div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-teal-950 text-xs sm:text-sm font-bold mb-2" htmlFor="nombre">
                      Nombre
                    </label>
                    <input
                      className="w-full px-3 py-2 rounded-lg text-sm"
                      type="text"
                      placeholder="Tu nombre"
                      id="nombre"
                      name="nombre"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-teal-950 text-xs sm:text-sm font-bold mb-2" htmlFor="apellido">
                      Apellido/s
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      type="text"
                      placeholder="Tu apellido"
                      id="apellido"
                      name="apellido"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-teal-950 text-xs sm:text-sm font-bold mb-2" htmlFor="email">
                      Correo electrónico (obligatorio)
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      type="text"
                      placeholder="Tu correo electrónico"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-teal-950 text-xs sm:text-sm font-bold mb-2" htmlFor="sujeto">
                      Sujeto
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      type="text"
                      placeholder="Agregar un tema"
                      id="sujeto"
                      name="sujeto"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-teal-950 text-xs sm:text-sm font-bold mb-2" htmlFor="mensaje">
                      Mensaje
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      id="mensaje"
                      placeholder="Tu mensaje..."
                      name="mensaje"
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-span-2 text-center">
                    <button
                      className="bg-[#2a2c38] text-white font-medium py-2 px-4 rounded-lg w-full sm:w-auto"
                      type="submit">
                      Enviar mensaje
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
          <div className="hidden md:block w-1 bg-white mx-2"></div>
          <div className="w-full md:w-1/2 md:pl-4 flex items-stretch justify-center">
            <div className="flex flex-col items-center w-full h-full">
              <img 
                src="/images/contact.jpg" 
                alt="Contacto ShareToGo" 
                className="rounded-lg shadow-lg max-w-full h-auto object-cover mb-4 sm:mb-6" 
                style={{ maxHeight: '250px', width: '100%', objectFit: 'cover' }}
              />
              <div className="bg-[#9dd187] w-full flex-1 mt-2 sm:mt-4 rounded-lg flex flex-col items-center justify-center px-2 py-4 sm:px-0">
                <div className="bg-white rounded-lg px-2 py-2 w-full sm:w-5/6 mx-auto flex items-center mb-6 sm:mb-10">
                  <div className="bg-blue-200 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <MdOutlineMail className="w-8 h-8 text-blue-700" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#2a2c38] text-base font-semibold">Email</span>
                    <span className="text-[#2a2c38] text-sm font-medium">contactosharetogo@gmail.com </span>
                  </div>
                </div>
                <div className="bg-white rounded-lg px-2 py-2 w-full sm:w-5/6 mx-auto flex items-center">
                  <div className="bg-blue-200 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <FaPhoneAlt className="w-7 h-7 text-blue-700" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#2a2c38] text-base font-semibold">Teléfono</span>
                    <span className="text-[#2a2c38] text-sm font-medium">+34 608 057 220  </span>
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