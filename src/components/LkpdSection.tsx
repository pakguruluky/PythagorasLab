import React, { useState } from 'react';
import { StudentIdentity, LkpdTrial, TriangleData } from '../types';
import { INITIAL_LKPD_QUESTIONS } from '../data/materialData';
import { FileText, Printer, CheckCircle, AlertCircle, Save, UserCheck, Award, HelpCircle } from 'lucide-react';

interface LkpdSectionProps {
  currentData: TriangleData;
  onPrint: () => void;
}

export const LkpdSection: React.FC<LkpdSectionProps> = ({ currentData, onPrint }) => {
  // Student identity state
  const [identity, setIdentity] = useState<StudentIdentity>({
    nama: '',
    kelas: '',
    noAbsen: '',
    sekolah: '',
    tanggal: new Date().toISOString().split('T')[0],
  });

  // Table of experiment trials
  const [trials, setTrials] = useState<LkpdTrial[]>([
    { id: 1, a: 3, b: 4, userASquared: '9', userBSquared: '16', userCSquared: '25', userC: '5', isCorrect: true },
    { id: 2, a: 6, b: 8, userASquared: '', userBSquared: '', userCSquared: '', userC: '' },
    { id: 3, a: 5, b: 12, userASquared: '', userBSquared: '', userCSquared: '', userC: '' },
    { id: 4, a: currentData.a, b: currentData.b, userASquared: '', userBSquared: '', userCSquared: '', userC: '' },
  ]);

  // Questions state
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});

  const handleIdentityChange = (field: keyof StudentIdentity, value: string) => {
    setIdentity((prev) => ({ ...prev, [field]: value }));
  };

  const handleTrialChange = (id: number, field: keyof LkpdTrial, value: string) => {
    setTrials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const handleSyncCurrentSim = (id: number) => {
    setTrials((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              a: currentData.a,
              b: currentData.b,
              userASquared: currentData.aSquared.toFixed(0),
              userBSquared: currentData.bSquared.toFixed(0),
              userCSquared: currentData.cSquared.toFixed(0),
              userC: currentData.c.toFixed(2),
            }
          : t
      )
    );
  };

  const handleAnswerSelect = (qId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const toggleFeedback = (qId: string) => {
    setShowFeedback((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Calculate student score
  const calculateScore = () => {
    let score = 0;
    const totalQuestions = INITIAL_LKPD_QUESTIONS.filter((q) => q.type !== 'essay').length;
    INITIAL_LKPD_QUESTIONS.forEach((q) => {
      if (q.type !== 'essay' && answers[q.id] === q.correctAnswer) {
        score += 100 / totalQuestions;
      }
    });
    return Math.round(score);
  };

  return (
    <div className="space-y-8">
      {/* On-Screen LKPD View */}
      <div className="no-print space-y-6">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-700/80 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Lembar Kerja Peserta Didik (LKPD) Digital</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">LKPD Interaktif & Siap Cetak</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Isi identitas diri Anda, lakukan eksperimen pengamatan pada simulator, dan jawab pertanyaan analisis di bawah ini. Hasil pekerjaan dapat dicetak langsung ke format PDF atau kertas!
            </p>
          </div>

          <button
            onClick={onPrint}
            className="flex items-center space-x-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Unduh / Cetak LKPD (PDF)</span>
          </button>
        </div>

        {/* Form Identitas Peserta Didik */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm border-b border-slate-800 pb-3">
            <UserCheck className="w-4 h-4" />
            <span>Identitas Peserta Didik</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Nama Lengkap Murid:</label>
              <input
                type="text"
                placeholder="Contoh: Ahmad Rizky Pradana"
                value={identity.nama}
                onChange={(e) => handleIdentityChange('nama', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Kelas / Rombel:</label>
              <input
                type="text"
                placeholder="Contoh: VIII-A / X-IPA 1"
                value={identity.kelas}
                onChange={(e) => handleIdentityChange('kelas', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Nomor Absen:</label>
              <input
                type="text"
                placeholder="Contoh: 04"
                value={identity.noAbsen}
                onChange={(e) => handleIdentityChange('noAbsen', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Nama Sekolah / Madrasah:</label>
              <input
                type="text"
                placeholder="Contoh: SMP Negeri 1 Nusantara"
                value={identity.sekolah}
                onChange={(e) => handleIdentityChange('sekolah', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Tanggal Pelaksanaan:</label>
              <input
                type="date"
                value={identity.tanggal}
                onChange={(e) => handleIdentityChange('tanggal', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Section A: Experiment Logger Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">A. Tabel Pengamatan Eksperimen Luas Area</h3>
              <p className="text-xs text-slate-400">Catat hasil percobaan nilai (a) dan (b) dari simulasi interaktif</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-200 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">Percobaan</th>
                  <th className="py-3 px-3">Alas (a)</th>
                  <th className="py-3 px-3">Tinggi (b)</th>
                  <th className="py-3 px-3">Luas a²</th>
                  <th className="py-3 px-3">Luas b²</th>
                  <th className="py-3 px-3">Luas c² (a²+b²)</th>
                  <th className="py-3 px-3">Hipotenusa (c)</th>
                  <th className="py-3 px-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {trials.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/50">
                    <td className="py-3 px-3 font-bold text-slate-400"># {t.id}</td>
                    <td className="py-3 px-3 text-cyan-400 font-bold">{t.a}</td>
                    <td className="py-3 px-3 text-indigo-400 font-bold">{t.b}</td>
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        placeholder="a²"
                        value={t.userASquared}
                        onChange={(e) => handleTrialChange(t.id, 'userASquared', e.target.value)}
                        className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-center text-xs text-slate-200"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        placeholder="b²"
                        value={t.userBSquared}
                        onChange={(e) => handleTrialChange(t.id, 'userBSquared', e.target.value)}
                        className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-center text-xs text-slate-200"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        placeholder="c²"
                        value={t.userCSquared}
                        onChange={(e) => handleTrialChange(t.id, 'userCSquared', e.target.value)}
                        className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-center text-xs text-slate-200"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        placeholder="c"
                        value={t.userC}
                        onChange={(e) => handleTrialChange(t.id, 'userC', e.target.value)}
                        className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-center text-xs text-emerald-400 font-bold"
                      />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => handleSyncCurrentSim(t.id)}
                        className="px-2.5 py-1 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded text-[11px] transition-all"
                        title="Isi otomatis dengan data simulasi aktif saat ini"
                      >
                        Salin Simulasi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section B: Conceptual Questions & Exercises */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">B. Pertanyaan Analisis & Latihan Soal LKPD</h3>
              <p className="text-xs text-slate-400">Jawab pertanyaan konsep dan pemecahan masalah di bawah ini</p>
            </div>
            <div className="px-3 py-1 bg-indigo-950 text-indigo-300 rounded-lg text-xs font-mono border border-indigo-800">
              Skor Pilihan Ganda: <strong className="text-emerald-400 text-sm">{calculateScore()} / 100</strong>
            </div>
          </div>

          <div className="space-y-6">
            {INITIAL_LKPD_QUESTIONS.map((q, idx) => (
              <div key={q.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-200 leading-relaxed">
                    <span className="text-indigo-400 font-mono mr-1.5">{idx + 1}.</span>
                    {q.prompt}
                  </h4>
                  {q.type === 'multiple-choice' && answers[q.id] && (
                    <span className={`shrink-0 px-2.5 py-0.5 rounded text-[11px] font-bold ${
                      answers[q.id] === q.correctAnswer
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}>
                      {answers[q.id] === q.correctAnswer ? '✓ Benar' : '✗ Belum Tepat'}
                    </span>
                  )}
                </div>

                {q.type === 'multiple-choice' && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt) => {
                      const isSelected = answers[q.id] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleAnswerSelect(q.id, opt)}
                          className={`p-3 rounded-xl text-xs font-medium text-left border transition-all ${
                            isSelected
                              ? 'bg-indigo-600/90 text-white border-indigo-500 shadow-md'
                              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {q.type === 'essay' && (
                  <textarea
                    rows={3}
                    placeholder="Tuliskan penjelasan analisis Anda secara jelas di sini..."
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswerSelect(q.id, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                )}

                {/* Feedback Explanation Toggle */}
                {q.explanation && (
                  <div className="pt-2">
                    <button
                      onClick={() => toggleFeedback(q.id)}
                      className="text-[11px] text-indigo-400 hover:underline flex items-center space-x-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{showFeedback[q.id] ? 'Sembunyikan Kunci & Pembahasan' : 'Lihat Kunci & Pembahasan'}</span>
                    </button>
                    {showFeedback[q.id] && (
                      <div className="mt-2 p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800 leading-relaxed">
                        <strong className="text-emerald-400">Pembahasan:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRINT-ONLY FORMAL LKPD DOCUMENT (Visible during window.print()) */}
      <div className="print-only-lkpd p-8 bg-white text-slate-900 space-y-6">
        <div className="print-header text-center space-y-1">
          <h1 className="text-xl font-bold uppercase tracking-wide">LEMBAR KERJA PESERTA DIDIK (LKPD)</h1>
          <h2 className="text-base font-semibold">TEMA: VISUALISASI & PEMBUKTIAN TEOREMA PYTHAGORAS</h2>
          <p className="text-xs text-slate-600">Aplikasi Pembelajaran Matematika Interaktif (PythagorasLab)</p>
        </div>

        {/* Printable Student Info Header */}
        <div className="border border-slate-400 p-4 rounded text-xs space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div><strong>Nama Murid:</strong> {identity.nama || '...........................................'}</div>
            <div><strong>Kelas:</strong> {identity.kelas || '...........................'}</div>
            <div><strong>No. Absen:</strong> {identity.noAbsen || '...........................'}</div>
            <div><strong>Tanggal:</strong> {identity.tanggal || '...........................'}</div>
            <div className="col-span-2"><strong>Sekolah / Madrasah:</strong> {identity.sekolah || '......................................................................'}</div>
          </div>
        </div>

        {/* Printable Section A: Table */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold border-b border-slate-900 pb-1">A. Hasil Tabel Pengamatan Eksperimen</h3>
          <table className="w-full text-left text-xs border-collapse border border-slate-400">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-2">Percobaan</th>
                <th className="border border-slate-400 p-2">Alas (a)</th>
                <th className="border border-slate-400 p-2">Tinggi (b)</th>
                <th className="border border-slate-400 p-2">Luas a²</th>
                <th className="border border-slate-400 p-2">Luas b²</th>
                <th className="border border-slate-400 p-2">Luas c² (a²+b²)</th>
                <th className="border border-slate-400 p-2">Hipotenusa (c)</th>
              </tr>
            </thead>
            <tbody>
              {trials.map((t) => (
                <tr key={t.id}>
                  <td className="border border-slate-400 p-2 font-bold"># {t.id}</td>
                  <td className="border border-slate-400 p-2">{t.a}</td>
                  <td className="border border-slate-400 p-2">{t.b}</td>
                  <td className="border border-slate-400 p-2">{t.userASquared || '...'}</td>
                  <td className="border border-slate-400 p-2">{t.userBSquared || '...'}</td>
                  <td className="border border-slate-400 p-2">{t.userCSquared || '...'}</td>
                  <td className="border border-slate-400 p-2 font-bold">{t.userC || '...'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Printable Section B: Questions */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold border-b border-slate-900 pb-1">B. Pertanyaan Analisis & Jawaban Murid</h3>
          {INITIAL_LKPD_QUESTIONS.map((q, idx) => (
            <div key={q.id} className="text-xs space-y-1">
              <p className="font-semibold">{idx + 1}. {q.prompt}</p>
              <div className="p-2 border border-slate-300 rounded bg-slate-50 font-mono">
                <strong>Jawaban Murid:</strong> {answers[q.id] || '(Belum diisi)'}
              </div>
            </div>
          ))}
        </div>

        {/* Teacher Signature Block */}
        <div className="pt-10 flex justify-between text-xs">
          <div className="text-center space-y-12">
            <p>Orang Tua / Wali Murid,</p>
            <p className="font-bold underline">( ............................................ )</p>
          </div>
          <div className="text-center space-y-12">
            <p>Guru Mata Pelajaran Matematika,</p>
            <p className="font-bold underline">( ............................................ )</p>
          </div>
        </div>
      </div>
    </div>
  );
};
