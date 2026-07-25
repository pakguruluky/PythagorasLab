import React, { useState, useMemo } from 'react';
import { TriangleData, ViewMode } from './types';
import { Navbar } from './components/Navbar';
import { LearningObjectives } from './components/LearningObjectives';
import { MaterialSection } from './components/MaterialSection';
import { PythagorasVisualizer } from './components/PythagorasVisualizer';
import { RealWorldVisualizer } from './components/RealWorldVisualizer';
import { ControlPanel } from './components/ControlPanel';
import { GeometricProofSection } from './components/GeometricProofSection';
import { LkpdSection } from './components/LkpdSection';
import { ReferencesSection } from './components/ReferencesSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('simulation');

  // Simulation Parameters State
  const [a, setA] = useState<number>(3);
  const [b, setB] = useState<number>(4);
  const [viewMode, setViewMode] = useState<ViewMode>('squares');
  const [showGridLines, setShowGridLines] = useState<boolean>(true);
  const [showAngles, setShowAngles] = useState<boolean>(true);

  // Real-time Calculated Math Data
  const triangleData: TriangleData = useMemo(() => {
    const aSq = a * a;
    const bSq = b * b;
    const cSq = aSq + bSq;
    const cVal = Math.sqrt(cSq);

    // Check if integer triple
    const isTriple = Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(Math.round(cVal * 1000) / 1000) && Math.abs(cVal - Math.round(cVal)) < 1e-6;

    // Angles in degrees
    const angleADeg = (Math.atan(b / a) * 180) / Math.PI;
    const angleBDeg = (Math.atan(a / b) * 180) / Math.PI;

    return {
      a,
      b,
      c: cVal,
      aSquared: aSq,
      bSquared: bSq,
      cSquared: cSq,
      isTriple,
      angleA: angleADeg,
      angleB: angleBDeg,
    };
  }, [a, b]);

  const handlePrintLkpd = () => {
    setActiveTab('lkpd');
    setTimeout(() => {
      window.print();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrintLkpd={handlePrintLkpd}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* TAB 1: SIMULASI INTERAKTIF */}
        {activeTab === 'simulation' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Visual Canvas Stage */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h2 className="text-lg font-bold text-white">Visualisasi Real-Time Geometri</h2>
                      <p className="text-xs text-slate-400">
                        {viewMode === 'squares'
                          ? 'Persegi a², b², dan c² yang dibangun pada masing-masing sisi segitiga'
                          : 'Skenario kontekstual penerapan Teorema Pythagoras dalam kehidupan nyata'}
                      </p>
                    </div>
                  </div>

                  {/* Main Visualizer Switch */}
                  {viewMode === 'squares' ? (
                    <PythagorasVisualizer
                      data={triangleData}
                      viewMode={viewMode}
                      showGridLines={showGridLines}
                      showAngles={showAngles}
                    />
                  ) : (
                    <RealWorldVisualizer data={triangleData} />
                  )}
                </div>
              </div>

              {/* Right Column: Interactive Controls & Real-time Calculations */}
              <div className="lg:col-span-5">
                <ControlPanel
                  data={triangleData}
                  a={a}
                  b={b}
                  setA={setA}
                  setB={setB}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  showGridLines={showGridLines}
                  setShowGridLines={setShowGridLines}
                  showAngles={showAngles}
                  setShowAngles={setShowAngles}
                />
              </div>
            </div>

            {/* Embedded Learning Objectives & In-Depth Material inside simulation tab */}
            <div className="pt-6 border-t border-slate-800 space-y-8">
              <LearningObjectives onStartSimulation={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
              <MaterialSection />
            </div>
          </div>
        )}

        {/* TAB 2: TUJUAN & MATERI PEMBELAJARAN */}
        {activeTab === 'objectives' && (
          <div className="space-y-8">
            <LearningObjectives onStartSimulation={() => setActiveTab('simulation')} />
            <MaterialSection />
          </div>
        )}

        {/* TAB 3: PEMBUKTIAN GEOMETRIS BHASKARA */}
        {activeTab === 'proof' && (
          <div className="space-y-8">
            <GeometricProofSection />
          </div>
        )}

        {/* TAB 4: LKPD DIGITAL & CETAK */}
        {activeTab === 'lkpd' && (
          <div className="space-y-8">
            <LkpdSection currentData={triangleData} onPrint={() => window.print()} />
          </div>
        )}

        {/* TAB 5: REFERENSI */}
        {activeTab === 'references' && (
          <div className="space-y-8">
            <ReferencesSection />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
