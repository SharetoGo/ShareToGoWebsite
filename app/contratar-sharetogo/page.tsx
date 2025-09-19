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
    num_empleados: '',
    nombre_empresa: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contratar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          numero_telefono: '',
          rol_empresa: '',
          sujeto: 'Prueba Solicitada',
          mensaje: '',
          num_empleados: '',
          nombre_empresa: ''
        });
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <Header />
      <div className="flex justify-center items-center min-h-[75vh] pt-20 pb-6">
        <form
          className={`w-full ${isSuccess ? 'max-w-6xl' : 'max-w-4xl'} p-8 rounded-lg shadow-lg bg-[#9dd187] ${isSuccess ? 'min-h-[80vh] flex items-center justify-center' : ''}`}
          onSubmit={handleSubmit}
        >
          {isSuccess ? (
            <div className="text-center">
              <p className="text-[#2a2c38] text-xl font-bold">Hemos recibido tu mensaje con éxito. En breves te contactaremos.</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-6 text-center text-white">Solicita una Prueba</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-semibold text-white" htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
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
                    value={formData.apellido}
                    className="w-full p-2 rounded border border-gray-300"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-white" htmlFor="nombre_empresa">Nombre de la Empresa</label>
                  <input
                    type="text"
                    id="nombre_empresa"
                    name="nombre_empresa"
                    value={formData.nombre_empresa}
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
                    value={formData.email}
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
                    value={formData.numero_telefono}
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
                    value={formData.rol_empresa}
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
                    value={formData.num_empleados}
                    className="w-full p-2 rounded border border-gray-300 bg-white text-gray-600"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="0-10">0-10</option>
                    <option value="20-50">20-50</option>
                    <option value="50-150">50-150</option>
                    <option value="+150">+150</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block mb-1 font-semibold text-white" htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    className="w-full p-2 rounded border border-gray-300"
                    rows={4}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex justify-center items-start h-full -mt-12 md:-mt-16">
                  <div className="w-full bg-transparent rounded flex items-start justify-center">
                    <img src="/images/logo_blanco.png" alt="Logo blanco" className="object-contain self-start -mt-16 md:-mt-10 h-56 md:h-72" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-48 h-12 mt-2 bg-[#2a2c38] text-white font-bold py-2 px-4 rounded-lg transition ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2a2c38]'
                  }`}
                >
                  {isSubmitting ? 'Enviando...' : 'Pide tu prueba'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
