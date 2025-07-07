import { useState } from 'react';
import axios from 'axios';
import logo from './../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    const handleFirstLastChange = (e) => {
        const { name, value } = e.target;

        if (name === 'firstName' || name === 'lastName') {
            // Remove invalid chars
            let val = value.replace(/[^A-Za-z\s\-']/g, '');
            // Capitalize first letter
            val = val.charAt(0).toUpperCase() + val.slice(1);
            setFormData(prev => ({ ...prev, [name]: val }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };


    const handlePhoneChange = (e) => {
        const input = e.target.value;
        // Remove ALL non-digit characters (only keep 0-9)
        const numbersOnly = input.replace(/\D/g, '');

        setFormData(prev => ({
            ...prev,
            phone: numbersOnly
        }));

        // Clear error when user types
        if (errors.phone) {
            setErrors(prev => ({ ...prev, phone: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
            isValid = false;
        } else if (!/^[A-Z][a-z\s\-']*$/.test(formData.firstName)) {
            newErrors.firstName = 'First name must start with a capital letter and contain only letters';
            isValid = false;
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
            isValid = false;
        } else if (!/^[A-Z][a-z\s\-']*$/.test(formData.lastName)) {
            newErrors.lastName = 'Last name must start with a capital letter and contain only letters';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[a-z][^\s@]*@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email must start with a lowercase letter and be valid';
            isValid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const { confirmPassword, ...userData } = formData;
            const response = await axios.post('http://localhost:5000/api/v1/auth/register', userData);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            }
        } catch (error) {
            setApiError(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                {/* Register Card */}
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
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
                            <p className="text-gray-600">Welcome to JPaniPaicha system.</p>
                        </div>
                        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

                        {apiError && (
                            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                                {apiError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">First Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleFirstLastChange}
                                            onSubmit={handleChange}
                                            className={`w-full pl-10 pr-3 py-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Firstname . . ."
                                        />
                                    </div>
                                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Last Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleFirstLastChange}
                                            onSubmit={handleChange}
                                            className={`w-full pl-10 pr-3 py-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Lastname . . . "
                                        />
                                    </div>
                                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-3 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="your@email.com"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaPhone className="text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        className={`w-full pl-10 pr-3 py-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="+977-98********"
                                        pattern="[0-9]*"
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-10 py-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="text-gray-400" />
                                        ) : (
                                            <FaEye className="text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-10 py-2 border rounded ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {isLoading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="mt-4 text-center text-sm">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-blue-600 hover:underline"
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;