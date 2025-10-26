// src/pages/Home.jsx
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import BrandCard from '../components/BrandCard' 
import { BRANDS, HERO_IMAGE } from '../data/mock'

export default function Home(){
  useEffect(()=>{
    document.title = 'CloudKitchen — Home'
    const m = document.querySelector('meta[name="description"]')
    if(m) m.setAttribute('content','CloudKitchen — Multi-brand operations, inventory tracking, order aggregation and delivery optimization.')
  },[])

  return (
    <div>
      <section id="home" className="hero hero-elite" data-section="home">
        <div className="hero-bg" aria-hidden style={{backgroundImage:`url(${HERO_IMAGE})`}}></div>
        <div className="wrap hero-inner">
          <div className="hero-left">
            <div className="eyebrow">Premium Cloud Kitchens</div>
            <h1>Scale Food Brands with<br/>CloudKitchen</h1>
            <p className="lead">Operate multiple brands, aggregate orders from all channels, track inventory, and optimize deliveries — all in one elegant platform.</p>
            <div className="hero-ctas">
              <Link to="/menu" className="btn">Order Now</Link>
              <Link to="/franchise" className="btn-sec">Franchise With Us</Link>
            </div>
            
            {/* --- ADMIN & USER LOGIN BUTTONS (Style Fix) --- */}
            <div className="hero-auth-links" style={{marginTop: '20px', display: 'flex', gap: '15px'}}>
              <Link to="/admin-login" className="btn-sec">
                Admin Login
              </Link>
              <Link to="/user-login" className="btn-sec">
                User Login
              </Link>
            </div>
            {/* ------------------------------------------- */}

            <div className="trust">
              <div><strong>120+</strong><span>Outlets</span></div>
              <div><strong>15</strong><span>Brands</span></div>
              <div><strong>25k</strong><span>Deliveries / mo</span></div>
            </div>
          </div>
          <div className="hero-right">
            <div className="device-mockup">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop" alt="Delicious food" />
            </div>
          </div>
        </div>
      </section>

      <section id="our-brands" className="wrap section" data-section="brands">
        <h2>Our Brands</h2>
        <p className="muted">A curated family of concepts ready to scale.</p>
        <div className="brands-grid">
          {BRANDS.map(b=> <BrandCard key={b.id} brand={b} />)}
        </div>
      </section>

      <section id="about-us" className="wrap section" data-section="about">
        <h2>About Us</h2>
        <div className="grid-2">
          <div className="card">
            <h3>Our Mission</h3>
            <p className="muted">We build reliable operations and tech to help food brands thrive in delivery-first markets.</p>
            <h4>What we do</h4>
            <ul>
              <li>Kitchen operations & training</li>
              <li>Order aggregation & POS integration</li>
              <li>Inventory management & supplier network</li>
              <li>Delivery optimization & rider network</li>
            </ul>
          </div>
          <div className="card">
            <h3>How it works</h3>
            <ol>
              <li>Start with a pilot kitchen</li>
              <li>Integrate menus and channels</li>
              <li>Optimize operations and scale</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  )
}