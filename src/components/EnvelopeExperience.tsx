/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { WaxSeal } from './WaxSeal.tsx';
import { ChevronDown, Sparkles } from 'lucide-react';

interface EnvelopeExperienceProps {
  onOpen: () => void;
  isOpened: boolean;
  onTriggerPetalBurst?: () => void;
}

// Royal Rose and Golden Leaf Cluster for luxury front floral decoration
const RoyalRoseCluster: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style,
}) => (
  <svg
    viewBox="0 0 90 90"
    className={`w-14 h-14 sm:w-18 sm:h-18 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] pointer-events-none ${className}`}
    style={style}
    fill="none"
  >
    {/* Golden Leaves & Filigree Tendrils */}
    <path
      d="M45 45 C32 26, 14 20, 8 32 C2 44, 22 50, 45 45 Z"
      fill="url(#goldLeafGrad1)"
      stroke="#7A561E"
      strokeWidth="0.6"
    />
    <path
      d="M45 45 C58 24, 76 18, 82 30 C88 42, 68 48, 45 45 Z"
      fill="url(#goldLeafGrad2)"
      stroke="#7A561E"
      strokeWidth="0.6"
    />
    <path
      d="M45 45 C28 62, 20 78, 32 84 C44 90, 52 72, 45 45 Z"
      fill="url(#goldLeafGrad1)"
      stroke="#7A561E"
      strokeWidth="0.6"
    />
    <path
      d="M45 45 C64 60, 78 72, 70 82 C60 90, 50 74, 45 45 Z"
      fill="url(#goldLeafGrad2)"
      stroke="#7A561E"
      strokeWidth="0.6"
    />

    {/* Layered Blooming Velvet Rose */}
    <circle cx="45" cy="45" r="22" fill="#440F1D" />
    <path
      d="M26 38 C20 26, 38 16, 52 20 C64 24, 68 40, 58 52 C48 64, 30 60, 26 38 Z"
      fill="#6E1528"
    />
    <path
      d="M32 32 C38 22, 56 24, 58 36 C60 48, 46 54, 38 50 C30 46, 28 38, 32 32 Z"
      fill="#9E1E38"
    />
    <path
      d="M36 36 C42 28, 54 30, 52 40 C50 48, 42 46, 36 36 Z"
      fill="#C4284A"
    />
    <path
      d="M40 39 C43 33, 49 35, 48 42 C47 46, 43 45, 40 39 Z"
      fill="#E63956"
    />

    {/* Golden Center Stamens */}
    <circle cx="45" cy="42" r="3.5" fill="#F0D58E" />
    <circle cx="46" cy="41" r="1.8" fill="#FFF4D2" />

    <defs>
      <linearGradient id="goldLeafGrad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFF4D2" />
        <stop offset="50%" stopColor="#C6A15B" />
        <stop offset="100%" stopColor="#7A561E" />
      </linearGradient>
      <linearGradient id="goldLeafGrad2" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F0D58E" />
        <stop offset="60%" stopColor="#C6A15B" />
        <stop offset="100%" stopColor="#5E4314" />
      </linearGradient>
    </defs>
  </svg>
);

export const EnvelopeExperience: React.FC<EnvelopeExperienceProps> = ({
  onOpen,
  isOpened,
  onTriggerPetalBurst,
}) => {
  const [openingStep, setOpeningStep] = useState<'closed' | 'opening' | 'revealed'>(
    isOpened ? 'revealed' : 'closed'
  );

  const handleOpenEnvelope = () => {
    if (openingStep !== 'closed') return;

    setOpeningStep('opening');

    // 1. Trigger the realistic flying flower petals burst
    onTriggerPetalBurst?.();

    // 2. Trigger celebratory golden confetti & rose petal sparkles
    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F0D58E', '#C6A15B', '#C41E3A', '#8B1E3F', '#FFFAF4'],
        scalar: 1.2,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#F0D58E', '#C6A15B', '#C41E3A'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#F0D58E', '#C6A15B', '#8B1E3F'],
        });
      }, 300);
    } catch (e) {
      // Graceful fallback
    }

    // After top flap finishes 3D fold, slide card out and complete opening
    setTimeout(() => {
      setOpeningStep('revealed');
      onOpen();
    }, 1100);
  };

  if (isOpened && openingStep === 'revealed') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F070F]/95 backdrop-blur-xl p-4 sm:p-6 overflow-hidden">
      {/* Background Islamic Arabesque Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C6A15B] via-[#5A1727] to-transparent" />

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#15030A_100%)]" />

      <div className="relative z-10 flex flex-col items-center max-w-xl w-full">
        {/* Top Kicker Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in relative">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#C6A15B] font-cinzel mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F0D58E]" />
            <span>Royal Reception Invitation</span>
            <Sparkles className="w-3.5 h-3.5 text-[#F0D58E]" />
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-script text-[#FFFAF4] gold-text-shimmer drop-shadow-md px-4 py-2 leading-relaxed inline-block overflow-visible tracking-normal">
            Shahzad &amp; Chandni
          </h1>
          <p className="text-xs sm:text-sm text-[#F0D58E]/80 font-cormorant tracking-widest mt-1 uppercase">
            Dawat-e-Walima • Royal Reception • 1 December 2026
          </p>
        </div>

        {/* 3D Envelope Container with Decorative Royal Flowers */}
        <div className="relative w-full max-w-[340px] sm:max-w-[460px] h-[240px] sm:h-[300px] perspective-1000 select-none">
          {/* BOTANICAL FLOWERS FRAMING ENVELOPE CORNERS */}
          {/* Top-Left Rose Cluster */}
          <div className="absolute -top-5 -left-5 z-40 animate-pulse" style={{ animationDuration: '4s' }}>
            <RoyalRoseCluster />
          </div>

          {/* Top-Right Rose Cluster */}
          <div className="absolute -top-5 -right-5 z-40 transform scale-x-[-1] animate-pulse" style={{ animationDuration: '4.5s' }}>
            <RoyalRoseCluster />
          </div>

          {/* Bottom-Left Rose Cluster */}
          <div className="absolute -bottom-5 -left-5 z-40 transform scale-y-[-1]">
            <RoyalRoseCluster />
          </div>

          {/* Bottom-Right Rose Cluster */}
          <div className="absolute -bottom-5 -right-5 z-40 transform scale-[-1]">
            <RoyalRoseCluster />
          </div>

          {/* Outer Gold Glowing Border Wrapper */}
          <div className="relative w-full h-full rounded-xl p-[2px] bg-gradient-to-br from-[#F0D58E] via-[#C6A15B] to-[#7A561E] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {/* Envelope Body with Royal Maroon Velvet Texture */}
            <div
              className="relative w-full h-full rounded-xl overflow-hidden bg-[#5A1727] shadow-inner"
              style={{
                backgroundImage: `url('/src/assets/images/royal_maroon_velvet_1794302295719.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Velvet Soft Lighting Sheen */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10 pointer-events-none" />

              {/* Gold Filigree Inset Frame */}
              <div className="absolute inset-3 border border-[#C6A15B]/40 rounded pointer-events-none" />
              <div className="absolute inset-4 border border-[#F0D58E]/20 rounded pointer-events-none" />

              {/* The Invitation Card nested inside */}
              <div
                className={`absolute left-6 right-6 bottom-4 h-[220px] sm:h-[270px] bg-[#FFFAF4] rounded-lg shadow-2xl p-4 transition-all duration-1000 ease-out flex flex-col items-center justify-center text-center ${
                  openingStep === 'opening'
                    ? '-translate-y-28 scale-105 z-20 shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
                    : 'translate-y-2 z-0 opacity-80'
                }`}
                style={{
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                }}
              >
                {/* Gold Card Border */}
                <div className="absolute inset-2 border border-[#C6A15B]/50 rounded pointer-events-none" />
                <p className="text-[10px] uppercase tracking-widest text-[#5A1727] font-cinzel">
                  In the Name of Allah
                </p>
                <p className="text-xl sm:text-2xl font-script text-[#5A1727] my-1">
                  Shahzad &amp; Chandni
                </p>
                <div className="w-16 h-[1px] bg-[#C6A15B] my-1" />
                <p className="text-[10px] text-[#310B18]/80 font-cormorant font-semibold tracking-wider uppercase">
                  Dawat-e-Walima • Royal Reception
                </p>
                <p className="text-[9px] text-[#310B18]/60 mt-1 font-sans">
                  Tuesday, 1 December 2026
                </p>
              </div>

              {/* Envelope Lower Flap (Bottom Triangle) */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  clipPath: 'polygon(0% 100%, 50% 45%, 100% 100%)',
                  background: 'linear-gradient(180deg, #440F1D 0%, #2A0813 100%)',
                  boxShadow: '0 -4px 15px rgba(0,0,0,0.5)',
                }}
              >
                {/* Subtle gold hairline edge */}
                <svg className="w-full h-full" viewBox="0 0 460 300" preserveAspectRatio="none">
                  <line x1="0" y1="300" x2="230" y2="135" stroke="#C6A15B" strokeWidth="1" opacity="0.6" />
                  <line x1="460" y1="300" x2="230" y2="135" stroke="#C6A15B" strokeWidth="1" opacity="0.6" />
                </svg>
              </div>

              {/* Envelope Left Side Flap */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  clipPath: 'polygon(0% 0%, 0% 100%, 50% 50%)',
                  background: 'linear-gradient(90deg, #3D0E1A 0%, #270712 100%)',
                  boxShadow: '4px 0 10px rgba(0,0,0,0.4)',
                }}
              />

              {/* Envelope Right Side Flap */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  clipPath: 'polygon(100% 0%, 100% 100%, 50% 50%)',
                  background: 'linear-gradient(-90deg, #3D0E1A 0%, #270712 100%)',
                  boxShadow: '-4px 0 10px rgba(0,0,0,0.4)',
                }}
              />

              {/* 3D Top Flap (Animated opening fold) */}
              <div
                className="absolute top-0 left-0 right-0 h-full z-20 transform-style-preserve-3d transition-transform duration-700 ease-in-out cursor-pointer"
                style={{
                  transformOrigin: 'top center',
                  transform:
                    openingStep === 'closed'
                      ? 'rotateX(0deg)'
                      : 'rotateX(180deg)',
                }}
                onClick={handleOpenEnvelope}
              >
                {/* Triangular Top Flap shape */}
                <div
                  className="w-full h-full"
                  style={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 50% 55%)',
                    background: 'linear-gradient(180deg, #5A1727 0%, #3B0E19 100%)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                  }}
                >
                  <svg className="w-full h-full" viewBox="0 0 460 300" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="230" y2="165" stroke="#F0D58E" strokeWidth="1.2" opacity="0.8" />
                    <line x1="460" y1="0" x2="230" y2="165" stroke="#F0D58E" strokeWidth="1.2" opacity="0.8" />
                  </svg>
                </div>
              </div>

              {/* Gold Wax Seal placed at flap intersection with floral sprigs */}
              <div
                className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500"
                style={{
                  transform:
                    openingStep === 'closed'
                      ? 'translate(-50%, -50%) scale(1)'
                      : 'translate(-50%, -120%) scale(0.6) rotate(-15deg)',
                  opacity: openingStep === 'closed' ? 1 : 0,
                  pointerEvents: openingStep === 'closed' ? 'auto' : 'none',
                }}
              >
                <div className="relative">
                  {/* Flanking Floral Rose Sprigs behind wax seal */}
                  <div className="absolute -left-7 top-1/2 -translate-y-1/2 -rotate-45 pointer-events-none opacity-85">
                    <span className="text-xl">🌹</span>
                  </div>
                  <div className="absolute -right-7 top-1/2 -translate-y-1/2 rotate-45 pointer-events-none opacity-85">
                    <span className="text-xl">🌹</span>
                  </div>

                  <WaxSeal onClick={handleOpenEnvelope} isOpened={openingStep !== 'closed'} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TAP TO OPEN Instructional Cue */}
        <div
          onClick={handleOpenEnvelope}
          className={`mt-8 sm:mt-10 flex flex-col items-center cursor-pointer transition-opacity duration-300 ${
            openingStep === 'closed' ? 'opacity-100 hover:scale-105' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5A1727]/80 border border-[#F0D58E]/70 shadow-[0_0_20px_rgba(240,213,142,0.3)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#F0D58E] animate-ping" />
            <span className="text-xs sm:text-sm font-cinzel font-semibold tracking-widest text-[#F0D58E] uppercase">
              Tap Wax Seal to Open
            </span>
            <Sparkles className="w-4 h-4 text-[#F0D58E]" />
          </div>
          <p className="text-[11px] text-[#C6A15B]/70 font-cormorant tracking-wide mt-2">
            Touch seal for celebratory flower shower &amp; music
          </p>
        </div>

        {/* Revealed state indicator */}
        {openingStep === 'revealed' && (
          <div className="mt-6 flex flex-col items-center animate-bounce">
            <button
              onClick={onOpen}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#C6A15B] to-[#F0D58E] text-[#310B18] font-cinzel font-bold text-xs uppercase tracking-widest shadow-xl cursor-pointer"
            >
              <span>View Full Royal Invitation</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
