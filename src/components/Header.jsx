import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaSearch, FaUser, FaUserPlus, FaShoppingCart } from 'react-icons/fa';
import Logo from './../assets/logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <div className="header">
                {/* Top Header */}
                <div className='top-header px-0 sm:px-4 lg:px-12'> {/* Zero padding on mobile */}
                    <div className="navbar bg-base-100">
                        <div className="navbar-start flex items-center">
                            {/* Logo - Always visible */}
                            <Link to={'/'} className="w-[60px] md:w-[75px] h-[60px] md:h-[75px] min-h-[60px] md:min-h-[75px] flex-shrink-0 ml-2 sm:ml-0">
                                <img src={Logo} alt="Company Logo" className="w-full h-full object-contain" />
                            </Link>

                            {/* Text - Hidden on mobile/tablet, visible on desktop */}
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

                        {/* Search Bar - Adapts to available space */}
                        <div className="navbar-center flex-1 px-2 sm:px-4 min-w-[200px] md:min-w-[450px] lg:min-w-[500px] mx-1 sm:mx-4">
                            <label className="input input-bordered flex items-center gap-2 w-[100%]">
                                <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                    </g>
                                </svg>
                                <input
                                    type="search"
                                    className="grow text-sm md:text-base"
                                    placeholder="Search products..."
                                />
                            </label>
                        </div>

                        {/* Social Media Icons - Hide on small mobile, show on larger screens */}
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

                {/* Button Navbar */}
                <div className='bottom-header shadow-sm px-0 sm:px-4 lg:px-12'> {/* Zero padding on mobile */}
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
                                    <li><a>Shop</a></li>
                                    <li><Link to={'/contact'}>Contact Us</Link></li>
                                    <li><Link to={'/faq'}>FAQ</Link></li>
                                    <li>
                                        <details>
                                            <summary>Parent</summary>
                                            <ul className="p-2">
                                                <li><a>Submenu 1</a></li>
                                                <li><a>Submenu 2</a></li>
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                <li><Link to={'/'}>Home</Link></li>
                                <li><Link to={'/about'}>About Us</Link></li>
                                <li><a>Shop</a></li>
                                <li><Link to={'/contact'}>Contact Us</Link></li>
                                <li><Link to={'/faq'}>FAQ</Link></li>
                                <li>
                                    <details>
                                        <summary>Parent</summary>
                                        <ul className="p-2">
                                            <li><a>Submenu 1</a></li>
                                            <li><a>Submenu 2</a></li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar-end ml-auto space-x-1 md:space-x-2 mr-2 sm:mr-4">
                            {/* Login Button */}
                            <Link
                                to="/login"
                                className="btn btn-ghost btn-sm md:btn-md hover:bg-gray-100 transition-colors"
                            >
                                <FaUser className="mr-1" />
                                <span className="hidden sm:inline">Login</span>
                            </Link>

                            {/* Register Button - Hidden on mobile */}
                            <Link
                                to="/register"
                                className="btn btn-outline btn-primary btn-sm md:btn-md hidden sm:flex"
                            >
                                <FaUserPlus className="mr-1" />
                                <span>Register</span>
                            </Link>

                            {/* Cart Button with Badge */}
                            <div className="indicator">
                                <span className="indicator-item badge badge-primary">3</span>
                                <Link
                                    to="/cart"
                                    className="btn btn-ghost btn-circle btn-sm md:btn-md hover:bg-gray-100"
                                >
                                    <FaShoppingCart className="text-lg" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header