import React, { useState } from "react";

// 🚨 LIVE BACKEND URL: Define the base URL once for clarity
const BACKEND_URL = "https://cloud-kitchen-backend-fd07.onrender.com";

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
      // ✅ Updated fetch call using the absolute BACKEND_URL
      const response = await fetch(`${BACKEND_URL}/api/franchise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("Application sent successfully! We'll be in touch soon. 📧");
        setFormData({ fullName: "", email: "", phone: "", message: "" }); // Clear form
      } else {
        const data = await response.json();
        setSubmitStatus(`Failed to send application: ${data.msg} 😔`);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus("An error occurred. Check the console. 😔");
    }
  };

  return (
    <div style={{ padding: "80px 10%" }}>
      <h1 style={{ textAlign: "center", color: "#d4af37", fontSize: "2.5rem", marginBottom: "40px" }}>Franchise Opportunities</h1>
      <p style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 40px auto", lineHeight: "1.8" }}>
        Join our network of cloud kitchens and expand your food business efficiently. Leverage our multi-brand platform, order aggregation, inventory tracking, and delivery optimization systems.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* Added onSubmit handler to the form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "400px" }}>

          <input
            type="text"
            name="fullName" // Added name attribute
            placeholder="Full Name"
            value={formData.fullName} // Controlled value
            onChange={handleChange} // Handler
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />
          <input
            type="email"
            name="email" // Added name attribute
            placeholder="Email"
            value={formData.email} // Controlled value
            onChange={handleChange} // Handler
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />
          <input
            type="text"
            name="phone" // Added name attribute
            placeholder="Phone"
            value={formData.phone} // Controlled value
            onChange={handleChange} // Handler
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />
          <textarea
            name="message" // Added name attribute
            placeholder="Your Experience / Message"
            rows="5"
            value={formData.message} // Controlled value
            onChange={handleChange} // Handler
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          ></textarea>

          <button
            type="submit"
            disabled={submitStatus.includes("Sending")}
            style={{ padding: "10px", borderRadius: "8px", background: "#d4af37", border: "none", cursor: "pointer", fontWeight: "bold" }}>
            {submitStatus.includes("Sending") ? "Applying..." : "Apply Now"}
          </button>

        </form>
      </div>
      {/* Display submission status */}
      {submitStatus && <p style={{ marginTop: "20px", textAlign: "center", color: submitStatus.includes("successfully") ? 'green' : 'red' }}>{submitStatus}</p>}
    </div>
  );
}