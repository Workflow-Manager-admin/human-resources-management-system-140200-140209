import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Allocations from "./pages/Allocations";
import "./App.css";

// THEME CONFIGURATION
const THEME_COLORS = {
  // Primary, accent, secondary as requested
  primary: "#1976d2",
  accent: "#fbc02d",
  secondary: "#424242",
  bg: "#fff",
  text: "#282c34",
  sidebar: "#f5f7fa",
};

function App() {
  const [theme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Router>
      <div className="hrm-root">
        <Sidebar />
        <div className="hrm-main-content-area">
          <TopBar />
          <main className="hrm-page-container">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees/*" element={<Employees />} />
              <Route path="/clients/*" element={<Clients />} />
              <Route path="/projects/*" element={<Projects />} />
              <Route path="/allocations/*" element={<Allocations />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
