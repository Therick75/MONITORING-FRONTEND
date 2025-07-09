const Eventos = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-red-600 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://via.placeholder.com/1920x300?text=Eventos+y+Certificados')",
            filter: "brightness(0.7)"
          }}
        ></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EVENTOS Y CERTIFICADOS</h1>
          <p className="text-xl max-w-3xl">Actividades académicas y culturales de la Dirección de Proyección Social</p>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Pestañas */}
          <div className="mb-8 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="mr-2">
                <a href="#" className="inline-block p-4 border-b-2 border-red-600 rounded-t-lg text-red-600 active">
                  Próximos Eventos
                </a>
              </li>
              <li className="mr-2">
                <a href="/pagina/eventos-pasados" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">
                  Eventos Pasados
                </a>
              </li>
              <li className="mr-2">
                <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">
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
            </div>
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Buscar eventos..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Eventos Destacados */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Eventos Destacados</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Evento Destacado 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <div className="relative">
                  <img 
                    src="https://via.placeholder.com/800x400?text=Congreso+Internacional" 
                    alt="Congreso Internacional" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    Destacado
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">15-17 Junio, 2025</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">III Congreso Internacional de Proyección Social Universitaria</h3>
                  <div className="flex items-center mb-4">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-600">Auditorio Magno UNA Puno</span>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Congreso internacional que reúne a expertos en responsabilidad social universitaria para compartir experiencias y buenas prácticas en la implementación de proyectos de impacto social.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Conferencia</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Internacional</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Certificado</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-red-600">Gratuito</span>
                    <a 
                      href="#" 
                      className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                    >
                      Inscribirse
                    </a>
                  </div>
                </div>
              </div>

              {/* Evento Destacado 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <div className="relative">
                  <img 
                    src="https://via.placeholder.com/800x400?text=Feria+Ambiental" 
                    alt="Feria Ambiental" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    Destacado
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">5 Junio, 2025</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Feria Ambiental por el Día Mundial del Medio Ambiente</h3>
                  <div className="flex items-center mb-4">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-600">Plaza de Armas, Puno</span>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Feria que reúne a estudiantes, docentes y público en general para sensibilizar sobre la importancia del cuidado del medio ambiente y presentar proyectos de gestión ambiental.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded">Feria</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Ambiental</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Participativo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-red-600">Entrada Libre</span>
                    <a 
                      href="#" 
                      className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                    >
                      Más Información
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Próximos Eventos - Versión con scroll horizontal */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Próximos Eventos</h2>
              {/* Indicador de scroll para móviles */}
              <div className="md:hidden flex items-center text-gray-500 text-sm">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                Desliza
              </div>
            </div>
            
            {/* Contenedor de eventos con scroll horizontal para móviles */}
            <div className="md:hidden relative">
              <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide -mx-4 px-4">
                {/* Evento 1 */}
                <div className="flex-shrink-0 w-72 bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Taller+Emprendimiento" 
                    alt="Taller de Emprendimiento" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">20 Junio, 2025</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Taller de Emprendimiento Social</h3>
                    <p className="text-gray-600 mb-4">
                      Taller dirigido a estudiantes y egresados interesados en desarrollar emprendimientos con impacto social.
                    </p>
                    <a 
                      href="#" 
                      className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                    >
                      Ver detalles
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Evento 2 */}
                <div className="flex-shrink-0 w-72 bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Seminario+Investigacion" 
                    alt="Seminario de Investigación" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">25 Junio, 2025</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Seminario de Investigación Aplicada</h3>
                    <p className="text-gray-600 mb-4">
                      Seminario sobre metodologías de investigación aplicada a proyectos de desarrollo comunitario.
                    </p>
                    <a 
                      href="#" 
                      className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                    >
                      Ver detalles
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Evento 3 */}
                <div className="flex-shrink-0 w-72 bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Conferencia+Educacion" 
                    alt="Conferencia Educación" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">30 Junio, 2025</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Conferencia: Educación para el Desarrollo</h3>
                    <p className="text-gray-600 mb-4">
                      Conferencia sobre el rol de la educación en el desarrollo sostenible de las comunidades.
                    </p>
                    <a 
                      href="#" 
                      className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                    >
                      Ver detalles
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Evento adicional para mostrar el scroll */}
                <div className="flex-shrink-0 w-72 bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Taller+Tecnologia" 
                    alt="Taller de Tecnología" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">5 Julio, 2025</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Taller de Tecnologías Emergentes</h3>
                    <p className="text-gray-600 mb-4">
                      Introducción a las tecnologías emergentes y su aplicación en proyectos sociales.
                    </p>
                    <a 
                      href="#" 
                      className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                    >
                      Ver detalles
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Flecha de desplazamiento (solo visible cuando hay scroll) */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden md:hidden">
                <div className="bg-red-600 text-white p-2 rounded-full shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Versión para escritorio (grid) */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Evento 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
                <img 
                  src="https://via.placeholder.com/600x400?text=Taller+Emprendimiento" 
                  alt="Taller de Emprendimiento" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">20 Junio, 2025</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Taller de Emprendimiento Social</h3>
                  <p className="text-gray-600 mb-4">
                    Taller dirigido a estudiantes y egresados interesados en desarrollar emprendimientos con impacto social.
                  </p>
                  <a 
                    href="#" 
                    className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                  >
                    Ver detalles
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Evento 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
                <img 
                  src="https://via.placeholder.com/600x400?text=Seminario+Investigacion" 
                  alt="Seminario de Investigación" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">25 Junio, 2025</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Seminario de Investigación Aplicada</h3>
                  <p className="text-gray-600 mb-4">
                    Seminario sobre metodologías de investigación aplicada a proyectos de desarrollo comunitario.
                  </p>
                  <a 
                    href="#" 
                    className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                  >
                    Ver detalles
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Evento 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
                <img 
                  src="https://via.placeholder.com/600x400?text=Conferencia+Educacion" 
                  alt="Conferencia Educación" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">30 Junio, 2025</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Conferencia: Educación para el Desarrollo</h3>
                  <p className="text-gray-600 mb-4">
                    Conferencia sobre el rol de la educación en el desarrollo sostenible de las comunidades.
                  </p>
                  <a 
                    href="#" 
                    className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                  >
                    Ver detalles
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
              {/* Evento 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
                <img 
                  src="https://via.placeholder.com/600x400?text=Conferencia+Educacion" 
                  alt="Conferencia Educación" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">30 Junio, 2025</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Conferencia: Educación para el Desarrollo</h3>
                  <p className="text-gray-600 mb-4">
                    Conferencia sobre el rol de la educación en el desarrollo sostenible de las comunidades.
                  </p>
                  <a 
                    href="#" 
                    className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                  >
                    Ver detalles
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
              {/* Evento 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
                <img 
                  src="https://via.placeholder.com/600x400?text=Conferencia+Educacion" 
                  alt="Conferencia Educación" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">30 Junio, 2025</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Conferencia: Educación para el Desarrollo</h3>
                  <p className="text-gray-600 mb-4">
                    Conferencia sobre el rol de la educación en el desarrollo sostenible de las comunidades.
                  </p>
                  <a 
                    href="#" 
                    className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                  >
                    Ver detalles
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href="#" 
                className="inline-block bg-white hover:bg-gray-100 text-red-600 font-bold py-2 px-6 border border-red-600 rounded-lg transition duration-300"
              >
                Ver todos los eventos
              </a>
            </div>
          </div>

          {/* Sección de Certificados */}
          
        </div>
      </section>
    </div>
  );
};

export { Eventos };
export default Eventos;