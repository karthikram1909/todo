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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
