import React, { useState, useEffect } from 'react';
import { shuffleArray } from '../../utils/gameRules';
import { audio } from '../../utils/audioManager';
import { Volume2 } from 'lucide-react';

interface SortBasketEngineProps {
  onComplete: (score: number, total: number) => void;
  onAnswerFeedback: (isCorrect: boolean, feedbackText: string) => void;
}

interface SortItem {
  id: string;
  name: string;
  emoji: string;
  targetColor: 'merah' | 'kuning' | 'hijau' | 'biru';
  targetColorLabel: string;
}

export const SortBasketEngine: React.FC<SortBasketEngineProps> = ({
  onComplete,
  onAnswerFeedback,
}) => {
  const allItems: SortItem[] = [
    { id: 'i1', name: 'Apel Segar', emoji: '🍎', targetColor: 'merah', targetColorLabel: 'Merah' },
    { id: 'i2', name: 'Stroberi Manis', emoji: '🍓', targetColor: 'merah', targetColorLabel: 'Merah' },
    { id: 'i3', name: 'Pisang Matang', emoji: '🍌', targetColor: 'kuning', targetColorLabel: 'Kuning' },
    { id: 'i4', name: 'Lemon Cerah', emoji: '🍋', targetColor: 'kuning', targetColorLabel: 'Kuning' },
    { id: 'i5', name: 'Katak Hijau', emoji: '🐸', targetColor: 'hijau', targetColorLabel: 'Hijau' },
    { id: 'i6', name: 'Daun Segar', emoji: '🍃', targetColor: 'hijau', targetColorLabel: 'Hijau' },
    { id: 'i7', name: 'Biru Samudra', emoji: '🫐', targetColor: 'biru', targetColorLabel: 'Biru' },
    { id: 'i8', name: 'Paus Biru', emoji: '🐳', targetColor: 'biru', targetColorLabel: 'Biru' },
  ];

  const [queue, setQueue] = useState<SortItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedbackBasket, setFeedbackBasket] = useState<string | null>(null);

  const totalItems = 5;

  useEffect(() => {
    const randomized = shuffleArray(allItems).slice(0, totalItems);
    setQueue(randomized);
    setCurrentIndex(0);
    setScore(0);
    setIsAnswered(false);
    audio.speakIndonesian('Masukkan benda ke dalam keranjang dengan warna yang sama!');
  }, []);

  const currentItem = queue[currentIndex];

  const baskets: {
    colorKey: 'merah' | 'kuning' | 'hijau' | 'biru';
    label: string;
    bg: string;
    border: string;
    text: string;
    basketEmoji: string;
  }[] = [
    { colorKey: 'merah', label: 'Keranjang Merah', bg: 'bg-rose-100 hover:bg-rose-200', border: 'border-rose-400', text: 'text-rose-800', basketEmoji: '🧺' },
    { colorKey: 'kuning', label: 'Keranjang Kuning', bg: 'bg-amber-100 hover:bg-amber-200', border: 'border-amber-400', text: 'text-amber-800', basketEmoji: '🧺' },
    { colorKey: 'hijau', label: 'Keranjang Hijau', bg: 'bg-emerald-100 hover:bg-emerald-200', border: 'border-emerald-400', text: 'text-emerald-800', basketEmoji: '🧺' },
    { colorKey: 'biru', label: 'Keranjang Biru', bg: 'bg-sky-100 hover:bg-sky-200', border: 'border-sky-400', text: 'text-sky-800', basketEmoji: '🧺' },
  ];

  if (!currentItem) return null;

  const handleBasketClick = (basketKey: 'merah' | 'kuning' | 'hijau' | 'biru') => {
    if (isAnswered) return;
    setIsAnswered(true);
    setFeedbackBasket(basketKey);

    const isCorrect = basketKey === currentItem.targetColor;

    if (isCorrect) {
      audio.playCorrect();
      setScore((s) => s + 1);
      audio.speakIndonesian(`Benar! ${currentItem.name} masuk ke keranjang ${currentItem.targetColorLabel}!`);
      onAnswerFeedback(true, 'Tepat sekali! Warna keranjangnya cocok!');
    } else {
      audio.playWrong();
      audio.speakIndonesian(`Benda ini berwarna ${currentItem.targetColorLabel}, coba lagi!`);
      onAnswerFeedback(false, `Benda ini warnanya ${currentItem.targetColorLabel}!`);
    }

    setTimeout(() => {
      if (currentIndex + 1 < queue.length) {
        setCurrentIndex((i) => i + 1);
        setIsAnswered(false);
        setFeedbackBasket(null);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        onComplete(finalScore, totalItems);
      }
    }, 1600);
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-3 px-2">
        <span className="text-xs font-black text-sky-800 bg-sky-100 px-3 py-1 rounded-full border border-sky-300">
          Benda {currentIndex + 1} dari {totalItems}
        </span>
        <button
          onClick={() => audio.speakIndonesian(`Pilih keranjang untuk ${currentItem.name}`)}
          className="flex items-center gap-1 text-xs font-bold text-sky-700 bg-sky-100 px-2.5 py-1 rounded-full"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengar Petunjuk</span>
        </button>
      </div>

      {/* Target Item Card */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-md border-4 border-sky-200 text-center mb-6">
        <div className="text-7xl sm:text-8xl mb-2 animate-gentle-bounce">
          {currentItem.emoji}
        </div>
        <h2 className="text-2xl font-black text-slate-800">
          {currentItem.name}
        </h2>
        <p className="text-sm font-bold text-slate-500 mt-1">
          Masukkan ke keranjang warna yang mana?
        </p>
      </div>

      {/* 4 Colored Baskets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
        {baskets.map((basket) => {
          const isSelected = feedbackBasket === basket.colorKey;
          let extraClass = '';

          if (isAnswered) {
            if (basket.colorKey === currentItem.targetColor) {
              extraClass = 'ring-4 ring-emerald-400 scale-105 bg-emerald-100';
            } else if (isSelected) {
              extraClass = 'opacity-60 bg-rose-50';
            }
          }

          return (
            <button
              key={basket.colorKey}
              onClick={() => handleBasketClick(basket.colorKey)}
              disabled={isAnswered}
              className={`btn-chubby flex flex-col items-center justify-center p-4 rounded-3xl border-4 ${basket.border} ${basket.bg} ${basket.text} transition-all cursor-pointer ${extraClass}`}
              aria-label={`Pilih ${basket.label}`}
            >
              <span className="text-4xl mb-1">{basket.basketEmoji}</span>
              <span className="text-sm font-black text-center">{basket.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
