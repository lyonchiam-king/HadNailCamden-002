import React, { useMemo } from 'react';
import { Clock, Sparkles, CheckCircle2 } from 'lucide-react';

interface AvailabilityCheckerProps {
  onOpenBookingWithSlot?: (slotTime: string) => void;
}

export const AvailabilityChecker: React.FC<AvailabilityCheckerProps> = ({ onOpenBookingWithSlot }) => {
  const availabilityInfo = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if (day === 1) {
      return {
        isOpen: false,
        statusText: "CLOSED TODAY (Monday)",
        nextSlot: "Tomorrow (Tuesday) at 10:30 AM",
        badgeColor: "bg-amber-900/30 text-amber-300 border-amber-500/50"
      };
    }

    const closingHour = day === 0 ? 17 : day === 6 ? 18 : 19;

    if (hour >= 10 && hour < closingHour) {
      const nextHour = hour + 1 > 17 ? 11 : hour + 1;
      return {
        isOpen: true,
        statusText: "OPEN NOW • TUSK CAMDEN",
        nextSlot: `Today at ${nextHour}:00 PM`,
        badgeColor: "bg-green-900/30 text-green-400 border-green-500/50"
      };
    } else if (hour < 10) {
      return {
        isOpen: false,
        statusText: "OPENING TODAY AT 10:00 AM",
        nextSlot: "Today at 11:30 AM",
        badgeColor: "bg-[#D400FF]/20 text-[#D400FF] border-[#D400FF]/40"
      };
    } else {
      const nextDayName = day === 0 ? "Tuesday" : "Tomorrow";
      return {
        isOpen: false,
        statusText: "SALON CLOSED FOR THE DAY",
        nextSlot: `${nextDayName} at 10:30 AM`,
        badgeColor: "bg-[#1E1E1E] text-zinc-300 border-zinc-600"
      };
    }
  }, []);

  return (
    <div className="bg-[#1E1E1E] border-y border-[#D400FF]/20 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${availabilityInfo.badgeColor}`}>
            <div className={`w-2 h-2 rounded-full ${availabilityInfo.isOpen ? 'bg-green-500 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{availabilityInfo.statusText}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white font-medium">
            <Clock className="w-3.5 h-3.5 text-[#D400FF]" />
            <span className="text-[11px]">Next Slot: <strong className="text-[#D400FF] font-black italic uppercase">{availabilityInfo.nextSlot}</strong></span>
          </div>
        </div>

        <button
          onClick={() => onOpenBookingWithSlot?.(availabilityInfo.nextSlot)}
          className="w-full sm:w-auto bg-[#D400FF] text-black px-4 py-1.5 text-xs font-black uppercase tracking-tight hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_#FFFFFF]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lock In Slot</span>
        </button>
      </div>
    </div>
  );
};
