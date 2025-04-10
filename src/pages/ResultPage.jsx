
// src/pages/ResultPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions, testName } = location.state || {};
  
  // Calculate percentage
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Determine pass/fail status (example threshold: 70%)
  const passed = percentage >= 70;
  
  if (!score && score !== 0) {
    // If results data is missing, redirect to home
    return <div className="p-8 text-center">No test results found. Redirecting...</div>;
  }
  
  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold">Test Results</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl text-center mt-8">
        <h2 className="text-2xl font-bold mb-4">{testName}</h2>
        
        <div className="flex justify-center my-8">
          <div className={`w-40 h-40 rounded-full flex items-center justify-center text-4xl font-bold
            ${passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
          `}>
            {percentage}%
          </div>
        </div>
        
        <div className="mb-8">
          <p className="mb-2">Questions Attempted: {score}</p>
          <p className="mb-2">Total Questions: {totalQuestions}</p>
          <p className="font-bold">Result: {passed ? 'PASSED' : 'FAILED'}</p>
        </div>
        
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-3 bg-gray-600 text-white rounded font-medium hover:bg-gray-700"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
          
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
            onClick={() => {
              // Implementation for test review functionality
              alert("Review functionality to be implemented");
            }}
          >
            Review Answers
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;