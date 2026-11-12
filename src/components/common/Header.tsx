import React from 'react';
import { Volume2, VolumeX, Music, Maximize2, Sparkles, Star, Coins, UserCheck, ShieldCheck } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audio } from '../../utils/audioManager';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    profile,
    soundEnabled,
    musicEnabled,
    toggleSound,
    toggleMusic,
    toggleFullscreen,
  } = useGame();

  const handleNav = (view: typeof currentView) => {
    audio.playPop();
    setCurrentView(view);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-4 border-sky-200 shadow-sm px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo and Brand */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 group text-left cursor-pointer transition-transform hover:scale-102"
          aria-label="Kembali ke Beranda"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-sky-400 via-amber-300 to-rose-400 flex items-center justify-center shadow-md shadow-sky-200 group-hover:rotate-6 transition-transform">
            <span className="text-2xl">🌟</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-sky-600 drop-shadow-sm font-fredoka">
                Revan Utomo
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-black uppercase rounded-full bg-amber-400 text-amber-950 shadow-xs">
                Play & Learn
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 line-clamp-1">
              Dunia Bermain & Belajar Cerdas
            </p>
          </div>
        </button>

        {/* Stats & Quick Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Stars Pill */}
          <button
            onClick={() => handleNav('rewards')}
            className="flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-black shadow-xs transition-transform active:scale-95 cursor-pointer"
            title="Bintang Terkumpul (Buka Galeri Hadiah)"
            aria-label={`Jumlah bintang terkumpul: ${profile.stars}`}
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-500 animate-pulse" />
            <span>{profile.stars}</span>
          </button>

          {/* Coins Pill */}
          <button
            onClick={() => handleNav('rewards')}
            className="hidden xs:flex items-center gap-1.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-950 border-2 border-yellow-400 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-black shadow-xs transition-transform active:scale-95 cursor-pointer"
            title="Koin Emas Kamu"
            aria-label={`Jumlah koin emas: ${profile.coins}`}
          >
            <Coins className="w-4 h-4 text-yellow-600" />
            <span>{profile.coins}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-2xl border-2 transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-sky-100 border-sky-300 text-sky-700 hover:bg-sky-200'
                : 'bg-slate-100 border-slate-300 text-slate-400 hover:bg-slate-200'
            }`}
            title={soundEnabled ? 'Matikan Efek Suara' : 'Nyalakan Efek Suara'}
            aria-label={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            className={`p-2 rounded-2xl border-2 transition-all cursor-pointer ${
              musicEnabled
                ? 'bg-emerald-100 border-emerald-300 text-emerald-700 hover:bg-emerald-200 animate-gentle-bounce'
                : 'bg-slate-100 border-slate-300 text-slate-400 hover:bg-slate-200'
            }`}
            title={musicEnabled ? 'Matikan Musik Latar' : 'Nyalakan Musik Latar'}
            aria-label={musicEnabled ? 'Matikan Musik' : 'Nyalakan Musik'}
          >
            <Music className="w-5 h-5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex p-2 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
            title="Layar Penuh"
            aria-label="Mode Layar Penuh"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {/* Child Profile Avatar Shortcut */}
          <button
            onClick={() => handleNav('profile')}
            className="flex items-center gap-1.5 bg-purple-100 hover:bg-purple-200 border-2 border-purple-300 px-2 sm:px-3 py-1 rounded-2xl text-xs sm:text-sm font-bold text-purple-900 shadow-xs transition-transform active:scale-95 cursor-pointer"
            title="Profil Anak"
            aria-label="Buka Profil Anak"
          >
            <span className="text-lg">{profile.avatar}</span>
            <span className="hidden md:inline font-extrabold max-w-[80px] truncate">{profile.name}</span>
          </button>

          {/* Parent / Teacher Portal */}
          <button
            onClick={() => handleNav('parent-dashboard')}
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 rounded-2xl shadow-sm border-2 border-emerald-700 transition-all active:scale-95 cursor-pointer"
            title="Dashboard Orang Tua & Guru"
            aria-label="Dashboard Orang Tua dan Guru"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden lg:inline">Orang Tua / Guru</span>
          </button>
        </div>
      </div>
    </header>
  );
};
