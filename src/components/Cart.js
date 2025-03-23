// src/components/Cart.js
import React from 'react';

const Cart = () => {
  return (
    <div>
      <h1>Your Cart</h1>
      <p>Here are the items you have added to your cart:</p>
      
      <div className="cart-item">
        <h3>Product 1</h3>
        <p>Quantity: 1</p>
        <p>Price: $20.00</p>
      </div>
      
      <div className="cart-item">
        <h3>Product 2</h3>
        <p>Quantity: 2</p>
        <p>Price: $60.00</p>
      </div>

      <div className="cart-total">
        <h2>Total: $80.00</h2>
      </div>

      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
