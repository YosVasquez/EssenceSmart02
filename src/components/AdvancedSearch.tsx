import React, { useState } from 'react';
import { Search, Filter, X, Star } from 'lucide-react';
import { Product } from '../types';
import { categories } from '../data/products';

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  searchTerm: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  brand: string;
  inStock: boolean | null;
  featured: boolean | null;
  minRating: number;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ isOpen, onClose, onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    category: '',
    minPrice: 0,
    maxPrice: 500000,
    brand: '',
    inStock: null,
    featured: null,
    minRating: 0
  });

  const brands = ['Apple', 'Samsung', 'LG', 'Chanel', 'Dior', 'Versace', 'Rolex', 'Casio', 'Whirlpool', 'Carrier'];

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      category: '',
      minPrice: 0,
      maxPrice: 500000,
      brand: '',
      inStock: null,
      featured: null,
      minRating: 0
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Filter className="w-6 h-6 mr-2 text-essence-pink" />
            Búsqueda Avanzada
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Term */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Término de Búsqueda
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                placeholder="Buscar productos..."
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent"
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rango de Precio (RD$)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                  placeholder="Precio mínimo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                  placeholder="Precio máximo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marca
            </label>
            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent"
            >
              <option value="">Todas las marcas</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disponibilidad
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="availability"
                  checked={filters.inStock === null}
                  onChange={() => handleFilterChange('inStock', null)}
                  className="mr-2 text-essence-pink focus:ring-essence-pink"
                />
                Todos los productos
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="availability"
                  checked={filters.inStock === true}
                  onChange={() => handleFilterChange('inStock', true)}
                  className="mr-2 text-essence-pink focus:ring-essence-pink"
                />
                Solo en stock
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="availability"
                  checked={filters.inStock === false}
                  onChange={() => handleFilterChange('inStock', false)}
                  className="mr-2 text-essence-pink focus:ring-essence-pink"
                />
                Solo agotados
              </label>
            </div>
          </div>

          {/* Featured */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.featured === true}
                onChange={(e) => handleFilterChange('featured', e.target.checked ? true : null)}
                className="mr-2 text-essence-pink focus:ring-essence-pink"
              />
              Solo productos destacados
            </label>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calificación Mínima
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  onClick={() => handleFilterChange('minRating', rating)}
                  className={`p-1 ${filters.minRating >= rating ? 'text-essence-pink' : 'text-gray-300'}`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
              <span className="text-sm text-gray-600 ml-2">
                {filters.minRating > 0 ? `${filters.minRating}+ estrellas` : 'Cualquier calificación'}
              </span>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t p-6 flex space-x-4">
          <button
            onClick={clearFilters}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Limpiar Filtros
          </button>
          <button
            onClick={handleSearch}
            className="flex-1 bg-essence-pink text-white py-3 rounded-lg hover:bg-essence-pink-dark transition-colors"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;