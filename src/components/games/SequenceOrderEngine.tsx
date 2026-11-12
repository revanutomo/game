import React, { useState, useEffect } from 'react';
import { SEQUENCE_SETS } from '../../data/gameQuestions';
import { SequenceStep } from '../../types/game';
import { shuffleArray } from '../../utils/gameRules';
import { audio } from '../../utils/audioManager';
import { Check, ArrowRight, RotateCcw } from 'lucide-react';

interface SequenceOrderEngineProps {
  gameId: string;
  onComplete: (score: number, total: number) => void;
  onAnswerFeedback: (isCorrect: boolean, feedbackText: string) => void;
}

export const SequenceOrderEngine: React.FC<SequenceOrderEngineProps> = ({
  gameId,
  onComplete,
  onAnswerFeedback,
}) => {
  const dataset = SEQUENCE_SETS[gameId] || SEQUENCE_SETS['urut-angka'];
  const [shuffledSteps, setShuffledSteps] = useState<SequenceStep[]>([]);
  const [arrangedSteps, setArrangedSteps] = useState<SequenceStep[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrectResult, setIsCorrectResult] = useState<boolean | null>(null);

  const resetGame = () => {
    const randomized = shuffleArray(dataset.steps);
    setShuffledSteps(randomized);
    setArrangedSteps([]);
    setIsAnswered(false);
    setIsCorrectResult(null);
  };

  useEffect(() => {
    resetGame();
    audio.speakIndonesian(`Susun urutan ${dataset.title}`);
  }, [gameId]);

  const handlePickStep = (step: SequenceStep) => {
    if (isAnswered) return;
    audio.playPop();
    const nextArranged = [...arrangedSteps, step];
    setArrangedSteps(nextArranged);
    setShuffledSteps((prev) => prev.filter((s) => s.id !== step.id));

    // Check if all steps placed
    if (nextArranged.length === dataset.steps.length) {
      setIsAnswered(true);
      const isCorrect = nextArranged.every((s, i) => s.order === i + 1);
      setIsCorrectResult(isCorrect);

      if (isCorrect) {
        audio.playCorrect();
        audio.speakIndonesian('Hebat sekali! Urutannya tepat!');
        onAnswerFeedback(true, 'Hebat sekali! Urutanmu tepat!');
        setTimeout(() => {
          onComplete(dataset.steps.length, dataset.steps.length);
        }, 1600);
      } else {
        audio.playWrong();
        audio.speakIndonesian('Ada yang belum berurutan, ayo coba lagi!');
        onAnswerFeedback(false, 'Urutannya belum pas, yuk ulangi!');
        setTimeout(() => {
          resetGame();
        }, 2000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full">
      {/* Title */}
      <div className="w-full bg-white rounded-3xl p-5 shadow-md border-4 border-amber-200 text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-1">
          {dataset.title}
        </h2>
        <p className="text-xs sm:text-sm font-bold text-slate-500">
          Ketuk langkah-langkah di bawah sesuai urutan kejadian dari awal ke akhir!
        </p>
      </div>

      {/* Arranged Slots Area */}
      <div className="w-full mb-6">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2 px-1">
          Urutan yang Kamu Pilih:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 min-h-[110px] p-3 rounded-3xl bg-amber-50/80 border-3 border-dashed border-amber-300">
          {dataset.steps.map((_, idx) => {
            const step = arrangedSteps[idx];
            return (
              <div
                key={idx}
                className={`rounded-2xl border-3 flex flex-col items-center justify-center p-2.5 text-center transition-all ${
                  step
                    ? isAnswered
                      ? isCorrectResult
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-102 ring-2 ring-emerald-300'
                        : 'bg-rose-100 border-rose-400 text-rose-950'
                      : 'bg-white border-amber-400 shadow-sm'
                    : 'bg-white/40 border-amber-200 text-slate-300'
                }`}
              >
                {step ? (
                  <>
                    <span className="text-3xl mb-1">{step.emoji}</span>
                    <span className="text-xs font-black leading-tight text-slate-800 line-clamp-1">
                      {step.label}
                    </span>
                    <span className="text-[10px] text-amber-700 font-bold mt-0.5">
                      Urutan #{idx + 1}
                    </span>
                  </>
                ) : (
                  <span className="text-xs font-black text-amber-300">
                    Langkah {idx + 1}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Available steps pool */}
      <div className="w-full mb-4">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2 px-1">
          Pilihan Langkah:
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {shuffledSteps.map((step) => (
            <button
              key={step.id}
              onClick={() => handlePickStep(step)}
              className="btn-chubby flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border-3 border-sky-400 hover:bg-sky-50 shadow-sm text-slate-800 font-black cursor-pointer transition-transform"
              aria-label={`Pilih ${step.label}`}
            >
              <span className="text-2xl">{step.emoji}</span>
              <span className="text-sm font-black">{step.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reset button */}
      {arrangedSteps.length > 0 && !isAnswered && (
        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border-2 border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Atur Ulang</span>
        </button>
      )}
    </div>
  );
};
