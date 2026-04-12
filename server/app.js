const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send("API is working 🚀");
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/fees', require('./routes/feeRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/workers', require('./routes/workerRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

module.exports = app;