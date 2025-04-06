import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import './ProductPage.css';
import { addToCart } from '../utils/cartUtils';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [productCollection, setProductCollection] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/store/products/${id}/`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Product not found");
        setLoading(false);
      });

    axios
      .get("http://localhost:8000/store/collections/")
      .then((response) => {
        setCollections(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch collections");
      });
  }, [id]);

  useEffect(() => {
    if (product && collections.length > 0) {
      const collection = collections.find((col) =>
        col.products.includes(product.id)
      );
      setProductCollection(collection ? collection : null);
    }
  }, [product, collections]);

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, Math.min(e.target.value, product.inventory));
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
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
          product_id: product.id,
          quantity: quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`Added ${quantity} ${product.title} to your cart!`);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Something went wrong while adding to cart.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-page">
      {product && (
        <div className="product-content">
          <div className="product-image">
            <img
              src={product.images[0]?.image}
              alt={product.title}
              onError={(e) => (e.target.src = "http://localhost:3000/banner.png")}
            />
          </div>
          <div className="product-details">
            {productCollection && productCollection.title && (
              <div className="product-collection">
                <Link to={`/collection/${productCollection.id}`} className="collection-link">
                  {productCollection.title}
                </Link>
              </div>
            )}
            <div className="product-title">{product.title}</div>
            <div className="product-price">Price: ${product.price}</div>

            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity: </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.inventory}
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>

            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={quantity <= 0}
            >
              <i className="fas fa-cart-plus icon"></i>
              <i className="fas fa-arrow-right icon"></i>
            </button>
          </div>
        </div>
      )}

      <div className="divider"></div>

      <div className="product-reviews">
        <h3>Reviews</h3>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review.name} className="review-card">
              <div className="review-header">
                <div className="review-author">
                  <strong>{review.name}</strong>
                </div>
                <div className="review-date">{review.date}</div>
              </div>
              <div className="review-description-text">{review.description}</div>
            </div>
          ))
        ) : (
          <div>No reviews yet.</div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
