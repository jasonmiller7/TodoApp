// src/components/Loader.jsx
import React, { useEffect, useState } from 'react';

function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ps2black text-ps2blue font-press">
      <div className="w-24 h-24 mb-6">
        <img
          src="/sprites/run.gif"
          alt="Loading Character"
          className="w-full h-full object-contain"
        />
      </div>

      <p className="mt-4 text-sm tracking-widest">{`Loading your quests... ${progress}%`}</p>
    </div>
  );
}

export default Loader;
