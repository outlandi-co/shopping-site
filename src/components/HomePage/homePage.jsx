import React, { useState, useEffect } from 'react';
import Welcome from '../Welcome/Welcome';
import Store from '../Store/Store';
import './homePage.scss';

const HomePage = ({ user }) => {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const welcomeShown = localStorage.getItem('welcomeShown');
    if (!welcomeShown) {
      setShowWelcome(true);
      localStorage.setItem('welcomeShown', 'true');
    }
  }, []);

  console.log('User in HomePage component:', user); // Debugging log

  return (
    <div className="home-page">
      {user ? (
        <div>
          <h1>Welcome back, {user}!</h1>
          <p>Enjoy your time in our application.</p>
          <Store /> {/* Show Store when user is logged in */}
        </div>
      ) : (
        <>
          {showWelcome && <Welcome />}
          <Store /> {/* Show Store when user is not logged in */}
        </>
      )}
    </div>
  );
};

export default HomePage;
