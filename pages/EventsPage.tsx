import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import MenuOverlay from '../components/MenuOverlay';
import Footer from '../components/Footer';
import TicketModal from '../components/TicketModal';
import ImageWithFallback from '../components/ImageWithFallback';
import { useEvents } from '../hooks/useEvents';
import { useLanguage } from '../contexts/LanguageContext';
import { TicketEvent } from '../types';

const EventsPage: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<TicketEvent | null>(null);
    const { data: events } = useEvents(false); // Fetch upcoming events
    const { t } = useLanguage();

    const getStatusText = (status: string) => {
        switch (status) {
            case 'SELLING FAST': return t('status.selling_fast');
            case 'SOLD OUT': return t('status.sold_out');
            case 'JUST ANNOUNCED': return t('status.just_announced');
            default: return status;
        }
    };

    return (
        <div className="bg-transparent min-h-screen flex flex-col">
            <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <MenuOverlay isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />

            <main className="flex-grow pt-32 px-4 md:px-12 pb-20">
                <div className="max-w-[1600px] mx-auto">
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-12">
                        {t('menu.events')}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                className="group cursor-pointer relative overflow-hidden rounded-sm bg-black border border-white/10 hover:border-action-orange/50 transition-colors"
                            >
                                {/* Image Container */}
                                <div className="aspect-[3/4] overflow-hidden relative">
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

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 z-10" />

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                                        <h3 className="text-3xl font-black uppercase leading-none font-display tracking-tight text-white group-hover:text-action-orange transition-colors mb-2">
                                            {event.title}
                                        </h3>
                                        <div className="flex justify-between items-center border-t border-white/30 pt-3">
                                            <p className="font-bold text-lg text-white uppercase">{event.date}</p>
                                            {event.venue && (
                                                <p className="font-mono text-xs text-gray-300 uppercase tracking-widest">{event.venue}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Hover Button */}
                                    <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <span className="font-display font-bold text-xl border-2 border-action-orange text-action-orange bg-black px-6 py-2 uppercase shadow-[0_0_20px_rgba(255,69,0,0.5)]">
                                            {t('releases.get_ticket')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {events.length === 0 && (
                        <div className="text-center py-20 text-white/50 font-mono">
                            AUCUN ÉVÉNEMENT À VENIR POUR LE MOMENT.
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <TicketModal
                isOpen={!!selectedEvent}
                onClose={() => setSelectedEvent(null)}
                event={selectedEvent}
            />
        </div>
    );
};

export default EventsPage;
