import React, { useState, useEffect } from 'react';
import { audio } from '../../utils/audioManager';
import { RotateCcw } from 'lucide-react';

interface ShapeBuilderEngineProps {
  onComplete: (score: number, total: number) => void;
  onAnswerFeedback: (isCorrect: boolean, feedbackText: string) => void;
}

interface ShapeSlot {
  id: string;
  label: string;
  shapeType: 'triangle' | 'square' | 'circle' | 'rectangle';
  isFilled: boolean;
}

export const ShapeBuilderEngine: React.FC<ShapeBuilderEngineProps> = ({
  onComplete,
  onAnswerFeedback,
}) => {
  const [slots, setSlots] = useState<ShapeSlot[]>([
    { id: 's1', label: 'Atap Segitiga', shapeType: 'triangle', isFilled: false },
    { id: 's2', label: 'Dinding Persegi', shapeType: 'square', isFilled: false },
    { id: 's3', label: 'Pintu Persegi Panjang', shapeType: 'rectangle', isFilled: false },
    { id: 's4', label: 'Jendela Bulat', shapeType: 'circle', isFilled: false },
  ]);

  const availableShapes: {
    type: 'triangle' | 'square' | 'circle' | 'rectangle';
    label: string;
    emoji: string;
    color: string;
  }[] = [
    { type: 'triangle', label: 'Segitiga', emoji: '🔺', color: 'bg-rose-100 border-rose-400 text-rose-800' },
    { type: 'square', label: 'Persegi', emoji: '⏹️', color: 'bg-amber-100 border-amber-400 text-amber-800' },
    { type: 'circle', label: 'Lingkaran', emoji: '⭕', color: 'bg-sky-100 border-sky-400 text-sky-800' },
    { type: 'rectangle', label: 'Persegi Panjang', emoji: '🚪', color: 'bg-emerald-100 border-emerald-400 text-emerald-800' },
  ];

  useEffect(() => {
    audio.speakIndonesian('Ayo bangun rumah indah! Pasang atap segitiga, dinding persegi, pintu, dan jendela bulat!');
  }, []);

  const handlePickShape = (shapeType: 'triangle' | 'square' | 'circle' | 'rectangle') => {
    const slotIndex = slots.findIndex((s) => s.shapeType === shapeType && !s.isFilled);

    if (slotIndex !== -1) {
      audio.playCorrect();
      const updated = [...slots];
      updated[slotIndex].isFilled = true;
      setSlots(updated);

      const remaining = updated.filter((s) => !s.isFilled).length;
      if (remaining === 0) {
        audio.playFanfare();
        audio.speakIndonesian('Hore! Rumah indah berhasil dibangun dengan sempurna!');
        onAnswerFeedback(true, 'Luar biasa! Rumah indahmu sudah jadi!');
        setTimeout(() => {
          onComplete(4, 4);
        }, 1600);
      } else {
        onAnswerFeedback(true, `Bagus! ${updated[slotIndex].label} terpasang!`);
      }
    } else {
      audio.playWrong();
      onAnswerFeedback(false, 'Bagian ini sudah terpasang, coba bentuk lain!');
    }
  };

  const handleReset = () => {
    audio.playPop();
    setSlots(slots.map((s) => ({ ...s, isFilled: false })));
  };

  const isRoofFilled = slots.find((s) => s.id === 's1')?.isFilled;
  const isWallFilled = slots.find((s) => s.id === 's2')?.isFilled;
  const isDoorFilled = slots.find((s) => s.id === 's3')?.isFilled;
  const isWindowFilled = slots.find((s) => s.id === 's4')?.isFilled;

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full">
      {/* Title */}
      <div className="w-full bg-white rounded-3xl p-5 shadow-md border-4 border-indigo-200 text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800">
          Membangun Rumah dari Bentuk Geometri 🏠
        </h2>
        <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1">
          Ketuk bentuk di bawah untuk melengkapi bagian rumah!
        </p>
      </div>

      {/* House Canvas Blueprint */}
      <div className="w-full max-w-sm bg-indigo-50/70 rounded-3xl border-4 border-dashed border-indigo-300 p-6 flex flex-col items-center justify-center relative mb-6 shadow-inner min-h-[280px]">
        {/* Roof (Triangle) */}
        <div
          className={`w-44 h-24 flex items-center justify-center text-4xl transition-all duration-300 border-4 border-b-0 rounded-t-3xl ${
            isRoofFilled
              ? 'bg-gradient-to-b from-rose-400 to-rose-500 border-rose-600 text-white shadow-md'
              : 'border-dashed border-rose-300 text-rose-300 bg-white/40'
          }`}
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        >
          {isRoofFilled ? '🔺 Atap' : '🔺'}
        </div>

        {/* Walls (Square) */}
        <div
          className={`w-48 h-40 border-4 rounded-b-2xl relative flex items-center justify-center transition-all duration-300 ${
            isWallFilled
              ? 'bg-amber-100 border-amber-500 shadow-md'
              : 'border-dashed border-amber-300 bg-white/40'
          }`}
        >
          {/* Window (Circle) inside wall */}
          <div
            className={`absolute top-3 right-4 w-12 h-12 rounded-full border-3 flex items-center justify-center text-lg transition-all ${
              isWindowFilled
                ? 'bg-sky-200 border-sky-500 text-sky-900 shadow-sm animate-pulse'
                : 'border-dashed border-sky-300 text-sky-300 bg-white/60'
            }`}
          >
            {isWindowFilled ? '🪟' : '⭕'}
          </div>

          {/* Door (Rectangle) inside wall */}
          <div
            className={`absolute bottom-0 left-6 w-14 h-24 rounded-t-xl border-3 border-b-0 flex items-center justify-center text-lg transition-all ${
              isDoorFilled
                ? 'bg-emerald-400 border-emerald-600 text-emerald-950 shadow-sm'
                : 'border-dashed border-emerald-300 text-emerald-300 bg-white/60'
            }`}
          >
            {isDoorFilled ? '🚪' : '▭'}
          </div>
        </div>
      </div>

      {/* Shapes Palette to choose from */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-4">
        {availableShapes.map((shape) => (
          <button
            key={shape.type}
            onClick={() => handlePickShape(shape.type)}
            className={`btn-chubby flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border-3 ${shape.color} transition-transform cursor-pointer`}
            aria-label={`Bentuk ${shape.label}`}
          >
            <span className="text-3xl mb-1">{shape.emoji}</span>
            <span className="text-xs font-black">{shape.label}</span>
          </button>
        ))}
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Ulangi Pembangunan</span>
      </button>
    </div>
  );
};
