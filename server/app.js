const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
    res.send("API is working 🚀");
});

module.exports = app;

app.use('/api/auth', require('./routes/authRoutes'));