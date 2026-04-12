const express = require('express');
const router = express.Router();

const {
    addWorker,
    getWorkers,
    deleteWorker
} = require('../controllers/workerController');

router.post('/', addWorker);
router.get('/', getWorkers);
router.delete('/:id', deleteWorker);

module.exports = router;