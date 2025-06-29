import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode
} from 'react';

export interface CartItem {
  sku: string;
  name: string;
  qty: number;
}

type Action =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; sku: string };

function cartReducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const idx = state.findIndex(i => i.sku === action.item.sku);
      if (idx > -1) {
        return state.map(i =>
          i.sku === action.item.sku ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case 'REMOVE':
      return state.filter(i => i.sku !== action.sku);
    default:
      return state;
  }
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (sku: string) => void;
}

const CartContext = createContext<CartContextType|undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (item: Omit<CartItem, 'qty'>) =>
    dispatch({ type: 'ADD', item: { ...item, qty: 1 } });

  const removeFromCart = (sku: string) =>
    dispatch({ type: 'REMOVE', sku });

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
