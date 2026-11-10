/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface WaxSealProps {
  onClick?: () => void;
  className?: string;
  isOpened?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  onClick,
  className = '',
  isOpened = false,
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`relative group cursor-pointer transition-transform duration-300 transform active:scale-95 ${
        isOpened ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100 hover:scale-105'
      } ${className}`}
      aria-label="Open royal reception invitation envelope"
    >
      {/* Outer pulsing glow indicator */}
      <div
        className="absolute -inset-3 rounded-full border border-[#F0D58E]/60 animate-ping opacity-60 pointer-events-none"
        style={{ animationDuration: '2.4s' }}
      />
      <div
        className="absolute -inset-1.5 rounded-full bg-[#C6A15B]/30 blur-md group-hover:bg-[#F0D58E]/40 transition-colors pointer-events-none"
      />

      {/* SVG Wax Seal */}
      <svg
        viewBox="0 0 100 100"
        className="w-20 h-20 sm:w-24 sm:h-24 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
      >
        <defs>
          {/* Gold metallic gradient */}
          <radialGradient id="goldWaxGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="25%" stopColor="#E5C177" />
            <stop offset="60%" stopColor="#C6A15B" />
            <stop offset="85%" stopColor="#96722E" />
            <stop offset="100%" stopColor="#5E4314" />
          </radialGradient>

          {/* Inner bevel shadow */}
          <filter id="embossShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="1" stdDeviation="0.8" floodColor="#FFFFFF" floodOpacity="0.4" />
            <feDropShadow dx="-1" dy="-1" stdDeviation="0.8" floodColor="#3B2609" floodOpacity="0.7" />
          </filter>

          <filter id="waxGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Organic irregular wax perimeter */}
        <path
          d="M 50,4
             C 61,3 70,8 78,16
             C 86,24 93,32 95,43
             C 97,55 93,66 85,76
             C 77,86 66,94 54,96
             C 41,97 30,93 21,86
             C 11,79 5,69 4,56
             C 3,44 7,33 15,23
             C 23,13 35,5 50,4 Z"
          fill="url(#goldWaxGrad)"
          stroke="#7A561E"
          strokeWidth="1.2"
        />

        {/* Inner seal raised rim */}
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="#7A561E"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <circle
          cx="50"
          cy="50"
          r="34"
          fill="none"
          stroke="#FFF2D6"
          strokeWidth="0.8"
          opacity="0.9"
        />

        {/* Delicate beaded inner circumference */}
        <circle
          cx="50"
          cy="50"
          r="31"
          fill="none"
          stroke="#C6A15B"
          strokeWidth="1.2"
          strokeDasharray="2.5 3.5"
          opacity="0.75"
        />

        {/* Central Monogram: S & C */}
        <text
          x="50"
          y="46"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="'Cinzel', serif"
          fontWeight="bold"
          fontSize="17"
          fill="#3B2609"
          filter="url(#embossShadow)"
          letterSpacing="1"
        >
          S &amp; C
        </text>

        {/* Tiny decorative Islamic star above & below initials */}
        <polygon
          points="50,26 51.5,29.5 55,30 52.5,32.5 53,36 50,34 47,36 47.5,32.5 45,30 48.5,29.5"
          fill="#3B2609"
          opacity="0.7"
        />

        <text
          x="50"
          y="66"
          textAnchor="middle"
          fontFamily="'Cinzel', serif"
          fontSize="7"
          fontWeight="600"
          letterSpacing="2"
          fill="#4A320F"
          opacity="0.85"
        >
          WALIMA
        </text>
      </svg>
    </div>
  );
};
