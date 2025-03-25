import React, { useEffect, useState, useRef } from 'react';  // Ensure useEffect and useState are imported
import axios from 'axios';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [visibleCards, setVisibleCards] = useState(new Set());
  
  const productRefs = useRef([]);

  useEffect(() => {
    // Fetch the products from your Django backend API
    axios.get('http://localhost:8000/store/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });

    // Set up IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set(prev.add(entry.target.id)));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe each product card when it is added to the page
    productRefs.current.forEach((card, index) => {
      if (card) {
        observer.observe(card);
      }
    });

    // Cleanup observer on unmount
    return () => {
      productRefs.current.forEach((card, index) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, [products]);

  return (
    <div className="shop">
      <h1>Shop</h1>
      <div className="shop-grid">
        {products.map((product, index) => (
          <div
            className={`shop-card ${visibleCards.has(String(product.id)) ? 'fade-in' : ''}`}
            key={product.id}
            id={String(product.id)}
            ref={(el) => productRefs.current[index] = el}
          >
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

const getReviewPreview = (review) => {
  if (!review || !review.description) return null;
  const maxLength = 100; // Max characters for preview
  return review.description.length > maxLength
    ? review.description.substring(0, maxLength) + "..."
    : review.description;
};

export default Shop;
