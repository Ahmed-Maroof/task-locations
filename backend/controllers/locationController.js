// controllers/locationController.js

const fs = require('fs');
const path = require('path');
const pool = require('../db');

const LocationController = {
    async createLocation(req, res) {
        try {
            // Get the URL of the last uploaded file
            const uploadFolder = 'uploads'; // Specify the upload folder
            const files = fs.readdirSync(uploadFolder);
            const lastUploadedFile = files[files.length - 1];
            const fileUrl = path.join(uploadFolder, lastUploadedFile);

            // Extract the entry title and file path from the request body
            const {title, latitude, longitude} = req.body;

            // Insert the new location entry into the database
            const query = 'INSERT INTO locations (title, image_path, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *';
            const values = [title, fileUrl, latitude, longitude];
            const result = await pool.query(query, values);

            // Send the newly created location entry as the response
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error creating location:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async getAllLocations(req, res) {
        try {
            // Fetch all location entries from the database
            const query = 'SELECT * FROM locations';
            const result = await pool.query(query);

            // Send the array of location entries as the response
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error fetching location entries:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    }
};

module.exports = LocationController;
