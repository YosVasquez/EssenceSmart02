import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, MessageCircle, Package } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Pedido Enviado Exitosamente!
        </h1>
        
        {orderId && (
          <p className="text-lg text-gray-600 mb-6">
            Tu pedido <span className="font-semibold text-essence-pink">#{orderId}</span> ha sido enviado por WhatsApp
          </p>
        )}
        
        <div className="bg-essence-pink/10 rounded-xl p-6 mb-8">
          <MessageCircle className="w-12 h-12 text-essence-pink mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">¿Qué sigue?</h2>
          <div className="text-gray-600 space-y-2">
            <p>1. Nuestro equipo revisará tu pedido</p>
            <p>2. Te contactaremos para confirmar los detalles</p>
            <p>3. Coordinaremos la entrega o recogida</p>
            <p>4. ¡Disfruta tus productos Essence Smart!</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/orders"
            className="bg-essence-pink text-white px-6 py-3 rounded-lg hover:bg-essence-pink-dark transition-colors flex items-center justify-center"
          >
            <Package className="w-5 h-5 mr-2" />
            Ver Mis Pedidos
          </Link>
          <Link
            to="/products"
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Seguir Comprando
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>¿Tienes preguntas? Contáctanos al +1 (829) 439-6607</p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;