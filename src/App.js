import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

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
import Orders from './components/Orders';
import OrderConfirmation from './components/OrderConfirmation';
import Register from './components/Register';

// Layout will be used to wrap the pages with header and footer
import Layout from './components/Layout';

const RouteTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/about': 'About Us',
      '/contact': 'Contact',
      '/shop': 'Shop',
      '/cart': 'Your Cart',
      '/profile': 'Your Profile',
      '/reviews': 'Reviews',
      '/login': 'Login',
      '/register': 'Register',
      '/orders': 'Your Orders',
      '/product': 'Product Details',
      '/collection': 'Collection',
      '/order-confirmation': 'Order Confirmation',
      '/': 'Home',
    };
  
    // Sort entries so longer paths like "/contact" come before "/"
    const sortedEntries = Object.entries(titles).sort((a, b) => b[0].length - a[0].length);
  
    const matchedTitle = sortedEntries.find(([path]) =>
      location.pathname.startsWith(path)
    );
  
    document.title = matchedTitle ? matchedTitle[1] : 'Gardenway';
  }, [location]);
  

  return null;
};

const App = () => {
  return (
    <Router>
      <RouteTitleUpdater />
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
        <Route path="/order-confirmation/:orderId" element={<Layout><OrderConfirmation /></Layout>} />
        <Route path="/orders" element={<Layout><Orders /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
