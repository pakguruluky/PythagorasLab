import React from 'react';
import { Triangle, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="no-print mt-16 bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
            <Triangle className="w-4 h-4 transform -rotate-90" />
          </div>
          <span className="font-bold text-slate-200">PythagorasLab</span>
          <span className="text-slate-500">•</span>
          <span>Aplikasi Simulasi Matematika Interaktif SMP/SMA</span>
        </div>

        {/* REQUIRED EXACT COPYRIGHT TEXT */}
        <div className="font-semibold text-slate-300 tracking-wide bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
          @Copyright by. Pak GuruAI
        </div>
      </div>
    </footer>
  );
};
