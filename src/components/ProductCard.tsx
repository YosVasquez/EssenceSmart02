import React, { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Star, Eye, X } from 'lucide-react';
import { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { getProducts } from '../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product: initialProduct }) => {
  const { user } = useAuth();
  const { addToCart, toggleFavorite, favorites } = useApp();
  const [product, setProduct] = useState(initialProduct);
  const [showImageModal, setShowImageModal] = useState(false);
  
  // Update product data when localStorage changes
  useEffect(() => {
    try {
      const currentProducts = getProducts();
      const updatedProduct = currentProducts.find(p => p.id === initialProduct.id);
      if (updatedProduct && JSON.stringify(updatedProduct) !== JSON.stringify(product)) {
        setProduct(updatedProduct);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }, [initialProduct.id, product]);
  
  const isFavorite = favorites.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      addToCart(product);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      toggleFavorite(product.id);
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowImageModal(true);
  };
  return (
    <>
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="block">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={handleImageClick}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg';
            }}
          />
          
          {/* View Image Button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-full p-3">
              <Eye className="w-6 h-6 text-gray-800" />
            </div>
          </div>
          
          {/* Stock badge */}
          {!product.inStock && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Agotado
            </div>
          )}
          
          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-3 right-3 bg-essence-pink text-white px-2 py-1 rounded-full text-xs font-medium">
              Destacado
            </div>
          )}

          {/* Action buttons */}
          {user && (
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleToggleFavorite}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite 
                    ? 'bg-essence-pink text-white' 
                    : 'bg-white text-gray-600 hover:text-essence-pink'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Brand */}
          {product.brand && (
            <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">
              {product.brand}
            </p>
          )}
          
          {/* Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-essence-pink transition-colors">
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-essence-pink fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">(4.8)</span>
          </div>

          {/* Price and actions */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-essence-pink">
                RD${product.price.toLocaleString()}
              </span>
            </div>
            
            {user && product.inStock && (
              <button
                onClick={handleAddToCart}
                className="bg-essence-pink text-white p-2 rounded-full hover:bg-essence-pink-dark transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Image Modal */}
    {showImageModal && (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
        <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg';
            }}
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-1">{product.name}</h3>
            {product.brand && <p className="text-sm opacity-90 mb-2">{product.brand}</p>}
            <p className="text-sm opacity-90">{product.description}</p>
            <p className="text-lg font-bold text-essence-pink-light mt-2">
              RD${product.price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default ProductCard;