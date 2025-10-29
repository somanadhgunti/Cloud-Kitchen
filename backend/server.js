// backend/server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
// PORT definition is optional/only for local testing
const PORT = process.env.PORT || 5000; 

app.use(cors()); 
app.use(express.json());

// Nodemailer Transporter Setup
// Uses Vercel's injected environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
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
        from: `"${name}" <${email}>`, 
        to: process.env.RECEIVER_EMAIL, 
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
        console.log(`Email successfully sent for Contact Form from ${email}`);
        res.status(200).json({ msg: 'Message successfully sent!' });
    } catch (error) {
        console.error('Error sending contact email:', error);
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
        from: `"${fullName}" <${email}>`, 
        to: process.env.RECEIVER_EMAIL, 
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
        console.log(`Franchise application received from ${email}.`);
        res.status(200).json({ msg: 'Application successfully sent!' });
    } catch (error) {
        console.error('Error sending franchise email:', error);
        res.status(500).json({ msg: 'Failed to send application.', error: error.message });
    }
});


// --- CRITICAL DEPLOYMENT FIX: Export app instead of listening ---
module.exports = app;