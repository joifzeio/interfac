import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TicketEvent, Tour } from '../types';
import { EVENTS } from '../constants';

// Initial dummy events to start with if localStorage is empty
const INITIAL_EVENTS: TicketEvent[] = [
    { id: 1, title: "POST PARTIELS", date: "JEU 29 JAN", venue: "METROPOLIS", image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/671bae9107aeea92c13f2ac6_DC315_PORTRAIT.jpeg", status: "SELLING FAST", is_past: false },
    { id: 2, title: "NUIT DES ETUDIANTS", date: "10 NOV", venue: "T7 PARIS", image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/6707e723c6d0be229f4c306a_DC314_PORTRAIT.jpeg", status: "SELLING FAST", is_past: true },
    { id: 3, title: "GALA MEDICINE", date: "24 NOV", venue: "L'AUTRE CANAL", image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/66f18a88dfb1a520711078cf_ARMAS2930_PORTRAIT.jpeg", status: "SOLD OUT", is_past: true },
    { id: 4, title: "INTEGRATION", date: "05 DEC", venue: "HIGH CLUB", image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/66f18918ea4f57ef16957a1a_DC313_PORTRAIT-2.jpeg", status: "SELLING FAST", is_past: true },
    { id: 5, title: "CHRISTMAS BREAK", date: "12 DEC", venue: "LE PETIT SALON", image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/66f1880a4e9cab4eeecd8afa_DC312_PORTRAIT.jpeg", status: "SELLING FAST", is_past: true },
    { id: 6, title: "NEW YEAR EVE", date: "31 DEC", venue: "HANGAR FL", image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/66cdd7e87a671208ef9d6e10_DC311_PORTRAIT.jpeg", status: "JUST ANNOUNCED", is_past: true }
];

interface EventsContextType {
    events: TicketEvent[];
    tours: Tour[];
    addTour: (tour: Tour) => void;
    addEvent: (event: TicketEvent) => void;
    updateEvent: (event: TicketEvent) => void;
    deleteEvent: (id: number) => void;
    resetEvents: () => void;
}

export const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<TicketEvent[]>(() => {
        const saved = localStorage.getItem('dc_events');
        return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    });

    const [tours, setTours] = useState<Tour[]>(() => {
        const saved = localStorage.getItem('dc_tours');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        try {
            localStorage.setItem('dc_events', JSON.stringify(events));
        } catch (error) {
            console.error("Failed to save events to localStorage (likely quota exceeded):", error);
            // Optionally notify user here if we had a toast function in context
        }
    }, [events]);

    useEffect(() => {
        try {
            localStorage.setItem('dc_tours', JSON.stringify(tours));
        } catch (error) {
            console.error("Failed to save tours to localStorage:", error);
        }
    }, [tours]);

    const addEvent = (event: TicketEvent) => {
        setEvents(prev => [event, ...prev]);
    };

    const updateEvent = (event: TicketEvent) => {
        setEvents(prev => prev.map(e => e.id === event.id ? event : e));
    };

    const addTour = (tour: Tour) => {
        // 1. Save the tour itself
        setTours(prev => [...prev, tour]);

        // 2. Generate individual events from the tour cities
        const newEvents: TicketEvent[] = tour.cities.map((city, index) => ({
            id: Date.now() + index, // Simple ID generation
            title: `${tour.title}`, // Event title could be just tour title, or include city
            city: city.cityName,
            date: city.date,
            venue: city.venue,
            image: city.flyer || tour.flyer, // Use city flyer if available, else tour flyer
            status: 'JUST ANNOUNCED',
            price: city.price,
            description: tour.description,
            tourId: tour.id,
            billetweb_id: city.billetweb_id
        }));

        // Add new events to the beginning of the list
        setEvents(prev => [...newEvents, ...prev]);
    };

    const deleteEvent = (id: number) => {
        setEvents(prev => prev.filter(e => e.id !== id));
    };

    const resetEvents = () => {
        setEvents(INITIAL_EVENTS);
        setTours([]);
        localStorage.removeItem('dc_events');
        localStorage.removeItem('dc_tours');
    };

    return (
        <EventsContext.Provider value={{ events, tours, addTour, addEvent, updateEvent, deleteEvent, resetEvents }}>
            {children}
        </EventsContext.Provider>
    );
};

export const useEventsContext = () => {
    const context = useContext(EventsContext);
    if (context === undefined) {
        throw new Error('useEventsContext must be used within an EventsProvider');
    }
    return context;
};

export const useEvents = useEventsContext;
