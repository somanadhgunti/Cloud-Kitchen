import React from "react";

const blogPosts = [
  { title: "Maximizing Cloud Kitchen Efficiency", img: "/images/blog1.jpg", excerpt: "Learn how to streamline your multi-brand operations..." },
  { title: "Top 5 Food Trends 2025", img: "/images/blog2.jpg", excerpt: "Stay ahead of the curve with these trending cuisines..." },
  { title: "Delivery Optimization Tips", img: "/images/blog3.jpg", excerpt: "Boost customer satisfaction and reduce delays..." },
];

export default function Blog() {
  return (
    <div style={{ padding: "80px 10%" }}>
      <h1 style={{ color: "#d4af37", textAlign: "center", fontSize: "2.5rem", marginBottom: "40px" }}>Our Blog</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {blogPosts.map((post, idx) => (
          <div
            key={idx}
            style={{
              width: "300px",
              background: "#001f3f",
              color: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <img src={post.img} alt={post.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "10px 0" }}>{post.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "#ccc" }}>{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
