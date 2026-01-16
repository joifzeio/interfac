import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const MobileStickyButton: React.FC = () => {
  const { t } = useLanguage();

  const scrollToCities = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-12 left-0 w-full z-40 p-4 md:hidden pointer-events-none"
    >
      <button 
        onClick={scrollToCities}
        className="pointer-events-auto w-full bg-intl-orange text-primary-foreground font-display font-bold uppercase text-lg py-4 shadow-[0_0_30px_rgba(255,69,0,0.4)] rounded"
        style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0 100%, 0 25%)' }}
      >
        {t('selectYourCity')}
      </button>
    </motion.div>
  );
};

export default MobileStickyButton;
