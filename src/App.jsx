import React, { useState } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Dashboard } from './components/Dashboard';
import { VoiceStudio } from './components/VoiceStudio';
import { PremiumView } from './components/PremiumView';
import { ProgressView } from './components/ProgressView';
import { Navigation } from './components/Navigation';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [isDesktopView, setIsDesktopView] = useState(false);
  const [theme, setTheme] = useState('light');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Authentication State
  const [authUser, setAuthUser] = useState(() => {
    const saved = localStorage.getItem('speakx_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'premium' | 'aicoach' | 'progress'

  // Gamification state
  const [exp, setExp] = useState(120);
  const [streak, setStreak] = useState(3);

  const handleLoginSuccess = (user) => {
    setAuthUser(user);
    localStorage.setItem('speakx_auth_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out of SpeakX?")) {
      setAuthUser(null);
      localStorage.removeItem('speakx_auth_user');
      setHasCompletedOnboarding(false);
      setUserData(null);
      setActiveTab('home');
    }
  };

  const handleOnboardingComplete = (data) => {
    setUserData(data);
    setHasCompletedOnboarding(true);
  };

  const handleAddExp = (points) => {
    setExp(prev => prev + points);
  };

  return (
    <MobileFrame
      isDesktopView={isDesktopView}
      setIsDesktopView={setIsDesktopView}
      theme={theme}
      setTheme={setTheme}
      soundEnabled={soundEnabled}
      setSoundEnabled={setSoundEnabled}
      authUser={authUser}
      onOpenAuth={() => setIsAuthModalOpen(true)}
      onLogout={handleLogout}
    >
      {!hasCompletedOnboarding ? (
        <OnboardingFlow 
          onComplete={handleOnboardingComplete}
          soundEnabled={soundEnabled}
          authUser={authUser}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {activeTab === 'home' && (
            <Dashboard 
              userData={userData}
              authUser={authUser}
              onOpenAuth={() => setIsAuthModalOpen(true)}
              onLogout={handleLogout}
              exp={exp}
              streak={streak}
              onStartPractice={() => setActiveTab('aicoach')}
              onAddExp={handleAddExp}
            />
          )}

          {activeTab === 'premium' && (
            <PremiumView 
              onBackToHome={() => setActiveTab('home')}
              onAddExp={handleAddExp}
            />
          )}

          {activeTab === 'aicoach' && (
            <VoiceStudio 
              userData={userData}
              onAddExp={handleAddExp}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressView 
              userData={userData}
              exp={exp}
              streak={streak}
            />
          )}

          <Navigation 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      )}

      {/* Auth Modal Overlay */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialUser={userData}
      />
    </MobileFrame>
  );
}
