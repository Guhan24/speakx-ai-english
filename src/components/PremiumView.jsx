import React from 'react';
import { Crown, Lock, Users, Tag, Sparkles, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export function PremiumView({ onBackToHome, onAddExp }) {
  const handleStartTrial = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert("🎉 Free 7-Day Trial Activated! Enjoy unlimited AI Coach access & 100+ speaking exercises.");
    if (onAddExp) onAddExp(50);
  };

  return (
    <div className="premium-screen">
      {/* Top Header */}
      <div className="premium-header">
        <button 
          onClick={onBackToHome}
          style={{ position: 'absolute', left: 0, border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-main)' }}
        >
          <ArrowLeft size={22} />
        </button>
        <div className="premium-title">
          <Crown size={22} fill="var(--primary)" color="var(--primary)" />
          PREMIUM
        </div>
      </div>

      {/* Main Headline */}
      <h2 className="premium-hero-headline">
        Speak Fluently with<br />Friends & Family in 7 Days
      </h2>

      {/* Learn With Personal AI Teacher Feature Card */}
      <div className="premium-feature-card">
        <h3 className="premium-card-title">
          Learn With <span>Personal AI Teacher</span>
        </h3>

        {/* Feature 1 */}
        <div className="premium-feature-item">
          <div className="premium-feature-icon">
            <Lock size={22} />
          </div>
          <div className="premium-feature-text">
            <h4>Unlock Unlimited Exercise</h4>
            <p>Learn with 100+ speaking exercises</p>
          </div>
        </div>

        <div style={{ height: 1, background: '#F3EAE4' }}></div>

        {/* Feature 2 */}
        <div className="premium-feature-item">
          <div className="premium-feature-icon">
            <Users size={22} />
          </div>
          <div className="premium-feature-text">
            <h4>100+ Real Life Scenarios</h4>
            <p>Practice through daily life scenarios</p>
          </div>
        </div>

        <div style={{ height: 1, background: '#F3EAE4' }}></div>

        {/* Feature 3 */}
        <div className="premium-feature-item">
          <div className="premium-feature-icon">
            <Tag size={22} />
          </div>
          <div className="premium-feature-text">
            <h4>Get Personalized Feedback</h4>
            <p>Improve your speaking with instant feedback</p>
          </div>
        </div>
      </div>

      {/* Bottom Pricing & CTA */}
      <div style={{ marginTop: 'auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 12 }}>
          Auto-renew for <strong style={{ color: 'var(--text-main)' }}>₹299 every month</strong>. Cancel anytime
        </p>

        <button 
          className="cta-button" 
          onClick={handleStartTrial}
          style={{ padding: '16px', fontSize: '1.05rem', fontWeight: 800 }}
        >
          Start Your FREE Trial
        </button>
      </div>
    </div>
  );
}
