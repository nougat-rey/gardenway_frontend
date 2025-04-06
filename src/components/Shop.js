import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const productRefs = useRef([]);
  const [quantity, setQuantity] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!isFetched) {
      axios.get('http://localhost:8000/store/products/')
        .then(response => {
          setProducts(response.data);
          const initialQuantities = response.data.reduce((acc, product) => {
            acc[product.id] = 0;
            return acc;
          }, {});
          setQuantity(initialQuantities);
          setIsFetched(true);
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
  }, [isFetched]);

  const buildImageUrl = (imagePath) => {
    if (imagePath.startsWith('http://localhost:8000/media/')) {
      return imagePath;
    } else if (imagePath.startsWith('/media/')) {
      return `http://localhost:8000${imagePath}`;
    } else {
      return `http://localhost:8000/media/${imagePath}`;
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('access');
      if (!token) {
        alert("You must be logged in to add to cart.");
        return;
      }

      let customerId = localStorage.getItem('customerId');
      if (!customerId) {
        const customerRes = await axios.get('http://localhost:8000/store/customers/me/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        customerId = customerRes.data.id;
        localStorage.setItem('customerId', customerId);
      }

      let cartId = localStorage.getItem('cartId');
      if (!cartId) {
        const cartRes = await axios.post('http://localhost:8000/store/carts/', {
          customer: customerId,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        cartId = cartRes.data.id;
        localStorage.setItem('cartId', cartId);
      }

      await axios.post(
        `http://localhost:8000/store/carts/${cartId}/items/`,
        {
          product_id: productId,
          quantity: quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`Added ${quantity} to your cart!`);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Something went wrong while adding to cart.");
    }
  };

  const handleQuantityChange = (productId, change) => {
    setQuantity(prev => {
      const currentQuantity = prev[productId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      return { ...prev, [productId]: newQuantity };
    });
  };

  return (
    <div className="shop">
      <h1>Shop</h1>
      <div className="shop-grid">
        {products.map((product, index) => (
          <div
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
                    e.target.src = 'http://localhost:3000/banner.png';
                  }}
                />
              ) : (
                <img src="http://localhost:3000/banner.png" alt="Default" />
              )}
            </div>
            <div className="shop-info">
              {/* Make the product title a clickable link */}
              <Link to={`/product/${product.id}`} className="shop-title">
                {product.title}
              </Link>
              <div className="shop-price">${product.price}</div>
              <div className="shop-inventory">In Stock: {product.inventory}</div>

              {/* Quantity Control */}
              <div className="quantity-control">
                <button
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className={`qty-btn ${quantity[product.id] <= 0 ? 'disabled' : ''}`}
                  disabled={quantity[product.id] <= 0}
                >
                  -
                </button>
                <span className="qty-value">{quantity[product.id] || 0}</span>
                <button
                  onClick={() => handleQuantityChange(product.id, 1)}
                  disabled={quantity[product.id] >= product.inventory}
                  className="qty-btn"
                >
                  +
                </button>
                
                {/* Inline Add to Cart Button */}
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product.id, quantity[product.id] || 0)}
                  disabled={quantity[product.id] <= 0}
                >
                  <i className="fas fa-cart-plus icon"></i>
                  <i className="fas fa-arrow-right icon"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;