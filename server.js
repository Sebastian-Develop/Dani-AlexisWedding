const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5001; // Ändere hier den Port

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Serve static HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/gallery.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'gallery.html'));
});

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Serve the images
app.get('/images', (req, res) => {
    fs.readdir('public/uploads', (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading files' });
        }
        res.json(files);
    });
});

// Upload images
app.post('/upload', upload.array('file', 10), (req, res) => {
    res.json(req.files.map(file => file.filename));
});

// Delete an image
app.delete('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    fs.unlink(`public/uploads/${filename}`, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting file' });
        }
        res.json({ message: 'File deleted' });
    });
});

// RSVP form submission
app.post('/rsvp', (req, res) => {
    const { firstName, lastName } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'your_email@hotmail.com',
            pass: 'your_email_password'
        }
    });

    const mailOptions = {
        from: 'your_email@hotmail.com',
        to: 'sebastianr.p2000@hotmail.com',
        subject: 'RSVP zur Hochzeit',
        text: `Name: ${firstName} ${lastName}\nHat die Teilnahme bestätigt.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending email' });
        }
        res.json({ message: 'Email sent: ' + info.response });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
