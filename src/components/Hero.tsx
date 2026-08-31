import React from 'react';
import { Calendar, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { HIGHLIGHT_BADGES, SALON_DETAILS } from '../data/salonData';
import heroImg from '../assets/images/hero_acrylic_nail_art_1788112510108.jpg';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreStyleFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreStyleFinder }) => {
  return (
    <section className="relative bg-[#121212] overflow-hidden border-b border-[#D400FF]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 border-x border-[#D400FF]/20">
        
        {/* Left Section with Geometric Border */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#D400FF]/20 flex flex-col justify-between space-y-8 bg-[#121212]">
          <div className="space-y-6">
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.9] uppercase mb-4 italic text-white">
              Nail Art That <span className="text-[#D400FF]">Survives</span> Camden High Street
            </h1>

            <p className="text-[#A0A0A0] text-base sm:text-lg max-w-lg leading-tight">
              Book Holli's acrylics and refreshes online. No DMs, no waiting for open hours.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Primary Brutalist Button */}
              <button
                onClick={onOpenBooking}
                className="bg-[#D400FF] text-black px-8 py-4 text-lg sm:text-xl font-black uppercase tracking-tight hover:scale-105 active:scale-95 transition-transform shadow-[4px_4px_0px_0px_#FFFFFF] flex items-center justify-center gap-3"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your Slot</span>
              </button>

              <button
                onClick={onExploreStyleFinder}
                className="border border-white/20 hover:border-[#D400FF] text-white px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1E1E1E] transition-colors"
              >
                Try 3-Tap Style Finder
              </button>
            </div>
          </div>

          {/* Geometric Badges */}
          <div className="space-y-4 pt-4 border-t border-[#D400FF]/20">
            <div className="flex flex-wrap gap-3">
              <div className="px-3 py-1 border border-[#D400FF] text-[#D400FF] text-[10px] font-bold uppercase tracking-widest">
                Holli's Artistry
              </div>
              <div className="px-3 py-1 border border-[#D400FF] text-[#D400FF] text-[10px] font-bold uppercase tracking-widest">
                Long-Lasting
              </div>
              <div className="px-3 py-1 border border-[#D400FF] text-[#D400FF] text-[10px] font-bold uppercase tracking-widest">
                Inclusive Space
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#A0A0A0] mb-1">Location</p>
              <a
                href={SALON_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm hover:underline font-bold text-white flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D400FF]" />
                <span>Tusk, 92 Camden High St, London NW1 0LT</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Hero Image Card with Geometric Frame */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-center bg-[#1E1E1E]/50">
          <div className="relative border border-[#D400FF]/40 bg-[#121212] p-2 shadow-[8px_8px_0px_0px_rgba(212,0,255,0.2)]">
            <img
              src={heroImg}
              alt="Had Nails Camden Acrylic Nail Art by Holli"
              className="w-full h-[320px] sm:h-[400px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-[#1E1E1E] border-t border-[#D400FF]/30 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#A0A0A0]">Featured Artwork</p>
                <p className="text-xs sm:text-sm font-black uppercase tracking-tight text-white">Custom Neon Chrome Acrylic Set</p>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 bg-[#D400FF] text-black uppercase tracking-widest">
                by Holli
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
