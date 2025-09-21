import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Search, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import NotificationSystem from '../NotificationSystem';







const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart, favorites } = useApp();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="/Logo_EssenceSmartBLANCO.png"
                  alt="Logo Essence Smart"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Essence <span className="text-essence-pink">Smart</span>
              </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-essence-pink transition-colors">
              Inicio
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-essence-pink transition-colors">
              Productos
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-essence-pink transition-colors">
              Nosotros
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-gray-600 hover:text-essence-pink transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <NotificationSystem />

            {/* Admin Dashboard */}
            {user?.isAdmin && (
              <Link
                to="/admin"
                className="p-2 text-gray-600 hover:text-essence-pink transition-colors"
                title="Panel Administrativo"
              >
                <BarChart3 className="w-5 h-5" />
              </Link>
            )}

            {/* Favorites */}
            {user && (
              <Link
                to="/favorites"
                className="relative p-2 text-gray-600 hover:text-essence-pink transition-colors"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-essence-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>
            )}

            {/* Cart */}
            {user && (
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-essence-pink transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-essence-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            )}

            {/* User Menu */}
            <div className="relative">
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="hidden sm:block text-sm text-gray-700">{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-essence-pink transition-colors"
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center space-x-2 bg-essence-pink text-white px-4 py-2 rounded-lg hover:bg-essence-pink-dark transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Ingresar</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-essence-pink transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-essence-pink transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-essence-pink transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-essence-pink transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              {user?.isAdmin && (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-essence-pink transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Panel Admin
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;