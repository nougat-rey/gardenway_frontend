import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './ProductPage.css'; // Import the CSS file

const ProductPage = () => {
  const { id } = useParams(); // Grab the id from the URL parameters
  const [product, setProduct] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [productCollection, setProductCollection] = useState(null);
  const [quantity, setQuantity] = useState(1); // Quantity state

  useEffect(() => {
    setLoading(true); // Start loading whenever the component re-renders

    // Fetch product details
    axios
      .get(`http://localhost:8000/store/products/${id}/`) // Use the id from the URL
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Product not found");
        setLoading(false);
      });

    // Fetch collections data
    axios
      .get("http://localhost:8000/store/collections/")
      .then((response) => {
        setCollections(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch collections");
      });
  }, [id]); // Only refetch when the id changes (for example, when navigating to a different product)

  useEffect(() => {
    // Determine the collection for the product
    if (product && collections.length > 0) {
      const collection = collections.find((col) =>
        col.products.includes(product.id)
      );
      setProductCollection(collection ? collection.title : "Unknown Collection");
    }
  }, [product, collections]);

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, Math.min(e.target.value, product.inventory));
    setQuantity(newQuantity); // Update quantity while preventing over-buying
  };

  const handleAddToCart = () => {
    // Handle Add to Cart logic (e.g., saving to local storage, state, or backend)
    alert(`Added ${quantity} ${product.title} to your cart!`);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there was an issue
  }

  return (
    <div className="product-page">
      {product && (
        <div className="product-content">
          <div className="product-image">
            <img
              src={product.images[0]?.image}
              alt={product.title}
              onError={(e) => (e.target.src = "http://localhost:3000/banner.png")} // Fallback image
            />
          </div>
          <div className="product-details">
            {productCollection && (
              <div className="product-collection">{productCollection}</div>
            )}
            <div className="product-title">{product.title}</div>
            <div className="product-price">Price: ${product.price}</div>

            {/* Removed Inventory section */}
            {/* <div className="product-inventory">Inventory: {product.inventory}</div> */}

            {/* Removed Price with Tax */}
            {/* <div className="product-tax">Price with Tax: ${product.price_with_tax}</div> */}

            {/* Quantity Selector */}
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

            <button className="add-to-cart" onClick={handleAddToCart}>
              Add {quantity} to Cart
            </button>
          </div>
        </div>
      )}

      {/* Divider between product details and reviews */}
      <div className="divider"></div>

      {/* Reviews Section */}
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
