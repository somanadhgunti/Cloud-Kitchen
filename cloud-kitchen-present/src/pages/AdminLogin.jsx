// src/pages/AdminLogin.jsx (Vite Adjusted)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

export default function AdminLogin() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isAdminLoggedIn, login } = useAuth(); 
    
    // --- Style constants (Defined here for clarity) ---
    const containerStyle = {
        padding: '80px 10%', display: 'flex', justifyContent: 'center', 
        alignItems: 'center', minHeight: '80vh', backgroundColor: '#f4f4f9',
    };
    const formStyle = { 
        backgroundColor: 'white', padding: '40px', borderRadius: '8px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', width: '100%', 
        maxWidth: '400px', textAlign: 'center', 
    };
    const inputStyle = {
        width: '100%', padding: '10px', margin: '10px 0', 
        borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box',
    };
    const buttonStyle = {
        width: '100%', padding: '12px', backgroundColor: '#5e35b1', 
        color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', 
        marginTop: '20px', fontSize: '1rem',
    };
    // --- End Style Constants ---
    
    const handleSubmit = async (e) => { 
        e.preventDefault();
        setError(''); 

        try {
            await login(email, password); 
            navigate('/admin-dashboard');
        } catch (err) {
            setError(err.message || 'Login failed. Please check credentials.'); 
        }
    };
    
    if (isAdminLoggedIn) {
        return (
            <div style={containerStyle}>
                <div style={formStyle}>
                    <h2>Already Logged In</h2>
                    <p style={{marginBottom: '20px'}}>You are already logged in as an administrator.</p>
                    <Link to="/admin-dashboard" 
                            style={{
                                ...buttonStyle, 
                                textDecoration: 'none', 
                                display: 'block', 
                                backgroundColor: '#4caf50' 
                            }}>
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        );
    }
    
    return (
        <div style={containerStyle}>
            <div style={formStyle}>
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email (admin@cloudkitchen.com)" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password (password123)" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    {error && <p style={{color: 'red', marginTop: '15px'}}>{error}</p>}
                    <button type="submit" style={buttonStyle}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}