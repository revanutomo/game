import React, { useState, useEffect } from 'react';
import { ChoiceQuestion } from '../../types/game';
import { QUIZ_QUESTIONS } from '../../data/gameQuestions';
import { shuffleArray } from '../../utils/gameRules';
import { audio } from '../../utils/audioManager';
import { Volume2, HelpCircle } from 'lucide-react';

interface QuizChoiceEngineProps {
  gameId: string;
  onComplete: (score: number, total: number) => void;
  onAnswerFeedback: (isCorrect: boolean, feedbackText: string) => void;
}

export const QuizChoiceEngine: React.FC<QuizChoiceEngineProps> = ({
  gameId,
  onComplete,
  onAnswerFeedback,
}) => {
  const [questions, setQuestions] = useState<ChoiceQuestion[]>(() => {
    const raw = QUIZ_QUESTIONS[gameId] || QUIZ_QUESTIONS['huruf-a-z'];
    return shuffleArray(raw).slice(0, 5).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Re-randomize when gameId changes
  useEffect(() => {
    const raw = QUIZ_QUESTIONS[gameId] || QUIZ_QUESTIONS['huruf-a-z'];
    const randomized = shuffleArray(raw).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setQuestions(randomized.slice(0, 5));
    setCurrentIndex(0);
    setScore(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setShowHint(false);
  }, [gameId]);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (currentQ?.audioText) {
      // Gentle delayed speech so children hear the question
      const timer = setTimeout(() => {
        audio.speakIndonesian(currentQ.audioText!);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentQ]);

  if (!currentQ) {
    return <div className="p-8 text-center font-bold">Memuat soal seru...</div>;
  }

  const handleSelect = (optionId: string, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    if (isCorrect) {
      audio.playCorrect();
      setScore((prev) => prev + 1);
      onAnswerFeedback(true, 'Hebat sekali! Kamu pintar!');
    } else {
      audio.playWrong();
      onAnswerFeedback(false, 'Yuk, coba lagi. Kamu pasti bisa!');
    }

    // Auto advance after short feedback delay
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOptionId(null);
        setIsAnswered(false);
        setShowHint(false);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        onComplete(finalScore, questions.length);
      }
    }, 1600);
  };

  const speakQuestion = () => {
    audio.speakIndonesian(currentQ.audioText || currentQ.prompt);
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto w-full">
      {/* Question Counter Pill */}
      <div className="flex items-center justify-between w-full mb-4 px-2">
        <span className="text-xs font-black text-sky-800 bg-sky-100 px-3 py-1 rounded-full border border-sky-300">
          Soal {currentIndex + 1} dari {questions.length}
        </span>
        {currentQ.hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showHint ? 'Tutup Bantuan' : 'Lihat Petunjuk'}</span>
          </button>
        )}
      </div>

      {/* Main Question Card */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-md border-4 border-amber-200 text-center mb-6 relative overflow-hidden">
        {/* Playful top banner */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            {currentQ.prompt}
          </h2>
          <button
            onClick={speakQuestion}
            className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-700 transition-transform active:scale-95 cursor-pointer shrink-0"
            title="Dengarkan soal"
            aria-label="Dengarkan pembacaan soal"
          >
            <Volume2 className="w-6 h-6 animate-pulse" />
          </button>
        </div>

        {/* Visual Prompt (Big letter, Big Emoji, or Arabic) */}
        {currentQ.visual && (
          <div className="my-4 py-4 px-6 bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl border-2 border-dashed border-amber-300 inline-block">
            <span
              className={`font-black drop-shadow-sm select-none ${
                currentQ.visualType === 'text'
                  ? 'text-6xl sm:text-7xl text-amber-600 font-mono tracking-wider'
                  : 'text-5xl sm:text-6xl'
              }`}
            >
              {currentQ.visual}
            </span>
          </div>
        )}

        {/* Hint Box */}
        {showHint && currentQ.hint && (
          <div className="mt-3 p-3 bg-amber-50 border-2 border-amber-300 rounded-2xl text-amber-900 text-sm font-bold animate-fade-in">
            💡 Petunjuk: {currentQ.hint}
          </div>
        )}
      </div>

      {/* Choice Options Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full">
        {currentQ.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let btnClass = 'bg-white border-sky-300 text-sky-900 hover:bg-sky-50 hover:border-sky-400';

          if (isAnswered) {
            if (opt.isCorrect) {
              btnClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-102 ring-4 ring-emerald-300';
            } else if (isSelected && !opt.isCorrect) {
              btnClass = 'bg-rose-100 border-rose-400 text-rose-900 opacity-80';
            } else {
              btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id, opt.isCorrect)}
              disabled={isAnswered}
              className={`btn-chubby flex flex-col items-center justify-center p-5 rounded-3xl border-4 text-center transition-all cursor-pointer select-none min-h-[90px] ${btnClass}`}
              aria-label={`Pilihan jawaban: ${opt.label}`}
            >
              {opt.visual && <span className="text-3xl mb-1">{opt.visual}</span>}
              <span className="text-xl sm:text-2xl font-black">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
