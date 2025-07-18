import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/provider/AuthContext';
import { FiLock, FiCheck, FiAlertCircle, FiArrowRight, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    const { logout } = useAuth(); // Added logout function
    const navigate = useNavigate();

    // Validate form whenever inputs change
    useEffect(() => {
        if (newPassword || confirmPassword || currentPassword) {
            validateForm();
        }
    }, [newPassword, confirmPassword, currentPassword]);

    const validateForm = () => {
        const newErrors = {};

        if (!newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        }

        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Check if new password is same as current password
        if (showCurrentPassword && currentPassword && newPassword === currentPassword) {
            newErrors.newPassword = 'New password must be different from current password';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (!showCurrentPassword) {
            setShowCurrentPassword(true);
            return;
        }

        try {
            const response = await axios.patch(
                '/api/user/updatePassword',
                { currentPassword, newPassword },
                { withCredentials: true } // Important for cookie-based auth
            );

            if (response.data.success) {
                setSuccess(true);
                // Clear form
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setShowCurrentPassword(false);

                setTimeout(async () => {
                    await logout();
                    navigate('/login', {
                        state: {
                            successMessage: 'Password changed successfully. Please login again with your new password.'
                        }
                    });
                }, 2000);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setErrors({ currentPassword: 'Current password is incorrect' });
                } else if (error.response.data.message) {
                    setErrors({ general: error.response.data.message });
                }
            } else {
                setErrors({ general: 'An error occurred. Please try again.' });
            }
        }
    };

    const resetForm = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrors({});
        setShowCurrentPassword(false);
    };

    return (
        <div className="card w-full max-w-md bg-base-100 shadow-xl mx-auto my-8">
            <div className="card-body">
                <h2 className="card-title text-2xl font-bold mb-4 flex items-center">
                    <FiLock className="mr-2" /> Update Password
                </h2>

                {success ? (
                    <div className="alert alert-success shadow-lg">
                        <div>
                            <FiCheck className="text-xl" />
                            <span>Password updated successfully! You'll be logged out shortly for security reasons.</span>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* New Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={`input input-bordered w-full ${errors.newPassword ? 'input-error' : ''}`}
                                    placeholder="Enter new password"
                                />
                                {errors.newPassword && (
                                    <div className="absolute right-3 top-3 text-error">
                                        <FiAlertCircle />
                                    </div>
                                )}
                            </div>
                            {errors.newPassword && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.newPassword}</span>
                                </label>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm New Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                                    placeholder="Confirm new password"
                                />
                                {errors.confirmPassword && (
                                    <div className="absolute right-3 top-3 text-error">
                                        <FiAlertCircle />
                                    </div>
                                )}
                            </div>
                            {errors.confirmPassword && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                                </label>
                            )}
                        </div>

                        {/* Current Password Field */}
                        {showCurrentPassword && (
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Current Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className={`input input-bordered w-full ${errors.currentPassword ? 'input-error' : ''}`}
                                        placeholder="Enter current password"
                                    />
                                    {errors.currentPassword && (
                                        <div className="absolute right-3 top-3 text-error">
                                            <FiAlertCircle />
                                        </div>
                                    )}
                                </div>
                                {errors.currentPassword && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.currentPassword}</span>
                                    </label>
                                )}
                            </div>
                        )}

                        {/* General error */}
                        {errors.general && (
                            <div className="alert alert-error shadow-lg">
                                <div>
                                    <FiAlertCircle className="text-xl" />
                                    <span>{errors.general}</span>
                                </div>
                            </div>
                        )}

                        <div className="card-actions justify-end mt-6">
                            {showCurrentPassword && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="btn btn-ghost mr-2"
                                >
                                    <FiX className="mr-1" /> Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={Object.keys(errors).length > 0}
                            >
                                {showCurrentPassword ? (
                                    <>
                                        Update Password
                                        <FiLock className="ml-2" />
                                    </>
                                ) : (
                                    <>
                                        Continue
                                        <FiArrowRight className="ml-2" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdatePassword;