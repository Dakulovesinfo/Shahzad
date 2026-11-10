/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Music, SkipForward, SkipBack, ListMusic, Check, Sparkles } from 'lucide-react';

export interface WeddingTrack {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  tag: string;
  instruments: string;
}

export const WEDDING_TRACKS: WeddingTrack[] = [
  {
    id: 'piano-romantic-theme',
    title: 'Romantic Grand Piano Reception Theme',
    subtitle: 'Flowing romantic arpeggios in D Major (River Flows style)',
    src: '/walima-reference-music.mp3',
    tag: 'Royal Reception Piano',
    instruments: 'Acoustic Grand Piano • Soft Reverb • Strings Pad',
  },
  {
    id: 'piano-celestial-serenade',
    title: 'Celestial Piano Walima Serenade',
    subtitle: 'Uplifting & cinematic piano harmonies in G Major',
    src: '/celestial-piano-walima.mp3',
    tag: 'Celestial & Cinematic',
    instruments: 'Steinway Grand Piano • Warm Harmonics • Reverb',
  },
  {
    id: 'piano-nocturne-love',
    title: 'Nocturne of Love Piano Ballad',
    subtitle: 'Soulful lyrical piano melody in C Major',
    src: '/nocturne-love-piano.mp3',
    tag: 'Soulful Love Ballad',
    instruments: 'Concert Grand Piano • Delicate Highs • Warm Bass',
  },
  {
    id: 'piano-peaceful-barakah',
    title: 'Peaceful Barakah Piano Ambiance',
    subtitle: 'Serene, meditative Islamic wedding piano atmosphere',
    src: '/peaceful-barakah-piano.mp3',
    tag: 'Peaceful & Devotional',
    instruments: 'Soft Felt Piano • Ambient Chords • Sustained Decay',
  },
];

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  currentTrackIndex: number;
  onSelectTrack: (index: number) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  onToggle,
  currentTrackIndex,
  onSelectTrack,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const synthNodesRef = useRef<{ ctx: AudioContext; masterGain: GainNode; intervalId?: number } | null>(null);

  const currentTrack = WEDDING_TRACKS[currentTrackIndex] || WEDDING_TRACKS[0];

  // Procedural Web Audio Piano arpeggiator fallback
  const startSynthFallback = useCallback((trackId: string) => {
    try {
      if (synthNodesRef.current) return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Piano chord frequencies (D3, F#3, A3, D4, F#4, A4)
      const chordFreqs = [146.83, 185.0, 220.0, 293.66, 369.99, 440.0, 587.33];
      let step = 0;

      const playPianoNote = (freq: number) => {
        if (!ctx || ctx.state === 'closed') return;
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = 'triangle';
        osc2.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime);

        // Fast hammer attack & piano exponential decay
        noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
        noteGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

        osc.connect(noteGain);
        osc2.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(ctx.currentTime);
        osc2.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 2.3);
        osc2.stop(ctx.currentTime + 2.3);
      };

      const intervalId = window.setInterval(() => {
        const freq = chordFreqs[step % chordFreqs.length];
        playPianoNote(freq);
        step++;
      }, 650);

      synthNodesRef.current = { ctx, masterGain, intervalId };
    } catch (e) {
      console.warn('Piano synth fallback error:', e);
    }
  }, []);

  const stopSynthFallback = useCallback(() => {
    if (synthNodesRef.current) {
      try {
        if (synthNodesRef.current.intervalId) {
          clearInterval(synthNodesRef.current.intervalId);
        }
        synthNodesRef.current.masterGain.gain.exponentialRampToValueAtTime(
          0.0001,
          synthNodesRef.current.ctx.currentTime + 0.3
        );
        setTimeout(() => {
          synthNodesRef.current?.ctx.close();
          synthNodesRef.current = null;
        }, 350);
      } catch (e) {
        synthNodesRef.current = null;
      }
    }
  }, []);

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.src;
    audio.load();

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio playback error, playing piano synth fallback:', err);
          startSynthFallback(currentTrack.id);
        });
      }
    }
  }, [currentTrack, isPlaying, startSynthFallback]);

  // Handle Play / Pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          startSynthFallback(currentTrack.id);
        });
      }
    } else {
      audio.pause();
      stopSynthFallback();
    }
  }, [isPlaying, currentTrack.id, startSynthFallback, stopSynthFallback]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % WEDDING_TRACKS.length;
    onSelectTrack(nextIdx);
  };

  const handlePrevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + WEDDING_TRACKS.length) % WEDDING_TRACKS.length;
    onSelectTrack(prevIdx);
  };

  return (
    <>
      {/* Real audio element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        loop
        preload="auto"
        onError={() => {
          if (isPlaying) startSynthFallback(currentTrack.id);
        }}
      />

      {/* Floating Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {/* Track Playlist Drawer (Floating popover) */}
        {isMenuOpen && (
          <div className="w-80 sm:w-96 rounded-2xl p-[1.5px] bg-gradient-to-br from-[#F0D58E] via-[#C6A15B] to-[#7A561E] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-fade-in mb-2">
            <div className="bg-[#310B18]/95 rounded-[14px] p-4 text-[#FFFAF4]">
              <div className="flex items-center justify-between pb-3 border-b border-[#C6A15B]/30 mb-3">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-[#F0D58E]" />
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#F0D58E]">
                    Grand Piano Reception Music
                  </h4>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xs text-[#C6A15B] hover:text-[#FFFAF4] px-2 py-0.5"
                >
                  Close
                </button>
              </div>

              {/* Track list options */}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {WEDDING_TRACKS.map((t, idx) => {
                  const isSelected = idx === currentTrackIndex;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        onSelectTrack(idx);
                        if (!isPlaying) onToggle();
                      }}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#5A1727] border-[#F0D58E] text-[#FFFAF4] shadow-md'
                          : 'bg-[#5A1727]/30 border-[#C6A15B]/30 hover:bg-[#5A1727]/60 text-[#FFFAF4]/80'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-cinzel uppercase px-1.5 py-0.5 rounded bg-[#310B18] text-[#F0D58E] border border-[#C6A15B]/40">
                            {t.tag}
                          </span>
                          {isSelected && isPlaying && (
                            <span className="flex items-center gap-0.5">
                              <span className="w-1 h-2.5 bg-[#F0D58E] animate-pulse" />
                              <span className="w-1 h-3.5 bg-[#F0D58E] animate-pulse delay-75" />
                              <span className="w-1 h-2 bg-[#F0D58E] animate-pulse delay-150" />
                            </span>
                          )}
                        </div>
                        <p className="font-cinzel font-semibold text-xs truncate text-[#FFFAF4]">
                          {t.title}
                        </p>
                        <p className="text-[11px] text-[#C6A15B] font-cormorant truncate">
                          {t.subtitle}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#F0D58E] text-[#310B18] flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Volume Slider */}
              <div className="mt-3 pt-3 border-t border-[#C6A15B]/20 flex items-center justify-between text-xs">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex items-center gap-1.5 text-[#F0D58E] hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  <span className="font-cinzel text-[11px]">{isMuted ? 'Muted' : 'Volume'}</span>
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-32 accent-[#F0D58E] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Floating pill controller with Current Track Title & Quick Controls */}
        <div className="flex items-center gap-2 bg-[#310B18]/95 border border-[#C6A15B]/50 rounded-full px-3 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-md">
          {/* Quick previous button */}
          <button
            onClick={handlePrevTrack}
            className="p-1.5 text-[#C6A15B] hover:text-[#F0D58E] transition-colors cursor-pointer"
            title="Previous Piano Track"
            aria-label="Previous piano track"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Main Play / Pause Circle Button */}
          <button
            onClick={onToggle}
            className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 transition-all duration-300 shadow-lg cursor-pointer ${
              isPlaying
                ? 'bg-[#5A1727] border-[#F0D58E] text-[#F0D58E] shadow-[0_0_15px_rgba(240,213,142,0.4)] scale-105'
                : 'bg-[#310B18] border-[#C6A15B]/60 text-[#C6A15B] hover:border-[#F0D58E] hover:text-[#F0D58E]'
            }`}
            aria-label={isPlaying ? 'Pause music' : 'Play piano reception music'}
          >
            {isPlaying ? (
              <div className="flex items-center gap-[2px]">
                <span className="w-[2.5px] bg-[#F0D58E] rounded-full animate-[soundbar_0.8s_ease-in-out_infinite]" style={{ height: '12px' }} />
                <span className="w-[2.5px] bg-[#F0D58E] rounded-full animate-[soundbar_1.1s_ease-in-out_infinite_0.2s]" style={{ height: '18px' }} />
                <span className="w-[2.5px] bg-[#F0D58E] rounded-full animate-[soundbar_0.7s_ease-in-out_infinite_0.4s]" style={{ height: '9px' }} />
              </div>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Quick next button */}
          <button
            onClick={handleNextTrack}
            className="p-1.5 text-[#C6A15B] hover:text-[#F0D58E] transition-colors cursor-pointer"
            title="Next Piano Track"
            aria-label="Next piano track"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Current Track Label & Drawer Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 text-left cursor-pointer hover:opacity-90 max-w-[140px] sm:max-w-[200px]"
            title="Choose Piano Track"
          >
            <div className="truncate">
              <p className="text-[10px] uppercase font-cinzel font-bold text-[#F0D58E] truncate flex items-center gap-1">
                <span>{currentTrack.tag}</span>
              </p>
              <p className="text-[11px] text-[#FFFAF4] font-cormorant font-semibold truncate">
                {currentTrack.title}
              </p>
            </div>
            <ListMusic className="w-4 h-4 text-[#C6A15B] flex-shrink-0" />
          </button>
        </div>
      </div>
    </>
  );
};
