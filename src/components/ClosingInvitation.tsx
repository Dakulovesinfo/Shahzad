/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { OrnamentalDivider } from './OrnamentalDivider.tsx';

interface ClosingInvitationProps {
  onScrollToTop: () => void;
}

export const ClosingInvitation: React.FC<ClosingInvitationProps> = ({ onScrollToTop }) => {
  return (
    <footer className="relative w-full border-t border-[#C6A15B]/30 bg-[#1F070F] text-[#FFFAF4] pt-16 pb-12 overflow-hidden">
      {/* Background Floral Glow */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('/src/assets/images/islamic_gold_arabesque_1794302296701.jpg')`,
          backgroundSize: '500px',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Islamic Dua / Closing Inscription */}
        <p className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-cinzel mb-2">
          Barakallahu Feekum
        </p>

        <h3 className="text-3xl sm:text-5xl font-script text-[#FFFAF4] gold-text-shimmer mb-3 px-4 py-2 leading-relaxed inline-block overflow-visible">
          Shahzad &amp; Chandni
        </h3>

        <p className="text-sm sm:text-base text-[#F0D58E]/90 font-cormorant italic max-w-lg mb-4">
          &ldquo;Your gracious presence and prayers will make this joyous occasion of Dawat-e-Walima Royal Reception truly unforgettable for both our families.&rdquo;
        </p>

        <OrnamentalDivider variant="gold" width="max-w-sm" />

        {/* Family Compliments Box */}
        <div className="my-6 p-6 rounded-xl border border-[#C6A15B]/30 bg-[#310B18]/70 backdrop-blur-md max-w-md w-full">
          <p className="text-xs font-cinzel uppercase tracking-widest text-[#F0D58E] font-bold mb-2">
            Awaited With Warm Regards
          </p>
          <p className="text-sm font-cormorant text-[#FFFAF4]/90 leading-relaxed">
            The Yaseen &amp; Khan Families
          </p>
          <p className="text-xs text-[#C6A15B] font-cormorant italic mt-1">
            and Near &amp; Dear Ones
          </p>
        </div>

        {/* Back To Top Button */}
        <button
          onClick={onScrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#C6A15B]/50 hover:border-[#F0D58E] bg-[#310B18]/80 text-[#F0D58E] hover:text-white transition-all text-xs font-cinzel font-semibold tracking-wider uppercase mb-8 shadow-md cursor-pointer group"
        >
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          <span>Back to Top</span>
        </button>

        {/* Quiet Copyright & Respectful Tagline */}
        <div className="w-full pt-6 border-t border-[#C6A15B]/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#C6A15B]/70 font-sans gap-2">
          <p>© 2026 Shahzad &amp; Chandni Royal Reception • All Rights Reserved</p>
          <p className="flex items-center gap-1 font-cormorant italic">
            <span>Crafted with heartfelt prayers &amp; love</span>
            <Heart className="w-3 h-3 text-[#C6A15B] fill-[#C6A15B]" />
          </p>
        </div>
      </div>
    </footer>
  );
};
