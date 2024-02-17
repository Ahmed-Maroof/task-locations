const express = require('express');
const locationRoutes = require('./routes/locationRoutes');
const imageRoutes = require('./routes/imageRoutes');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');

const app = express();

// Middleware setup
app.use(express.json());

// Use the cors middleware
app.use(cors());

// Define routes
app.use('/api/images', imageRoutes);
app.use('/api/', locationRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(listEndpoints(app));
});
