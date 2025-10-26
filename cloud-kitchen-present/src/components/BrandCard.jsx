import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandCard({ brand }) {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0px', 
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    height: '250px',
    textDecoration: 'none',
    color: 'inherit', 
    
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2)), url(${brand.img})`,
    
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    position: 'relative',
  };

  const textBackgroundDivStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    padding: '15px 20px', 
    borderRadius: '0 0 8px 8px',
    textAlign: 'left',
    minHeight: '120px', 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'flex-start', 
    width: '100%'
  };

  const brandNameStyle = {
    margin: '0 0 5px 0',
    fontSize: '1.5rem',
    color: '#1a1a1a', 
    fontWeight: 'bold', 
  };
  
  const descStyle = {
    margin: '0 0 10px 0',
    fontSize: '0.9rem',
    color: '#333', 
    flexGrow: 1, 
  };
  
  const menuLinkStyle = {
    color: '#6a0dad', 
    fontWeight: 'bold',
    textDecoration: 'underline',
    display: 'inline-block',
    marginTop: '5px',
    fontSize: '0.95rem',
  };

  return (
    <Link to={`/menu?brand=${brand.id}`} className="brand-card" style={cardStyle}>
      <div style={textBackgroundDivStyle}>
        <h3 style={brandNameStyle}>
          {brand.name}
        </h3>
        
        <p style={descStyle}>
          {brand.desc}
        </p> 
        
        <span style={menuLinkStyle} className="view-menu">
          View Menu
        </span>
      </div>
    </Link>
  );
}