// src/components/InstructionsPage.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function InstructionPage() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Get user info if needed

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleStartTest = () => {
    if (isChecked) {
      console.log('Starting test for user:', user?.username || user?.email);
      // Navigate to the actual test component/page
      // Replace '/test' with your actual test route
      navigate('/test');
    } else {
      // This case should ideally not happen due to the button being disabled,
      // but it's good practice to have a fallback.
      alert('Please agree to the instructions before starting the test.');
    }
  };

  // Optional: You could fetch specific instructions based on user.testId if needed
  // useEffect(() => {
  //   if(user?.testId) {
  //      // fetch instructions for user.testId
  //   }
  // }, [user])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">Test Instructions</h1>

        <div className="prose prose-indigo max-w-none text-gray-700 space-y-4 mb-8">
          {/* Using 'prose' class from @tailwindcss/typography for nice text formatting */}
          {/* You might need to install and configure it: npm install -D @tailwindcss/typography */}
          {/* Then add `require('@tailwindcss/typography')` to plugins in tailwind.config.js */}

          <h2 className="text-xl font-semibold">General Instructions:</h2>
          <ul>
            <li>Ensure you have a stable internet connection throughout the test.</li>
            <li>Use a compatible browser (e.g., latest Chrome, Firefox).</li>
            <li>Do not use the browser's back, forward, or refresh buttons during the test. Use the navigation buttons provided within the test interface.</li>
            <li>The test has a time limit. A timer will be displayed on the screen.</li>
            <li>Answer all questions to the best of your ability.</li>
            <li>There might be negative marking for incorrect answers (confirm based on specific test rules).</li>
            <li>Do not engage in any form of malpractice. Your session may be monitored.</li>
          </ul>

          <h2 className="text-xl font-semibold">Specific Test Guidelines (Examples):</h2>
          <p>These may vary based on the test you are taking (e.g., Aptitude, JEE, NEET, etc.).</p>
          <ul>
            <li>**Aptitude Tests:** Typically cover quantitative ability, logical reasoning, verbal ability, etc. Manage your time across different sections.</li>
            <li>**JEE/NEET:** Follow the specific syllabus and marking scheme provided. Pay attention to physics, chemistry, maths/biology sections. Calculators might be allowed/disallowed based on rules.</li>
            <li>**Common Entrance Tests:** Understand the sections, number of questions, and time allocation per section.</li>
          </ul>

          <h2 className="text-xl font-semibold">Before You Start:</h2>
          <ul>
            <li>Close all other applications and browser tabs.</li>
            <li>Ensure your device is charged or connected to a power source.</li>
            <li>Find a quiet environment free from distractions.</li>
          </ul>

          <p className="font-semibold text-red-600">Important: Once you start the test, you cannot pause it. Ensure you are ready before proceeding.</p>
        </div>

        {/* --- Agreement Checkbox --- */}
        <div className="mt-8 border-t pt-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agree"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="agree" className="ml-3 block text-sm md:text-base text-gray-800 font-medium cursor-pointer">
              I have read, understood, and agree to abide by all the instructions mentioned above.
            </label>
          </div>
        </div>

        {/* --- Start Test Button --- */}
        <div className="mt-8 text-center">
          <button
            onClick={handleStartTest}
            disabled={!isChecked} // Button is disabled if isChecked is false
            className={`px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
              !isChecked
                ? 'bg-gray-400 cursor-not-allowed' // Style for disabled state
                : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer' // Style for enabled state
            }`}
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructionPage;