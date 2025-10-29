// src/pages/Settings.jsx
import React from 'react';
import { useSettings } from '../context/useSettings.js';

function Settings() {
  const { darkMode, setDarkMode, fontSize, setFontSize } = useSettings();

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const handleFontSizeChange = (e) => setFontSize(e.target.value);

  return (
    <section
      className={`min-h-screen px-4 py-10 ${
        darkMode ? 'bg-ps2black text-ps2gray' : 'bg-white text-black'
      } font-press`}
    >
      <h2 className="text-2xl text-center mb-6 text-ps2blue drop-shadow-[0_0_6px_rgba(0,51,160,0.8)]">
        Settings
      </h2>

      <div className="max-w-md mx-auto space-y-6">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm">Dark Mode</label>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded font-press ${
              darkMode ? 'bg-red-600 text-white' : 'bg-ps2blue text-black'
            } transition`}
          >
            {darkMode ? 'On' : 'Off'}
          </button>
        </div>

        {/* Font Size Selector */}
        <div className="flex items-center justify-between">
          <label className="text-sm">Font Size</label>
          <select
            value={fontSize}
            onChange={handleFontSizeChange}
            className="px-2 py-1 rounded bg-ps2gray text-ps2black font-press"
          >
            <option value="text-sm">Small</option>
            <option value="text-base">Medium</option>
            <option value="text-lg">Large</option>
          </select>
        </div>

        {/* Preview */}
        <div className={`mt-8 p-4 rounded border ${fontSize}`}>
          <p>This is your preview text. Adjust settings to see changes.</p>
        </div>
      </div>
    </section>
  );
}

export default Settings;
