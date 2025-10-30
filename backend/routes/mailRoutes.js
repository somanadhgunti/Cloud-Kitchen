// backend/routes/mailRoutes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

// --- CRITICAL FIX: Explicit Host/Port with .trim() for clean credentials ---
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 465, 
    secure: true, // Required for port 465
    auth: {
        // VITAL FIX: Use .trim() to eliminate any possible leading/trailing whitespace 
        user: process.env.MAIL_USER.trim(), 
        pass: process.env.MAIL_PASS.trim(), 
    },
});

const sendEmail = (mailOptions, res) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // Logging the EAUTH error code to the console for debugging
            console.error('Nodemailer Error (EAUTH):', error.code, error.message);
            res.status(500).json({ msg: 'Email failed to send. Check server console for EAUTH error.' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ msg: 'Message sent successfully! 📧' });
        }
    });
};
// -----------------------------------------------------------------


// @desc    Handle Contact Form submission
// @route   POST /api/contact  
// @access  Public
router.post('/contact', asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        res.status(400);
        throw new Error('Please fill all required fields (name, email, message)');
    }

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.MAIL_RECEIVER_EMAIL, 
        subject: `[Cloud Kitchen] New Contact Form Submission from ${name}`,
        html: `
            <h2>New Contact Message</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="border: 1px solid #ccc; padding: 10px;">${message}</p>
        `,
    };

    sendEmail(mailOptions, res);
}));

// @desc    Handle Franchise Application submission
// @route   POST /api/franchise  
// @access  Public
router.post('/franchise', asyncHandler(async (req, res) => {
    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !phone) {
        res.status(400);
        throw new Error('Please fill all required fields for the franchise application.');
    }

    const mailOptions = {
        from: `"${fullName}" <${email}>`,
        to: process.env.MAIL_RECEIVER_EMAIL, 
        subject: `[Cloud Kitchen] NEW Franchise Application from ${fullName}`,
        html: `
            <h2>New Franchise Application</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message/Experience:</strong></p>
            <p style="border: 1px solid #ccc; padding: 10px;">${message || 'N/A'}</p>
        `,
    };

    sendEmail(mailOptions, res);
}));

module.exports = router;