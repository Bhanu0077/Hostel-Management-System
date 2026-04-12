const Worker = require('../models/Worker');


// ➕ Add Worker
exports.addWorker = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ message: "Name required" });
        }
        const worker = await Worker.create(req.body);
        res.json(worker);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 📋 Get Workers
exports.getWorkers = async (req, res) => {
    try {
        const workers = await Worker.find().sort({ createdAt: -1 });
        res.json(workers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ❌ Delete Worker
exports.deleteWorker = async (req, res) => {
    try {
        await Worker.findByIdAndDelete(req.params.id);
        res.json({ message: "Worker deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};