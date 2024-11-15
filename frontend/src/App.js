// frontend/src/App.js

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import { setAuthToken } from "./services/apiService";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
    return true;
  }
  return false;
};

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          // element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />}
          element={<Dashboard />}
        />
      </Routes>
    </Router>
  );
};

export default App;
