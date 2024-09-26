const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'bid', 'auctionEnd'
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
