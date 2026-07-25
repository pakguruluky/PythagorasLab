import React, { useState } from 'react';
import { BookOpen, CheckCircle, Calculator, Sparkles, Building2, MapPin, Scale, HelpCircle } from 'lucide-react';

export const MaterialSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'basics' | 'proof' | 'applications' | 'triples'>('basics');

  return (
    <div className="space-y-6">
      {/* Sub-navigation for Materials */}
      <div className="flex overflow-x-auto space-x-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/80 no-scrollbar">
        {[
          { id: 'basics', label: '1. Pengertian Segitiga Siku-Siku', icon: BookOpen },
          { id: 'proof', label: '2. Pembuktian Luas Persegi', icon: Sparkles },
          { id: 'applications', label: '3. Penerapan Sehari-Hari', icon: Building2 },
          { id: 'triples', label: '4. Tripel Pythagoras', icon: Calculator },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content 1: Basics */}
      {activeSubTab === 'basics' && (
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-700 pb-4">
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Konsep Dasar Segitiga Siku-Siku & Hipotenusa</h3>
              <p className="text-xs text-slate-400">Fondasi matematika geometri Euclid</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                <strong>Segitiga siku-siku</strong> adalah jenis segitiga yang salah satu sudut dalamnya memiliki besar <span className="text-indigo-400 font-bold">90° (sudut siku-siku)</span>.
              </p>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 space-y-2">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Komponen Utama:</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                  <li><strong className="text-cyan-400">Sisi Alas (a):</strong> Sisi mendatar yang mengapit sudut siku-siku.</li>
                  <li><strong className="text-blue-400">Sisi Tegak / Tinggi (b):</strong> Sisi vertikal yang tegak lurus terhadap alas.</li>
                  <li><strong className="text-emerald-400">Sisi Miring / Hipotenusa (c):</strong> Sisi terpanjang yang terletak tepat berhadapan dengan sudut siku-siku (90°).</li>
                </ul>
              </div>
              <p className="text-xs text-slate-400 italic">
                Catatan: Sisi miring (hipotenusa) selalu merupakan sisi terpanjang dalam segitiga siku-siku karena berhadapan dengan sudut terbesar (90°).
              </p>
            </div>

            {/* Visual SVG Diagram */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-700/80 flex flex-col items-center justify-center">
              <svg viewBox="0 0 240 180" className="w-full max-w-xs drop-shadow-lg">
                {/* Right angle indicator */}
                <path d="M 50 130 L 70 130 L 70 150" fill="none" stroke="#818cf8" strokeWidth="2" />
                {/* Triangle */}
                <polygon points="50,150 190,150 50,30" fill="rgba(99, 102, 241, 0.15)" stroke="#6366f1" strokeWidth="3" />
                
                {/* Labels */}
                <text x="120" y="170" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                  Sisi Alas (a)
                </text>
                <text x="30" y="90" fill="#60a5fa" fontSize="13" fontWeight="bold" textAnchor="middle">
                  Tinggi (b)
                </text>
                <text x="135" y="80" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                  Hipotenusa (c)
                </text>
                <text x="60" y="145" fill="#a5b4fc" fontSize="10" fontWeight="bold">
                  90°
                </text>
              </svg>
              <div className="mt-3 text-center text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-indigo-300">
                Formula Utama: a² + b² = c²
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content 2: Proof */}
      {activeSubTab === 'proof' && (
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-700 pb-4">
            <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Pembuktian Geometris Luas Area Persegi</h3>
              <p className="text-xs text-slate-400">Mengapa Luas(a²) + Luas(b²) = Luas(c²)?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                Teorema Pythagoras menyatakan bahwa pada setiap segitiga siku-siku, <strong className="text-cyan-300">luas persegi yang dibangun pada sisi miring (c)</strong> adalah sama persis dengan <strong className="text-indigo-300">jumlah luas persegi yang dibangun pada sisi alas (a)</strong> dan <strong className="text-blue-300">sisi tegak (b)</strong>.
              </p>
              
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700/80 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Persamaan Luas Area:</h4>
                <div className="p-3 bg-slate-950 rounded-lg text-center font-mono text-base font-bold text-emerald-300 border border-emerald-900/40">
                  Luas Persegi A + Luas Persegi B = Luas Persegi C
                </div>
                <div className="p-2 text-center font-mono text-sm text-slate-300">
                  (a × a) + (b × b) = (c × c)  ➜  <span className="text-amber-300 font-bold">a² + b² = c²</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                <strong>Metode Pembuktian Bhaskara:</strong> Jika kita menyusun 4 segitiga siku-siku berukuran (a, b, c) di dalam sebuah persegi besar berukuran (a+b)×(a+b), area kosong yang tersisa dapat ditransformasikan langsung dari bentuk dua persegi (a² dan b²) menjadi tepat satu persegi c².
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-700 flex flex-col items-center justify-center space-y-4">
              <div className="w-full text-center text-xs font-bold text-slate-300">
                Ilustrasi 3 Persegi Geometris
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 w-full text-center space-y-2">
                <div className="text-xs text-slate-400">Contoh Angka Standar (3, 4, 5):</div>
                <div className="flex items-center justify-center space-x-2 text-sm font-mono font-bold">
                  <span className="px-2.5 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded">a² = 3² = 9</span>
                  <span className="text-slate-400">+</span>
                  <span className="px-2.5 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded">b² = 4² = 16</span>
                  <span className="text-slate-400">=</span>
                  <span className="px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">c² = 25</span>
                </div>
                <div className="text-xs text-emerald-400 mt-2 font-semibold">
                  Maka c = √25 = 5 unit panjang!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content 3: Applications */}
      {activeSubTab === 'applications' && (
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-700 pb-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Penerapan Teorema Pythagoras dalam Kehidupan Nyata</h3>
              <p className="text-xs text-slate-400">Teknik sipil, navigasi, arsitektur, dan teknologi digital</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700 space-y-3">
              <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-lg w-fit">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">1. Konstruksi & Tukang Bangunan</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tukang bangunan menggunakan prinsip 3-4-5 untuk memastikan sudut dinding tepat tegak lurus (90°). Teknik ini dinamakan metode "Tali Siku".
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700 space-y-3">
              <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-lg w-fit">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">2. Navigasi GPS & Peta Digital</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Aplikasi seperti Google Maps menggunakan rumus Pythagoras pada sistem koordinat Cartesian (X, Y) untuk menghitung jarak terdekat antar lokasi.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700 space-y-3">
              <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-lg w-fit">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">3. Keselamatan Tangga Kerja</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Menghitung panjang tangga yang dibutuhkan untuk mencapai ketinggian gedung dengan aman tanpa bahaya tangga tergelincir.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content 4: Pythagorean Triples */}
      {activeSubTab === 'triples' && (
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-700 pb-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Tabel Tripel Pythagoras Populer</h3>
              <p className="text-xs text-slate-400">Tiga bilangan bulat positif (a, b, c) yang memenuhi a² + b² = c²</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-900 text-slate-200 uppercase font-mono text-xs border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">Jenis Tripel</th>
                  <th className="py-3 px-4">Alas (a)</th>
                  <th className="py-3 px-4">Tinggi (b)</th>
                  <th className="py-3 px-4">Hipotenusa (c)</th>
                  <th className="py-3 px-4">Pemeriksaan Rumus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-700/40">
                  <td className="py-3 px-4 font-bold text-indigo-400">Tipe I (3, 4, 5)</td>
                  <td className="py-3 px-4 font-mono">3</td>
                  <td className="py-3 px-4 font-mono">4</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">5</td>
                  <td className="py-3 px-4 font-mono text-slate-400">3² + 4² = 9 + 16 = 25 = 5²</td>
                </tr>
                <tr className="hover:bg-slate-700/40">
                  <td className="py-3 px-4 font-bold text-indigo-400">Tipe II (5, 12, 13)</td>
                  <td className="py-3 px-4 font-mono">5</td>
                  <td className="py-3 px-4 font-mono">12</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">13</td>
                  <td className="py-3 px-4 font-mono text-slate-400">5² + 12² = 25 + 144 = 169 = 13²</td>
                </tr>
                <tr className="hover:bg-slate-700/40">
                  <td className="py-3 px-4 font-bold text-indigo-400">Tipe III (8, 15, 17)</td>
                  <td className="py-3 px-4 font-mono">8</td>
                  <td className="py-3 px-4 font-mono">15</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">17</td>
                  <td className="py-3 px-4 font-mono text-slate-400">8² + 15² = 64 + 225 = 289 = 17²</td>
                </tr>
                <tr className="hover:bg-slate-700/40">
                  <td className="py-3 px-4 font-bold text-indigo-400">Tipe IV (7, 24, 25)</td>
                  <td className="py-3 px-4 font-mono">7</td>
                  <td className="py-3 px-4 font-mono">24</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">25</td>
                  <td className="py-3 px-4 font-mono text-slate-400">7² + 24² = 49 + 576 = 625 = 25²</td>
                </tr>
                <tr className="hover:bg-slate-700/40">
                  <td className="py-3 px-4 font-bold text-cyan-400">Kelipatan 2× (6, 8, 10)</td>
                  <td className="py-3 px-4 font-mono">6</td>
                  <td className="py-3 px-4 font-mono">8</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">10</td>
                  <td className="py-3 px-4 font-mono text-slate-400">6² + 8² = 36 + 64 = 100 = 10²</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
