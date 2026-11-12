import React from 'react';
import { useGame } from '../../context/GameContext';
import { AgeGroup } from '../../types/game';
import { GAMES_LIST } from '../../data/gamesList';
import { getAgeAppropriateGames } from '../../utils/gameRules';
import { audio } from '../../utils/audioManager';
import { ArrowLeft, Play, Star, CheckCircle, Sparkles } from 'lucide-react';

interface AgeCardDetail {
  age: AgeGroup;
  title: string;
  subtitle: string;
  description: string;
  milestones: string[];
  emoji: string;
  colorBg: string;
  colorBorder: string;
  badgeBg: string;
  textBadge: string;
}

export const AgeSelectorView: React.FC = () => {
  const { selectedAge, setSelectedAge, playGame, setCurrentView } = useGame();

  const ageDetails: AgeCardDetail[] = [
    {
      age: 3,
      title: 'Usia 3 Tahun',
      subtitle: 'Tahap Eksplorasi & Sensorik Awal',
      description: 'Permainan sederhana, pengenalan bentuk geometri, warna pelangi, suara hewan lucu, dan benda-benda di sekitar.',
      milestones: [
        'Mengenal 6 warna dasar (merah, kuning, hijau, biru, dll)',
        'Mengenal bentuk lingkaran, segitiga, dan persegi',
        'Meniru suara satwa dan mengenali nama hewan',
        'Melatih motorik halus lewat ketukan jari ceria',
      ],
      emoji: '🐣',
      colorBg: 'bg-rose-50',
      colorBorder: 'border-rose-400',
      badgeBg: 'bg-rose-500',
      textBadge: 'text-rose-950',
    },
    {
      age: 4,
      title: 'Usia 4 Tahun',
      subtitle: 'Pengenalan Huruf, Angka & Pola',
      description: 'Pengenalan alfabet A-Z, lambang bilangan 1-10, mengamati pola sederhana, habitat satwa, dan makanan hewan kesayangan.',
      milestones: [
        'Mengenal huruf vokal A-I-U-E-O dan alfabet dasar',
        'Menghitung jumlah benda 1 sampai 10 dengan teliti',
        'Memahami pola warna dan urutan sederhana',
        'Mengenal huruf hijaiyah dan doa harian anak',
      ],
      emoji: '🐰',
      colorBg: 'bg-amber-50',
      colorBorder: 'border-amber-400',
      badgeBg: 'bg-amber-500',
      textBadge: 'text-amber-950',
    },
    {
      age: 5,
      title: 'Usia 5 Tahun',
      subtitle: 'Berhitung Ceria & Membaca Sederhana',
      description: 'Penjumlahan buah manis, mengeja kata suku kata terbuka, mencocokkan gambar bayangan, memori kartu, dan penalaran logika.',
      milestones: [
        'Menyusun huruf menjadi kata bergambar (BOLA, APEL, SAPI)',
        'Penjumlahan dan pengurangan visual sederhana',
        'Melatih daya ingat lewat permainan kartu pasangan',
        'Mengenal anggota tubuh dan nilai budi pekerti saleh',
      ],
      emoji: '🦊',
      colorBg: 'bg-emerald-50',
      colorBorder: 'border-emerald-400',
      badgeBg: 'bg-emerald-500',
      textBadge: 'text-emerald-950',
    },
    {
      age: 6,
      title: 'Usia 6 Tahun',
      subtitle: 'Persiapan Masuk Sekolah Dasar (SD)',
      description: 'Membaca mandiri, menulis dan menyusun kata lengkap, berhitung dua digit dasar, pemecahan masalah logika, dan akhlak mandiri.',
      milestones: [
        'Mengeja dan menyusun kata kompleks dengan cepat',
        'Operasi hitung penjumlahan dan pengurangan tanggap',
        'Memahami urutan proses siklus alam dan tahapan wudhu',
        'Kesiapan mental, konsentrasi, dan motorik masuk SD',
      ],
      emoji: '🦁',
      colorBg: 'bg-purple-50',
      colorBorder: 'border-purple-400',
      badgeBg: 'bg-purple-500',
      textBadge: 'text-purple-950',
    },
  ];

  const handleSelectAge = (age: AgeGroup) => {
    audio.playPop();
    setSelectedAge(age);
    audio.speakIndonesian(`Memilih permainan untuk anak usia ${age} tahun!`);
  };

  const filteredGames = getAgeAppropriateGames(GAMES_LIST, selectedAge);

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

        <div className="text-center sm:text-right">
          <span className="text-xs font-bold text-slate-500">
            Disesuaikan dengan Standar Perkembangan Anak Usia Dini (PAUD)
          </span>
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 font-fredoka">
          Pilih Tingkat Usia Anak 🎯
        </h1>
        <p className="text-sm font-bold text-slate-600">
          Setiap tahapan usia memiliki permainan yang dirancang khusus untuk memicu rasa ingin tahu dan kepercayaan diri anak.
        </p>
      </div>

      {/* Age Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ageDetails.map((item) => {
          const isSelected = selectedAge === item.age;
          return (
            <button
              key={item.age}
              onClick={() => handleSelectAge(item.age)}
              className={`btn-chubby p-4 rounded-3xl border-4 text-center transition-all cursor-pointer select-none flex flex-col items-center justify-center ${
                isSelected
                  ? `${item.colorBg} ${item.colorBorder} ring-4 ring-amber-300 scale-102 shadow-md`
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="text-4xl sm:text-5xl mb-1">{item.emoji}</span>
              <span className="text-lg sm:text-xl font-black text-slate-800 font-fredoka">
                {item.title}
              </span>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full mt-1 ${
                isSelected ? `${item.badgeBg} text-white` : 'bg-slate-100 text-slate-600'
              }`}>
                {isSelected ? '✓ Terpilih' : 'Pilih'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Age Detail Panel */}
      {(() => {
        const activeDetail = ageDetails.find((a) => a.age === selectedAge)!;
        return (
          <div className={`p-6 sm:p-8 rounded-3xl border-4 ${activeDetail.colorBorder} ${activeDetail.colorBg} shadow-sm space-y-4`}>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{activeDetail.emoji}</span>
              <div>
                <h2 className="text-2xl font-black text-slate-800 font-fredoka">
                  {activeDetail.title} – {activeDetail.subtitle}
                </h2>
                <p className="text-sm font-bold text-slate-600">
                  {activeDetail.description}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                Fokus Pencapaian Perkembangan Anak:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeDetail.milestones.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 bg-white/80 p-2.5 rounded-xl border border-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Games Available For This Age */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-fredoka">
            Daftar Permainan Usia {selectedAge} Tahun ({filteredGames.length} Game)
          </h3>
          <span className="text-xs font-bold text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
            Tingkat Kesulitan Pas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => playGame(game.id)}
              className="bg-white rounded-3xl p-5 border-3 border-sky-100 shadow-sm hover:shadow-md hover:border-sky-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-white text-[10px] font-black uppercase ${game.badgeColor}`}>
                    {game.category.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    Usia: {game.ageGroups.join(', ')} Th
                  </span>
                </div>

                <h4 className="text-lg font-black text-slate-800 group-hover:text-sky-600 transition-colors mb-1 font-fredoka">
                  {game.title}
                </h4>
                <p className="text-xs text-slate-500 font-semibold line-clamp-2 mb-4">
                  {game.description}
                </p>
              </div>

              <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                <span className="btn-chubby flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-500 text-white text-xs font-black group-hover:bg-sky-600 transition-colors">
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Mainkan Game</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
