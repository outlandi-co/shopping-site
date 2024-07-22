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

  return (
    <div className="home-page">
      {user ? (
        <>
          <h1>Welcome back, {user}!</h1>
          <p>Enjoy your time in our application.</p>
        </>
      ) : (
        <>
          {showWelcome && <Welcome />}
        </>
      )}
      <Store /> {/* Show Store in both cases */}
    </div>
  );
};

export default HomePage;
