import React, { useEffect, useState } from 'react'

const Dashboard = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('User not logged in');
            setLoading(false);
            return;
        }

        fetch('http://localhost:5000/api/v1/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch user data');
                return res.json();
            })
            .then(data => {
                setUser(data.data.user);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [])

    if (loading) return <div>Loading user details...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            <h1>Welcome, {user.firstName} {user.lastName}!</h1>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            {/* More user info here */}
        </div>
    )
}

export default Dashboard