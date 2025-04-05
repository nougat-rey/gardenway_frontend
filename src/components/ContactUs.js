import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-description">
        If you have any questions or need assistance, feel free to reach out to us using the contact details below.
      </p>
      
      <div className="contact-details">
        <div className="contact-item">
          <div><strong>Phone:</strong></div>
          <div className="contact-info">613-914-779</div>
        </div>
        <div className="contact-item">
          <div><strong>Email:</strong></div>
          <div className="contact-info">nougat.rey@gmail.com</div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
