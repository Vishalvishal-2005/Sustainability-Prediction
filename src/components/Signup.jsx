import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await fetch('http://localhost:3060/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
          });

          if (response.ok) {
            alert('Sign up successful!');
            setError('');
            navigate('/Login');
          } else if (response.status === 409) {
            setError('Email already exists');
          } else {
            const data = await response.text();
            setError(data || 'Signup failed');
          }
        } catch (err) {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('Passwords do not match.');
      }
    } else {
      setError('Please fill in all fields.');
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
        }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="username" style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#00695c'
            }}>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
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
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#00695c'
            }}>Email:</label>
            <input
              type="email"
              id="email"
              placeholder='Email'
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
              placeholder='Password'
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

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="confirmPassword" style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#00695c'
            }}>Confirm Password:</label>
            <input
              type="password"
              placeholder='Re-Type Password'
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Sign Up
          </button>

          <div style={{
            marginTop: '20px',
            color: '#004d40',
            fontSize: '14px'
          }}>
            You already have an Account?{' '}
            <Link to="/Login" style={{
              color: '#004d40',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
