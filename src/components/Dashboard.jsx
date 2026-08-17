import React, { useState } from 'react';
import { Flame, Zap, Clock, Play, CheckCircle, Award, Volume2, Sparkles, BookOpen, ChevronRight, LogOut } from 'lucide-react';
import { DAILY_QUIZZES } from '../data/practiceScenarios';
import { speechService } from '../services/speechService';
import confetti from 'canvas-confetti';

export function Dashboard({ userData, authUser, onOpenAuth, onLogout, exp, streak, onStartPractice, onAddExp }) {
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSuccess, setQuizSuccess] = useState(false);

  const currentQuiz = DAILY_QUIZZES[activeQuizIndex];

  const handleAnswerSubmit = (option) => {
    setSelectedAnswer(option);
    if (option === currentQuiz.answer) {
      setQuizSuccess(true);
      confetti({ particleCount: 50, spread: 50 });
      onAddExp(15);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setQuizSuccess(false);
    setActiveQuizIndex((activeQuizIndex + 1) % DAILY_QUIZZES.length);
  };

  return (
    <div className="dashboard-container">
      {/* Top Banner Greeting */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800 }}>
            Hello, {authUser ? authUser.name : (userData?.profile?.name || 'Learner')} 👋
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Let's reach your daily goal of {userData?.dailyTime ? '1 hour+' : '30 mins'} English speaking!
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {authUser ? (
            <button 
              className="icon-btn"
              onClick={onLogout}
              title="Log Out of SpeakX"
              style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
            >
              <LogOut size={18} />
            </button>
          ) : (
            <button 
              className="cta-button"
              onClick={onOpenAuth}
              style={{ width: 'auto', padding: '8px 16px', fontSize: '0.82rem', borderRadius: 20 }}
            >
              Log In
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-bar">
        <div className="stat-card">
          <Flame size={22} style={{ color: '#FF4C00', marginBottom: 4 }} />
          <span className="stat-val">{streak} Days</span>
          <span className="stat-label">Daily Streak</span>
        </div>
        <div className="stat-card">
          <Zap size={22} style={{ color: '#F59E0B', marginBottom: 4 }} />
          <span className="stat-val">{exp} EXP</span>
          <span className="stat-label">Total Points</span>
        </div>
        <div className="stat-card">
          <Clock size={22} style={{ color: '#10B981', marginBottom: 4 }} />
          <span className="stat-val">42 mins</span>
          <span className="stat-label">Spoken Today</span>
        </div>
      </div>

      {/* Hero AI Speaking Call Banner */}
      <div 
        className="studio-card"
        onClick={onStartPractice}
        style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #FF4C00 0%, #E04300 100%)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', tracking: '1px', fontWeight: 800, opacity: 0.9 }}>
              RECOMMENDED FOR YOU
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: 4 }}>
              Live AI Speaking Session with Sia 🗣️
            </h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: 4 }}>
              Practice real-world interview & daily conversation scenarios.
            </p>
          </div>
          <div style={{ background: '#fff', color: '#FF4C00', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Play size={20} fill="#FF4C00" />
          </div>
        </div>
      </div>

      {/* Interactive Daily Quiz Card */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={18} style={{ color: 'var(--primary)' }} />
            <strong style={{ fontSize: '0.95rem' }}>{currentQuiz.title}</strong>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            Quiz {activeQuizIndex + 1}/{DAILY_QUIZZES.length}
          </span>
        </div>

        {currentQuiz.type === 'listen-repeat' && (
          <div>
            <div style={{ background: 'var(--primary-light)', padding: '14px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)' }}>"{currentQuiz.phrase}"</span>
              <button 
                className="icon-btn" 
                onClick={() => speechService.speak(currentQuiz.phrase)}
              >
                <Volume2 size={18} />
              </button>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 14 }}>
              Tamil: {currentQuiz.translation}
            </p>
            <button 
              className="cta-button" 
              onClick={() => {
                speechService.speak(currentQuiz.phrase);
                confetti({ particleCount: 40 });
                onAddExp(10);
              }}
              style={{ padding: '12px', fontSize: '0.9rem' }}
            >
              🎤 Listen & Practice Pronunciation
            </button>
          </div>
        )}

        {currentQuiz.type === 'fill-blank' && (
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 14 }}>
              {currentQuiz.question}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {currentQuiz.options.map((opt) => (
                <button
                  key={opt}
                  className={`option-card ${selectedAnswer === opt ? (opt === currentQuiz.answer ? 'selected' : '') : ''}`}
                  onClick={() => handleAnswerSubmit(opt)}
                  style={{ padding: '12px 16px', fontSize: '0.9rem' }}
                >
                  <span>{opt}</span>
                  {selectedAnswer === opt && opt === currentQuiz.answer && (
                    <CheckCircle size={16} style={{ color: '#10B981' }} />
                  )}
                </button>
              ))}
            </div>

            {quizSuccess && (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: 12, fontWeight: 700 }}>
                🎉 Correct! +15 EXP
              </div>
            )}

            <button 
              className="cta-button" 
              onClick={handleNextQuiz}
              style={{ padding: '12px', fontSize: '0.9rem' }}
            >
              Next Question <ChevronRight size={16} style={{ verticalAlign: 'middle' }} />
            </button>
          </div>
        )}

        {currentQuiz.type === 'sentence-order' && (
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 12 }}>
              Tap words in correct order to form sentence:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {currentQuiz.words.map((w, idx) => (
                <span 
                  key={idx}
                  style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '6px 14px', borderRadius: 16, fontWeight: 700, fontSize: '0.88rem' }}
                >
                  {w}
                </span>
              ))}
            </div>
            <button 
              className="cta-button" 
              onClick={() => {
                speechService.speak(currentQuiz.correctOrder.join(' '));
                confetti({ particleCount: 40 });
                onAddExp(15);
              }}
              style={{ padding: '12px', fontSize: '0.9rem' }}
            >
              Check Sentence & Speak
            </button>
          </div>
        )}
      </div>

      {/* Vocabulary Bank */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <BookOpen size={18} style={{ color: 'var(--primary)' }} />
          <strong style={{ fontSize: '0.95rem' }}>Saved Vocabulary Deck</strong>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { en: "Fluency", mean: "ஆங்கிலத்தில் சரளமாக பேசுவது", pos: "Noun" },
            { en: "Confidence", mean: "நம்பிக்கை", pos: "Noun" },
            { en: "Articulation", mean: "தெளிவான உரை", pos: "Noun" }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>{item.en}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 8 }}>({item.pos})</span>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.mean}</p>
              </div>
              <button 
                className="icon-btn"
                onClick={() => speechService.speak(item.en)}
              >
                <Volume2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
