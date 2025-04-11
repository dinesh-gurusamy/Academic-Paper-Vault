import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3" style={{ backgroundColor: '#0c0c0c' }}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link fs-6" to="/dashboard">
                    <i className="fas fa-th-large me-2"></i>Dashboard
                  </Link>
                </li>
                {(role === 'admin' || role === 'faculty') && (
                  <li className="nav-item">
                    <Link className="nav-link fs-6" to="/upload">
                      <i className="fas fa-upload me-2"></i>Upload
                    </Link>
                  </li>
                )}
                {role === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link fs-6" to="/role-management">
                      <i className="fas fa-user-cog me-2"></i>Roles
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-light fs-6">
                    <i className="fas fa-sign-out-alt me-1 text-dark"></i>Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link fs-6" to="/login">
                    <i className="fas fa-sign-in-alt me-2"></i>Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-6" to="/register">
                    <i className="fas fa-user-plus me-2"></i>Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link className="navbar-brand fw-bold text-center me-auto" to="/">
          <img src="/esec logo.png" alt="ESEC Logo" className="logo" />
          ERODE SENGUNTHAR ENGINEERING COLLEGE
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;