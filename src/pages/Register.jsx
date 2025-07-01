import { useState } from 'react';
import logo from './../assets/logo.png'; // Adjust the path as necessary        
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                setIsLoading(false);
                // Handle registration logic here
                console.log('Registration data:', formData);
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Registration Card */}
                <div className="card bg-white shadow-2xl overflow-hidden">
                    {/* Decorative Header */}
                    <div className="bg-gradient-to-r from-primary to-secondary h-3"></div>

                    <div className="card-body p-8">
                        {/* Logo and Welcome */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                            <p className="text-gray-600">Join JPaniPaicha today</p>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-600">Full Name</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="h-5 w-5 text-gray-400 z-10" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        className={`input input-bordered w-full pl-10 ${errors.name ? 'input-error' : ''}`}
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.name && <span className="text-error text-sm">{errors.name}</span>}
                            </div>

                            {/* Email Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-600">Email Address</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-5 w-5 text-gray-400 z-10" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        className={`input input-bordered w-full pl-10 ${errors.email ? 'input-error' : ''}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email && <span className="text-error text-sm">{errors.email}</span>}
                            </div>

                            {/* Password Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-600">Password</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400 z-10" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        className={`input input-bordered w-full pl-10 pr-10 ${errors.password ? 'input-error' : ''}`}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && <span className="text-error text-sm">{errors.password}</span>}
                            </div>

                            {/* Confirm Password Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-600">Confirm Password</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400 z-10" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        className={`input input-bordered w-full pl-10 pr-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && <span className="text-error text-sm">{errors.confirmPassword}</span>}
                            </div>

                            {/* Terms Checkbox */}
                            <div className="form-control mt-6">
                                <label className="label cursor-pointer justify-start gap-2">
                                    <input type="checkbox" className="checkbox checkbox-sm" required />
                                    <span className="label-text text-gray-600">
                                        I agree to the <a href="#" className="text-primary hover:text-secondary">Terms of Service</a> and <a href="#" className="text-primary hover:text-secondary">Privacy Policy</a>
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`btn btn-primary w-full mt-4 ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {!isLoading && 'Create Account'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="divider my-6">OR SIGN UP WITH</div>

                        {/* Social Login Buttons */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <button className="btn btn-outline gap-2">
                                <FaGoogle className="text-red-500" />
                            </button>
                            <button className="btn btn-outline gap-2">
                                <FaFacebook className="text-blue-600" />
                            </button>
                            <button className="btn btn-outline gap-2">
                                <FaApple />
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className="text-center text-gray-600">
                            Already have an account?{' '}
                            <a href="#" className="text-primary hover:text-secondary font-medium">
                                Sign in
                            </a>
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

export default Register;