// backend/server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000; 
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

// --- Middleware Setup ---
// Simple CORS configuration, matching your working project setup
app.use(cors()); 
app.use(express.json());

// --- Nodemailer Transporter Setup (Using SendGrid SMTP) ---
const transporter = nodemailer.createTransport({
    // Hardcoded SendGrid host/port to bypass Render firewall issues
    host: 'smtp.sendgrid.net',  
    port: 587,                  
    secure: false,              
    auth: {
        user: process.env.EMAIL_USER, // SendGrid Username: apikey
        pass: process.env.EMAIL_PASS, // SendGrid API Key
    },
});

// ---------------------------------------------
// --- API Endpoint 1: POST /api/contact ---
// ---------------------------------------------
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    const mailOptions = {
        from: `"${name}" <${RECEIVER_EMAIL}>`, 
        to: RECEIVER_EMAIL, 
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: 'Message successfully sent!' });
    } catch (error) {
        console.error('Error sending contact email:', error.message, error.response);
        res.status(500).json({ msg: 'Failed to send email.', error: error.message });
    }
});

// ---------------------------------------------
// --- API Endpoint 2: POST /api/franchise ---
// ---------------------------------------------
app.post('/api/franchise', async (req, res) => {
    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !phone || !message) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    const mailOptions = {
        from: `"${fullName}" <${RECEIVER_EMAIL}>`, 
        to: RECEIVER_EMAIL, 
        subject: `NEW FRANCHISE APPLICATION: ${fullName}`,
        html: `
            <h3>New Franchise Application Received</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Experience/Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: 'Application successfully sent!' });
    } catch (error) {
        console.error('Error sending franchise email:', error.message, error.response);
        res.status(500).json({ msg: 'Failed to send application.', error: error.message });
    }
});


// ✅ Final Deployment Fix: Use app.listen() to run the server on Render, matching your working project.
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});