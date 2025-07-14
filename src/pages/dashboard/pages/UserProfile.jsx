import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiCamera, FiSave, FiUpload } from 'react-icons/fi';
import { useAuth } from '../../..//context/provider/AuthContext';


const UserProfile = () => {

    const { userData } = useAuth();
    // const [userData, userData] = useState({
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     email: 'john@example.com',
    //     phone: '+1 (555) 123-4567',
    //     address: '123 Main St, New York, NY',
    //     password: '',
    //     confirmPassword: ''
    // });

    const [errors, setErrors] = useState({});
    const [avatar, setAvatar] = useState('https://randomuser.me/api/portraits/men/1.jpg');
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        userData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!userData.firstName) newErrors.firstName = 'First name is required';
        if (!userData.lastName) newErrors.lastName = 'Last name is required';
        if (!userData.email.includes('@')) newErrors.email = 'Valid email required';
        if (userData.password && userData.password !== userData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords must match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Simulate API call
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            setIsEditing(false);
            setErrors({});
        }, 1500);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
                setIsUploading(false);
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
                                onClick={() => setIsEditing(false)}
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

                                            {userData?.profilePicture ? (
                                                <img
                                                    src={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/userProfile/${userData.profilePicture || 'default.png'}`}
                                                    alt="Profile"
                                                    className="object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/userProfile/default.png`;
                                                        e.target.className = 'bg-gray-300';
                                                    }}
                                                />
                                            ) : (
                                                <div className="bg-blue-500 flex items-center justify-center text-white font-medium">
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
                                        {userData.firstName} {userData.lastName}
                                    </h2>
                                    <p className="text-gray-500">{userData.email}</p>
                                    <div className="badge badge-primary badge-outline mt-2">{userData.role}</div>
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
                                                value={userData.firstName}
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
                                                value={userData.lastName}
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
                                            value={userData.email}
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
                                            name="phone"
                                            value={userData.phoneNumber}
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
                                            name="address"
                                            value={userData.shippingAddress}
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
                                                        value={userData.password}
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
                                                        value={userData.confirmPassword}
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