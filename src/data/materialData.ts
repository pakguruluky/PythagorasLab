import { PresetTriple, LkpdQuestion } from '../types';

export const PRESET_TRIPLES: PresetTriple[] = [
  { name: 'Tripel (3, 4, 5)', a: 3, b: 4, description: 'Tripel Pythagoras paling dasar dan populer.' },
  { name: 'Tripel (5, 12, 13)', a: 5, b: 12, description: 'Tripel rasio sedang dengan hipotenusa 13.' },
  { name: 'Tripel (8, 15, 17)', a: 8, b: 15, description: 'Sisi alas 8 unit dan tinggi 15 unit.' },
  { name: 'Tripel (7, 24, 25)', a: 7, b: 24, description: 'Tripel dengan rasio tinggi dominan.' },
  { name: 'Kelipatan (6, 8, 10)', a: 6, b: 8, description: 'Kelipatan 2× dari tripel dasar (3,4,5).' },
  { name: 'Sama Kaki (5, 5, 7.07)', a: 5, b: 5, description: 'Segitiga siku-siku sama kaki (sudut 45°-45°-90°).' },
  { name: 'Khusus (9, 12, 15)', a: 9, b: 12, description: 'Kelipatan 3× dari tripel dasar (3,4,5).' },
];

export const INITIAL_LKPD_QUESTIONS: LkpdQuestion[] = [
  {
    id: 'q1',
    prompt: 'Jika sebuah segitiga siku-siku memiliki panjang alas a = 6 cm dan tinggi b = 8 cm, berapakah panjang sisi miringnya (c)?',
    type: 'multiple-choice',
    options: ['9 cm', '10 cm', '12 cm', '14 cm'],
    correctAnswer: '10 cm',
    explanation: 'c² = a² + b² = 6² + 8² = 36 + 64 = 100. Maka c = √100 = 10 cm.',
  },
  {
    id: 'q2',
    prompt: 'Sebuah tangga sepanjang 13 meter disandarkan pada dinding rumah. Jika jarak kaki tangga ke dinding adalah 5 meter, berapa tinggi dinding yang dicapai tangga?',
    type: 'multiple-choice',
    options: ['10 meter', '11 meter', '12 meter', '14 meter'],
    correctAnswer: '12 meter',
    explanation: 'Tinggi² = c² - a² = 13² - 5² = 169 - 25 = 144. Maka tinggi = √144 = 12 meter.',
  },
  {
    id: 'q3',
    prompt: 'Manakah dari kelompok tiga bilangan berikut yang BUKAN merupakan Tripel Pythagoras?',
    type: 'multiple-choice',
    options: ['3, 4, 5', '5, 12, 13', '6, 7, 8', '8, 15, 17'],
    correctAnswer: '6, 7, 8',
    explanation: '6² + 7² = 36 + 49 = 85, sedangkan 8² = 64. Karena 85 ≠ 64, maka (6,7,8) bukan Tripel Pythagoras.',
  },
  {
    id: 'q4',
    prompt: 'Jelaskan dengan kalimat Anda sendiri mengapa luas persegi pada sisi miring (c²) selalu sama dengan penjumlahan luas persegi pada sisi alas (a²) dan sisi tegak (b²)!',
    type: 'essay',
    explanation: 'Pertanyaan reflektif untuk menguji pemahaman konsep geometris pembuktian luas area persegi.',
  },
];

export const REFERENCE_SOURCES = [
  {
    title: 'Buku Siswa Matematika SMP/MTs Kelas VIII (Kurikulum Merdeka)',
    author: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia',
    year: '2022',
    notes: 'Bab 2: Teorema Pythagoras, Tripel Pythagoras, dan Penerapan Geometri.',
  },
  {
    title: 'Buku Panduan Guru Matematika SMA/MA Kelas X (Kurikulum Merdeka)',
    author: 'Badan Standar, Kurikulum, dan Asesmen Pendidikan (BSKAP)',
    year: '2021',
    notes: 'Pengembangan Konsep Vektor, Trigonometri Dasar, dan Hubungan Pythagoras.',
  },
  {
    title: 'Euclid’s Elements - Book I, Proposition 47',
    author: 'Euclid of Alexandria (Transl. Sir Thomas L. Heath)',
    year: '300 SM / 1908',
    notes: 'Pembuktian geometris klasik Teorema Pythagoras menggunakan konstruksi garis sejajar dan luas segitiga.',
  },
  {
    title: 'Lilavati & Bijaganita (Mathematical Proofs)',
    author: 'Bhaskara II (Bhaskaracharya)',
    year: '1150 M',
    notes: 'Metode pembuktian visual "Lihatlah!" (Behold!) dengan penyusunan ulang 4 segitiga siku-siku.',
  },
];
