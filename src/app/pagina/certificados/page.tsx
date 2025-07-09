const Certificados = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-red-600 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://via.placeholder.com/1920x300?text=Certificados')",
            filter: "brightness(0.7)"
          }}
        ></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CERTIFICADOS</h1>
          <p className="text-xl max-w-3xl">Verifica y gestiona tus certificados de participación</p>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Pestañas */}
          <div className="mb-8 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="mr-2">
                <a href="/pagina/eventos" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">
                  Próximos Eventos
                </a>
              </li>
              <li className="mr-2">
                <a href="/pagina/eventos-pasados" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">
                  Eventos Pasados
                </a>
              </li>
              <li className="mr-2">
                <a href="/pagina/certificados" className="inline-block p-4 border-b-2 border-red-600 rounded-t-lg text-red-600 active">
                  Certificados
                </a>
              </li>
            </ul>
          </div>

          {/* Sección de Verificación */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Verificación de Certificados</h2>
            <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Si has participado en alguno de nuestros eventos y deseas verificar la autenticidad de tu certificado, 
              ingresa el código único que aparece en tu documento. También puedes solicitar duplicados o reportar problemas.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <label htmlFor="codigo" className="block text-gray-700 text-sm font-bold mb-2">
                    Código de verificación
                  </label>
                  <input 
                    id="codigo"
                    type="text" 
                    placeholder="Ingresa DNI" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Ejemplo: CERT-PS-2025-0001
                  </p>
                </div>
                <div className="flex items-end">
                  <button className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                    Verificar Certificado
                  </button>
                </div>
              </div>
              
              {/* Resultado de verificación (oculto inicialmente) */}
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Certificado Válido</h3>
                    <p className="text-green-700">
                      Certificado emitido a: <strong>Juan Pérez Martínez</strong><br />
                      Por participación en: <strong>III Congreso Internacional de Proyección Social</strong><br />
                      Fecha de emisión: <strong>18 de Junio, 2025</strong><br />
                      Horas certificadas: <strong>40 horas</strong>
                    </p>
                    <div className="mt-4">
                      <button className="inline-flex items-center text-red-600 hover:text-red-800 font-medium">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Descargar certificado (PDF)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export { Certificados };
export default Certificados;