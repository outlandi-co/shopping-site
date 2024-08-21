import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LogoutButton = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('authToken'); 
        if (onLogout) {
            onLogout();
        }
        navigate('/');
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
