const express = require('express');
const mongoose = require('mongoose');
const categoryRoutes = require('./routes/categoryRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors())
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce');

// Routes
app.use('/api/categories', categoryRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});