import React, { useState } from 'react';
import { COLORING_TEMPLATES, ColoringTemplate } from '../../data/gameQuestions';
import { audio } from '../../utils/audioManager';
import { Check, RotateCcw, Palette } from 'lucide-react';

interface ColoringEngineProps {
  onComplete: (score: number, total: number) => void;
  onAnswerFeedback: (isCorrect: boolean, feedbackText: string) => void;
}

export const ColoringEngine: React.FC<ColoringEngineProps> = ({
  onComplete,
  onAnswerFeedback,
}) => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const template = COLORING_TEMPLATES[selectedTemplateIndex];
  const [shapeColors, setShapeColors] = useState<Record<string, string>>({});
  const [activeColor, setActiveColor] = useState<string>('#F43F5E'); // default rose/red

  const palette = [
    { name: 'Merah', hex: '#F43F5E' },
    { name: 'Oranye', hex: '#FB923C' },
    { name: 'Kuning', hex: '#FACC15' },
    { name: 'Hijau', hex: '#4ADE80' },
    { name: 'Biru Muda', hex: '#38BDF8' },
    { name: 'Biru Tua', hex: '#3B82F6' },
    { name: 'Ungu', hex: '#A855F7' },
    { name: 'Pink', hex: '#F472B6' },
    { name: 'Cokelat', hex: '#B45309' },
    { name: 'Putih', hex: '#FFFFFF' },
  ];

  const handleShapeClick = (shapeId: string) => {
    audio.playPop();
    setShapeColors((prev) => ({
      ...prev,
      [shapeId]: activeColor,
    }));
  };

  const handleSelectColor = (hex: string, name: string) => {
    audio.playPop();
    setActiveColor(hex);
    audio.speakIndonesian(`Warna ${name}`);
  };

  const handleFinish = () => {
    audio.playFanfare();
    audio.speakIndonesian('Luar biasa! Gambarmu penuh warna dan sangat indah!');
    onAnswerFeedback(true, 'Karya seni yang luar biasa indah!');
    onComplete(5, 5);
  };

  const handleReset = () => {
    audio.playPop();
    setShapeColors({});
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full">
      {/* Template chooser */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto max-w-full pb-1">
        {COLORING_TEMPLATES.map((tmpl, idx) => (
          <button
            key={tmpl.id}
            onClick={() => {
              audio.playPop();
              setSelectedTemplateIndex(idx);
              setShapeColors({});
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-black transition-colors whitespace-nowrap cursor-pointer ${
              selectedTemplateIndex === idx
                ? 'bg-sky-500 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tmpl.title.split(' ')[0]} {tmpl.id === 'ct_fish' ? '🐟' : tmpl.id === 'ct_house' ? '🏠' : '🌻'}
          </button>
        ))}
      </div>

      {/* Main Coloring SVG Canvas */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-md border-4 border-sky-200 text-center mb-4">
        <h2 className="text-xl font-black text-slate-800 mb-1">
          {template.title}
        </h2>
        <p className="text-xs font-bold text-slate-500 mb-4">
          Pilih warna cat di bawah, lalu sentuh bagian gambar untuk mewarnai!
        </p>

        <div className="flex justify-center">
          <svg
            viewBox="0 0 350 350"
            className="w-full max-w-[280px] sm:max-w-[320px] h-auto drop-shadow-sm border-2 border-slate-100 rounded-2xl bg-sky-50/30"
          >
            {template.shapes.map((s) => (
              <path
                key={s.id}
                d={s.path}
                fill={shapeColors[s.id] || s.defaultFill}
                stroke="#1E293B"
                strokeWidth="4"
                strokeLinejoin="round"
                strokeLinecap="round"
                className="cursor-pointer transition-colors duration-200 hover:opacity-85"
                onClick={() => handleShapeClick(s.id)}
              >
                <title>{s.label}</title>
              </path>
            ))}
          </svg>
        </div>
      </div>

      {/* Color Palette */}
      <div className="w-full bg-white rounded-3xl p-4 shadow-sm border-2 border-slate-200 mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-black text-slate-600 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-sky-500" />
            Pilih Kuas Cat Warna:
          </span>
          <div
            className="w-5 h-5 rounded-full border-2 border-slate-400 shadow-xs"
            style={{ backgroundColor: activeColor }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {palette.map((p) => (
            <button
              key={p.hex}
              onClick={() => handleSelectColor(p.hex, p.name)}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border-3 transition-transform cursor-pointer shadow-xs ${
                activeColor === p.hex
                  ? 'scale-115 ring-4 ring-sky-400 border-white'
                  : 'hover:scale-105 border-slate-300'
              }`}
              style={{ backgroundColor: p.hex }}
              title={p.name}
              aria-label={`Warna cat ${p.name}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-100 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Hapus Warna</span>
        </button>
        <button
          onClick={handleFinish}
          className="btn-chubby flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 border-3 border-emerald-700 text-white text-base font-black shadow-md cursor-pointer"
        >
          <Check className="w-5 h-5" />
          <span>Selesai Mewarnai!</span>
        </button>
      </div>
    </div>
  );
};
