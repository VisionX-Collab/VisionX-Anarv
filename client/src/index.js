import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS CSS

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800, // Animation duration in milliseconds
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);