import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/config';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import custom CSS for additional styling

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      const { token, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setMessage('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred while logging in.');
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-image">
      <div className="card shadow-lg p-4 w-75" style={{ borderRadius: '15px', background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
        <h3 className="text-center mb-4 fw-bold">Welcome Back!</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              <i className="fas fa-user me-2"></i>Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <i className="fas fa-lock me-2"></i>Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn w-100" style={{ borderRadius: '10px', backgroundColor: '#400158', color: '#fff' }}>
            <i className="fas fa-sign-in-alt me-2"></i>Login
          </button>

          {message && <p className="mt-3 text-danger text-center">{message}</p>}
        </form>
        <div className="text-center mt-3">
          <a href="/forgot-password" className="text-muted">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;