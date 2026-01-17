import React from 'react';
import Crosshair from './Crosshair';
import { useLanguage } from '../contexts/LanguageContext';

const RadioSection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="w-full bg-transparent text-white py-20 px-4 md:px-12 relative border-t border-white/10">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                    <h2 className="text-4xl md:text-6xl uppercase font-bold tracking-tighter">{t('radio.title')}</h2>
                    <a href="#radio" className="font-mono text-sm uppercase hover:underline mt-4 md:mt-0">{t('radio.archive')}</a>
                </div>

                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gray-900 overflow-hidden group">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: "url('https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/68874d8943fb430e61b8bb67_Banner%20Adam%20Website1%20(1).png')" }}
                    ></div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="font-mono text-xs md:text-sm border border-white/30 px-2 py-1 uppercase backdrop-blur-sm">
                                SET_005
                            </div>
                            <div className="font-mono text-xs md:text-sm uppercase">
                                2024
                            </div>
                        </div>

                        <div className="flex items-end justify-between">
                            <div>
                                <div className="font-mono text-xs md:text-sm text-gray-300 uppercase mb-2">{t('radio.recorded')}</div>
                                <h3 className="text-2xl md:text-5xl font-bold uppercase max-w-2xl leading-none">
                                    Soiree: Live from Warehouse 88
                                </h3>
                            </div>

                            <button className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group-hover:scale-110">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mock Mixcloud Player Bar */}
                <div className="mt-8 border-t border-white/20 pt-8 flex items-center gap-4">
                    <div className="flex-1 h-1 bg-white/20 relative">
                        <div className="absolute left-0 top-0 h-full w-1/3 bg-white"></div>
                    </div>
                    <span className="font-mono text-xs">22:45 / 58:00</span>
                </div>
            </div>
            <Crosshair position="top-right" className="m-4 md:m-12 opacity-50" />
        </div>
    );
};

export default RadioSection;