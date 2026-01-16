import React from 'react';
import Crosshair from './Crosshair';
import { useLanguage } from '../contexts/LanguageContext';

const CITIES = ['PARIS', 'RENNES', 'NANCY', 'NICE'];

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
      <div className="absolute inset-0 flex items-center justify-center p-4 z-10 pointer-events-none">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-center leading-none tracking-tighter mix-blend-overlay opacity-90">
          {t('hero.title')} <br />
          <span className="text-white text-stroke-orange">{t('hero.subtitle')}</span>
        </h1>
      </div>

      {/* City Selector Overlay */}
      <div className="absolute bottom-[15%] left-0 w-full z-20 flex justify-center px-4">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {CITIES.map((city) => (
            <button
              key={city}
              className="font-display text-2xl md:text-5xl font-bold uppercase text-transparent tracking-tight transition-all duration-300 hover:text-action-orange hover:scale-110"
              style={{ WebkitTextStroke: '1px white' }}
              onMouseEnter={(e) => (e.currentTarget.style.webkitTextStroke = '1px #FF4500')}
              onMouseLeave={(e) => (e.currentTarget.style.webkitTextStroke = '1px white')}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <Crosshair position="bottom-right" className="m-4 md:m-12" />
      <Crosshair position="bottom-left" className="m-4 md:m-12" />
    </div >
  );
};

export default HeroSlider;