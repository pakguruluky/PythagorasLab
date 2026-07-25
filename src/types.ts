export interface TriangleData {
  a: number; // Alas
  b: number; // Tinggi
  c: number; // Hipotenusa
  aSquared: number;
  bSquared: number;
  cSquared: number;
  isTriple: boolean;
  angleA: number; // Angle opposite to a in degrees
  angleB: number; // Angle opposite to b in degrees
}

export type ViewMode = 'squares' | 'tiles' | 'realworld';
export type RealWorldScenario = 'ladder' | 'flagpole' | 'ship';

export interface PresetTriple {
  name: string;
  a: number;
  b: number;
  description: string;
}

export interface StudentIdentity {
  nama: string;
  kelas: string;
  noAbsen: string;
  sekolah: string;
  tanggal: string;
}

export interface LkpdTrial {
  id: number;
  a: number;
  b: number;
  userASquared: string;
  userBSquared: string;
  userCSquared: string;
  userC: string;
  isCorrect?: boolean;
}

export interface LkpdQuestion {
  id: string;
  prompt: string;
  type: 'multiple-choice' | 'number' | 'essay';
  options?: string[];
  correctAnswer?: string | number;
  userAnswer?: string | number;
  explanation?: string;
}
