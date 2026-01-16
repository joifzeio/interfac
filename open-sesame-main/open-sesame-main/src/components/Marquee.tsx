import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

const Marquee: React.FC = () => {
  const { t } = useLanguage();
  const content = t('marqueeContent');
  
  return (
    <div className="fixed bottom-0 left-0 w-full z-30 bg-void-black border-t border-border py-3 overflow-hidden select-none pointer-events-none">
      <div className="whitespace-nowrap flex animate-marquee">
        <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-foreground/60 mx-4">
          {content}
        </span>
        <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-foreground/60 mx-4">
          {content}
        </span>
        <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-foreground/60 mx-4">
          {content}
        </span>
        <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-foreground/60 mx-4">
          {content}
        </span>
      </div>
    </div>
  );
};

export default Marquee;
