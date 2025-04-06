import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('access');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/store/orders/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
    else {
      setError('You must be logged in to view your orders.');
      setLoading(false);
    }
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) return <div className="orders-container">Loading orders...</div>;
  if (error) return <div className="orders-container error">{error}</div>;

  return (
    <div className="orders-container">
      <h1 className="orders-title">My Orders</h1>
      {orders.length === 0 ? (
        <p className="no-orders">You haven't placed any orders yet.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id} className="order-card">
              <Link to={`/order-confirmation/${order.id}`} className="order-link">
                <div className="order-header">
                  <h2 className="order-id">Order #{order.id}</h2>
                  <p className="order-date">Placed on {formatDate(order.placed_at)}</p>
                  <p className="order-status">Status: {order.payment_status === 'P' ? 'Paid' : 'Unpaid'}</p>
                  <p className="order-total">Total: ${order.total_price_with_tax.toFixed(2)}</p>
                </div>
              </Link>
              <div className="order-items">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <div className="order-item" key={item.id}>
                      <div className="order-item-image">
                        <img
                          src={item.product?.images?.[0]?.image || '/banner.png'}
                          alt={item.product?.title || 'Product'}
                          onError={(e) => (e.target.src = '/banner.png')}
                        />
                      </div>
                      <div className="order-item-details">
                        <div><strong>Product:</strong> {item.product?.title || 'N/A'}</div>
                        <div><strong>Unit Price:</strong> ${item.product?.unit_price?.toFixed(2) || '0.00'}</div>
                        <div><strong>Quantity:</strong> {item.quantity}</div>
                        <div><strong>Total:</strong> ${(item.quantity * (item.product?.unit_price || 0)).toFixed(2)}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-items">No items in this order.</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
