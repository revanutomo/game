import React, { createContext, useContext, useState, useEffect } from 'react';
import { AgeGroup, GameCategory, PlayerHistoryEntry, PlayerProfile } from '../types/game';
import { calculateCoins, calculateStars } from '../utils/gameRules';
import { audio } from '../utils/audioManager';

export type AppView =
  | 'home'
  | 'age-select'
  | 'categories'
  | 'game-play'
  | 'rewards'
  | 'parent-dashboard'
  | 'profile';

interface GameContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedAge: AgeGroup;
  setSelectedAge: (age: AgeGroup) => void;
  selectedCategory: GameCategory | null;
  setSelectedCategory: (cat: GameCategory | null) => void;
  activeGameId: string | null;
  setActiveGameId: (id: string | null) => void;
  profile: PlayerProfile;
  soundEnabled: boolean;
  musicEnabled: boolean;
  toggleSound: () => void;
  toggleMusic: () => void;
  toggleFullscreen: () => void;
  recordGameResult: (gameId: string, gameTitle: string, category: GameCategory, score: number, total: number) => { stars: number; coins: number };
  unlockAvatar: (avatarId: string, cost: number) => boolean;
  updateProfile: (updated: Partial<PlayerProfile>) => void;
  resetProgress: () => void;
  playGame: (gameId: string) => void;
}

const DEFAULT_PROFILE: PlayerProfile = {
  name: 'Revan Cilik',
  age: 4,
  avatar: '🦁',
  favoriteCharacter: 'BIMO si Beruang Bintang',
  stars: 12,
  coins: 80,
  unlockedAvatars: ['🦁', '🐰', '🐱', '🐼', '🐻'],
  unlockedBadges: ['Bintang Pertama', 'Penjelajah Huruf'],
  history: [
    {
      gameId: 'huruf-a-z',
      gameTitle: 'Mengenal Huruf A-Z',
      category: 'huruf',
      stars: 3,
      score: 5,
      total: 5,
      timestamp: Date.now() - 3600000,
    },
    {
      gameId: 'angka-dasar',
      gameTitle: 'Mengenal Angka 1-20',
      category: 'angka',
      stars: 3,
      score: 3,
      total: 3,
      timestamp: Date.now() - 1800000,
    },
  ],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedAge, setSelectedAge] = useState<AgeGroup>(4);
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | null>(null);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(false);

  const [profile, setProfile] = useState<PlayerProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('revan_utomo_profile_v1');
        if (saved) return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_PROFILE;
  });

  // Persist profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('revan_utomo_profile_v1', JSON.stringify(profile));
    } catch {
      // fallback
    }
  }, [profile]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    audio.setSoundEnabled(next);
    if (next) audio.playPop();
  };

  const toggleMusic = () => {
    const next = !musicEnabled;
    setMusicEnabled(next);
    audio.setMusicEnabled(next);
  };

  const toggleFullscreen = () => {
    audio.playPop();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const playGame = (gameId: string) => {
    audio.playPop();
    setActiveGameId(gameId);
    setCurrentView('game-play');
  };

  const recordGameResult = (
    gameId: string,
    gameTitle: string,
    category: GameCategory,
    score: number,
    total: number
  ) => {
    const stars = calculateStars(score, total);
    const coins = calculateCoins(stars, profile.age);

    const newEntry: PlayerHistoryEntry = {
      gameId,
      gameTitle,
      category,
      stars,
      score,
      total,
      timestamp: Date.now(),
    };

    setProfile((prev) => {
      const updatedStars = prev.stars + stars;
      const updatedCoins = prev.coins + coins;
      const newBadges = [...prev.unlockedBadges];

      if (updatedStars >= 20 && !newBadges.includes('Bintang Gemilang')) {
        newBadges.push('Bintang Gemilang');
      }
      if (updatedStars >= 50 && !newBadges.includes('Juara Cilik Super')) {
        newBadges.push('Juara Cilik Super');
      }
      if (prev.history.length >= 5 && !newBadges.includes('Sahabat Bimo')) {
        newBadges.push('Sahabat Bimo');
      }

      return {
        ...prev,
        stars: updatedStars,
        coins: updatedCoins,
        unlockedBadges: newBadges,
        history: [newEntry, ...prev.history],
      };
    });

    return { stars, coins };
  };

  const unlockAvatar = (avatarId: string, cost: number): boolean => {
    if (profile.coins < cost) {
      audio.playWrong();
      return false;
    }
    audio.playFanfare();
    setProfile((prev) => ({
      ...prev,
      coins: prev.coins - cost,
      unlockedAvatars: [...prev.unlockedAvatars, avatarId],
      avatar: avatarId,
    }));
    return true;
  };

  const updateProfile = (updated: Partial<PlayerProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const resetProgress = () => {
    setProfile({
      ...DEFAULT_PROFILE,
      history: [],
      stars: 0,
      coins: 0,
    });
    audio.playPop();
  };

  return (
    <GameContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedAge,
        setSelectedAge,
        selectedCategory,
        setSelectedCategory,
        activeGameId,
        setActiveGameId,
        profile,
        soundEnabled,
        musicEnabled,
        toggleSound,
        toggleMusic,
        toggleFullscreen,
        recordGameResult,
        unlockAvatar,
        updateProfile,
        resetProgress,
        playGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
