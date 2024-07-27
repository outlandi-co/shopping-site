import React from 'react';

const Logout = ({ setUser }) => {
  const handleLogout = () => {
    setUser(null);
    // Additional logout logic (e.g., clear tokens)
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
