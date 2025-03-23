// src/components/Shop.js
import React from 'react';

const Shop = () => {
  return (
    <div>
      <h1>Shop</h1>
      <p>Browse through our amazing products below:</p>
      
      <div className="product-list">
        <div className="product-item">
          <h2>Product 1</h2>
          <p>$20.00</p>
        </div>
        <div className="product-item">
          <h2>Product 2</h2>
          <p>$30.00</p>
        </div>
        <div className="product-item">
          <h2>Product 3</h2>
          <p>$40.00</p>
        </div>
      </div>
    </div>
  );
};

export default Shop;
