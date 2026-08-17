import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Sun, Moon, Volume2, VolumeX } from 'lucide-react';

export function MobileFrame({ children, isDesktopView, setIsDesktopView, theme, setTheme, soundEnabled, setSoundEnabled, authUser, onOpenAuth, onLogout }) {
  const [currentTime, setCurrentTime] = useState('6:15');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-shell" data-theme={theme}>
      {/* Top Controller Bar */}
      <header className="top-bar">
        <div className="brand-badge">
          <div className="brand-logo-icon">S</div>
          <span>SpeakX <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>KEY TO CONFIDENCE</span></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* User Auth Profile Badge */}
          {authUser ? (
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--primary-light)', padding: '4px 10px', borderRadius: 16, cursor: 'pointer', border: '1px solid var(--primary-border)' }}
              onClick={onLogout}
              title="Click to Log Out"
            >
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--primary)', color: '#fff', fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {authUser.name ? authUser.name[0].toUpperCase() : 'U'}
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)' }}>
                {authUser.name.split(' ')[0]}
              </span>
            </div>
          ) : (
            <button 
              className="mode-btn"
              onClick={onOpenAuth}
              style={{ background: 'var(--primary)', color: '#fff', padding: '6px 12px', fontWeight: 700 }}
            >
              Login
            </button>
          )}

          {/* Audio toggle */}
          <button 
            className="icon-btn" 
            title={soundEnabled ? "Mute Voice Prompts" : "Enable Voice Prompts"}
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Theme Toggle */}
          <button 
            className="icon-btn" 
            title="Toggle Light/Dark Theme"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* View Mode Toggle */}
          <div className="mode-toggle-group">
            <button 
              className={`mode-btn ${!isDesktopView ? 'active' : ''}`}
              onClick={() => setIsDesktopView(false)}
            >
              <Smartphone size={15} /> Mobile App
            </button>
            <button 
              className={`mode-btn ${isDesktopView ? 'active' : ''}`}
              onClick={() => setIsDesktopView(true)}
            >
              <Monitor size={15} /> Website View
            </button>
          </div>
        </div>
      </header>

      {/* Main Viewport Container */}
      <div className={`viewport-container ${isDesktopView ? 'desktop-view' : ''}`}>
        <div className="mobile-frame">
          {/* Mobile Status Bar (Visible in Mobile View) */}
          {!isDesktopView && (
            <div className="status-bar">
              <span>{currentTime}</span>
              <div className="dynamic-island">
                <div className="camera-dot"></div>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.75rem' }}>
                <span>5G</span>
                <span>📶</span>
                <span>🔋 88%</span>
              </div>
            </div>
          )}

          {/* Inner Content */}
          <main className="app-content">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
