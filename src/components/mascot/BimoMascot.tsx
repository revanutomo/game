import React from 'react';
import { Volume2 } from 'lucide-react';
import { audio } from '../../utils/audioManager';

interface BimoMascotProps {
  mood?: 'happy' | 'celebrate' | 'thinking' | 'encouraging';
  speechText?: string;
  size?: 'sm' | 'md' | 'lg';
  showSpeech?: boolean;
  className?: string;
}

export const BimoMascot: React.FC<BimoMascotProps> = ({
  mood = 'happy',
  speechText = 'Halo, Teman Pintar! Ayo bermain bersama Bimo!',
  size = 'md',
  showSpeech = true,
  className = '',
}) => {
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    audio.speakIndonesian(speechText);
  };

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32 md:w-40 md:h-40',
    lg: 'w-44 h-44 md:w-56 md:h-56',
  };

  return (
    <div className={`flex items-center gap-3 md:gap-4 select-none ${className}`}>
      {/* 3D-styled Cartoon Mascot BIMO */}
      <div className={`relative ${sizeClasses[size]} shrink-0 animate-float cursor-pointer`} onClick={handleSpeak} title="Ketuk Bimo untuk mendengar suaranya!">
        {/* Glow backdrop */}
        <div className="absolute inset-2 bg-amber-300/40 rounded-full blur-xl -z-10 animate-pulse" />

        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg overflow-visible">
          <defs>
            <linearGradient id="bimoBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="bimoEar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="bimoCheek" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
            <linearGradient id="bimoCap" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Left Ear */}
          <circle cx="50" cy="55" r="30" fill="url(#bimoBody)" stroke="#B45309" strokeWidth="4" />
          <circle cx="50" cy="55" r="18" fill="url(#bimoEar)" />

          {/* Right Ear */}
          <circle cx="150" cy="55" r="30" fill="url(#bimoBody)" stroke="#B45309" strokeWidth="4" />
          <circle cx="150" cy="55" r="18" fill="url(#bimoEar)" />

          {/* Head */}
          <ellipse cx="100" cy="115" rx="72" ry="65" fill="url(#bimoBody)" stroke="#B45309" strokeWidth="4" />

          {/* Cheerful Explorer Pilot Cap */}
          <path d="M 52 85 Q 100 50 148 85 L 144 95 Q 100 65 56 95 Z" fill="url(#bimoCap)" stroke="#0369A1" strokeWidth="3" />
          <circle cx="100" cy="62" r="10" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" />
          <path d="M 97 58 L 100 54 L 103 58 L 107 59 L 104 62 L 105 66 L 100 64 L 95 66 L 96 62 L 93 59 Z" fill="#FDE047" />

          {/* Sparkling Big Eyes */}
          {mood === 'celebrate' || mood === 'happy' ? (
            <>
              {/* Left eye happy arch */}
              <path d="M 65 110 Q 75 95 85 110" fill="none" stroke="#451A03" strokeWidth="5" strokeLinecap="round" />
              {/* Right eye happy arch */}
              <path d="M 115 110 Q 125 95 135 110" fill="none" stroke="#451A03" strokeWidth="5" strokeLinecap="round" />
            </>
          ) : mood === 'thinking' ? (
            <>
              {/* Curious looking eyes */}
              <ellipse cx="75" cy="108" rx="8" ry="11" fill="#451A03" />
              <ellipse cx="125" cy="108" rx="8" ry="11" fill="#451A03" />
              <circle cx="78" cy="104" r="3" fill="#FFFFFF" />
              <circle cx="128" cy="104" r="3" fill="#FFFFFF" />
            </>
          ) : (
            <>
              {/* Encouraging warm eyes */}
              <ellipse cx="75" cy="108" rx="7" ry="10" fill="#451A03" />
              <ellipse cx="125" cy="108" rx="7" ry="10" fill="#451A03" />
              <circle cx="77" cy="105" r="2.5" fill="#FFFFFF" />
              <circle cx="127" cy="105" r="2.5" fill="#FFFFFF" />
            </>
          )}

          {/* Rosy Cheeks */}
          <ellipse cx="58" cy="125" rx="12" ry="7" fill="url(#bimoCheek)" opacity="0.75" />
          <ellipse cx="142" cy="125" rx="12" ry="7" fill="url(#bimoCheek)" opacity="0.75" />

          {/* Cute Snout */}
          <ellipse cx="100" cy="128" rx="26" ry="18" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
          {/* Heart shaped nose */}
          <path d="M 96 120 C 96 116, 104 116, 104 120 C 104 124, 100 127, 100 127 C 100 127, 96 124, 96 120 Z" fill="#92400E" />

          {/* Big Smile */}
          {mood === 'celebrate' ? (
            <path d="M 88 131 Q 100 148 112 131 Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2" />
          ) : (
            <path d="M 88 132 Q 100 144 112 132" fill="none" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          )}

          {/* Waving Right Paw */}
          <g className="origin-bottom-right animate-gentle-bounce">
            <ellipse cx="168" cy="148" rx="16" ry="13" fill="url(#bimoBody)" stroke="#B45309" strokeWidth="3" />
            <circle cx="164" cy="146" r="3" fill="#F472B6" />
            <circle cx="170" cy="144" r="3" fill="#F472B6" />
            <circle cx="174" cy="149" r="3" fill="#F472B6" />
            <ellipse cx="168" cy="153" rx="7" ry="5" fill="#F472B6" />
          </g>
        </svg>

        {/* Small audio badge indicator */}
        <button
          onClick={handleSpeak}
          aria-label="Dengarkan suara Bimo"
          className="absolute -bottom-1 -right-1 bg-amber-500 hover:bg-amber-600 text-white p-1.5 rounded-full shadow-md transition-transform hover:scale-110 active:scale-95"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Speech bubble */}
      {showSpeech && (
        <div className="relative bg-white/95 backdrop-blur-sm border-3 border-amber-300 rounded-3xl p-3 md:p-4 shadow-lg max-w-xs md:max-w-md animate-fade-in">
          {/* Arrow pointing to mascot */}
          <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-amber-300" />
          <div className="flex items-center gap-2">
            <p className="text-slate-800 text-sm md:text-base font-bold leading-snug">
              {speechText}
            </p>
            <button
              onClick={handleSpeak}
              className="text-amber-600 hover:text-amber-700 p-1 rounded-full hover:bg-amber-100 transition-colors shrink-0"
              title="Putar suara Bimo"
              aria-label="Putar suara narasi Bimo"
            >
              <Volume2 className="w-5 h-5 animate-pulse" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
