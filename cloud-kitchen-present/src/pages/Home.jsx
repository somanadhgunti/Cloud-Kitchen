// src/pages/Home.jsx (Vite Adjusted)
import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import BrandCard from '../components/BrandCard'; 

const API_URL = import.meta.env.VITE_API_BASE_URL; // VITE adjustment
const HERO_IMAGE = 'https://images.unsplash.com/photo-1546069901-eacef0df6022?q=80&w=1600&auto=format&fit=crop' 

export default function Home(){
    const [brands, setBrands] = useState([]); 
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/brands`);
                setBrands(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch brands:", error);
                setLoading(false);
            }
        };
        fetchBrands();
    }, []);

    if (loading) {
        return <div style={{textAlign: 'center', padding: '100px'}}>Loading Brands...</div>;
    }

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
                        <div className="hero-auth-links" style={{marginTop: '20px', display: 'flex', gap: '15px'}}>
                            <Link to="/admin-login" className="btn-sec">
                                Admin Login
                            </Link>
                            <Link to="/user-login" className="btn-sec">
                                User Login
                            </Link>
                        </div>
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
                    {brands.map(b=> <BrandCard key={b.brandId} brand={b} />)}
                </div>
            </section>

            <section id="about-us" className="wrap section" data-section="about">
                <h2>About Us</h2>
                {/* ... (rest of About Us section remains the same) ... */}
            </section>
        </div>
    )
}