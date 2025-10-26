import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function scrollToHash(hash){
  if(!hash) { window.scrollTo({top:0,behavior:'smooth'}); return }
  const id = hash.replace('#','')
  const el = document.getElementById(id)
  if(el){
    const y = el.getBoundingClientRect().top + window.scrollY - 90 // offset for sticky header
    window.scrollTo({top: y, behavior: 'smooth'})
  }
}

export default function Header(){
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const loc = useLocation()

  useEffect(()=>{
    const onScroll = ()=> setScrolled(window.scrollY>30)
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])

  useEffect(()=> setMobileOpen(false), [loc.pathname])

  return (
    <header className={scrolled ? 'site-header sticky navy' : 'site-header navy'}>
      <div className="wrap header-inner">
        <div className="logo"><Link to="/" className="logo-link">CloudKitchen</Link></div>
        <nav className="nav" aria-label="Main navigation">
          <a href="/#home" onClick={(e)=>{e.preventDefault(); if(loc.pathname!=='/') window.location.href='/' + '#home'; else scrollToHash('#home')}}>Home</a>
          <a href="/#our-brands" onClick={(e)=>{e.preventDefault(); if(loc.pathname!=='/') window.location.href='/' + '#our-brands'; else scrollToHash('#our-brands')}}>Our Brands</a>
          <a href="/#about-us" onClick={(e)=>{e.preventDefault(); if(loc.pathname!=='/') window.location.href='/' + '#about-us'; else scrollToHash('#about-us')}}>About Us</a>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/franchise">Franchise</Link>
        </nav>
        <div className="nav-right">
          <Link to="/menu" className="btn">Menu & Order</Link>
          <button className="mobile-toggle" onClick={()=>setMobileOpen(s=>!s)} aria-label="Toggle navigation">☰</button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-drawer">
          <a href="#home" onClick={(e)=>{e.preventDefault(); scrollToHash('#home')}}>Home</a>
          <a href="#our-brands" onClick={(e)=>{e.preventDefault(); scrollToHash('#our-brands')}}>Our Brands</a>
          <a href="#about-us" onClick={(e)=>{e.preventDefault(); scrollToHash('#about-us')}}>About Us</a>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/franchise">Franchise</Link>
        </div>
      )}
    </header>
  )
}