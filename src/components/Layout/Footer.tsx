import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* Logo circular */}
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="/Logo_EssenceSmartBLANCO.png"
                  alt="Logo Essence Smart"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold">
                Essence <span className="text-essence-pink">Smart</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Tu tienda de confianza en República Dominicana. Perfumes, tecnología, 
              electrodomésticos y relojes de las mejores marcas.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/17W7vMpbZG/" className="text-gray-400 hover:text-essence-pink transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/essencesmart02?igsh=enlxZGx1bWs2Z2ty " className="text-gray-400 hover:text-essence-pink transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/c/18294396607" className="text-gray-400 hover:text-essence-pink transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=perfumes" className="text-gray-300 hover:text-white transition-colors">
                  Perfumes
                </Link>
              </li>
              <li>
                <Link to="/products?category=tecnologia" className="text-gray-300 hover:text-white transition-colors">
                  Tecnología
                </Link>
              </li>
              <li>
                <Link to="/products?category=electrodomesticos" className="text-gray-300 hover:text-white transition-colors">
                  Electrodomésticos
                </Link>
              </li>
              <li>
                <Link to="/products?category=relojes" className="text-gray-300 hover:text-white transition-colors">
                  Celulares
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-essence-pink" />
                <span className="text-gray-300 text-sm">+1 (829) 439-6607</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-essence-pink" />
                <span className="text-gray-300 text-sm">essencesmart02@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-essence-pink mt-1" />
                <span className="text-gray-300 text-sm">
                  Calle Principal Jamo, al lado de Camu Gas,<br />
                  La Vega, República Dominicana
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Essence Smart. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
