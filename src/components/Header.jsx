import React, { useState, useEffect, useContext } from 'react';
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaSearch,
    FaUser,
    FaUserPlus,
    FaShoppingCart,
    FaTachometerAlt,
    FaSignOutAlt
} from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/provider/AuthContext';
import Logo from '../assets/logo.png';

const Header = () => {
    // Auth state from context
    const { isLoggedIn, user, logout, isLoading } = useAuth();

    // Component state
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [networkError, setNetworkError] = useState(null);

    // Hooks
    const navigate = useNavigate();
    const location = useLocation();

    // Redux selectors
    const { products } = useSelector((state) => state.productStore);
    const cartItemCount = useSelector((state) =>
        new Set(state.cartStore.card_items.map(item => item.id)).size
    );

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

    // Handle search submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
            setShowSuggestions(false);
        }
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            setNetworkError({
                message: error.message || 'Logout failed',
                status: error.status
            });
        }
    };

    // Clear search when navigating away from shop pages
    useEffect(() => {
        const preserveSearchPaths = ['/shop', '/products'];
        if (!preserveSearchPaths.some(path => location.pathname.startsWith(path))) {
            setSearchTerm('');
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [location.pathname]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setShowSuggestions(false);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Navigation items
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Shop', path: '/shop' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'FAQ', path: '/faq' }
    ];

    // Social media items
    const socialItems = [
        { name: 'Facebook', icon: FaFacebook, color: 'text-blue-600' },
        { name: 'Twitter', icon: FaTwitter, color: 'text-blue-400' },
        { name: 'Instagram', icon: FaInstagram, color: 'text-pink-600' },
        { name: 'Youtube', icon: FaYoutube, color: 'text-red-600' }
    ];

    return (
        <div className="header">
            {/* Error Banner */}
            {networkError && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                    <div className="flex justify-between items-center max-w-7xl mx-auto">
                        <div>
                            <p className="font-bold">Error</p>
                            <p>{networkError.message}</p>
                        </div>
                        <button
                            onClick={() => setNetworkError(null)}
                            className="text-red-700 hover:text-red-900 text-xl"
                            aria-label="Dismiss error"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {/* Top Header */}
            <div className="top-header px-0 sm:px-4 lg:px-12">
                <div className="navbar bg-base-100">
                    <div className="navbar-start flex items-center">
                        <Link to="/" className="w-[60px] md:w-[75px] h-[60px] md:h-[75px] min-h-[60px] md:min-h-[75px] flex-shrink-0 ml-2 sm:ml-0">
                            <img src={Logo} alt="Company Logo" className="w-full h-full object-contain" />
                        </Link>

                        <div className="hidden lg:block ml-2">
                            <Link to="/" className="font-bold">
                                <span className="text-2xl lg:text-3xl text-black">
                                    J
                                    <span className="text-[#2c4358]"> PANI </span>
                                    <span className="text-[#ea8442]"> PAICHA </span>
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="navbar-center flex-1 px-2 sm:px-4 min-w-[200px] md:min-w-[450px] lg:min-w-[500px] mx-1 sm:mx-4 relative">
                        <form onSubmit={handleSearchSubmit} className="w-full">
                            <label className="input input-bordered flex items-center gap-2 w-full relative">
                                <input
                                    type="search"
                                    className="grow text-sm md:text-base"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    onClick={(e) => e.stopPropagation()}
                                    aria-label="Search products"
                                />
                                <button type="submit" className="btn btn-ghost btn-sm" aria-label="Submit search">
                                    <FaSearch />
                                </button>
                            </label>
                        </form>

                        {/* Search Suggestions */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div
                                className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                                role="listbox"
                            >
                                <ul className="py-1">
                                    {suggestions.map((product) => (
                                        <li
                                            key={product.id}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleSuggestionClick(product)}
                                            role="option"
                                        >
                                            {product.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Social Media Links */}
                    <div className="navbar-end ml-auto space-x-1 md:space-x-2 mr-2 sm:mr-4 hidden sm:flex">
                        {socialItems.map(({ name, icon: Icon, color }) => (
                            <a
                                key={name}
                                href="#"
                                className={`btn btn-ghost btn-circle p-1 md:p-2 hover:${color}`}
                                aria-label={name}
                            >
                                <Icon className="text-xl md:text-2xl" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Header */}
            <div className="bottom-header shadow-sm px-0 sm:px-4 lg:px-12">
                <div className="navbar bg-base-100">
                    {/* Mobile Menu */}
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <Link to={item.path}>{item.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* User Controls */}
                    <div className="navbar-end ml-auto space-x-4 md:space-x-5 mr-2 sm:mr-4">
                        {/* Cart */}
                        <div className="indicator">
                            {cartItemCount > 0 && (
                                <span className="indicator-item badge badge-primary">
                                    {cartItemCount}
                                </span>
                            )}
                            <Link
                                to="/cart"
                                className="btn btn-ghost btn-circle btn-sm md:btn-md hover:bg-gray-100"
                                aria-label="Shopping cart"
                            >
                                <FaShoppingCart className="text-lg" />
                            </Link>
                        </div>

                        {/* User Dropdown */}
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle hover:bg-gray-100 !p-0 w-10 h-10 min-h-0 flex items-center justify-center border border-gray-300"
                                aria-label="User menu"
                            >
                                {isLoggedIn ? (
                                    <span className="text-xs md:text-sm">
                                        {user?.name?.charAt(0) || 'ME'}
                                    </span>
                                ) : (
                                    <FaUser className="text-lg" />
                                )}
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
                                {isLoggedIn ? (
                                    <>
                                        <li>
                                            <Link to="/dashboard" className="hover:bg-gray-100">
                                                <FaTachometerAlt className="mr-2" />
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout} className="hover:bg-gray-100">
                                                <FaSignOutAlt className="mr-2" />
                                                Logout
                                            </button>
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
    );
};

export default Header;