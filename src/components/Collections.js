import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'; // Import useParams to get collection ID from URL
import './Collections.css';

const Collections = () => {
  const { id } = useParams(); // Get collection ID from the URL
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const productRefs = useRef([]);
  
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!isFetched) {
      axios.get(`http://localhost:8000/store/collections/${id}/`)
        .then(response => {
          const collectionData = response.data;
          setCollection(collectionData);
          
          // Fetch the products based on the product IDs returned by the collection
          const productIds = collectionData.products;
          const productRequests = productIds.map(productId =>
            axios.get(`http://localhost:8000/store/products/${productId}/`)
          );

          // Fetch all products concurrently
          Promise.all(productRequests)
            .then((responses) => {
              const productsData = responses.map((res) => res.data);
              setProducts(productsData);
              setIsFetched(true); // Mark as fetched
            })
            .catch(error => {
              console.error('Error fetching products:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching collection:', error);
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
  }, [id, isFetched]); // Trigger effect when the collection ID or fetch status changes

  const buildImageUrl = (imagePath) => {
    if (imagePath.startsWith('http://localhost:8000/media/')) {
      return imagePath;
    } else if (imagePath.startsWith('/media/')) {
      return `http://localhost:8000${imagePath}`;
    } else {
      return `http://localhost:8000/media/${imagePath}`;
    }
  };

  if (!collection) {
    return <div className="collections-container">Loading...</div>;
  }

  return (
    <div className="shop">
      <h1>{collection.title}</h1>
      <div className="shop-grid">
        {products.map((product, index) => (
          <Link
            to={`/product/${product.id}/`}
            key={product.id}
            id={String(product.id)}
            ref={(el) => productRefs.current[index] = el}
            className={`shop-card ${visibleCards.has(String(product.id)) ? 'fade-in' : ''}`}
          >
            <div className="shop-image">
              {product.images.length > 0 ? (
                <img
                  src={buildImageUrl(product.images[0].image)}
                  alt={product.title}
                  onError={(e) => {
                    console.error(`Image failed to load: ${e.target.src}`);
                    e.target.src = 'http://localhost:3000/banner.png'; // Fallback image
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collections;
