import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LiveAuction = () => {
  const location = useLocation();
  const item = location.state?.item || {};  // Get the item passed from Auction.js

  const [highestBid, setHighestBid] = useState(parseFloat(item.startingBid?.replace('$', '') || 0));
  const [highestBidder, setHighestBidder] = useState('No bids yet');
  const [currentBid, setCurrentBid] = useState('');
  const [error, setError] = useState('');

  // Timer state
  const [timeLeft, setTimeLeft] = useState(60 * 60);  // 1 hour in seconds
  const [timerRunning, setTimerRunning] = useState(true);

  // Update the countdown timer every second
  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setTimerRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  // Format time in HH:MM:SS format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // Handle bid submission
  const handleBid = () => {
    if (!currentBid || isNaN(currentBid) || currentBid <= highestBid) {
      setError('Please enter a valid bid higher than the current highest bid.');
      return;
    }

    setHighestBid(currentBid);
    setHighestBidder('User XYZ'); // Set this to the current logged-in user
    setCurrentBid('');
    setError('');
  };

  return (
    <div className="live-auction-container">
      <h2>Live Auction for {item.name}</h2>
      <img 
        src={item.image} 
        alt={item.name} 
        className="auction-item-image" 
      />
      <h3>Starting Bid: ${highestBid}</h3>
      <h3>Current Highest Bid: ${highestBid} (Bidder: {highestBidder})</h3>

      {/* Display countdown timer */}
      <h4>Auction Ends In: {formatTime(timeLeft)}</h4>

      {/* Bid input form */}
      <div className="bid-form">
        <label>Enter your bid: </label>
        <input
          type="number"
          value={currentBid}
          onChange={(e) => setCurrentBid(e.target.value)}
          min={highestBid + 1}
        />
        <button onClick={handleBid}>Place Bid</button>
        {error && <p className="error">{error}</p>}
      </div>

      {/* Auction Ended Message */}
      {!timerRunning && timeLeft === 0 && (
        <div>
          <h3>Auction Ended</h3>
          <p>Congratulations to the highest bidder: {highestBidder}!</p>
        </div>
      )}
    </div>
  );
};

export default LiveAuction;
