import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { getProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const Favorites: React.FC = () => {
  const { user } = useAuth();
  const { favorites } = useApp();
  const products = getProducts();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Inicia sesión para ver tus favoritos</h2>
        <Link
          to="/auth"
          className="bg-essence-pink text-white px-6 py-3 rounded-lg hover:bg-essence-pink-dark transition-colors"
        >
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No tienes productos favoritos</h2>
        <p className="text-gray-600 mb-8">¡Explora nuestros productos y guarda tus favoritos!</p>
        <Link
          to="/products"
          className="bg-essence-pink text-white px-6 py-3 rounded-lg hover:bg-essence-pink-dark transition-colors"
        >
          Explorar Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mis Favoritos</h1>
        <p className="text-lg text-gray-600">
          Tienes {favoriteProducts.length} producto{favoriteProducts.length !== 1 ? 's' : ''} en tu lista de favoritos
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;