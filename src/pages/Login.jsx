import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from './../assets/logo.png';
import { FaUser, FaLock, FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            }, {
                withCredentials: true // Important for cookies
            });

            if (response.data.success) {
                toast.success('Login successful!');
                // Store user data in context/state if needed
                // Then redirect to dashboard or home page
                navigate('/dashboard');
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'Login failed. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Login Card */}
                <div className="card bg-white shadow-2xl overflow-hidden">
                    {/* Decorative Header */}
                    <div className="bg-gradient-to-r from-primary to-secondary h-3"></div>

                    <div className="card-body p-8">
                        {/* Logo and Welcome */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl font-bold text-white">
                                    <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                            <p className="text-gray-600">Sign in to your JPaniPaicha account</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="alert alert-error mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-600">Email Address</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                        <HiOutlineMail className="h-5 w-5 text-gray-400 z-10" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="input input-bordered w-full pl-10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-600">Password</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                        <FaLock className="h-4 w-4 text-gray-400 z-10" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="input input-bordered w-full pl-10 pr-10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength="8"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <FaEye className="text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <label className="cursor-pointer label justify-start gap-2">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-sm"
                                            checked={rememberMe}
                                            onChange={() => setRememberMe(!rememberMe)}
                                        />
                                        <span className="label-text text-gray-600">Remember me</span>
                                    </label>
                                    <Link to="/forgot-password" className="text-sm text-primary hover:text-secondary">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {!isLoading ? 'Sign In' : 'Signing In...'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="divider my-6">OR CONTINUE WITH</div>

                        {/* Social Login Buttons */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <button
                                type="button"
                                className="btn btn-outline gap-2"
                                onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
                            >
                                <FaGoogle className="text-red-500" />
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline gap-2"
                                onClick={() => window.location.href = 'http://localhost:5000/api/auth/facebook'}
                            >
                                <FaFacebook className="text-blue-600" />
                            </button>
                            <button type="button" className="btn btn-outline gap-2">
                                <FaApple />
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center text-gray-600">
                            Don't have an account?{' '}
                            <Link to={'/register'} className="text-primary hover:text-secondary font-medium">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>

                {/* App Download Banner */}
                <div className="mt-8 bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-gray-800">Get the JPaniPaicha app</h3>
                        <p className="text-sm text-gray-600">Scan to download our mobile app</p>
                    </div>
                    <div className="bg-black text-white p-2 rounded">
                        <div className="grid grid-cols-2 grid-rows-2 gap-1">
                            <div className="w-2 h-2 bg-white"></div>
                            <div className="w-2 h-2 bg-white"></div>
                            <div className="w-2 h-2 bg-white"></div>
                            <div className="w-2 h-2 bg-white"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;