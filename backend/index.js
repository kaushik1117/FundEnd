const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const serverless = require('serverless-http');





dotenv.config();

const app = express();
const cors = require('cors');
app.use(cors({
    origin: "https://fund-frontend-alpha.vercel.app/", // Allow frontend domain
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
const PORT = process.env.PORT || 5000;

const MongoClient = require('mongodb').MongoClient;
const mongoUrl = process.env.MONGODB_URI;

const cardRoutes = require('./routes/card.js');
const investmentRoutes = require('./routes/investments.js');
const userDashboardRoutes = require('./routes/dashboard.js');
const userRoutes = require('./routes/users.js');


// Connect to MongoDB
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error: ', err);
    });

app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.send("Welcome to the Crowdfunding API");
});
app.use('/cards', cardRoutes);
app.use('/investments', investmentRoutes);
app.use('/dashboard', userDashboardRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports.handler = serverless(app);
