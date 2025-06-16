
import React, { use, useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Shop = () => {
  const [items, setItems] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate(); 
  
  useEffect(() => {

    if (!user) return;
    const fetchItems = async () => {
      try {
        const res = await api.get('/all_items');
        setItems(res.data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };
    fetchItems();
  }, [user]); // depend on user

  if (!user) {
    return <p>Loading user info or not logged in.</p>;
  }

  const addToCart = async (item) => {
    try {
      await api.post('/cart', {
        user_id: user.id,
        product_id: item.id,
        total_price: item.price,
      });
      alert('Added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Error adding to cart');
    }
  };

  return (
    <div>
      <h2>Welcome {user.name}</h2>
      <h3>Products</h3> 
        <p>Browse our selection of products below:</p> 
        <button onClick={() => navigate('/cart')} style={{ marginBottom: '10px' }}> View Cart </button> 
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: 'center' }}>No products available.</td></tr>
          ) : (
            items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.rating}</td>
                <td>${item.price}</td>
                <td>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Shop;



