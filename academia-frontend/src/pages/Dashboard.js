import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/config';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubjectCode, setSelectedSubjectCode] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');
  const [showYearSuggestions, setShowYearSuggestions] = useState(false);
  const [showSubjectCodeSuggestions, setShowSubjectCodeSuggestions] = useState(false);

  const navigate = useNavigate();

  // Sample data for filtering
  const currentYear = new Date().getFullYear();
  const yearSuggestions = [currentYear, currentYear - 1, currentYear - 2];
  const examTypes = ["CAT-1", "CAT-2", "CAT-3", "Model"];
  const subjectCodeSuggestions = ["SUB001", "SUB002", "SUB003"];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/resources`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Sort by newest first and limit to 16
      const sortedResources = response.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      const latest16 = sortedResources.slice(0, 16);

      setResources(latest16);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while fetching resources.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${BASE_URL}/resources/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchResources();
      } catch (error) {
        alert('Error deleting resource');
      }
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesYear = selectedYear ? resource.year === selectedYear : true;
    const matchesSubjectCode = selectedSubjectCode ? resource.subjectCode === selectedSubjectCode : true;
    const matchesExamType = selectedExamType ? resource.examType === selectedExamType : true;

    return matchesYear && matchesSubjectCode && matchesExamType;
  });

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setShowYearSuggestions(true);
  };

  const handleSubjectCodeChange = (e) => {
    setSelectedSubjectCode(e.target.value);
    setShowSubjectCodeSuggestions(true);
  };

  const selectYear = (year) => {
    setSelectedYear(year);
    setShowYearSuggestions(false);
  };

  const selectSubjectCode = (code) => {
    setSelectedSubjectCode(code);
    setShowSubjectCodeSuggestions(false);
  };

  if (loading) {
    return (
      <div className="text-center mt-5 text-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="text-dark min-vh-100" style={{ backgroundColor: '#FFC107' }}>
      {/* Hero Section */}
      <div className="container-fluid py-5 text-center" style={{ backgroundColor: '#FFC107' }}>
        <h1 className="display-4 fw-bold">Welcome to Academia Platform</h1>
        <p className="fs-4">Access and download resources for your studies.</p>
      </div>

      {/* Filter Section */}
      <div className="container py-3">
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Year"
              value={selectedYear}
              onChange={handleYearChange}
              onFocus={() => setShowYearSuggestions(true)}
            />
            {showYearSuggestions && (
              <ul className="list-group">
                {yearSuggestions.map(year => (
                  <li key={year} className="list-group-item" onClick={() => selectYear(year)}>
                    {year}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Subject Code"
              value={selectedSubjectCode}
              onChange={handleSubjectCodeChange}
              onFocus={() => setShowSubjectCodeSuggestions(true)}
            />
            {showSubjectCodeSuggestions && (
              <ul className="list-group">
                {subjectCodeSuggestions.map(code => (
                  <li key={code} className="list-group-item" onClick={() => selectSubjectCode(code)}>
                    {code}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
            >
              <option value="">Select Exam Type</option>
              {examTypes.map(examType => (
                <option key={examType} value={examType}>{examType}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resource List */}
      <div className="container py-5">
        <h2 className="text-center mb-5">
          <i className="fas fa-folder-open me-2"></i>Available Resources
        </h2>

        <ul className="list-group">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => {
              const filename = resource.filePath.split('/').pop();

              return (
                <li key={resource._id} className="list-group-item d-flex justify-content-between align-items-center mb-3" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '5px' }}>
                  <div>
                    <h5 className="mb-1">
                      <i className="fas fa-file-alt me-2"></i>
                      {resource.title}
                    </h5>
                    <p className="mb-1 small text-muted">
                      Year: {resource.year}, Subject: {resource.subjectCode}, Exam Type: {resource.examType}
                    </p>
                  </div>
                  <div>
                    {/* View Button */}
                    <a
                      href={`http://localhost:5000/${resource.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary me-2"
                    >
                      <i className="fas fa-eye me-2"></i>View
                    </a>

                    {/* Edit Button (Admin and Faculty Only) */}
                    {['admin', 'faculty'].includes(localStorage.getItem('role')) && (
                      <button
                        onClick={() => navigate(`/edit-resource/${resource._id}`)}
                        className="btn btn-outline-danger me-2">
                        <i className="fas fa-edit me-2"></i>Edit
                      </button>
                    )}

                    {/* Delete Button (Admin Only) */}
                    {localStorage.getItem('role') === 'admin' && (
                      <button
                        onClick={() => handleDelete(resource._id)}
                        className="btn btn-outline-dark">
                        <i className="fas fa-trash me-2"></i>Delete
                      </button>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <div className="text-center mt-5">
              <i className="fas fa-exclamation-circle me-2"></i>No resources available.
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;