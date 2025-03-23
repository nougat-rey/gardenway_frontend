// src/components/LandingPage.js
import React from 'react';
import Layout from './Layout';  // Import Layout component
import './LandingPage.css';

const LandingPage = () => {
  return (
    <Layout>
      <main>
        <h2>Welcome to Gardenway</h2>
        <p>A collection of plants from around the world</p>
      </main>
    </Layout>
  );
};

export default LandingPage;
