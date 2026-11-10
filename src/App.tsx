/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FloatingParticles } from './components/FloatingParticles.tsx';
import { FloatingFlowerPetals } from './components/FloatingFlowerPetals.tsx';
import { AudioPlayer } from './components/AudioPlayer.tsx';
import { EnvelopeExperience } from './components/EnvelopeExperience.tsx';
import { TopNav } from './components/TopNav.tsx';
import { InvitationCard } from './components/InvitationCard.tsx';
import { CountdownTimer } from './components/CountdownTimer.tsx';
import { EventTimeline } from './components/EventTimeline.tsx';
import { VenueSection } from './components/VenueSection.tsx';
import { GuestWishes } from './components/GuestWishes.tsx';
import { ShareAndCalendar } from './components/ShareAndCalendar.tsx';
import { ClosingInvitation } from './components/ClosingInvitation.tsx';
import { WeddingMusicSection } from './components/WeddingMusicSection.tsx';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [petalBurstTrigger, setPetalBurstTrigger] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpened(true);
    // Start background soundtrack upon opening
    setIsPlayingMusic(true);
    // Trigger flying rose petals shower
    setPetalBurstTrigger((prev) => prev + 1);
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpened(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#310B18] text-[#FFFAF4] relative selection:bg-[#C6A15B] selection:text-[#310B18]">
      {/* Golden Floating Ambient Particles */}
      <FloatingParticles />

      {/* Floating Flower Petals (Ambient drift & celebratory burst) */}
      <FloatingFlowerPetals burstTrigger={petalBurstTrigger} />

      {/* Floating Audio Controller for Muslim Wedding Melodies */}
      <AudioPlayer
        isPlaying={isPlayingMusic}
        onToggle={() => setIsPlayingMusic(!isPlayingMusic)}
        currentTrackIndex={currentTrackIndex}
        onSelectTrack={(idx) => {
          setCurrentTrackIndex(idx);
          setIsPlayingMusic(true);
        }}
      />

      {/* Cinematic 3D Envelope Opening Experience with Flowers */}
      {!isEnvelopeOpened && (
        <EnvelopeExperience
          onOpen={handleOpenEnvelope}
          isOpened={isEnvelopeOpened}
          onTriggerPetalBurst={() => setPetalBurstTrigger((prev) => prev + 1)}
        />
      )}

      {/* Main Luxury Website View */}
      {isEnvelopeOpened && (
        <>
          {/* Top Navigation Bar */}
          <TopNav onScrollTo={handleScrollTo} />

          {/* Hero Subtle Background Pattern */}
          <div
            className="fixed inset-0 pointer-events-none opacity-[0.06] mix-blend-color-dodge"
            style={{
              backgroundImage: `url('/src/assets/images/islamic_gold_arabesque_1794302296701.jpg')`,
              backgroundSize: '800px',
              backgroundPosition: 'center',
            }}
          />

          <main className="relative z-10 pt-20 pb-12 space-y-8 sm:space-y-12">
            {/* Centerpiece Luxury Ivory Card */}
            <InvitationCard
              onNavigateToVenue={() => handleScrollTo('venue-section')}
              onAddToCalendar={() => handleScrollTo('share-calendar')}
            />

            {/* Countdown Timer with 4 Gold-Bordered Units & Date Reveal */}
            <CountdownTimer />

            {/* Islamic Wedding Melodies & Shehnai Selection */}
            <WeddingMusicSection
              currentTrackIndex={currentTrackIndex}
              isPlaying={isPlayingMusic}
              onSelectTrack={(idx) => {
                setCurrentTrackIndex(idx);
                setIsPlayingMusic(true);
              }}
              onTogglePlay={() => setIsPlayingMusic(!isPlayingMusic)}
            />

            {/* Program Itinerary & Timeline */}
            <EventTimeline />

            {/* Venue & Google Maps Section */}
            <VenueSection />

            {/* Digital Dua Guestbook */}
            <GuestWishes />

            {/* Save to Calendar, WhatsApp Share, Flower Shower & Replay */}
            <ShareAndCalendar
              onReopenEnvelope={handleReopenEnvelope}
              onShowerPetals={() => setPetalBurstTrigger((prev) => prev + 1)}
            />
          </main>

          {/* Closing Inscription & Footer */}
          <ClosingInvitation onScrollToTop={scrollToTop} />

          {/* Floating Back-to-Top Button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-22 sm:bottom-24 right-6 z-30 p-3 rounded-full bg-[#310B18]/90 border border-[#C6A15B]/50 hover:border-[#F0D58E] text-[#F0D58E] hover:text-[#FFF4D2] shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll back to top"
              title="Back to Top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}
        </>
      )}
    </div>
  );
}
