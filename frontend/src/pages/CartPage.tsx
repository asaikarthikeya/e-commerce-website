// src/pages/CartPage.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart, CartItem } from '../contexts/CartContext';
import './CartPage.css';

const PRICE_PER_ITEM = 10;

const CartPage: React.FC = () => {
  const { user } = useAuth();
  const { cart, addToCart, removeFromCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const navigate = useNavigate();

  // compute total
  const total = cart.reduce(
    (sum, item) => sum + item.qty * PRICE_PER_ITEM,
    0
  );

  // When user clicks "Proceed to Payment"
  const handleCheckout = () => {
    if (!paymentMethod || cart.length === 0) return;

    // Simulate success
    alert(`Payment of $${total} via ${paymentMethod} successful!`);

    // 1) Clear the cart
    cart.forEach(item => removeFromCart(item.sku));

    // 2) Redirect to home
    navigate('/');
  };

  // Not logged in
  if (!user) {
    return (
      <div className="cart-page">
        <p>
          Please <Link to="/auth">log in</Link> to use the cart.
        </p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>{user}’s Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item: CartItem) => (
            <li key={item.sku} className="cart-item">
              <span className="item-name">{item.name}</span>
              <span className="item-price">
                ${PRICE_PER_ITEM} × {item.qty} = $
                {PRICE_PER_ITEM * item.qty}
              </span>
              <div className="item-actions">
                <button onClick={() => addToCart(item)}>＋</button>
                <button onClick={() => removeFromCart(item.sku)}>－</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <>
          <p className="total">Total: ${total}</p>

          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="Credit Card"
                checked={paymentMethod === 'Credit Card'}
                onChange={e => setPaymentMethod(e.target.value)}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={e => setPaymentMethod(e.target.value)}
              />
              PayPal
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={e => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
          </div>
        </>
      )}

      <button
        className="checkout-btn"
        disabled={!user || cart.length === 0 || paymentMethod === ''}
        onClick={handleCheckout}
      >
        {cart.length === 0
          ? 'Pay'
          : !paymentMethod
          ? 'Select Payment Method'
          : 'Proceed to Payment'}
      </button>
    </div>
  );
};

export default CartPage;
