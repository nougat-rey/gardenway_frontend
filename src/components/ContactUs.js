// src/components/ContactUs.js
import React from 'react';
import './ContactUs.css';  // Import a separate CSS file for styles

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-description">
        If you have any questions or need assistance, feel free to reach out to us using the contact details below.
      </p>
      
      <div className="contact-details">
        <div className="contact-item">
          <h3>Phone</h3>
          <p className="contact-info">613-914-779</p>
        </div>
        <div className="contact-item">
          <h3>Email</h3>
          <p className="contact-info">nougat.rey@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
