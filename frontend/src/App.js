
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MasterList from './components/MasterList';
import ServiceList from './components/ServiceList';
import AddMaster from './components/AddMaster';
import AddService from './components/AddService';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/masters" element={<MasterList />} />
            <Route path="/services" element={<ServiceList />} />
            <Route
              path="/add-master"
              element={
                <ProtectedRoute>
                  <AddMaster />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/add-service"
              element={
                <ProtectedRoute>
                  <AddService />
                </ProtectedRoute>
              } 
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
