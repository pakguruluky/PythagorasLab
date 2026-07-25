import React from 'react';
import { REFERENCE_SOURCES } from '../data/materialData';
import { Bookmark, ExternalLink, BookCheck, ShieldCheck } from 'lucide-react';

export const ReferencesSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Pustaka & Standar Kurikulum</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Daftar Referensi & Sumber Belajar</h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Rujukan materi, kurikulum, dan sejarah matematika yang digunakan dalam penyusunan aplikasi PythagorasLab.
          </p>
        </div>
      </div>

      {/* Reference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {REFERENCE_SOURCES.map((ref, idx) => (
          <div
            key={idx}
            className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-indigo-500/50 transition-all shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="px-2.5 py-1 bg-indigo-950 text-indigo-300 rounded text-xs font-mono border border-indigo-800">
                Rujukan #{idx + 1}
              </span>
              <span className="text-xs font-mono text-slate-400">{ref.year}</span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
              {ref.title}
            </h3>

            <p className="text-xs text-indigo-400 font-medium">
              Penulis / Institusi: {ref.author}
            </p>

            <div className="p-3 bg-slate-950 rounded-lg text-xs text-slate-300 border border-slate-800/80 leading-relaxed">
              <strong className="text-slate-400">Cakupan Pembahasan:</strong> {ref.notes}
            </div>
          </div>
        ))}
      </div>

      {/* Accreditation Note */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center space-x-3 text-xs text-slate-400">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>
          Materi dan simulasi interaktif pada PythagorasLab diselaraskan dengan Capaian Pembelajaran (CP) Kurikulum Merdeka Matematika Fase D (SMP Kelas 7-9) dan Fase E (SMA Kelas 10).
        </span>
      </div>
    </div>
  );
};
