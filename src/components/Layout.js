import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';
import logo from '../assets/logo.png';

const Layout = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('access');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
  
      try {
        const response = await fetch('http://localhost:8000/auth/jwt/verify/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
  
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
  
          // Redirect only if currently on a protected route
          const protectedPaths = ['/profile', '/orders'];
          if (protectedPaths.includes(window.location.pathname)) {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Token verification error:', error);
        setIsAuthenticated(false);
  
        const protectedPaths = ['/profile', '/orders'];
        if (protectedPaths.includes(window.location.pathname)) {
          navigate('/login');
        }
      }
    };
  
    verifyToken();
  }, [navigate]);
  
  

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

  const handleLogout = () => {
    localStorage.removeItem('cartId');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthenticated(false);
    setShowDropdown(false);
    navigate('/');  // Navigate to the home page
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

          {isAuthenticated ? (
            <div className="profile-dropdown" ref={dropdownRef}>
              <i
                className="fa fa-user"
                aria-hidden="true"
                onClick={() => setShowDropdown(prev => !prev)}
              ></i>
              {showDropdown && (
                <ul className="dropdown-menu">
                  <li><Link to="/profile" onClick={() => setShowDropdown(false)}>Profile</Link></li>
                  <li><Link to="/orders" onClick={() => setShowDropdown(false)}>Your Orders</Link></li>
                  <li>
                    <Link 
                      to="/" 
                      onClick={(e) => {
                        e.preventDefault();  // Prevent default Link behavior
                        handleLogout();  // Call logout function
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login">
              <i className="fa fa-user" aria-hidden="true"></i>
            </Link>
          )}

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
