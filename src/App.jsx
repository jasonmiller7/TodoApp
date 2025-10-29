import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Completed from './pages/Completed.jsx';
import Navbar from './components/Navbar.jsx';
import Search from './pages/Search.jsx';
import Settings from './pages/Settings.jsx';
import Loader from './components/Loader.jsx';
import useSettings from './context/useSettings';

function App() {
  const { darkMode, fontSize } = useSettings();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div
      className={`min-h-screen font-press ${fontSize} ${
        darkMode ? 'bg-ps2black text-ps2gray' : 'bg-white text-ps2black'
      }`}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
