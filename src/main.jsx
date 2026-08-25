import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Firebase authorizes `localhost` by default, but treats 127.0.0.1 as a
// different domain. Keep local OAuth on the configured hostname.
if (window.location.hostname === '127.0.0.1') {
  const localUrl = new URL(window.location.href);
  localUrl.hostname = 'localhost';
  window.location.replace(localUrl.toString());
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
