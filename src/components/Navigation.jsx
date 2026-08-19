import React from 'react';
import { Home, Crown, BarChart2 } from 'lucide-react';

export function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className="bottom-nav">
      {/* Tab 1: Home */}
      <button 
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => setActiveTab('home')}
      >
        <Home size={22} />
        <span>Home</span>
      </button>

      {/* Tab 2: Premium (Matches screenshot crown icon) */}
      <button 
        className={`nav-item ${activeTab === 'premium' ? 'active' : ''}`}
        onClick={() => setActiveTab('premium')}
      >
        <Crown size={22} />
        <span>Premium</span>
      </button>

      {/* Tab 3: Central Floating AI Coach Avatar (Matches screenshot!) */}
      <button 
        className={`nav-item ai-coach-tab ${activeTab === 'aicoach' ? 'active' : ''}`}
        onClick={() => setActiveTab('aicoach')}
      >
        <div className="floating-avatar-btn">
          <img 
            src="/sia_coach.jpg" 
            alt="AI Coach Sia" 
            className="floating-avatar-img"
          />
        </div>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, marginTop: 2, color: activeTab === 'aicoach' ? 'var(--primary)' : 'var(--text-muted)' }}>
          AI coach
        </span>
      </button>

      {/* Tab 4: Progress (Matches screenshot bar chart icon) */}
      <button 
        className={`nav-item ${activeTab === 'progress' ? 'active' : ''}`}
        onClick={() => setActiveTab('progress')}
      >
        <BarChart2 size={22} />
        <span>Progress</span>
      </button>
    </nav>
  );
}
