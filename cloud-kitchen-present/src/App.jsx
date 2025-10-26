// src/App.jsx
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom' // CRITICAL: Import useLocation

// --- Component Imports ---
import Header from './components/Header'
import Footer from './components/Footer'

// --- Page Imports (All must come from './pages/...') ---
import Home from './pages/Home'
import Brands from './pages/Brands'
import Menu from './pages/Menu'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Franchise from './pages/Franchise'
import AdminDashboard from './pages/AdminDashboard' 
import AdminLogin from './pages/AdminLogin' 

export default function App(){
  const location = useLocation(); // Initialize useLocation

  return (
    <div className="site">
      <Header />
      <main className="site-main">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home/>} />
          <Route path="/brands" element={<Brands/>} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/franchise" element={<Franchise/>} />
          
          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin/>} /> 
          
          {/* FIX: Use key={location.key} to FORCE component re-render on every visit */}
          <Route 
            path="/admin-dashboard" 
            element={<AdminDashboard />} 
            key={location.key} 
          /> 
        </Routes>
      </main>
      <Footer />
    </div>
  )
}