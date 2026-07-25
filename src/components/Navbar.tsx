import React from 'react';
import { Triangle, BookOpen, Target, FileText, Bookmark, Printer, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onPrintLkpd: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onPrintLkpd }) => {
  const navItems = [
    { id: 'simulation', label: 'Simulasi Interaktif', icon: Triangle },
    { id: 'objectives', label: 'Tujuan & Materi', icon: Target },
    { id: 'proof', label: 'Pembuktian Geometris', icon: Sparkles },
    { id: 'lkpd', label: 'LKPD Digital', icon: FileText },
    { id: 'references', label: 'Referensi', icon: Bookmark },
  ];

  return (
    <header className="no-print sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('simulation')}>
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl shadow-lg shadow-indigo-500/20 text-white">
              <Triangle className="w-6 h-6 fill-indigo-100 stroke-indigo-100 transform -rotate-90" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  PythagorasLab <span className="text-indigo-400 font-medium text-sm sm:text-base">v1.0</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-md">
                  SMP / SMA
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden md:block">
                Virtual Learning Environment • Visualisasi, Pembuktian & Simulasi Interaktif
              </p>
            </div>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Button: Print LKPD */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onPrintLkpd}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:scale-105 active:scale-95"
              title="Cetak atau Unduh LKPD Siap Cetak (PDF)"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Cetak LKPD</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex overflow-x-auto py-2 border-t border-slate-800 space-x-1 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
