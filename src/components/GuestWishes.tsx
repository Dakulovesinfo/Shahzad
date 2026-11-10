/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Send, Heart, Sparkles, MessageCircleHeart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OrnamentalDivider } from './OrnamentalDivider.tsx';

interface Wish {
  id: string;
  name: string;
  relation: string;
  message: string;
  timestamp: string;
}

const DEFAULT_WISHES: Wish[] = [
  {
    id: '1',
    name: 'Zubair & Family',
    relation: 'Cousin • Delhi',
    message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fee khair! May Allah SWT bless Shahzad & Chandni with eternal companionship, tranquility, and endless happiness.',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    name: 'Tariq Khan & Begum',
    relation: 'Family Friend • Lucknow',
    message: 'Heartiest Mubarakbaad to both respected families on this joyous union. Looking forward to celebrating this beautiful evening at Aman Park!',
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    name: 'Farzana Parveen',
    relation: 'Aunt • Aligarh',
    message: 'Dear Shahzad and Chandni, may your home always be filled with barakah, boundless laughter, and mutual love. Lots of Duas and blessings.',
    timestamp: '2 days ago',
  },
];

export const GuestWishes: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    try {
      const saved = localStorage.getItem('shahzad_chandini_wishes');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return DEFAULT_WISHES;
  });

  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('shahzad_chandini_wishes', JSON.stringify(wishes));
    } catch (e) {
      // ignore
    }
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      relation: relation.trim() || 'Well Wisher',
      message: message.trim(),
      timestamp: 'Just now',
    };

    setWishes([newWish, ...wishes]);
    setName('');
    setRelation('');
    setMessage('');
    setSubmitted(true);

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F0D58E', '#C6A15B', '#5A1727'],
      });
    } catch (err) {
      // fallback
    }

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="guestbook-wishes" className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col items-center text-center mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-cinzel mb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F0D58E]" />
          <span>Prayers &amp; Wishes</span>
          <Sparkles className="w-3.5 h-3.5 text-[#F0D58E]" />
        </p>

        <h3 className="text-2xl sm:text-4xl font-cinzel font-semibold text-[#FFFAF4] gold-text-shimmer mb-2">
          Mubarakbaad &amp; Duas
        </h3>

        <p className="text-sm sm:text-base text-[#F0D58E]/80 font-cormorant italic max-w-lg">
          Leave your heartfelt prayers and warm congratulations for Shahzad &amp; Chandni as they embark on this sacred journey together.
        </p>

        <OrnamentalDivider variant="gold" width="max-w-xs" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Wish Form */}
        <div className="md:col-span-5">
          <div className="rounded-xl p-[1.5px] bg-gradient-to-br from-[#F0D58E] via-[#C6A15B] to-[#7A561E] shadow-xl">
            <form
              onSubmit={handleSubmit}
              className="bg-[#310B18]/95 rounded-[10px] p-6 backdrop-blur-md space-y-4"
            >
              <div className="flex items-center gap-2 text-[#F0D58E] mb-2">
                <MessageCircleHeart className="w-5 h-5 text-[#C6A15B]" />
                <h4 className="font-cinzel text-sm font-semibold tracking-wider uppercase text-[#FFFAF4]">
                  Send Your Dua
                </h4>
              </div>

              <div>
                <label className="block text-[11px] font-cinzel uppercase tracking-wider text-[#C6A15B] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mohd Rashid"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#5A1727]/30 border border-[#C6A15B]/40 text-[#FFFAF4] placeholder-[#FFFAF4]/40 text-xs sm:text-sm focus:outline-none focus:border-[#F0D58E] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-cinzel uppercase tracking-wider text-[#C6A15B] mb-1">
                  Relation / City
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="e.g. Family Friend • Delhi"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#5A1727]/30 border border-[#C6A15B]/40 text-[#FFFAF4] placeholder-[#FFFAF4]/40 text-xs sm:text-sm focus:outline-none focus:border-[#F0D58E] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-cinzel uppercase tracking-wider text-[#C6A15B] mb-1">
                  Your Dua or Mubarakbaad *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your prayers and warm blessings for the couple..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#5A1727]/30 border border-[#C6A15B]/40 text-[#FFFAF4] placeholder-[#FFFAF4]/40 text-xs sm:text-sm focus:outline-none focus:border-[#F0D58E] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-[#C6A15B] to-[#F0D58E] text-[#310B18] font-cinzel text-xs font-bold uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Your Blessing</span>
              </button>

              {submitted && (
                <p className="text-center text-xs font-cormorant text-[#F0D58E] animate-fade-in font-semibold">
                  JazakAllah Khair! Your heartfelt Dua has been recorded.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Wishes Feed */}
        <div className="md:col-span-7 space-y-4 max-h-[480px] overflow-y-auto pr-1">
          {wishes.map((w) => (
            <div
              key={w.id}
              className="p-4 rounded-xl border border-[#C6A15B]/30 bg-[#5A1727]/25 backdrop-blur-sm hover:border-[#F0D58E]/60 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div>
                  <h5 className="font-cinzel font-semibold text-sm text-[#FFFAF4]">
                    {w.name}
                  </h5>
                  <p className="text-[11px] text-[#C6A15B] font-cormorant">
                    {w.relation}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#F0D58E]/60 font-sans">
                  <Heart className="w-3 h-3 text-[#C6A15B] fill-[#C6A15B]" />
                  <span>{w.timestamp}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#FFFAF4]/90 font-cormorant italic leading-relaxed">
                &ldquo;{w.message}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
