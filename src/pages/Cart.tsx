import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';

const Cart: React.FC = () => {
  const { user } = useAuth();
  const { cart, updateCartQuantity, removeFromCart, clearCart, placeOrder } = useApp();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    email: user?.email || '',
    deliveryNotes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('efectivo');

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Inicia sesión para ver tu carrito</h2>
        <Link
          to="/auth"
          className="bg-essence-pink text-white px-6 py-3 rounded-lg hover:bg-essence-pink-dark transition-colors"
        >
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-8">¡Descubre nuestros increíbles productos!</p>
        <Link
          to="/products"
          className="bg-essence-pink text-white px-6 py-3 rounded-lg hover:bg-essence-pink-dark transition-colors"
        >
          Explorar Productos
        </Link>
      </div>
    );
  }

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const itbis = subtotal * 0.18; // 18% ITBIS República Dominicana
  const total = subtotal + itbis;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartQuantity(productId, newQuantity);
  };

  const handleCheckout = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Por favor completa toda la información requerida');
      return;
    }

    setIsProcessing(true);

    try {
      // Crear la orden
      const orderId = placeOrder({
        userId: user.id,
        items: cart,
        subtotal,
        itbis,
        total,
        customerInfo,
        paymentMethod,
        status: 'pending'
      });

      // Preparar mensaje para WhatsApp
      const whatsappMessage = generateWhatsAppMessage(orderId);

      // ✅ Detectar si es móvil o escritorio
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const baseUrl = isMobile
        ? "https://api.whatsapp.com/send"
        : "https://web.whatsapp.com/send";

      // ✅ Construir URL correcta según el dispositivo
      const whatsappUrl = `${baseUrl}?phone=18294396607&text=${encodeURIComponent(whatsappMessage)}`;

      // ✅ Abrir WhatsApp directo
      window.location.href = whatsappUrl;

      // Limpiar carrito después de enviar
      clearCart();

      // Redirigir a página de confirmación
      navigate('/order-confirmation', { state: { orderId } });
    } catch {
      alert('Error al procesar el pedido. Intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const generateWhatsAppMessage = (orderId: string) => {
    let message = `🛍️ *NUEVO PEDIDO - ESSENCE SMART*\n\n`;
    message += `📋 *Orden #:* ${orderId}\n`;
    message += `👤 *Cliente:* ${customerInfo.name}\n`;
    message += `📞 *Teléfono:* ${customerInfo.phone}\n`;
    message += `📧 *Email:* ${customerInfo.email}\n`;
    message += `📍 *Dirección:* ${customerInfo.address}\n`;
    if (customerInfo.deliveryNotes) {
      message += `📝 *Notas:* ${customerInfo.deliveryNotes}\n`;
    }
    message += `💳 *Método de Pago:* ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}\n\n`;

    message += `🛒 *PRODUCTOS:*\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio: RD$${item.product.price.toLocaleString()}\n`;
      message += `   Subtotal: RD$${(item.product.price * item.quantity).toLocaleString()}\n\n`;
    });

    message += `💰 *RESUMEN:*\n`;
    message += `Subtotal: RD$${subtotal.toLocaleString()}\n`;
    message += `ITBIS (18%): RD$${itbis.toLocaleString()}\n`;
    message += `*TOTAL: RD$${total.toLocaleString()}*\n\n`;
    message += `¡Gracias por elegir Essence Smart! 🌟`;

    return message;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <Link
          to="/products"
          className="flex items-center text-essence-pink hover:text-essence-pink-dark transition-colors mr-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Seguir Comprando
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Mi Carrito</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                  {item.product.brand && (
                    <p className="text-sm text-gray-500">{item.product.brand}</p>
                  )}
                  <p className="text-lg font-bold text-essence-pink">
                    RD${item.product.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            Vaciar Carrito
          </button>
        </div>

        {/* Checkout Form */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Información de Entrega</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección de Entrega *
                </label>
                <textarea
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent resize-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas de Entrega (Opcional)
                </label>
                <textarea
                  value={customerInfo.deliveryNotes}
                  onChange={(e) => setCustomerInfo({...customerInfo, deliveryNotes: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent resize-none"
                  placeholder="Instrucciones especiales..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Método de Pago
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent"
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="transferencia">Transferencia Bancaria</option>
                  <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                </select>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del Pedido</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>RD${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ITBIS (18%):</span>
                <span>RD${itbis.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-essence-pink">RD${total.toLocaleString()}</span>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full mt-6 bg-essence-pink text-white py-3 rounded-lg font-semibold hover:bg-essence-pink-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                'Procesando...'
              ) : (
                <>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Finalizar Pedido por WhatsApp
                </>
              )}
            </button>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              Al finalizar, serás redirigido a WhatsApp para confirmar tu pedido
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
