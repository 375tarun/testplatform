// src/components/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// Removed Google imports

import {
  loginUser,
  logout,
  clearError,
} from '../redux/slices/authSlice'; // Removed Google-related actions

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get navigate function
  // Removed Google-specific state selectors
  const { isLoading, error, user } = useSelector((state) => state.auth);

  // Local state for form fields - email is now managed locally
  const [formData, setFormData] = useState({
    username: '',
    email: '', // Now user-editable
    gender: '',
    phoneNumber: '',
    candidateId: '',
    testId: '',
    testPassword: '',
  });

  // No useEffect needed to sync email from Google state

  // Effect to clear form on successful login (optional) or on logout
  useEffect(() => {
    if (user) {
      // User object exists, meaning login was successful
      console.log("Login successful, navigating to instructions...");

      // Navigate to the instructions page
      // 'replace: true' is optional, prevents going back to login page via browser back button
      navigate('/instructions', { replace: true });

      // Optionally clear form immediately after navigation trigger
      // Although the component might unmount anyway upon navigation
       setFormData({
         username: '', email: '', gender: '', phoneNumber: '',
         candidateId: '', testId: '', testPassword: '',
       });
    }
    // We don't need to clear form here if navigating away
    // else { // Reset form if user logs out or on initial load (if not logged in)
    //   setFormData({ /* ... initial empty state ... */ });
    // }
  }, [user, navigate]); // Add navigate to dependency array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Now handles email input normally
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing again
    if (error) {
        dispatch(clearError());
    }
  };

  // Removed Google handlers (handleGoogleSuccess, handleGoogleFailure)

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError()); // Clear previous errors before new submission

    // Basic validation (add more robust validation as needed)
    const requiredFields = ['username', 'email', 'gender', 'phoneNumber', 'candidateId', 'testId', 'testPassword'];
    const emptyField = requiredFields.find(field => !formData[field]);

    if (emptyField) {
        // Dispatch a generic error or set a local validation error state
        dispatch({ type: 'auth/loginUser/rejected', payload: `Please fill in the '${emptyField}' field.` });
        return;
    }

    // Optional: Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
         dispatch({ type: 'auth/loginUser/rejected', payload: 'Please enter a valid email address.' });
         return;
    }


    console.log('Submitting form data:', formData);
    // Dispatch the async thunk with the form data
    dispatch(loginUser(formData));
  };

  const handleLogout = () => {
    dispatch(logout());
    // Navigate back to login after logout
    navigate('/login', { replace: true });
  }


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Candidate Login</h2>

        {/* Display login error */}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded text-sm">{error}</div>}

        {/* Conditional rendering: Show form or success message */}
        {user ? (
          <div className="text-center">
             <p className="text-green-600 font-semibold text-lg">Login Successful!</p>
             {/* Display user info if available in the 'user' object from backend */}
             <p>Welcome, {user.username || user.email || 'Candidate'}!</p>
             {/* Add more details if needed */}
             <button
                onClick={handleLogout}
                className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
                Logout
            </button>
          </div>
        ) : (
          // --- Login Form Section (Always visible if not logged in) ---
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Choose a username"
              />
            </div>

            {/* Email (Now Editable) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange} // Now editable
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" // Removed readOnly styles
                placeholder="your.email@example.com"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., 9876543210"
              />
            </div>

            {/* Candidate ID */}
            <div>
              <label htmlFor="candidateId" className="block text-sm font-medium text-gray-700 mb-1">Candidate ID</label>
              <input
                type="text"
                id="candidateId"
                name="candidateId"
                value={formData.candidateId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Provided by Admin"
              />
            </div>

            {/* Test ID */}
            <div>
              <label htmlFor="testId" className="block text-sm font-medium text-gray-700 mb-1">Test ID</label>
              <input
                type="text"
                id="testId"
                name="testId"
                value={formData.testId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Provided by Admin"
              />
            </div>

            {/* Test Password */}
            <div>
              <label htmlFor="testPassword" className="block text-sm font-medium text-gray-700 mb-1">Test Password</label>
              <input
                type="password"
                id="testPassword"
                name="testPassword"
                value={formData.testPassword}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Provided by Admin"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading} // Disable only when loading
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading
                    ? 'bg-indigo-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } transition duration-150 ease-in-out`}
              >
                {isLoading ? 'Verifying...' : 'Login & Verify Details'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;