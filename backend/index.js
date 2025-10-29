// backend/localRun.js (or index.js)
require('dotenv').config(); // Load variables from .env file

const app = require('./server'); // Import the Express app from server.js

// The PORT from your .env file will be used (5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running locally on http://localhost:${PORT}`);
    console.log('API Endpoints are:');
    console.log(`- POST http://localhost:${PORT}/api/contact`);
    console.log(`- POST http://localhost:${PORT}/api/franchise`);
});