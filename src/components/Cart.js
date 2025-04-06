// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('access');
      const cartId = localStorage.getItem('cartId');

      if (!token || !cartId) {
        setCartError("No cart found. Try adding an item first.");
        setCartLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/store/carts/${cartId}/items/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartError("Failed to load cart. Please try again.");
      } finally {
        setCartLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (cartLoading) return <div>Loading your cart...</div>;
  if (cartError) return <div>{cartError}</div>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <ul className="cart-items">
          {items.map(item => (
            <li key={item.id} className="cart-item">
              <div><strong>Product:</strong> {item.product.title}</div>
              <div><strong>Unit Price:</strong> ${item.product.unit_price}</div>
              <div><strong>Quantity:</strong> {item.quantity}</div>
              <div><strong>Total (pre-tax):</strong> ${item.total_price}</div>
              <div><strong>Total (with tax):</strong> ${item.total_price_with_tax}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
