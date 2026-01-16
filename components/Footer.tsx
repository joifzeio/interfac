import React from 'react';
import { Link } from 'react-router-dom';
import Crosshair from './Crosshair';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white pt-20 pb-8 px-4 md:px-12 border-t border-white/10 relative">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">

          {/* Column 1: Navigation */}
          <div className="flex flex-col gap-2">
            <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">Navigation</h4>
            <a href="/" className="text-lg font-bold uppercase hover:text-[#FF4500] transition-colors w-max">Accueil</a>
            <a href="/#releases" className="text-lg font-bold uppercase hover:text-[#FF4500] transition-colors w-max">Upcoming Events</a>
            <a href="/#events" className="text-lg font-bold uppercase hover:text-[#FF4500] transition-colors w-max">Past Events</a>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-2">
            <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">Contact</h4>
            <a href="mailto:contact@soireeinterfac.fr" className="text-xl font-display font-black uppercase hover:text-[#FF4500] transition-colors break-words">
              contact@soireeinterfac.fr
            </a>
            <p className="text-gray-500 text-sm mt-2">
              Pour toute question relative aux billetteries ou aux événements.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-t border-white/10 pt-12 pb-8 gap-8">

          {/* Row 1: Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 font-bold uppercase text-sm tracking-wide">
            <Link to="/mentions-legales" className="text-gray-500 hover:text-[#FF4500] transition-colors">Mentions Légales</Link>
            <Link to="/cgv" className="text-gray-500 hover:text-[#FF4500] transition-colors">CGV</Link>
            <Link to="/confidentialite" className="text-gray-500 hover:text-[#FF4500] transition-colors">Confidentialité</Link>
          </div>

          {/* Row 2: Copyright */}
          <div className="font-mono text-xs text-gray-600 uppercase tracking-widest">
            © 2026 SOIREE INTERFAC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;