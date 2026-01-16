import React from 'react';
import { motion } from 'framer-motion';
import { City } from '@/types';
import { ArrowUpRight, Lock } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface CityListProps {
  cities: City[];
  onSelectCity: (city: City) => void;
  onHoverCity: (city: City | null) => void;
}

const CityList: React.FC<CityListProps> = ({ cities, onSelectCity, onHoverCity }) => {
  const { t } = useLanguage();

  return (
    <div className="relative z-30 flex flex-col items-center justify-center min-h-[90vh] py-24 w-full">
      <h2 className="mb-12 text-sm font-mono uppercase tracking-[0.3em] text-foreground/40">{t('upcomingEvents')}</h2>
      <motion.ul 
        className="flex flex-col items-center gap-2 md:gap-4 w-full max-w-4xl px-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        onMouseLeave={() => onHoverCity(null)}
      >
        {cities.map((city) => (
          <CityItem 
            key={city.id} 
            city={city} 
            onSelect={() => onSelectCity(city)} 
            onHover={() => onHoverCity(city)}
          />
        ))}
      </motion.ul>
    </div>
  );
};

interface CityItemProps {
  city: City;
  onSelect: () => void;
  onHover: () => void;
}

const CityItem: React.FC<CityItemProps> = ({ city, onSelect, onHover }) => {
  const { t } = useLanguage();
  const isAvailable = city.status !== 'soon';

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sold-out':
        return t('soldOut');
      case 'available':
        return t('available');
      case 'soon':
        return t('soon');
      default:
        return status.replace('-', ' ');
    }
  };

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
      }}
      className="w-full text-center group cursor-pointer"
      onClick={onSelect}
      onMouseEnter={onHover}
    >
      <div className="relative inline-block py-2 md:py-4 transition-all duration-500">
        {/* Hover Background Glow - subtle */}
        <div className="absolute inset-0 bg-intl-orange/0 group-hover:bg-intl-orange/5 blur-xl transition-all duration-500 rounded-full scale-50 group-hover:scale-110" />

        <h2 className={`relative font-display font-bold text-4xl md:text-7xl lg:text-8xl tracking-tight uppercase transition-all duration-300 group-hover:scale-105 ${isAvailable ? 'text-off-white group-hover:text-intl-orange' : 'text-foreground/30'}`}>
          {city.name}
        </h2>
        
        {/* Meta Info that reveals on hover or usually stays subtle */}
        <div className="flex items-center justify-center gap-2 mt-1 md:mt-2 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-mono text-xs md:text-sm uppercase tracking-widest">{city.dateDisplay}</span>
          <span className="w-1 h-1 bg-current rounded-full" />
          <span className={`font-mono text-xs md:text-sm uppercase tracking-widest ${city.status === 'sold-out' ? 'text-destructive' : isAvailable ? 'text-green-500' : 'text-foreground/50'}`}>
            {getStatusText(city.status)}
          </span>
          {isAvailable ? (
             <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          ) : (
             <Lock className="w-3 h-3" />
          )}
        </div>
      </div>
    </motion.li>
  );
};

export default CityList;
