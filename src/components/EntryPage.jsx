import React, { useState, useEffect } from 'react';
import '../styles/EntryPage.css';

const EntryPage = ({ onComplete }) => {
  const [step, setStep] = useState('splash'); // 'splash' | 'video'
  const [fadeClass, setFadeClass] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false); // ✅ New state to track button

  const VIDEO_DURATION = 9000; // Adjust to match video length in ms
  const FADE_DURATION = 1000;

  const handleEnterClick = () => {
    setButtonClicked(true);         // ✅ Hide the button permanently
    setStep('video');
    setFadeClass('fade-in');
  };

  const handleIframeLoaded = () => {
    // Start fade-out and transition after video loads
    setTimeout(() => setFadeClass('fade-out'), VIDEO_DURATION - FADE_DURATION);
    setTimeout(() => {
      if (onComplete) onComplete(); // ✅ Trigger main app render
    }, VIDEO_DURATION);
  };

  return (
    <div className="entry-page">
      {step === 'splash' && !buttonClicked && (
        <div className="splash-screen">
          <button className="enter-button" onClick={handleEnterClick}>
            Enter Site
          </button>
        </div>
      )}

      {step === 'video' && (
        <div className={`video-container ${fadeClass}`}>
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <iframe
              src="https://share.synthesia.io/embeds/videos/5c2c05a1-055c-4eaf-ae1d-f8d33aa2d54c?autoplay=1&controls=false"
              title="Welcome to Outlandi"
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
              onLoad={handleIframeLoaded}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
              }}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryPage;
