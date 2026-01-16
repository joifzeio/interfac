import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ticket, Calendar, MapPin, ArrowDown } from 'lucide-react';
import { TicketModalProps } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';

const TicketModal: React.FC<TicketModalProps> = ({ city, isOpen, onClose, onScrollToPast }) => {
  const { t } = useLanguage();
  
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!city) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-void-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-void-black border border-border shadow-[0_0_100px_-20px_rgba(255,69,0,0.1)] rounded-xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
               {/* Close Button Mobile */}
               <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 z-50 p-2 bg-background/50 rounded-full text-foreground md:hidden"
                >
                  <X size={20} />
                </button>

              {/* Left Column: Flyer/Visual */}
              <div className="w-full md:w-5/12 bg-secondary relative min-h-[300px] md:min-h-full">
                {city.flyerUrl ? (
                   <img 
                    src={city.flyerUrl} 
                    alt={`${city.name} Flyer`} 
                    className="w-full h-full object-cover"
                   />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-void-black to-secondary">
                    <h3 className="font-display font-bold text-4xl text-foreground/10 uppercase mb-4">{city.name}</h3>
                    <p className="font-mono text-sm text-intl-orange uppercase tracking-widest">{t('comingSoon')}</p>
                  </div>
                )}
                 {/* Overlay Gradient */}
                 <div className="absolute inset-0 bg-gradient-to-t from-void-black/80 via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Right Column: Content */}
              <div className="w-full md:w-7/12 flex flex-col bg-void-black border-l border-border">
                
                {/* Header */}
                <div className="flex items-start justify-between p-6 md:p-8 border-b border-border/50">
                  <div>
                    <h3 className="font-display font-bold text-3xl md:text-5xl uppercase text-foreground tracking-tight">{city.name}</h3>
                    <div className="flex flex-col gap-1 mt-3">
                        <div className="flex items-center gap-2 text-intl-orange">
                            <Calendar size={14} />
                            <span className="font-mono text-xs md:text-sm uppercase tracking-widest">{city.dateDisplay}</span>
                        </div>
                        {city.venue && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin size={14} />
                                <span className="font-mono text-xs md:text-sm uppercase tracking-widest">{city.venue} • {city.address}</span>
                            </div>
                        )}
                    </div>
                  </div>
                  <button 
                    onClick={onClose}
                    className="hidden md:block p-2 text-muted-foreground hover:text-intl-orange transition-colors"
                  >
                    <X size={28} />
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-void-black/50">
                  {city.status === 'soon' ? (
                     <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-2">
                             <Calendar className="text-muted-foreground" size={32} />
                        </div>
                        <div>
                            <p className="font-display font-bold text-xl uppercase mb-2">{t('eventNotAnnounced')}</p>
                            <p className="font-mono text-xs text-muted-foreground max-w-xs mx-auto">
                                {t('dropNotHappened', { city: city.name })}
                            </p>
                        </div>
                        
                        {onScrollToPast && (
                            <button 
                                onClick={() => {
                                    onClose();
                                    onScrollToPast();
                                }}
                                className="flex items-center gap-2 text-xs font-mono uppercase text-intl-orange hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1"
                            >
                                <ArrowDown size={14} />
                                {t('viewPastEvents')}
                            </button>
                        )}
                     </div>
                  ) : city.status === 'sold-out' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <Ticket size={48} className="mx-auto mb-6 text-destructive opacity-80" />
                      <p className="font-display font-bold text-2xl uppercase mb-2">{t('soldOutTitle')}</p>
                      <button className="mt-6 px-8 py-3 bg-secondary border border-border hover:border-intl-orange text-xs font-mono uppercase tracking-widest transition-all">
                        {t('joinWaitlist')}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                       <div className="p-4 bg-intl-orange/5 border border-intl-orange/20 rounded">
                          <p className="font-mono text-xs text-intl-orange uppercase tracking-widest flex items-center gap-2">
                             <Ticket size={14} />
                             {t('ticketsOnSale')}
                          </p>
                       </div>
                       
                       {/* Placeholder for ticket widget */}
                       <div className="w-full p-6 border border-dashed border-border rounded bg-background/40 flex flex-col items-center justify-center min-h-[200px]">
                         <p className="font-mono text-xs text-muted-foreground mb-2">{t('pretixLoading')}</p>
                         <div className="animate-pulse flex flex-col items-center w-full gap-2">
                              <div className="h-2 w-1/3 bg-secondary rounded"></div>
                              <div className="h-2 w-1/2 bg-secondary/50 rounded"></div>
                         </div>
                       </div>
                       
                       {/* Fake Widget UI for Demo */}
                       <div className="space-y-2">
                           <div className="flex justify-between items-center p-4 border border-border rounded hover:border-intl-orange transition-colors cursor-pointer bg-secondary group">
                               <div>
                                   <span className="block font-sans font-bold text-sm">{t('earlyBird')}</span>
                                   <span className="block font-mono text-[10px] text-muted-foreground">{t('limitedQuantity')}</span>
                               </div>
                               <span className="font-mono text-intl-orange">€8.00</span>
                           </div>
                           <div className="flex justify-between items-center p-4 border border-border rounded hover:border-intl-orange transition-colors cursor-pointer bg-secondary group">
                               <div>
                                   <span className="block font-sans font-bold text-sm">{t('regular')}</span>
                                   <span className="block font-mono text-[10px] text-muted-foreground">{t('standardEntry')}</span>
                               </div>
                               <span className="font-mono text-intl-orange">€10.00</span>
                           </div>
                            <button className="w-full bg-intl-orange text-primary-foreground font-display font-bold uppercase py-4 mt-4 hover:bg-foreground hover:text-background transition-colors tracking-wide rounded">
                              {t('proceedToCheckout')}
                           </button>
                       </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border bg-secondary text-center">
                  <p className="font-mono text-[10px] text-muted-foreground uppercase">
                    {t('secureTicketing')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TicketModal;
