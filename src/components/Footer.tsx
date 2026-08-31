import React from 'react';
import { SALON_DETAILS } from '../data/salonData';
import { Phone, MapPin, Instagram, ExternalLink, Download, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenBooking }) => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#D400FF]/20 text-[#A0A0A0] text-xs">
      
      {/* Top detailed links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#D400FF]/20">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl font-black text-white tracking-tighter uppercase italic">
                HAD NAILS
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#1E1E1E] text-[#D400FF] border border-[#D400FF]/40 uppercase tracking-widest">
                CAMDEN
              </span>
            </div>
            <p className="text-[#A0A0A0] text-xs leading-relaxed">
              Nail Art That Survives Camden High Street. Sculpted acrylics, clean refreshes, and natural care by Holli.
            </p>
            <p className="text-[11px] text-zinc-500">
              Operating inside Tusk • 92 Camden High St
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <h4 className="font-heading font-black text-white text-xs uppercase tracking-widest italic">Navigation</h4>
            <ul className="space-y-1.5 uppercase font-bold text-[11px]">
              <li>
                <button onClick={() => onSelectTab('home')} className="hover:text-[#D400FF] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('services')} className="hover:text-[#D400FF] transition-colors">
                  Services & Pricing
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('style-finder')} className="hover:text-[#D400FF] transition-colors">
                  Style Finder
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('contact')} className="hover:text-[#D400FF] transition-colors">
                  Location & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-2">
            <h4 className="font-heading font-black text-white text-xs uppercase tracking-widest italic">Contact & Location</h4>
            <div className="space-y-2">
              <a
                href={`tel:${SALON_DETAILS.phoneClean}`}
                className="flex items-center gap-1.5 text-white font-bold hover:text-[#D400FF] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D400FF]" />
                <span>{SALON_DETAILS.phone}</span>
              </a>

              <a
                href={SALON_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-1.5 hover:text-white transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D400FF] shrink-0 mt-0.5" />
                <span>{SALON_DETAILS.address}</span>
              </a>
            </div>
          </div>

          {/* Col 4: Official Socials & Spreadsheet */}
          <div className="space-y-3">
            <h4 className="font-heading font-black text-white text-xs uppercase tracking-widest italic">Official Instagram Profiles</h4>
            <div className="space-y-1.5">
              {SALON_DETAILS.instagramUrls.map((url, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-[#121212] border border-[#D400FF]/20 text-white hover:border-[#D400FF] hover:text-[#D400FF] transition-all text-xs font-mono"
                >
                  <Instagram className="w-4 h-4 text-[#D400FF]" />
                  <span className="truncate">@had_nails ({idx === 0 ? "instagram.com" : "www.instagram.com"})</span>
                  <ExternalLink className="w-3 h-3 shrink-0 ml-auto" />
                </a>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="/api/bookings/export"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-[#A0A0A0] hover:text-white underline font-medium"
                title="Salon Owner Spreadsheet Export Link"
              >
                <Download className="w-3 h-3 text-[#D400FF]" />
                <span>Download Bookings CSV</span>
              </a>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <span>&copy; {new Date().getFullYear()} Had Nails Camden. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-[#D400FF] fill-[#D400FF]" /> for Holli & Camden Town
          </span>
        </div>
      </div>

      {/* Signature Geometric Balance Bottom Banner */}
      <div className="min-h-16 sm:h-20 bg-[#D400FF] shrink-0 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8 py-4 gap-4 text-black">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 font-black uppercase text-xs sm:text-sm italic tracking-tight">
          <span>Longevity: ★★★★★</span>
          <span>Camden's Finest</span>
          <span>Inclusive Space</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${SALON_DETAILS.phoneClean}`}
            className="bg-black text-white px-5 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-colors text-xs uppercase tracking-wider"
          >
            <Phone className="w-3.5 h-3.5 text-[#D400FF]" /> Call Holli
          </a>
          <a
            href={SALON_DETAILS.instagramUrls[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-5 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-colors text-xs uppercase tracking-wider"
          >
            <Instagram className="w-3.5 h-3.5 text-[#D400FF]" /> IG Feed
          </a>
        </div>
      </div>

    </footer>
  );
};
