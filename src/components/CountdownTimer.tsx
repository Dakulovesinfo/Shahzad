/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { OrnamentalDivider } from './OrnamentalDivider.tsx';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  // Target: Tuesday, 1 December 2026, 19:00:00 IST (UTC+5:30)
  // In ISO string: 2026-12-01T19:00:00+05:30
  const targetDate = new Date('2026-12-01T19:00:00+05:30').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown-section" className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col items-center text-center">
        {/* Section Tag */}
        <p className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-cinzel mb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F0D58E]" />
          <span>Auspicious Celebration</span>
          <Sparkles className="w-3.5 h-3.5 text-[#F0D58E]" />
        </p>

        <h3 className="text-2xl sm:text-4xl font-cinzel font-semibold text-[#FFFAF4] gold-text-shimmer mb-2">
          Counting Down to Walima
        </h3>

        <p className="text-sm sm:text-base text-[#F0D58E]/80 font-cormorant italic max-w-lg mb-6">
          Every passing second brings us closer to welcoming our cherished guests and showering blessings upon the newly wedded couple.
        </p>

        <OrnamentalDivider variant="gold" width="max-w-xs" />

        {/* 4 ELEGANT GOLD-BORDERED COUNTDOWN UNITS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-2xl my-6">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="relative rounded-xl p-[1.5px] bg-gradient-to-b from-[#F0D58E] via-[#C6A15B] to-[#7A561E] shadow-[0_10px_25px_rgba(0,0,0,0.5)] group hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-[#310B18]/90 rounded-[10px] p-4 sm:p-6 flex flex-col items-center justify-center backdrop-blur-md relative overflow-hidden">
                {/* Subtle corner golden dots */}
                <span className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-[#F0D58E]/60" />
                <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#F0D58E]/60" />
                <span className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-[#F0D58E]/60" />
                <span className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-[#F0D58E]/60" />

                {/* Counter digit */}
                <span className="text-3xl sm:text-5xl font-cinzel font-bold text-[#F0D58E] tabular-nums tracking-tight drop-shadow-md">
                  {String(unit.value).padStart(2, '0')}
                </span>

                {/* Hairline Divider */}
                <div className="w-8 h-[1px] bg-[#C6A15B]/50 my-2" />

                {/* Unit label */}
                <span className="text-[10px] sm:text-xs font-cinzel tracking-widest uppercase text-[#FFFAF4]/80">
                  {unit.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ANIMATED DATE REVEAL CARD */}
        <div className="w-full max-w-2xl mt-4 rounded-xl border border-[#C6A15B]/40 bg-[#5A1727]/40 p-5 backdrop-blur-md shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#310B18] border border-[#F0D58E]/60 flex items-center justify-center flex-shrink-0 text-[#F0D58E]">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-cinzel tracking-widest text-[#C6A15B] uppercase">
                Save the Date
              </p>
              <p className="text-lg font-cormorant font-bold text-[#FFFAF4]">
                Tuesday, 1 December 2026
              </p>
              <p className="text-xs text-[#F0D58E]/75 font-sans">
                21 Jumada al-Thani 1448 AH
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:border-l sm:border-[#C6A15B]/30 sm:pl-6">
            <div className="w-12 h-12 rounded-full bg-[#310B18] border border-[#F0D58E]/60 flex items-center justify-center flex-shrink-0 text-[#F0D58E]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-cinzel tracking-widest text-[#C6A15B] uppercase">
                Auspicious Timing
              </p>
              <p className="text-lg font-cormorant font-bold text-[#FFFAF4]">
                7:00 PM Onwards
              </p>
              <p className="text-xs text-[#F0D58E]/75 font-sans">
                Indian Standard Time (IST)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
