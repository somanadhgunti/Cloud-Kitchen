// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom' 
import App from './App.jsx'
import './styles.css' 

import { AuthProvider } from './context/AuthContext.jsx' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AuthProvider must wrap the Router */}
    <AuthProvider> 
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
)