const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Log the message (Simulate email sending)
    console.log('--- New Contact Form Submission ---');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('-----------------------------------');

    // In a real app, you would use Nodemailer or an email service here.

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
});

// Serve frontend in production
// The 'client/dist' folder will be created after running 'npm run build'
const distPath = path.join(__dirname, 'client', 'dist');
app.use(express.static(distPath));

// Catch-all route to serve React's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
