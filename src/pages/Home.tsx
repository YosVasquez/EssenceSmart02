import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import { getProducts } from '../data/products';

const Home: React.FC = () => {
  const [products, setProducts] = useState(getProducts());

  // Update products when localStorage changes
  useEffect(() => {
    const currentProducts = getProducts();
    setProducts(currentProducts);
  }, []);

  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-essence-pink to-essence-pink-light text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Bienvenido a <span className=" from-essence-pink">Essence Smart</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Descubre los mejores productos: perfumes exclusivos, tecnología de vanguardia, 
                electrodomésticos inteligentes y mucho más. Todo en un solo lugar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="bg-white text-essence-pink px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center group"
                >
                  Explorar Productos
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-essence-pink transition-colors flex items-center justify-center"
                >
                  Conoce Más
                </Link>
              </div>
            </div>
            <div className="animate-bounce-gentle">
              <img
                src="Logo_EssenceSmartBLANCO.png"
                alt="Productos Essence Smart"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir Essence Smart?</h2>
            <p className="text-lg text-gray-600">Comprometidos con tu satisfacción y confianza</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-essence-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-essence-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad Premium</h3>
              <p className="text-gray-600">Solo productos de las mejores marcas del mercado</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-essence-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-essence-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Envíos a todo el país con la mayor rapidez y seguridad</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-essence-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-essence-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantía Total</h3>
              <p className="text-gray-600">Garantía nuestros productos</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-essence-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-essence-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Atención al cliente</h3>
              <p className="text-gray-600">Atención al cliente disponible cuando lo necesites</p>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      <PersonalizedRecommendations />

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Productos Destacados</h2>
            <p className="text-lg text-gray-600">Los favoritos de nuestros clientes</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/products"
              className="bg-essence-pink text-white px-8 py-3 rounded-full font-semibold hover:bg-essence-pink-dark transition-colors inline-flex items-center group"
            >
              Iniciar Sesión
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestras Categorías</h2>
            <p className="text-lg text-gray-600">Encuentra exactamente lo que buscas</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/products?category=perfumes"
              className="group relative h-48 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white">
                <span className="text-4xl mb-2"></span>
                <h3 className="text-xl font-bold">Perfumes</h3>
                <p className="text-sm opacity-90">Fragancias exclusivas</p>
              </div>
            </Link>
            
            <Link
              to="/products?category=tecnologia"
              className="group relative h-48 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white">
                <span className="text-4xl mb-2"></span>
                <h3 className="text-xl font-bold">Tecnología</h3>
                <p className="text-sm opacity-90">Lo último en tech</p>
              </div>
            </Link>
            
            <Link
              to="/products?category=electrodomesticos"
              className="group relative h-48 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white">
                <span className="text-4xl mb-2"></span>
                <h3 className="text-xl font-bold">Electrodomésticos</h3>
                <p className="text-sm opacity-90">Para tu hogar</p>
              </div>
            </Link>
            
            <Link
              to="/products?category=relojes"
              className="group relative h-48 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white">
                <span className="text-4xl mb-2"></span>
                <h3 className="text-xl font-bold">Celulares</h3>
                <p className="text-sm opacity-90">Inteligencia y funcionalidad</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-essence-pink text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comprar con nosotros?</h2>
          <p className="text-xl mb-8 text-gray-100">
            Únete a miles de clientes satisfechos que confían en Essence Smart
          </p>
          <Link
            to="/auth"
            className="bg-white text-essence-pink px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center group"
          >
            Crear Cuenta Gratis
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;