import React, { useState, useEffect } from 'react';  // Import useState and useEffect from React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Upload3DModel from './components/Upload3DModel';
import Viewer from './components/Viewer';
import ProtectedRoute from './components/ProtectedRoute';  // You will need to create this component

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(!!localStorage.getItem('token'));
  }, []);

  return (
    <Router>
      <Navbar auth={auth} setAuth={setAuth} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<h2 className="text-center mt-4">Welcome to 3D Viewer App</h2>} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path="/upload" 
          element={
            <ProtectedRoute auth={auth}>
              <Upload3DModel />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/viewer" 
          element={
            <ProtectedRoute auth={auth}>
              <Viewer />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
