const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// --- CRITICAL FIX: LOAD ENV VARIABLES BEFORE REQUIRING ROUTES ---
// This ensures that process.env.MAIL_USER (and all others) are defined
// when mailRoutes.js loads and tries to create the Nodemailer transport.
dotenv.config(); 
// ---------------------------------------------------------------


// --- Import Routes ---
const userRoutes = require('./routes/userRoutes');
const brandRoutes = require('./routes/brandRoutes'); 
const orderRoutes = require('./routes/orderRoutes');
const postRoutes = require('./routes/postRoutes');
const mailRoutes = require('./routes/mailRoutes');
// ---------------------

connectDB(); // Connect to MongoDB

const app = express();

// --- CORE MIDDLEWARE ---
// 1. Body Parser: Allows Express to correctly read incoming JSON data
app.use(express.json()); 

// 2. URL-Encoded Parser: Supports URL-encoded bodies for form data
app.use(express.urlencoded({ extended: true })); 

// 3. CORS Middleware: Allows ALL origins for local development simplicity.
app.use(cors()); 
// -----------------------


// Basic API Root route (Confirms server is running)
app.get('/api', (req, res) => {
  res.send('Cloud Kitchen API Root is running successfully!');
});


// --- Mount Routes ---
app.use('/api/users', userRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/orders', orderRoutes); 
app.use('/api/posts', postRoutes);
app.use('/api', mailRoutes); 
// --------------------


// Error Handling Middleware (must be last before app.listen)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}`
  )
);