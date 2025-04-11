import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/config';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, credentials);
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred while registering.');
    }
  };

  return (
    <div className="min-vh-100 d-flex">
      {/* Left Side: Image Background */}
      <div
        className="d-none d-md-block col-md-6"
        style={{
          backgroundImage: "url('https://via.placeholder.com/800x1200')", // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-dark d-flex flex-column justify-content-center align-items-center h-100 p-5">
          <h1 className="fw-bold" style={{ color: '0c0c0c' }}>Join Our Community</h1>
          <p className="fs-5 text-center text-dark">
            Create an account to access our vast library of resources. Start learning today!
          </p>
        </div>
      </div>

      {/* Right Side: Register Form */}
      <div className="col-md-6 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#FFC107' }}>
        <div className="card shadow p-4 w-75" style={{ borderRadius: '15px', background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
          <h3 className="text-center mb-4 fw-bold">Register</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                <i className="fas fa-user me-2"></i>User Id
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                style={{ borderRadius: '10px' }}
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
                style={{ borderRadius: '10px' }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                <i className="fas fa-id-badge me-2"></i>Role
              </label>
              <select
                value={credentials.role}
                className="form-select"
                id="role"
                name="role"               
                style={{ borderRadius: '10px' }}
              >
                <option value="user">User</option>
              </select>
            </div>

            <button type="submit" className="btn w-100" style={{ borderRadius: '10px', backgroundColor: '#400158', color: '#fff' }}>
              <i className="fas fa-user-plus me-2"></i>Register
            </button>

            {message && <p className="mt-3 text-success">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;