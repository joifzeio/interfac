import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../contexts/EventsContext';
import { Tour } from '../types';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';

const COMMON_CITIES = [
    "London, UK", "Paris, France", "Berlin, Germany", "Amsterdam, Netherlands",
    "Barcelona, Spain", "Ibiza, Spain", "New York, USA", "Miami, USA",
    "Los Angeles, USA", "Tokyo, Japan", "Sydney, Australia", "Buenos Aires, Argentina"
];

const TourCreator: React.FC = () => {
    const navigate = useNavigate();
    const { addTour } = useEvents();

    const [tourDetails, setTourDetails] = useState({
        title: '',
        description: '',
        flyer: ''
    });

    const [cities, setCities] = useState([
        { cityName: '', date: '', venue: '', price: '', flyer: '' }
    ]);

    const handleTourChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTourDetails({ ...tourDetails, [e.target.name]: e.target.value });
    };

    const handleCityChange = (index: number, field: string, value: string) => {
        const newCities = [...cities];
        // @ts-ignore
        newCities[index][field] = value;
        setCities(newCities);
    };

    const addCity = () => {
        setCities([...cities, { cityName: '', date: '', venue: '', price: '', flyer: '' }]);
    };

    const removeCity = (index: number) => {
        if (cities.length > 1) {
            const newCities = cities.filter((_, i) => i !== index);
            setCities(newCities);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!tourDetails.title || !tourDetails.flyer) {
            alert("Please fill in basic tour details");
            return;
        }

        // Filter out empty rows first
        const validCities = cities.filter(c => c.cityName && c.date);

        if (validCities.length === 0) {
            alert("Please add at least one city with a name and date.");
            return;
        }

        // Validate Image URLs (Prevent Base64 crash)
        const isBase64 = (str: string) => str.length > 5000 && (str.includes('data:image') || !str.startsWith('http'));
        if (isBase64(tourDetails.flyer) || validCities.some(c => c.flyer && isBase64(c.flyer))) {
            alert("Image URL is too long! It looks like you pasted a Base64 image. \n\nPlease use a standard image link (starting with http/https) instead of pasting an image directly.");
            return;
        }

        // Validate Flyers for Multi-City Tours
        if (validCities.length > 1) {
            const missingFlyers = validCities.some(c => !c.flyer);
            if (missingFlyers) {
                alert("For multi-city tours, a specific flyer is required for EACH city as they are displayed individually.");
                return;
            }
        }

        // AUTO-FIX: Normalize URLs (prepend https:// if missing) to prevent broken images
        const normalizeUrl = (url: string) => {
            if (!url) return '';
            if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
                return url;
            }
            return `https://${url}`;
        };

        const finalMainFlyer = normalizeUrl(tourDetails.flyer);
        const finalCities = validCities.map(c => ({
            ...c,
            flyer: normalizeUrl(c.flyer)
        }));

        const newTour: Tour = {
            id: Date.now().toString(),
            ...tourDetails,
            flyer: finalMainFlyer,
            cities: finalCities
        };

        addTour(newTour);
        navigate('/admin');
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-white/50 hover:text-white mb-8 font-mono uppercase text-sm">
                <ArrowLeft size={16} /> Cancel
            </button>

            <h1 className="text-3xl font-black uppercase mb-8">Create New Tour</h1>

            <form onSubmit={handleSubmit} className="space-y-12">

                {/* Section 1: General Info */}
                <section className="bg-white/5 p-8 border border-white/10 rounded-sm">
                    <h2 className="text-xl font-bold uppercase mb-6 text-action-orange">1. General Information</h2>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-white/70 text-xs font-mono uppercase mb-2">Tour Title</label>
                            <input
                                type="text"
                                name="title"
                                value={tourDetails.title}
                                onChange={handleTourChange}
                                placeholder="Ex: SUMMER FESTIVAL TOUR 2026"
                                className="w-full bg-black/50 border border-white/20 p-4 text-white placeholder-white/20 focus:outline-none focus:border-action-orange transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white/70 text-xs font-mono uppercase mb-2">Description</label>
                            <textarea
                                name="description"
                                value={tourDetails.description}
                                onChange={handleTourChange}
                                placeholder="Tour description..."
                                className="w-full bg-black/50 border border-white/20 p-4 text-white placeholder-white/20 focus:outline-none focus:border-action-orange transition-colors h-32"
                            />
                        </div>
                        <div>
                            <label className="block text-white/70 text-xs font-mono uppercase mb-2">Main Flyer URL (Cover)</label>
                            <input
                                type="text"
                                name="flyer"
                                value={tourDetails.flyer}
                                onChange={handleTourChange}
                                placeholder="https://..."
                                className="w-full bg-black/50 border border-white/20 p-4 text-white placeholder-white/20 focus:outline-none focus:border-action-orange transition-colors"
                                required
                            />
                            {tourDetails.flyer && (
                                <div className="mt-4 w-40 aspect-[4/5] bg-gray-900 overflow-hidden border border-white/20">
                                    <img src={tourDetails.flyer} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Section 2: Cities */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold uppercase text-action-orange">2. Tour Stops & Cities</h2>
                        <button
                            type="button"
                            onClick={addCity}
                            className="flex items-center gap-2 text-action-orange hover:text-white font-mono text-sm uppercase transition-colors"
                        >
                            <Plus size={16} /> Add Stop
                        </button>
                    </div>

                    <div className="space-y-6">
                        {cities.map((city, index) => {
                            const isMultiCity = cities.length > 1;
                            const flyerLabel = isMultiCity
                                ? "City Specific Flyer (REQUIRED for multi-city tours)"
                                : "City Flyer (Optional - defaults to Main Flyer)";

                            return (
                                <div key={index} className="bg-white/5 p-6 border border-white/10 rounded-sm relative group">
                                    <div className="absolute -left-3 -top-3 w-8 h-8 bg-action-orange text-black font-bold flex items-center justify-center rounded-full text-xs">
                                        {index + 1}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeCity(index)}
                                        className="absolute top-4 right-4 text-white/20 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-white/70 text-xs font-mono uppercase mb-2">City</label>
                                            <select
                                                value={city.cityName}
                                                onChange={(e) => handleCityChange(index, 'cityName', e.target.value)}
                                                className="w-full bg-black/50 border border-white/20 p-3 text-white focus:outline-none focus:border-action-orange transition-colors"
                                            >
                                                <option value="">Select City</option>
                                                {COMMON_CITIES.map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-white/70 text-xs font-mono uppercase mb-2">Date</label>
                                            <input
                                                type="text"
                                                value={city.date}
                                                onChange={(e) => handleCityChange(index, 'date', e.target.value)}
                                                placeholder="Ex: 24 NOV"
                                                className="w-full bg-black/50 border border-white/20 p-3 text-white focus:outline-none focus:border-action-orange transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white/70 text-xs font-mono uppercase mb-2">Venue</label>
                                            <input
                                                type="text"
                                                value={city.venue}
                                                onChange={(e) => handleCityChange(index, 'venue', e.target.value)}
                                                placeholder="Club Name"
                                                className="w-full bg-black/50 border border-white/20 p-3 text-white focus:outline-none focus:border-action-orange transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white/70 text-xs font-mono uppercase mb-2">Price</label>
                                            <input
                                                type="text"
                                                value={city.price}
                                                onChange={(e) => handleCityChange(index, 'price', e.target.value)}
                                                placeholder="€25.00"
                                                className="w-full bg-black/50 border border-white/20 p-3 text-white focus:outline-none focus:border-action-orange transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white/70 text-xs font-mono uppercase mb-2">Billetweb Event ID</label>
                                            <div className="flex items-center">
                                                <span className="bg-white/10 border border-white/20 border-r-0 p-3 text-white/50 text-sm font-mono select-none">
                                                    billetweb.fr/
                                                </span>
                                                <input
                                                    type="text"
                                                    // @ts-ignore
                                                    value={city.billetweb_id || ''}
                                                    onChange={(e) => handleCityChange(index, 'billetweb_id', e.target.value)}
                                                    placeholder="my-event-slug"
                                                    className="w-full bg-black/50 border border-white/20 p-3 text-white focus:outline-none focus:border-action-orange transition-colors"
                                                />
                                            </div>
                                            <p className="text-[10px] text-white/30 mt-1">Paste ONLY the slug (e.g. for 'billetweb.fr/halloween', paste 'halloween')</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className={`block text-xs font-mono uppercase mb-2 ${isMultiCity ? 'text-action-orange font-bold' : 'text-white/70'}`}>
                                                {flyerLabel}
                                            </label>
                                            <input
                                                type="text"
                                                value={city.flyer}
                                                onChange={(e) => handleCityChange(index, 'flyer', e.target.value)}
                                                placeholder={isMultiCity ? "URL (Required)" : "URL (Leave blank to use main tour flyer)"}
                                                className={`w-full bg-black/50 border p-3 text-white focus:outline-none transition-colors ${isMultiCity && !city.flyer ? 'border-action-orange/50' : 'border-white/20 focus:border-action-orange'}`}
                                                required={isMultiCity}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <div className="pt-8 border-t border-white/20 flex justify-end">
                    <button
                        type="submit"
                        className="bg-action-orange text-white px-8 py-4 font-black uppercase tracking-wider hover:bg-orange-600 transition-colors flex items-center gap-2"
                    >
                        <Save size={20} /> Publish Tour
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TourCreator;
