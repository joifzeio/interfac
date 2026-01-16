import React, { useState, useMemo } from 'react';
import { City } from '@/types';
import { RAW_CITIES, isEventPast } from '@/data/cities';
import { useEvents } from '@/hooks/useEvents';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import CityList from '@/components/CityList';
import PastEvents from '@/components/PastEvents';
import MobileStickyButton from '@/components/MobileStickyButton';
import Marquee from '@/components/Marquee';
import TicketModal from '@/components/TicketModal';

const Index: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch events from database
  const { data: upcomingDbEvents = [] } = useEvents(false);
  const { data: pastDbEvents = [] } = useEvents(true);

  // Merge database events with static city list
  const upcomingEvents = useMemo(() => {
    return RAW_CITIES.map(city => {
      // Find matching event from database for this city
      const dbEvent = upcomingDbEvents.find(
        event => event.city_id === city.id && !event.is_past
      );

      if (dbEvent) {
        // Return city with database event data
        return {
          id: city.id,
          name: dbEvent.city_name,
          dateDisplay: dbEvent.date_display,
          isoDate: dbEvent.iso_date,
          status: dbEvent.status as 'available' | 'sold-out' | 'soon',
          venue: dbEvent.venue || undefined,
          address: dbEvent.address || undefined,
          ticketUrl: dbEvent.ticket_url || undefined,
          flyerUrl: dbEvent.flyer_url || undefined,
        };
      }

      // Return default "Date TBA" city
      return city;
    });
  }, [upcomingDbEvents]);

  // Convert past database events to City format
  const pastEvents = useMemo(() => {
    return pastDbEvents.map(event => ({
      id: event.city_id,
      name: event.city_name,
      dateDisplay: event.date_display,
      isoDate: event.iso_date,
      status: event.status as 'available' | 'sold-out' | 'soon',
      venue: event.venue || undefined,
      address: event.address || undefined,
      ticketUrl: event.ticket_url || undefined,
      flyerUrl: event.flyer_url || undefined,
    }));
  }, [pastDbEvents]);

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCity(null), 300);
  };

  const handleScrollToPast = () => {
    const element = document.getElementById('past-events');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-void-black text-off-white font-sans selection:bg-intl-orange selection:text-background">
      {/* Background handles the video AND the flyer override on hover */}
      <Background activeFlyer={hoveredCity?.flyerUrl} />
      
      <Navbar />
      
      <div className="relative z-10">
        <CityList 
          cities={upcomingEvents} 
          onSelectCity={handleSelectCity} 
          onHoverCity={setHoveredCity}
        />
        
        <PastEvents events={pastEvents} />
      </div>

      <MobileStickyButton />
      <Marquee />
      
      <TicketModal 
        city={selectedCity} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onScrollToPast={handleScrollToPast}
      />
    </main>
  );
};

export default Index;
