import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = ({ logout }) => {
    const navigate = useNavigate();

    useEffect(() => {
        logout(); // Execute the logout function
        navigate('/'); // Redirect to the home page after logout
    }, [logout, navigate]);

    return (
        <div className="logout-page">
            <h1>Logging out...</h1>
        </div>
    );
};

export default LogoutPage;
