import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Penting: Memuat CSS Bootstrap dari CDN untuk memastikan gaya berfungsi
// Jika Anda menjalankan ini di lingkungan lokal, Anda dapat menggunakan:
// import 'bootstrap/dist/css/bootstrap.min.css';
const loadBootstrapCSS = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
  link.integrity = 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

loadBootstrapCSS();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);