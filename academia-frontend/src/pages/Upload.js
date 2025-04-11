import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/config';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    subjectCode: '',
    examType: '',
    file: null,
  });

  const [message, setMessage] = useState('');
  const [showExamTypeSuggestions, setShowExamTypeSuggestions] = useState(false);
  const [showYearSuggestions, setShowYearSuggestions] = useState(false);

  const examTypeSuggestions = ['CAT-1', 'CAT-2', 'CAT-3', 'Model'];
  const currentYear = new Date().getFullYear();
  const yearSuggestions = [currentYear, currentYear - 1, currentYear - 2];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // Hide suggestions when user types
    if (name === 'examType') {
      setShowExamTypeSuggestions(true);
    } else if (name === 'year') {
      setShowYearSuggestions(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to upload resources.');
      return;
    }

    const { title, year, subjectCode, examType, file } = formData;

    if (!title || !year || !subjectCode || !examType || !file) {
      setMessage('All fields are required.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', title);
    formDataToSend.append('year', year);
    formDataToSend.append('subjectCode', subjectCode);
    formDataToSend.append('examType', examType);
    formDataToSend.append('file', file);

    try {
      const response = await axios.post(`${BASE_URL}/resources/upload`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setFormData({
        title: '',
        year: '',
        subjectCode: '',
        examType: '',
        file: null,
      });
      setShowExamTypeSuggestions(false);
      setShowYearSuggestions(false);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred while uploading the resource.');
    }
  };

  const selectExamType = (type) => {
    setFormData({ ...formData, examType: type });
    setShowExamTypeSuggestions(false);
  };

  const selectYear = (year) => {
    setFormData({ ...formData, year: year });
    setShowYearSuggestions(false);
  };

  return (
    <div className="text-dark min-vh-100" style={{ backgroundColor: '#FFC107' }}>
      <div className="container py-5" >
        <h2 className="text-center mb-4">
          <i className="fas fa-cloud-upload-alt me-2"></i>Upload a Resource
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-8" >
            <div className="card border-light shadow" style={{ borderRadius: '15px', background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
              <div className="card-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      <i className="fas fa-heading me-2"></i>Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="year" className="form-label">
                      <i className="fas fa-calendar me-2"></i>Year
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="year"
                      name="year"
 value={formData.year}
                      onChange={handleChange}
                      onFocus={() => setShowYearSuggestions(true)}
                      required
                    />
                    {showYearSuggestions && (
                      <ul className="list-group">
                        {yearSuggestions.map((year) => (
                          <li key={year} className="list-group-item" onClick={() => selectYear(year)}>
                            {year}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subjectCode" className="form-label">
                      <i className="fas fa-book me-2"></i>Subject Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subjectCode"
                      name="subjectCode"
                      value={formData.subjectCode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="examType" className="form-label">
                      <i className="fas fa-pencil-alt me-2"></i>Exam Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="examType"
                      name="examType"
                      value={formData.examType}
                      onChange={handleChange}
                      onFocus={() => setShowExamTypeSuggestions(true)}
                      required
                    />
                    {showExamTypeSuggestions && (
                      <ul className="list-group">
                        {examTypeSuggestions.map((type) => (
                          <li key={type} className="list-group-item" onClick={() => selectExamType(type)}>
                            {type}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-file-upload me-2"></i>File
                    </label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="file"
                        name="file"
                        onChange={handleChange}
                        required
                      />
                      <label className="custom-file-label" htmlFor="file">
                        {formData.file ? formData.file.name : 'Choose file...'}
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn w-100" style={{ borderRadius: '10px', backgroundColor: '#400158', color: '#fff' }}>
                    <i className="fas fa-upload me-2"></i>Upload
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

export default Upload;