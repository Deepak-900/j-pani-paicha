import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        Swal.fire({
            icon: 'success',
            title: 'Logout Successful',
            text: 'You have been logged out.',
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            navigate('/login');
        });

    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
