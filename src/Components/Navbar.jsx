import React, { useState, useEffect } from 'react';
import { FaBars, FaSearch, FaSlidersH, FaTimes, FaUserCircle } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { NavLink, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import airbnb from "../logo.svg";
import { LuGlobe } from 'react-icons/lu'; 
import '../Styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [homePath, sethomePath] = useState(true);
    const location = useLocation(); 

    useEffect(() => {
        sethomePath(location.pathname === '/');
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
            <nav className="navbar-md-hidden">
                <div className={`navbar-container ${location.pathname === '/' ? 'border-white pt-4' : 'border-b-[3px] border-gray-100 py-4'}`}>
                    <div className="navbar-left">
                        <div className="flex items-center">
                            <img src={airbnb} alt="" className="navbar-logo" />
                            <NavLink to="/" className="navbar-logo-text">
                                airbnb
                            </NavLink>
                        </div>

                        {!homePath ?
                            <div className="navbar-search-bar">
                                <p className="search-option">Anywhere</p>
                                <p className="search-option">Any week</p>
                                <p className="search-option">Any Guests</p>
                                <AiOutlineSearch className="search-icon" />
                            </div>
                            : <>
                                {showSearchBar ? (
                                    <div className="navbar-search-bar">
                                        <p className="search-option">Anywhere</p>
                                        <p className="search-option">Any week</p>
                                        <p className="search-option">Any Guests</p>
                                        <AiOutlineSearch className="search-icon" />
                                    </div>
                                ) : (
                                    <div className="navbar-link-container">
                                        <NavLink to="/stays" className="navbar-link">Stays</NavLink>
                                        <NavLink to="/experiences" className="navbar-link">Experiences</NavLink>
                                    </div>
                                )}
                            </>
                        }

                        <div className="navbar-right">
                            <span className="navbar-text">Airbnb Your Home</span>
                            <button className="navbar-button">
                                <LuGlobe className="text-xl" />
                            </button>
                            <div onClick={toggleMenu} className="navbar-menu-button">
                                <div className="hidden sm:block">
                                    <GiHamburgerMenu className="text-xl text-gray-500" />
                                </div>
                                <div className="sm:hidden">
                                    <button onClick={toggleMenu}>
                                        {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                                    </button>
                                </div>
                                <FaUserCircle className="text-3xl text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {isOpen && (
                        <div className="navbar-menu">
                            <NavLink to="/" className="navbar-menu-link">Sign up</NavLink>
                            <NavLink to="/" className="navbar-menu-link">Log in</NavLink>
                            <div className="w-full bg-gray-200 h-[2px] my-2"></div>
                            <NavLink to="/" className="navbar-menu-link">Gift Cards</NavLink>
                            <NavLink to="/" className="navbar-menu-link">Airbnb Your Home</NavLink>
                            <NavLink to="/" className="navbar-menu-link">Host an Experience</NavLink>
                            <NavLink to="/" className="navbar-menu-link">Help Center</NavLink>
                        </div>
                    )}
                </div>
            </nav>

            <nav className="navbar-md-block">
                <div className="flex items-center pt-[15px] px-[18px] w-screen">
                    <div className="navbar-search-bar">
                        <FaSearch className="text-gray-700 mr-5" size={25} />
                        <div className="flex-1 text-[14px] text-gray-500">
                            <div className="font-medium">Where to?</div> 
                        </div>
                    </div>
                    <div className="w-[15%] flex justify-center">
                        <button className="navbar-button">
                            <FaSlidersH onClick={toggleMenu} className="text-gray-500" size={20} />
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="sm:hidden">
                        <div className="navbar-menu">
                            <NavLink to="/" className="navbar-menu-link">Sign up</NavLink>
                            <NavLink to="/" className="navbar-menu-link">Log in</NavLink>
                            <div className="w-full bg-gray-200 h-[2px] my-2"></div>
                            <NavLink to="/" className="navbar-menu-link">Gift Cards</NavLink>
                            <NavLink to="/" className="navbar-menu-link">Airbnb Your Home</NavLink>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
