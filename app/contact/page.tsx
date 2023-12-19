'use client'

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    sujeto: '',
    mensaje: '',
  });

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
      } else {
        console.error('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-4xl font-extrabold text-teal-950 mb-4">Ayuda</h2>
            <p className="text-teal-950 mb-2 font-bold text-2xl">Ponte en contacto con nosotros</p>
            <p className="text-teal-950 mb-8 text-lg">Contacta con nosotros para cualquier duda o consulta y te ayudaremos lo antes posible.</p>
        </div>
        <form className="bg-transparent rounded-lg shadow-2xl p-6 grid grid-cols-2 gap-4"
          onSubmit={handleSubmit}>
          <div className="col-span-1">
            <label className="block text-teal-950 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg"
              type="text"
              placeholder="Tu nombre"
              id="nombre"
              name="nombre"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-teal-950 text-sm font-bold mb-2" htmlFor="apellido">
              Apellido/s
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg "
              type="text"
              placeholder="Tu apellido"
              id="apellido"
              name="apellido"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-teal-950 text-sm font-bold mb-2" htmlFor="email">
              Correo electrónico (obligatorio)
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg "
              type="text"
              placeholder="Tu correo electrónico"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-teal-950 text-sm font-bold mb-2" htmlFor="email">
              Sujeto
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg "
              type="text"
              placeholder="Agregar un tema"
              id="sujeto"
              name="sujeto"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-teal-950 text-sm font-bold mb-2" htmlFor="mensaje">
              Mensaje
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg "
              id="mensaje"
              placeholder="Tu mensaje..."
              name="mensaje"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="col-span-2 text-center">
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-lg"
              type="submit">
              Enviar mensaje
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}