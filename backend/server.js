const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000; 

const FRONTEND_URL = "https://cloud-kitchen-frontend-2ipt.onrender.com";

const corsOptions = {
    origin: FRONTEND_URL,
    methods: "POST", 
    allowedHeaders: "Content-Type, Authorization", 
};

app.use(cors(corsOptions)); 
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',  
    port: 587,                  
    secure: false,              
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    const mailOptions = {
        from: `"${name}" <${process.env.RECEIVER_EMAIL}>`, 
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
        res.status(200).json({ msg: 'Message successfully sent!' });
    } catch (error) {
        res.status(500).json({ msg: 'Failed to send email.', error: error.message });
    }
});

app.post('/api/franchise', async (req, res) => {
    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !phone || !message) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    const mailOptions = {
        from: `"${fullName}" <${process.env.RECEIVER_EMAIL}>`, 
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
        res.status(200).json({ msg: 'Application successfully sent!' });
    } catch (error) {
        res.status(500).json({ msg: 'Failed to send application.', error: error.message });
    }
});

module.exports = app;