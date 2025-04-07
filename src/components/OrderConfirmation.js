import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './OrderConfirmation.css';  // Import the CSS file for styling

const OrderConfirmation = () => {
  const { orderId } = useParams();  // Get orderId from the URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productDetails, setProductDetails] = useState({});

  // Retrieve the token from localStorage
  const token = localStorage.getItem('access');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/store/orders/${orderId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderDetails(response.data);
        setLoading(false);
  
        // Fetch the product details for each item in the order
        const productRequests = response.data.items.map((item) =>
          axios.get(`${process.env.REACT_APP_API_URL}/store/products/${item.product.id}/`)
        );
  
        // Wait for all product requests to complete
        const productResponses = await Promise.all(productRequests);
  
        // Map the product details to the order items
        const productData = productResponses.reduce((acc, curr, idx) => {
          const product = curr.data; // Access the product data correctly
          acc[product.id] = product; // Use the product.id as the key
          return acc;
        }, {});
  
        setProductDetails(productData); // Store product details in state
      } catch (err) {
        console.error('Error fetching order details:', err);
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
                {productDetails[item.product.id] && productDetails[item.product.id].images && productDetails[item.product.id].images[0] ? (
                  <img
                    src={productDetails[item.product.id].images[0].image}  // Correct image URL without prepending the base URL
                    alt={item.product.title}
                    onError={(e) => {
                      e.target.src = `${process.env.REACT_APP_ASSET_URL}/banner.png`;  // Fallback image
                    }} 
                  />
                ) : (
                  <div>No image available</div>
                )}
              </div>

              <div className="order-item-details">
                <div><strong>{item.product.title}</strong></div>
                <div>Unit Price: ${item.unit_price.toFixed(2)}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Total: ${item.total_price.toFixed(2)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderConfirmation;
