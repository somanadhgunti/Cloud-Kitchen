// src/pages/Blog.jsx (Vite Adjusted)
import React, { useState, useEffect } from "react";
import axios from 'axios'; 

const API_URL = import.meta.env.VITE_API_BASE_URL; // VITE adjustment

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/posts`);
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch blog posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <div style={{ textAlign: "center", padding: "80px 10%" }}>Loading Blog Posts...</div>;
    }

    return (
        <div style={{ padding: "80px 10%" }}>
            <h1 style={{ color: "#d4af37", textAlign: "center", fontSize: "2.5rem", marginBottom: "40px" }}>Our Blog</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                {posts.map((post) => (
                    <div
                        key={post._id} // Use MongoDB's _id as key
                        style={{
                            width: "300px",
                            background: "#001f3f",
                            color: "white",
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        }}
                    >
                        <img src={post.img || "/images/default-blog.jpg"} alt={post.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
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