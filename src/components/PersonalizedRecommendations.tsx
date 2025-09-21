import React, { useMemo, useEffect, useState } from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { getProducts } from '../data/products';
import ProductCard from './ProductCard';

const PersonalizedRecommendations: React.FC = () => {
  const { user } = useAuth();
  const { orders, favorites } = useApp();
  const [products, setProducts] = useState(getProducts());

  // Update products when localStorage changes
  useEffect(() => {
    const currentProducts = getProducts();
    setProducts(currentProducts);
  }, []);

  const recommendations = useMemo(() => {
    if (!user) return [];

    // Ensure we have products
    if (products.length === 0) return [];

    // Get user's purchase history
    const purchasedCategories = orders.flatMap(order => 
      order.items.map(item => item.product.category)
    );

    // Get user's favorite categories
    const favoriteProducts = products.filter(p => favorites.includes(p.id));
    const favoriteCategories = favoriteProducts.map(p => p.category);

    // Combine and count category preferences
    const allCategories = [...purchasedCategories, ...favoriteCategories];
    const categoryCount = allCategories.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get top preferred categories
    const topCategories = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([category]) => category);

    // Get purchased product IDs to exclude
    const purchasedProductIds = orders.flatMap(order => 
      order.items.map(item => item.product.id)
    );

    // Find recommendations based on preferences
    let recommended = products.filter(product => 
      topCategories.includes(product.category) && 
      !purchasedProductIds.includes(product.id) &&
      !favorites.includes(product.id)
    );

    // If no category preferences, recommend featured products
    if (recommended.length === 0) {
      recommended = products.filter(product => 
        product.featured && 
        !purchasedProductIds.includes(product.id) &&
        !favorites.includes(product.id)
      );
    }

    // Limit to 4 recommendations
    return recommended.slice(0, 4);
  }, [user, orders, favorites, products]);

  if (!user || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-essence-pink/5 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            
            <h2 className="text-3xl font-bold text-gray-900">Recomendado para Ti</h2>
          </div>
          <p className="text-lg text-gray-600">
            Basado en tus compras anteriores y productos favoritos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map(product => (
            <div key={product.id} className="relative">
              <div className="absolute -top-2 -right-2 bg-essence-pink text-white px-2 py-1 rounded-full text-xs font-medium z-10 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                Para Ti
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalizedRecommendations;