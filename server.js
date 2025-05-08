const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
require('dotenv').config();

// Parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Email send route
app.post('/send', async (req, res) => {
    const { name, email, subject, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS        
        }
    });

    let mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, 
        subject: `Contact Form: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Email sent successfully');
        console.log('✅ Email sent');
    } catch (error) {
        console.error('❌ Email failed:', error);
        res.status(500).send('Failed to send email');
    }
});

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'head.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
