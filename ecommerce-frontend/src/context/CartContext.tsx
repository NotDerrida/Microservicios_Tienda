import { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export type CartContextType = {
  items: CartItem[];
  addToCart: (product: any) => void | Promise<void>;
  removeFromCart: (id: string) => void;
  isOpen: boolean;
  toggleCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const addToCart = async (product: any) => {
    if (!user) {
      alert('Por favor inicia sesión para agregar productos al carrito');
      return;
    }

    setItems(currentItems => {
      const existingItem = currentItems.find(item => item._id === product._id);
      if (existingItem) {
        return currentItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(items.filter(item => item._id !== productId));
  };

  const toggleCart = () => setIsOpen(open => !open);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, isOpen, toggleCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
};