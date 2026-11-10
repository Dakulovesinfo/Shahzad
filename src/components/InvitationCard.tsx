/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, MapPin, Clock, Heart, Sparkles } from 'lucide-react';
import { OrnamentalDivider } from './OrnamentalDivider.tsx';

interface InvitationCardProps {
  onNavigateToVenue: () => void;
  onAddToCalendar: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  onNavigateToVenue,
  onAddToCalendar,
}) => {
  return (
    <section id="invitation-card" className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Outer Card Shadow and Gold Rim */}
      <div className="relative rounded-2xl p-[3px] bg-gradient-to-br from-[#F0D58E] via-[#C6A15B] to-[#7A561E] shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
        {/* Main Ivory Card Canvas */}
        <div
          className="relative bg-[#FFFAF4] text-[#310B18] rounded-[14px] p-6 sm:p-10 md:p-14 overflow-hidden"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,250,244,1) 0%, rgba(247,240,230,1) 100%)`,
          }}
        >
          {/* Subtle Islamic Arabesque Watermark Texture */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-multiply"
            style={{
              backgroundImage: `url('/src/assets/images/islamic_gold_arabesque_1794302296701.jpg')`,
              backgroundSize: '450px',
              backgroundPosition: 'center',
            }}
          />

          {/* Double Gold Ornamental Inset Border */}
          <div className="absolute inset-3 sm:inset-5 border border-[#C6A15B]/60 rounded-xl pointer-events-none" />
          <div className="absolute inset-4 sm:inset-6 border border-[#C6A15B]/30 rounded-lg pointer-events-none" />

          {/* 4 Corner Islamic Filigree Corner Rosettes */}
          {/* Top-Left */}
          <svg className="absolute top-4 left-4 sm:top-6 sm:left-6 w-12 h-12 text-[#C6A15B]" viewBox="0 0 50 50" fill="none">
            <path d="M4 4 H25 C25 25, 4 25, 4 4 Z" stroke="currentColor" strokeWidth="1" fill="#C6A15B" fillOpacity="0.1" />
            <path d="M4 4 C15 15, 25 20, 38 4" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4 4 C15 15, 20 25, 4 38" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="14" cy="14" r="2.5" fill="#C6A15B" />
          </svg>

          {/* Top-Right */}
          <svg className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 text-[#C6A15B] transform rotate-90" viewBox="0 0 50 50" fill="none">
            <path d="M4 4 H25 C25 25, 4 25, 4 4 Z" stroke="currentColor" strokeWidth="1" fill="#C6A15B" fillOpacity="0.1" />
            <path d="M4 4 C15 15, 25 20, 38 4" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4 4 C15 15, 20 25, 4 38" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="14" cy="14" r="2.5" fill="#C6A15B" />
          </svg>

          {/* Bottom-Left */}
          <svg className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-12 h-12 text-[#C6A15B] transform -rotate-90" viewBox="0 0 50 50" fill="none">
            <path d="M4 4 H25 C25 25, 4 25, 4 4 Z" stroke="currentColor" strokeWidth="1" fill="#C6A15B" fillOpacity="0.1" />
            <path d="M4 4 C15 15, 25 20, 38 4" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4 4 C15 15, 20 25, 4 38" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="14" cy="14" r="2.5" fill="#C6A15B" />
          </svg>

          {/* Bottom-Right */}
          <svg className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 text-[#C6A15B] transform rotate-180" viewBox="0 0 50 50" fill="none">
            <path d="M4 4 H25 C25 25, 4 25, 4 4 Z" stroke="currentColor" strokeWidth="1" fill="#C6A15B" fillOpacity="0.1" />
            <path d="M4 4 C15 15, 25 20, 38 4" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4 4 C15 15, 20 25, 4 38" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="14" cy="14" r="2.5" fill="#C6A15B" />
          </svg>

          {/* CARD CONTENT */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Arabic Bismillah Calligraphy */}
            <div className="mb-4">
              <span className="font-arabic text-3xl sm:text-4xl md:text-5xl text-[#5A1727] tracking-wider leading-relaxed select-none">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
              <p className="text-[11px] sm:text-xs text-[#5A1727]/80 font-cormorant italic tracking-widest mt-1">
                In the Name of Allah, the Most Beneficent, the Most Merciful
              </p>
            </div>

            {/* Quranic Ayat Box */}
            <div className="max-w-xl mx-auto my-3 px-4 py-3 bg-[#5A1727]/5 border-y border-[#C6A15B]/40">
              <p className="font-cormorant italic text-sm sm:text-base text-[#310B18]/90 leading-relaxed">
                &ldquo;And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.&rdquo;
              </p>
              <p className="text-[10px] uppercase font-cinzel tracking-widest text-[#5A1727] font-semibold mt-1">
                — Surah Ar-Rum (30:21)
              </p>
            </div>

            <OrnamentalDivider variant="maroon" width="max-w-xs" />

            {/* Formal Invitation Announcement */}
            <div className="max-w-lg mx-auto mb-6">
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#5A1727] font-cinzel font-semibold mb-2">
                Royal Reception Invitation
              </p>
              <p className="text-sm sm:text-base text-[#310B18]/80 font-cormorant leading-relaxed">
                Solicit your gracious presence and heartfelt prayers on the blessed occasion of the
              </p>
              <div className="inline-block my-2 px-6 py-1.5 rounded-full bg-[#5A1727] text-[#F0D58E] font-cinzel text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-md">
                Dawat-e-Walima • Royal Reception
              </div>
              <p className="text-sm text-[#310B18]/70 font-cormorant">
                celebrating the reception of
              </p>
            </div>

            {/* COUPLE'S NAMES & PARENTS' HONORS */}
            <div className="w-full max-w-2xl py-4 my-2 flex flex-col items-center">
              {/* Groom's Section */}
              <div className="mb-4">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-script text-[#5A1727] drop-shadow-sm hover:scale-105 transition-transform duration-300 px-4 py-2 leading-relaxed inline-block overflow-visible">
                  Shahzad
                </h2>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <span className="h-[1px] w-6 bg-[#C6A15B]" />
                  <p className="text-xs sm:text-sm font-cormorant font-semibold tracking-wide text-[#310B18]">
                    Son of Late Mohd Yaseen
                  </p>
                  <span className="h-[1px] w-6 bg-[#C6A15B]" />
                </div>
              </div>

              {/* Romantic Ampersand & Floral Knot */}
              <div className="flex items-center justify-center my-1 gap-3">
                <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C6A15B]" />
                <div className="w-9 h-9 rounded-full bg-[#5A1727] text-[#F0D58E] flex items-center justify-center border border-[#C6A15B] shadow-md font-script text-2xl pb-1">
                  &amp;
                </div>
                <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C6A15B]" />
              </div>

              {/* Bride's Section */}
              <div className="mt-4">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-script text-[#5A1727] drop-shadow-sm hover:scale-105 transition-transform duration-300 px-4 py-2 leading-relaxed inline-block overflow-visible">
                  Chandni
                </h2>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <span className="h-[1px] w-6 bg-[#C6A15B]" />
                  <p className="text-xs sm:text-sm font-cormorant font-semibold tracking-wide text-[#310B18]">
                    Daughter of Late Masi Ur Rehman Khan
                  </p>
                  <span className="h-[1px] w-6 bg-[#C6A15B]" />
                </div>
              </div>
            </div>

            <OrnamentalDivider variant="maroon" width="max-w-xs" />

            {/* EVENT SPECIFICS GRID */}
            <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              {/* Date Box */}
              <div className="p-4 rounded-xl bg-white/70 border border-[#C6A15B]/40 shadow-sm flex flex-col items-center">
                <Calendar className="w-5 h-5 text-[#5A1727] mb-1.5" />
                <p className="text-[10px] font-cinzel uppercase tracking-widest text-[#5A1727] font-semibold">
                  Date
                </p>
                <p className="font-cormorant font-bold text-lg text-[#310B18] mt-0.5">
                  Tuesday
                </p>
                <p className="text-xs font-cinzel font-semibold text-[#5A1727]">
                  1 December 2026
                </p>
              </div>

              {/* Time Box */}
              <div className="p-4 rounded-xl bg-white/70 border border-[#C6A15B]/40 shadow-sm flex flex-col items-center">
                <Clock className="w-5 h-5 text-[#5A1727] mb-1.5" />
                <p className="text-[10px] font-cinzel uppercase tracking-widest text-[#5A1727] font-semibold">
                  Time
                </p>
                <p className="font-cormorant font-bold text-lg text-[#310B18] mt-0.5">
                  7:00 PM
                </p>
                <p className="text-xs font-cinzel font-semibold text-[#5A1727]">
                  Onwards
                </p>
              </div>

              {/* Venue Preview Box */}
              <div className="p-4 rounded-xl bg-white/70 border border-[#C6A15B]/40 shadow-sm flex flex-col items-center">
                <MapPin className="w-5 h-5 text-[#5A1727] mb-1.5" />
                <p className="text-[10px] font-cinzel uppercase tracking-widest text-[#5A1727] font-semibold">
                  Venue
                </p>
                <p className="font-cormorant font-bold text-base text-[#310B18] mt-0.5 leading-tight">
                  Aman Park
                </p>
                <p className="text-[11px] text-[#310B18]/70 line-clamp-1">
                  Kalindi Kunj, New Delhi
                </p>
              </div>
            </div>

            {/* Venue Text Highlight */}
            <div className="max-w-md mx-auto mb-6">
              <p className="text-xs uppercase font-cinzel tracking-widest text-[#5A1727] font-bold">
                Venue Address
              </p>
              <p className="text-base sm:text-lg font-cormorant font-semibold text-[#310B18] mt-1">
                Aman Park, Kalindi Kunj
              </p>
              <p className="text-xs sm:text-sm text-[#310B18]/75 font-sans">
                Near Kalindi Kunj Metro Station, New Delhi - 110025
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={onNavigateToVenue}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#5A1727] text-[#F0D58E] hover:bg-[#310B18] transition-all font-cinzel text-xs font-semibold tracking-wider uppercase shadow-md cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>View Venue &amp; Map</span>
              </button>

              <button
                onClick={onAddToCalendar}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-[#C6A15B] text-[#5A1727] hover:bg-[#FFFAF4] transition-all font-cinzel text-xs font-semibold tracking-wider uppercase shadow-sm cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Add to Calendar</span>
              </button>
            </div>

            {/* Best Compliments Footer */}
            <div className="mt-8 pt-4 border-t border-[#C6A15B]/30 w-full max-w-md">
              <p className="text-[11px] uppercase tracking-widest text-[#5A1727] font-cinzel font-semibold">
                With Best Compliments From:
              </p>
              <p className="text-xs sm:text-sm font-cormorant italic text-[#310B18]/80 mt-1">
                Near &amp; Dear Ones, Relatives and Friends
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
