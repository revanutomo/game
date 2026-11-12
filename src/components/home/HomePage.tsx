import React from 'react';
import { useGame } from '../../context/GameContext';
import { GAMES_LIST } from '../../data/gamesList';
import { CATEGORIES } from '../../data/categories';
import { BimoMascot } from '../mascot/BimoMascot';
import { audio } from '../../utils/audioManager';
import { Play, Sparkles, Star, Trophy, ArrowRight, HeartHandshake, BookOpen } from 'lucide-react';
import { AgeGroup } from '../../types/game';

export const HomePage: React.FC = () => {
  const {
    setCurrentView,
    setSelectedAge,
    setSelectedCategory,
    playGame,
    profile,
  } = useGame();

  const handleStartPlaying = () => {
    audio.playPop();
    setCurrentView('categories');
  };

  const handleSelectAge = (age: AgeGroup) => {
    audio.playPop();
    setSelectedAge(age);
    setCurrentView('age-select');
  };

  const handleSelectCategory = (catId: typeof CATEGORIES[0]['id']) => {
    audio.playPop();
    setSelectedCategory(catId);
    setCurrentView('categories');
  };

  // Popular and New Games
  const popularGames = [...GAMES_LIST].sort((a, b) => b.popularity - a.popularity).slice(0, 6);
  const newGames = GAMES_LIST.filter((g) => g.isNew || g.popularity > 92).slice(0, 4);

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-400 via-sky-300 to-amber-200 border-4 border-white shadow-xl p-6 sm:p-10">
        {/* Playful Floating Cloud / Star Badges */}
        <div className="absolute -top-6 -right-6 text-7xl opacity-40 select-none animate-float">
          ☁️
        </div>
        <div className="absolute top-1/2 -left-6 text-6xl opacity-30 select-none">
          🌈
        </div>
        <div className="absolute bottom-2 right-1/4 text-4xl opacity-50 select-none animate-gentle-bounce">
          ⭐
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
          {/* Mascot Greeting */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border-2 border-sky-300 text-sky-800 text-xs sm:text-sm font-black shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span>Dunia Bermain Anak Indonesia</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-fredoka">
              Permainan Revan Utomo
            </h1>

            <p className="text-base sm:text-lg font-bold text-amber-900">
              "Bersama Revan ayo, Bermain Ceria, Tumbuh Cerdas!"
            </p>

            <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
              Selamat datang di dunia edukatif interaktif anak usia 3–6 tahun! Belajar huruf, angka, berhitung, logika, menggambar, dan budi pekerti saleh melalui permainan riang gembira.
            </p>

            {/* Giant Big Play Button */}
            <div className="pt-2">
              <button
                onClick={handleStartPlaying}
                className="btn-chubby flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-3xl bg-amber-400 hover:bg-amber-500 border-4 border-amber-600 text-amber-950 font-black text-xl sm:text-2xl shadow-xl transition-all cursor-pointer animate-glow"
                aria-label="Mulai Bermain Sekarang"
              >
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-xs">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
                <span>MULAI BERMAIN!</span>
              </button>
            </div>
          </div>

          {/* Interactive Mascot BIMO */}
          <div className="shrink-0 flex justify-center">
            <BimoMascot
              mood="happy"
              speechText="Halo, Teman Pintar! Yuk pilih permainan seru kesukaanmu hari ini!"
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Progress & Star Bar Quick Summary */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-amber-200 shadow-sm max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl">
            🏆
          </div>
          <div>
            <h3 className="font-black text-slate-800 text-base">
              Progres Belajar {profile.name} (Usia {profile.age} Tahun)
            </h3>
            <p className="text-xs text-slate-500 font-bold">
              {profile.history.length} Permainan Dimainkan • {profile.stars} Bintang Emas Terkumpul
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audio.playPop();
              setCurrentView('rewards');
            }}
            className="btn-chubby flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs sm:text-sm border-2 border-amber-600 cursor-pointer"
          >
            <Star className="w-4 h-4 fill-amber-950" />
            <span>Lihat Galeri Hadiah</span>
          </button>
        </div>
      </section>

      {/* Age Group Selector Section */}
      <section className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight font-fredoka">
              Pilih Kelompok Usia 🎯
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-500">
              Materi pembelajaran dirancang khusus sesuai perkembangan anak
            </p>
          </div>
          <button
            onClick={() => {
              audio.playPop();
              setCurrentView('age-select');
            }}
            className="text-xs sm:text-sm font-black text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Panduan Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { age: 3 as AgeGroup, label: 'Usia 3 Tahun', tag: 'Bentuk, Warna & Suara', color: 'from-rose-400 to-rose-500', emoji: '🐣', border: 'border-rose-600' },
            { age: 4 as AgeGroup, label: 'Usia 4 Tahun', tag: 'Huruf, Angka & Hewan', color: 'from-amber-400 to-amber-500', emoji: '🐰', border: 'border-amber-600' },
            { age: 5 as AgeGroup, label: 'Usia 5 Tahun', tag: 'Berhitung & Logika', color: 'from-emerald-400 to-emerald-500', emoji: '🦊', border: 'border-emerald-600' },
            { age: 6 as AgeGroup, label: 'Usia 6 Tahun', tag: 'Persiapan Masuk SD', color: 'from-purple-400 to-purple-500', emoji: '🦁', border: 'border-purple-600' },
          ].map((item) => (
            <button
              key={item.age}
              onClick={() => handleSelectAge(item.age)}
              className={`btn-chubby flex flex-col items-center p-5 rounded-3xl bg-gradient-to-b ${item.color} text-white border-4 ${item.border} shadow-md transition-all cursor-pointer text-center select-none`}
              aria-label={`Pilih ${item.label}`}
            >
              <span className="text-4xl sm:text-5xl mb-2">{item.emoji}</span>
              <span className="text-lg sm:text-xl font-black">{item.label}</span>
              <span className="text-[11px] sm:text-xs font-bold opacity-90 mt-1 line-clamp-1">
                {item.tag}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Popular Games Carousel / Grid */}
      <section className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight font-fredoka flex items-center gap-2">
              <span>Game Paling Populer</span>
              <span className="text-2xl">🔥</span>
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-500">
              Permainan favorit yang paling sering dimainkan anak-anak pintar
            </p>
          </div>
          <button
            onClick={() => {
              audio.playPop();
              setCurrentView('categories');
            }}
            className="text-xs sm:text-sm font-black text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Semua 39 Game</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {popularGames.map((game) => (
            <div
              key={game.id}
              onClick={() => playGame(game.id)}
              className="bg-white rounded-3xl p-5 border-3 border-sky-200 shadow-sm hover:shadow-md hover:border-sky-400 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-white text-[10px] font-black uppercase ${game.badgeColor}`}>
                    {game.category.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>Populer</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-800 group-hover:text-sky-600 transition-colors mb-1 font-fredoka">
                  {game.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold line-clamp-2 mb-4">
                  {game.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400">
                  Usia: {game.ageGroups.join(', ')} Th
                </span>
                <span className="btn-chubby flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-500 text-white text-xs font-black group-hover:bg-sky-600 transition-colors">
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Main</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 20 Categories Quick Explore */}
      <section className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight font-fredoka flex items-center gap-2">
              <span>20 Kategori Pembelajaran</span>
              <span className="text-2xl">📚</span>
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-500">
              Kurikulum lengkap PAUD dan TK untuk stimulasi kecerdasan majemuk
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`p-3.5 rounded-2xl border-2 ${cat.colorBorder} ${cat.colorBg} transition-all hover:scale-103 cursor-pointer text-center flex flex-col items-center justify-center min-h-[100px] select-none`}
            >
              <span className="text-3xl mb-1">{cat.emoji}</span>
              <span className={`text-xs font-black ${cat.colorText} leading-snug line-clamp-2`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
