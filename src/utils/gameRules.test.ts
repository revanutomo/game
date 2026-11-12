import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateStars,
  calculateCoins,
  shuffleArray,
  checkWordSpelling,
  getAgeAppropriateGames,
  evaluateProgressStats,
  generateMathProblem,
} from './gameRules';
import { GameDefinition } from '../types/game';

test('calculateStars produces 1, 2, or 3 stars properly', () => {
  assert.equal(calculateStars(5, 5), 3);
  assert.equal(calculateStars(4, 5), 2);
  assert.equal(calculateStars(1, 5), 1);
  assert.equal(calculateStars(0, 5), 1);
  assert.equal(calculateStars(0, 0), 1);
});

test('calculateCoins awards stars and age bonuses', () => {
  // Age 3 gets +10 bonus
  assert.equal(calculateCoins(3, 3), 40);
  // Age 6 gets +5 bonus
  assert.equal(calculateCoins(3, 6), 35);
});

test('shuffleArray preserves length and elements', () => {
  const original = ['A', 'B', 'C', 'D', 'E'];
  const shuffled = shuffleArray(original);
  assert.equal(shuffled.length, original.length);
  assert.deepEqual(new Set(shuffled), new Set(original));
});

test('checkWordSpelling matches case-insensitively and trims', () => {
  assert.equal(checkWordSpelling('APEL', 'apel'), true);
  assert.equal(checkWordSpelling('  kucing ', 'KUCING'), true);
  assert.equal(checkWordSpelling('BOLA', 'BALON'), false);
});

test('getAgeAppropriateGames filters correctly', () => {
  const mockGames: GameDefinition[] = [
    {
      id: 'g1',
      title: 'Game 3 yo',
      category: 'warna',
      engine: 'quiz_choice',
      ageGroups: [3],
      description: '',
      instruction: '',
      iconName: '',
      badgeColor: '',
      popularity: 1,
    },
    {
      id: 'g2',
      title: 'Game 5 and 6 yo',
      category: 'berhitung',
      engine: 'count_math',
      ageGroups: [5, 6],
      description: '',
      instruction: '',
      iconName: '',
      badgeColor: '',
      popularity: 2,
    },
  ];

  const forAge3 = getAgeAppropriateGames(mockGames, 3);
  assert.equal(forAge3.length, 1);
  assert.equal(forAge3[0].id, 'g1');

  const forAge5 = getAgeAppropriateGames(mockGames, 5);
  assert.equal(forAge5.length, 1);
  assert.equal(forAge5[0].id, 'g2');
});

test('generateMathProblem produces valid non-negative results', () => {
  const addProblem = generateMathProblem('addition', 4);
  assert.equal(addProblem.num1 + addProblem.num2, addProblem.correct);
  assert.ok(addProblem.options.includes(addProblem.correct));

  const subProblem = generateMathProblem('subtraction', 5);
  assert.ok(subProblem.num1 >= subProblem.num2);
  assert.equal(subProblem.num1 - subProblem.num2, subProblem.correct);
  assert.ok(subProblem.options.includes(subProblem.correct));
});

test('evaluateProgressStats aggregates history accurately', () => {
  const stats = evaluateProgressStats([
    {
      gameId: 'g1',
      gameTitle: 'Huruf',
      category: 'huruf',
      stars: 3,
      score: 5,
      total: 5,
      timestamp: Date.now(),
    },
    {
      gameId: 'g1',
      gameTitle: 'Huruf',
      category: 'huruf',
      stars: 3,
      score: 4,
      total: 5,
      timestamp: Date.now(),
    },
    {
      gameId: 'g2',
      gameTitle: 'Angka',
      category: 'angka',
      stars: 1,
      score: 1,
      total: 5,
      timestamp: Date.now(),
    },
  ]);

  assert.equal(stats.totalGames, 3);
  assert.equal(stats.totalStars, 7);
  assert.ok(stats.mastered.includes('huruf'));
  assert.ok(stats.needsPractice.includes('angka'));
});
