export const metadata = {
  title: 'SharetoGo - Privacy policy',
  description: 'Privacy policy of SharetoGo',
}

export default function Policy() {
  return (
    <section className="bg-gradient-to-b from-green-100 to-white">
      <div className="bg-green-50 min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-6 text-green-900 text-center mt-20">Políticas de privacidad</h1>
        <div className="text-center max-w-lg mb-8 text-gray-800">
          <p className="text-3xl italic">Bienvenido a nuestra página de Política de Privacidad.</p>
          <p className="text-xl mt-4">A continuación encontrará enlaces a nuestros documentos de privacidad y condiciones de uso en formato PDF.</p>
        </div>
        <div className="md:flex md:space-x-4">
          <div className="rounded-lg overflow-hidden">
            <iframe
              src="/pdfs/politicas-de-privacidad-y-condiciones-de-uso-trabajo-laura-pdf.pdf"
              className="w-full h-96 md:h-128"
            />
          </div>
  
  <div className="rounded-lg overflow-hidden">
    <iframe
      src="/pdfs/politica-de-cookies-share-to-go-trabajo-laura.pdf"
      className="w-full h-96 md:h-128"
    />
  </div>
</div>

      </div>
    </section>
  );
}
