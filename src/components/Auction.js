import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Auction = () => {
  const [auctionItems, setAuctionItems] = useState([
    {
      id: 1,
      name: 'Cricket Bat with Virat Kohli Signature',
      image: '/images/1.jpg', // Path to the image in the public folder
      startingBid: '$1000',
      auctionTime: '2024-12-15T12:00:00',
    },
    {
      id: 2,
      name: 'Rohit Sharma Jersey',
      image: '/images/2.jpg', // Another local image
      startingBid: '$200',
      auctionTime: '2024-12-20T14:00:00',
    },
    {
      id: 3,
      name: 'Bumrah Signed Cricket Ball',
      image: '/images/3.jpg', // Another local image
      startingBid: '$150',
      auctionTime: '2024-12-10T16:00:00',
    },
    {
      id: 4,
      name: 'Sachin Tendulkar Autographed Bat',
      image: '/images/4.jpg', // Path to the image
      startingBid: '$5000',
      auctionTime: '2024-12-25T10:00:00',
    },
    {
      id: 5,
      name: 'MS Dhoni Signed Glove',
      image: '/images/5.jpg', // Path to the image
      startingBid: '$1200',
      auctionTime: '2024-12-22T18:00:00',
    },
    {
      id: 6,
      name: 'Kapil Dev Signed Cricket Ball',
      image: '/images/6.jpg', // Path to the image
      startingBid: '$800',
      auctionTime: '2024-12-30T20:00:00',
    }
  ]);

  return (
    <div className="auction-container">
      <h2>Upcoming Auctions</h2>
      <ul className="auction-list">
        {auctionItems.map((item) => (
          <li key={item.id} className="auction-item">
            <img 
              src={item.image} 
              alt={item.name} 
              className="auction-item-image" 
            />
            <h3>{item.name}</h3>
            <p>Starting Bid: {item.startingBid}</p>
            <p>Auction Time: {new Date(item.auctionTime).toLocaleString()}</p>
            {/* Link to LiveAuction and pass the item data */}
            <Link to={{ pathname: '/live-auction', state: { item } }}>
              <button>Live Auction</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Auction;
