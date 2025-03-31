import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';
import logo from '../assets/logo.png';

const Layout = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/store/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

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
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredProducts.length > 0 && (
              <ul className="search-results">
                {filteredProducts.map(product => (
                  <li key={product.id}>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link to="/profile">
            <i className="fa fa-user" aria-hidden="true"></i>
          </Link>
          <Link to="/cart">
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </Link>
        </nav>
      </header>

      <main>{children}</main>

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
