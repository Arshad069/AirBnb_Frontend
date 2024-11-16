import React, { useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import '../Styles/SearchListings.css';

const SearchListings = () => {
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setResults([]);
        try {
            const response = await axios.get('http://localhost:3001/api/search', {
                params: { type, title, category }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="search-listings-container">
            <h2 className="search-title">
                Search Listings
            </h2>
            <p className="search-description">
                Search by <span className="font-semibold text-blue-600">type</span>, <span className="font-semibold text-blue-600">title</span>, or <span className="font-semibold text-blue-600">category</span>. Only one field is required.
            </p>

            <form onSubmit={handleSearch} className="search-form lg:search-form-lg">
                <div className="search-input-container">
                    <label>Type</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Type (optional)"
                    />
                </div>

                <div className="search-input-container">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title (optional)"
                    />
                </div>

                <div className="search-input-container">
                    <label>Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Category (optional)"
                    />
                </div>

                <button type="submit" className="search-button">
                    <AiOutlineSearch />
                    Search
                </button>
            </form>

            <div className="listings-grid">
                {results.map(listing => (
                    <div
                        key={listing.id}
                        onClick={() => window.location.href = `/listing/${listing.id}`}
                        className="listing-card"
                    >
                        <img
                            src={listing.image}
                            alt={listing.title}
                            className="listing-image"
                        />
                        <div className="listing-details">
                            <h3 className="listing-title">{listing.title}</h3>
                            <p className="listing-type">{listing.type}</p>
                            <p className="listing-category">{listing.category}</p>
                            <p className="listing-guests">{listing.guests} guests</p>
                            <div className="listing-rating">
                                <span className="rating-text">Rating:</span>
                                <span className="rating-value">{listing.rating}</span>
                                <FaStar className="rating-icon" />
                            </div>
                            <p className="listing-price">${listing.price} per night</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchListings;
