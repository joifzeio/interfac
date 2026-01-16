import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEvents } from '../hooks/useEvents';
import ImageWithFallback from './ImageWithFallback';

const EventsSection: React.FC = () => {
  const { data: events } = useEvents(true);

  return (
    <div className="w-full bg-black text-white py-20 px-4 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-white/20 pb-4">
          <h2 className="text-4xl md:text-6xl uppercase font-bold tracking-tighter">Past Events</h2>
          <a href="#events" className="font-mono text-sm uppercase hover:underline">View All</a>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.1 },
            1024: { slidesPerView: 2.5 },
          }}
          className="w-full"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden bg-gray-900 relative mb-4">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-bold uppercase leading-none">{event.title}</h3>
                  <p className="font-mono text-sm text-gray-400 uppercase">{event.date}</p>
                  {event.address && <p className="font-mono text-xs text-gray-500 uppercase">{event.address}</p>}
                </div>
                <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button className="border border-white/50 px-4 py-2 text-xs font-mono uppercase hover:bg-white hover:text-black transition-colors">Tickets</button>
                  <button className="text-xs font-mono uppercase hover:underline p-2">+ More Info</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default EventsSection;