export const metadata = {
  title: 'SharetoGo - Privacy policy',
  description: 'Privacy policy of SharetoGo',
}

export default function Policy() {
  const pdf1Url = '/pdfs/politicas-de-privacidad-y-condiciones-de-uso-trabajo-laura-pdf.pdf';
  const pdf2Url = '/pdfs/politica-de-cookies-share-to-go-trabajo-laura.pdf';

  return (
    <section className="bg-green-50 pb-16 min-h-screen">
      <div className="bg-green-50 flex flex-col items-center justify-center text-white min-h-full">
        <h1 className="text-5xl font-bold mb-6 text-green-900 text-center mt-20">Políticas de privacidad</h1>
        <div className="text-center max-w-lg mb-8 text-gray-800">
          <p className="text-3xl italic">Bienvenido a nuestra página de Política de Privacidad.</p>
          <p className="text-xl mt-4">A continuación encontrará enlaces a nuestros documentos de privacidad y condiciones de uso en formato PDF.</p>
        </div>
        <div className="md:flex md:space-x-4">
          <div className="rounded-lg overflow-hidden">
            <iframe
              src={pdf1Url}
              className="w-full h-96 md:h-128"
            />
            <div className="text-center pt-6 mt-4 mb-4">
              <a href={pdf1Url} download="PoliticasPrivacidad.pdf" className="bg-green-600 hover:bg-green-700 text-white text-center font-bold py-3 px-20 rounded-md">
                Descargar
              </a>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <iframe
              src={pdf2Url}
              className="w-full h-96 md:h-128"
            />
            <div className="text-center pt-6 mt-4 mb-4">
              <a href={pdf2Url} download="PoliticaCookies.pdf" className="bg-green-600 hover:bg-green-700 text-white text-center font-bold py-3 px-20 rounded-md">
                Descargar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
