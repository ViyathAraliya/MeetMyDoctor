const express = require('express');
const mongoose = require('mongoose');
const routes = require('../routes');
const cors = require('cors'); 

const app = express();

// Configure CORS
const allowedOrigins = ['http://localhost:3000', 'https://meet-my-doctor-ihsl65qdx-viyatharaliyas-projects.vercel.app']; // Add more origins as needed

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // Allow requests from the allowed origins and non-browser clients (like Postman)
            callback(null, true);
        } else {
            // Reject requests from disallowed origins
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world');
});

// Use your routes
app.use(routes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://viyatharaliya:Threesiths%40123@cluster0.sy97gjq.mongodb.net/meetMyDoctor?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Export the app
module.exports = app;