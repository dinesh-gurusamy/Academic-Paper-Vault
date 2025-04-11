import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Ensure this import statement is correct

const Home = () => {
  return (
    <div className="min-vh-100 d-flex flex-column bg-dark">
      {/* Hero Section */}
      <section className="text-white py-5" style={{ backgroundColor: '#FFC107' }}>
        <div className="container text-center">
          <h1 className="display-4 fw-bold text-dark">Welcome to Academia Platform</h1>
          <p className="fs-4 text-dark">
            Access and download educational resources to enhance your learning experience.
          </p>
          <Link to="/login" className="btn btn-lg" style={{ backgroundColor: 'black', color: '#fff' }}>
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ backgroundColor: '#FFC107' }}>
        <div className="container">
          <h2 className="text-center mb-5 fw-bold text-dark">Why Choose Us?</h2>
          <div className="row">
            <div className="col-md-4 text-center text-dark">
              <i className="fas fa-book fa-3x custom-icon mb-3"></i>
              <h4>Extensive Resources</h4>
              <p>Access a wide range of educational materials tailored to your needs.</p>
            </div>
            <div className="col-md-4 text-center text-dark">
              <i className="fas fa-download fa-3x custom-icon mb-3"></i>
              <h4>Easy Downloads</h4>
              <p>Download resources with just a single click.</p>
            </div>
            <div className="col-md-4 text-center text-dark">
              <i className="fas fa-users fa-3x custom-icon mb-3"></i>
              <h4>Community Support</h4>
              <p>Join a community of learners and educators worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="mt-auto py-3" style={{ backgroundColor: '#FFC107' }}>
        <div className="container text-center">
          <p className="mb-0 text-dark">© 2025 Academia Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;