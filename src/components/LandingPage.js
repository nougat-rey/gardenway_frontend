import React, { useEffect, useState } from 'react';
import Layout from './Layout';  // Import Layout component
import CollectionCard from './CollectionCard'; // Import CollectionCard
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './LandingPage.css';

const LandingPage = () => {
  const [collections, setCollections] = useState([]); // State to hold collections data

  // Fetch collections data from the API
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/store/collections/`);
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
        <div className='page-container'>
          <div className="intro-section">
            <h2>Welcome to Gardenway</h2>
            <p>Sharing the inspiration I’ve found in nature’s wonders with your garden.</p>
          </div>

          {/* Collection Cards Grid */}
          <div className="collections-container">
            <div className="collections-grid">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  to={`/collection/${collection.id}`}  // Link to the collection page
                  className="collection-card-link"  // Optional class for styling the link
                >
                  <CollectionCard collection={collection} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default LandingPage;
