import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get(`/cart/${user.id}`);
        setCart(res.data);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };
    fetchCart();
  }, [user.id]);

if (!user) {
    return <p>Please log in to view your cart.</p>;
  }

  const checkout = async () => {
    try {
      await api.post('/all_orders', { user_id: user.id ,total_price : 0  }); // if required
      alert('Order placed!');
      setCart([]);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Error placing order');
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Rating</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.rating}</td>
                <td>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={checkout} style={{ marginTop: '20px' }}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
