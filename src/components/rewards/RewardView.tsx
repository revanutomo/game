import React, { useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { audio } from '../../utils/audioManager';
import { ArrowLeft, Star, Coins, Trophy, Award, Lock, Check, Printer, Sparkles } from 'lucide-react';

interface AvatarReward {
  id: string;
  name: string;
  emoji: string;
  cost: number;
}

export const RewardView: React.FC = () => {
  const { profile, unlockAvatar, updateProfile, setCurrentView } = useGame();
  const certRef = useRef<HTMLDivElement | null>(null);

  const avatarsList: AvatarReward[] = [
    { id: '🦁', name: 'Singa Berani', emoji: '🦁', cost: 0 },
    { id: '🐰', name: 'Kelinci Ceria', emoji: '🐰', cost: 0 },
    { id: '🐱', name: 'Kucing Manis', emoji: '🐱', cost: 0 },
    { id: '🐼', name: 'Panda Gemuk', emoji: '🐼', cost: 0 },
    { id: '🐻', name: 'Bimo si Beruang', emoji: '🐻', cost: 0 },
    { id: '🦊', name: 'Rubah Pintar', emoji: '🦊', cost: 40 },
    { id: '🐨', name: 'Koala Lucu', emoji: '🐨', cost: 50 },
    { id: '🦄', name: 'Kuda Pelangi', emoji: '🦄', cost: 70 },
    { id: '🤖', name: 'Robot Sahabat', emoji: '🤖', cost: 80 },
    { id: '🐲', name: 'Naga Ajaib', emoji: '🐲', cost: 100 },
  ];

  const badgesList = [
    { id: 'Bintang Pertama', title: 'Bintang Pertama', desc: 'Menyelesaikan permainan pertama!', emoji: '🌟', minStars: 1 },
    { id: 'Penjelajah Huruf', title: 'Penjelajah Huruf', desc: 'Mengenal huruf dan alfabet', emoji: '🔤', minStars: 5 },
    { id: 'Bintang Gemilang', title: 'Bintang Gemilang', desc: 'Mengumpulkan 20 bintang emas!', emoji: '✨', minStars: 20 },
    { id: 'Juara Cilik Super', title: 'Juara Cilik Super', desc: 'Mengumpulkan 50 bintang prestasi!', emoji: '🏆', minStars: 50 },
    { id: 'Sahabat Bimo', title: 'Sahabat Bimo', desc: 'Bermain lebih dari 5 kali bersama Bimo', emoji: '🤝', minStars: 10 },
  ];

  const handlePrintCertificate = () => {
    audio.playPop();
    window.print();
  };

  const handleChooseAvatar = (avatarEmoji: string, cost: number) => {
    if (profile.unlockedAvatars.includes(avatarEmoji)) {
      audio.playPop();
      updateProfile({ avatar: avatarEmoji });
    } else {
      unlockAvatar(avatarEmoji, cost);
    }
  };

  // Determine Level Title
  const levelTitle =
    profile.stars >= 50
      ? 'Level 5: Master Cilik Terampil 🎓'
      : profile.stars >= 30
      ? 'Level 4: Penjelajah Cerdas 🚀'
      : profile.stars >= 15
      ? 'Level 3: Bintang Cilik Ceria 🌟'
      : profile.stars >= 5
      ? 'Level 2: Sahabat Belajar Aktif 🎈'
      : 'Level 1: Pemula Cilik Ceria 🌱';

  return (
    <div className="max-w-5xl mx-auto space-y-8 px-4 py-6">
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

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-amber-100 border-2 border-amber-400 px-3 py-1 rounded-full font-black text-amber-900 text-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{profile.stars} Bintang</span>
          </div>
          <div className="flex items-center gap-1.5 bg-yellow-100 border-2 border-yellow-400 px-3 py-1 rounded-full font-black text-yellow-950 text-sm">
            <Coins className="w-4 h-4 text-yellow-600" />
            <span>{profile.coins} Koin Emas</span>
          </div>
        </div>
      </div>

      {/* Hero Achievement Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-400 to-amber-300 text-white border-4 border-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
            Galeri Penghargaan & Prestasi
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-fredoka drop-shadow-sm">
            Hebat, {profile.name}! 🎉
          </h1>
          <p className="text-sm sm:text-base font-bold opacity-95">
            Status Belajar: <span className="underline decoration-amber-300 font-extrabold">{levelTitle}</span>
          </p>
          <p className="text-xs font-medium opacity-90 max-w-lg">
            Kumpulkan lebih banyak bintang untuk menaikkan level dan gunakan koin emas untuk membuka kostum karakter lucu!
          </p>
        </div>

        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white/90 border-4 border-amber-300 flex flex-col items-center justify-center text-center p-3 shadow-md shrink-0">
          <span className="text-5xl sm:text-6xl">{profile.avatar}</span>
          <span className="text-[11px] font-black text-slate-800 mt-1 line-clamp-1">
            Avatar Aktif
          </span>
        </div>
      </div>

      {/* 1. Character Unlock Collection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-fredoka flex items-center gap-2">
            <span>Koleksi Karakter & Avatar</span>
            <span className="text-xl">🧸</span>
          </h2>
          <span className="text-xs font-bold text-slate-500">
            Gunakan koin yang diperoleh dari bermain
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {avatarsList.map((item) => {
            const isUnlocked = profile.unlockedAvatars.includes(item.id);
            const isCurrent = profile.avatar === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleChooseAvatar(item.id, item.cost)}
                className={`btn-chubby p-4 rounded-3xl border-3 flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                  isCurrent
                    ? 'bg-amber-100 border-amber-500 ring-4 ring-amber-300 shadow-md'
                    : isUnlocked
                    ? 'bg-white border-sky-300 hover:bg-sky-50'
                    : 'bg-slate-100 border-slate-300 opacity-80 hover:opacity-100'
                }`}
              >
                <span className="text-5xl mb-2">{item.emoji}</span>
                <span className="text-xs font-black text-slate-800 mb-1">
                  {item.name}
                </span>

                {isCurrent ? (
                  <span className="text-[10px] font-black text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> Sedang Dipakai
                  </span>
                ) : isUnlocked ? (
                  <span className="text-[10px] font-black text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full">
                    Gunakan
                  </span>
                ) : (
                  <span className="text-[10px] font-black text-yellow-900 bg-yellow-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" /> {item.cost} Koin
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Medals & Badges Showcase */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-fredoka flex items-center gap-2 px-2">
          <span>Medali & Lencana Prestasi</span>
          <span className="text-xl">🏅</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badgesList.map((badge) => {
            const isAchieved = profile.stars >= badge.minStars || profile.unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-3xl border-3 flex items-center gap-3 transition-all ${
                  isAchieved
                    ? 'bg-white border-amber-300 shadow-sm'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border-2 shrink-0 ${
                    isAchieved
                      ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-xs'
                      : 'bg-slate-200 border-slate-300'
                  }`}
                >
                  {isAchieved ? badge.emoji : '🔒'}
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-800">{badge.title}</h3>
                  <p className="text-xs text-slate-500 font-bold">{badge.desc}</p>
                  <span className="text-[10px] font-black text-amber-600">
                    Syarat: {badge.minStars} Bintang Emas
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Printable Digital Certificate */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between flex-wrap gap-2 px-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-fredoka flex items-center gap-2">
              <span>Sertifikat Digital Juara Cilik</span>
              <span className="text-xl">📜</span>
            </h2>
            <p className="text-xs font-bold text-slate-500">
              Dapat dicetak atau disimpan oleh orang tua & guru sebagai apresiasi belajar
            </p>
          </div>

          <button
            onClick={handlePrintCertificate}
            className="btn-chubby flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Sertifikat</span>
          </button>
        </div>

        {/* Certificate Card Design */}
        <div
          ref={certRef}
          className="bg-gradient-to-b from-amber-50 to-orange-50 border-8 border-amber-300 rounded-3xl p-6 sm:p-10 shadow-lg text-center relative overflow-hidden print:m-0 print:border-4"
        >
          {/* Inner Golden Border */}
          <div className="border-4 border-dashed border-amber-400 rounded-2xl p-6 sm:p-8 bg-white/70 backdrop-blur-xs">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">🌟</span>
              <span className="text-xs sm:text-sm font-black text-amber-800 tracking-widest uppercase">
                Permainan Revan Utomo – Dunia Bermain Anak
              </span>
              <span className="text-3xl">🌟</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 font-fredoka my-2">
              SERTIFIKAT JUARA CILIK
            </h3>

            <p className="text-xs sm:text-sm font-bold text-slate-500 mb-6">
              Diberikan dengan penuh rasa bangga dan cinta kepada:
            </p>

            <div className="inline-block py-2 px-8 rounded-full bg-amber-100 border-3 border-amber-400 my-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-950 font-fredoka">
                {profile.name} (Usia {profile.age} Tahun)
              </span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-700 max-w-lg mx-auto mt-4 leading-relaxed">
              Atas semangat belajar yang luar biasa, ketekunan, dan keceriaan dalam menyelesaikan tantangan edukatif serta mengumpulkan <strong className="text-amber-700 font-black">{profile.stars} Bintang Emas</strong> di Platform Dunia Bermain Anak.
            </p>

            <div className="flex items-center justify-between max-w-md mx-auto mt-8 pt-4 border-t-2 border-amber-200">
              <div className="text-left">
                <span className="text-[10px] font-bold text-slate-400 block">Karakter Pendamping:</span>
                <span className="text-sm font-black text-amber-800">BIMO si Beruang Ceria 🐻</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 block">Disahkan Oleh:</span>
                <span className="text-sm font-black text-sky-800">Kak Revan Utomo 🌟</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
