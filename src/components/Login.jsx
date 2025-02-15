import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3060/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const token = await res.text();
        sessionStorage.setItem('token', token);
        alert('Sign in successful!');
        setError('');
        navigate('/ui');
        setIsAuthenticated(true);
      } else {
        const result = await res.text();
        setError(result || 'Failed to sign in. Please try again.');
      }
    } catch (error) {
      setError('Failed to sign in. Please try again.');
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e0f7fa'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h2 style={{
          color: '#00695c',
          marginBottom: '20px',
          fontWeight: 'bold',
          fontSize: '24px'
        }}>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#00695c'
            }}>Email:</label>
            <input
              type="text"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#00695c'
            }}>Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '16px'
              }}
            />
          </div>

          {error && (
            <p style={{
              color: 'red',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              {error}
            </p>
          )}

          <button type="submit" style={{
            width: '100%',
            backgroundColor: '#00695c',
            color: '#fff',
            border: 'none',
            padding: '12px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            Sign In
          </button>

          <div style={{
            marginTop: '20px',
            color: '#004d40',
            fontSize: '14px'
          }}>
            Don't have an account?{' '}
            <Link to="/" style={{
              color: '#004d40',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
