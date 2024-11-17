import React, { useState, useEffect } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { NavLink, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import airbnb from '../logo.svg';
import { LuGlobe } from 'react-icons/lu';
import '../Styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Track the hamburger menu state
  const [showSearchBar, setShowSearchBar] = useState(false); // Track if search bar should be shown
  const [homePath, setHomePath] = useState(true); // Track if we're on the home path
  const location = useLocation(); // Get current path location

  useEffect(() => {
    setHomePath(location.pathname === '/');
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu visibility
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="navbar">
      <nav className="navbar-large">
        <div className={`navbar-flex ${homePath ? 'navbar-large' : 'navbar-small'}`}>
          {/* Logo Section */}
          <div className="navbar-logo">
            <img src={airbnb} alt="Airbnb" />
            <NavLink to="/" className="navbar-logo-link">
              airbnb
            </NavLink>
          </div>

          {/* Search Bar and Menu */}
          {!homePath ? (
            <div className="navbar-search-bar">
              <p className="navbar-search-bar-item">Anywhere</p>
              <p className="navbar-search-bar-item">Any week</p>
              <p className="navbar-search-bar-item">Any Guests</p>
              <AiOutlineSearch className="search-icon" />
            </div>
          ) : (
            <>
              {showSearchBar ? (
                <div className="navbar-search-bar">
                  <p className="navbar-search-bar-item">Anywhere</p>
                  <p className="navbar-search-bar-item">Any week</p>
                  <p className="navbar-search-bar-item">Any Guests</p>
                  <AiOutlineSearch className="search-icon" />
                </div>
              ) : (
                <div className="navbar-menu">
                  <NavLink to="/stays" className="menu-item">
                    Stays
                  </NavLink>
                  <NavLink to="/experiences" className="menu-item">
                    Experiences
                  </NavLink>
                </div>
              )}
            </>
          )}

          {/* User Section */}
          <div className="navbar-user">
            <span>Airbnb Your Home</span>
            <button className="navbar-globe-button">
              <LuGlobe className="navbar-globe-icon" />
            </button>
            <div onClick={toggleMenu} className="navbar-hamburger">
              <GiHamburgerMenu className="hamburger-icon" />
              <FaUserCircle className="user-icon" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`navbar-menu-mobile ${isOpen ? 'show' : ''}`}>
            <NavLink to="/sign-up">Sign Up</NavLink>
            <NavLink to="/log-in">Log In</NavLink>
            <div className="divider"></div>
            <NavLink to="/gift-cards">Gift Cards</NavLink>
            <NavLink to="/airbnb-your-home">Airbnb Your Home</NavLink>
          </div>
        )}
      </nav>

      {/* Mobile Navbar */}
      <nav className="navbar-small">
        <div className="navbar-flex">
          <div className="navbar-search-bar">
            <FaSearch className="text-gray-700 mr-5" size={25} />
            <div className="flex-1 text-[14px] text-gray-500">
              <div className="font-medium">Where to?</div>
            </div>
          </div>
          <div className="navbar-hamburger">
            <button onClick={toggleMenu} className="navbar-toggle-button">
              <GiHamburgerMenu className="hamburger-icon" />
            </button>
          </div>
        </div>
        {isOpen && (
          <div className={`navbar-menu-mobile ${isOpen ? 'show' : ''}`}>
            <NavLink to="/sign-up">Sign Up</NavLink>
            <NavLink to="/log-in">Log In</NavLink>
            <div className="divider"></div>
            <NavLink to="/gift-cards">Gift Cards</NavLink>
            <NavLink to="/airbnb-your-home">Airbnb Your Home</NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
