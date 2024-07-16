
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './Login';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Login />; 
};

export default ProtectedRoute;
