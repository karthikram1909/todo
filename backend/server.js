const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('>>> MongoDB Connected Successfully <<<'))
    .catch(err => {
        console.error('>>> MongoDB Connection Error <<<');
        console.error(err);
    });

// Routes
app.use('/api/todos', todoRoutes);

// Serve Frontend in Production
const path = require('path');
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Debug route to check if files exist
app.get('/debug-check', (req, res) => {
    const fs = require('fs');
    const distPath = path.join(__dirname, '../frontend/dist');

    if (fs.existsSync(distPath)) {
        const files = fs.readdirSync(distPath);
        res.json({
            message: 'Frontend dist exists',
            path: distPath,
            files: files
        });
    } else {
        res.status(404).json({
            message: 'Frontend dist NOT found',
            path: distPath,
            contentsOfFrontend: fs.existsSync(path.join(__dirname, '../frontend')) ? fs.readdirSync(path.join(__dirname, '../frontend')) : 'Frontend dir missing'
        });
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'), (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).send(`Error loading frontend: ${err.message}`);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
