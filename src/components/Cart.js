import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Cart = () => {
  const navigate = useNavigate();  // Use the useNavigate hook
  const [items, setItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState(null);
  const [productDetails, setProductDetails] = useState({}); // To store product details

  const token = localStorage.getItem('access');
  const cartId = localStorage.getItem('cartId');

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!token || !cartId) {
        setCartError("No cart found. Try adding an item first.");
        setCartLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/store/carts/${cartId}/items/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setItems(response.data);

        // Fetch product details for each item
        const productRequests = response.data.map((item) =>
          axios.get(`http://localhost:8000/store/products/${item.product.id}/`)
        );

        const productResponses = await Promise.all(productRequests);
        const productData = productResponses.reduce((acc, curr) => {
          const product = curr.data;
          acc[product.id] = product;  // Store the product details using product.id
          return acc;
        }, {});

        setProductDetails(productData);  // Store product details in state
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartError("Failed to load cart. Please try again.");
      } finally {
        setCartLoading(false);
      }
    };

    fetchCartItems();
  }, [cartId, token]);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axios.patch(
        `http://localhost:8000/store/carts/${cartId}/items/${itemId}/`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity, total_price: item.product.unit_price * newQuantity, total_price_with_tax: (item.product.unit_price * newQuantity * 1.13) } : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(
        `http://localhost:8000/store/carts/${cartId}/items/${itemId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const submitOrder = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/store/orders/',
        { cart_id: cartId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      // If the order is successfully submitted, clear the cartId from localStorage
      localStorage.removeItem('cartId');
      setItems([]);  // Clear the cart state
      
      // Redirect to Order Confirmation page with order details
      const orderId = response.data.id; 
      navigate(`/order-confirmation/${orderId}`);  // Use navigate instead of history.push()
      
    } catch (error) {
      console.error('Failed to submit order:', error);
      alert('Failed to submit order. Please try again.');
    }
  };
  
  const subtotal = items.reduce((acc, item) => acc + item.total_price, 0);
  const subtotalWithTax = items.reduce((acc, item) => acc + item.total_price_with_tax, 0);

  if (cartLoading) return <div>Loading your cart...</div>;
  if (cartError) return <div>{cartError}</div>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
        <ul className="cart-items">
          {items.map(item => (
            <li key={item.id} className="cart-item">
              <div className="cart-item-image">
                {productDetails[item.product.id] && productDetails[item.product.id].images && productDetails[item.product.id].images[0] ? (
                  <img
                    src={productDetails[item.product.id].images[0].image}
                    alt={item.product.title}
                    onError={(e) => {
                      e.target.src = "http://localhost:3000/banner.png";  // Fallback image
                    }} 
                  />
                ) : (
                  <div>No image available</div>
                )}
              </div>

              <div className="cart-item-details">
                <div><strong>Product:</strong> {item.product.title}</div>
                <div><strong>Unit Price:</strong> ${item.product.unit_price.toFixed(2)}</div>
                <div className="quantity-control">
                  <button
                    onClick={() =>
                      item.quantity === 1
                        ? deleteItem(item.id)
                        : updateQuantity(item.id, item.quantity - 1)
                    }
                    className={`qty-btn ${item.quantity === 1 ? 'delete-btn' : ''}`}
                  >
                    {item.quantity === 1 ? '🗑️' : '-'}
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.inventory}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <div><strong>Total:</strong> ${item.total_price.toFixed(2)}</div>
              </div>
            </li>
          ))}
        </ul>


          <div className="cart-subtotal">
            <div><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</div>
            <div><strong>Subtotal with Tax:</strong> ${subtotalWithTax.toFixed(2)}</div>
          </div>
          <div className="submit-order-section">
            <button className="submit-order-btn" onClick={submitOrder} disabled={items.length === 0}>
              Submit Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
