import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { evaluateProgressStats } from '../../utils/gameRules';
import { CATEGORIES } from '../../data/categories';
import { audio } from '../../utils/audioManager';
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Unlock,
  Star,
  Trophy,
  RotateCcw,
  Printer,
  Moon,
  Sun,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  BookOpen,
} from 'lucide-react';

export const ParentTeacherDashboard: React.FC = () => {
  const { profile, resetProgress, setCurrentView } = useGame();

  // Parental PIN Gate state (Default PIN is 1234 or answer parent challenge)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Security gate challenge: Math or PIN 1234
  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === '7') {
      audio.playCorrect();
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      audio.playWrong();
      setPinError(true);
    }
  };

  const stats = evaluateProgressStats(profile.history);

  const handlePrint = () => {
    audio.playPop();
    window.print();
  };

  const handleConfirmReset = () => {
    if (window.confirm('Apakah Ayah/Bunda/Guru yakin ingin mereset seluruh riwayat progres belajar anak?')) {
      resetProgress();
      alert('Progres belajar telah diatur ulang.');
    }
  };

  // If not authenticated, show friendly parental gate
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 sm:p-8 bg-white rounded-3xl border-4 border-emerald-300 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center text-emerald-800">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-800 font-fredoka">
            Area Orang Tua & Guru
          </h2>
          <p className="text-xs font-bold text-slate-500">
            Halaman ini dilindungi untuk keamanan anak. Silakan masukkan PIN atau jawab soal di bawah:
          </p>
        </div>

        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-900">
          💡 PIN Default: <strong className="font-black">1234</strong> (atau jawab: <strong>3 + 4 = ?</strong>)
        </div>

        <form onSubmit={handleVerifyPin} className="space-y-4">
          <input
            type="password"
            maxLength={6}
            placeholder="Ketik PIN..."
            value={pinInput}
            onChange={(e) => {
              setPinInput(e.target.value);
              setPinError(false);
            }}
            className="w-full text-center text-2xl font-black tracking-widest bg-slate-50 border-3 border-slate-300 rounded-2xl py-3 text-slate-800 focus:outline-none focus:border-emerald-500"
            autoFocus
          />

          {pinError && (
            <p className="text-xs font-black text-rose-600 animate-pulse">
              PIN salah! Coba ketik 1234 atau angka 7.
            </p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                audio.playPop();
                setCurrentView('home');
              }}
              className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="btn-chubby flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm cursor-pointer shadow-md"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto space-y-8 px-4 py-6 transition-colors ${isDarkMode ? 'bg-slate-900 text-slate-100 p-6 rounded-3xl' : 'text-slate-800'}`}>
      {/* Top Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={() => {
            audio.playPop();
            setCurrentView('home');
          }}
          className={`btn-chubby flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm cursor-pointer border-2 ${
            isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          <ArrowLeft className="w-5 h-5 text-emerald-500" />
          <span>Kembali ke Beranda Anak</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Adult Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold border ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-amber-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
            title="Mode Gelap untuk Orang Tua"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{isDarkMode ? 'Mode Terang' : 'Mode Gelap'}</span>
          </button>

          {/* Print Report */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / PDF Laporan</span>
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className={`p-6 rounded-3xl border-3 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-emerald-200'} shadow-sm flex flex-col md:flex-row items-center justify-between gap-6`}>
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Laporan Perkembangan Belajar Resmi PAUD/TK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-fredoka">
            Dashboard Pemantauan: {profile.name}
          </h1>
          <p className="text-xs sm:text-sm font-bold opacity-80">
            Kelompok Usia: {profile.age} Tahun • Karakter Favorit: {profile.favoriteCharacter}
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3 text-center w-full md:w-auto">
          <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-emerald-50 border-emerald-200'}`}>
            <span className="text-2xl font-black text-emerald-600 block">{stats.totalGames}</span>
            <span className="text-[10px] font-bold opacity-70">Total Game</span>
          </div>
          <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-amber-50 border-amber-200'}`}>
            <span className="text-2xl font-black text-amber-500 block">{stats.totalStars}</span>
            <span className="text-[10px] font-bold opacity-70">Total Bintang</span>
          </div>
          <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-sky-50 border-sky-200'}`}>
            <span className="text-2xl font-black text-sky-600 block">{stats.mastered.length}</span>
            <span className="text-[10px] font-bold opacity-70">Kategori Dikuasai</span>
          </div>
        </div>
      </div>

      {/* Mastery vs Needs Practice Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mastered Categories */}
        <div className={`p-6 rounded-3xl border-3 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-emerald-200'} shadow-sm space-y-3`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <h3 className="text-lg font-black font-fredoka text-emerald-600">
              Kategori yang Sudah Dikuasai ({stats.mastered.length})
            </h3>
          </div>
          <p className="text-xs font-bold opacity-75">
            Anak menunjukkan pemahaman yang sangat kuat (akurasi &ge; 75%) dan konsistensi tinggi:
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {stats.mastered.length > 0 ? (
              stats.mastered.map((catId) => {
                const cat = CATEGORIES.find((c) => c.id === catId);
                return (
                  <span
                    key={catId}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black"
                  >
                    <span>{cat?.emoji || '⭐'}</span>
                    <span>{cat?.name || catId}</span>
                  </span>
                );
              })
            ) : (
              <p className="text-xs font-bold opacity-60 italic">
                Belum ada kategori yang ditandai tuntas (minimal 2 kali bermain tuntas).
              </p>
            )}
          </div>
        </div>

        {/* Needs Practice */}
        <div className={`p-6 rounded-3xl border-3 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-amber-200'} shadow-sm space-y-3`}>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-amber-500" />
            <h3 className="text-lg font-black font-fredoka text-amber-600">
              Perlu Pendampingan Lebih Lanjut
            </h3>
          </div>
          <p className="text-xs font-bold opacity-75">
            Disarankan untuk dimainkan bersama orang tua dengan metode permainan interaktif:
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {['berhitung', 'puzzle_logika', 'menulis', 'rukun-iman'].map((catId) => {
              const cat = CATEGORIES.find((c) => c.id === catId);
              return (
                <span
                  key={catId}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-black"
                >
                  <span>{cat?.emoji || '💡'}</span>
                  <span>{cat?.name || catId}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Play History Log */}
      <div className={`p-6 rounded-3xl border-3 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black font-fredoka flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-500" />
            <span>Riwayat Sesi Bermain Anak</span>
          </h3>
          <span className="text-xs font-bold opacity-60">
            Terakhir dicatat real-time
          </span>
        </div>

        <div className="divide-y divide-slate-100 overflow-x-auto">
          {profile.history.length > 0 ? (
            profile.history.slice(0, 10).map((h, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs font-bold">
                <div>
                  <span className="font-black text-sm block">{h.gameTitle}</span>
                  <span className="text-[11px] opacity-60">
                    Kategori: {h.category} • {new Date(h.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{h.stars} Bintang</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Skor: {h.score}/{h.total}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-xs font-bold opacity-60">
              Belum ada data riwayat permainan.
            </p>
          )}
        </div>
      </div>

      {/* Educational Pedagogical Tips for Parents & Teachers */}
      <div className={`p-6 rounded-3xl border-3 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-sky-50 border-sky-200'} space-y-3`}>
        <h3 className="text-base font-black font-fredoka text-sky-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sky-600" />
          <span>Panduan Pendampingan Efektif untuk Ayah, Bunda & Guru PAUD</span>
        </h3>
        <ul className="text-xs font-bold space-y-2 opacity-85 list-disc pl-5">
          <li>Batasi screen-time harian sekitar 30–45 menit dengan diselingi aktivitas fisik di luar ruangan.</li>
          <li>Gunakan kalimat afirmatif positif saat anak melakukan kesalahan, seperti: "Bagus sekali sudah mencoba! Yuk kita cari jawaban yang paling tepat bersama!"</li>
          <li>Ajak anak mengucapkan kembali huruf, angka, dan doa yang diperdengarkan oleh karakter Bimo.</li>
          <li>Berikan pelukan hangat dan apresiasi nyata setiap kali anak berhasil mendapatkan sertifikat digital.</li>
        </ul>
      </div>

      {/* Danger Zone: Reset Progres */}
      <div className="pt-4 flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={handleConfirmReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 text-xs font-bold cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Seluruh Data Belajar</span>
        </button>

        <span className="text-[11px] font-bold text-slate-400">
          Data tersimpan aman di peramban lokal perangkat Anda.
        </span>
      </div>
    </div>
  );
};
