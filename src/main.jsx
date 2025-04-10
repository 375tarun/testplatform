// src/index.js (or App.js depending on your setup)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// No GoogleOAuthProvider needed
import App from './App';
import { store } from './redux/store';
import './index.css'; // Make sure Tailwind CSS is imported

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* No GoogleOAuthProvider wrapper */}
      <App />
    </Provider>
  </React.StrictMode>
);