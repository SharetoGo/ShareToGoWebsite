export const metadata = {
  title: 'SharetoGo - Privacy policy',
  description: 'Privacy policy of SharetoGo',
}

export default function Policy() {
  return (
    <section className="bg-gradient-to-b from-green-100 to-white">
      <div className="bg-green-100 min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-6 text-green-900 text-center mt-5">Politicas de privacidad</h1>
        <div className="text-xl text-center max-w-lg mb-8 text-gray-800">
          <p>
          Bienvenido a nuestra página de Política de Privacidad. A continuación encontrará enlaces a nuestros documentos de privacidad en formato PDF.          </p>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              src="/pdfs/politicas-de-privacidad-y-condiciones-de-uso-trabajo-laura-pdf.pdf"
              className="w-full h-96 md:h-128"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
