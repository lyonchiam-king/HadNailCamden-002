import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STYLE_FINDER_OPTIONS } from '../data/salonData';
import { StyleSelection } from '../types';
import { Sparkles, CheckCircle2, RotateCcw, Calendar, ArrowRight } from 'lucide-react';

interface StyleFinderProps {
  onCompleteStyleFinder: (selection: StyleSelection, recommendedService: string) => void;
}

export const StyleFinder: React.FC<StyleFinderProps> = ({ onCompleteStyleFinder }) => {
  const [step, setStep] = useState<number>(1); // 1: Shape, 2: Length, 3: Vibe, 4: Result
  const [selection, setSelection] = useState<StyleSelection>({
    shape: null,
    length: null,
    vibe: null,
  });

  const handleSelectShape = (shapeId: string) => {
    setSelection(prev => ({ ...prev, shape: shapeId }));
    setStep(2);
  };

  const handleSelectLength = (lengthId: string) => {
    setSelection(prev => ({ ...prev, length: lengthId }));
    setStep(3);
  };

  const handleSelectVibe = (vibeId: string) => {
    setSelection(prev => ({ ...prev, vibe: vibeId }));
    setStep(4);
  };

  const handleReset = () => {
    setSelection({ shape: null, length: null, vibe: null });
    setStep(1);
  };

  const getRecommendation = () => {
    if (!selection.shape || !selection.length || !selection.vibe) return "Custom Nail Art & Set";

    if (selection.vibe === "clean-french" || selection.length === "natural") {
      return "Natural Care & Builder Gel Overlay";
    } else if (selection.vibe === "minimal-chrome" || selection.length === "medium") {
      return "Nail Refresh with Chrome Accent";
    } else if (selection.vibe === "camden-cyberpunk" || selection.vibe === "y2k-glitter" || selection.vibe === "hand-painted") {
      return "Acrylic Full Set + Custom 3D Nail Art";
    } else {
      return "Acrylic Full Set";
    }
  };

  const recommendedService = getRecommendation();

  return (
    <section id="style-finder" className="py-12 sm:py-16 bg-[#181818] border-b border-[#D400FF]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Geometric Header */}
        <div className="text-center space-y-2">
          <div className="inline-block px-3 py-1 border border-[#D400FF] text-[#D400FF] text-[10px] font-bold uppercase tracking-widest">
            3-Tap Consultation
          </div>
          <h2 className="text-3xl sm:text-5xl font-black italic uppercase leading-none text-white">
            Style Finder
          </h2>
          <p className="text-[11px] text-[#A0A0A0] uppercase tracking-widest">
            3 Taps to your Camden look • No DM delay
          </p>
        </div>

        {/* Progress Tracker Strip */}
        <div className="bg-[#121212] p-4 border border-[#D400FF]/20 space-y-3">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-white">
            <span>Progress ({step}/3 Taps)</span>
            <span className="text-[#D400FF]">
              {step === 1 ? "01. Choose Shape" : step === 2 ? "02. Choose Length" : step === 3 ? "03. Choose Vibe" : "04. Recommendation Ready"}
            </span>
          </div>
          
          <div className="w-full bg-[#2A2A2A] h-1.5 overflow-hidden">
            <div
              className="bg-[#D400FF] h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* Current selections pill bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#A0A0A0]">
            <span className="font-bold text-white uppercase text-[10px] tracking-wider">Chosen:</span>
            {selection.shape ? (
              <span className="px-2 py-0.5 bg-white text-black font-bold text-[10px] uppercase">
                Shape: {STYLE_FINDER_OPTIONS.shapes.find(s => s.id === selection.shape)?.label}
              </span>
            ) : <span className="italic text-zinc-600 text-[10px]">No shape yet</span>}

            {selection.length ? (
              <span className="px-2 py-0.5 bg-white text-black font-bold text-[10px] uppercase">
                Length: {STYLE_FINDER_OPTIONS.lengths.find(l => l.id === selection.length)?.label}
              </span>
            ) : null}

            {selection.vibe ? (
              <span className="px-2 py-0.5 bg-[#D400FF] text-black font-bold text-[10px] uppercase">
                Vibe: {STYLE_FINDER_OPTIONS.vibes.find(v => v.id === selection.vibe)?.label}
              </span>
            ) : null}

            {step > 1 && (
              <button
                onClick={handleReset}
                className="ml-auto text-[10px] uppercase tracking-widest font-bold text-[#A0A0A0] hover:text-[#D400FF] flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Interactive Steps container */}
        <div className="bg-[#1E1E1E] p-6 sm:p-8 border border-[#D400FF]/20 min-h-[320px] flex flex-col justify-center">
          <AnimatePresence mode="wait">

            {/* Step 1: Shape */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <p className="text-xs font-bold text-[#D400FF] uppercase tracking-widest mb-2">
                  01. Pick Shape
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {STYLE_FINDER_OPTIONS.shapes.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectShape(item.id)}
                      className="border border-white/20 p-4 text-[11px] uppercase font-bold hover:border-[#D400FF] text-white hover:bg-[#121212] flex flex-col items-center justify-center text-center transition-all focus-visible:ring-1 focus-visible:ring-[#D400FF]"
                    >
                      <span className="text-2xl text-[#D400FF] mb-1">
                        {item.icon}
                      </span>
                      <span className="font-extrabold uppercase tracking-wider block">
                        {item.label}
                      </span>
                      <span className="text-[9px] text-[#A0A0A0] mt-1 font-normal lowercase">
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Length */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <p className="text-xs font-bold text-[#D400FF] uppercase tracking-widest mb-2">
                  02. Select Length
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STYLE_FINDER_OPTIONS.lengths.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectLength(item.id)}
                      className="border border-white/20 p-4 text-xs uppercase font-bold hover:border-[#D400FF] text-white hover:bg-[#121212] flex items-center justify-between text-left transition-all focus-visible:ring-1 focus-visible:ring-[#D400FF]"
                    >
                      <div>
                        <span className="font-extrabold block text-white">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-[#A0A0A0] font-normal">
                          {item.desc}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#D400FF]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Vibe */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <p className="text-xs font-bold text-[#D400FF] uppercase tracking-widest mb-2">
                  03. Select Vibe
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STYLE_FINDER_OPTIONS.vibes.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectVibe(item.id)}
                      className="border border-white/20 p-4 text-xs uppercase font-bold hover:border-[#D400FF] text-white hover:bg-[#121212] flex flex-col text-left transition-all focus-visible:ring-1 focus-visible:ring-[#D400FF]"
                    >
                      <span className="font-extrabold text-[#D400FF]">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-[#A0A0A0] mt-1 font-normal">
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Geometric Recommendation Box */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center"
              >
                <div className="p-5 border-2 border-dashed border-[#D400FF]/40 bg-[#121212] max-w-lg mx-auto space-y-3">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#D400FF]">
                    Recommendation:
                  </p>
                  <p className="text-xl sm:text-2xl font-black italic uppercase text-white">
                    {recommendedService}
                  </p>
                  <p className="text-xs text-[#A0A0A0]">
                    Configured for {STYLE_FINDER_OPTIONS.shapes.find(s => s.id === selection.shape)?.label} shape + {selection.length} length + {STYLE_FINDER_OPTIONS.vibes.find(v => v.id === selection.vibe)?.label}.
                  </p>
                  
                  <button
                    onClick={() => onCompleteStyleFinder(selection, recommendedService)}
                    className="w-full bg-white text-black py-3 text-xs font-black uppercase tracking-widest hover:bg-[#D400FF] active:scale-95 transition-all shadow-[3px_3px_0px_0px_#D400FF]"
                  >
                    Book This Look
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  className="text-[10px] uppercase tracking-widest font-bold text-[#A0A0A0] hover:text-white underline"
                >
                  Start Over
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
