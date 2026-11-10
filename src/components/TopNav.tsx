/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface TopNavProps {
  onScrollTo: (id: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onScrollTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Invitation', id: 'invitation-card' },
    { label: 'Countdown', id: 'countdown-section' },
    { label: 'Piano Music', id: 'wedding-music-section' },
    { label: 'Schedule', id: 'program-timeline' },
    { label: 'Venue', id: 'venue-section' },
    { label: 'Duas', id: 'guestbook-wishes' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollTo(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#310B18]/95 border-b border-[#C6A15B]/30 backdrop-blur-md py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onScrollTo('invitation-card')}
          className="text-lg sm:text-xl font-cinzel font-semibold tracking-wider text-[#F0D58E] hover:text-[#FFF4D2] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          Shahzad &amp; Chandni
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase font-cinzel tracking-widest text-[#FFFAF4]/80">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="hover:text-[#F0D58E] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleLinkClick('guestbook-wishes')}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-cinzel font-bold text-[#310B18] bg-gradient-to-r from-[#C6A15B] to-[#F0D58E] rounded-lg hover:scale-105 active:scale-95 transition-all shadow-md whitespace-nowrap shrink-0 cursor-pointer"
          >
            Send Dua
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F0D58E] hover:text-[#FFFAF4] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#310B18]/98 border-b border-[#C6A15B]/30 px-6 py-4 space-y-3 backdrop-blur-xl animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="block w-full text-left py-2 text-xs uppercase font-cinzel tracking-widest text-[#FFFAF4] hover:text-[#F0D58E] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleLinkClick('guestbook-wishes')}
              className="w-full py-2.5 text-center text-xs font-cinzel font-bold text-[#310B18] bg-gradient-to-r from-[#C6A15B] to-[#F0D58E] rounded-lg uppercase tracking-wider"
            >
              Send Your Dua
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
