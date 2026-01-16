import React from 'react';
import { X } from 'lucide-react';
import { TicketEvent } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface TicketModalProps {
  event: TicketEvent | null;
  onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ event, onClose }) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate loading delay for the widget (or wait for actual widget load event if available)
  React.useEffect(() => {
    if (event) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [event]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Content - Industrial Luxury Style */}
      <div className="relative w-full max-w-2xl bg-[#050505] border border-[#333] shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in duration-300">

        {/* Custom Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:-top-16 md:right-0 group flex items-center gap-3 text-white transition-colors"
        >
          <span className="hidden md:block font-mono text-sm tracking-widest group-hover:text-[#FF4500]">CLOSE</span>
          <div className="bg-black border border-white/20 p-2 group-hover:border-[#FF4500] group-hover:text-[#FF4500] transition-colors">
            <X size={24} />
          </div>
        </button>



        <div className="p-1">
          <div className="p-6 md:p-8 text-center">
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase mb-2 text-white tracking-widest">
              {event.title}
            </h2>
            <div className="flex justify-center mb-8">
              <p className="text-gray-400 font-mono text-sm md:text-base uppercase tracking-widest border-b border-gray-800 pb-4 px-8">
                {event.date} // {event.venue}
              </p>
            </div>

            {/* Loading State & Widget Container */}
            <div className="relative min-h-[600px] w-full bg-[#050505]">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-opacity duration-500">
                  {/* Pulse Animation */}
                  <div className="relative w-24 h-16 border border-[#FF4500]/30 bg-[#FF4500]/5 animate-pulse flex items-center justify-center">
                    <div className="w-full h-[1px] bg-[#FF4500]/50 absolute top-2"></div>
                    <div className="w-full h-[1px] bg-[#FF4500]/50 absolute bottom-2"></div>
                    <span className="text-[#FF4500] font-mono text-xs tracking-widest animate-pulse">LOADING</span>
                  </div>
                </div>
              )}

              {/* Billetweb Iframe */}
              {event.billetweb_id ? (
                <iframe
                  title={`Billetterie ${event.title}`}
                  src={`https://www.billetweb.fr/shop.php?event=${event.billetweb_id}&color=FF4500`}
                  className={`w-full h-[600px] border-none bg-transparent transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                  allow="camera; microphone; payment; fullscreen"
                  sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-modals"
                  onLoad={() => setIsLoading(false)}
                />
              ) : (
                <div className="w-full h-[600px] flex items-center justify-center border border-white/10 text-gray-500 font-mono text-sm uppercase">
                  Ticketing coming soon
                </div>
              )}
            </div>

            <div className="mt-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              SECURE TRANSACTION // ENCRYPTED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;