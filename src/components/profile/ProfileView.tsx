import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { AgeGroup } from '../../types/game';
import { audio } from '../../utils/audioManager';
import { ArrowLeft, Check, Star, Coins, User, Smile, Sparkles } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile, setCurrentView } = useGame();

  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState<AgeGroup>(profile.age);
  const [favoriteCharacter, setFavoriteCharacter] = useState(profile.favoriteCharacter);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);
  const [isSaved, setIsSaved] = useState(false);

  const availableAvatars = profile.unlockedAvatars;

  const characters = [
    'BIMO si Beruang Bintang',
    'Kelinci Pelangi Ceria',
    'Singa Pemberani',
    'Kucing Melodi Manis',
    'Panda Gemuk Ramah',
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    audio.playCorrect();
    updateProfile({
      name: name.trim() || 'Sahabat Cilik',
      age,
      avatar: selectedAvatar,
      favoriteCharacter,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    audio.speakIndonesian(`Profil berhasil disimpan untuk ${name.trim() || 'Sahabat Cilik'}!`);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
      </div>

      {/* Profile Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-4 border-purple-200">
        <div className="text-center space-y-2 mb-6">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-purple-100 border-4 border-purple-300 flex items-center justify-center text-6xl shadow-inner animate-gentle-bounce">
            {selectedAvatar}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 font-fredoka">
            Profil Sahabat Cilik 🌟
          </h1>
          <p className="text-xs font-bold text-slate-500">
            Kustomisasi nama panggilan dan avatar kesukaanmu!
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Nickname Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              Nama Panggilan Anak:
            </label>
            <input
              type="text"
              maxLength={20}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Revan, Adiba, Kenzo..."
              className="w-full bg-slate-50 border-3 border-slate-300 rounded-2xl px-4 py-3 text-base font-bold text-slate-800 focus:outline-none focus:border-purple-500 shadow-inner"
              required
            />
          </div>

          {/* Age Selection Buttons */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              Pilihan Usia:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {([3, 4, 5, 6] as AgeGroup[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => {
                    audio.playPop();
                    setAge(a);
                  }}
                  className={`btn-chubby py-3 rounded-2xl border-3 text-sm font-black transition-all cursor-pointer ${
                    age === a
                      ? 'bg-purple-500 text-white border-purple-700 shadow-sm scale-102'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {a} Tahun
                </button>
              ))}
            </div>
          </div>

          {/* Avatar Chooser */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              Pilih Avatar Karakter Kamu:
            </label>
            <div className="flex flex-wrap gap-2.5 justify-center py-2 bg-purple-50/60 rounded-2xl p-3 border-2 border-dashed border-purple-200">
              {availableAvatars.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => {
                    audio.playPop();
                    setSelectedAvatar(av);
                  }}
                  className={`w-14 h-14 rounded-2xl border-3 text-3xl flex items-center justify-center transition-all cursor-pointer ${
                    selectedAvatar === av
                      ? 'bg-white border-purple-500 ring-4 ring-purple-300 scale-110 shadow-sm'
                      : 'bg-white border-slate-200 hover:scale-105'
                  }`}
                  aria-label={`Pilih avatar ${av}`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Favorite Character */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              Karakter Sahabat Favorit:
            </label>
            <select
              value={favoriteCharacter}
              onChange={(e) => setFavoriteCharacter(e.target.value)}
              className="w-full bg-slate-50 border-3 border-slate-300 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              {characters.map((char) => (
                <option key={char} value={char}>
                  {char}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="btn-chubby w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 border-3 border-purple-800 text-white font-black text-lg flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Check className="w-5 h-5" />
              <span>Simpan Profil Ceria</span>
            </button>
          </div>

          {isSaved && (
            <div className="p-3 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-center text-xs font-black text-emerald-900 animate-fade-in">
              ✓ Profil berhasil disimpan dengan indah!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
