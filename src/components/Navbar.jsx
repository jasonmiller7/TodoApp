// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import useSettings from '../context/useSettings';

function Navbar() {
  const { darkMode } = useSettings();

  const baseClass = `px-4 py-2 font-press text-sm rounded transition ${
    darkMode
      ? 'hover:bg-ps2blue hover:text-white'
      : 'hover:bg-ps2blue hover:text-yellow-700'
  }`;

  const activeClass =
    'bg-red-600 text-white drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]';

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-around gap-4 py-4 border-b ${
        darkMode
          ? 'bg-ps2black text-ps2gray border-ps2gray'
          : 'bg-white text-ps2black border-ps2black'
      }`}
    >
      <NavLink to="/" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ''}`}>
        Home
      </NavLink>
      <NavLink to="/completed" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ''}`}>
        Completed
      </NavLink>
      <NavLink to="/search" className={({ isActive}) => `${baseClass} ${isActive ? activeClass : ''}`}>
        Search
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ''}`}>
        Settings
      </NavLink>
    </nav>
  );
}

export default Navbar;
