import React from 'react';
import { MapPin, Phone, Mail, Award, Users, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-essence-pink to-essence-pink-light text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Conoce <span className="from-essence-pink">Essence Smart</span>
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Más que una tienda, somos tu socio de confianza en República Dominicana
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-essence-pink">Essence Smart</strong> nació en 2025 con una visión clara: 
                  democratizar el acceso a productos de alta calidad en República Dominicana. 
                  Fundada por emprendedor dominicano apasionado por la excelencia, 
                  comenzamos como una pequeña tienda especializada en perfumes exclusivos y demás variedad.
                </p>
                <p>
                  Con el tiempo, nuestra pasión por ofrecer lo mejor nos llevó a expandir nuestro catálogo, 
                  incorporando tecnología de vanguardia, electrodomésticos, etc. 
                  
                </p>
                <p>
                  Hoy, <strong className="text-essence-pink">Essence Smart</strong> es reconocida como una  
                  tienda confiable del país, con miles de clientes satisfechos que nos recomiendan 
                  por nuestra autenticidad, servicio excepcional y compromiso con la calidad.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="negocioEssenceSmart.jpg"
                alt="Historia de Essence Smart"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-essence-pink text-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">1+</div>
                <div className="text-sm">Año de experiencia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Liderazgo</h2>
            <p className="text-lg text-gray-600">Conoce a quien está detrás de Essence Smart</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* CEO Photo */}
                <div className="relative h-96 lg:h-auto">
                  <img
                    src="ceoJORGE_EssenceSmart.jpg"
                    alt="CEO de Essence Smart"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
                </div>
                
                {/* CEO Info */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Jorge L. Vásquez</h3>
                    <p className="text-essence-pink font-semibold text-lg">CEO & Fundador</p>
                  </div>
                  
                  <div className="space-y-4 text-gray-600 leading-relaxed mb-6">
                    <p>
                      "Mi visión siempre ha sido crear una empresa que no solo venda productos, 
                      sino que construya relaciones duraderas basadas en la confianza y la calidad."
                    </p>
                    <p>
                      Con más de 15 años de experiencia en retail y comercio internacional, 
                      María Elena ha liderado Essence Smart desde sus inicios, estableciendo 
                      los más altos estándares de calidad y servicio al cliente.
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Award className="w-4 h-4" />
                      <span>Calidad, superación y excelencia</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>1+ años experiencia</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Video Section */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Conoce Nuestro Local</h2>
      <p className="text-lg text-gray-600">Un recorrido por nuestra instalación</p>
    </div>

    {/* Contenedor de video vertical + imagen */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-3xl mx-auto">
      {/* Video vertical (simplificado) */}
      <div className="aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl mx-auto">
        <video
          src="/videoEssence.mp4"
          controls
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Imagen del mismo tamaño */}
      <div className="aspect-[9/16] bg-gray-200 rounded-2xl overflow-hidden shadow-2xl mx-auto">
        <img
          src="clienteEssence.jpg"
          alt="Foto Essence Smart"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Descripción */}
    <div className="mt-8 text-center">
      <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
        Nuestro negocio está diseñado para ofrecerte una experiencia de compra excepcional.
        Un área apta para cada categoría de productos y un personal
        listo para ayudarte a encontrar lo que buscas.
      </p>
    </div>
  </div>
</section>


      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
            <p className="text-lg text-gray-600">Los principios que guían cada decisión que tomamos</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-essence-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-essence-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pasión por la Calidad</h3>
              <p className="text-gray-600">
                Cada producto que ofrecemos refleja nuestro compromiso  con la excelencia y la autenticidad.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-essence-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-essence-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cliente Primero</h3>
              <p className="text-gray-600">
                Tu satisfacción es nuestra prioridad. Trabajamos para superar tus expectativas.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-essence-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-essence-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovación Constante</h3>
              <p className="text-gray-600">
                Siempre buscamos nuevas formas de mejorar tu experiencia de compra y ofrecerte lo último del mercado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-essence-pink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visítanos</h2>
            <p className="text-xl text-gray-100">Te esperamos en Essence Smart!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">Ubicación</h3>
              <p className="text-gray-100">
                Calle Principal Jamo, al lado de Camu Gas<br />
                La Vega<br />
                República Dominicana
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">Teléfono</h3>
              <p className="text-gray-100">
                WhatsApp:<br />
                 +1 (829) 439-6607
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-100">
                essencesmart02@gmail.com<br />
                
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg mb-6">Horarios de Atención</p>
            <div className="bg-white/10 rounded-lg p-6 max-w-md mx-auto">
              <div className="space-y-2 text-gray-100">
                <div className="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados:</span>
                  <span>9:00 AM - 12:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos:</span>
                  <span>No laborable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;