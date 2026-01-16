import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface BackgroundProps {
  activeFlyer?: string | null;
}

const Background: React.FC<BackgroundProps> = ({ activeFlyer }) => {
  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none bg-void-black">
      {/* Base Video Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-void-black/70 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
          poster="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-concert-crowd-with-lights-2144-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Flyer Overlay Layer */}
      <AnimatePresence>
        {activeFlyer && (
          <motion.div
            key={activeFlyer}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 z-10"
          >
            <div className="absolute inset-0 bg-void-black/50 mix-blend-multiply z-10" />
            <img 
              src={activeFlyer} 
              alt="Background Preview" 
              className="w-full h-full object-cover blur-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-void-black via-transparent to-void-black z-20" />
    </div>
  );
};

export default Background;
