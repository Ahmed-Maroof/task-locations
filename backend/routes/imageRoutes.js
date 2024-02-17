const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // Import the fs module

const router = express.Router();

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where uploaded images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the uploaded file with a unique name
    }
});

// Set up multer instance with storage configuration
const upload = multer({storage: storage});

// Define the upload route
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({message: 'No file uploaded'});
    }
    const imageUrl = '/uploads/' + req.file.filename; // Public path to access the uploaded image
    res.status(201).json({message: 'File uploaded successfully', imageUrl: imageUrl});
});


router.get('/uploads/:imageName', async (req, res) => {
    try {
        const imageName = req.params.imageName;
        const imagePath = path.join(__dirname, '../../uploads', imageName);
        console.log(imagePath)
        const imageExtension = path.extname(imageName).toLowerCase();

        // Determine the appropriate Content-Type based on the file extension
        let contentType = 'application/octet-stream'; // Default type if an extension is unknown
        if (imageExtension === '.jpg' || imageExtension === '.jpeg') {
            contentType = 'image/jpeg';
        } else if (imageExtension === '.png') {
            contentType = 'image/png';
        } else if (imageExtension === '.gif') {
            contentType = 'image/gif';
        } // Add more conditions for other image types as needed

        // Read the image file and stream it back with the appropriate Content-Type
        const imageStream = await fs.readFile(imagePath);
        res.writeHead(200, {'Content-Type': contentType});
        res.end(imageStream, 'binary');
    } catch (error) {
        console.error('Error serving image:', error);
        res.status(404).send('Image not found');
    }
});


module.exports = router;
