import React, { useState } from "react";

// 🚨 LIVE BACKEND URL: This must be the correct URL for your deployed backend service
const BACKEND_URL = "https://cloud-kitchen-backend-fd07.onrender.com";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("Sending Message...");

    try {
      // ✅ Fetch call uses the absolute live URL
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("Message sent successfully! 📧");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        setSubmitStatus(`Failed to send message: ${data.msg} 😔`);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus("An error occurred. Check the console. 😔");
    }
  };

  return (
    <div style={{ padding: "80px 10%" }}>
      <h1 style={{ textAlign: "center", color: "#d4af37", fontSize: "2.5rem", marginBottom: "40px" }}>Contact Us</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "400px" }}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          ></textarea>

          <button
            type="submit"
            disabled={submitStatus.includes("Sending")}
            style={{ padding: "10px", borderRadius: "8px", background: "#d4af37", border: "none", cursor: "pointer", fontWeight: "bold" }}>
            {submitStatus.includes("Sending") ? "Sending..." : "Send Message"}
          </button>

        </form>
      </div>
      {submitStatus && <p style={{ marginTop: "20px", textAlign: "center", color: submitStatus.includes("successfully") ? 'green' : 'red' }}>{submitStatus}</p>}
    </div>
  );
}