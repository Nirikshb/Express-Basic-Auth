const express = require('express'); // Import Express framework
const protect = require('../middleware/auth'); // Import authentication middleware
const mongoose = require('mongoose'); // Import Mongoose for MongoDB
const dotenv = require('dotenv'); // Import dotenv for environment variables
dotenv.config(); // Load environment variables from .env file

const app = express(); // Create Express app instance

// MUST be before the routes
app.use(express.json()); // Middleware to parse JSON request bodies

// Mount routes
const authRoutes = require('./routes/auth'); // Import authentication routes
app.use('/api/auth', authRoutes); // Use authentication routes under /api/auth

// Simple test route (optional)
app.get('/', (req, res) => res.send('API is running')); // Root route for API status
router.get('/me', protect, async (req, res) => { // Protected route to get current user info
    res.status(200).json({ success: true, user: req.user });
});

// Connect DB
mongoose.connect(process.env.MONGO_URI) // Connect to MongoDB using URI from environment
    .then(() => {
        console.log('MongoDB connected ✅'); // Log successful DB connection
        app.listen(process.env.PORT || 5000, () => // Start server on specified port
            console.log(`Server running on http://localhost:${process.env.PORT || 5000} 🚀`)
        );
    })
    .catch(err => console.error('MongoDB connection error ❌', err)); // Log DB connection errors

app.use((req, res) => { // Catch-all handler for undefined routes
    res.status(404).json({ message: 'Route not found' });
});
