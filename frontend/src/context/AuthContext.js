
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      axios.get('http://localhost:5000/api/auth/me', { headers: { 'x-auth-token': token } }) //pakeista iš pradžioje netikrinama būsena į patikrinimą su axios
        .then(response => {
          setUser(response.data.user);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem('token');
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setIsAuthenticated(true);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      setIsAuthenticated(true);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
