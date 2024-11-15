import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaStar } from 'react-icons/fa';
import HorizontalScrollList from './HorizontalScrollList';
import '../Styles/Home.css';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/listings`);
      setListings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setListings([]);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/listing/${id}`);
  };

  const handleSearch = () => {
    navigate('/search');
  };

  const filteredListings = selectedCategory
    ? listings.filter(listing => listing.category === selectedCategory)
    : listings;

  return (
    <div className={`home-container ${window.innerWidth >= 768 ? 'home-container-md' : ''}`}>
      
      <HorizontalScrollList setCategory={setSelectedCategory} />

      <div className="horizontal-scroll-container">
        <button
          onClick={() => handleSearch()}
          className="search-button"
        >
          <FaSearch className="search-icon" /> Search Listings
        </button>
      </div>

      <div className={`listing-grid 
                       ${window.innerWidth >= 640 ? 'listing-grid-sm' : ''}
                       ${window.innerWidth >= 1024 ? 'listing-grid-lg' : ''}
                       ${window.innerWidth >= 1280 ? 'listing-grid-xl' : ''}`}
      >
        {filteredListings.map(listing => (
          <div
            key={listing.id}
            onClick={() => handleCardClick(listing.id)}
            className="listing-card"
          >
            <img
              src={listing.image}
              loading='lazy'
              alt={listing.title}
              className="listing-card-image"
            />
            <div className="listing-card-content">
              <h2 className="listing-card-title">{listing.title}</h2>
              <p className="listing-card-text">{listing.type}</p>
              <p className="listing-card-text">{listing.category}</p>
              <p className="listing-card-text">Guests: {listing.guests}</p>
              <p className="listing-card-price">${listing.price} / night</p>
              <p className="listing-card-rating">
                <span className="listing-card-rating-text">Rating:</span>
                <span className="listing-card-rating-value">{listing.rating}</span>
                <FaStar className="listing-card-rating-icon" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
