import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { generateMathProblem, shuffleArray } from '../../utils/gameRules';
import { audio } from '../../utils/audioManager';
import { Volume2 } from 'lucide-react';

interface CountMathEngineProps {
  gameId: string;
  onComplete: (score: number, total: number) => void;
  onAnswerFeedback: (isCorrect: boolean, feedbackText: string) => void;
}

export const CountMathEngine: React.FC<CountMathEngineProps> = ({
  gameId,
  onComplete,
  onAnswerFeedback,
}) => {
  const { profile } = useGame();
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [problem, setProblem] = useState<{
    num1: number;
    num2: number;
    correct: number;
    options: number[];
    itemEmoji: string;
    type: 'count' | 'addition' | 'subtraction';
  } | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [countedIndices, setCountedIndices] = useState<number[]>([]);

  const totalRounds = 5;
  const emojis = ['🍎', '🍓', '⭐', '🎈', '🍬', '🚗', '🐱', '🦆'];

  const loadNewProblem = () => {
    const itemEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCountedIndices([]);

    if (gameId === 'penjumlahan-ceria') {
      const generated = generateMathProblem('addition', profile.age);
      setProblem({
        num1: generated.num1,
        num2: generated.num2,
        correct: generated.correct,
        options: generated.options,
        itemEmoji,
        type: 'addition',
      });
      audio.speakIndonesian(`Berapakah ${generated.num1} ditambah ${generated.num2}?`);
    } else if (gameId === 'pengurangan-ceria') {
      const generated = generateMathProblem('subtraction', profile.age);
      setProblem({
        num1: generated.num1,
        num2: generated.num2,
        correct: generated.correct,
        options: generated.options,
        itemEmoji,
        type: 'subtraction',
      });
      audio.speakIndonesian(`Ada ${generated.num1} benda, lalu diambil ${generated.num2}. Tinggal berapa?`);
    } else {
      // hitung-benda
      const count = Math.min(profile.age <= 3 ? 5 : profile.age <= 4 ? 8 : 10, Math.floor(Math.random() * (profile.age <= 3 ? 5 : 9)) + 1);
      const wrong1 = count + 1;
      const wrong2 = Math.max(1, count - 1);
      const options = shuffleArray([count, wrong1, wrong2]);
      setProblem({
        num1: count,
        num2: 0,
        correct: count,
        options,
        itemEmoji,
        type: 'count',
      });
      audio.speakIndonesian('Ada berapa banyak benda di layar? Hitung satu per satu!');
    }
  };

  useEffect(() => {
    loadNewProblem();
  }, [currentRound, gameId]);

  if (!problem) return null;

  const handleTapItem = (idx: number) => {
    audio.playPop();
    setCountedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleSelectOption = (num: number) => {
    if (isAnswered) return;
    setSelectedAnswer(num);
    setIsAnswered(true);

    const isCorrect = num === problem.correct;
    if (isCorrect) {
      audio.playCorrect();
      setScore((prev) => prev + 1);
      onAnswerFeedback(true, 'Hebat sekali! Kamu pintar!');
    } else {
      audio.playWrong();
      onAnswerFeedback(false, 'Yuk, coba lagi. Kamu pasti bisa!');
    }

    setTimeout(() => {
      if (currentRound + 1 < totalRounds) {
        setCurrentRound((prev) => prev + 1);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        onComplete(finalScore, totalRounds);
      }
    }, 1600);
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full">
      {/* Round info */}
      <div className="flex items-center justify-between w-full mb-3 px-2">
        <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
          Tantangan {currentRound + 1} dari {totalRounds}
        </span>
        <button
          onClick={() => {
            if (problem.type === 'addition') {
              audio.speakIndonesian(`${problem.num1} ditambah ${problem.num2}`);
            } else if (problem.type === 'subtraction') {
              audio.speakIndonesian(`${problem.num1} dikurangi ${problem.num2}`);
            } else {
              audio.speakIndonesian('Hitung jumlah benda!');
            }
          }}
          className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengar Soal</span>
        </button>
      </div>

      {/* Visual Canvas Card */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-md border-4 border-emerald-200 text-center mb-6">
        {problem.type === 'count' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">
              Sentuh dan Hitung Semua {problem.itemEmoji}!
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 py-4 min-h-[140px] bg-emerald-50/60 rounded-2xl p-4 border-2 border-dashed border-emerald-300">
              {Array.from({ length: problem.num1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleTapItem(i)}
                  className={`text-4xl sm:text-5xl transition-transform hover:scale-125 cursor-pointer p-1 rounded-xl ${
                    countedIndices.includes(i) ? 'scale-110 ring-4 ring-amber-400 bg-amber-100' : ''
                  }`}
                  aria-label={`Benda ke ${i + 1}`}
                >
                  {problem.itemEmoji}
                </button>
              ))}
            </div>
            {countedIndices.length > 0 && (
              <p className="text-xs font-bold text-amber-700 mt-2">
                Sudah disentuh: {countedIndices.length} {problem.itemEmoji}
              </p>
            )}
          </div>
        )}

        {problem.type === 'addition' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">
              Berapakah Jumlah Semuanya?
            </h2>
            <div className="flex items-center justify-center gap-3 sm:gap-6 py-4 flex-wrap bg-emerald-50/60 rounded-2xl p-4 border-2 border-dashed border-emerald-300">
              {/* Group 1 */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 p-3 bg-white rounded-2xl border-2 border-emerald-300 shadow-xs">
                {Array.from({ length: problem.num1 }).map((_, i) => (
                  <span key={i} className="text-3xl sm:text-4xl">{problem.itemEmoji}</span>
                ))}
                <span className="block w-full font-black text-lg text-emerald-800">({problem.num1})</span>
              </div>

              <span className="text-4xl font-black text-emerald-600">+</span>

              {/* Group 2 */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 p-3 bg-white rounded-2xl border-2 border-emerald-300 shadow-xs">
                {Array.from({ length: problem.num2 }).map((_, i) => (
                  <span key={i} className="text-3xl sm:text-4xl">{problem.itemEmoji}</span>
                ))}
                <span className="block w-full font-black text-lg text-emerald-800">({problem.num2})</span>
              </div>
            </div>
          </div>
        )}

        {problem.type === 'subtraction' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">
              Berapakah Benda yang Tersisa?
            </h2>
            <div className="flex items-center justify-center gap-3 sm:gap-6 py-4 flex-wrap bg-emerald-50/60 rounded-2xl p-4 border-2 border-dashed border-emerald-300">
              <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-white rounded-2xl border-2 border-emerald-300 shadow-xs">
                {/* Kept items */}
                {Array.from({ length: problem.num1 - problem.num2 }).map((_, i) => (
                  <span key={`kept-${i}`} className="text-3xl sm:text-4xl">{problem.itemEmoji}</span>
                ))}
                {/* Subtracted items (crossed out) */}
                {Array.from({ length: problem.num2 }).map((_, i) => (
                  <span key={`crossed-${i}`} className="text-3xl sm:text-4xl opacity-40 line-through relative">
                    {problem.itemEmoji}
                  </span>
                ))}
              </div>
              <div className="text-sm font-bold text-emerald-900">
                {problem.num1} dikurangi {problem.num2}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-3 gap-4 w-full">
        {problem.options.map((opt) => {
          const isSelected = selectedAnswer === opt;
          let btnClass = 'bg-white border-emerald-300 text-emerald-900 hover:bg-emerald-50';

          if (isAnswered) {
            if (opt === problem.correct) {
              btnClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300 scale-105';
            } else if (isSelected && opt !== problem.correct) {
              btnClass = 'bg-rose-100 border-rose-400 text-rose-900 opacity-70';
            } else {
              btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={opt}
              onClick={() => handleSelectOption(opt)}
              disabled={isAnswered}
              className={`btn-chubby p-5 rounded-3xl border-4 text-center transition-all cursor-pointer select-none text-3xl sm:text-4xl font-black ${btnClass}`}
              aria-label={`Pilihan angka ${opt}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};
