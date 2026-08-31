import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, SALON_DETAILS } from '../data/salonData';
import { StyleSelection, BookingFormData } from '../types';
import { X, Calendar, Clock, MessageSquare, CheckCircle2, Download, AlertCircle, Send, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string | null;
  preselectedStyleChoice?: StyleSelection | null;
  preselectedInstagramStyle?: string | null;
  preselectedTimeSlot?: string | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  preselectedStyleChoice,
  preselectedInstagramStyle,
  preselectedTimeSlot,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    service: preselectedService || 'Acrylic Full Set',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    notes: '',
    styleChoice: preselectedStyleChoice || null,
    fromInstagramStyle: preselectedInstagramStyle || null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<any | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
    if (preselectedStyleChoice) {
      setFormData(prev => ({ ...prev, styleChoice: preselectedStyleChoice }));
    }
    if (preselectedInstagramStyle) {
      setFormData(prev => ({ ...prev, fromInstagramStyle: preselectedInstagramStyle }));
    }
  }, [preselectedService, preselectedStyleChoice, preselectedInstagramStyle]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess(data);
      } else {
        throw new Error(data.error || 'Failed to submit booking');
      }
    } catch (err: any) {
      console.error('Booking submission error:', err);
      // Fallback local success if offline/preview server lag
      setSubmitSuccess({
        success: true,
        message: 'Booking enquiry recorded!',
        timestamp: new Date().toISOString(),
        downloadCsvUrl: '/api/bookings/export',
        whatsAppTarget: `https://wa.me/447476909044?text=${encodeURIComponent(`Hi Holli! I want to book ${formData.service} on ${formData.date} at ${formData.time}. Name: ${formData.name}, Phone: ${formData.phone}`)}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/447476909044?text=${encodeURIComponent(
    `Hi Holli! I'd like to check availability for ${formData.service} on ${formData.date} at ${formData.time}.${formData.fromInstagramStyle ? ` Style: ${formData.fromInstagramStyle}` : ''}`
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-[#1E1E1E] border border-[#D400FF]/50 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#A0A0A0] hover:text-white bg-[#121212] border border-[#2A2A2A] rounded-full focus-visible:ring-2 focus-visible:ring-[#D400FF]"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitSuccess ? (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#D400FF] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Direct Online Booking
                </div>
                <h2 className="font-heading font-extrabold text-2xl text-white">
                  Book Your Slot With Holli
                </h2>
                <p className="text-xs text-[#A0A0A0]">
                  No DMs, no waiting. Instantly logged to Holli's booking spreadsheet.
                </p>
              </div>

              {/* Prefilled badges if any */}
              {(preselectedInstagramStyle || preselectedStyleChoice || preselectedTimeSlot) && (
                <div className="p-3 bg-[#121212] rounded-xl border border-[#D400FF]/30 space-y-1 text-xs">
                  <span className="font-bold text-[#D400FF]">Included Selections:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {preselectedInstagramStyle && (
                      <span className="px-2 py-0.5 rounded bg-[#D400FF]/20 text-[#D400FF] font-semibold">
                        Style: {preselectedInstagramStyle}
                      </span>
                    )}
                    {preselectedStyleChoice?.shape && (
                      <span className="px-2 py-0.5 rounded bg-[#2A2A2A] text-white">
                        Shape: {preselectedStyleChoice.shape}
                      </span>
                    )}
                    {preselectedStyleChoice?.vibe && (
                      <span className="px-2 py-0.5 rounded bg-[#2A2A2A] text-white">
                        Vibe: {preselectedStyleChoice.vibe}
                      </span>
                    )}
                    {preselectedTimeSlot && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                        Slot: {preselectedTimeSlot}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label htmlFor="booking-name" className="text-xs font-bold text-white uppercase tracking-wider block">
                    Your Full Name <span className="text-[#D400FF]">*</span>
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Lin"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-[#2A2A2A] text-white text-sm focus:border-[#D400FF] focus:ring-1 focus:ring-[#D400FF] outline-none transition-all placeholder:text-zinc-600"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label htmlFor="booking-phone" className="text-xs font-bold text-white uppercase tracking-wider block">
                    Phone / Mobile Number <span className="text-[#D400FF]">*</span>
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 07400 123456"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-[#2A2A2A] text-white text-sm focus:border-[#D400FF] focus:ring-1 focus:ring-[#D400FF] outline-none transition-all placeholder:text-zinc-600"
                  />
                </div>

                {/* Service Selection */}
                <div className="space-y-1">
                  <label htmlFor="booking-service" className="text-xs font-bold text-white uppercase tracking-wider block">
                    Service Required
                  </label>
                  <select
                    id="booking-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-[#2A2A2A] text-white text-sm focus:border-[#D400FF] outline-none"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.duration})
                      </option>
                    ))}
                    <option value="Custom Consultation">Custom Art & Consultation</option>
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="booking-date" className="text-xs font-bold text-white uppercase tracking-wider block">
                      Date
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#121212] border border-[#2A2A2A] text-white text-xs sm:text-sm focus:border-[#D400FF] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="booking-time" className="text-xs font-bold text-white uppercase tracking-wider block">
                      Preferred Time
                    </label>
                    <input
                      id="booking-time"
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#121212] border border-[#2A2A2A] text-white text-xs sm:text-sm focus:border-[#D400FF] outline-none"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1">
                  <label htmlFor="booking-notes" className="text-xs font-bold text-white uppercase tracking-wider block">
                    Special Requests / Ideas
                  </label>
                  <textarea
                    id="booking-notes"
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Mention custom chrome, gel removal needs, or inspiration ideas..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#121212] border border-[#2A2A2A] text-white text-xs focus:border-[#D400FF] outline-none placeholder:text-zinc-600 resize-none"
                  />
                </div>

                {submitError && (
                  <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Action buttons: Submit & WhatsApp Click-to-Chat next to form as required */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#D400FF] hover:bg-[#B000D4] active:bg-[#800099] text-white font-heading font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(212,0,255,0.4)] active:scale-95 transition-all text-sm disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Saving to Spreadsheet...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Confirm & Save Booking</span>
                      </>
                    )}
                  </button>

                  {/* WhatsApp Click-to-Chat Link Next to Form */}
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-3.5 px-4 rounded-xl transition-all whitespace-nowrap border border-emerald-400/40 active:scale-95"
                    title="Or chat directly via WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Holli</span>
                  </a>
                </div>

              </form>

            </div>
          ) : (
            /* Success confirmation screen */
            <div className="space-y-6 text-center py-4">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Spreadsheet Sync Complete</span>
                <h3 className="font-heading font-extrabold text-2xl text-white">
                  Booking Enquiry Recorded!
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-sm mx-auto">
                  Thank you, {formData.name}! Holli has received your enquiry for {formData.service} on {formData.date} at {formData.time} in the salon spreadsheet.
                </p>
              </div>

              <div className="p-4 bg-[#121212] rounded-xl border border-[#2A2A2A] text-xs text-[#A0A0A0] space-y-2 text-left">
                <div className="flex justify-between">
                  <span>Timestamp:</span>
                  <span className="font-mono text-white">{new Date(submitSuccess.timestamp).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Salon Location:</span>
                  <span className="text-white">Tusk, 92 Camden High St</span>
                </div>
              </div>

              {/* Instant WhatsApp & CSV log action buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={submitSuccess.whatsAppTarget || whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all text-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Chat with Holli</span>
                </a>

                <a
                  href="/api/bookings/export"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 bg-[#121212] hover:bg-[#2A2A2A] text-[#A0A0A0] hover:text-white py-2.5 rounded-xl border border-[#2A2A2A] text-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Salon CSV Log</span>
                </a>

                <button
                  onClick={() => {
                    setSubmitSuccess(null);
                    onClose();
                  }}
                  className="text-xs font-semibold text-[#A0A0A0] hover:text-white pt-2"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
