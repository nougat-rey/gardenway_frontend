// src/components/Shop.js
import React, { useState, useEffect, useRef } from 'react';  
import axios from 'axios';  
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const productRefs = useRef([]);

  // Add a state variable to track if the products have been fetched
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!isFetched) {  // Only fetch if the data hasn't been fetched
      axios.get('http://localhost:8000/store/products/')
        .then(response => {
          setProducts(response.data);
          setIsFetched(true);  // Mark as fetched
        })
        .catch(error => {
          console.error('There was an error fetching the products!', error);
        });
    }

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

    productRefs.current.forEach((card, index) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      productRefs.current.forEach((card, index) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, [isFetched]);  // Only run when `isFetched` changes (i.e., once on initial load)

  const getReviewPreview = (review) => {
    if (!review || !review.description) return null;
    const maxLength = 100; 
    return review.description.length > maxLength
      ? review.description.substring(0, maxLength) + "..."
      : review.description;
  };

  const buildImageUrl = (imagePath) => {
    // Check if the imagePath already contains 'http://localhost:8000/media/'
    if (imagePath.startsWith('http://localhost:8000/media/')) {
      return imagePath;  // Return the full URL as is if it's already complete
    } else if (imagePath.startsWith('/media/')) {
      return `http://localhost:8000${imagePath}`;  // If it's relative, prepend the base URL
    } else {
      return `http://localhost:8000/media/${imagePath}`;  // Default case: assume it's a relative path
    }
  };

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
                <img
                  src={buildImageUrl(product.images[0].image)}  // Use the helper function to build the URL
                  alt={product.title}
                  onError={(e) => {
                    console.error(`Image failed to load: ${e.target.src}`);
                    e.target.src = 'http://localhost:3000/banner.png';  // Fallback image
                  }}
                />
              ) : (
                <img src="http://localhost:3000/banner.png" alt="Default" />
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
