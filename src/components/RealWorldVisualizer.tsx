import React, { useState } from 'react';
import { RealWorldScenario, TriangleData } from '../types';
import { Building, ShieldAlert, Navigation, ArrowUpRight } from 'lucide-react';

interface RealWorldVisualizerProps {
  data: TriangleData;
}

export const RealWorldVisualizer: React.FC<RealWorldVisualizerProps> = ({ data }) => {
  const [scenario, setScenario] = useState<RealWorldScenario>('ladder');
  const { a, b, c } = data;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
      {/* Scenario Tabs */}
      <div className="flex space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
        {[
          { id: 'ladder', label: '1. Tangga Menyandar Dinding', icon: Building },
          { id: 'flagpole', label: '2. Tiang & Tali Pancang', icon: ShieldAlert },
          { id: 'ship', label: '3. Navigasi Kapal Peta GPS', icon: Navigation },
        ].map((s) => {
          const Icon = s.icon;
          const isActive = scenario === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setScenario(s.id as RealWorldScenario)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* SVG Canvas for Real World Scenarios */}
      <div className="relative w-full h-[320px] bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute bottom-0 w-full h-12 bg-slate-800/60 border-t border-slate-700" />

        {scenario === 'ladder' && (
          <svg viewBox="0 0 400 260" className="w-full h-full">
            {/* Ground */}
            <line x1="20" y1="220" x2="380" y2="220" stroke="#475569" strokeWidth="4" />

            {/* Brick Wall (Tinggi b) */}
            <rect x="80" y="40" width="30" height="180" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <text x="70" y="130" textAnchor="end" fill="#818cf8" fontSize="12" fontWeight="bold">
              Tinggi Dinding b = {b} m
            </text>

            {/* Ground Distance (Alas a) */}
            <line x1="110" y1="220" x2="280" y2="220" stroke="#38bdf8" strokeWidth="3.5" />
            <text x="195" y="242" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
              Jarak Alas a = {a} m
            </text>

            {/* Ladder (Hipotenusa c) */}
            <line x1="280" y1="220" x2="110" y2="60" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
            {/* Ladder Rungs */}
            {Array.from({ length: 6 }).map((_, i) => {
              const t = (i + 1) / 7;
              const rx1 = 280 + t * (110 - 280);
              const ry1 = 220 + t * (60 - 220);
              return (
                <circle key={i} cx={rx1} cy={ry1} r="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              );
            })}
            <text x="210" y="125" fill="#f59e0b" fontSize="13" fontWeight="extrabold">
              Panjang Tangga c = {c.toFixed(2)} m
            </text>
          </svg>
        )}

        {scenario === 'flagpole' && (
          <svg viewBox="0 0 400 260" className="w-full h-full">
            {/* Ground */}
            <line x1="20" y1="220" x2="380" y2="220" stroke="#475569" strokeWidth="4" />

            {/* Flagpole (Tinggi b) */}
            <line x1="120" y1="220" x2="120" y2="50" stroke="#94a3b8" strokeWidth="5" />
            {/* Flag */}
            <polygon points="120,50 160,65 120,80" fill="#ef4444" />
            <text x="110" y="130" textAnchor="end" fill="#818cf8" fontSize="12" fontWeight="bold">
              Tinggi Tiang b = {b} m
            </text>

            {/* Stay Wire (Hipotenusa c) */}
            <line x1="120" y1="50" x2="300" y2="220" stroke="#34d399" strokeWidth="3.5" strokeDasharray="4,4" />
            <text x="220" y="120" fill="#34d399" fontSize="12" fontWeight="extrabold">
              Panjang Tali Pancang c = {c.toFixed(2)} m
            </text>

            {/* Ground anchor distance */}
            <line x1="120" y1="220" x2="300" y2="220" stroke="#38bdf8" strokeWidth="3" />
            <text x="210" y="242" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
              Jarak Patok a = {a} m
            </text>
          </svg>
        )}

        {scenario === 'ship' && (
          <svg viewBox="0 0 400 260" className="w-full h-full">
            {/* Compass rose */}
            <g transform="translate(340, 50)" opacity="0.6">
              <circle cx="0" cy="0" r="22" fill="none" stroke="#64748b" strokeWidth="1.5" />
              <text x="0" y="-8" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">U</text>
              <text x="14" y="4" textAnchor="start" fill="#94a3b8" fontSize="8">T</text>
              <text x="-14" y="4" textAnchor="end" fill="#94a3b8" fontSize="8">B</text>
              <text x="0" y="16" textAnchor="middle" fill="#94a3b8" fontSize="8">S</text>
            </g>

            {/* Port / Origin */}
            <circle cx="80" cy="200" r="6" fill="#ef4444" />
            <text x="70" y="220" textAnchor="end" fill="#f8fafc" fontSize="11" fontWeight="bold">Pelabuhan Awal</text>

            {/* East leg (a) */}
            <line x1="80" y1="200" x2="240" y2="200" stroke="#38bdf8" strokeWidth="3.5" />
            <text x="160" y="220" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
              Timur a = {a} km
            </text>

            {/* North leg (b) */}
            <line x1="240" y1="200" x2="240" y2="70" stroke="#818cf8" strokeWidth="3.5" />
            <text x="252" y="135" textAnchor="start" fill="#818cf8" fontSize="12" fontWeight="bold">
              Utara b = {b} km
            </text>

            {/* Direct distance (c) */}
            <line x1="80" y1="200" x2="240" y2="70" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
            <text x="140" y="125" fill="#34d399" fontSize="12" fontWeight="extrabold">
              Jarak Terdekat c = {c.toFixed(2)} km
            </text>

            {/* Ship icon at end position */}
            <circle cx="240" cy="70" r="7" fill="#34d399" stroke="#ffffff" strokeWidth="2" />
          </svg>
        )}
      </div>

      {/* Scenario Context Card */}
      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ArrowUpRight className="w-4 h-4 text-amber-400" />
          <span>
            {scenario === 'ladder' && `Tinggi dinding yang mampu dicapai tangga adalah ${b} meter.`}
            {scenario === 'flagpole' && `Panjang tali kawat yang dibutuhkan dari tanah ke ujung tiang adalah ${c.toFixed(2)} meter.`}
            {scenario === 'ship' && `Kapal berada pada jarak lurus ${c.toFixed(2)} km dari titik asal pelabuhan.`}
          </span>
        </div>
      </div>
    </div>
  );
};
