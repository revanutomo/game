import React, { useState, useEffect } from 'react';
import { MEMORY_CARDS_POOL } from '../../data/gameQuestions';
import { shuffleArray } from '../../utils/gameRules';
import { audio } from '../../utils/audioManager';
import { Sparkles, Trophy } from 'lucide-react';

interface MemoryCard {
  uniqueId: string;
  itemId: string;
  label: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryFlipEngineProps {
  onComplete: (score: number, total: number) => void;
  onAnswerFeedback: (isCorrect: boolean, feedbackText: string) => void;
}

export const MemoryFlipEngine: React.FC<MemoryFlipEngineProps> = ({
  onComplete,
  onAnswerFeedback,
}) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchesCount, setMatchesCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const pairCount = 4; // 8 cards total: perfect attention span for 3-6 yo kids

  const initializeGame = () => {
    const selectedPool = shuffleArray(MEMORY_CARDS_POOL).slice(0, pairCount);
    const deck: MemoryCard[] = [];

    selectedPool.forEach((item) => {
      // Create pair
      deck.push({
        uniqueId: `${item.id}-1`,
        itemId: item.id,
        label: item.label,
        emoji: item.emoji,
        isFlipped: false,
        isMatched: false,
      });
      deck.push({
        uniqueId: `${item.id}-2`,
        itemId: item.id,
        label: item.label,
        emoji: item.emoji,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(shuffleArray(deck));
    setFlippedCards([]);
    setMatchesCount(0);
    setMoves(0);
    setIsProcessing(false);
  };

  useEffect(() => {
    initializeGame();
    audio.speakIndonesian('Buka kartu dan cari pasangan kembar yang sama!');
  }, []);

  const handleCardClick = (index: number) => {
    if (isProcessing) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    audio.playPop();

    // Flip the clicked card
    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;
    setCards(updatedCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      setMoves((m) => m + 1);

      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = updatedCards[firstIdx];
      const secondCard = updatedCards[secondIdx];

      if (firstCard.itemId === secondCard.itemId) {
        // MATCH!
        audio.playCorrect();
        audio.speakIndonesian(`Hebat! Pasangan ${firstCard.label}`);
        onAnswerFeedback(true, `Cocok! Pasangan ${firstCard.label}`);

        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isMatched: true } : c
            )
          );
          setFlippedCards([]);
          setIsProcessing(false);
          setMatchesCount((prev) => {
            const nextCount = prev + 1;
            if (nextCount === pairCount) {
              // ALL MATCHED!
              setTimeout(() => {
                onComplete(pairCount, pairCount);
              }, 800);
            }
            return nextCount;
          });
        }, 500);
      } else {
        // NO MATCH
        audio.playWrong();
        onAnswerFeedback(false, 'Belum sama, coba ingat gambarnya!');
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1100);
      }
    }
  };

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto w-full">
      {/* Score info */}
      <div className="flex items-center justify-between w-full mb-4 px-2">
        <span className="text-xs font-black text-violet-800 bg-violet-100 px-3 py-1 rounded-full border border-violet-300">
          Pasangan Ditemukan: {matchesCount} dari {pairCount}
        </span>
        <span className="text-xs font-bold text-slate-500">
          Langkah: {moves}
        </span>
      </div>

      {/* Grid of memory cards */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full">
        {cards.map((card, idx) => {
          const isRevealed = card.isFlipped || card.isMatched;
          return (
            <button
              key={card.uniqueId}
              onClick={() => handleCardClick(idx)}
              disabled={isRevealed || isProcessing}
              className={`aspect-square rounded-3xl border-4 transition-all duration-300 flex flex-col items-center justify-center p-2 cursor-pointer shadow-md select-none ${
                card.isMatched
                  ? 'bg-emerald-100 border-emerald-400 opacity-90 scale-95'
                  : isRevealed
                  ? 'bg-white border-amber-400 rotate-0 scale-102 ring-4 ring-amber-200'
                  : 'bg-gradient-to-br from-violet-400 to-indigo-500 border-violet-600 hover:scale-105 active:scale-95'
              }`}
              aria-label={isRevealed ? card.label : `Kartu nomor ${idx + 1}`}
            >
              {isRevealed ? (
                <div className="animate-gentle-bounce flex flex-col items-center">
                  <span className="text-4xl sm:text-5xl">{card.emoji}</span>
                  <span className="text-[10px] sm:text-xs font-black text-slate-700 mt-1 line-clamp-1">
                    {card.label}
                  </span>
                </div>
              ) : (
                <span className="text-3xl text-white font-black opacity-80 drop-shadow-sm">
                  ❓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
