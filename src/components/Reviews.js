// src/components/Reviews.js
import React from 'react';

const Reviews = () => {
  return (
    <div>
      <h1>Customer Reviews</h1>
      <p>Here's what our customers are saying about us:</p>
      
      <div className="review">
        <h3>John Doe</h3>
        <p>⭐⭐⭐⭐⭐</p>
        <p>This store has the best products! Highly recommend!</p>
      </div>
      
      <div className="review">
        <h3>Jane Smith</h3>
        <p>⭐⭐⭐⭐</p>
        <p>Great experience, but the shipping took a bit longer than expected.</p>
      </div>
      
      <div className="review">
        <h3>Mark Wilson</h3>
        <p>⭐⭐⭐⭐⭐</p>
        <p>Absolutely love the quality of the items I bought! Will shop again!</p>
      </div>
    </div>
  );
};

export default Reviews;
