import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useGame } from '../../context/GameContext';
import { GAMES_LIST } from '../../data/gamesList';
import { BimoMascot } from '../mascot/BimoMascot';
import { audio } from '../../utils/audioManager';
import { ArrowLeft, RotateCcw, Star, Coins, Sparkles, Trophy } from 'lucide-react';

// Engines
import { QuizChoiceEngine } from './QuizChoiceEngine';
import { WordBuilderEngine } from './WordBuilderEngine';
import { CountMathEngine } from './CountMathEngine';
import { MemoryFlipEngine } from './MemoryFlipEngine';
import { SequenceOrderEngine } from './SequenceOrderEngine';
import { OddOneOutEngine } from './OddOneOutEngine';
import { SortBasketEngine } from './SortBasketEngine';
import { ShapeBuilderEngine } from './ShapeBuilderEngine';
import { ColoringEngine } from './ColoringEngine';
import { DrawingCanvasEngine } from './DrawingCanvasEngine';
import { XylophoneEngine } from './XylophoneEngine';

export const GameEngineWrapper: React.FC = () => {
  const { activeGameId, setCurrentView, setActiveGameId, recordGameResult } = useGame();

  const game = GAMES_LIST.find((g) => g.id === activeGameId) || GAMES_LIST[0];

  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking' | 'encouraging'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string>(game.instruction);
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultStars, setResultStars] = useState(3);
  const [resultCoins, setResultCoins] = useState(30);
  const [gameKey, setGameKey] = useState(1); // used to force reset/remount

  const handleBack = () => {
    audio.playPop();
    setActiveGameId(null);
    setCurrentView('categories');
  };

  const handleRestart = () => {
    audio.playPop();
    setIsCompleted(false);
    setMascotMood('happy');
    setMascotSpeech(game.instruction);
    setGameKey((k) => k + 1);
  };

  const handleAnswerFeedback = (isCorrect: boolean, feedbackText: string) => {
    if (isCorrect) {
      setMascotMood('celebrate');
      setMascotSpeech(feedbackText || 'Hebat sekali! Kamu pintar!');
    } else {
      setMascotMood('encouraging');
      setMascotSpeech(feedbackText || 'Yuk, coba lagi. Kamu pasti bisa!');
    }
  };

  const handleComplete = (score: number, total: number) => {
    const { stars, coins } = recordGameResult(
      game.id,
      game.title,
      game.category,
      score,
      total
    );

    setResultStars(stars);
    setResultCoins(coins);
    setIsCompleted(true);
    setMascotMood('celebrate');
    setMascotSpeech('Horeee! Permainan selesai dengan sangat baik! Kamu luar biasa!');

    audio.playFanfare();

    // Trigger joyful confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
      });
    } catch {
      // ignore
    }
  };

  const renderActiveEngine = () => {
    switch (game.engine) {
      case 'word_builder':
        return <WordBuilderEngine key={gameKey} onComplete={handleComplete} onAnswerFeedback={handleAnswerFeedback} />;
      case 'count_math':
        return <CountMathEngine key={gameKey} gameId={game.id} onComplete={handleComplete} onAnswerFeedback={handleAnswerFeedback} />;
      case 'memory_flip':
        return <MemoryFlipEngine key={gameKey} onComplete={handleComplete} onAnswerFeedback={handleAnswerFeedback} />;
      case 'sequence_order':
        return <SequenceOrderEngine key={gameKey} gameId={game.id} onComplete={handleComplete} onAnswerFeedback={handleAnswerFeedback} />;
      case 'odd_one_out':
        return <OddOneOutEngine key={gameKey} gameId={game.id} onComplete={handleComplete} onAnswerFeedback={handleAnswerFeedback} />;
      case 'sort_basket':
        return <SortBasketEngine key={gameKey} onComplete={handleComplete} onAnswerFeedback={handleAnswerFeedback} />;
      case 'shape_builder':
        return <ShapeBuilderEngine key={gameKey} onComplete={handleComplete} onAnswerFeedback={handleAnswerFeedback} />;
      case 'coloring':
        return <ColoringEngine key={gameKey} onComplete={handleComplete} onAnswerFeedback={handleAnswerFeedback} />;
      case 'drawing':
        return <DrawingCanvasEngine key={gameKey} onComplete={handleComplete} onAnswerFeedback={handleAnswerFeedback} />;
      case 'xylophone':
        return <XylophoneEngine key={gameKey} onComplete={handleComplete} onAnswerFeedback={handleAnswerFeedback} />;
      case 'quiz_choice':
      default:
        return <QuizChoiceEngine key={gameKey} gameId={game.id} onComplete={handleComplete} onAnswerFeedback={handleAnswerFeedback} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Top Navigation & Status */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <button
          onClick={handleBack}
          className="btn-chubby flex items-center gap-2 bg-white hover:bg-slate-50 border-3 border-slate-300 text-slate-700 px-4 py-2 rounded-2xl font-black text-sm cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-sky-600" />
          <span>Kembali</span>
        </button>

        <div className="text-center">
          <span className={`px-3 py-1 rounded-full text-white text-xs font-black uppercase ${game.badgeColor}`}>
            {game.title}
          </span>
        </div>

        <button
          onClick={handleRestart}
          className="btn-chubby flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-amber-900 px-3.5 py-2 rounded-2xl font-black text-xs cursor-pointer"
          title="Ulangi Permainan dari Awal"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi</span>
        </button>
      </div>

      {/* Mascot Guidance Banner */}
      <div className="mb-6 flex justify-center">
        <BimoMascot mood={mascotMood} speechText={mascotSpeech} size="md" />
      </div>

      {/* Main Interactive Game Board */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-sm border-2 border-sky-100">
        {renderActiveEngine()}
      </div>

      {/* Completion Modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center border-6 border-amber-300 shadow-2xl relative animate-gentle-bounce">
            {/* Trophy Icon */}
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center border-4 border-amber-500 shadow-lg mb-4">
              <Trophy className="w-10 h-10 text-amber-950 animate-pulse" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-1 font-fredoka">
              Pintar Sekali!
            </h3>
            <p className="text-sm font-bold text-slate-600 mb-6">
              Kamu berhasil menyelesaikan permainan "{game.title}"!
            </p>

            {/* Stars Won */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border-3 transition-transform ${
                    i < resultStars
                      ? 'bg-amber-100 border-amber-400 scale-110 shadow-md ring-4 ring-amber-200'
                      : 'bg-slate-100 border-slate-300 opacity-40'
                  }`}
                >
                  <Star
                    className={`w-8 h-8 ${
                      i < resultStars ? 'fill-amber-400 text-amber-500' : 'text-slate-400'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Coins Earned Banner */}
            <div className="flex items-center justify-center gap-2 bg-yellow-100 border-2 border-yellow-300 rounded-2xl py-2 px-4 mb-6">
              <Coins className="w-5 h-5 text-yellow-600" />
              <span className="text-base font-black text-yellow-950">
                +{resultCoins} Koin Hadiah Didapatkan!
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleRestart}
                className="btn-chubby flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 border-3 border-sky-700 text-white font-black text-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Main Lagi</span>
              </button>

              <button
                onClick={handleBack}
                className="btn-chubby flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 border-3 border-emerald-700 text-white font-black text-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Game Lain</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
