import React from 'react';
import { motion } from 'motion/react';
import { PROOF_ITEMS } from '../data/salonData';
import { ShieldCheck, Star, Sparkles, HeartHandshake } from 'lucide-react';

export const ProofSection: React.FC = () => {
  return (
    <section className="py-12 bg-[#181818] border-b border-[#D400FF]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="p-4 border-b border-[#D400FF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm sm:text-lg font-black uppercase tracking-[0.2em] text-white italic">
              Verified Feedback
            </h2>
            <span className="text-[10px] text-[#D400FF] font-bold uppercase tracking-widest px-2 py-0.5 border border-[#D400FF]">
              Camden Town
            </span>
          </div>
          <p className="text-[10px] text-[#A0A0A0] uppercase tracking-widest">
            Real customer words from Google Business & Camden locals
          </p>
        </div>

        {/* 3 Verified Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#D400FF]/20">
          {PROOF_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="bg-[#121212] p-5 border-r border-b border-[#D400FF]/20 flex flex-col justify-between space-y-4 hover:bg-[#1E1E1E] transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] bg-white text-black px-2 py-0.5 font-bold uppercase tracking-wider">
                    {item.proofTag}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-zinc-300 italic leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#D400FF]/20 flex items-center justify-between text-xs text-[#A0A0A0]">
                <span className="font-bold text-white uppercase text-[11px]">{item.author}</span>
                <span className="text-[10px] uppercase tracking-wider">{item.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
