import React, { useRef, useState, useEffect } from 'react';
import { audio } from '../../utils/audioManager';
import { Download, Eraser, Paintbrush, RotateCcw, Check, Sparkles } from 'lucide-react';

interface DrawingCanvasEngineProps {
  onComplete: (score: number, total: number) => void;
  onAnswerFeedback: (isCorrect: boolean, feedbackText: string) => void;
}

export const DrawingCanvasEngine: React.FC<DrawingCanvasEngineProps> = ({
  onComplete,
  onAnswerFeedback,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#2563EB'); // default blue
  const [brushSize, setBrushSize] = useState(8);
  const [isEraser, setIsEraser] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  const colors = [
    '#EF4444', // Merah
    '#F97316', // Oranye
    '#FACC15', // Kuning
    '#22C55E', // Hijau
    '#06B6D4', // Cyan
    '#2563EB', // Biru
    '#9333EA', // Ungu
    '#EC4899', // Pink
    '#78350F', // Cokelat
    '#0F172A', // Hitam
  ];

  const stickers = ['⭐', '🌈', '❤️', '🐱', '☀️', '🌸', '🚀'];

  // Initialize canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    audio.speakIndonesian('Ayo menggambar bebas! Goreskan kuas atau tempelkan stiker bintang!');
  }, []);

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);

    // If sticker mode is active, stamp sticker
    if (selectedSticker) {
      audio.playPop();
      ctx.font = '48px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedSticker, x, y);
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? '#FFFFFF' : color;
    ctx.lineWidth = brushSize;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || selectedSticker) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    audio.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleDownload = () => {
    audio.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `karya-gambar-revan-utomo-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    audio.speakIndonesian('Gambar tersimpan di perangkatmu!');
  };

  const handleFinish = () => {
    audio.playFanfare();
    audio.speakIndonesian('Hebat sekali! Lukisanmu sungguh menakjubkan dan kreatif!');
    onAnswerFeedback(true, 'Karya seni yang kreatif dan indah!');
    onComplete(5, 5);
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto w-full select-none">
      {/* Title */}
      <div className="w-full bg-white rounded-3xl p-4 shadow-md border-4 border-pink-200 text-center mb-3">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800">
          Papan Gambar & Lukis Bebas 🎨
        </h2>
        <p className="text-xs font-bold text-slate-500">
          Pilih warna cat atau stiker, lalu goreskan jarimu di atas kanvas!
        </p>
      </div>

      {/* Canvas */}
      <div className="w-full bg-white rounded-3xl p-2 sm:p-3 shadow-lg border-4 border-slate-200 relative overflow-hidden mb-3">
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
          className="w-full h-[280px] sm:h-[350px] bg-white rounded-2xl cursor-crosshair touch-none"
        />
      </div>

      {/* Toolbar: Color, Brush, Eraser, Stickers */}
      <div className="w-full bg-white rounded-3xl p-4 shadow-sm border-2 border-slate-200 space-y-3 mb-4">
        {/* Colors */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => {
                  audio.playPop();
                  setColor(c);
                  setIsEraser(false);
                  setSelectedSticker(null);
                }}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-transform cursor-pointer ${
                  !isEraser && !selectedSticker && color === c
                    ? 'scale-120 ring-4 ring-pink-400 border-white'
                    : 'border-slate-300 hover:scale-110'
                }`}
                style={{ backgroundColor: c }}
                aria-label={`Pilih warna ${c}`}
              />
            ))}
          </div>

          {/* Eraser */}
          <button
            onClick={() => {
              audio.playPop();
              setIsEraser(!isEraser);
              setSelectedSticker(null);
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-2xl border-2 text-xs font-bold cursor-pointer transition-colors ${
              isEraser
                ? 'bg-rose-500 border-rose-600 text-white'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Eraser className="w-4 h-4" />
            <span>Penghapus</span>
          </button>
        </div>

        {/* Brush sizes & Stickers */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Ukuran Kuas:</span>
            {[4, 10, 20].map((sz) => (
              <button
                key={sz}
                onClick={() => {
                  audio.playPop();
                  setBrushSize(sz);
                }}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center cursor-pointer transition-transform ${
                  brushSize === sz
                    ? 'border-pink-500 bg-pink-100 scale-110'
                    : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                }`}
                title={`Ukuran ${sz}px`}
              >
                <div
                  className="rounded-full bg-slate-800"
                  style={{ width: `${sz / 2 + 2}px`, height: `${sz / 2 + 2}px` }}
                />
              </button>
            ))}
          </div>

          {/* Stickers pool */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500">Stiker:</span>
            {stickers.map((stk) => (
              <button
                key={stk}
                onClick={() => {
                  audio.playPop();
                  setSelectedSticker(selectedSticker === stk ? null : stk);
                  setIsEraser(false);
                }}
                className={`text-xl p-1 rounded-xl transition-transform cursor-pointer ${
                  selectedSticker === stk
                    ? 'bg-amber-200 ring-2 ring-amber-400 scale-120'
                    : 'hover:scale-115'
                }`}
                title={`Tempel ${stk}`}
              >
                {stk}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <button
          onClick={handleClear}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white border-2 border-slate-300 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-100 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Bersihkan Kanvas</span>
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-sky-100 hover:bg-sky-200 border-2 border-sky-300 text-sky-800 text-xs sm:text-sm font-bold cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Simpan Gambar</span>
        </button>

        <button
          onClick={handleFinish}
          className="btn-chubby flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 border-3 border-emerald-700 text-white text-sm sm:text-base font-black shadow-md cursor-pointer"
        >
          <Check className="w-5 h-5" />
          <span>Selesai Melukis!</span>
        </button>
      </div>
    </div>
  );
};
