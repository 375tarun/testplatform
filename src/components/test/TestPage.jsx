// src/components/test/TestPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TestHeader from "./TestHeader";
import QuestionNavbar from "./QuestionNavbar";
import QuestionContainer from "./QuestionContainer";

const TestPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [testCompleted, setTestCompleted] = useState(false);
  
  // Example test data - replace with your actual data from API or state
  const testData = {
    testId: "TEST001",
    testName: "Sample Assessment Test",
    totalQuestions: 20,
    duration: 60, // minutes
    questions: Array(20).fill().map((_, i) => ({
      id: i + 1,
      text: `Question ${i + 1}: This is a sample question text that would be replaced with actual question content.`,
      options: [
        { id: `q${i + 1}_a`, text: "Option A" },
        { id: `q${i + 1}_b`, text: "Option B" },
        { id: `q${i + 1}_c`, text: "Option C" },
        { id: `q${i + 1}_d`, text: "Option D" }
      ]
    }))
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !testCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !testCompleted) {
      handleSubmitTest();
    }
  }, [timeLeft, testCompleted]);

  const handleAnswerSelect = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId
    });
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < testData.totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSaveAndNext = () => {
    // Save logic would be here if needed
    handleNext();
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitTest = () => {
    setTestCompleted(true);
    
    // Calculate score - this is just an example
    const score = Object.keys(answers).length;
    
    // Navigate to results page with state
    navigate("/results", { 
      state: { 
        answers,
        score,
        totalQuestions: testData.totalQuestions,
        testName: testData.testName
      } 
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <TestHeader 
        testName={testData.testName}
        testId={testData.testId}
        timeLeft={timeLeft}
        userName="John Doe" // Replace with actual user data
      />
      
      <div className="flex flex-1 overflow-hidden">
        <QuestionNavbar 
          totalQuestions={testData.totalQuestions}
          currentQuestion={currentQuestionIndex + 1}
          answers={answers}
          goToQuestion={goToQuestion}
          onSubmitTest={handleSubmitTest}
        />
        
        <QuestionContainer 
          question={testData.questions[currentQuestionIndex]}
          selectedOption={answers[testData.questions[currentQuestionIndex].id]}
          onAnswerSelect={handleAnswerSelect}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSaveAndNext={handleSaveAndNext}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={currentQuestionIndex === testData.totalQuestions - 1}
        />
      </div>
    </div>
  );
};

export default TestPage;