import React from 'react';
import { SALON_DETAILS } from '../data/salonData';
import { MapPin, Phone, Clock, ExternalLink, Calendar, Instagram, Navigation } from 'lucide-react';

interface LocationHoursSectionProps {
  onOpenBooking: () => void;
}

export const LocationHoursSection: React.FC<LocationHoursSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="contact" className="py-12 bg-[#121212] border-b border-[#D400FF]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="p-4 border-b border-[#D400FF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm sm:text-lg font-black uppercase tracking-[0.2em] text-white italic">
              Location & Hours
            </h2>
            <span className="text-[10px] text-[#D400FF] font-bold uppercase tracking-widest px-2 py-0.5 border border-[#D400FF]">
              Inside Tusk Camden
            </span>
          </div>
          <p className="text-[10px] text-[#A0A0A0] uppercase tracking-widest">
            92 Camden High Street • Mornington Crescent
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Location & Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1E1E1E] p-6 border border-[#D400FF]/20 space-y-5">
              
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-[#121212] border border-[#D400FF]/40 text-[#D400FF]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">Address</h3>
                  <p className="text-xs text-zinc-300 font-medium mt-1">{SALON_DETAILS.address}</p>
                  <a
                    href={SALON_DETAILS.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-[#D400FF] font-bold uppercase tracking-wider hover:underline mt-2"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="border-t border-[#D400FF]/20 pt-4 flex items-start gap-3">
                <div className="p-2.5 bg-[#121212] border border-[#D400FF]/40 text-[#D400FF]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">Phone & WhatsApp</h3>
                  <a
                    href={`tel:${SALON_DETAILS.phoneClean}`}
                    className="text-xs text-[#D400FF] font-black uppercase tracking-wider hover:underline block mt-1"
                  >
                    {SALON_DETAILS.phone}
                  </a>
                </div>
              </div>

              <div className="border-t border-[#D400FF]/20 pt-4 flex items-start gap-3">
                <div className="p-2.5 bg-[#121212] border border-[#D400FF]/40 text-[#D400FF]">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">Instagram Profiles</h3>
                  <div className="flex flex-col gap-1 mt-1 text-xs">
                    {SALON_DETAILS.instagramUrls.map((url, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D400FF] font-bold hover:underline flex items-center gap-1 text-[11px] font-mono"
                      >
                        <span>@had_nails ({i === 0 ? "instagram.com" : "www.instagram.com"})</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full bg-[#D400FF] text-black py-3.5 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_#FFFFFF] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Online Now</span>
                </button>
              </div>

            </div>
          </div>

          {/* Operating Hours Table */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#1E1E1E] p-6 border border-[#D400FF]/20 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#D400FF]/20 pb-3">
                <Clock className="w-4 h-4 text-[#D400FF]" />
                <h3 className="font-black text-sm uppercase tracking-widest text-white italic">
                  Opening Hours
                </h3>
              </div>

              <div className="divide-y divide-[#D400FF]/20">
                {SALON_DETAILS.hours.map((item, idx) => {
                  const isClosed = item.hours === "Closed";
                  return (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs">
                      <span className="font-bold uppercase text-white tracking-wider">{item.day}</span>
                      <span className={isClosed ? "text-amber-400 font-bold uppercase text-[11px]" : "text-[#A0A0A0] font-mono"}>
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 p-3 bg-[#121212] border border-[#D400FF]/20 text-[11px] text-[#A0A0A0] flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider">Holidays:</span>
                <span className="text-amber-400 font-bold uppercase tracking-wider">{SALON_DETAILS.holidayNote}</span>
              </div>
            </div>

            {/* Directions Card */}
            <div className="bg-[#1E1E1E] p-4 border border-[#D400FF]/20 text-center space-y-3">
              <Navigation className="w-6 h-6 text-[#D400FF] mx-auto" />
              <p className="font-black text-sm text-white uppercase tracking-wider">92 Camden High St, London NW1 0LT</p>
              <p className="text-xs text-[#A0A0A0]">Inside Tusk salon shoplot. Near Mornington Crescent station.</p>
              <a
                href={SALON_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-[#D400FF] transition-all shadow-[2px_2px_0px_0px_#D400FF]"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Get Walking Directions</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
