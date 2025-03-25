import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Shop.css'; // For styling (see below)

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the products from your Django backend API
    axios.get('http://localhost:8000/store/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  // Function to create a preview of the review text
  const getReviewPreview = (review) => {
    if (!review || !review.description) return null;
    const maxLength = 100; // Max characters for preview
    return review.description.length > maxLength
      ? review.description.substring(0, maxLength) + "..."
      : review.description;
  };

  return (
    <div className="shop">
      <h1>Shop</h1>
      <div className="shop-grid">
        {products.map(product => (
          <div className="shop-card" key={product.id}>
            <div className="shop-image">
              {product.images.length > 0 ? (
                <img src={product.images[0].image} alt={product.title} />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>
            <div className="shop-info">
              <h3 className="shop-title">{product.title}</h3>
              <p className="shop-price">${product.price}</p>
              <p className="shop-inventory">In Stock: {product.inventory}</p>
            </div>
            <div className="shop-reviews">
              {product.reviews.length > 0 ? (
                <p><strong>Review:</strong> {getReviewPreview(product.reviews[0])}</p>
              ) : (
                <p>No reviews yet</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
