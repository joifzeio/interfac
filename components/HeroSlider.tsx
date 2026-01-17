import React from 'react';
import Crosshair from './Crosshair';
import { useLanguage } from '../contexts/LanguageContext';


const HeroSlider: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full h-[85vh] md:h-screen bg-void-black overflow-hidden group">
      <video
        className="absolute inset-0 w-full h-full object-cover grayscale-[30%] opacity-80"
        src="/hero_interfac.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center p-4 z-10 pointer-events-none translate-y-[12.5vh]">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-center leading-none tracking-tighter mix-blend-overlay opacity-90">
          {t('hero.title')} <br />
          <span className="text-white text-stroke-orange">{t('hero.subtitle')}</span>
        </h1>
      </div>



      <Crosshair position="bottom-right" className="m-4 md:m-12" />
      <Crosshair position="bottom-left" className="m-4 md:m-12" />
    </div >
  );
};

export default HeroSlider;