// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';  // React Router for navigation
import './LandingPage.css'; 

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">
          {/* You can replace this with an actual image/logo */}
          <h1>MyStore</h1>
        </div>
        <nav className="nav">
          <Link to="/about">About Us</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/profile">Profile</Link>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <main>
        <h2>Welcome to MyStore!</h2>
        <p>Your favorite place to shop the best products!</p>
      </main>
    </div>
  );
};

export default LandingPage;
