const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

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
app.post('/upload', upload.array('images', 10), (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
