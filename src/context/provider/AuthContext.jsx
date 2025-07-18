import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({

    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
        withCredentials: true
    });

    const checkAuthStatus = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/api/auth/check-auth');

            console.log(response.data.user)

            if (response.data.isAuthenticated) {
                setIsLoggedIn(true);
                setUserData({
                    ...response.data.user,  // Get rememberMe status from the user data returned by backend
                    rememberMe: response.data.rememberMe || false
                });
                setError(null);
                return true;
            } else {
                setIsLoggedIn(false);
                setUserData(null);
                return false
            }
        } catch (err) {
            setIsLoggedIn(false);
            setUserData(null);
            // Don't treat 401 as an error - it's a normal "not logged in" state
            if (err.response?.status !== 401) {
                setError(err.response?.data?.message || 'Authentication check failed');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Initialize auth state on mount
    useEffect(() => {
        const initializeAuth = async () => {
            await checkAuthStatus();
        };
        initializeAuth();
    }, []);


    const login = async ({ email, password, rememberMe = false }) => {
        try {
            const response = await api.post('/api/auth/login', {
                email,
                password,
                rememberMe
            }, {
                withCredentials: true // Ensure cookies are handled
            });

            if (response.data.success) {
                // Immediate state updates before any UI changes
                setIsLoggedIn(true);
                setUserData({
                    ...response.data.user,
                    rememberMe
                });
                setError(null);

                // Return both success status and user data
                return {
                    success: true,
                    user: response.data.user
                };
            } else {
                // Handle API-reported failure
                return {
                    success: false,
                    message: response.data.message || 'Login failed'
                };
            }
        } catch (err) {
            // Handle network/validation errors
            const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
            setError(errorMessage);
            return {
                success: false,
                message: errorMessage
            };
        }
    };

    const logout = async () => {
        try {
            await api.post('/api/auth/logout');
            setIsLoggedIn(false);
            setUserData(null);
            setError(null);
            toast.success('Logout successful!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Logout failed');
        }
    };

    // Fetch current user data
    const fetchCurrentUser = async () => {
        try {
            const response = await api.get('/api/auth/me');
            return response.data.user;
        } catch (err) {
            console.error('Failed to fetch user data:', err);
            return null;
        }
    };
    // Update user data in context
    const updateUserData = async (updatedData = null) => {
        try {
            if (updatedData) {
                // If we're passing updated data directly (optimistic update)
                setUserData(prev => ({ ...prev, ...updatedData }));
            } else {
                // Fetch fresh data from server
                const user = await fetchCurrentUser();
                if (user) {
                    setUserData(user);
                }
            }
            return userData;
        } catch (err) {
            console.error('Failed to update user data:', err);
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userData,
            isLoading,
            error,
            login,
            logout,
            checkAuthStatus,
            updateUserData
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Corrected the typo here - changed AuthContex to AuthContext
export const useAuth = () => useContext(AuthContext);