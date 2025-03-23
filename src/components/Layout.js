import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';  // Add styles for the layout
import logo from '../assets/logo.png';  // Import the logo from the assets folder

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="MyStore Logo" className="logo-img" />
          </Link>
        </div>
        <nav className="nav">
          <Link to="/about">About Us</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/reviews">Reviews</Link>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <Link to="/profile">
            <i className="fa fa-user" aria-hidden="true"></i> {/* Profile Icon */}
          </Link>
          <Link to="/cart">
            <i className="fa fa-shopping-cart" aria-hidden="true"></i> {/* Cart Icon */}
          </Link>
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
        <p>© 2025 Gardenway. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
