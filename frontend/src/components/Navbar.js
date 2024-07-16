
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <h1>Auto Servisas</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/masters">Masters</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/add-master">Add Master</Link></li>
        <li><Link to="/add-service">Add Service</Link></li>
        {isAuthenticated ? ( 
          <>
            <li><button onClick={handleLogout}>Logout</button></li>
            <li>Welcome, {user?.email}</li>
          </>
        ) : (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
