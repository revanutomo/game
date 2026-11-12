import React, { useState, useEffect } from 'react';
import { WORD_BUILDER_QUESTIONS } from '../../data/gameQuestions';
import { shuffleArray, checkWordSpelling } from '../../utils/gameRules';
import { audio } from '../../utils/audioManager';
import { Volume2, RotateCcw, HelpCircle } from 'lucide-react';
import { WordBuildQuestion } from '../../types/game';

interface WordBuilderEngineProps {
  onComplete: (score: number, total: number) => void;
  onAnswerFeedback: (isCorrect: boolean, feedbackText: string) => void;
}

export const WordBuilderEngine: React.FC<WordBuilderEngineProps> = ({
  onComplete,
  onAnswerFeedback,
}) => {
  const [questions, setQuestions] = useState<WordBuildQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ id: string; letter: string }[]>([]);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const randomized = shuffleArray(WORD_BUILDER_QUESTIONS).slice(0, 4);
    setQuestions(randomized);
    setCurrentIndex(0);
    setScore(0);
  }, []);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (currentQ) {
      setPlacedLetters([]);
      const tiles = shuffleArray(currentQ.scrambledLetters).map((letter, idx) => ({
        id: `${letter}-${idx}-${Math.random()}`,
        letter,
      }));
      setAvailableLetters(tiles);
      setIsAnswered(false);
      setShowHint(false);

      const timer = setTimeout(() => {
        audio.speakIndonesian(`Susun kata untuk ${currentQ.hint}`);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentQ, currentIndex]);

  if (!currentQ) {
    return <div className="p-8 text-center font-bold">Menyiapkan kata-kata seru...</div>;
  }

  const handlePickLetter = (tileId: string, letter: string) => {
    if (isAnswered) return;
    audio.playPop();
    const newPlaced = [...placedLetters, letter];
    setPlacedLetters(newPlaced);
    setAvailableLetters((prev) => prev.filter((t) => t.id !== tileId));

    // Check if word is complete
    if (newPlaced.length === currentQ.targetWord.length) {
      const spelled = newPlaced.join('');
      setIsAnswered(true);

      if (checkWordSpelling(spelled, currentQ.targetWord)) {
        audio.playCorrect();
        audio.speakIndonesian(`Benar! Kata ${currentQ.targetWord}`);
        setScore((prev) => prev + 1);
        onAnswerFeedback(true, 'Hebat sekali! Kamu pintar!');
      } else {
        audio.playWrong();
        onAnswerFeedback(false, 'Yuk, coba lagi. Kamu pasti bisa!');
      }

      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          const finalScore = checkWordSpelling(spelled, currentQ.targetWord) ? score + 1 : score;
          onComplete(finalScore, questions.length);
        }
      }, 1800);
    }
  };

  const handleResetLetters = () => {
    audio.playPop();
    setPlacedLetters([]);
    const tiles = shuffleArray(currentQ.scrambledLetters).map((letter, idx) => ({
      id: `${letter}-${idx}-${Math.random()}`,
      letter,
    }));
    setAvailableLetters(tiles);
    setIsAnswered(false);
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full">
      {/* Header bar */}
      <div className="flex items-center justify-between w-full mb-3 px-2">
        <span className="text-xs font-black text-pink-800 bg-pink-100 px-3 py-1 rounded-full border border-pink-300">
          Kata {currentIndex + 1} dari {questions.length}
        </span>
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
          <span>{showHint ? 'Tutup Bantuan' : 'Petunjuk'}</span>
        </button>
      </div>

      {/* Picture Card */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-md border-4 border-pink-200 text-center mb-6">
        <div className="text-7xl mb-2">{currentQ.emoji}</div>
        <p className="text-base font-bold text-slate-600 mb-4">{currentQ.hint}</p>

        {/* Word Slot Boxes */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          {Array.from({ length: currentQ.targetWord.length }).map((_, idx) => {
            const letter = placedLetters[idx];
            return (
              <div
                key={idx}
                className={`w-14 h-16 sm:w-16 sm:h-20 rounded-2xl border-4 flex items-center justify-center text-3xl sm:text-4xl font-black shadow-inner transition-all ${
                  letter
                    ? isAnswered
                      ? checkWordSpelling(placedLetters.join(''), currentQ.targetWord)
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                        : 'bg-rose-100 border-rose-400 text-rose-800'
                      : 'bg-amber-100 border-amber-400 text-amber-950 scale-105'
                    : 'bg-slate-100 border-slate-300 text-transparent'
                }`}
              >
                {letter || '_'}
              </div>
            );
          })}
        </div>

        {showHint && (
          <p className="text-xs font-bold text-amber-800 mt-2">
            💡 Kata yang disusun memiliki {currentQ.targetWord.length} huruf! Diawali huruf "{currentQ.targetWord[0]}".
          </p>
        )}
      </div>

      {/* Available Letter Tiles to Tap */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap mb-6">
        {availableLetters.map((tile) => (
          <button
            key={tile.id}
            onClick={() => handlePickLetter(tile.id, tile.letter)}
            className="btn-chubby w-14 h-16 sm:w-16 sm:h-20 rounded-2xl bg-gradient-to-b from-sky-300 to-sky-400 border-3 border-sky-600 text-white text-3xl font-black shadow-md transition-transform cursor-pointer"
            aria-label={`Huruf ${tile.letter}`}
          >
            {tile.letter}
          </button>
        ))}
      </div>

      {/* Reset button */}
      {placedLetters.length > 0 && !isAnswered && (
        <button
          onClick={handleResetLetters}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-sm font-bold border-2 border-rose-300 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi Susunan Huruf</span>
        </button>
      )}
    </div>
  );
};
