// src/pages/CartPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart, CartItem } from '../contexts/CartContext';
import './CartPage.css';

const CartPage: React.FC = () => {
  const { user } = useAuth();
  const { cart, addToCart, removeFromCart } = useCart();

  if (!user) {
    return (
      <div className="cart-page">
        <p>Please <Link to="/auth">log in</Link> to use the cart.</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>{user}’s Cart</h2>
      <ul className="cart-list">
        {cart.map((item: CartItem) => (
          <li key={item.sku} className="cart-item">
            <span className="item-name">{item.name}</span>
            <span className="item-qty">Qty: {item.qty}</span>
            <div className="item-actions">
              <button onClick={() => addToCart(item)}>＋</button>
              <button onClick={() => removeFromCart(item.sku)}>－</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
