const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');

const {
    applyLeave,
    getActiveLeaves
} = require('../controllers/leaveController');

// ✅ ADD THIS LINE
router.post('/', protect, applyLeave);

router.get('/active', protect, getActiveLeaves);

module.exports = router;