import { useState, useEffect } from 'react';
import { useAuth } from '../context/provider/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from './../assets/logo.png';
import {
    FaUser,
    FaLock,
    FaGoogle,
    FaFacebook,
    FaApple,
    FaEye,
    FaEyeSlash,
    FaExclamationCircle,
    FaCheckCircle
} from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const LoginPage = () => {
    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({
        email: '',
        password: ''
    });

    // ... (previous state declarations remain the same)
    const [successMessage, setSuccessMessage] = useState('');


    // Auth and routing
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    // Redirect if already logged in
    useEffect(() => {

        if (location.state?.successMessage) {
            setSuccessMessage(location.state.successMessage);
            // Clear the state so message doesn't show again on refresh
            window.history.replaceState({}, document.title);
        }


        if (isLoggedIn) {
            navigate(from, { replace: true });
        }
    }, [location, isLoggedIn, navigate, from]);

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            email: '',
            password: ''
        };

        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            valid = false;
        }

        setFieldErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setFieldErrors({ email: '', password: '' });

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        try {
            const { success, message } = await login({
                email,
                password,
                rememberMe // This passes the checkbox state to AuthContext 
            });

            if (!success) {
                setError(message || 'Invalid credentials');
                return;
            }

            // Success case - ensure all states are updated before redirect
            await new Promise(resolve => setTimeout(resolve, 50)); // Small delay for state propagation
            toast.success('Login successful!');
            navigate(from, { replace: true });

        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'Login failed. Please try again.';
            setError(errorMessage);

            // Handle field-specific errors from API
            if (err.response?.data?.errors) {
                setFieldErrors({
                    ...fieldErrors,
                    ...err.response.data.errors
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = (provider) => {
        // Open social login in popup
        const popup = window.open(
            `http://localhost:5000/api/auth/${provider}`,
            '_blank',
            'width=500,height=600'
        );

        // Check for auth completion
        const checkAuth = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkAuth);
                // Refresh auth status
                login({ silent: true })
                    .then(({ success }) => {
                        if (success) navigate(from, { replace: true });
                    });
            }
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Login Card */}
                <div className="card bg-white shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-secondary h-3"></div>

                    <div className="card-body p-8">
                        {/* Logo and Welcome */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                                <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                            <p className="text-gray-600">Sign in to your account</p>
                        </div>

                        {/* Success Message Display - Placed right before the form */}
                        {successMessage && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center text-green-800">
                                    <FaCheckCircle className="mr-2 text-3xl text-green-600" />
                                    <span>{successMessage}</span>
                                </div>
                            </div>
                        )}

                        {/* Global Error Message */}
                        {error && (
                            <div className="alert alert-error mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-600">Email Address</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10" >
                                        <HiOutlineMail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className={`input input-bordered w-full pl-10 ${fieldErrors.email ? 'input-error' : ''}`}
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (fieldErrors.email) {
                                                setFieldErrors({ ...fieldErrors, email: '' });
                                            }
                                        }}
                                        required
                                        autoComplete="username"
                                    />
                                </div>
                                {fieldErrors.email && (
                                    <div className="mt-1 text-sm text-error flex items-center">
                                        <FaExclamationCircle className="mr-1" />
                                        <span>{fieldErrors.email}</span>
                                    </div>
                                )}
                            </div>

                            {/* Password Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-600">Password</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                        <FaLock className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className={`input input-bordered w-full pl-10 pr-10 ${fieldErrors.password ? 'input-error' : ''}`}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (fieldErrors.password) {
                                                setFieldErrors({ ...fieldErrors, password: '' });
                                            }
                                        }}
                                        required
                                        minLength="8"
                                        autoComplete="current-password"
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
                                {fieldErrors.password && (
                                    <div className="mt-1 text-sm text-error flex items-center">
                                        <FaExclamationCircle className="mr-1" />
                                        <span>{fieldErrors.password}</span>
                                    </div>
                                )}
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
                                onClick={() => handleSocialLogin('google')}
                            >
                                <FaGoogle className="text-red-500" />
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline gap-2"
                                onClick={() => handleSocialLogin('facebook')}
                            >
                                <FaFacebook className="text-blue-600" />
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline gap-2"
                                onClick={() => handleSocialLogin('apple')}
                            >
                                <FaApple />
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary hover:text-secondary font-medium">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>

                {/* App Download Banner */}
                <div className="mt-8 bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-gray-800">Get our mobile app</h3>
                        <p className="text-sm text-gray-600">Scan to download</p>
                    </div>
                    <div className="bg-black text-white p-2 rounded">
                        QR Code Placeholder
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;