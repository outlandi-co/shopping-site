import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    document.body.classList.toggle('dark', defaultDark);
    setIsDark(defaultDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    document.body.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
  };

  return (
    <button className="dark-mode-toggle" onClick={toggleTheme}>
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
