import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SERVICES } from '../data/salonData';
import { ServiceItem } from '../types';
import { Clock, Tag, X, Sparkles, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Geometric theme tag mappings for each service
  const serviceTagsMap: Record<string, string[]> = {
    'acrylic-full-set': ['BOLD', 'DURABLE'],
    'nail-refresh': ['QUICK', 'CLEAN'],
    'nail-art': ['CUSTOM', 'DETAILED'],
    'natural-care': ['HEALTHY', 'STRONG'],
  };

  return (
    <section id="services" className="py-12 bg-[#121212] border-b border-[#D400FF]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Heading with Geometric styling */}
        <div className="p-4 border-b border-[#D400FF]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-sm sm:text-lg font-black uppercase tracking-[0.2em] text-white italic">
              Service Menu
            </h2>
            <span className="text-[10px] text-[#D400FF] font-bold uppercase tracking-widest px-2 py-0.5 border border-[#D400FF]">
              Holli's Camden Salon
            </span>
          </div>
          <span className="text-[10px] text-[#A0A0A0] uppercase tracking-widest hidden sm:inline">
            Tap any service to view & book ↓
          </span>
        </div>

        {/* 4 Cards in Geometric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#D400FF]/20">
          {SERVICES.map((service, index) => {
            const tags = serviceTagsMap[service.id] || ['CAMDEN', 'ART'];
            return (
              <motion.div
                key={service.id}
                layoutId={shouldReduceMotion ? undefined : `card-${service.id}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                onClick={() => setSelectedService(service)}
                className="group cursor-pointer border-r border-b border-[#D400FF]/20 p-5 flex flex-col justify-between bg-gradient-to-t from-[#1E1E1E] to-[#121212] hover:bg-[#1E1E1E] transition-all focus-visible:ring-1 focus-visible:ring-[#D400FF]"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedService(service); }}
              >
                <div>
                  {/* Image Container with Geometric Border */}
                  <div className="relative h-44 w-full overflow-hidden bg-[#121212] border border-[#D400FF]/20 mb-4">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Geometric Title & Tags */}
                  <div className="space-y-2">
                    <h3 className="font-black text-base uppercase leading-tight text-white group-hover:text-[#D400FF] transition-colors italic">
                      {service.name}
                    </h3>

                    {/* Geometric Crisp Tags */}
                    <div className="flex gap-1.5 flex-wrap">
                      {tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[9px] bg-white text-black px-1.5 py-0.5 font-bold uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-[#A0A0A0] line-clamp-2 pt-1 leading-normal">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 mt-4 border-t border-[#D400FF]/20 flex items-center justify-between text-xs">
                  <span className="text-[#A0A0A0] flex items-center gap-1 text-[11px] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#D400FF]" />
                    {service.duration}
                  </span>
                  <span className="text-[#D400FF] font-bold text-xs uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {service.priceTag} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Showcase Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              layoutId={shouldReduceMotion ? undefined : `card-${selectedService.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#1E1E1E] border-2 border-[#D400FF] shadow-[8px_8px_0px_0px_rgba(212,0,255,0.4)] p-6 sm:p-8 space-y-6"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 text-[#A0A0A0] hover:text-white bg-[#121212] border border-[#D400FF]/40 focus-visible:ring-1 focus-visible:ring-[#D400FF]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-52 overflow-hidden bg-[#121212] border border-[#D400FF]/40">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {selectedService.badges.map((b, bIdx) => (
                    <span key={bIdx} className="text-xs font-black px-2 py-0.5 bg-[#D400FF] text-black uppercase tracking-wider">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-black text-2xl text-white italic uppercase">
                    {selectedService.name}
                  </h3>
                  <span className="text-xs font-bold px-3 py-1 bg-[#D400FF]/20 text-[#D400FF] border border-[#D400FF]">
                    {selectedService.priceTag}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#A0A0A0]">
                  <span className="flex items-center gap-1 font-bold">
                    <Clock className="w-4 h-4 text-[#D400FF]" />
                    {selectedService.duration}
                  </span>
                  <span>•</span>
                  <span>Artist: Holli</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                {selectedService.fullDesc}
              </p>

              {selectedService.popularFor && (
                <div className="p-3 bg-[#121212] border border-[#D400FF]/30 text-xs text-white">
                  <Sparkles className="w-4 h-4 text-[#D400FF] inline mr-2" />
                  <span><strong>Popular for:</strong> {selectedService.popularFor}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    const svcName = selectedService.name;
                    setSelectedService(null);
                    onSelectServiceToBook(svcName);
                  }}
                  className="w-full bg-[#D400FF] text-black py-3.5 text-base font-black uppercase tracking-tight shadow-[3px_3px_0px_0px_#FFFFFF] hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <Tag className="w-4 h-4" />
                  <span>Book {selectedService.name}</span>
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto text-xs font-bold text-[#A0A0A0] hover:text-white py-3 px-6 border border-white/20 uppercase tracking-widest"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
