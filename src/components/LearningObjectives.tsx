import React from 'react';
import { Target, CheckCircle2, ArrowRight, Lightbulb, Compass, Award } from 'lucide-react';

interface LearningObjectivesProps {
  onStartSimulation: () => void;
}

export const LearningObjectives: React.FC<LearningObjectivesProps> = ({ onStartSimulation }) => {
  const objectives = [
    {
      code: 'A',
      title: 'Pemahaman Konsep Geometris',
      description:
        'Memahami konsep dasar Teorema Pythagoras (a² + b² = c²) melalui pendekatan luas area geometri persegi yang dibangun pada setiap sisi segitiga siku-siku.',
      icon: Target,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Geometri Luas',
    },
    {
      code: 'B',
      title: 'Analisis Perubahan Sisi (Hipotenusa)',
      description:
        'Menganalisis perubahan nilai sisi miring (hipotenusa, c) saat panjang alas (a) dan tinggi (b) segitiga siku-siku diubah secara real-time.',
      icon: Compass,
      color: 'from-cyan-500 to-teal-600',
      badge: 'Simulasi Dinamis',
    },
    {
      code: 'C',
      title: 'Penyelesaian Masalah Visual & Matematis',
      description:
        'Menyelesaikan perhitungan panjang sisi segitiga siku-siku secara visual, intuitif, dan matematis serta mengidentifikasi kelompok Tripel Pythagoras.',
      icon: Award,
      color: 'from-emerald-500 to-green-600',
      badge: 'Pemecahan Masalah',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>Capaian Pembelajaran Kurikulum Merdeka</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tujuan Pembelajaran PythagorasLab
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Modul pembelajaran interaktif ini dirancang khusus untuk peserta didik SMP/SMA agar dapat mengeksplorasi, membuktikan, dan menerapkan Teorema Pythagoras secara konseptual dan bermakna.
          </p>
        </div>
      </div>

      {/* Objectives Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {objectives.map((obj) => {
          const Icon = obj.icon;
          return (
            <div
              key={obj.code}
              className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${obj.color} rounded-xl text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-slate-700/80 text-slate-300 rounded-md border border-slate-600/50">
                    Tujuan {obj.code}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {obj.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-2.5 leading-relaxed">
                  {obj.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-medium text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/40">
                  {obj.badge}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Guidance Box */}
      <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-200">Petunjuk Pembelajaran</h4>
            <p className="text-xs text-slate-400 mt-1">
              Gunakan penggeser (slider) nilai $a$ dan $b$ pada tab Simulasi Interaktif untuk mengamati bagaimana luas persegi $a^2$ dan $b^2$ selalu membentuk tepat luas persegi $c^2$.
            </p>
          </div>
        </div>
        <button
          onClick={onStartSimulation}
          className="shrink-0 flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all duration-200 hover:translate-x-1"
        >
          <span>Mulai Simulasi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
