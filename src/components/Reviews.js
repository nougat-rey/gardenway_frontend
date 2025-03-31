import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reviews.css'; // Make sure you have the corresponding CSS file

const Reviews = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/store/products/')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("There was an error fetching the data:", error));
  }, []);

  return (
    <div className="reviews-page">
      <h2 className="page-title">Customer Reviews</h2>
      <div className="reviews-container">
        {products.map((product) => (
          <div className="product-review-card" key={product.id}>
            <div className="product-info">
              <img src={product.images[0].image} alt={product.title} className="product-image" />
              <h3 className="product-title">{product.title}</h3>
            </div>

            <div className="reviews-list">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div className="review-card" key={index}>
                    <div className="review-header">
                      <span className="review-author">{review.name}</span>
                      <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <div className="review-description">
                      <p>{review.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews yet for this product.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
