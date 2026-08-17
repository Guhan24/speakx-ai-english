import React from 'react';
import { Home, Mic, Award, UserCheck } from 'lucide-react';

export function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => setActiveTab('home')}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button 
        className={`nav-item ${activeTab === 'studio' ? 'active' : ''}`}
        onClick={() => setActiveTab('studio')}
      >
        <Mic size={20} />
        <span>AI Studio</span>
      </button>

      <button 
        className={`nav-item ${activeTab === 'quizzes' ? 'active' : ''}`}
        onClick={() => setActiveTab('home')}
      >
        <Award size={20} />
        <span>Lessons</span>
      </button>
    </nav>
  );
}
