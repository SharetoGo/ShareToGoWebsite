export const metadata = {
    title: 'SharetoGo - About',
    description: 'About SharetoGo',
  };
  
  export default function Contact() {
    return (
      <section className="bg-green-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Ayuda</h2>
                <p className="text-gray-600 mb-2 font-bold text-2xl">Ponte en contacto con nosotros</p>
                <p className="text-gray-600 mb-8 text-lg">Contacta con nosotros para cualquier duda o consulta y te ayudaremos lo antes posible.</p>
            </div>

          <form className="bg-transparent rounded-lg shadow-2xl p-6 grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                Nombre
              </label>
              <input
                className="w-full px-3 py-2 rounded-lg"
                type="text"
                placeholder="Tu nombre"
                id="nombre"
                name="nombre"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                Apellido/s
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg "
                type="text"
                placeholder="Tu apellido"
                id="apellido"
                name="apellido"
                required
              />
            </div>
  
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Correo electrónico (obligatorio)
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg "
                type="email"
                placeholder="Tu correo electrónico"
                id="email"
                name="email"
                required
              />
            </div>
  
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mensaje">
                Mensaje
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg "
                id="mensaje"
                placeholder="Tu mensaje..."
                name="mensaje"
                required
              ></textarea>
            </div>
  
            <div className="col-span-2 text-center">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
                type="submit"
              >
                Enviar mensaje
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
  