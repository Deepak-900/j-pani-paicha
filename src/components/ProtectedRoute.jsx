import { useAuth } from '../context/provider/AuthContext';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { isLoggedIn, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div>Loading authentication...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;