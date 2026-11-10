/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface OrnamentalDividerProps {
  className?: string;
  variant?: 'gold' | 'maroon' | 'ivory';
  width?: string;
}

export const OrnamentalDivider: React.FC<OrnamentalDividerProps> = ({
  className = '',
  variant = 'gold',
  width = 'max-w-md',
}) => {
  const strokeColor =
    variant === 'maroon'
      ? '#5A1727'
      : variant === 'ivory'
      ? '#FFFAF4'
      : '#C6A15B';

  const fillColor =
    variant === 'maroon'
      ? '#5A1727'
      : variant === 'ivory'
      ? '#FFFAF4'
      : '#F0D58E';

  return (
    <div className={`flex items-center justify-center my-6 w-full ${className}`}>
      <div className={`flex items-center justify-center w-full ${width} px-4 gap-3`}>
        {/* Left hairline gradient */}
        <div
          className="h-[1px] flex-1"
          style={{
            background: `linear-gradient(to right, transparent, ${strokeColor})`,
          }}
        />

        {/* Central Islamic Arabesque Rosette & 8-Point Star Motif */}
        <svg
          viewBox="0 0 160 28"
          className="w-36 h-6 flex-shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Symmetrical left swirl */}
          <path
            d="M20 14 C35 14, 40 8, 55 14 C65 18, 70 14, 75 14"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M30 14 C35 20, 45 20, 50 14"
            stroke={strokeColor}
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <circle cx="35" cy="14" r="1.5" fill={fillColor} />
          <circle cx="50" cy="14" r="2" fill={fillColor} />

          {/* Central 8-Point Islamic Star (Khatam) */}
          <g transform="translate(80, 14)">
            <rect
              x="-6"
              y="-6"
              width="12"
              height="12"
              stroke={strokeColor}
              strokeWidth="1.2"
              fill="none"
            />
            <rect
              x="-6"
              y="-6"
              width="12"
              height="12"
              transform="rotate(45)"
              stroke={strokeColor}
              strokeWidth="1.2"
              fill="none"
            />
            <circle cx="0" cy="0" r="2.5" fill={fillColor} />
          </g>

          {/* Symmetrical right swirl */}
          <path
            d="M140 14 C125 14, 120 8, 105 14 C95 18, 90 14, 85 14"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M130 14 C125 20, 115 20, 110 14"
            stroke={strokeColor}
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <circle cx="125" cy="14" r="1.5" fill={fillColor} />
          <circle cx="110" cy="14" r="2" fill={fillColor} />
        </svg>

        {/* Right hairline gradient */}
        <div
          className="h-[1px] flex-1"
          style={{
            background: `linear-gradient(to left, transparent, ${strokeColor})`,
          }}
        />
      </div>
    </div>
  );
};
