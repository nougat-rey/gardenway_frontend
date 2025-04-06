import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Import useParams from react-router-dom

const OrderConfirmation = () => {
  const { orderId } = useParams();  // Use useParams to get orderId from the URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/store/orders/${orderId}/`);
        setOrderDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) return <div>Loading order details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="order-confirmation">
      <h2>Order Confirmation</h2>
      <div>
        <strong>Order ID: </strong> {orderDetails.id}
      </div>
      <div>
        <strong>Subtotal: </strong> ${orderDetails.subtotal}
      </div>
      <div>
        <strong>Shipping Address: </strong> {orderDetails.shipping_address}
      </div>
      <div>
        <strong>Items:</strong>
        <ul>
          {orderDetails.items.map((item) => (
            <li key={item.product.id}>
              {item.product.title} - Quantity: {item.quantity} - Price: ${item.total_price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderConfirmation;
