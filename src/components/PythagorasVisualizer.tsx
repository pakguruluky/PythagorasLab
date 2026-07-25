import React, { useMemo } from 'react';
import { TriangleData, ViewMode } from '../types';

interface PythagorasVisualizerProps {
  data: TriangleData;
  viewMode: ViewMode;
  showGridLines: boolean;
  showAngles: boolean;
}

export const PythagorasVisualizer: React.FC<PythagorasVisualizerProps> = ({
  data,
  viewMode,
  showGridLines,
  showAngles,
}) => {
  const { a, b, c, aSquared, bSquared, cSquared, isTriple, angleA, angleB } = data;

  // Calculate dynamic SVG canvas scaling and placement
  const svgConfig = useMemo(() => {
    // Max extents: max(a, b, c)
    const maxSide = Math.max(a, b, c, 5);
    // Base unit scale in pixels
    const scale = Math.min(320 / (maxSide * 2.2), 35);

    // Right angle origin point (C)
    const cx = 220;
    const cy = 250;

    // Triangle Vertices
    // C = Right angle corner (cx, cy)
    // A = Rightmost vertex along X-axis (cx + a * scale, cy)
    // B = Topmost vertex along Y-axis (cx, cy - b * scale)
    const ax = cx + a * scale;
    const ay = cy;

    const bx = cx;
    const by = cy - b * scale;

    // Square A (on side a, base): extends downward from C-A
    const sqA = [
      { x: cx, y: cy },
      { x: ax, y: ay },
      { x: ax, y: cy + a * scale },
      { x: cx, y: cy + a * scale },
    ];

    // Square B (on side b, height): extends leftward from C-B
    const sqB = [
      { x: cx, y: cy },
      { x: bx, y: by },
      { x: cx - b * scale, y: by },
      { x: cx - b * scale, y: cy },
    ];

    // Square C (on hypotenuse A-B): extends outward (top-right direction)
    // Vector A -> B is (bx - ax, by - ay) = (-a*scale, -b*scale)
    // Normal perpendicular vector outward is (b*scale, -a*scale)
    const sqC = [
      { x: ax, y: ay },
      { x: bx, y: by },
      { x: bx + b * scale, y: by - a * scale },
      { x: ax + b * scale, y: ay - a * scale },
    ];

    return { scale, cx, cy, ax, ay, bx, by, sqA, sqB, sqC };
  }, [a, b, c]);

  const { cx, cy, ax, ay, bx, by, sqA, sqB, sqC } = svgConfig;

  // Helper to format polygon points string
  const toPoints = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden select-none">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

      {/* SVG Container */}
      <svg
        viewBox="0 0 520 480"
        className="w-full h-[360px] sm:h-[420px] max-w-xl drop-shadow-2xl transition-all duration-300"
      >
        <defs>
          {/* Gradients for Squares */}
          <linearGradient id="gradSqA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="gradSqB" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="gradSqC" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.65" />
          </linearGradient>
        </defs>

        {/* --- SQUARE A (Alas) --- */}
        <polygon
          points={toPoints(sqA)}
          fill="url(#gradSqA)"
          stroke="#38bdf8"
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* --- SQUARE B (Tinggi) --- */}
        <polygon
          points={toPoints(sqB)}
          fill="url(#gradSqB)"
          stroke="#818cf8"
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* --- SQUARE C (Hipotenusa) --- */}
        <polygon
          points={toPoints(sqC)}
          fill="url(#gradSqC)"
          stroke="#34d399"
          strokeWidth="2.5"
          className="transition-all duration-300"
        />

        {/* --- GRID LINES INSIDE SQUARES (Unit Tiles) --- */}
        {showGridLines && (
          <g opacity="0.35" stroke="#ffffff" strokeWidth="0.75" strokeDasharray="2,2">
            {/* Square A Grid */}
            {Array.from({ length: Math.min(Math.floor(a), 15) }).map((_, i) => {
              const step = (ax - cx) / a;
              return (
                <React.Fragment key={`gridA-${i}`}>
                  <line x1={cx + (i + 1) * step} y1={cy} x2={cx + (i + 1) * step} y2={sqA[2].y} />
                  <line x1={cx} y1={cy + (i + 1) * step} x2={ax} y2={cy + (i + 1) * step} />
                </React.Fragment>
              );
            })}

            {/* Square B Grid */}
            {Array.from({ length: Math.min(Math.floor(b), 15) }).map((_, i) => {
              const step = (cy - by) / b;
              return (
                <React.Fragment key={`gridB-${i}`}>
                  <line x1={cx - (i + 1) * step} y1={by} x2={cx - (i + 1) * step} y2={cy} />
                  <line x1={cx} y1={cy - (i + 1) * step} x2={sqB[2].x} y2={cy - (i + 1) * step} />
                </React.Fragment>
              );
            })}
          </g>
        )}

        {/* --- MAIN RIGHT-TRIANGLE --- */}
        <polygon
          points={`${cx},${cy} ${ax},${ay} ${bx},${by}`}
          fill="#0f172a"
          fillOpacity="0.85"
          stroke="#f8fafc"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Right Angle Box Marker */}
        <path
          d={`M ${cx + 12} ${cy} L ${cx + 12} ${cy - 12} L ${cx} ${cy - 12}`}
          fill="none"
          stroke="#a5b4fc"
          strokeWidth="2"
        />

        {/* --- ANGLE ARCS --- */}
        {showAngles && (
          <g>
            {/* Angle A at vertex A */}
            <path
              d={`M ${ax - 18} ${ay} A 18 18 0 0 1 ${ax - 12} ${ay - 8}`}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
            />
            <text x={ax - 32} y={ay - 6} fill="#fbbf24" fontSize="10" fontWeight="bold">
              {angleA.toFixed(1)}°
            </text>

            {/* Angle B at vertex B */}
            <path
              d={`M ${bx} ${by + 18} A 18 18 0 0 1 ${bx + 10} ${by + 12}`}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
            />
            <text x={bx + 14} y={by + 24} fill="#fbbf24" fontSize="10" fontWeight="bold">
              {angleB.toFixed(1)}°
            </text>
          </g>
        )}

        {/* --- AREA LABELS INSIDE SQUARES --- */}
        {/* Square A Area Badge */}
        <g transform={`translate(${(cx + ax) / 2}, ${cy + (a * svgConfig.scale) / 2})`}>
          <rect x="-42" y="-16" width="84" height="32" rx="8" fill="#0c4a6e" stroke="#0284c7" strokeWidth="1.5" />
          <text x="0" y="-2" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
            Luas a²
          </text>
          <text x="0" y="10" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="extrabold" fontFamily="monospace">
            {aSquared.toFixed(1)}
          </text>
        </g>

        {/* Square B Area Badge */}
        <g transform={`translate(${cx - (b * svgConfig.scale) / 2}, ${(cy + by) / 2})`}>
          <rect x="-42" y="-16" width="84" height="32" rx="8" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
          <text x="0" y="-2" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="bold">
            Luas b²
          </text>
          <text x="0" y="10" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="extrabold" fontFamily="monospace">
            {bSquared.toFixed(1)}
          </text>
        </g>

        {/* Square C Area Badge */}
        <g transform={`translate(${(sqC[0].x + sqC[2].x) / 2}, ${(sqC[0].y + sqC[2].y) / 2})`}>
          <rect x="-50" y="-18" width="100" height="36" rx="8" fill="#064e3b" stroke="#059669" strokeWidth="2" />
          <text x="0" y="-3" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
            Luas c² = a²+b²
          </text>
          <text x="0" y="11" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="extrabold" fontFamily="monospace">
            {cSquared.toFixed(2)}
          </text>
        </g>

        {/* --- TRIANGLE SIDE LENGTH LABELS --- */}
        {/* Side a (bottom) */}
        <text x={(cx + ax) / 2} y={cy - 6} textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
          a = {a}
        </text>

        {/* Side b (left) */}
        <text x={cx + 8} y={(cy + by) / 2} textAnchor="start" fill="#818cf8" fontSize="12" fontWeight="bold">
          b = {b}
        </text>

        {/* Side c (hypotenuse) */}
        <text
          x={(ax + bx) / 2 - 12}
          y={(ay + by) / 2 - 10}
          textAnchor="end"
          fill="#34d399"
          fontSize="13"
          fontWeight="extrabold"
        >
          c = {c.toFixed(2)}
        </text>
      </svg>

      {/* Floating Status Indicator */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        <span className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-300 rounded-full text-xs font-mono">
          <span className="text-cyan-400 font-bold">{aSquared.toFixed(1)}</span> +{' '}
          <span className="text-indigo-400 font-bold">{bSquared.toFixed(1)}</span> ={' '}
          <span className="text-emerald-400 font-extrabold">{cSquared.toFixed(2)}</span>
        </span>
        {isTriple && (
          <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 rounded-full text-xs font-semibold flex items-center space-x-1">
            <span>✓</span>
            <span>Tripel Pythagoras Bulat!</span>
          </span>
        )}
      </div>
    </div>
  );
};
