// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';  // Import the LandingPage component
import AboutUs from './components/AboutUs';  // Placeholder for AboutUs page
import Shop from './components/Shop';  // Placeholder for Shop page
import Reviews from './components/Reviews';  // Placeholder for Reviews page
import Profile from './components/Profile';  // Placeholder for Profile page
import Cart from './components/Cart';  // Placeholder for Cart page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
