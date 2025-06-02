import React, { useEffect, useState } from 'react';

const WelcomeVideos = () => {
  const [visible, setVisible] = useState(true);
  const [showIframe, setShowIframe] = useState(false);
  const [fadeClass, setFadeClass] = useState('');

  const FADE_IN_DURATION = 1000; // 1s fade-in
  const VIDEO_LENGTH = 9000;     // your actual video length in ms
  const FADE_OUT_DURATION = 1000;

  useEffect(() => {
    // Step 1: Start fade-in
    setFadeClass('fade-in');

    // Step 2: Show iframe after fade-in finishes
    const iframeTimer = setTimeout(() => {
      setShowIframe(true);
    }, FADE_IN_DURATION);

    // Step 3: Start fade-out near end
    const fadeOutTimer = setTimeout(() => {
      setFadeClass('fade-out');
    }, VIDEO_LENGTH - FADE_OUT_DURATION);

    // Step 4: Hide component after fade-out
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, VIDEO_LENGTH);

    return () => {
      clearTimeout(iframeTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`welcome-video ${fadeClass}`}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '640px',
        maxWidth: '90%',
        zIndex: 1000,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 0 25px rgba(0, 0, 0, 0.3)',
        backgroundColor: '#fff',
        transition: 'opacity 1s ease-in-out',
        opacity: fadeClass === 'fade-in' ? 1 : 0,
      }}
    >
      <div style={{ position: 'relative', paddingTop: '56.25%' }}>
        {showIframe && (
          <iframe
            src="https://share.synthesia.io/embeds/videos/5c2c05a1-055c-4eaf-ae1d-f8d33aa2d54c?controls=false"
            title="Welcome to Outlandi"
            allow="encrypted-media; fullscreen;"
            allowFullScreen
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              border: 'none',
            }}
          ></iframe>
        )}
      </div>
      <p style={{ color: '#333', textAlign: 'center', margin: '10px 0' }}>
        🔊 Tap the video to unmute if needed
      </p>
    </div>
  );
};

export default WelcomeVideos;
