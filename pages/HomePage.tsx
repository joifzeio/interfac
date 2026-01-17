import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MenuOverlay from '../components/MenuOverlay';
import HeroSlider from '../components/HeroSlider';
import EventsSection from '../components/EventsSection';
import ReleasesSection from '../components/ReleasesSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import TicketModal from '../components/TicketModal';
import { TicketEvent } from '../types';

const HomePage: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<TicketEvent | null>(null);

    useEffect(() => {
        if (isMenuOpen || selectedEvent) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen, selectedEvent]);

    return (
        <div className="bg-transparent min-h-screen text-white selection:bg-action-orange selection:text-white font-sans">
            <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <MenuOverlay isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />

            <main className={`transition-all duration-500 ${isMenuOpen ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100'}`}>
                <HeroSlider />
                <ReleasesSection onOpenModal={setSelectedEvent} />
                <NewsletterSection />

                {/* EventsSection might be redundant if ReleasesSection is now the main event list, 
            but keeping for now as it was in original App.tsx */}
                <EventsSection />
                <Footer />
            </main>

            <TicketModal
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
            />
        </div>
    );
};

export default HomePage;
