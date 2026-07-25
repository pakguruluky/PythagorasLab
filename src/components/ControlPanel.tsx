import React from 'react';
import { TriangleData, ViewMode } from '../types';
import { PRESET_TRIPLES } from '../data/materialData';
import { Sliders, Calculator, Eye, Grid, CornerDownRight, CheckCircle, Info } from 'lucide-react';

interface ControlPanelProps {
  data: TriangleData;
  a: number;
  b: number;
  setA: (val: number) => void;
  setB: (val: number) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  showGridLines: boolean;
  setShowGridLines: (val: boolean) => void;
  showAngles: boolean;
  setShowAngles: (val: boolean) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  data,
  a,
  b,
  setA,
  setB,
  viewMode,
  setViewMode,
  showGridLines,
  setShowGridLines,
  showAngles,
  setShowAngles,
}) => {
  const { c, aSquared, bSquared, cSquared, isTriple, angleA, angleB } = data;

  const handleSelectPreset = (presetName: string) => {
    const found = PRESET_TRIPLES.find((p) => p.name === presetName);
    if (found) {
      setA(found.a);
      setB(found.b);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Panel Kontrol Simulasi</h3>
            <p className="text-xs text-slate-400">Atur nilai alas (a) dan tinggi (b)</p>
          </div>
        </div>
      </div>

      {/* Preset Triples Dropdown */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Preset Tripel Pythagoras:</span>
          <span className="text-[10px] text-indigo-400 font-mono">Standar SMP/SMA</span>
        </label>
        <select
          onChange={(e) => handleSelectPreset(e.target.value)}
          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        >
          <option value="">-- Pilih Tripel Pythagoras Populer --</option>
          {PRESET_TRIPLES.map((preset) => (
            <option key={preset.name} value={preset.name}>
              {preset.name} ({preset.description})
            </option>
          ))}
        </select>
      </div>

      {/* Side A Slider (Alas) */}
      <div className="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-cyan-400 flex items-center space-x-1">
            <span>Sisi Alas (a):</span>
          </span>
          <div className="flex items-center space-x-1">
            <input
              type="number"
              min="1"
              max="20"
              step="0.5"
              value={a}
              onChange={(e) => setA(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
              className="w-16 bg-slate-900 border border-cyan-700/80 rounded-lg px-2 py-1 text-right text-xs font-mono font-bold text-cyan-300 focus:outline-none"
            />
            <span className="text-slate-400">unit</span>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          step="0.5"
          value={a}
          onChange={(e) => setA(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>1</span>
          <span>10</span>
          <span>20</span>
        </div>
      </div>

      {/* Side B Slider (Tinggi) */}
      <div className="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-indigo-400 flex items-center space-x-1">
            <span>Sisi Tinggi (b):</span>
          </span>
          <div className="flex items-center space-x-1">
            <input
              type="number"
              min="1"
              max="20"
              step="0.5"
              value={b}
              onChange={(e) => setB(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
              className="w-16 bg-slate-900 border border-indigo-700/80 rounded-lg px-2 py-1 text-right text-xs font-mono font-bold text-indigo-300 focus:outline-none"
            />
            <span className="text-slate-400">unit</span>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          step="0.5"
          value={b}
          onChange={(e) => setB(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>1</span>
          <span>10</span>
          <span>20</span>
        </div>
      </div>

      {/* View Mode & Toggles */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Tampilan Visualisasi:</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setViewMode('squares')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
              viewMode === 'squares'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Persegi Geometri</span>
          </button>

          <button
            onClick={() => setViewMode('realworld')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
              viewMode === 'realworld'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <CornerDownRight className="w-3.5 h-3.5" />
            <span>Skenario Nyata</span>
          </button>
        </div>

        {/* Checkbox Toggles */}
        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showGridLines}
              onChange={(e) => setShowGridLines(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Garis Grid Ubin Unit</span>
          </label>

          <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showAngles}
              onChange={(e) => setShowAngles(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Tampilkan Sudut (α, β)</span>
          </label>
        </div>
      </div>

      {/* Real-time Mathematical Calculation Steps */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
            <Calculator className="w-4 h-4" />
            <span>Langkah Perhitungan Matematis:</span>
          </div>
          <span className="text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
            c = √(a² + b²)
          </span>
        </div>

        <div className="space-y-1.5 font-mono text-xs text-slate-300">
          <div className="flex justify-between">
            <span className="text-cyan-400">a² = {a} × {a}</span>
            <span className="font-bold text-white">= {aSquared.toFixed(1)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-indigo-400">b² = {b} × {b}</span>
            <span className="font-bold text-white">= {bSquared.toFixed(1)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-800 pt-1">
            <span className="text-slate-400">a² + b²</span>
            <span className="font-bold text-amber-300">= {aSquared.toFixed(1)} + {bSquared.toFixed(1)} = {cSquared.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-800 pt-1 text-sm font-bold">
            <span className="text-emerald-400">c = √({cSquared.toFixed(2)})</span>
            <span className="text-emerald-300 font-mono text-base">= {c.toFixed(2)} unit</span>
          </div>
        </div>
      </div>

      {/* Instant Pedagogical Feedback */}
      <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
        isTriple
          ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-200'
          : 'bg-indigo-950/60 border-indigo-800/80 text-indigo-200'
      }`}>
        <div className="flex items-center space-x-2 font-bold text-sm">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>
            {isTriple
              ? `Hore! Pasangan (${a}, ${b}, ${c}) adalah Tripel Pythagoras!`
              : `Hasil Hipotenusa c = ${c.toFixed(2)} (Bukan Bilangan Bulat)`}
          </span>
        </div>
        <p className="text-[11px] opacity-90">
          {isTriple
            ? `Karena nilai a² (${aSquared}) + b² (${bSquared}) menghasilkan tepat kuadrat dari bilangan bulat ${c}² (${cSquared}).`
            : `Meskipun hipotenusa berbentuk bilangan desimal, Teorema Pythagoras tetap berlaku sempurna: ${aSquared} + ${bSquared} = ${cSquared.toFixed(2)}.`}
        </p>
      </div>
    </div>
  );
};
