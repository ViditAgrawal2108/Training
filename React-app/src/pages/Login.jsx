import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Axios instance
import { useAuth } from '../context/AuthContext'; // Custom auth context

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch all users from FastAPI backend
      const res = await api.get('/users');
      
      // Match user by email and name
      const user = res.data.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.name.toLowerCase() === name.toLowerCase()
      );

      if (user) {
        login(user); // Save to context
        // Navigate based on role
        if (user.user_type === 'manager') {
          navigate('/manager/dashboard');
        } else if (user.user_type === 'user') {
          navigate('/shop');
        } else {
          alert('Unknown role');
        }
      } else {
        alert('Invalid name or email');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong while logging in.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
