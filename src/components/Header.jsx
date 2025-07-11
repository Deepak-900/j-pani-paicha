import React, { useState, useEffect } from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaSearch, FaUser, FaUserPlus, FaShoppingCart, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import Logo from './../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import axios from 'axios';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(null);


    // Get products from Redux store
    const { products } = useSelector((state) => state.productStore);

    // Get unique item count from Redux store
    const uniqueItemCount = useSelector((state) => {
        const cartItems = state.cartStore.card_items;
        const uniqueIds = new Set(cartItems.map(item => item.id));
        return uniqueIds.size;
    });

    useEffect(() => {
        // List of paths where search should NOT be reset
        const preserveSearchPaths = ['/shop', '/products'];

        // Only reset if we're NOT going to a page where search is relevant
        if (!preserveSearchPaths.some(path => location.pathname.startsWith(path))) {
            setSearchTerm('');
            setSuggestions([]);
            setShowSuggestions(false);
        }

        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/check-auth', {
                    withCredentials: true, // Important for cookies
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    },
                    params: {
                        t: Date.now() // Add timestamp to bust cache
                    }
                });
                console.log('Auth check response:', response.data);

                if (response.data.isAuthenticated) {
                    setIsLoggedIn(true);
                    setUserData(response.data.user);
                } else {
                    setIsLoggedIn(false);
                    setUserData(null);
                }
            } catch (error) {
                console.error('Auth check error:', error);
                setIsLoggedIn(false);
                setUserData(null);
            }
        };
        checkAuthStatus();

    }, [location.pathname]);


    // Handle logout
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {}, {
                withCredentials: true
            });

            setIsLoggedIn(false);
            setUserData(null);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Handle search input changes
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.length > 0 && products.length > 0) {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    // Handle suggestion selection
    const handleSuggestionClick = (product) => {
        setSearchTerm(product.title);
        setShowSuggestions(false);
        navigate(`/shop?search=${product.title || product.id}`);
    };

    // Handle form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
            setShowSuggestions(false);
        }
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setShowSuggestions(false);
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="header">
                {/* Top Header */}
                <div className='top-header px-0 sm:px-4 lg:px-12'>
                    <div className="navbar bg-base-100">
                        <div className="navbar-start flex items-center">
                            <Link to={'/'} className="w-[60px] md:w-[75px] h-[60px] md:h-[75px] min-h-[60px] md:min-h-[75px] flex-shrink-0 ml-2 sm:ml-0">
                                <img src={Logo} alt="Company Logo" className="w-full h-full object-contain" />
                            </Link>

                            <div className="hidden lg:block ml-2 transition-all duration-300">
                                <Link to={'/'} className="font-bold">
                                    <span className='text-2xl lg:text-3xl text-black'>
                                        J
                                        <span className="text-[#2c4358]"> PANI </span>
                                        <span className="text-[#ea8442]"> PAICHA </span>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Search Bar with Suggestions */}
                        <div className="navbar-center flex-1 px-2 sm:px-4 min-w-[200px] md:min-w-[450px] lg:min-w-[500px] mx-1 sm:mx-4 relative">
                            <form onSubmit={handleSearchSubmit} className="w-full">
                                <label className="input input-bordered flex items-center gap-2 w-[100%] relative">
                                    <input
                                        type="search"
                                        className="grow text-sm md:text-base"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (searchTerm && suggestions.length > 0) {
                                                setShowSuggestions(true);
                                            }
                                        }}
                                    />
                                    <button type="submit" className="btn btn-ghost btn-sm">
                                        <FaSearch />
                                    </button>
                                </label>
                            </form>

                            {showSuggestions && suggestions.length > 0 && (
                                <div
                                    className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ul className="py-1">
                                        {suggestions.map((product) => (
                                            <li
                                                key={product.id}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => handleSuggestionClick(product)}
                                            >
                                                {product.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="navbar-end ml-auto space-x-1 md:space-x-2 mr-2 sm:mr-4 hidden sm:flex">
                            <a href="#" className="btn btn-ghost btn-circle p-1 md:p-2 hover:text-blue-600 transition-colors">
                                <FaFacebook className="text-xl md:text-2xl" />
                            </a>
                            <a href="#" className="btn btn-ghost btn-circle p-1 md:p-2 hover:text-blue-400 transition-colors">
                                <FaTwitter className="text-xl md:text-2xl" />
                            </a>
                            <a href="#" className="btn btn-ghost btn-circle p-1 md:p-2 hover:text-pink-600 transition-colors">
                                <FaInstagram className="text-xl md:text-2xl" />
                            </a>
                            <a href="#" className="btn btn-ghost btn-circle p-1 md:p-2 hover:text-red-600 transition-colors">
                                <FaYoutube className="text-xl md:text-2xl" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Header - unchanged from your original code */}
                <div className='bottom-header shadow-sm px-0 sm:px-4 lg:px-12'>
                    <div className="navbar bg-base-100">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li><Link to={'/'}>Home</Link></li>
                                    <li><Link to={'/about'}>About Us</Link></li>
                                    <li><Link to={'/shop'}>Shop</Link></li>
                                    <li><Link to={'/contact'}>Contact Us</Link></li>
                                    <li><Link to={'/faq'}>FAQ</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                <li><Link to={'/'}>Home</Link></li>
                                <li><Link to={'/about'}>About Us</Link></li>
                                <li><Link to={'/shop'}>Shop</Link></li>
                                <li><Link to={'/contact'}>Contact Us</Link></li>
                                <li><Link to={'/faq'}>FAQ</Link></li>
                            </ul>
                        </div>
                        <div className="navbar-end ml-auto space-x-4 md:space-x-5 mr-2 sm:mr-4">
                            {/* Cart button (unchanged) */}
                            <div className="indicator">
                                {uniqueItemCount > 0 && (
                                    <span className="indicator-item badge badge-primary">{uniqueItemCount}</span>
                                )}
                                <Link
                                    to="/cart"
                                    className="btn btn-ghost btn-circle btn-sm md:btn-md hover:bg-gray-100"
                                >
                                    <FaShoppingCart className="text-lg" />
                                </Link>
                            </div>

                            {/* User dropdown */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-gray-100 !p-0 w-10 h-10 min-h-0 flex items-center justify-center border border-gray-300">
                                    {isLoggedIn ? (
                                        <span className="text-xs md:text-sm">ME</span>
                                    ) : (
                                        <FaUser className="text-lg" />
                                    )}
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2 ">
                                    {isLoggedIn ? (
                                        <>
                                            <li>
                                                <Link to="/dashboard" className="hover:bg-gray-100">
                                                    <FaTachometerAlt className="mr-2" />
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <LogoutButton onLogout={handleLogout} />

                                            </li>
                                        </>

                                    ) : (
                                        <>
                                            <li>
                                                <Link to="/login" className="hover:bg-gray-100">
                                                    <FaUser className="mr-2" />
                                                    Login
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/register" className="hover:bg-gray-100">
                                                    <FaUserPlus className="mr-2" />
                                                    Register
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header