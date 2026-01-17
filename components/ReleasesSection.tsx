import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { TicketEvent } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useEvents } from '../hooks/useEvents';
import ImageWithFallback from './ImageWithFallback';

interface ReleasesSectionProps {
  onOpenModal: (event: TicketEvent) => void;
}

const ReleasesSection: React.FC<ReleasesSectionProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();
  const { data: events } = useEvents(false);
  const [prevEl, setPrevEl] = React.useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = React.useState<HTMLButtonElement | null>(null);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'SELLING FAST': return t('status.selling_fast');
      case 'SOLD OUT': return t('status.sold_out');
      case 'JUST ANNOUNCED': return t('status.just_announced');
      default: return status;
    }
  };

  return (
    <div className="w-full bg-transparent text-white py-24 px-4 md:px-12 border-t border-white/10" id="releases">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-white/20 pb-4">
          <h2 className="text-4xl md:text-6xl uppercase font-black tracking-tighter text-action-orange">{t('releases.title')}</h2>
          <a href="/events" className="font-mono text-sm uppercase hover:text-action-orange transition-colors">{t('releases.view_all')}</a>
        </div>

        <div className="relative group">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl,
              nextEl,
            }}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.1 },
              1024: { slidesPerView: 2.5 },
              1280: { slidesPerView: 3 },
            }}
            className="w-full"
          >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                <div
                  onClick={() => onOpenModal(event)}
                  className="group cursor-pointer relative overflow-hidden rounded-sm"
                >
                  {/* Image Container - Flyer Style Aspect Ratio */}
                  <div className="aspect-[3/4] overflow-hidden relative bg-gray-900 border border-white/10 group-hover:border-action-orange/50 transition-colors">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${event.status === 'SOLD OUT' ? 'grayscale opacity-50' : ''}`}
                    />

                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold uppercase tracking-wider z-20 shadow-lg ${event.status === 'SELLING FAST' ? 'bg-action-orange text-white' :
                      event.status === 'SOLD OUT' ? 'bg-gray-600 text-white' :
                        'bg-purple-600 text-white'
                      }`}>
                      {getStatusText(event.status)}
                    </div>

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 z-10"></div>

                    {/* Text Content Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col gap-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-3xl font-black uppercase leading-none font-display tracking-tight text-white group-hover:text-action-orange transition-colors drop-shadow-lg">
                        {event.title}
                      </h3>
                      <div className="flex justify-between items-center border-t border-white/30 pt-3 mt-2">
                        <p className="font-bold text-lg text-white uppercase drop-shadow-md">{event.date}</p>
                        <div className="text-right">
                          {event.address && <p className="font-mono text-xs text-gray-300 uppercase tracking-widest">{event.address}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Hover 'Get Ticket' Overlay (Centered) */}
                    <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="font-display font-bold text-xl border-2 border-action-orange text-action-orange bg-black px-6 py-2 uppercase transform -rotate-12 group-hover:rotate-0 transition-transform duration-300 shadow-[0_0_20px_rgba(255,69,0,0.5)]">
                        {t('releases.get_ticket')}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Navigation Controls */}
        <div className="flex items-center justify-between mt-8 text-white font-mono text-sm uppercase">
          <button ref={setPrevEl} className="hover:text-action-orange transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
            PREVIOUS
          </button>
          <div className="h-[1px] bg-white/20 flex-1 mx-4"></div>
          <button ref={setNextEl} className="hover:text-action-orange transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReleasesSection;