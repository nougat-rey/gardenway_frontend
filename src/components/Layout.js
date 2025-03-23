// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';  // Add styles for the layout

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <div className="logo">
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

      {/* Main Content */}
      <main>
        {children}  {/* This is where page-specific content will go */}
      </main>

      {/* Footer */}
      <footer>
        <nav>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
        <p>© 2025 MyStore. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
