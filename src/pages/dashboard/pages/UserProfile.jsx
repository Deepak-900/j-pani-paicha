import { useState, useEffect, useRef } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiCamera, FiSave } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../../../context/provider/AuthContext';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const { userData, updateUserData } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        shippingAddress: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const fileInputRef = useRef(null);

    // Initialize form with user data
    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email || '',
                phoneNumber: userData.phoneNumber || '',
                shippingAddress: userData.shippingAddress || '',
                password: '',
                confirmPassword: ''
            });
            // Only set avatar if it's not a blob URL
            if (userData.profilePicture && !userData.profilePicture.startsWith('blob:')) {
                setAvatar(
                    `${import.meta.env.VITE_API_BASE_URL}/userProfile/${userData.profilePicture}?${new Date().getTime()}`
                );
            }
        }
    }, [userData]);

    // Clean up object URLs when component unmounts or avatar changes
    useEffect(() => {
        return () => {
            if (avatar && avatar.startsWith('blob:')) {
                URL.revokeObjectURL(avatar);
            }
        };
    }, [avatar]);

    // Track changes
    useEffect(() => {
        if (!userData) return;

        const profileChanged =
            formData.firstName !== userData.firstName ||
            formData.lastName !== userData.lastName ||
            formData.email !== userData.email ||
            formData.phoneNumber !== userData.phoneNumber ||
            formData.shippingAddress !== userData.shippingAddress;

        const passwordChanged = formData.password || formData.confirmPassword;
        const avatarChanged = avatarFile !== null;

        setHasChanges(profileChanged || passwordChanged || avatarChanged);
    }, [formData, userData, avatarFile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Clear previous errors
        setErrors({});

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setErrors({ submit: 'Only image files are allowed' });
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setErrors({ submit: 'File size must be less than 5MB' });
            return;
        }

        // Clean up previous blob URL if it exists
        if (avatar && avatar.startsWith('blob:')) {
            URL.revokeObjectURL(avatar);
        }

        // Create preview URL for immediate display
        const previewUrl = URL.createObjectURL(file);
        setAvatar(previewUrl);
        setAvatarFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validation
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
            // 1. Handle avatar upload first if there's a new avatar
            if (avatarFile) {
                const avatarFormData = new FormData();
                avatarFormData.append('avatar', avatarFile);

                const avatarResponse = await axios.patch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/user/updateUserAvatar`,
                    avatarFormData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        withCredentials: true
                    }
                );

                // Update the avatar URL with the server response
                if (avatarResponse.data?.user?.profilePicture) {
                    const serverAvatarUrl = `${import.meta.env.VITE_API_BASE_URL}/userProfile/${avatarResponse.data.user.profilePicture}?${new Date().getTime()}`;
                    setAvatar(serverAvatarUrl);
                }
            }

            // 2. Handle profile data update
            const profileResponse = await axios.patch(
                `${import.meta.env.VITE_API_BASE_URL}/api/user/updateUserData`,
                {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    shippingAddress: formData.shippingAddress
                },
                { withCredentials: true }
            );

            // Update global state with the latest data
            if (profileResponse.data?.user) {
                await updateUserData(profileResponse.data.user);
            }

            // Reset form state
            setIsEditing(false);
            setErrors({});
            setAvatarFile(null);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Update failed:', error);
            setErrors({
                submit: error.response?.data?.message || 'Failed to update profile'
            });

            // Revert to original avatar if update fails
            if (avatarFile && userData?.profilePicture) {
                setAvatar(`${import.meta.env.VITE_API_BASE_URL}/userProfile/${userData.profilePicture}`);
            }
        } finally {
            setIsUploading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            shippingAddress: userData.shippingAddress,
        });

        // Clean up the temporary blob URL if it exists
        if (avatar && avatar.startsWith('blob:')) {
            URL.revokeObjectURL(avatar);
        }

        // Reset to original avatar (only if it's not a blob URL)
        if (userData.profilePicture && !userData.profilePicture.startsWith('blob:')) {
            setAvatar(
                `${import.meta.env.VITE_API_BASE_URL}/userProfile/${userData.profilePicture}?${new Date().getTime()}`
            );
        } else {
            setAvatar(null);
        }
        setAvatarFile(null);
        setErrors({});

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
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
                                onClick={handleCancel}
                                className="btn btn-ghost rounded-full px-6"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="btn btn-primary rounded-full px-6 gap-2 shadow-lg hover:shadow-xl transition-all"
                                disabled={isUploading || !hasChanges}
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
                                                <img
                                                    src={avatar}
                                                    alt="Profile"
                                                    className="object-cover w-full h-full"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/default.png';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-4xl font-medium">
                                                    {userData?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {isEditing && (
                                        <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full cursor-pointer shadow-lg hover:scale-105 transition-transform">
                                            <FiCamera className="text-xl" />
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                ref={fileInputRef}
                                            />
                                        </label>
                                    )}
                                </div>

                                <div className="text-center lg:text-left mt-4">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {formData.firstName} {formData.lastName}
                                    </h2>
                                    <p className="text-gray-500">{formData.email}</p>
                                    <div className="badge badge-primary badge-outline mt-2">
                                        {userData?.role}
                                    </div>
                                </div>
                            </div>

                            {/* Form Section */}
                            <div className="flex-1">
                                <form className="space-y-5">
                                    {errors.submit && (
                                        <div className="alert alert-error mt-4">
                                            <span>{errors.submit}</span>
                                        </div>
                                    )}
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