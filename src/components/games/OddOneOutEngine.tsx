import React, { useState, useEffect } from 'react';
import { shuffleArray } from '../../utils/gameRules';
import { audio } from '../../utils/audioManager';
import { Volume2 } from 'lucide-react';

interface OddOneOutEngineProps {
  gameId: string;
  onComplete: (score: number, total: number) => void;
  onAnswerFeedback: (isCorrect: boolean, feedbackText: string) => void;
}

interface PatternRound {
  title: string;
  prompt: string;
  audioText: string;
  items: { id: string; label: string; visual: string; isTarget: boolean }[];
}

export const OddOneOutEngine: React.FC<OddOneOutEngineProps> = ({
  gameId,
  onComplete,
  onAnswerFeedback,
}) => {
  const [rounds, setRounds] = useState<PatternRound[]>([]);
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    let dataset: PatternRound[] = [];
    if (gameId === 'lanjut-pola') {
      dataset = [
        {
          title: 'Lanjutkan Pola Warna!',
          prompt: '🔴 🟡 🔴 🟡 ❓ ... Warna apa berikutnya?',
          audioText: 'Merah, kuning, merah, kuning. Warna apa selanjutnya?',
          items: [
            { id: 'p1', label: 'Merah', visual: '🔴', isTarget: true },
            { id: 'p2', label: 'Biru', visual: '🔵', isTarget: false },
            { id: 'p3', label: 'Hijau', visual: '🟢', isTarget: false },
          ],
        },
        {
          title: 'Lanjutkan Pola Buah!',
          prompt: '🍎 🍌 🍎 🍌 ❓ ... Buah apa selanjutnya?',
          audioText: 'Apel, pisang, apel, pisang. Buah apa selanjutnya?',
          items: [
            { id: 'p4', label: 'Pisang', visual: '🍌', isTarget: false },
            { id: 'p5', label: 'Apel', visual: '🍎', isTarget: true },
            { id: 'p6', label: 'Jeruk', visual: '🍊', isTarget: false },
          ],
        },
        {
          title: 'Lanjutkan Pola Bentuk!',
          prompt: '⭐ ⭕ ⭐ ⭕ ❓ ... Bentuk apa berikutnya?',
          audioText: 'Bintang, lingkaran, bintang, lingkaran. Bentuk apa berikutnya?',
          items: [
            { id: 'p7', label: 'Segitiga', visual: '🔺', isTarget: false },
            { id: 'p8', label: 'Bintang', visual: '⭐', isTarget: true },
            { id: 'p9', label: 'Persegi', visual: '⏹️', isTarget: false },
          ],
        },
      ];
    } else {
      // benda-berbeda (Odd one out)
      dataset = [
        {
          title: 'Cari Benda yang Paling Berbeda!',
          prompt: 'Manakah benda yang bukan buah?',
          audioText: 'Manakah yang bukan buah lezat?',
          items: [
            { id: 'o1', label: 'Apel Manis', visual: '🍎', isTarget: false },
            { id: 'o2', label: 'Stroberi', visual: '🍓', isTarget: false },
            { id: 'o3', label: 'Mobil Balap', visual: '🚗', isTarget: true },
            { id: 'o4', label: 'Pisang', visual: '🍌', isTarget: false },
          ],
        },
        {
          title: 'Cari Benda yang Paling Berbeda!',
          prompt: 'Manakah yang bukan hewan berkaki empat?',
          audioText: 'Manakah yang bukan hewan darat berkaki empat?',
          items: [
            { id: 'o5', label: 'Kucing', visual: '🐱', isTarget: false },
            { id: 'o6', label: 'Sapi', visual: '🐮', isTarget: false },
            { id: 'o7', label: 'Ikan Berenang', visual: '🐟', isTarget: true },
            { id: 'o8', label: 'Kuda', visual: '🐴', isTarget: false },
          ],
        },
        {
          title: 'Cari Warna yang Paling Berbeda!',
          prompt: 'Manakah yang warnanya tidak merah?',
          audioText: 'Manakah yang warnanya bukan merah?',
          items: [
            { id: 'o9', label: 'Hati Merah', visual: '❤️', isTarget: false },
            { id: 'o10', label: 'Tomat Merah', visual: '🍅', isTarget: false },
            { id: 'o11', label: 'Katup Merah', visual: '🔴', isTarget: false },
            { id: 'o12', label: 'Katak Hijau', visual: '🐸', isTarget: true },
          ],
        },
      ];
    }

    setRounds(shuffleArray(dataset));
    setCurrentRoundIdx(0);
    setScore(0);
    setIsAnswered(false);
  }, [gameId]);

  const currentRound = rounds[currentRoundIdx];

  useEffect(() => {
    if (currentRound) {
      audio.speakIndonesian(currentRound.audioText);
    }
  }, [currentRound]);

  if (!currentRound) return null;

  const handleSelect = (itemId: string, isTarget: boolean) => {
    if (isAnswered) return;
    setSelectedId(itemId);
    setIsAnswered(true);

    if (isTarget) {
      audio.playCorrect();
      setScore((s) => s + 1);
      onAnswerFeedback(true, 'Tepat sekali! Hebat!');
    } else {
      audio.playWrong();
      onAnswerFeedback(false, 'Yuk, amati lagi baik-baik!');
    }

    setTimeout(() => {
      if (currentRoundIdx + 1 < rounds.length) {
        setCurrentRoundIdx((p) => p + 1);
        setSelectedId(null);
        setIsAnswered(false);
      } else {
        const finalScore = isTarget ? score + 1 : score;
        onComplete(finalScore, rounds.length);
      }
    }, 1600);
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full">
      {/* Progress */}
      <div className="flex items-center justify-between w-full mb-3 px-2">
        <span className="text-xs font-black text-purple-800 bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
          Tantangan {currentRoundIdx + 1} dari {rounds.length}
        </span>
        <button
          onClick={() => audio.speakIndonesian(currentRound.audioText)}
          className="flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengar Soal</span>
        </button>
      </div>

      {/* Prompt Card */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-md border-4 border-purple-200 text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
          {currentRound.title}
        </h2>
        <div className="text-2xl sm:text-3xl font-black text-purple-900 bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
          {currentRound.prompt}
        </div>
      </div>

      {/* Items to Pick */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
        {currentRound.items.map((item) => {
          const isSelected = selectedId === item.id;
          let btnClass = 'bg-white border-purple-300 hover:bg-purple-50';

          if (isAnswered) {
            if (item.isTarget) {
              btnClass = 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-300 scale-105';
            } else if (isSelected) {
              btnClass = 'bg-rose-100 border-rose-400 opacity-70';
            } else {
              btnClass = 'bg-slate-50 border-slate-200 opacity-50';
            }
          }

          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id, item.isTarget)}
              disabled={isAnswered}
              className={`btn-chubby flex flex-col items-center justify-center p-4 rounded-3xl border-4 transition-all cursor-pointer ${btnClass}`}
              aria-label={`Pilih ${item.label}`}
            >
              <span className="text-5xl sm:text-6xl mb-2">{item.visual}</span>
              <span className="text-xs sm:text-sm font-black text-slate-800">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
