import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages/components
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import AboutUs from './components/AboutUs';
import Cart from './components/Cart';
import ContactUs from './components/ContactUs';
import Shop from './components/Shop';
import Profile from './components/Profile';
import Reviews from './components/Reviews';
import ProductPage from './components/ProductPage';
import Collections from './components/Collections';
import 'font-awesome/css/font-awesome.min.css';

// Layout will be used to wrap the pages with header and footer
import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<Layout><AboutUs /></Layout>} />
        <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
        <Route path="/shop" element={<Layout><Shop /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/reviews" element={<Layout><Reviews /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductPage /></Layout>} />
        <Route path="/collection/:id" element={<Layout><Collections /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
