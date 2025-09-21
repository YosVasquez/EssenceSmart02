import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Order, AppContextType, Product } from '../types';
import { useAuth } from './AuthContext';

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de un AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Cargar datos del usuario cuando se autentica
  useEffect(() => {
    if (user) {
      try {
        const userCart = JSON.parse(localStorage.getItem(`essence_cart_${user.id}`) || '[]');
        const userFavorites = JSON.parse(localStorage.getItem(`essence_favorites_${user.id}`) || '[]');
        const userOrders = JSON.parse(localStorage.getItem(`essence_orders_${user.id}`) || '[]');
        
        setCart(Array.isArray(userCart) ? userCart : []);
        setFavorites(Array.isArray(userFavorites) ? userFavorites : []);
        setOrders(Array.isArray(userOrders) ? userOrders : []);
      } catch (error) {
        console.error('Error loading user data:', error);
        setCart([]);
        setFavorites([]);
        setOrders([]);
      }
    } else {
      setCart([]);
      setFavorites([]);
      setOrders([]);
    }
  }, [user]);

  // Guardar carrito cuando cambie
  useEffect(() => {
    if (user && cart) {
      try {
        localStorage.setItem(`essence_cart_${user.id}`, JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [cart, user]);

  // Guardar favoritos cuando cambien
  useEffect(() => {
    if (user && favorites) {
      try {
        localStorage.setItem(`essence_favorites_${user.id}`, JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    }
  }, [favorites, user]);

  // Guardar órdenes cuando cambien
  useEffect(() => {
    if (user && orders) {
      try {
        localStorage.setItem(`essence_orders_${user.id}`, JSON.stringify(orders));
      } catch (error) {
        console.error('Error saving orders:', error);
      }
    }
  }, [orders, user]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter(id => id !== productId);
      }
      return [...prevFavorites, productId];
    });
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): string => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    
    // Guardar en órdenes globales para el admin
    try {
      const allOrders = JSON.parse(localStorage.getItem('essence_all_orders') || '[]');
      allOrders.push(newOrder);
      localStorage.setItem('essence_all_orders', JSON.stringify(allOrders));
    } catch (error) {
      console.error('Error saving global orders:', error);
    }
    
    clearCart();
    return newOrder.id;
  };

  return (
    <AppContext.Provider value={{
      cart,
      favorites,
      orders,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleFavorite,
      placeOrder
    }}>
      {children}
    </AppContext.Provider>
  );
};