
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Login from './Login';

const AddService = () => {
  const { isAuthenticated } = useAuth();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [manager, setManager] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/services', {
        name,
        address,
        manager,
      });
      alert('Service added successfully');
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Failed to add service');
    }
  };

  return isAuthenticated ? ( 
    <div>
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Manager"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          required
        />
        <button type="submit">Add Service</button>
      </form>
    </div>
  ) : (
    <Login />
  );
};

export default AddService;
