const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    propertyName: { type: String, required: true },
    startingBid: { type: Number, required: true },
    currentBid: { type: Number, required: true },
    highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    endTime: { type: Date, required: true },
    auctionFee: { type: Number, default: 0 }  
});

const Auction = mongoose.model('Auction', auctionSchema);
module.exports = Auction;
