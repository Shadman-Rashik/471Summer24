// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// GET notifications for a specific user
router.get('/:userEmail', async (req, res) => {
    try {
        const notifications = await Notification.find({ userEmail: req.params.userEmail }).sort({ timestamp: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;


//////////////////
router.post('/', async (req, res) => {
    try {
        const newNotification = new Notification(req.body);
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});