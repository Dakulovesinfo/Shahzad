/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Navigation, Train, Car, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { OrnamentalDivider } from './OrnamentalDivider.tsx';

export const VenueSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const venueTitle = 'Aman Park';
  const fullAddress = 'Aman Park, Kalindi Kunj, Near Kalindi Kunj Metro Station, New Delhi - 110025';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Aman+Park+Kalindi+Kunj+New+Delhi';
  const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Aman+Park+Kalindi+Kunj+New+Delhi';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="venue-section" className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col items-center text-center mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-cinzel mb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F0D58E]" />
          <span>Location &amp; Directions</span>
          <Sparkles className="w-3.5 h-3.5 text-[#F0D58E]" />
        </p>

        <h3 className="text-2xl sm:text-4xl font-cinzel font-semibold text-[#FFFAF4] gold-text-shimmer mb-2">
          The Reception Venue
        </h3>

        <p className="text-sm sm:text-base text-[#F0D58E]/80 font-cormorant italic max-w-lg">
          Join us at the elegant grounds of Aman Park, bathed in celebratory lights and floral grandeur.
        </p>

        <OrnamentalDivider variant="gold" width="max-w-xs" />
      </div>

      {/* VENUE CARD & MEDIA WRAPPER */}
      <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-[#F0D58E] via-[#C6A15B] to-[#7A561E] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="bg-[#310B18]/90 rounded-[14px] overflow-hidden backdrop-blur-md">
          {/* Hero Venue Image */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden group">
            <img
              src="/src/assets/images/aman_park_venue_1794302298157.jpg"
              alt="Aman Park Royal Reception Venue"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#310B18] via-[#310B18]/40 to-transparent" />

            {/* Floating Venue Badge */}
            <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
              <div>
                <span className="inline-block px-3 py-1 rounded bg-[#5A1727]/90 border border-[#F0D58E]/50 text-[#F0D58E] font-cinzel text-xs font-semibold uppercase tracking-wider mb-1">
                  Royal Reception Venue
                </span>
                <h4 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#FFFAF4] drop-shadow-md">
                  {venueTitle}
                </h4>
                <p className="text-xs sm:text-sm text-[#FFFAF4]/90 font-cormorant tracking-wide">
                  Kalindi Kunj, New Delhi
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5A1727] border border-[#F0D58E] text-[#F0D58E] hover:bg-[#310B18] transition-all font-cinzel text-xs font-semibold uppercase tracking-wider shadow-lg"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* VENUE DETAILS & AMENITIES */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Address bar with copy action */}
            <div className="p-4 rounded-xl bg-[#5A1727]/40 border border-[#C6A15B]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F0D58E] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase font-cinzel tracking-widest text-[#C6A15B] font-semibold">
                    Complete Address
                  </p>
                  <p className="text-sm sm:text-base text-[#FFFAF4] font-cormorant font-semibold mt-0.5">
                    {fullAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCopyAddress}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#310B18] border border-[#C6A15B]/50 hover:border-[#F0D58E] text-[#F0D58E] text-xs font-cinzel font-semibold transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Address'}</span>
                </button>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#C6A15B] to-[#F0D58E] text-[#310B18] text-xs font-cinzel font-bold transition-transform hover:scale-105 shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Travel & Commute Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#310B18]/70 border border-[#C6A15B]/30 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#5A1727] border border-[#F0D58E]/40 flex items-center justify-center text-[#F0D58E] flex-shrink-0">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-cinzel tracking-wider text-[#F0D58E] font-semibold">
                    Metro Connectivity
                  </p>
                  <p className="text-xs sm:text-sm text-[#FFFAF4]/80 font-cormorant mt-1 leading-relaxed">
                    Kalindi Kunj Metro Station (Magenta Line) is located within 200m walking distance, making it easily reachable from Noida, South Delhi, and Gurugram.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#310B18]/70 border border-[#C6A15B]/30 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#5A1727] border border-[#F0D58E]/40 flex items-center justify-center text-[#F0D58E] flex-shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-cinzel tracking-wider text-[#F0D58E] font-semibold">
                    Parking &amp; Valet
                  </p>
                  <p className="text-xs sm:text-sm text-[#FFFAF4]/80 font-cormorant mt-1 leading-relaxed">
                    Complimentary valet service and ample designated parking space available for family and guests attending the banquet.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Embedded Google Maps Frame */}
            <div className="rounded-xl overflow-hidden border border-[#C6A15B]/40 shadow-inner h-64 sm:h-72 w-full relative">
              <iframe
                title="Aman Park Location Map"
                src="https://maps.google.com/maps?q=Aman+Park+Kalindi+Kunj+New+Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-2 right-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-md bg-[#310B18]/90 text-[#F0D58E] text-[11px] font-cinzel font-semibold border border-[#C6A15B]/60 shadow flex items-center gap-1.5 hover:bg-[#5A1727]"
                >
                  <span>Open Fullscreen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
