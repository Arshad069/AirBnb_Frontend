import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaShieldAlt, FaInfoCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { BsCircle, BsCheckCircle } from "react-icons/bs";
import { useParams } from "react-router-dom";
import '../Styles/Booking.css';

const Booking = () => {

    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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

    const handleBooking = async () => {
        try {
            const data = {
                name,
                phoneNumber,
                title: listing.title,
                category: listing.category,
            };
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/bookings`, data);
            alert('Booking information submitted successfully');
            setName('');
            setPhoneNumber('');
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    };

    return (
        <div className="booking-container">
            <div className="booking-header">
                <h2>Request to book</h2>
                <p className="info-text">
                    <FaShieldAlt />
                    <span>This is a rare find. Bo's place is usually booked.</span>
                </p>
            </div>

            <div className="booking-section">
                <h3>Your trip</h3>
                <div className="input-group">
                    <div>
                        <p className="input-label">Dates</p>
                        <p>Jun 25 – Jul 4, 2025</p>
                    </div>
                    <MdEdit className="edit-icon" />
                </div>
                <div className="input-group">
                    <div>
                        <p className="input-label">Guests</p>
                        <p>2 guests</p>
                    </div>
                    <MdEdit className="edit-icon" />
                </div>
            </div>

            <div className="booking-section">
                <h3>Choose how to pay</h3>
                <div className="payment-options">
                    <div className="payment-option">
                        <BsCheckCircle className="payment-option-icon" />
                        <div>
                            <p>Pay $1,208.81 now</p>
                        </div>
                    </div>
                    <div className="payment-option">
                        <BsCircle className="payment-option-icon" />
                        <div>
                            <p>Pay part now, part later</p>
                            <p className="payment-details"> $604.41 due today, $604.40 on Jun 16, 2025. No extra fees. <FaInfoCircle className="info-icon" /></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="booking-section">
                <h3>Log in or sign up to book</h3>
                <div>
                    <label className="input-field-label">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div>
                    <label className="input-field-label">Country code</label>
                    <select className="select-country">
                        <option>Pakistan (+92)</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="input-field"
                    />
                    <p className="phone-note">We’ll call or text you to confirm your number. Standard message and data rates apply. <span className="privacy-link">Privacy Policy</span></p>
                </div>
                <button
                    onClick={handleBooking}
                    className="booking-button"
                >
                    Continue
                </button>
            </div>

            <div className="booking-details">
                {listing && (
                    <>
                        <div className="listing">
                            <img
                                src={listing.image}
                                alt={listing.title}
                            />
                            <div>
                                <h3>{listing.title}</h3>
                                <div className="rating">
                                    <FaStar className="text-yellow-500" />
                                    <p>4.96 (124)</p>
                                </div>
                                <p className="category">{listing.category}</p>
                            </div>
                        </div>

                        <div className="price-details">
                            <div className="price-group">
                                <p>Subtotal</p>
                                <p>$1678.99</p>
                            </div>
                            <div className="price-group">
                                <p>Cleaning fee</p>
                                <p>$10.0</p>
                            </div>
                            <div className="price-group">
                                <p>Service fee</p>
                                <p>$950.0</p>
                            </div>
                        </div>

                        <div className="total-price">
                            <p>Total</p>
                            <p>$1678.99</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Booking;
