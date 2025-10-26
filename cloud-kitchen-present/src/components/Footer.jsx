import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer
      style={{
        background:
          "linear-gradient(90deg, #001f3f, #0b305a)", // Elegant navy gradient
        color: "white",
        padding: "40px 10%",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Company Info */}
        <div style={{ flex: "1 1 250px" }}>
          <h3 style={{ color: "#d4af37" }}>Cloud Kitchen Management</h3>
          <p>
           Smart kitchens. Smarter deliveries.
Manage everything — brands, orders, and growth — from one dashboard.
          </p>
        </div>

        {/* Contact Info */}
        <div style={{ flex: "1 1 250px" }}>
          <h4 style={{ color: "#d4af37" }}>Contact Us</h4>
          <p>
            <FaWhatsapp style={{ color: "#25D366", marginRight: "10px" }} />
            <a
              href="https://wa.me/919000000000"
              style={{ color: "white", textDecoration: "none" }}
              target="_blank"
            >
              +91 98452 35264
            </a>
          </p>
          <p>
            <MdEmail style={{ color: "#ffb347", marginRight: "10px" }} />
            <a
              href="mailto:info@cloudkitchen.com"
              style={{ color: "white", textDecoration: "none" }}
            >
              info@cloudkitchen.com
            </a>
          </p>
        </div>

        {/* Social Media */}
        <div style={{ flex: "1 1 200px" }}>
          <h4 style={{ color: "#d4af37" }}>Follow Us</h4>
          <div
            style={{
              display: "flex",
              gap: "15px",
              fontSize: "1.5rem",
              marginTop: "10px",
            }}
          >
            <a
              href="https://facebook.com"
              target="_blank"
              style={{ color: "white" }}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              style={{ color: "white" }}
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              style={{ color: "white" }}
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <hr
        style={{
          margin: "30px 0",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      />

      <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#ccc" }}>
        © 2025 Cloud Kitchen Management | Designed with for Food Innovation
      </p>
    </footer>
  );
}
