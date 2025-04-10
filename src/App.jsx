// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // To check login status

import LoginPage from "./pages/LoginPage";
import InstructionPage from "./pages/InstructionPage";
import TestPage from "./components/test/TestPage";
import ResultsPage from "./pages/ResultPage";

// A simple Protected Route Component
function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth); // Check if user is logged in

  if (!user) {
    // If not logged in, redirect to the login page
    // 'replace' prevents the protected route from being added to history
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the child component (InstructionPage, TestPage, etc.)
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Instructions Route - Protected */}
          <Route
            path="/instructions"
            element={
              // <ProtectedRoute>
                <InstructionPage />
              // </ProtectedRoute>
            }
          />

          {/* Test Route - Protected */}
          <Route
            path="/test"
            element={
              // <ProtectedRoute>
                <TestPage />
              // </ProtectedRoute>
            }
          />

          {/* Results Route - Protected */}
          <Route
            path="/results"
            element={
              // <ProtectedRoute>
                <ResultsPage />
              // </ProtectedRoute>
            }
          />

          {/* Default Route */}
          {/* If user lands on root '/', redirect to login or instructions based on auth status */}
          <Route path="/" element={<NavigateOnAuth />} />

          {/* Optional: Catch-all route for 404 Not Found */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Helper component to handle navigation from root path '/'
function NavigateOnAuth() {
  const { user } = useSelector((state) => state.auth);
  // If user exists, go to instructions, otherwise go to login
  return user ? (
    <Navigate to="/instructions" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default App;