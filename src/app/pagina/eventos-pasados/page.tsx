const EventosPasados = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-red-600 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://via.placeholder.com/1920x300?text=Eventos+Pasados')",
            filter: "brightness(0.7)"
          }}
        ></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EVENTOS PASADOS</h1>
          <p className="text-xl max-w-3xl">Revisa las actividades realizadas por la Dirección de Proyección Social</p>
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
                <a href="/pagina/eventos-pasados" className="inline-block p-4 border-b-2 border-red-600 rounded-t-lg text-red-600 active">
                  Eventos Pasados
                </a>
              </li>
              <li className="mr-2">
                <a href="/pagina/certificados" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">
                  Certificados
                </a>
              </li>
            </ul>
          </div>

          {/* Filtros y Búsqueda */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Filtrar por:</span>
              <select className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option>Todos</option>
                <option>Conferencias</option>
                <option>Talleres</option>
                <option>Seminarios</option>
                <option>Culturales</option>
              </select>
              
              <select className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option>Todos los años</option>
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Buscar eventos pasados..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Eventos Pasados */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Eventos Realizados</h2>
            
            {/* Evento Pasado 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 mb-8">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Congreso+Social+2024" 
                    alt="Congreso Social 2024" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">15-17 Mayo, 2024</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-600">Auditorio Magno UNA Puno</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">II Congreso Internacional de Proyección Social Universitaria</h3>
                  <p className="text-gray-700 mb-4">
                    Congreso internacional que reunió a expertos en responsabilidad social universitaria para compartir experiencias y buenas prácticas en la implementación de proyectos de impacto social.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Conferencia</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Internacional</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Certificado</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-700 block">Asistentes: <strong>250+</strong></span>
                      <span className="text-gray-700">Materiales disponibles</span>
                    </div>
                    <div className="flex space-x-2">
                      <a 
                        href="#" 
                        className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
                      >
                        Ver Galería
                      </a>
                      <a 
                        href="#" 
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                      >
                        Ver Resumen
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Evento Pasado 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 mb-8">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Taller+Comunitario" 
                    alt="Taller Comunitario" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">10 Abril, 2024</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-600">Comunidad de Capachica</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Taller de Agricultura Sostenible en Comunidades Altiplánicas</h3>
                  <p className="text-gray-700 mb-4">
                    Taller práctico para agricultores locales sobre técnicas de agricultura sostenible adaptadas a las condiciones del altiplano.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Taller</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Comunitario</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Práctico</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-700 block">Participantes: <strong>45 familias</strong></span>
                      <span className="text-gray-700">Proyectos implementados</span>
                    </div>
                    <div className="flex space-x-2">
                      <a 
                        href="#" 
                        className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
                      >
                        Ver Reporte
                      </a>
                      <a 
                        href="#" 
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                      >
                        Ver Testimonios
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Evento Pasado 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 mb-8">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Taller+Comunitario" 
                    alt="Taller Comunitario" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">10 Abril, 2024</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-600">Comunidad de Capachica</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Taller de Agricultura Sostenible en Comunidades Altiplánicas</h3>
                  <p className="text-gray-700 mb-4">
                    Taller práctico para agricultores locales sobre técnicas de agricultura sostenible adaptadas a las condiciones del altiplano.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Taller</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Comunitario</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Práctico</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-700 block">Participantes: <strong>45 familias</strong></span>
                      <span className="text-gray-700">Proyectos implementados</span>
                    </div>
                    <div className="flex space-x-2">
                      <a 
                        href="#" 
                        className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
                      >
                        Ver Reporte
                      </a>
                      <a 
                        href="#" 
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                      >
                        Ver Testimonios
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Evento Pasado 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 mb-8">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Taller+Comunitario" 
                    alt="Taller Comunitario" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">10 Abril, 2024</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-600">Comunidad de Capachica</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Taller de Agricultura Sostenible en Comunidades Altiplánicas</h3>
                  <p className="text-gray-700 mb-4">
                    Taller práctico para agricultores locales sobre técnicas de agricultura sostenible adaptadas a las condiciones del altiplano.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Taller</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Comunitario</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Práctico</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-700 block">Participantes: <strong>45 familias</strong></span>
                      <span className="text-gray-700">Proyectos implementados</span>
                    </div>
                    <div className="flex space-x-2">
                      <a 
                        href="#" 
                        className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
                      >
                        Ver Reporte
                      </a>
                      <a 
                        href="#" 
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                      >
                        Ver Testimonios
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Evento Pasado 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 mb-8">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Taller+Comunitario" 
                    alt="Taller Comunitario" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">10 Abril, 2024</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-600">Comunidad de Capachica</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Taller de Agricultura Sostenible en Comunidades Altiplánicas</h3>
                  <p className="text-gray-700 mb-4">
                    Taller práctico para agricultores locales sobre técnicas de agricultura sostenible adaptadas a las condiciones del altiplano.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Taller</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Comunitario</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Práctico</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-700 block">Participantes: <strong>45 familias</strong></span>
                      <span className="text-gray-700">Proyectos implementados</span>
                    </div>
                    <div className="flex space-x-2">
                      <a 
                        href="#" 
                        className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
                      >
                        Ver Reporte
                      </a>
                      <a 
                        href="#" 
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                      >
                        Ver Testimonios
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de eventos pasados */}
            
            
            
            {/* Paginación */}
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <a href="#" className="py-2 px-4 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-l-md">
                  Anterior
                </a>
                <a href="#" className="py-2 px-4 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                  1
                </a>
                <a href="#" className="py-2 px-4 border border-gray-300 bg-red-600 text-white">
                  2
                </a>
                <a href="#" className="py-2 px-4 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                  3
                </a>
                <a href="#" className="py-2 px-4 border-t border-b border-r border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-r-md">
                  Siguiente
                </a>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { EventosPasados };
export default EventosPasados;