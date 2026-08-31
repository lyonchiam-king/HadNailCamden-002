import React, { useState } from 'react';
import { SALON_DETAILS } from '../data/salonData';
import { Phone, Instagram, Calendar, Menu, X, MapPin } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'style-finder', label: 'Style Finder' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1E1E1E] border-b border-[#D400FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Brand & Status Indicator */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => { onSelectTab('home'); setMobileMenuOpen(false); }}
            className="flex items-center text-left group focus-visible:ring-2 focus-visible:ring-[#D400FF] rounded-md transition-all"
          >
            <span className="font-heading font-black tracking-tighter text-xl sm:text-2xl uppercase italic border-r border-[#D400FF] pr-4 text-white group-hover:text-[#D400FF] transition-colors">
              HAD NAILS
            </span>
          </button>

          {/* Real-time status badge from Geometric theme */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-900/30 rounded-full border border-green-500/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Open Now • Next Slot: 14:30 Today</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-[#A0A0A0]">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`transition-colors ${
                  isActive
                    ? 'text-[#D400FF]'
                    : 'hover:text-white'
                } focus-visible:ring-1 focus-visible:ring-[#D400FF]`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Header Right Phone & Action */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${SALON_DETAILS.phoneClean}`}
            className="text-[11px] font-bold text-white hover:text-[#D400FF] transition-colors flex items-center gap-1.5"
            title="Call Holli directly"
          >
            <Phone className="w-3.5 h-3.5 text-[#D400FF]" />
            <span>{SALON_DETAILS.phone}</span>
          </a>

          <a
            href={SALON_DETAILS.instagramUrls[0]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @had_nails"
            className="p-1.5 text-[#A0A0A0] hover:text-[#D400FF] transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenBooking}
            className="bg-[#D400FF] text-black px-4 py-1.5 text-xs font-black uppercase tracking-tight hover:scale-105 active:scale-95 transition-transform shadow-[2px_2px_0px_0px_#FFFFFF]"
          >
            Book Slot
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={`tel:${SALON_DETAILS.phoneClean}`}
            className="p-1.5 text-[#D400FF] border border-[#D400FF]/40 rounded"
            aria-label="Call salon"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white border border-white/20 rounded"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#1E1E1E] border-b border-[#D400FF] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${
                  currentTab === item.id
                    ? 'bg-[#D400FF] text-black'
                    : 'bg-[#121212] text-[#A0A0A0] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#D400FF]/20 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#D400FF] text-black font-black uppercase tracking-tight py-3 shadow-[3px_3px_0px_0px_#FFFFFF] text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Slot</span>
            </button>
            
            <div className="flex items-center justify-between pt-1 px-1">
              <a
                href={SALON_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#A0A0A0] hover:text-white"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D400FF]" />
                <span>92 Camden High St</span>
              </a>

              <a
                href={SALON_DETAILS.instagramUrls[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-[#D400FF] hover:underline"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@had_nails</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
