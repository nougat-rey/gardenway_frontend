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
              <p className="product-collection">{productCollection}</p>
            )}
            <h2>{product.title}</h2>
            <p className="product-price">Price: ${product.price}</p>
            <p className="product-inventory">Inventory: {product.inventory}</p>
            {product.price_with_tax && <p className="product-tax">Price with Tax: ${product.price_with_tax}</p>}
            
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
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
