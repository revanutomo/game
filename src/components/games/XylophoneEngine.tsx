import React, { useState, useEffect } from 'react';
import { audio } from '../../utils/audioManager';
import { Music, Check, Sparkles, Play } from 'lucide-react';

interface XylophoneEngineProps {
  onComplete: (score: number, total: number) => void;
  onAnswerFeedback: (isCorrect: boolean, feedbackText: string) => void;
}

interface SongGuide {
  title: string;
  notes: number[]; // 0 to 7 indices
  lyrics: string[];
}

export const XylophoneEngine: React.FC<XylophoneEngineProps> = ({
  onComplete,
  onAnswerFeedback,
}) => {
  const [activeNoteIdx, setActiveNoteIdx] = useState<number | null>(null);
  const [selectedSongIdx, setSelectedSongIdx] = useState<number>(0);
  const [currentSongStep, setCurrentSongStep] = useState(0);

  const songs: SongGuide[] = [
    {
      title: 'Bintang Kecil',
      notes: [0, 0, 4, 4, 5, 5, 4, 3, 3, 2, 2, 1, 1, 0],
      lyrics: ['Bin', 'tang', 'ke', 'cil', 'di', 'la', 'ngit', 'yang', 'ting', 'gi', 'a', 'mat', 'ba', 'nyak'],
    },
    {
      title: 'Balonku Ada Lima',
      notes: [2, 3, 4, 2, 4, 3, 2, 0, 1, 2, 3, 4, 2],
      lyrics: ['Ba', 'lon', 'ku', 'a', 'da', 'li', 'ma', 'ru', 'pa', 'ru', 'pa', 'war', 'na'],
    },
    {
      title: 'Pelangi Pelangi',
      notes: [4, 2, 4, 5, 4, 3, 2, 3, 1, 3, 4, 3, 2, 1, 0],
      lyrics: ['Pe', 'la', 'ngi', 'pe', 'la', 'ngi', 'a', 'lang', 'kah', 'in', 'dah', 'mu', 'me', 'rah', 'ku'],
    },
  ];

  const keys = [
    { note: 'Do', letter: 'C', color: 'bg-rose-500 hover:bg-rose-600', height: 'h-64 sm:h-72', border: 'border-rose-700' },
    { note: 'Re', letter: 'D', color: 'bg-orange-500 hover:bg-orange-600', height: 'h-60 sm:h-68', border: 'border-orange-700' },
    { note: 'Mi', letter: 'E', color: 'bg-amber-400 hover:bg-amber-500', height: 'h-56 sm:h-64', border: 'border-amber-600' },
    { note: 'Fa', letter: 'F', color: 'bg-emerald-500 hover:bg-emerald-600', height: 'h-52 sm:h-60', border: 'border-emerald-700' },
    { note: 'Sol', letter: 'G', color: 'bg-teal-500 hover:bg-teal-600', height: 'h-48 sm:h-56', border: 'border-teal-700' },
    { note: 'La', letter: 'A', color: 'bg-sky-500 hover:bg-sky-600', height: 'h-44 sm:h-52', border: 'border-sky-700' },
    { note: 'Si', letter: 'B', color: 'bg-indigo-500 hover:bg-indigo-600', height: 'h-40 sm:h-48', border: 'border-indigo-700' },
    { note: 'Do', letter: 'C2', color: 'bg-purple-500 hover:bg-purple-600', height: 'h-36 sm:h-44', border: 'border-purple-700' },
  ];

  const currentSong = songs[selectedSongIdx];
  const targetNote = currentSong ? currentSong.notes[currentSongStep] : null;

  useEffect(() => {
    audio.speakIndonesian('Ayo bermain musik xilofon pelangi! Ketuk bilah warna untuk memainkan melodi indah!');
  }, []);

  const handlePlayKey = (index: number) => {
    audio.playXylophoneNote(index);
    setActiveNoteIdx(index);
    setTimeout(() => setActiveNoteIdx(null), 250);

    // Guide progression check
    if (targetNote !== null && index === targetNote) {
      const nextStep = currentSongStep + 1;
      if (nextStep >= currentSong.notes.length) {
        audio.playFanfare();
        audio.speakIndonesian(`Hebat! Lagu ${currentSong.title} selesai dimainkan!`);
        onAnswerFeedback(true, `Hebat! Lagu ${currentSong.title} tuntas!`);
        setCurrentSongStep(0);
      } else {
        setCurrentSongStep(nextStep);
      }
    }
  };

  const handleFinish = () => {
    audio.playFanfare();
    audio.speakIndonesian('Kamu musisi cilik yang hebat!');
    onAnswerFeedback(true, 'Permainan musik yang indah!');
    onComplete(5, 5);
  };

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto w-full select-none">
      {/* Title */}
      <div className="w-full bg-white rounded-3xl p-4 shadow-md border-4 border-fuchsia-200 text-center mb-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center justify-center gap-2">
          <span>🎵</span> Alat Musik Xilofon Pelangi <span>🌈</span>
        </h2>
        <p className="text-xs sm:text-sm font-bold text-slate-500">
          Ikuti panduan lagu di bawah atau mainkan musik sesukamu!
        </p>

        {/* Song chooser */}
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
          {songs.map((song, idx) => (
            <button
              key={song.title}
              onClick={() => {
                audio.playPop();
                setSelectedSongIdx(idx);
                setCurrentSongStep(0);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-black transition-colors cursor-pointer ${
                selectedSongIdx === idx
                  ? 'bg-fuchsia-600 text-white shadow-xs'
                  : 'bg-fuchsia-50 text-fuchsia-800 hover:bg-fuchsia-100 border border-fuchsia-200'
              }`}
            >
              🎶 {song.title}
            </button>
          ))}
        </div>

        {/* Song Lyrics Hint */}
        {currentSong && (
          <div className="mt-3 p-2 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs font-bold">
            Ketuk bilah yang berkilau:{' '}
            <span className="text-sm font-black text-fuchsia-700">
              "{currentSong.lyrics[currentSongStep]}" ({keys[currentSong.notes[currentSongStep]].note})
            </span>
          </div>
        )}
      </div>

      {/* Xylophone Instrument Board */}
      <div className="w-full bg-gradient-to-b from-amber-100 to-amber-200 rounded-3xl p-4 sm:p-8 shadow-xl border-4 border-amber-400 mb-6 relative overflow-hidden">
        {/* Wooden frame bars */}
        <div className="absolute top-6 left-2 right-2 h-4 bg-amber-800/40 rounded-full" />
        <div className="absolute bottom-6 left-2 right-2 h-4 bg-amber-800/40 rounded-full" />

        <div className="flex items-end justify-center gap-1.5 sm:gap-3 relative z-10 min-h-[300px]">
          {keys.map((k, idx) => {
            const isTarget = targetNote === idx;
            const isPlaying = activeNoteIdx === idx;

            return (
              <button
                key={k.note + idx}
                onClick={() => handlePlayKey(idx)}
                className={`btn-chubby flex-1 ${k.height} ${k.color} border-4 ${k.border} rounded-2xl text-white font-black flex flex-col items-center justify-between py-4 cursor-pointer transition-all duration-100 relative ${
                  isPlaying ? 'scale-95 brightness-125' : ''
                } ${isTarget ? 'ring-4 ring-yellow-300 animate-gentle-bounce' : ''}`}
                aria-label={`Nada ${k.note}`}
              >
                {/* Screw head top */}
                <div className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-400 shadow-inner" />

                <div className="flex flex-col items-center">
                  <span className="text-lg sm:text-2xl font-black drop-shadow-sm">{k.note}</span>
                  <span className="text-[10px] sm:text-xs font-bold opacity-80">{k.letter}</span>
                </div>

                {/* Screw head bottom */}
                <div className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-400 shadow-inner" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Finish button */}
      <button
        onClick={handleFinish}
        className="btn-chubby flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 border-3 border-emerald-700 text-white text-base font-black shadow-md cursor-pointer"
      >
        <Check className="w-5 h-5" />
        <span>Selesai Bermain Musik!</span>
      </button>
    </div>
  );
};
