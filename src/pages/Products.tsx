import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Grid, List, BarChart3, GitCompare } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import AdvancedSearch, { SearchFilters } from '../components/AdvancedSearch';
import ProductComparison from '../components/ProductComparison';
import { getProducts, categories } from '../data/products';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(getProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<SearchFilters | null>(null);

  // Reload products when localStorage changes (for admin updates)
  useEffect(() => {
    const handleStorageChange = () => {
      setProducts(getProducts());
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(() => {
      const currentProducts = getProducts();
      if (currentProducts.length !== products.length || 
          JSON.stringify(currentProducts) !== JSON.stringify(products)) {
        setProducts(currentProducts);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply advanced filters if available
    if (advancedFilters) {
      if (advancedFilters.searchTerm) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(advancedFilters.searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(advancedFilters.searchTerm.toLowerCase()) ||
          product.brand?.toLowerCase().includes(advancedFilters.searchTerm.toLowerCase())
        );
      }

      if (advancedFilters.category) {
        filtered = filtered.filter(product => product.category === advancedFilters.category);
      }

      if (advancedFilters.brand) {
        filtered = filtered.filter(product => product.brand === advancedFilters.brand);
      }

      if (advancedFilters.minPrice > 0 || advancedFilters.maxPrice < 500000) {
        filtered = filtered.filter(product => 
          product.price >= advancedFilters.minPrice && product.price <= advancedFilters.maxPrice
        );
      }

      if (advancedFilters.inStock !== null) {
        filtered = filtered.filter(product => product.inStock === advancedFilters.inStock);
      }

      if (advancedFilters.featured !== null) {
        filtered = filtered.filter(product => product.featured === advancedFilters.featured);
      }
    } else {
      // Apply basic filters
      if (searchTerm) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'brand':
          return (a.brand || '').localeCompare(b.brand || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy, advancedFilters]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  const handleAdvancedSearch = (filters: SearchFilters) => {
    setAdvancedFilters(filters);
    setSearchTerm(''); // Clear basic search when using advanced
    setSelectedCategory(''); // Clear basic category when using advanced
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setAdvancedFilters(null);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Productos</h1>
        <p className="text-lg text-gray-600">
          Descubre nuestra amplia selección de productos de alta calidad
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Basic Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent"
              disabled={!!advancedFilters}
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent"
            disabled={!!advancedFilters}
          >
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent"
          >
            <option value="name">Ordenar por nombre</option>
            <option value="price-low">Precio: menor a mayor</option>
            <option value="price-high">Precio: mayor a menor</option>
            <option value="brand">Ordenar por marca</option>
          </select>

          {/* Advanced Search Button */}
          <button
            onClick={() => setShowAdvancedSearch(true)}
            className="flex items-center space-x-2 bg-essence-pink text-white px-4 py-2 rounded-lg hover:bg-essence-pink-dark transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Búsqueda Avanzada</span>
          </button>

          {/* Product Comparison Button */}
          <button
            onClick={() => setShowComparison(true)}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <GitCompare className="w-4 h-4" />
            <span>Comparar</span>
          </button>

          {/* View Mode */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-essence-pink text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-essence-pink text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {(advancedFilters || selectedCategory || searchTerm) && (
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm text-gray-600">Filtros activos:</span>
            {advancedFilters && (
              <span className="bg-essence-pink/10 text-essence-pink px-2 py-1 rounded-full text-xs">
                Búsqueda Avanzada
              </span>
            )}
            {selectedCategory && !advancedFilters && (
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                {categories.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
            {searchTerm && !advancedFilters && (
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                "{searchTerm}"
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-red-600 hover:text-red-800 underline"
            >
              Limpiar todos
            </button>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Mostrando {filteredAndSortedProducts.length} productos
        </p>
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
          <p className="text-gray-600 mb-4">
            Intenta ajustar tus filtros o términos de búsqueda
          </p>
          <button
            onClick={clearAllFilters}
            className="bg-essence-pink text-white px-6 py-2 rounded-lg hover:bg-essence-pink-dark transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Advanced Search Modal */}
      <AdvancedSearch
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        onSearch={handleAdvancedSearch}
      />

      {/* Product Comparison Modal */}
      <ProductComparison
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />
    </div>
  );
};

export default Products;