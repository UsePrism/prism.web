import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import PublicLayout from './layouts/publicLayout';
import AuthLayout from 'layouts/authLayout';
import AdminLayout from 'layouts/adminLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/*" element={<PublicLayout />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
