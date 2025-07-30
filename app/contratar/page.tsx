'use client'

import Header from '@/components/ui/header'
import { useState } from 'react';

export default function Contratar() {
  const [formData, setFormData] = useState({
  nombre: '',
  apellido: '',
  email: '',
  numero_telefono: '',
  rol_empresa: '',
  sujeto: 'Prueba Solicitada',
  mensaje: '',
  num_empleados: 0
});

const [isSuccess, setIsSuccess] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: name === 'num_empleados' ? Number(value) : value,
  }));
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSuccess(true);
      const form = e.target as HTMLFormElement;
      form.reset();
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


  return (
    <div className="bg-white">
      <Header />
      <div className="flex justify-center items-center min-h-screen pt-24 pb-12">
        <form
          className="w-full max-w-4xl p-8 rounded-lg shadow-lg bg-[#9dd187]"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Solicita una Prueba</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-white" htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="w-full p-2 rounded border border-gray-300"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-white" htmlFor="apellido">Apellidos</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                className="w-full p-2 rounded border border-gray-300"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-white" htmlFor="email">Correo Corporativo</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 rounded border border-gray-300"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-white" htmlFor="numero_telefono">Número de Teléfono</label>
              <input
                type="tel"
                id="numero_telefono"
                name="numero_telefono"
                className="w-full p-2 rounded border border-gray-300"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-white" htmlFor="rol_empresa">Rol dentro de la empresa</label>
              <input
                type="text"
                id="rol_empresa"
                name="rol_empresa"
                className="w-full p-2 rounded border border-gray-300"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-white" htmlFor="num_empleados">Número de Trabajadores</label>
              <select
                id="num_empleados"
                name="num_empleados"
                className="w-full p-2 rounded border border-gray-300 bg-white text-gray-600"
                onChange={handleChange}
                required
                defaultValue=""
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="0-10">0-10</option>
                <option value="20-50">20-50</option>
                <option value="50-150">50-150</option>
                <option value="+150">+150</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-1 font-semibold text-white" htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                className="w-full p-2 rounded border border-gray-300"
                rows={4}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-center h-full">
              <div className="w-full h-32 pt-12 bg-transparent rounded flex items-center justify-center">
                <img src="/images/logo_blanco.png" alt="Logo blanco" className="h-64 object-contain" />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-48 h-12 mt-6 bg-[#2a2c38] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#2a2c38] transition"
            >
              Pide tu prueba
            </button>
          </div>
          {isSuccess && (
            <p className="mt-4 bg-[#2a2c38] font-semibold text-center">¡Mensaje enviado con éxito!</p>
          )}
        </form>
      </div>
    </div>
  )
}
