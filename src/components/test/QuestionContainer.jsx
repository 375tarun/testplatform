
// src/components/test/QuestionContainer.jsx
import React from "react";

const QuestionContainer = ({ 
  question, 
  selectedOption,
  onAnswerSelect,
  onPrevious,
  onNext,
  onSaveAndNext,
  isFirstQuestion,
  isLastQuestion
}) => {
  return (
    <div className="flex-1 p-8 bg-white m-4 rounded-lg shadow flex flex-col overflow-y-auto">
      <div className="mb-8">
        <h3 className="text-xl font-medium">{question.text}</h3>
      </div>
      
      <div className="mb-8">
        {question.options.map((option) => (
          <div 
            key={option.id}
            className={`flex items-center p-4 mb-2 border rounded-md cursor-pointer transition-all
              ${selectedOption === option.id ? 'bg-blue-50 border-blue-500' : 'border-gray-200 hover:bg-gray-50'}
            `}
            onClick={() => onAnswerSelect(question.id, option.id)}
          >
            <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center
              ${selectedOption === option.id ? 'border-blue-500' : 'border-gray-500'}
            `}>
              {selectedOption === option.id && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
            </div>
            <div>{option.text}</div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-auto">
        <button 
          className={`px-5 py-2 rounded font-medium
            ${isFirstQuestion ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
          `}
          onClick={onPrevious}
          disabled={isFirstQuestion}
        >
          Previous
        </button>
        
        <button 
          className="px-5 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700"
          onClick={onSaveAndNext}
        >
          Save & Next
        </button>
        
        <button 
          className={`px-5 py-2 rounded font-medium
            ${isLastQuestion ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
          `}
          onClick={onNext}
          disabled={isLastQuestion}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionContainer;