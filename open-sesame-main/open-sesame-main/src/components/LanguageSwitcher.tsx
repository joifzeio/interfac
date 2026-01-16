import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-2 py-1 text-xs font-mono uppercase tracking-widest text-off-white hover:text-intl-orange transition-colors duration-300 border border-border/50 rounded hover:border-intl-orange/50"
      title={language === 'fr' ? 'Switch to English' : 'Passer en Français'}
    >
      <span className={language === 'fr' ? 'text-intl-orange' : 'opacity-50'}>FR</span>
      <span className="opacity-30">/</span>
      <span className={language === 'en' ? 'text-intl-orange' : 'opacity-50'}>EN</span>
    </button>
  );
};

export default LanguageSwitcher;
