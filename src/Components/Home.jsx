import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaStar } from 'react-icons/fa';
import HorizontalScrollList from './HorizontalScrollList'; 

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
    <div className='mt-[70px] min-h-screen md:mt-[95px]'> 
 
        <HorizontalScrollList setCategory={setSelectedCategory} /> 

      <div className='w-full xl:px-[75px] px-4'>
        <button
          onClick={() => handleSearch()}
          className="bg-white border border-[351515] w-full flex items-center mx-auto space-x-4 text-gray-600 px-4 py-[12px] text-[18px] rounded-[28px] mb-4"
        >
          <FaSearch className='mr-[15px]' /> Search Listings
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4 xl:px-[75px] px-4">
        {filteredListings.map(listing => (
          <div
            key={listing.id}
            onClick={() => handleCardClick(listing.id)}
            className="overflow-hidden cursor-pointer"
          >
            <img
              src={listing.image}
              loading='lazy'
              alt={listing.title}
              className="m-2 h-[290px] w-[95%] border rounded-xl hover:shadow-xl transition duration-200"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{listing.title}</h2>
              <p className="text-gray-500">{listing.type}</p>
              <p className="text-gray-500">{listing.category}</p>
              <p className="text-gray-700">Guests: {listing.guests}</p>
              <p className="font-bold text-lg">${listing.price} / night</p>
              <p className='flex items-center'><span className='font-bold mr-[8px]'>Rating:</span><span className='text-[18px] mr-[4px]'>{listing.rating}</span><FaStar size={20} className="text-yellow-500" /></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
