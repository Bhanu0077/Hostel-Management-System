const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
    addWorker,
    getWorkers,
    deleteWorker
} = require('../controllers/workerController');

router.post('/', protect, addWorker);
router.get('/', protect, getWorkers);
router.delete('/:id', protect, deleteWorker);

module.exports = router;