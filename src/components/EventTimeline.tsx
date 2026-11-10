/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Utensils, HeartHandshake, Camera, Moon, Sparkles } from 'lucide-react';
import { OrnamentalDivider } from './OrnamentalDivider.tsx';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export const EventTimeline: React.FC = () => {
  const events: TimelineEvent[] = [
    {
      time: '07:00 PM',
      title: 'Istiqbaal & Welcome of Guests',
      description:
        'Warm reception of respected family, elders, and dear guests with traditional floral welcome and refreshing welcome drinks.',
      icon: HeartHandshake,
    },
    {
      time: '08:00 PM',
      title: 'Dawat-e-Walima Royal Feast',
      description:
        'A sumptuous culinary spread celebrating authentic Mughlai, Awadhi, and traditional wedding delicacies for our guests.',
      icon: Utensils,
    },
    {
      time: '09:15 PM',
      title: 'Mubarakbaad & Stage Photographs',
      description:
        'Meet, congratulate, and shower your heartfelt Duas upon the newly wedded couple Shahzad & Chandni.',
      icon: Camera,
    },
    {
      time: '10:30 PM',
      title: 'Dua & Sweet Farewells',
      description:
        'Closing prayers for lasting love, barakah, and prosperity, accompanied by traditional wedding mithai.',
      icon: Moon,
    },
  ];

  return (
    <section id="program-timeline" className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col items-center text-center mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-cinzel mb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F0D58E]" />
          <span>Program Schedule</span>
          <Sparkles className="w-3.5 h-3.5 text-[#F0D58E]" />
        </p>

        <h3 className="text-2xl sm:text-4xl font-cinzel font-semibold text-[#FFFAF4] gold-text-shimmer mb-2">
          Order of the Evening
        </h3>

        <p className="text-sm sm:text-base text-[#F0D58E]/80 font-cormorant italic max-w-lg">
          We eagerly look forward to spending this blessed evening in your cherished company.
        </p>

        <OrnamentalDivider variant="gold" width="max-w-xs" />
      </div>

      {/* TIMELINE LIST */}
      <div className="relative max-w-2xl mx-auto">
        {/* Central Vertical Gold Thread */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C6A15B] to-transparent pointer-events-none" />

        <div className="space-y-8">
          {events.map((event, idx) => {
            const Icon = event.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={event.time}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 group`}
              >
                {/* Timeline Content Card */}
                <div className="w-full sm:w-[calc(50%-2rem)] pl-12 sm:pl-0">
                  <div
                    className={`rounded-xl p-5 border border-[#C6A15B]/30 bg-[#5A1727]/30 backdrop-blur-md shadow-lg group-hover:border-[#F0D58E] transition-all duration-300 ${
                      isEven ? 'sm:text-right' : 'sm:text-left'
                    }`}
                  >
                    <div
                      className={`inline-block px-3 py-1 rounded-full bg-[#310B18] border border-[#C6A15B]/50 text-[#F0D58E] font-cinzel text-xs font-semibold mb-2 ${
                        isEven ? 'sm:ml-auto' : ''
                      }`}
                    >
                      {event.time}
                    </div>

                    <h4 className="text-lg font-cinzel font-semibold text-[#FFFAF4] mb-1">
                      {event.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#FFFAF4]/75 font-cormorant leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Central Milestone Icon Orb */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-5 sm:top-auto flex items-center justify-center w-10 h-10 rounded-full bg-[#310B18] border-2 border-[#F0D58E] text-[#F0D58E] shadow-[0_0_15px_rgba(240,213,142,0.4)] z-10 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
