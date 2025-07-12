import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
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

            if (response.data.isAuthenticated) {
                setIsLoggedIn(true);
                setUserData(response.data.user);
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


    const login = async (credentials) => {
        try {
            const response = await api.post('/api/auth/login', credentials);
            if (response.data.success) {
                setIsLoggedIn(true);
                setUserData(response.data.user);
                setError(null);
                toast.success('Login successful!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return true;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            return false;
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

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userData,
            isLoading,
            error,
            login,
            logout,
            checkAuthStatus
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Corrected the typo here - changed AuthContex to AuthContext
export const useAuth = () => useContext(AuthContext);