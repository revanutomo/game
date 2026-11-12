export type AgeGroup = 3 | 4 | 5 | 6;

export type GameCategory =
  | 'huruf'
  | 'angka'
  | 'berhitung'
  | 'warna'
  | 'bentuk'
  | 'hewan'
  | 'buah_sayur'
  | 'kendaraan'
  | 'puzzle_logika'
  | 'cocok_gambar'
  | 'membaca'
  | 'menulis'
  | 'bahasa_inggris'
  | 'anggota_tubuh'
  | 'alam_lingkungan'
  | 'agama_islam'
  | 'adab_akhlak'
  | 'musik_kreativitas'
  | 'daya_ingat'
  | 'motorik';

export type GameEngineType =
  | 'quiz_choice'
  | 'word_builder'
  | 'count_math'
  | 'sort_basket'
  | 'memory_flip'
  | 'shape_builder'
  | 'coloring'
  | 'drawing'
  | 'xylophone'
  | 'sequence_order'
  | 'odd_one_out';

export interface GameDefinition {
  id: string;
  title: string;
  category: GameCategory;
  engine: GameEngineType;
  ageGroups: AgeGroup[];
  description: string;
  instruction: string;
  iconName: string;
  badgeColor: string;
  popularity: number; // for popular sorting
  isNew?: boolean;
}

export interface ChoiceQuestion {
  id: string;
  prompt: string;
  visual?: string; // emoji, icon, or SVG data
  visualType?: 'emoji' | 'text' | 'shape';
  options: {
    id: string;
    label: string;
    visual?: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  hint?: string;
  audioText?: string;
}

export interface WordBuildQuestion {
  id: string;
  targetWord: string;
  hint: string;
  emoji: string;
  scrambledLetters: string[];
}

export interface CountMathQuestion {
  id: string;
  type: 'count' | 'addition' | 'subtraction';
  prompt: string;
  num1: number;
  num2?: number;
  symbol?: '+' | '-';
  itemEmoji: string;
  correctAnswer: number;
  options: number[];
}

export interface MemoryCardItem {
  id: string;
  label: string;
  emoji: string;
}

export interface SequenceStep {
  id: string;
  order: number;
  label: string;
  emoji: string;
  description: string;
}

export interface PlayerHistoryEntry {
  gameId: string;
  gameTitle: string;
  category: GameCategory;
  stars: number;
  score: number;
  total: number;
  timestamp: number;
}

export interface PlayerProfile {
  name: string;
  age: AgeGroup;
  avatar: string;
  favoriteCharacter: string;
  stars: number;
  coins: number;
  unlockedAvatars: string[];
  unlockedBadges: string[];
  history: PlayerHistoryEntry[];
}
