import React from 'react';
import Crosshair from './Crosshair';
import { useLanguage } from '../contexts/LanguageContext';


const SCATTERED_CITIES = [
  { name: 'PARIS', top: '10%', left: '5%' },
  { name: 'LILLE', top: '12%', right: '10%' },
  { name: 'NANTES', top: '18%', left: '35%' },
  { name: 'RENNES', top: '35%', left: '15%' },
  { name: 'POITIERS', top: '30%', right: '15%' },
  { name: 'TOURS', top: '50%', left: '8%' },
  { name: 'LIMOGES', top: '45%', right: '5%' },
  { name: 'CLERMONT-FERRAND', bottom: '20%', left: '10%' },
  { name: 'ANGERS', bottom: '15%', right: '35%' },
  { name: 'DIJON', bottom: '10%', left: '40%' },
  { name: 'ORLÉANS', bottom: '15%', right: '5%' },
];

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

      {/* Scattered Cities */}
      {SCATTERED_CITIES.map((city) => (
        <div
          key={city.name}
          className="absolute hidden md:block z-20 pointer-events-none select-none font-display font-bold uppercase text-transparent tracking-tighter opacity-70"
          style={{
            top: city.top,
            left: city.left,
            right: city.right,
            bottom: city.bottom,
            fontSize: 'clamp(2rem, 4vw, 4rem)',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.5)',
          }}
        >
          {city.name}
        </div>
      ))}

      <Crosshair position="bottom-right" className="m-4 md:m-12" />
      <Crosshair position="bottom-left" className="m-4 md:m-12" />
    </div >
  );
};

export default HeroSlider;