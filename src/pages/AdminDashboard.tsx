import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  ShoppingCart,
  Calendar,
  Filter
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Order, Product } from '../types';
import ProductManagement from '../components/admin/ProductManagement';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  averageOrderValue: number;
  topProducts: Array<{
    product: Product;
    quantity: number;
    revenue: number;
  }>;
  recentOrders: Order[];
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
  }>;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    averageOrderValue: 0,
    topProducts: [],
    recentOrders: [],
    monthlyRevenue: []
  });
  const [timeFilter, setTimeFilter] = useState('all');

  useEffect(() => {
    if (user?.isAdmin) {
      loadDashboardData();
    }
  }, [user, timeFilter]);

  const loadDashboardData = () => {
    // Load all orders
    let allOrders: Order[] = [];
    try {
      allOrders = JSON.parse(localStorage.getItem('essence_all_orders') || '[]');
    } catch (error) {
      console.error('Error loading orders:', error);
      allOrders = [];
    }
    
    // Load all users
    // (Removed unused allUsers variable)

    // Load products

    // Filter orders by time period
    const filteredOrders = filterOrdersByTime(allOrders, timeFilter);

    // Calculate stats
    const totalOrders = filteredOrders.length;
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const totalCustomers = new Set(filteredOrders.map(order => order.userId)).size;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Calculate top products
    const productSales = new Map();
    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        const key = item.product.id;
        if (productSales.has(key)) {
          const existing = productSales.get(key);
          productSales.set(key, {
            product: item.product,
            quantity: existing.quantity + item.quantity,
            revenue: existing.revenue + (item.product.price * item.quantity)
          });
        } else {
          productSales.set(key, {
            product: item.product,
            quantity: item.quantity,
            revenue: item.product.price * item.quantity
          });
        }
      });
    });

    const topProducts = Array.from(productSales.values())
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    // Get recent orders
    const recentOrders = allOrders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    // Calculate monthly revenue
    const monthlyRevenue = calculateMonthlyRevenue(allOrders);

    setStats({
      totalOrders,
      totalRevenue,
      totalCustomers,
      averageOrderValue,
      topProducts,
      recentOrders,
      monthlyRevenue
    });
  };

  const filterOrdersByTime = (orders: Order[], filter: string) => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (filter) {
      case 'today':
        return orders.filter(order => new Date(order.createdAt) >= startOfDay);
      case 'week': {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return orders.filter(order => new Date(order.createdAt) >= weekAgo);
      }
      case 'month': {
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return orders.filter(order => new Date(order.createdAt) >= monthAgo);
      }
      default:
        return orders;
    }
  };

  const calculateMonthlyRevenue = (orders: Order[]) => {
    const monthlyData = new Map();
    
    orders.forEach(order => {
      const date = new Date(order.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
      
      if (monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, {
          month: monthName,
          revenue: monthlyData.get(monthKey).revenue + order.total
        });
      } else {
        monthlyData.set(monthKey, {
          month: monthName,
          revenue: order.total
        });
      }
    });

    return Array.from(monthlyData.values()).slice(-6);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleProductsChange = () => {
    // Reload dashboard data when products change
    loadDashboardData();
  };

  if (!user?.isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Acceso Denegado</h2>
          <p className="text-red-600">No tienes permisos para acceder al panel administrativo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <BarChart3 className="w-8 h-8 mr-3 text-essence-pink" />
          Dashboard Administrativo
        </h1>
        <p className="text-lg text-gray-600 mt-2">Panel de control de Essence Smart</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'dashboard'
                ? 'border-essence-pink text-essence-pink'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'products'
                ? 'border-essence-pink text-essence-pink'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Package className="w-4 h-4 inline mr-2" />
            Gestión de Productos
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && (
        <>
          <div className="flex items-center justify-end mb-6">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent"
              >
                <option value="all">Todo el tiempo</option>
                <option value="today">Hoy</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-essence-pink/10 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-essence-pink" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                  <p className="text-3xl font-bold text-gray-900">RD${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-essence-pink/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-essence-pink" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clientes Únicos</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
                </div>
                <div className="w-12 h-12 bg-essence-pink/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-essence-pink" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Valor Promedio</p>
                  <p className="text-3xl font-bold text-gray-900">RD${Math.round(stats.averageOrderValue).toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-essence-pink/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-essence-pink" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Products */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Package className="w-5 h-5 mr-2 text-essence-pink" />
                Productos Más Vendidos
              </h3>
              <div className="space-y-4">
                {stats.topProducts.map((item, index) => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-essence-pink/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-essence-pink">#{index + 1}</span>
                    </div>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} vendidos • RD${item.revenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Revenue Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-essence-pink" />
                Ingresos Mensuales
              </h3>
              <div className="space-y-4">
                {stats.monthlyRevenue.map((month, index) => {
                  const maxRevenue = Math.max(...stats.monthlyRevenue.map(m => m.revenue));
                  const percentage = maxRevenue > 0 ? (month.revenue / maxRevenue) * 100 : 0;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{month.month}</span>
                        <span className="text-essence-pink font-bold">
                          RD${month.revenue.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-essence-pink h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-essence-pink" />
                Pedidos Recientes
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                        <div className="text-sm text-gray-500">
                          {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customerInfo.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customerInfo.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-essence-pink">
                          RD${order.total.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status === 'pending' ? 'Pendiente' : 
                           order.status === 'processing' ? 'Procesando' :
                           order.status === 'completed' ? 'Completado' : 'Cancelado'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'products' && (
        <ProductManagement onProductsChange={handleProductsChange} />
      )}
    </div>
  );
};

export default AdminDashboard;