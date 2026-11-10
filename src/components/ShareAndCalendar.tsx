/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Share2, Copy, Check, Mail, RefreshCw, Sparkles, Send } from 'lucide-react';
import { OrnamentalDivider } from './OrnamentalDivider.tsx';

interface ShareAndCalendarProps {
  onReopenEnvelope: () => void;
  onShowerPetals?: () => void;
}

export const ShareAndCalendar: React.FC<ShareAndCalendarProps> = ({
  onReopenEnvelope,
  onShowerPetals,
}) => {
  const [copied, setCopied] = useState(false);

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent('Dawat-e-Walima: Shahzad & Chandni');
    // 2026-12-01 19:00 IST is 13:30 UTC
    const dates = '20261201T133000Z/20261201T183000Z';
    const details = encodeURIComponent(
      'With immense joy, you are cordially invited to celebrate the Dawat-e-Walima Royal Reception of Shahzad (S/o Late Mohd Yaseen) & Chandni (D/o Late Masi Ur Rehman Khan).\n\nVenue: Aman Park, Kalindi Kunj, Near Kalindi Kunj Metro Station, New Delhi.'
    );
    const location = encodeURIComponent('Aman Park, Kalindi Kunj, Near Kalindi Kunj Metro Station, New Delhi - 110025');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Generate and download .ics iCalendar file for iOS / Outlook
  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Shahzad and Chandni Walima//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:walima-shahzad-chandni-20261201@app',
      'DTSTAMP:20261110T000000Z',
      'DTSTART:20261201T133000Z',
      'DTEND:20261201T183000Z',
      'SUMMARY:Dawat-e-Walima: Shahzad & Chandni',
      'DESCRIPTION:Dawat-e-Walima of Shahzad (S/o Late Mohd Yaseen) and Chandni (D/o Late Masi Ur Rehman Khan). Time: 7:00 PM onwards.',
      'LOCATION:Aman Park\\, Kalindi Kunj\\, Near Kalindi Kunj Metro Station\\, New Delhi - 110025',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Walima-Shahzad-Chandni.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const inviteMessage = `✨ *Royal Reception Invitation • Dawat-e-Walima* ✨\n\nBismillahir Rahmanir Raheem\n\nYou are cordially invited to celebrate the blessed Dawat-e-Walima Royal Reception of\n\n🤵 *Shahzad*\n(Son of Late Mohd Yaseen)\n& \n👰 *Chandni*\n(Daughter of Late Masi Ur Rehman Khan)\n\n🗓 *Date:* Tuesday, 1 December 2026\n⏰ *Time:* 7:00 PM onwards\n📍 *Venue:* Aman Park, Kalindi Kunj, Near Kalindi Kunj Metro Station, New Delhi\n\nView the royal interactive reception invitation here:\n${window.location.href}`;

  const handleShareWhatsApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Dawat-e-Walima: Shahzad & Chandni',
          text: inviteMessage,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Fallback to WhatsApp URL if user dismisses or API rejects
      }
    }
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(inviteMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="share-calendar" className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col items-center text-center mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-cinzel mb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F0D58E]" />
          <span>Save &amp; Share</span>
          <Sparkles className="w-3.5 h-3.5 text-[#F0D58E]" />
        </p>

        <h3 className="text-2xl sm:text-4xl font-cinzel font-semibold text-[#FFFAF4] gold-text-shimmer mb-2">
          Join the Celebration
        </h3>

        <p className="text-sm sm:text-base text-[#F0D58E]/80 font-cormorant italic max-w-lg">
          Add this blessed milestone to your personal calendar or forward this royal invitation card to your family and friends.
        </p>

        <OrnamentalDivider variant="gold" width="max-w-xs" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Google Calendar */}
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-center p-5 rounded-xl border border-[#C6A15B]/30 bg-[#5A1727]/30 hover:border-[#F0D58E] hover:bg-[#5A1727]/50 transition-all group backdrop-blur-md shadow-md"
        >
          <div className="w-12 h-12 rounded-full bg-[#310B18] border border-[#F0D58E]/50 text-[#F0D58E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="font-cinzel text-xs font-semibold uppercase tracking-wider text-[#FFFAF4]">
            Google Calendar
          </span>
          <span className="text-[11px] text-[#F0D58E]/70 font-cormorant mt-1">
            Sync to your Google account
          </span>
        </a>

        {/* Download iCal / Outlook */}
        <button
          onClick={handleDownloadICS}
          className="flex flex-col items-center text-center p-5 rounded-xl border border-[#C6A15B]/30 bg-[#5A1727]/30 hover:border-[#F0D58E] hover:bg-[#5A1727]/50 transition-all group backdrop-blur-md shadow-md cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-[#310B18] border border-[#F0D58E]/50 text-[#F0D58E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Mail className="w-5 h-5" />
          </div>
          <span className="font-cinzel text-xs font-semibold uppercase tracking-wider text-[#FFFAF4]">
            Apple / Outlook
          </span>
          <span className="text-[11px] text-[#F0D58E]/70 font-cormorant mt-1">
            Download .ics file
          </span>
        </button>

        {/* Share via WhatsApp */}
        <button
          onClick={handleShareWhatsApp}
          className="flex flex-col items-center text-center p-5 rounded-xl border border-[#C6A15B]/30 bg-[#5A1727]/30 hover:border-[#F0D58E] hover:bg-[#5A1727]/50 transition-all group backdrop-blur-md shadow-md cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-[#310B18] border border-[#F0D58E]/50 text-[#F0D58E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Send className="w-5 h-5" />
          </div>
          <span className="font-cinzel text-xs font-semibold uppercase tracking-wider text-[#FFFAF4]">
            WhatsApp Share
          </span>
          <span className="text-[11px] text-[#F0D58E]/70 font-cormorant mt-1">
            Forward invite on WhatsApp
          </span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex flex-col items-center text-center p-5 rounded-xl border border-[#C6A15B]/30 bg-[#5A1727]/30 hover:border-[#F0D58E] hover:bg-[#5A1727]/50 transition-all group backdrop-blur-md shadow-md cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-[#310B18] border border-[#F0D58E]/50 text-[#F0D58E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
          </div>
          <span className="font-cinzel text-xs font-semibold uppercase tracking-wider text-[#FFFAF4]">
            {copied ? 'Link Copied!' : 'Copy Link'}
          </span>
          <span className="text-[11px] text-[#F0D58E]/70 font-cormorant mt-1">
            Copy invitation URL
          </span>
        </button>
      </div>

      {/* Actions: Shower Rose Petals & Replay Envelope */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {onShowerPetals && (
          <button
            onClick={onShowerPetals}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5A1727]/90 border border-[#F0D58E]/70 text-[#F0D58E] hover:bg-[#8B1E3F] hover:text-white transition-all font-cinzel text-xs font-semibold uppercase tracking-widest shadow-md cursor-pointer group"
          >
            <span className="text-base group-hover:scale-125 transition-transform">🌹</span>
            <span>Shower Rose Petals</span>
          </button>
        )}

        <button
          onClick={onReopenEnvelope}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#310B18]/90 border border-[#C6A15B]/60 text-[#F0D58E] hover:border-[#F0D58E] hover:bg-[#5A1727] transition-all font-cinzel text-xs font-semibold uppercase tracking-widest shadow-md cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span>Replay Envelope Opening</span>
        </button>
      </div>
    </section>
  );
};
