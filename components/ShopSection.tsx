import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ShopSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-black text-white py-32 px-4 md:px-12 relative border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black"></div>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col gap-6 text-center md:text-left">
            <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px #555' }}>
                {t('shop.merch')}
            </h2>
            <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px #555' }}>
                {t('shop.tickets')}
            </h2>
            <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white">
                {t('shop.vip')}
            </h2>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
            <h2 className="text-4xl uppercase font-bold">{t('shop.store_title')}</h2>
            <p className="font-mono text-sm max-w-xs text-center md:text-right text-gray-400">
                {t('shop.desc')}
            </p>
            <a href="#" className="border border-white px-10 py-4 uppercase font-mono text-sm hover:bg-white hover:text-black transition-colors duration-300">
                {t('shop.cta')}
            </a>
        </div>
      </div>
    </div>
  );
};

export default ShopSection;