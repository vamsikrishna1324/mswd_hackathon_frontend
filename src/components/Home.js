import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to the Charity Auction Platform</h2>
      <p>
        Our platform enables you to bid on exclusive items to support charitable causes.
        Participate in auctions, contribute to your community, and make a difference!
      </p>
      <p>Key Features:</p>
      <ul>
        <li>Seamless real-time bidding</li>
        <li>Safe and secure transactions</li>
        <li>User-friendly experience</li>
      </ul>
      
      {/* Explore Auctions Button */}
      <Link to="/auction">
        <button>Explore Upcoming Auctions</button>
      </Link>

      {/* Live Auction Button */}
      <Link to="/live-auction">
        <button>Live Auction</button>
      </Link>
    </div>
  );
};

export default Home;
