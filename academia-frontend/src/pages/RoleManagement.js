import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/config';
// Import Bootstrap CSS

const RoleManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/auth/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter((user) =>
        user.username.toLowerCase().includes(query)
      )
    );
  };

  const updateRole = async (userId, role) => {
    try {
      await axios.put(
        `${BASE_URL}/auth/update-role/${userId}`,
        { role },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Role updated successfully');
      setUsers(users.map(user => (user._id === userId ? { ...user, role } : user)));
      setFilteredUsers(filteredUsers.map(user => (user._id === userId ? { ...user, role } : user)));
    } catch (err) {
      alert('Failed to update role');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Role Management</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by username"
        value={searchQuery}
        onChange={handleSearch}
      />
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <select
                  className="form-select"
                  value={user.role}
                  onChange={e => updateRole(user._id, e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;