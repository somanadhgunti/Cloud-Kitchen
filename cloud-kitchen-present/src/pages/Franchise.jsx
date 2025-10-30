// src/pages/Franchise.jsx (Vite Adjusted)
import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL; // VITE adjustment

export default function Franchise() {
  // State to hold form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  // Handler for input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("Sending Application...");

    try {
        const response = await axios.post(`${API_URL}/franchise`, formData);

        if (response.status === 200) {
            setSubmitStatus("Application sent successfully! We'll be in touch soon. 📧");
            setFormData({ fullName: "", email: "", phone: "", message: "" }); // Clear form
        } 
    } catch (error) {
        console.error("Submission Error:", error);
        setSubmitStatus(`Failed to send application: ${error.response?.data?.message || 'Server error'} 😔`);
    }
  };

  return (
    <div style={{ padding: "80px 10%" }}>
      <h1 style={{ textAlign: "center", color: "#d4af37", fontSize: "2.5rem", marginBottom: "40px" }}>Franchise Opportunities</h1>
      <p style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 40px auto", lineHeight: "1.8" }}>
        Join our network of cloud kitchens and expand your food business efficiently. Leverage our multi-brand platform, order aggregation, inventory tracking, and delivery optimization systems.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "400px" }}>

          <input
            type="text"
            name="fullName" 
            placeholder="Full Name"
            value={formData.fullName} 
            onChange={handleChange} 
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />
          <input
            type="email"
            name="email" 
            placeholder="Email"
            value={formData.email} 
            onChange={handleChange} 
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />
          <input
            type="text"
            name="phone" 
            placeholder="Phone"
            value={formData.phone} 
            onChange={handleChange} 
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />
          <textarea
            name="message" 
            placeholder="Your Experience / Message"
            rows="5"
            value={formData.message} 
            onChange={handleChange} 
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          ></textarea>

          <button
            type="submit"
            disabled={submitStatus.includes("Sending")}
            style={{ padding: "10px", borderRadius: "8px", background: "#d4af37", border: "none", cursor: 'pointer', fontWeight: "bold" }}>
            {submitStatus.includes("Sending") ? "Applying..." : "Apply Now"}
          </button>

        </form>
        </div>
      {submitStatus && <p style={{ marginTop: "20px", textAlign: "center", color: submitStatus.includes("successfully") ? 'green' : 'red' }}>{submitStatus}</p>}
    </div>
  );
}