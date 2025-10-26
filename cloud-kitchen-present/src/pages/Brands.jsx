import React from "react";
// 1. IMPORT the BRANDS array from your mock file
import { BRANDS } from '../data/mock'; 

// You can create a BrandCard component here for cleaner code, but 
// for a direct fix, we will keep the structure similar to your original code.

export default function Brands() {
  return (
    <div style={{ padding: "80px 10%", textAlign: "center" }}>
      <h1 style={{ color: "#d4af37", fontSize: "2.5rem", marginBottom: "30px" }}>Our Brands</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {/* 2. Map over the imported BRANDS array instead of the hardcoded brandsList */}
        {BRANDS.map((brand) => (
          <div
            // Use brand.id as the key if it exists, otherwise use a combination of id and name
            key={brand.id} 
            style={{
              width: "250px",
              background: "#001f3f",
              borderRadius: "12px",
              overflow: "hidden",
              color: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            {/* 3. Use brand.img (image path from mock.js) */}
            <img 
              src={brand.img} 
              alt={brand.name} 
              style={{ width: "100%", height: "180px", objectFit: "cover" }} 
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "10px 0" }}>{brand.name}</h3>
              {/* 4. Use brand.desc for the tagline/description */}
              <p style={{ fontSize: "0.9rem", color: "#ccc" }}>{brand.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}