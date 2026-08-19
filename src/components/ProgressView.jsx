import React from 'react';
import { BarChart3, TrendingUp, Award, Flame, CheckCircle, Clock } from 'lucide-react';

export function ProgressView({ userData, exp, streak }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px', overflowY: 'auto' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800 }}>
        Your Learning Progress 📊
      </h2>

      {/* Hero Stat Overview */}
      <div style={{ background: 'linear-gradient(135deg, #FF4C00 0%, #E04300 100%)', color: '#fff', padding: '20px', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', tracking: '1px', fontWeight: 800, opacity: 0.9 }}>
            FLUENCY LEVEL
          </span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: 4 }}>
            Intermediate (68%)
          </h3>
          <p style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: 4 }}>
            On track to achieve Fluency in 7 Days!
          </p>
        </div>
        <Award size={48} style={{ opacity: 0.9 }} />
      </div>

      {/* Breakdown Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 16 }}>
          <Flame size={24} style={{ color: 'var(--primary)', marginBottom: 8 }} />
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{streak} Days</h4>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Daily Streak</span>
        </div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 16 }}>
          <TrendingUp size={24} style={{ color: '#10B981', marginBottom: 8 }} />
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{exp} EXP</h4>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Earned XP</span>
        </div>
      </div>

      {/* Skill Breakdown Progress Bars */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: 16 }}>
          Skill Accuracy Breakdown
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { skill: 'Pronunciation', pct: 88, color: '#FF4C00' },
            { skill: 'Grammar Accuracy', pct: 75, color: '#3B82F6' },
            { skill: 'Vocabulary Range', pct: 92, color: '#10B981' },
            { skill: 'Speaking Speed & Tempo', pct: 82, color: '#F59E0B' }
          ].map(item => (
            <div key={item.skill}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: 4 }}>
                <span>{item.skill}</span>
                <span style={{ color: item.color }}>{item.pct}%</span>
              </div>
              <div style={{ height: 8, background: 'var(--border-color)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${item.pct}%`, height: '100%', background: item.color, borderRadius: 4 }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
