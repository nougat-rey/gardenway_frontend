import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './OrderConfirmation.css';  // Import the CSS file for styling

const OrderConfirmation = () => {
  const { orderId } = useParams();  // Get orderId from the URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Retrieve the token from localStorage
  const token = localStorage.getItem('access');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/store/orders/${orderId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
            },
          }
        );
        setOrderDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    if (orderId && token) {
      fetchOrderDetails();
    } else {
      setError('Missing order ID or authentication token');
      setLoading(false);
    }
  }, [orderId, token]);

  if (loading) return <div>Loading order details...</div>;
  if (error) return <div>{error}</div>;

  // Format the date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="order-confirmation">
      <div className="order-header">
        <h1>Order Confirmation</h1>
        <div className="order-id">Order ID: {orderDetails.id}</div>
        <div className="order-date">{formatDate(orderDetails.placed_at)}</div>
      </div>
      
      <div className="order-summary">
        <h3>Order Summary</h3>
        <div><strong>Payment Status: </strong> {orderDetails.payment_status === 'P' ? 'Paid' : 'Unpaid'}</div>
        <div><strong>Total Price: </strong> ${orderDetails.total_price.toFixed(2)}</div>
        <div><strong>Total Price with Tax: </strong> ${orderDetails.total_price_with_tax.toFixed(2)}</div>
      </div>

      <div className="order-items">
        <h3>Items</h3>
        <ul>
          {orderDetails.items.map((item) => (
            <li key={item.id} className="order-item">
              <div className="order-item-image">
                <img src={`path_to_images/${item.product.id}.jpg`} alt={item.product.title} />
              </div>
              <div className="order-item-details">
                <div><strong>{item.product.title}</strong></div>
                <div>Unit Price: ${item.unit_price.toFixed(2)}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Total: ${item.total_price.toFixed(2)}</div>
                <div>Total with Tax: ${item.total_price_with_tax.toFixed(2)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-actions">
        <button className="action-btn">View Order</button>
        <button className="action-btn">Shop More</button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
