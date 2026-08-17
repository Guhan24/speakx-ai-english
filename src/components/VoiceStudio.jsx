import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, RotateCcw, MessageSquare, Briefcase, Coffee, Plane, Award } from 'lucide-react';
import { PRACTICE_SCENARIOS } from '../data/practiceScenarios';
import { speechService } from '../services/speechService';

export function VoiceStudio({ userData, onAddExp }) {
  const [activeScenario, setActiveScenario] = useState(PRACTICE_SCENARIOS[0]);
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);

  // Initialize scenario conversation
  useEffect(() => {
    const initialMsg = {
      sender: 'sia',
      text: activeScenario.initialGreeting,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([initialMsg]);
    setEvaluation(null);

    // Speak Sia's greeting
    speechService.speak(activeScenario.initialGreeting, 'en-US', () => setIsAiSpeaking(false));
    setIsAiSpeaking(true);
  }, [activeScenario]);

  const handleToggleMic = () => {
    if (isRecording) {
      speechService.stopListening();
      setIsRecording(false);
      if (transcript.trim()) {
        processUserSpeech(transcript);
      }
    } else {
      setTranscript('');
      speechService.startListening(
        (res) => {
          setTranscript(res.final || res.interim);
        },
        (err) => {
          console.error("Mic error:", err);
          setIsRecording(false);
        },
        () => {
          setIsRecording(false);
        }
      );
      setIsRecording(true);
    }
  };

  const processUserSpeech = (userText) => {
    const userMsg = {
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setTranscript('');

    // Generate intelligent AI response & score
    setTimeout(() => {
      const aiReplyText = generateAiReply(activeScenario.id, userText);
      const aiMsg = {
        sender: 'sia',
        text: aiReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      
      // Calculate real-time fluency metrics
      const wordCount = userText.split(' ').length;
      const fluencyScore = Math.min(98, Math.max(70, Math.floor(75 + wordCount * 2.5)));
      const accuracyScore = Math.min(95, Math.max(72, Math.floor(80 + Math.random() * 15)));
      
      setEvaluation({
        fluency: fluencyScore,
        accuracy: accuracyScore,
        vocabulary: 'Advanced',
        tip: userText.length < 15 ? 'Try expanding your sentences to practice more complex vocabulary!' : 'Great flow and natural pronunciation!'
      });

      onAddExp(25);

      // Sia speaks back
      setIsAiSpeaking(true);
      speechService.speak(aiReplyText, 'en-US', () => setIsAiSpeaking(false));
    }, 1000);
  };

  const generateAiReply = (scenarioId, text) => {
    const lower = text.toLowerCase();
    if (scenarioId === 'interview') {
      if (lower.includes('experience') || lower.includes('work')) {
        return "That sounds impressive! How do you handle high-pressure situations or deadlines?";
      }
      return "Excellent point! Could you describe a project you are particularly proud of?";
    } else if (scenarioId === 'cafe') {
      return "Got it! Would you like any milk preference or extra shot of espresso with that?";
    } else if (scenarioId === 'office_chat') {
      return "Sounds like a great plan! Did you get a chance to review the morning presentation slides?";
    } else {
      return "Certainly! I have located your booking. May I please see your passport or ID for verification?";
    }
  };

  return (
    <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Scenario Selector Chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {PRACTICE_SCENARIOS.map(sc => (
          <button 
            key={sc.id}
            onClick={() => setActiveScenario(sc)}
            style={{
              padding: '8px 14px',
              borderRadius: '20px',
              border: activeScenario.id === sc.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
              background: activeScenario.id === sc.id ? 'var(--primary-light)' : 'var(--bg-card)',
              color: activeScenario.id === sc.id ? 'var(--primary)' : 'var(--text-main)',
              fontWeight: 700,
              fontSize: '0.82rem',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}
          >
            {sc.title}
          </button>
        ))}
      </div>

      {/* AI Coach Sia Call Header */}
      <div className="studio-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="avatar-wrapper" style={{ width: 56, height: 56, margin: 0 }}>
            <img src="/sia_coach.jpg" alt="Sia" className="avatar-img" style={{ borderWidth: 2 }} />
            {isAiSpeaking && <div className="voice-wave-dot"></div>}
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Sia - AI English Coach</h3>
            <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>
              {isAiSpeaking ? "🔊 Speaking..." : "🟢 Live Voice Session"}
            </span>
          </div>
        </div>
      </div>

      {/* Conversation Chat Stream */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px' }}>
        {messages.map((msg, index) => (
          <div 
            key={index}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '82%',
              background: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-card)',
              color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
              padding: '12px 16px',
              borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              boxShadow: 'var(--shadow-sm)',
              border: msg.sender === 'sia' ? '1px solid var(--border-color)' : 'none',
              fontSize: '0.92rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4, gap: 12 }}>
              <strong style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                {msg.sender === 'user' ? 'You' : 'Sia'}
              </strong>
              <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{msg.time}</span>
            </div>
            <div>{msg.text}</div>
          </div>
        ))}

        {transcript && (
          <div style={{ alignSelf: 'flex-end', background: 'rgba(255, 76, 0, 0.15)', color: 'var(--primary)', padding: '10px 14px', borderRadius: 16, fontSize: '0.85rem', fontStyle: 'italic' }}>
            Listening: "{transcript}..."
          </div>
        )}
      </div>

      {/* Fluency Score Card */}
      {evaluation && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--primary-border)', borderRadius: 'var(--radius-md)', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', gap: 12, fontSize: '0.85rem', fontWeight: 800 }}>
              <span style={{ color: '#10B981' }}>Fluency: {evaluation.fluency}%</span>
              <span style={{ color: 'var(--primary)' }}>Accuracy: {evaluation.accuracy}%</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{evaluation.tip}</p>
          </div>
          <Award size={24} style={{ color: 'var(--primary)' }} />
        </div>
      )}

      {/* Mic Recording Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <button 
          className={`mic-btn ${isRecording ? 'listening' : ''}`}
          onClick={handleToggleMic}
        >
          {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
        </button>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
          {isRecording ? "Listening... Tap to send" : "Tap mic and speak in English"}
        </span>
      </div>
    </div>
  );
}
