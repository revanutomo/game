import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { CATEGORIES } from '../../data/categories';
import { GAMES_LIST } from '../../data/gamesList';
import { GameCategory } from '../../types/game';
import { audio } from '../../utils/audioManager';
import { ArrowLeft, Play, Search, Star, Sparkles, Filter } from 'lucide-react';

export const CategoriesView: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    playGame,
    setCurrentView,
  } = useGame();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCategory = (catId: GameCategory | null) => {
    audio.playPop();
    setSelectedCategory(catId);
  };

  const filteredGames = GAMES_LIST.filter((game) => {
    const matchesCat = selectedCategory ? game.category === selectedCategory : true;
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={() => {
            audio.playPop();
            setCurrentView('home');
          }}
          className="btn-chubby flex items-center gap-2 bg-white hover:bg-slate-50 border-3 border-slate-300 text-slate-700 px-4 py-2 rounded-2xl font-black text-sm cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-sky-600" />
          <span>Kembali ke Beranda</span>
        </button>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari permainan ceria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-slate-300 rounded-2xl pl-10 pr-4 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:border-sky-500 shadow-xs"
          />
        </div>
      </div>

      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-1">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 font-fredoka">
          Pustaka Permainan Edukasi 🎮
        </h1>
        <p className="text-sm font-bold text-slate-500">
          Tersedia 39 permainan interaktif yang seru, aman, dan mencerdaskan
        </p>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => handleSelectCategory(null)}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
            selectedCategory === null
              ? 'bg-amber-400 text-amber-950 border-3 border-amber-600 shadow-sm scale-102'
              : 'bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200'
          }`}
        >
          ✨ Semua Kategori ({GAMES_LIST.length})
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelectCategory(cat.id)}
            className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === cat.id
                ? `${cat.colorBg} ${cat.colorText} border-3 ${cat.colorBorder} shadow-sm scale-102`
                : 'bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Category Highlight Banner */}
      {selectedCategory && (
        <div className="p-4 rounded-3xl bg-sky-50 border-2 border-sky-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {CATEGORIES.find((c) => c.id === selectedCategory)?.emoji}
            </span>
            <div>
              <h2 className="text-lg font-black text-slate-800">
                {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-xs font-bold text-slate-500">
                {CATEGORIES.find((c) => c.id === selectedCategory)?.tagline}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleSelectCategory(null)}
            className="text-xs font-black text-sky-700 hover:underline cursor-pointer"
          >
            Tampilkan Semua
          </button>
        </div>
      )}

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => playGame(game.id)}
              className="bg-white rounded-3xl p-5 border-3 border-sky-100 shadow-sm hover:shadow-md hover:border-sky-400 transition-all cursor-pointer flex flex-col justify-between group select-none"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-white text-[10px] font-black uppercase ${game.badgeColor}`}>
                    {game.category.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Usia: {game.ageGroups.join(', ')} Th
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-800 group-hover:text-sky-600 transition-colors mb-1 font-fredoka">
                  {game.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold line-clamp-2 mb-4 leading-relaxed">
                  {game.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400">
                  {game.instruction}
                </span>
                <span className="btn-chubby flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 text-white text-xs font-black group-hover:bg-sky-600 transition-colors shrink-0">
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Main</span>
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border-2 border-slate-200 space-y-3">
            <span className="text-5xl">🔍</span>
            <h3 className="text-lg font-black text-slate-700">Tidak ada permainan yang cocok</h3>
            <p className="text-xs font-bold text-slate-500">Coba ubah kata kunci pencarian atau pilih kategori lain!</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="px-4 py-2 rounded-2xl bg-sky-500 text-white text-xs font-black"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
