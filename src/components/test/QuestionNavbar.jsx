
// src/components/test/QuestionNavbar.jsx
import React from "react";

const QuestionNavbar = ({ 
  totalQuestions, 
  currentQuestion, 
  answers, 
  goToQuestion,
  onSubmitTest
}) => {
  return (
    <div className="w-56 bg-white p-4 border-r border-gray-200 flex flex-col justify-between overflow-y-auto">
      <div className="flex flex-wrap gap-2 mb-4">
        {Array(totalQuestions).fill().map((_, index) => {
          const questionId = index + 1;
          const isCurrentQuestion = currentQuestion === questionId;
          const isAnswered = answers[questionId] !== undefined;
          
          return (
            <div 
              key={index}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer
                ${isCurrentQuestion ? 'bg-blue-500 text-white' : ''}
                ${isAnswered && !isCurrentQuestion ? 'bg-green-500 text-white' : ''}
                ${!isAnswered && !isCurrentQuestion ? 'bg-gray-200' : ''}
              `}
              onClick={() => goToQuestion(index)}
            >
              {questionId}
            </div>
          );
        })}
      </div>
      
      <button 
        className="py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors mt-auto"
        onClick={onSubmitTest}
      >
        Submit Test
      </button>
    </div>
  );
};

export default QuestionNavbar;