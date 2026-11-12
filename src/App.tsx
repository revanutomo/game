/**
 * Permainan Revan Utomo – Dunia Bermain Anak
 * "Bersama Revan ayo, Bermain Ceria, Tumbuh Cerdas!"
 */

import React, { useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './components/home/HomePage';
import { AgeSelectorView } from './components/age/AgeSelectorView';
import { CategoriesView } from './components/categories/CategoriesView';
import { GameEngineWrapper } from './components/games/GameEngineWrapper';
import { RewardView } from './components/rewards/RewardView';
import { ParentTeacherDashboard } from './components/dashboard/ParentTeacherDashboard';
import { ProfileView } from './components/profile/ProfileView';

const MainAppContent: React.FC = () => {
  const { currentView, setCurrentView, setActiveGameId } = useGame();

  // Query parameter check for testability (?autostart=1 or ?game=huruf-a-z)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const gameParam = params.get('game');
      const autostart = params.get('autostart');

      if (gameParam) {
        setActiveGameId(gameParam);
        setCurrentView('game-play');
      } else if (autostart === '1') {
        setCurrentView('categories');
      }
    }
  }, [setActiveGameId, setCurrentView]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-amber-50/40 to-sky-100 text-slate-800 relative selection:bg-amber-300 selection:text-amber-950 font-sans">
      {/* Decorative playful background shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-40">
        <div className="absolute top-10 left-10 w-64 h-64 bg-amber-200/50 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-sky-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl" />
      </div>

      {/* Top Header Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6" data-state={currentView}>
        {currentView === 'home' && <HomePage />}
        {currentView === 'age-select' && <AgeSelectorView />}
        {currentView === 'categories' && <CategoriesView />}
        {currentView === 'game-play' && <GameEngineWrapper />}
        {currentView === 'rewards' && <RewardView />}
        {currentView === 'parent-dashboard' && <ParentTeacherDashboard />}
        {currentView === 'profile' && <ProfileView />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainAppContent />
    </GameProvider>
  );
}
