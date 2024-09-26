import React, { useState } from 'react';
import axios from 'axios';

const CreateAuction = () => {
    const [propertyName, setPropertyName] = useState('');
    const [startingBid, setStartingBid] = useState(0);
    const [endTime, setEndTime] = useState('');
    const [auctionFee, setAuctionFee] = useState(0);

    // Update auction fee based on the starting bid
    const handleStartingBidChange = (e) => {
        const bid = e.target.value;
        setStartingBid(bid);
        setAuctionFee(bid * 0.05); // Calculate fee (5% of the starting bid)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/auction/create', {
                propertyName,
                startingBid,
                endTime
            });

            alert('Auction created successfully!');
        } catch (error) {
            alert('Error creating auction');
        }
    };

    return (
        <div>
            <h2>Create Auction</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Property Name:</label>
                    <input 
                        type="text" 
                        value={propertyName} 
                        onChange={(e) => setPropertyName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Starting Bid:</label>
                    <input 
                        type="number" 
                        value={startingBid} 
                        onChange={handleStartingBidChange} 
                        required 
                    />
                </div>
                <div>
                    <label>End Time:</label>
                    <input 
                        type="datetime-local" 
                        value={endTime} 
                        onChange={(e) => setEndTime(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Auction Fee (5% of Starting Bid): ${auctionFee}</label>
                </div>
                <button type="submit">Create Auction</button>
            </form>
        </div>
    );
};

export default CreateAuction;
