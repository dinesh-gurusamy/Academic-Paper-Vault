import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../api/config';

const EditResource = () => {
  const { id } = useParams(); // Get the resource ID from the URL
  const [resource, setResource] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/resources/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResource(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred while fetching the resource.');
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', resource.title);
    formData.append('year', resource.year);
    formData.append('subjectCode', resource.subjectCode);
    formData.append('examType', resource.examType);
    if (file) {
      formData.append('file', file);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${BASE_URL}/resources/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Resource updated successfully!');
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to dashboard after successful edit
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while updating the resource.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="text-dark min-vh-100" style={{ backgroundColor: '#FFC107' }}>
      <div className="container py-5">
        <h2 className="text-center mb-4" style={{ color: '#0c0c0c' }}>
          <i className="fas fa-edit me-2"></i>Edit Resource
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-light shadow" style={{ borderRadius: '15px', background: '#ffffff' }}>
              <div className="card-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label" style={{ fontWeight: 'bold' }}>
                      <i className="fas fa-heading me-2"></i>Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={resource.title}
                      onChange={(e) => setResource({ ...resource, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="year" className="form-label" style={{ fontWeight: 'bold' }}>
                      <i className="fas fa-calendar me-2"></i>Year
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="year"
                      name="year"
                      value={resource.year}
                      onChange={(e) => setResource({ ...resource, year: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subjectCode" className="form-label" style={{ fontWeight: 'bold' }}>
                      <i className="fas fa-book me-2"></i>Subject Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subjectCode"
                      name="subjectCode"
                      value={resource.subjectCode}
                      onChange={(e) => setResource({ ...resource, subjectCode: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="examType" className="form-label" style={{ fontWeight: 'bold' }}>
                      <i className="fas fa-pencil-alt me-2"></i>Exam Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="examType"
                      name="examType"
                      value={resource.examType}
                      onChange={(e) => setResource({ ...resource, examType: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>
                      <i className="fas fa-file-upload me-2"></i>File
                    </label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <label className="custom-file-label" htmlFor="file">
                        {file ? file.name : 'Choose file...'}
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn w-100" style={{ borderRadius: '10px', backgroundColor: '#400158', color: '#fff' }}>
                    <i className="fas fa-upload me-2"></i>Update Resource
                  </button>

                  {message && <p className="mt-3 text-success">{message}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditResource;