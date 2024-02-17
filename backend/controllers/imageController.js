const fs = require('fs');
const path = require('path');

// Upload File
exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Assuming the file is saved in the 'uploads' directory
    const filePath = req.file.path;
    res.status(200).json({ message: 'File uploaded successfully', filePath: filePath });
};

// Download File
exports.downloadFile = (req, res) => {
    console.log(req.params.fileName);
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '..', 'uploads', fileName);

    try {
        if (fs.existsSync(filePath)) {
            res.status(200).download(filePath); // Download the file
        } else {
            res.status(404).json({ message: 'File not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
