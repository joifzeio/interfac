import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent mix-blend-difference text-white py-6 px-4 md:px-12 pointer-events-none">
      <div className="max-w-[1600px] mx-auto flex justify-end items-center relative pointer-events-auto">



        {/* Center: Brand/Title */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
          <h1 className="font-display font-black text-2xl tracking-[0.2em] uppercase text-white select-none">
            SOIREE INTERFAC
          </h1>
        </div>

        {/* Right Side: Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="group flex items-center gap-4 uppercase font-mono text-sm tracking-wider cursor-pointer"
        >
          <div className="flex flex-col items-end">
            <span className={`block transition-all duration-300 ${isMenuOpen ? 'opacity-0 h-0' : 'opacity-100'}`}>
              {t('nav.menu')}
            </span>
            <span className={`block transition-all duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 h-0'}`}>
              {t('nav.close')}
            </span>
          </div>
          <div className="w-8 h-8 flex items-center justify-center relative">
            <div className="w-6 flex flex-col gap-1.5 items-end">
              <div className={`h-[2px] bg-white w-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`h-[2px] bg-white w-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`h-[2px] bg-white w-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </div>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;