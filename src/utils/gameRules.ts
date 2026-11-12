import { AgeGroup, GameCategory, GameDefinition, PlayerHistoryEntry, PlayerProfile } from '../types/game';

/**
 * Calculates 1 to 3 stars based on score ratio
 */
export function calculateStars(score: number, total: number): number {
  if (total <= 0) return 1;
  const ratio = score / total;
  if (ratio >= 0.85) return 3;
  if (ratio >= 0.5) return 2;
  return 1;
}

/**
 * Calculates coins awarded based on stars won and age tier
 */
export function calculateCoins(stars: number, age: AgeGroup): number {
  const base = stars * 10;
  // Younger kids get extra bonus motivation coins
  const ageBonus = age === 3 ? 10 : age === 4 ? 8 : 5;
  return base + ageBonus;
}

/**
 * Fisher-Yates array shuffle for non-repetitive gameplay
 */
export function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Filters games suitable for the selected age group
 */
export function getAgeAppropriateGames(
  games: GameDefinition[],
  age: AgeGroup
): GameDefinition[] {
  return games.filter((g) => g.ageGroups.includes(age));
}

/**
 * Evaluates learning progress from history
 */
export function evaluateProgressStats(history: PlayerHistoryEntry[]) {
  const totalGames = history.length;
  const totalStars = history.reduce((sum, h) => sum + h.stars, 0);

  // Group by category
  const categoryStats: Record<string, { played: number; stars: number; maxScoreRate: number }> = {};
  for (const h of history) {
    if (!categoryStats[h.category]) {
      categoryStats[h.category] = { played: 0, stars: 0, maxScoreRate: 0 };
    }
    categoryStats[h.category].played += 1;
    categoryStats[h.category].stars += h.stars;
    const rate = h.total > 0 ? h.score / h.total : 0;
    if (rate > categoryStats[h.category].maxScoreRate) {
      categoryStats[h.category].maxScoreRate = rate;
    }
  }

  // Mastered categories (played at least 2 times with average rate >= 0.75)
  const mastered: string[] = [];
  const needsPractice: string[] = [];

  for (const [cat, data] of Object.entries(categoryStats)) {
    if (data.played >= 2 && data.maxScoreRate >= 0.75) {
      mastered.push(cat);
    } else {
      needsPractice.push(cat);
    }
  }

  return {
    totalGames,
    totalStars,
    categoryStats,
    mastered,
    needsPractice,
  };
}

/**
 * Checks word spelling ignoring whitespace and casing
 */
export function checkWordSpelling(input: string, target: string): boolean {
  return input.trim().toUpperCase() === target.trim().toUpperCase();
}

/**
 * Generates an age-appropriate simple math problem
 */
export function generateMathProblem(
  type: 'addition' | 'subtraction',
  age: AgeGroup
): { num1: number; num2: number; correct: number; options: number[] } {
  const max = age <= 4 ? 5 : age === 5 ? 10 : 20;
  let num1 = Math.floor(Math.random() * (max - 1)) + 1;
  let num2 = Math.floor(Math.random() * (max - 1)) + 1;

  if (type === 'subtraction') {
    // Ensure positive outcome
    if (num1 < num2) {
      [num1, num2] = [num2, num1];
    }
    const correct = num1 - num2;
    const wrong1 = (correct + 1);
    const wrong2 = Math.max(0, correct - 1 === correct ? correct + 2 : correct - 1);
    const options = shuffleArray([correct, wrong1, wrong2]);
    return { num1, num2, correct, options };
  } else {
    const correct = num1 + num2;
    const wrong1 = (correct + 1);
    const wrong2 = Math.max(1, correct - 1);
    const options = shuffleArray([correct, wrong1, wrong2]);
    return { num1, num2, correct, options };
  }
}
