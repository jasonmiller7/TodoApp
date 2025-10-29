// src/context/SettingsProvider.jsx
import { useEffect, useState } from 'react';
import SettingsContext from './SettingsContext';

const SettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState('text-sm');

  useEffect(() => {
    const storedDark = localStorage.getItem('darkMode');
    const storedFont = localStorage.getItem('fontSize');
    if (storedDark !== null) setDarkMode(storedDark === 'true');
    if (storedFont) setFontSize(storedFont);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('fontSize', fontSize);
  }, [darkMode, fontSize]);

  return (
    <SettingsContext.Provider value={{ darkMode, setDarkMode, fontSize, setFontSize }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;

export { SettingsProvider };