import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AvailabilityChecker } from './components/AvailabilityChecker';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { StyleFinder } from './components/StyleFinder';
import { InstagramFeed } from './components/InstagramFeed';
import { ProofSection } from './components/ProofSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { BookingModal } from './components/BookingModal';
import { MobileFloatingBar } from './components/MobileFloatingBar';
import { Footer } from './components/Footer';
import { StyleSelection } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Pre-fill states for booking modal
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | null>(null);
  const [selectedStyleChoice, setSelectedStyleChoice] = useState<StyleSelection | null>(null);
  const [selectedInstagramStyle, setSelectedInstagramStyle] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const handleOpenBooking = () => {
    setSelectedServiceForBooking(null);
    setSelectedStyleChoice(null);
    setSelectedInstagramStyle(null);
    setSelectedTimeSlot(null);
    setBookingModalOpen(true);
  };

  const handleOpenBookingWithSlot = (slotTime: string) => {
    setSelectedTimeSlot(slotTime);
    setBookingModalOpen(true);
  };

  const handleSelectServiceToBook = (serviceName: string) => {
    setSelectedServiceForBooking(serviceName);
    setBookingModalOpen(true);
  };

  const handleCompleteStyleFinder = (selection: StyleSelection, recommendedService: string) => {
    setSelectedStyleChoice(selection);
    setSelectedServiceForBooking(recommendedService);
    setBookingModalOpen(true);
  };

  const handleBookInstagramStyle = (styleName: string, serviceName: string) => {
    setSelectedInstagramStyle(styleName);
    setSelectedServiceForBooking(serviceName);
    setBookingModalOpen(true);
  };

  const handleSelectTab = (tabId: string) => {
    setCurrentTab(tabId);

    // Scroll smoothly to section if on home or direct tab click
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#FFFFFF] font-sans relative selection:bg-[#D400FF] selection:text-white pb-24 md:pb-0">
      
      {/* Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenBooking={handleOpenBooking}
      />

      {/* Hero (No entrance animation, renders instantly) */}
      <Hero
        onOpenBooking={handleOpenBooking}
        onExploreStyleFinder={() => handleSelectTab('style-finder')}
      />

      {/* 1. Availability Checker -- Sticky Status Bar */}
      <AvailabilityChecker
        onOpenBookingWithSlot={handleOpenBookingWithSlot}
      />

      {/* 2. Service Menu ("WHAT THEY OFFER", 4 cards) */}
      <ServicesSection
        onSelectServiceToBook={handleSelectServiceToBook}
      />

      {/* Interactive Feature: 3-Tap Style Finder */}
      <StyleFinder
        onCompleteStyleFinder={handleCompleteStyleFinder}
      />

      {/* 3. Instagram Feed Masonry & Signature Lightbox Moment */}
      <InstagramFeed
        onBookStyle={handleBookInstagramStyle}
      />

      {/* Proof Section (Praised for longevity, Holli's artistry, Welcoming space) */}
      <ProofSection />

      {/* 4. Location & Hours (Tusk, 92 Camden High St, London NW1 0LT) */}
      <LocationHoursSection
        onOpenBooking={handleOpenBooking}
      />

      {/* Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenBooking={handleOpenBooking}
      />

      {/* Floating Mobile Bar (Appears on scroll past hero) */}
      <MobileFloatingBar
        onOpenBooking={handleOpenBooking}
      />

      {/* Booking Drawer / Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={selectedServiceForBooking}
        preselectedStyleChoice={selectedStyleChoice}
        preselectedInstagramStyle={selectedInstagramStyle}
        preselectedTimeSlot={selectedTimeSlot}
      />

    </div>
  );
}
