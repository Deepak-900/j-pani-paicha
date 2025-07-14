import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiCamera, FiSave } from 'react-icons/fi';
import { useAuth } from '../../../context/provider/AuthContext';

const UserProfile = () => {
    const { userData, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        email: userData?.email || '',
        phoneNumber: userData?.phoneNumber || '',
        shippingAddress: userData?.shippingAddress || '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
        if (formData.password && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords must match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsUploading(true);
        try {
            // Prepare data to update (excluding password if empty)
            const updateData = { ...formData };
            if (!updateData.password) {
                delete updateData.password;
                delete updateData.confirmPassword;
            }

            // Call your API to update user data
            await updateUser(updateData);

            setIsEditing(false);
            setErrors({});
        } catch (error) {
            console.error('Update failed:', error);
            setErrors({ submit: error.message || 'Failed to update profile' });
        } finally {
            setIsUploading(false);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
                setIsUploading(false);

                // Here you would typically upload the image to your server
                // and update the user's profile picture URL
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
                        <p className="text-gray-500">Manage your personal information</p>
                    </div>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn btn-primary rounded-full px-6 shadow-lg hover:shadow-xl transition-all"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData({
                                        firstName: userData?.firstName || '',
                                        lastName: userData?.lastName || '',
                                        email: userData?.email || '',
                                        phoneNumber: userData?.phoneNumber || '',
                                        shippingAddress: userData?.shippingAddress || '',
                                        password: '',
                                        confirmPassword: ''
                                    });
                                    setErrors({});
                                }}
                                className="btn btn-ghost rounded-full px-6"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="btn btn-primary rounded-full px-6 gap-2 shadow-lg hover:shadow-xl transition-all"
                                disabled={isUploading}
                            >
                                {isUploading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <FiSave />
                                )}
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>

                {/* Profile Card */}
                <div className="card bg-white shadow-xl overflow-hidden">
                    <div className="card-body p-6 md:p-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center lg:items-start lg:w-1/3">
                                <div className="relative mb-4 group">
                                    <div className="avatar">
                                        <div className="w-40 rounded-xl ring-4 ring-white shadow-lg">
                                            {avatar ? (
                                                <img src={avatar} alt="Profile" className="object-cover w-full h-full" />
                                            ) : userData?.profilePicture ? (
                                                <img
                                                    src={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/userProfile/${userData.profilePicture}`}
                                                    alt="Profile"
                                                    className="object-cover w-full h-full"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/userProfile/default.png`;
                                                        e.target.className = 'bg-gray-300 w-full h-full';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-4xl font-medium">
                                                    {userData?.firstName?.charAt(0) || userData?.email?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {isEditing && (
                                        <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full cursor-pointer shadow-lg hover:scale-105 transition-transform">
                                            {isUploading ? (
                                                <span className="loading loading-spinner loading-sm"></span>
                                            ) : (
                                                <FiCamera className="text-xl" />
                                            )}
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                            />
                                        </label>
                                    )}
                                </div>

                                <div className="text-center lg:text-left mt-4">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {formData.firstName} {formData.lastName}
                                    </h2>
                                    <p className="text-gray-500">{formData.email}</p>
                                    <div className="badge badge-primary badge-outline mt-2">{userData?.role}</div>
                                </div>
                            </div>

                            {/* Form Section */}
                            <div className="flex-1">
                                <form className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-gray-600 font-medium flex items-center gap-2">
                                                    <FiUser /> First Name
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className={`input input-bordered w-full ${errors.firstName ? 'input-error' : ''}`}
                                                placeholder="Enter your first name"
                                            />
                                            {errors.firstName && (
                                                <span className="text-error text-sm mt-1">{errors.firstName}</span>
                                            )}
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-gray-600 font-medium flex items-center gap-2">
                                                    <FiUser /> Last Name
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className={`input input-bordered w-full ${errors.lastName ? 'input-error' : ''}`}
                                                placeholder="Enter your last name"
                                            />
                                            {errors.lastName && (
                                                <span className="text-error text-sm mt-1">{errors.lastName}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-600 font-medium flex items-center gap-2">
                                                <FiMail /> Email Address
                                            </span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && (
                                            <span className="text-error text-sm mt-1">{errors.email}</span>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-600 font-medium flex items-center gap-2">
                                                <FiPhone /> Phone Number
                                            </span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="input input-bordered w-full"
                                            placeholder="+1 (___) ___-____"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-600 font-medium flex items-center gap-2">
                                                <FiMapPin /> Address
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="shippingAddress"
                                            value={formData.shippingAddress}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="input input-bordered w-full"
                                            placeholder="Enter your address"
                                        />
                                    </div>

                                    {isEditing && (
                                        <>
                                            <div className="divider text-gray-400">Password Settings</div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text text-gray-600 font-medium flex items-center gap-2">
                                                            <FiLock /> New Password
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        className="input input-bordered w-full"
                                                        placeholder="••••••••"
                                                    />
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text text-gray-600 font-medium flex items-center gap-2">
                                                            <FiLock /> Confirm Password
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                                                        placeholder="••••••••"
                                                    />
                                                    {errors.confirmPassword && (
                                                        <span className="text-error text-sm mt-1">{errors.confirmPassword}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {errors.submit && (
                                        <div className="alert alert-error mt-4">
                                            <span>{errors.submit}</span>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;