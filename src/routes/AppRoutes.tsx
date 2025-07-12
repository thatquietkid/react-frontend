import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Inventory from '../pages/Inventory';
import ResourceScheduler from '../pages/ResourceScheduler';
import Users from '../pages/Users';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { useAuth } from '../context/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
      <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/inventory" element={isAuthenticated ? <Inventory /> : <Navigate to="/login" />} />
      <Route path="/resources" element={isAuthenticated ? <ResourceScheduler /> : <Navigate to="/login" />} />
      <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />
      <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
      <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;