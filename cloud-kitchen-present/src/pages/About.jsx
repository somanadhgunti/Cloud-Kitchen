import React from "react";

export default function About() {
  return (
    <div style={{ padding: "60px 10%", background: "#f7f7f7" }}>
      {/* Hero Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <h1 style={{ fontSize: "3rem", color: "#d4af37", marginBottom: "20px" }}>
          About Us
        </h1>
        <p style={{ maxWidth: "700px", color: "#333", lineHeight: "1.8", fontSize: "1.1rem" }}>
          At <strong>Cloud Kitchen Hub</strong>, we empower food entrepreneurs to scale their brands effortlessly. We provide multi-brand operations, order aggregation, inventory tracking, and delivery optimization under one roof.
        </p>
        <img
          src="/images/about-hero.jpg"
          alt="Cloud Kitchen"
          style={{ marginTop: "30px", width: "100%", maxWidth: "800px", borderRadius: "12px", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}
        />
      </div>

      {/* Mission & Vision */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "center",
          marginBottom: "60px",
        }}
      >
        <div
          style={{
            flex: "1 1 300px",
            background: "#001f3f",
            color: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <h2 style={{ color: "#d4af37", marginBottom: "15px" }}>Our Mission</h2>
          <p>
            To simplify cloud kitchen operations and enable food brands to scale efficiently without the hassle of complex logistics.
          </p>
        </div>
        <div
          style={{
            flex: "1 1 300px",
            background: "#001f3f",
            color: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <h2 style={{ color: "#d4af37", marginBottom: "15px" }}>Our Vision</h2>
          <p>
            To become the most trusted partner for food entrepreneurs, helping them deliver quality meals faster and smarter to customers everywhere.
          </p>
        </div>
      </div>

      {/* How We Work Section */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2 style={{ fontSize: "2rem", color: "#001f3f", marginBottom: "30px" }}>
          How We Work
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: "1 1 250px",
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ color: "#d4af37" }}>1. Brand Setup</h3>
            <p>Create your food brand profile and upload your menu easily.</p>
          </div>
          <div
            style={{
              flex: "1 1 250px",
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ color: "#d4af37" }}>2. Order Management</h3>
            <p>Aggregate orders from multiple platforms and manage seamlessly.</p>
          </div>
          <div
            style={{
              flex: "1 1 250px",
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ color: "#d4af37" }}>3. Delivery Optimization</h3>
            <p>Track deliveries and optimize routes for faster service.</p>
          </div>
        </div>
      </div>

      {/* Team / Illustration */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", color: "#001f3f", marginBottom: "30px" }}>
          Meet Our Team
        </h2>
        <img
          src="/images/team-placeholder.jpg"
          alt="Team"
          style={{
            width: "100%",
            maxWidth: "900px",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          }}
        />
      </div>
    </div>
  );
}
