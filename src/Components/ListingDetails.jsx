import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaMedal, FaHome, FaDoorOpen, FaToilet } from 'react-icons/fa';
import '../Styles/ListingDetails.css';

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/listings/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };
    fetchListing();
  }, [id]);

  const handleBooking = (id) => {
    navigate(`/booking/${id}`);
  };

  if (!listing) return <div className="loading">Loading...</div>;

  return (
    <div className="listing-details-container">
      <div className="image-grid">
        <div className="main-image">
          <img src={listing.image} alt={listing.title} className="image" />
        </div>

        {/* <div className="side-images">
          <div className="side-image"><img src={listing.image} alt={listing.title} className="image" /></div>
          <div className="side-image"><img src={listing.image} alt={listing.title} className="image" /></div>
          <div className="side-image"><img src={listing.image} alt={listing.title} className="image" /></div>
          <div className="side-image"><img src={listing.image} alt={listing.title} className="image" /></div>
        </div> */}
      </div>

      <div className="listing-details">
        <div className="details-header">
          <h2 className="listing-title">{listing.title}</h2>
          <p className="listing-type">1 bedroom · Shared bathroom</p>
        </div>

        <div className="listing-meta">
          <div className="listing-meta-item">
            <span className="icon">🏆</span>
            <p>Highly preferred by guests</p>
          </div>
          <div className="listing-meta-item">
            <span className="icon">🏅</span>
            <p>Among the most recommended stays on Airbnb</p>
          </div>
          <div className="listing-meta-item">
            <p className="rating">4.85 <span className="star">⭐</span></p>
            <p className="reviews">(98 Reviews)</p>
          </div>
        </div>

        <div className="host-info">
          <div className="host-image"></div>
          <div className="host-details">
            <p className="host-name">Your Host</p>
            <p className="host-status">Superhost · Over 2 years of hosting experience</p>
          </div>
        </div>

        <div className="listing-features">
          <div className="feature">
            <FaMedal className="icon" />
            <div className="feature-text">
              <p className="feature-title">Exceptional Property</p>
              <p className="feature-description">Rated highly for cleanliness, comfort, and service quality.</p>
            </div>
          </div>

          <div className="feature">
            <FaHome className="icon" />
            <div className="feature-text">
              <p className="feature-title">Private Accommodation</p>
              <p className="feature-description">Enjoy a private bedroom with access to shared spaces.</p>
            </div>
          </div>

          <div className="feature">
            <FaDoorOpen className="icon" />
            <div className="feature-text">
              <p className="feature-title">Shared Common Areas</p>
              <p className="feature-description">Communal spaces like the living room and kitchen are shared.</p>
            </div>
          </div>

          <div className="feature">
            <FaToilet className="icon" />
            <div className="feature-text">
              <p className="feature-title">Shared Washroom</p>
              <p className="feature-description">Bathroom facilities are shared with other guests.</p>
            </div>
          </div>
        </div>

        <div className="about-place">
          <h3 className="about-title">Details about the Property</h3>
          <p className="about-description">
            Located in the city center, this cozy private room offers a comfortable stay with easy access to public transportation and major attractions. Guests can enjoy shared areas such as the kitchen and living space. Ideal for solo travelers or couples looking for an affordable yet stylish stay.
          </p>
        </div>

        <div className="price-info">
          <div className="price-header">
            <p className="price">$140</p>
            <p className="per-night">/ night</p>
          </div>

          <div className="reservation-info">
            <div className="reservation-item">
              <p className="check-in-title">CHECK-IN</p>
              <p className="check-in-date">Available from 3:00 PM</p>
            </div>
            <div className="reservation-item">
              <p className="check-out-title">CHECK-OUT</p>
              <p className="check-out-date">By 11:00 AM</p>
            </div>
            <div className="guest-info">
              <p className="guests-title">GUESTS</p>
              <p className="guests-count">Max 2 people</p>
            </div>
          </div>

          <button onClick={() => handleBooking(id)} className="reserve-button">
            Reserve Your Stay
          </button>

          <p className="reservation-note">No charges applied until the reservation is confirmed</p>

          <div className="price-breakdown">
            <div className="price-item">
              <p>$140 x 3 nights</p>
              <p>$420</p>
            </div>
            <div className="price-item">
              <p>Cleaning service</p>
              <p>$35</p>
            </div>
            <div className="price-item">
              <p>Service charges</p>
              <p>$50</p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="total">
            <p>Total Bill</p>
            <p>$505</p>
          </div>
        </div>

        <div className="rare-find">
          <p className="rare-find-title">Limited Availability</p>
          <p className="rare-find-description">This property is in high demand and gets booked quickly.</p>
        </div>

        <div className="availability-msg">
          Availability is Limited! Book Now!
        </div>

        <div className="report-listing">
          <button className="report-button">Report This Property</button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
