import Admin from "modules/admin/Admin";
import Auth from "modules/auth/Auth";
import Public from "modules/public/Public";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/*" element={<Public />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
