import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem('access');

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      try {
        // Fetch orders
        const ordersResponse = await axios.get('http://localhost:8000/store/orders/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(ordersResponse.data);

        // Fetch all product details once
        const productsResponse = await axios.get('http://localhost:8000/store/products/');
        setProducts(productsResponse.data);
      } catch (err) {
        setError('Failed to fetch orders or products.');
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrdersAndProducts();
    else {
      setError('You must be logged in to view your orders.');
      setLoading(false);
    }
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Function to find product details by ID
  const getProductById = (id) => {
    return products.find((product) => product.id === id);
  };

  if (loading) return <div className="orders-container">Loading orders...</div>;
  if (error) return <div className="orders-container error">{error}</div>;

  return (
    <div className="orders-container">
      <h1 className="orders-title">Your Orders</h1>
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
                  order.items.map((item) => {
                    const product = getProductById(item.product.id); // Get product details from the products list
                    const unitPrice = product?.price || 0;
                    const totalPrice = unitPrice * item.quantity;

                    return (
                      <div className="order-item" key={item.id}>
                        <div className="order-item-image">
                          {product?.images?.[0]?.image ? (
                            <img
                              src={product.images[0].image}
                              alt={product?.title || 'Product'}
                              onError={(e) => (e.target.src = '/banner.png')}
                            />
                          ) : (
                            <img
                              src="/banner.png"
                              alt="Default banner"
                              onError={(e) => (e.target.src = '/banner.png')}
                            />
                          )}
                        </div>
                        <div className="order-item-details">
                          <div><strong>Product:</strong> {product?.title || 'N/A'}</div>
                          <div><strong>Unit Price:</strong> ${unitPrice.toFixed(2)}</div>
                          <div><strong>Quantity:</strong> {item.quantity}</div>
                          <div><strong>Total:</strong> ${totalPrice.toFixed(2)}</div>
                        </div>
                      </div>
                    );
                  })
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
