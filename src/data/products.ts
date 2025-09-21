import { Product } from '../types';

// Función para obtener productos (desde localStorage o por defecto)
export const getProducts = (): Product[] => {
  try {
    const savedProducts = localStorage.getItem('essence_products');
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      return Array.isArray(parsed) ? parsed : defaultProducts;
    }
  } catch {
    // Si hay error de cuota de localStorage, intentar limpiar y usar productos por defecto
    console.warn('LocalStorage lleno o error, optimizando espacio y usando productos por defecto');
    try {
      // Intentar limpiar datos antiguos para hacer espacio
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('temp_') || key.startsWith('cache_')) {
          localStorage.removeItem(key);
        }
      });
    } catch {
      console.warn('Error en limpieza de localStorage');
    }
    return defaultProducts;
  }
  
  // Si no hay productos guardados o hay error, usar los productos por defecto
  try {
    localStorage.setItem('essence_products', JSON.stringify(defaultProducts));
  } catch {
    // Si no se pueden guardar, continuar con productos por defecto
    console.warn('No se pudieron guardar productos por defecto');
  }
  return defaultProducts;
};

// Productos por defecto
const defaultProducts: Product[] = [
  // Perfumes
  {
    id: 'p1',
    name: 'Perfume Chanel No. 5',
    price: 8500,
    image: 'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg',
    category: 'perfumes',
    description: 'Icónico perfume femenino con notas florales elegantes',
    inStock: true,
    featured: true,
    brand: 'Chanel'
  },
  {
    id: 'p2',
    name: 'Perfume Dior Sauvage',
    price: 7200,
    image: 'https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg',
    category: 'perfumes',
    description: 'Fragancia masculina fresca y sofisticada',
    inStock: true,
    featured: true,
    brand: 'Dior'
  },
  {
    id: 'p3',
    name: 'Perfume Versace Eros',
    price: 6800,
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
    category: 'perfumes',
    description: 'Perfume masculino seductor y vibrante',
    inStock: true,
    brand: 'Versace'
  },
  
  // Tecnología
  {
    id: 't1',
    name: 'iPhone 15 Pro Max',
    price: 85000,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
    category: 'tecnologia',
    description: 'El último iPhone con cámara profesional y chip A17 Pro',
    inStock: true,
    featured: true,
    brand: 'Apple'
  },
  {
    id: 't2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 78000,
    image: 'https://images.pexels.com/photos/1034649/pexels-photo-1034649.jpeg',
    category: 'tecnologia',
    description: 'Smartphone Android premium con S Pen incluido',
    inStock: true,
    featured: true,
    brand: 'Samsung'
  },
  {
    id: 't3',
    name: 'MacBook Pro 14"',
    price: 125000,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    category: 'tecnologia',
    description: 'Laptop profesional con chip M3 Pro para máximo rendimiento',
    inStock: true,
    brand: 'Apple'
  },
  {
    id: 't4',
    name: 'Smart TV Samsung 55"',
    price: 45000,
    image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg',
    category: 'tecnologia',
    description: 'Televisión 4K UHD con tecnología QLED',
    inStock: true,
    brand: 'Samsung'
  },

  // Electrodomésticos
  {
    id: 'e1',
    name: 'Refrigerador LG 18 pies',
    price: 65000,
    image: 'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg',
    category: 'electrodomesticos',
    description: 'Refrigerador de dos puertas con dispensador de agua',
    inStock: true,
    featured: true,
    brand: 'LG'
  },
  {
    id: 'e2',
    name: 'Lavadora Whirlpool 17kg',
    price: 35000,
    image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg',
    category: 'electrodomesticos',
    description: 'Lavadora automática de carga superior',
    inStock: true,
    brand: 'Whirlpool'
  },
  {
    id: 'e3',
    name: 'Aire Acondicionado Inverter 12000 BTU',
    price: 28000,
    image: 'https://images.pexels.com/photos/1638298/pexels-photo-1638298.jpeg',
    category: 'electrodomesticos',
    description: 'Aire acondicionado inverter eficiente y silencioso',
    inStock: true,
    brand: 'Carrier'
  },

  // Relojes
  {
    id: 'r1',
    name: 'Apple Watch Series 9',
    price: 32000,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    category: 'relojes',
    description: 'Smartwatch con GPS y monitor de salud avanzado',
    inStock: true,
    featured: true,
    brand: 'Apple'
  },
  {
    id: 'r2',
    name: 'Rolex Submariner',
    price: 450000,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
    category: 'relojes',
    description: 'Reloj de lujo suizo resistente al agua',
    inStock: true,
    brand: 'Rolex'
  },
  {
    id: 'r3',
    name: 'Casio G-Shock',
    price: 8500,
    image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg',
    category: 'relojes',
    description: 'Reloj deportivo resistente a golpes',
    inStock: true,
    brand: 'Casio'
  }
];

export const categories = [
  { id: 'perfumes', name: 'Perfumes', icon: '🌸' },
  { id: 'tecnologia', name: 'Tecnología', icon: '📱' },
  { id: 'electrodomesticos', name: 'Electrodomésticos', icon: '🏠' },
  { id: 'Celulares', name: 'Celulares', icon: '⌚' }
];