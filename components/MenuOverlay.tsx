import React from 'react';
import { NAV_LINKS } from '../constants';
import Crosshair from './Crosshair';
import { useLanguage } from '../contexts/LanguageContext';

interface MenuOverlayProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, closeMenu }) => {
  const { t } = useLanguage();

  const getTranslatedLabel = (label: string) => {
    switch (label) {
      case "Home": return t('menu.home');
      case "Releases": return t('menu.releases');
      case "Artists": return t('menu.artists');
      case "Events": return t('menu.events');
      case "Radio": return t('menu.radio');
      case "Store": return t('menu.store');
      default: return label;
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black z-40 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div className="w-full h-full flex flex-col relative pt-32 pb-10 px-4 md:px-12 overflow-y-auto">
        <Crosshair position="bottom-right" className="opacity-50" />
        <Crosshair position="bottom-left" className="opacity-50" />

        <div className="max-w-[1600px] w-full mx-auto flex-grow flex flex-col justify-center">
          <ul className="flex flex-col w-full">
            {NAV_LINKS.map((link) => (
              <li key={link.number} className="group border-t border-white/20 last:border-b relative">
                <a
                  href={link.label === 'Events' ? '/events' : link.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between py-6 md:py-8 lg:py-10 hover:px-4 transition-all duration-300"
                >
                  <span className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase text-transparent text-stroke hover:text-white transition-colors duration-300 font-sans tracking-tighter">
                    {getTranslatedLabel(link.label)}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-white/50 text-sm md:text-lg">{link.number}</span>
                    <span className="hidden group-hover:block font-mono text-white text-sm uppercase">Open</span>
                  </div>
                </a>

                {/* Image Reveal on Hover (Simulated) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-300 z-[-1] bg-cover bg-center hidden md:block" style={{ backgroundImage: `url(${link.image})` }}></div>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-[1600px] w-full mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-sm md:text-base uppercase text-white/70">
          <a href="#" className="hover:text-white transition-colors">+ Instagram</a>
          <a href="#" className="hover:text-white transition-colors">+ YouTube</a>
          <a href="#" className="hover:text-white transition-colors">+ SoundCloud</a>
          <a href="#" className="hover:text-white transition-colors">+ Beatport</a>
        </div>
      </div>

      <style>{`
        .text-stroke {
          -webkit-text-stroke: 1px #7e7e7e;
        }
        .group:hover .text-stroke {
          -webkit-text-stroke: 0px;
        }
      `}</style>
    </div>
  );
};

export default MenuOverlay;