import React from 'react';
import { motion } from 'framer-motion';
import { City } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';

interface PastEventsProps {
  events: City[];
}

const PastEvents: React.FC<PastEventsProps> = ({ events }) => {
  const { t } = useLanguage();

  if (events.length === 0) return null;

  return (
    <section id="past-events" className="relative z-20 w-full bg-void-black border-t border-border py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
             <h2 className="font-display font-bold text-3xl md:text-5xl text-off-white uppercase mb-2">{t('pastArchives')}</h2>
             <p className="font-mono text-xs md:text-sm text-muted-foreground uppercase tracking-widest">{t('reliveTheLuxury')}</p>
          </div>
          <div className="text-right hidden md:block">
            <span className="font-mono text-intl-orange text-xl">{events.length}</span>
            <span className="font-mono text-muted-foreground text-xs uppercase ml-2">{t('eventsCompleted')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[4/5] bg-secondary rounded-lg overflow-hidden cursor-pointer"
            >
              {/* Image */}
              {event.flyerUrl ? (
                <img 
                  src={event.flyerUrl} 
                  alt={`${event.name} Flyer`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground font-display text-4xl font-bold uppercase">
                  {event.name}
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="font-display font-bold text-2xl text-off-white uppercase group-hover:text-intl-orange transition-colors duration-300">{event.name}</h3>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mt-1">{event.dateDisplay}</p>
                {event.venue && (
                  <p className="font-mono text-[10px] text-muted-foreground/60 uppercase mt-2">{event.venue}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastEvents;
