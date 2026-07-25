import React, { useState } from 'react';
import { Sparkles, RefreshCw, Info, HelpCircle } from 'lucide-react';

export const GeometricProofSection: React.FC = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [stepProgress, setStepProgress] = useState(0); // 0 = 2 Squares (a^2 & b^2), 100 = 1 Square (c^2)

  const c = Math.sqrt(a * a + b * b);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Pembuktian Klasik Bhaskara & Euclid</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Visualisasi Animasi Susunan 4 Segitiga</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Geser penggeser transformasi di bawah ini untuk melihat bagaimana 4 segitiga siku-siku bertransformasi dari membentuk luas (a² + b²) menjadi tepat luas (c²).
            </p>
          </div>

          <button
            onClick={() => setStepProgress(stepProgress === 100 ? 0 : 100)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{stepProgress === 100 ? 'Kembalikan (a² + b²)' : 'Animasikan ke c²'}</span>
          </button>
        </div>

        {/* Interactive Step Slider */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-xs font-mono text-slate-300">
            <span className={stepProgress < 50 ? 'text-indigo-400 font-bold' : 'text-slate-500'}>
              Posisi Awal: Area Terpisah Luas(a²) + Luas(b²)
            </span>
            <span className={stepProgress >= 50 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
              Posisi Akhir: Area Gabungan Luas(c²)
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={stepProgress}
            onChange={(e) => setStepProgress(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>

      {/* SVG Animation Proof Diagram */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative">
        <svg viewBox="0 0 400 400" className="w-full max-w-md h-[340px] drop-shadow-2xl">
          <defs>
            <linearGradient id="proofTriGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Outer Boundary Square (Side a + b = 3 + 4 = 7 units => 320px) */}
          <rect x="40" y="40" width="320" height="320" fill="#0f172a" stroke="#475569" strokeWidth="3" rx="8" />

          {/* Scale factor for 320px = (a+b) */}
          {/* Interpolated triangle positions based on stepProgress */}
          {(() => {
            const total = a + b;
            const unit = 320 / total;
            const sa = a * unit;
            const sb = b * unit;
            const p = stepProgress / 100;

            // In state 0: 4 triangles arranged at corners
            // Tri 1: Top-Left (40,40)
            // Tri 2: Top-Right (40 + 320, 40)
            // etc.
            return (
              <g>
                {/* Center Area fill indicator */}
                {stepProgress > 50 ? (
                  <polygon
                    points={`
                      ${40 + sa},40 
                      ${360},${40 + sa} 
                      ${360 - sa},360 
                      40,${360 - sa}
                    `}
                    fill="#10b981"
                    fillOpacity="0.35"
                    stroke="#34d399"
                    strokeWidth="2.5"
                  />
                ) : (
                  <>
                    <rect x="40" y="40" width={sa} height={sa} fill="#06b6d4" fillOpacity="0.35" stroke="#38bdf8" strokeWidth="2" />
                    <rect x={40 + sa} y={40 + sa} width={sb} height={sb} fill="#818cf8" fillOpacity="0.35" stroke="#818cf8" strokeWidth="2" />
                  </>
                )}

                {/* 4 Triangles moving seamlessly */}
                {/* Triangle 1 */}
                <polygon
                  points={`
                    ${40},${40} 
                    ${40 + sa * (1 - p)},${40 + sb * p} 
                    ${40 + sa},${40}
                  `}
                  fill="url(#proofTriGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />

                {/* Triangle 2 */}
                <polygon
                  points={`
                    ${360},${40} 
                    ${360 - sb * p},${40 + sa * (1 - p)} 
                    ${360},${40 + sa}
                  `}
                  fill="url(#proofTriGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />

                {/* Triangle 3 */}
                <polygon
                  points={`
                    ${360},${360} 
                    ${360 - sa * (1 - p)},${360 - sb * p} 
                    ${360 - sa},${360}
                  `}
                  fill="url(#proofTriGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />

                {/* Triangle 4 */}
                <polygon
                  points={`
                    ${40},${360} 
                    ${40 + sb * p},${360 - sa * (1 - p)} 
                    ${40},${360 - sa}
                  `}
                  fill="url(#proofTriGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </g>
            );
          })()}
        </svg>

        {/* Dynamic Proof Description */}
        <div className="mt-4 p-4 bg-slate-900 border border-slate-800 rounded-xl text-center text-xs text-slate-300 max-w-lg">
          {stepProgress < 50 ? (
            <span>
              <strong className="text-cyan-400">Posisi Awal:</strong> 4 segitiga biru disusun di tepi sedemikian rupa sehingga menyisakan dua area kosong berbentuk persegi <strong className="text-cyan-300">a² ({a * a})</strong> dan <strong className="text-indigo-300">b² ({b * b})</strong>.
            </span>
          ) : (
            <span>
              <strong className="text-emerald-400">Posisi Akhir (Bhaskara):</strong> Tanpa mengubah total luas persegi besar, 4 segitiga biru digeser ke sudut-sudutnya. Area kosong yang tersisa kini bersatu membentuk satu persegi miring <strong className="text-emerald-300">c² ({c * c})</strong>!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
