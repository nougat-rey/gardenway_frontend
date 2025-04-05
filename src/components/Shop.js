import React, { useState, useEffect, useRef } from 'react';  
import axios from 'axios';  
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
          <Link 
            to={`http://localhost:3000/product/${product.id}/`} // Link to the specific product page
            key={product.id}
            id={String(product.id)}
            ref={(el) => productRefs.current[index] = el}
            className={`shop-card ${visibleCards.has(String(product.id)) ? 'fade-in' : ''}`}
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
              <div className="shop-title">{product.title}</div>
              <div className="shop-price">${product.price}</div>
              <div className="shop-inventory">In Stock: {product.inventory}</div>
            </div>
          </Link> // Use Link component to make the entire card clickable
        ))}
      </div>
    </div>
  );
};

export default Shop;
