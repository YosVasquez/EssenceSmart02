export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'perfumes' | 'tecnologia' | 'electrodomesticos' | 'relojes';
  description: string;
  inStock: boolean;
  featured?: boolean;
  brand?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  itbis: number;
  total: number;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    email: string;
  };
  paymentMethod: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'isAdmin'>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

export interface AppContextType {
  cart: CartItem[];
  favorites: string[];
  orders: Order[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => string;
}