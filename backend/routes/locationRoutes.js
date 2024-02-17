// routes/locationRoutes.js

const express = require('express');
const LocationController = require('../controllers/locationController');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify the destination directory for uploaded files
const router = express.Router();

// Define the route for creating a new location entry
router.post('/create', LocationController.createLocation);
// Define the route for fetching all location entries
router.get('/all', LocationController.getAllLocations)
module.exports = router;
