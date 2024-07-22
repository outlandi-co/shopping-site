import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import './IntroPage.scss';

const IntroPage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => navigate('/home'), 300); // Transition out duration
    }, 2700); // Total duration - transition out duration

    return () => clearTimeout(timer);
  }, [navigate]);

  const fade = useSpring({
    opacity: visible ? 1 : 0,
    config: { duration: 300 },
  });

  return (
    <animated.div className="intro-page" style={fade}>
      <h1>Welcome to OUTLANDI</h1>
      <p>Your journey to the extraordinary begins here.</p>
      <button className="start-button" onClick={() => navigate('/home')}>Get Started</button>
    </animated.div>
  );
};

export default IntroPage;
