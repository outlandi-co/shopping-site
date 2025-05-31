import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext'; // Make sure this path is correct

const Header = () => {
  const { authToken, login, logout } = useContext(AuthContext);

  const handleLogin = () => {
    const userData = { username: 'test', password: 'password' };
    login(userData);
  };

  return (
    <header>
      <h1>My App</h1>
      {authToken ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      <button onClick={() => window.location.href = '/register'}>Register</button>
      <button onClick={() => window.location.href = '/membership'}>Membership</button>
    </header>
  );
};

export default Header;
