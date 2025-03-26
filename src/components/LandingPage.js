import React, { useEffect, useState } from 'react';
import Layout from './Layout';  // Import Layout component
import CollectionCard from './CollectionCard'; // Import CollectionCard
import './LandingPage.css';

const LandingPage = () => {
  const [collections, setCollections] = useState([]); // State to hold collections data

  // Fetch collections data from the API
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('http://localhost:8000/store/collections/');
        const data = await response.json();
        setCollections(data); // Store the collections in state
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollections();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  return (
    <Layout>
      <main>
        <div className="intro-section">
          <h2>Welcome to Gardenway</h2>
          <p>Sharing the inspiration I’ve found in nature’s wonders into your garden.</p>
        </div>

        {/* Collection Cards Grid */}
        <div className="collections-container">
          <div className="collections-grid">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} /> // Pass each collection to CollectionCard
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default LandingPage;
