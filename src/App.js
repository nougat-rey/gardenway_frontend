// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AboutUs from './components/AboutUs';
import Shop from './components/Shop';
import Reviews from './components/Reviews';
import Profile from './components/Profile';
import Cart from './components/Cart';
import ContactUs from './components/ContactUs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
