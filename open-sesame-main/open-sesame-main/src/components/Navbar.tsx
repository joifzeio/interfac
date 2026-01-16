import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference">
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <div className="flex flex-col">
          <h1 className="font-display font-bold text-xl md:text-2xl tracking-tighter uppercase text-off-white">
            Soiree<span className="text-intl-orange">INTERFAC</span>
          </h1>
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-60">{t('tagline')}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {user && isAdmin && (
          <Link 
            to="/admin" 
            className="p-2 hover:text-intl-orange transition-colors duration-300 text-off-white"
            title="Admin Dashboard"
          >
            <Settings size={20} />
          </Link>
        )}
        <button className="p-2 hover:text-intl-orange transition-colors duration-300 text-off-white">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
