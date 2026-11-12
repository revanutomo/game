import React from 'react';
import { Heart, ShieldCheck, Sparkles, Smile, Star } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audio } from '../../utils/audioManager';

export const Footer: React.FC = () => {
  const { setCurrentView } = useGame();

  const handleNav = (view: 'home' | 'age-select' | 'categories' | 'rewards' | 'parent-dashboard') => {
    audio.playPop();
    setCurrentView(view);
  };

  return (
    <footer className="mt-12 bg-white border-t-4 border-sky-100 text-slate-600 py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-2xl">🌈</span>
            <h3 className="font-black text-sky-600 text-lg sm:text-xl">
              Permainan Revan Utomo – Dunia Bermain Anak
            </h3>
          </div>
          <p className="text-sm font-bold text-amber-600">
            "Bersama Revan ayo, Bermain Ceria, Tumbuh Cerdas!"
          </p>
          <p className="text-xs text-slate-400">
            Platform Edukasi Terpadu PAUD & TK Ramah Anak (Usia 3–6 Tahun)
          </p>
        </div>

        {/* Quick Nav Badges */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => handleNav('home')}
            className="px-3 py-1.5 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold transition-colors cursor-pointer"
          >
            Beranda
          </button>
          <button
            onClick={() => handleNav('age-select')}
            className="px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-colors cursor-pointer"
          >
            Pilih Usia
          </button>
          <button
            onClick={() => handleNav('categories')}
            className="px-3 py-1.5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold transition-colors cursor-pointer"
          >
            20 Kategori
          </button>
          <button
            onClick={() => handleNav('rewards')}
            className="px-3 py-1.5 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold transition-colors cursor-pointer"
          >
            Hadiah & Sertifikat
          </button>
          <button
            onClick={() => handleNav('parent-dashboard')}
            className="px-3 py-1.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-900 text-xs font-bold transition-colors cursor-pointer"
          >
            Untuk Orang Tua & Guru
          </button>
        </div>

        {/* Safety Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-2xl text-xs font-bold text-emerald-800">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-left">
            <div>100% Aman & Tanpa Iklan</div>
            <div className="text-[10px] text-emerald-600 font-medium">Bebas dari konten berbahaya</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
