import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, CreditCard, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { orders } = useApp();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Inicia sesión para ver tus pedidos</h2>
        <Link
          to="/auth"
          className="bg-essence-pink text-white px-6 py-3 rounded-lg hover:bg-essence-pink-dark transition-colors"
        >
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No tienes pedidos aún</h2>
        <p className="text-gray-600 mb-8">¡Realiza tu primera compra y aparecerá aquí!</p>
        <Link
          to="/products"
          className="bg-essence-pink text-white px-6 py-3 rounded-lg hover:bg-essence-pink-dark transition-colors"
        >
          Explorar Productos
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'processing': return 'Procesando';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mis Pedidos</h1>
        <p className="text-lg text-gray-600">
          Historial completo de tus compras en Essence Smart
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Order Header */}
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4">
                  <Package className="w-6 h-6 text-essence-pink" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Pedido #{order.id}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-1" />
                        {order.paymentMethod}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Products */}
                <div className="lg:col-span-2">
                  <h4 className="font-semibold text-gray-900 mb-4">Productos</h4>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{item.product.name}</h5>
                          {item.product.brand && (
                            <p className="text-sm text-gray-500">{item.product.brand}</p>
                          )}
                          <p className="text-sm text-gray-600">
                            Cantidad: {item.quantity} × RD${item.product.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-essence-pink">
                            RD${(item.product.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary & Delivery Info */}
                <div className="space-y-6">
                  {/* Delivery Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Información de Entrega
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 text-sm">
                      <p className="font-medium">{order.customerInfo.name}</p>
                      <p className="text-gray-600">{order.customerInfo.phone}</p>
                      <p className="text-gray-600">{order.customerInfo.address}</p>
                    </div>
                  </div>

                  {/* Order Total */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Resumen</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>RD${order.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ITBIS (18%):</span>
                        <span>RD${order.itbis.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-essence-pink">RD${order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;