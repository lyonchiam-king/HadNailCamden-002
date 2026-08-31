import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SALON_DETAILS } from '../data/salonData';
import { Phone, Calendar } from 'lucide-react';

interface MobileFloatingBarProps {
  onOpenBooking: () => void;
}

export const MobileFloatingBar: React.FC<MobileFloatingBarProps> = ({ onOpenBooking }) => {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Reveal bar once user scrolls past initial hero height (~350px)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#1E1E1E]/95 backdrop-blur-lg border-t border-[#D400FF]/40 p-3 shadow-[0_-5px_25px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center gap-2 max-w-md mx-auto">
            
            {/* Call Holli Tel Link */}
            <a
              href={`tel:${SALON_DETAILS.phoneClean}`}
              className="flex-1 flex items-center justify-center gap-2 bg-[#121212] hover:bg-[#252525] active:bg-[#000000] text-white text-xs font-bold py-3 px-3 rounded-xl border border-[#2A2A2A] active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4 text-[#D400FF]" />
              <span>Call Holli</span>
            </a>

            {/* Book Online Primary Button */}
            <button
              onClick={onOpenBooking}
              className="flex-[1.5] flex items-center justify-center gap-2 bg-[#D400FF] hover:bg-[#B000D4] active:bg-[#800099] text-white text-xs font-heading font-extrabold py-3 px-4 rounded-xl shadow-[0_0_15px_rgba(212,0,255,0.5)] active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-white"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Online</span>
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
