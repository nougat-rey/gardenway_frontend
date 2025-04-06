// src/utils/cartUtils.js

export const getOrCreateCart = async () => {
    const token = localStorage.getItem('access');
    let cartId = localStorage.getItem('cartId');
  
    if (cartId) return cartId;
  
    const response = await fetch('http://localhost:8000/store/carts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to create cart');
    }
  
    const data = await response.json();
    cartId = data.id;
    localStorage.setItem('cartId', cartId);
  
    return cartId;
  };
  
  export const addToCart = async (productId, quantity) => {
    const token = localStorage.getItem('access');
    const cartId = await getOrCreateCart();
  
    const response = await fetch(`http://localhost:8000/store/carts/${cartId}/items/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: productId,
        quantity,
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to add item to cart');
    }
  
    return response.json();
  };
  