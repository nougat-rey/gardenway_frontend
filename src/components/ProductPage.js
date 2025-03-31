import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // to access the product's id from URL
import './ProductPage.css';  // Import the CSS file

const ProductPage = () => {
  const { id } = useParams();  // Grab the id from the URL parameters
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);  // Start loading whenever the component re-renders

    axios
      .get(`http://localhost:8000/store/products/${id}/`)  // Use the id from the URL
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Product not found");
        setLoading(false);
      });
  }, [id]);  // Only refetch when the id changes (for example, when navigating to a different product)

  if (loading) {
    return <div>Loading...</div>;  // Show loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if there was an issue
  }

  return (
    <div className="product-page">
      {product && (
        <div className="product-card">
          <h2>{product.title}</h2>
          <img
            src={product.images[0]?.image}
            alt={product.title}
            onError={(e) => (e.target.src = "http://localhost:3000/banner.png")} // Fallback image
          />
          <p className="product-price">Price: ${product.price}</p>
          <p className="product-inventory">Inventory: {product.inventory}</p>
          <p className="product-tax">{product.price_with_tax ? `Price with Tax: $${product.price_with_tax}` : null}</p>
          <div className="product-reviews">
            <h3>Reviews</h3>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.name}>
                  <p><strong>{review.name}</strong>:</p>
                  <p>{review.description}</p>
                  <p>{review.date}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
