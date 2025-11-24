import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-brand-700 text-white sticky top-0 z-50 shadow-md" aria-label="Principal">
      <div className="max-w-[1100px] mx-auto px-4 py-2 flex items-center justify-between gap-3 relative">
        <Link to="/" aria-label="Inicio" onClick={closeMenu}>
          <img 
            src="/src/public/logoCrediAntioquia.png" 
            alt="Logo CrediAntioquia" 
            className="max-w-[140px] h-auto" 
          />
        </Link>

        {/* Botón hamburguesa */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Menú de navegación */}
        <ul className={`
          ${isMenuOpen ? 'flex' : 'hidden'} 
          md:flex flex-col md:flex-row gap-1 md:gap-5 
          absolute md:static top-full right-0 md:right-auto
          w-[220px] md:w-auto mt-2 md:mt-0 
          bg-brand-700 rounded-xl md:rounded-none 
          p-2 md:p-0 shadow-lg md:shadow-none
        `}>
          <li>
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-white/20 font-semibold' 
                    : 'hover:bg-white/10'
                }`
              }
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/simulador"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-white/20 font-semibold' 
                    : 'hover:bg-white/10'
                }`
              }
            >
              Simulador
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/solicitar"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-white/20 font-semibold' 
                    : 'hover:bg-white/10'
                }`
              }
            >
              Solicitar Crédito
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
