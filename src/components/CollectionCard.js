import React, { useEffect, useState } from 'react';

const CollectionCard = ({ collection }) => {
  const [productImage, setProductImage] = useState('');

  useEffect(() => {
    const fetchProductImage = async () => {
      if (collection && collection.products && collection.products[0]) {
        const productId = collection.products[0];  // Get the first product ID
        const response = await fetch(`http://localhost:8000/store/products/${productId}/images/`);
        const data = await response.json();
        setProductImage(data[0]?.image || ''); // Get the image from the response
      }
    };

    fetchProductImage();
  }, [collection]);  // Re-run effect when `collection` changes

  // Check if the collection exists and has the necessary properties
  if (!collection) {
    return <div>Loading...</div>;  // Optional loading state or return null
  }

  return (
    <div className="collection-card">
      <img src={`http://localhost:8000${productImage}`} alt={collection.title} />
      <h3>{collection.title}</h3> {/* Only displaying the title */}
      <p>{collection.products_count} products</p> {/* No slug displayed */}
    </div>
  );
};

export default CollectionCard;
