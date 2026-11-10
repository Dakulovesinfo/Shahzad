/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Music, Play, Pause, Sparkles, Disc, Radio } from 'lucide-react';
import { WEDDING_TRACKS } from './AudioPlayer.tsx';
import { OrnamentalDivider } from './OrnamentalDivider.tsx';

interface WeddingMusicSectionProps {
  currentTrackIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
  onTogglePlay: () => void;
}

export const WeddingMusicSection: React.FC<WeddingMusicSectionProps> = ({
  currentTrackIndex,
  isPlaying,
  onSelectTrack,
  onTogglePlay,
}) => {
  return (
    <section id="wedding-music-section" className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col items-center text-center mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-cinzel mb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F0D58E]" />
          <span>Royal Reception Piano Collection</span>
          <Sparkles className="w-3.5 h-3.5 text-[#F0D58E]" />
        </p>

        <h3 className="text-2xl sm:text-4xl font-cinzel font-semibold text-[#FFFAF4] gold-text-shimmer mb-2">
          Royal Reception Piano Melodies
        </h3>

        <p className="text-sm sm:text-base text-[#F0D58E]/80 font-cormorant italic max-w-lg">
          Immerse yourself in soul-stirring, romantic acoustic Grand Piano melodies, delicate arpeggios, and peaceful harmonies crafted for this royal reception.
        </p>

        <OrnamentalDivider variant="gold" width="max-w-xs" />
      </div>

      {/* Grid of 4 Grand Piano Wedding Tracks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {WEDDING_TRACKS.map((track, idx) => {
          const isCurrent = idx === currentTrackIndex;
          const isCurrentPlaying = isCurrent && isPlaying;

          return (
            <div
              key={track.id}
              className={`relative rounded-xl p-[1.5px] transition-all duration-300 ${
                isCurrent
                  ? 'bg-gradient-to-r from-[#F0D58E] via-[#C6A15B] to-[#7A561E] shadow-[0_10px_25px_rgba(240,213,142,0.25)] scale-[1.02]'
                  : 'bg-[#C6A15B]/30 hover:bg-[#C6A15B]/60'
              }`}
            >
              <div className="h-full bg-[#310B18]/90 rounded-[10px] p-5 flex flex-col justify-between backdrop-blur-md">
                <div>
                  {/* Top Badge & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-cinzel font-semibold px-2 py-0.5 rounded-full bg-[#5A1727] text-[#F0D58E] border border-[#C6A15B]/40">
                      {track.tag}
                    </span>

                    {isCurrentPlaying && (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[10px] text-emerald-400 font-cinzel font-semibold">
                        <Radio className="w-3 h-3 animate-pulse" />
                        <span>Playing Now</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-base sm:text-lg font-cinzel font-bold text-[#FFFAF4] mb-1">
                    {track.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#F0D58E]/90 font-cormorant italic mb-2">
                    {track.subtitle}
                  </p>

                  <p className="text-[11px] text-[#C6A15B] font-sans">
                    {track.instruments}
                  </p>
                </div>

                {/* Bottom Action Strip */}
                <div className="mt-4 pt-3 border-t border-[#C6A15B]/20 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#FFFAF4]/70 font-cinzel">
                    <Disc className={`w-4 h-4 text-[#C6A15B] ${isCurrentPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                    <span>Track 0{idx + 1}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (isCurrent) {
                        onTogglePlay();
                      } else {
                        onSelectTrack(idx);
                        if (!isPlaying) onTogglePlay();
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      isCurrentPlaying
                        ? 'bg-[#5A1727] border border-[#F0D58E] text-[#F0D58E] shadow-sm'
                        : 'bg-gradient-to-r from-[#C6A15B] to-[#F0D58E] text-[#310B18] hover:scale-105'
                    }`}
                  >
                    {isCurrentPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>{isCurrent ? 'Resume' : 'Play Piano'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
