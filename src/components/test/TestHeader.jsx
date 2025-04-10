
// src/components/test/TestHeader.jsx
import React from "react";

const TestHeader = ({ testName, testId, timeLeft, userName }) => {
  // Format time left
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow-md h-20">
      <div className="test-info">
        <h2 className="text-xl font-bold">{testName}</h2>
        <p className="text-sm text-gray-600">Test ID: {testId}</p>
      </div>
      
      <div className="user-info">
        <p className="text-sm font-medium">Candidate: {userName}</p>
      </div>
      
      <div className="timer">
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md">
          <span className="mr-2">⏱️</span>
          <span className="text-red-600 text-xl font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>
    </div>
  );
};

export default TestHeader;
