import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Volume2, Search, Sparkles, Bell, ShieldCheck, User, Compass, Calendar, Award } from 'lucide-react';
import { LANGUAGES, getTranslation } from '../data/translations';
import { ONBOARDING_STEPS } from '../data/onboardingQuestions';
import { speechService } from '../services/speechService';
import confetti from 'canvas-confetti';

export function OnboardingFlow({ onComplete, soundEnabled }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // User Onboarding State
  const [selectedLang, setSelectedLang] = useState('ta'); // Default to Tamil like in video, or English
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [profile, setProfile] = useState({ name: 'Gopi', gender: 'Male', age: '18-25' });
  const [motivations, setMotivations] = useState([3, 4]); // Daily English, Job interviews
  const [profession, setProfession] = useState(3); // Student
  const [timeline, setTimeline] = useState(2); // 6 Months
  const [challenges, setChallenges] = useState([2, 4]); // Sentence structure, Grammar rules
  const [studyTime, setStudyTime] = useState(4); // Before sleep
  const [dailyTime, setDailyTime] = useState(3); // 1 hour+
  const [supportStyle, setSupportStyle] = useState(0); // Strict reminders

  const currentStep = ONBOARDING_STEPS[currentStepIndex];

  // Helper for dynamic translation
  const t = (key) => getTranslation(selectedLang, key);

  // Splash screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      if (soundEnabled) {
        speechService.speak(getTranslation('en', 'langQuestion'));
      }
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Voice narration whenever step changes
  useEffect(() => {
    if (!showSplash && soundEnabled && currentStep) {
      let speechText = t(currentStep.titleKey);
      speechService.speak(speechText, selectedLang === 'en' ? 'en-US' : 'en-US');
    }
  }, [currentStepIndex, showSplash, selectedLang]);

  const handleNext = () => {
    if (currentStepIndex < ONBOARDING_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Onboarding complete!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      onComplete({
        selectedLang,
        selectedLevel,
        profile,
        motivations,
        profession,
        timeline,
        challenges,
        studyTime,
        dailyTime,
        supportStyle
      });
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  if (showSplash) {
    return (
      <div className="splash-container">
        <div className="splash-logo">S</div>
        <h1 className="splash-title">SpeakX</h1>
        <p className="splash-tagline">KEY TO CONFIDENCE</p>
        <div style={{ marginTop: '30px', display: 'flex', gap: '8px' }}>
          <div className="voice-wave-dot" style={{ position: 'static', animation: 'pulse 1s infinite' }}></div>
          <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>Loading personalized AI tutor...</span>
        </div>
      </div>
    );
  }

  // Filter languages for search
  const filteredLanguages = LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const progressPercent = Math.round(((currentStepIndex + 1) / ONBOARDING_STEPS.length) * 100);

  return (
    <div className="onboarding-screen">
      {/* Header & Progress Bar */}
      <div className="onboarding-header">
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>

        <div className="step-nav">
          {currentStepIndex > 0 ? (
            <button className="icon-btn" onClick={handleBack}>
              <ArrowLeft size={20} />
            </button>
          ) : (
            <div style={{ width: 38 }}></div>
          )}

          <button 
            className="icon-btn"
            onClick={() => speechService.speak(t(currentStep.titleKey))}
          >
            <Volume2 size={20} />
          </button>
        </div>
      </div>

      {/* Question Title */}
      <h2 className="question-title">{t(currentStep.titleKey)}</h2>

      {/* Step Content rendering */}

      {/* STEP 1: Language Selection */}
      {currentStep.id === 'language' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search size={18} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search language..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-color)',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div className="option-list" style={{ flex: 1, maxHeight: '420px' }}>
            {filteredLanguages.map((lang) => (
              <div 
                key={lang.id}
                className={`option-card ${selectedLang === lang.id ? 'selected' : ''}`}
                onClick={() => setSelectedLang(lang.id)}
              >
                <span>{lang.name} / {lang.englishName}</span>
                <div className="radio-check">
                  {selectedLang === lang.id && <Check size={14} />}
                </div>
              </div>
            ))}
          </div>

          <button className="cta-button" onClick={handleNext} style={{ marginTop: '16px' }}>
            {t('continue')}
          </button>
        </div>
      )}

      {/* STEP 2: English Level Assessment */}
      {currentStep.id === 'level' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="option-list" style={{ flex: 1 }}>
            {t('levelOptions').map((opt, idx) => (
              <div 
                key={idx}
                className={`option-card ${selectedLevel === idx ? 'selected' : ''}`}
                onClick={() => setSelectedLevel(idx)}
              >
                <span style={{ paddingRight: '12px' }}>{opt}</span>
                <div className="radio-check">
                  {selectedLevel === idx && <Check size={14} />}
                </div>
              </div>
            ))}
          </div>

          <button className="cta-button" onClick={handleNext}>
            {t('continue')}
          </button>
        </div>
      )}

      {/* STEP 3: Profile Form */}
      {currentStep.id === 'profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: 6 }}>
              {t('nameLabel')}
            </label>
            <input 
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder={t('namePlaceholder')}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--border-color)',
                fontSize: '1rem',
                fontFamily: 'inherit',
                fontWeight: 600
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: 6 }}>
              {t('genderLabel')}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {['Male', 'Female'].map((g) => (
                <div 
                  key={g}
                  className={`option-card ${profile.gender === g ? 'selected' : ''}`}
                  onClick={() => setProfile({ ...profile, gender: g })}
                  style={{ justifyContent: 'center' }}
                >
                  <span>{g === 'Male' ? t('genderMale') : t('genderFemale')}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: 6 }}>
              {t('ageLabel')}
            </label>
            <div className="grid-options">
              {currentStep.ageRanges.map((age) => (
                <div 
                  key={age}
                  className={`grid-pill ${profile.age === age ? 'selected' : ''}`}
                  onClick={() => setProfile({ ...profile, age })}
                >
                  {age}
                </div>
              ))}
            </div>
          </div>

          <button className="cta-button" onClick={handleNext} style={{ marginTop: 'auto' }}>
            {t('continue')}
          </button>
        </div>
      )}

      {/* STEP 4: Motivation */}
      {currentStep.id === 'motivation' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="option-list" style={{ flex: 1, maxHeight: '420px' }}>
            {t('motivationOptions').map((opt, idx) => {
              const isSelected = motivations.includes(idx);
              return (
                <div 
                  key={idx}
                  className={`option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    if (isSelected) {
                      setMotivations(motivations.filter(i => i !== idx));
                    } else {
                      setMotivations([...motivations, idx]);
                    }
                  }}
                >
                  <span>{opt}</span>
                  <div className="radio-check">
                    {isSelected && <Check size={14} />}
                  </div>
                </div>
              );
            })}
          </div>

          <button className="cta-button" onClick={handleNext} style={{ marginTop: '16px' }}>
            {t('continue')}
          </button>
        </div>
      )}

      {/* STEP 5: Profession */}
      {currentStep.id === 'profession' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="option-list" style={{ flex: 1, maxHeight: '420px' }}>
            {t('professionOptions').map((opt, idx) => (
              <div 
                key={idx}
                className={`option-card ${profession === idx ? 'selected' : ''}`}
                onClick={() => setProfession(idx)}
              >
                <span>{opt}</span>
                <div className="radio-check">
                  {profession === idx && <Check size={14} />}
                </div>
              </div>
            ))}
          </div>

          <button className="cta-button" onClick={handleNext} style={{ marginTop: '16px' }}>
            {t('continue')}
          </button>
        </div>
      )}

      {/* STEP 6: Target Timeline */}
      {currentStep.id === 'timeline' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="option-list" style={{ flex: 1 }}>
            {t('timelineOptions').map((opt, idx) => (
              <div 
                key={idx}
                className={`option-card ${timeline === idx ? 'selected' : ''}`}
                onClick={() => setTimeline(idx)}
              >
                <span>{opt}</span>
                <div className="radio-check">
                  {timeline === idx && <Check size={14} />}
                </div>
              </div>
            ))}
          </div>

          <button className="cta-button" onClick={handleNext}>
            {t('continue')}
          </button>
        </div>
      )}

      {/* STEP 7: Challenges */}
      {currentStep.id === 'challenge' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="option-list" style={{ flex: 1, maxHeight: '420px' }}>
            {t('challengeOptions').map((opt, idx) => {
              const isSelected = challenges.includes(idx);
              return (
                <div 
                  key={idx}
                  className={`option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    if (isSelected) {
                      setChallenges(challenges.filter(i => i !== idx));
                    } else {
                      setChallenges([...challenges, idx]);
                    }
                  }}
                >
                  <span>{opt}</span>
                  <div className="radio-check">
                    {isSelected && <Check size={14} />}
                  </div>
                </div>
              );
            })}
          </div>

          <button className="cta-button" onClick={handleNext} style={{ marginTop: '16px' }}>
            {t('continue')}
          </button>
        </div>
      )}

      {/* STEP 8: Study Time */}
      {currentStep.id === 'studyTime' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="option-list" style={{ flex: 1 }}>
            {t('studyTimeOptions').map((opt, idx) => (
              <div 
                key={idx}
                className={`option-card ${studyTime === idx ? 'selected' : ''}`}
                onClick={() => setStudyTime(idx)}
              >
                <span>{opt}</span>
                <div className="radio-check">
                  {studyTime === idx && <Check size={14} />}
                </div>
              </div>
            ))}
          </div>

          <button className="cta-button" onClick={handleNext}>
            {t('continue')}
          </button>
        </div>
      )}

      {/* STEP 9: Daily Time */}
      {currentStep.id === 'dailyTime' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="option-list" style={{ flex: 1 }}>
            {t('dailyTimeOptions').map((opt, idx) => (
              <div 
                key={idx}
                className={`option-card ${dailyTime === idx ? 'selected' : ''}`}
                onClick={() => setDailyTime(idx)}
              >
                <span>{opt}</span>
                <div className="radio-check">
                  {dailyTime === idx && <Check size={14} />}
                </div>
              </div>
            ))}
          </div>

          <button className="cta-button" onClick={handleNext}>
            {t('continue')}
          </button>
        </div>
      )}

      {/* STEP 10: Support Style */}
      {currentStep.id === 'supportStyle' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="option-list" style={{ flex: 1 }}>
            {t('supportOptions').map((opt, idx) => (
              <div 
                key={idx}
                className={`option-card ${supportStyle === idx ? 'selected' : ''}`}
                onClick={() => setSupportStyle(idx)}
              >
                <span>{opt}</span>
                <div className="radio-check">
                  {supportStyle === idx && <Check size={14} />}
                </div>
              </div>
            ))}
          </div>

          <button className="cta-button" onClick={handleNext}>
            {t('continue')}
          </button>
        </div>
      )}

      {/* STEP 11: Notification / Habit Reminder */}
      {currentStep.id === 'habitReminder' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '12px' }}>
          <div style={{
            background: 'var(--bg-card)',
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '30px',
            width: '100%'
          }}>
            <Bell size={42} style={{ color: 'var(--primary)', marginBottom: 12 }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8 }}>
              {t('allowNotifications')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
              <button 
                className="cta-button" 
                onClick={handleNext}
                style={{ padding: '12px', fontSize: '0.95rem' }}
              >
                {t('allowBtn')}
              </button>
              <button 
                className="option-card"
                onClick={handleNext}
                style={{ justifyContent: 'center', padding: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}
              >
                {t('dontAllowBtn')}
              </button>
            </div>
          </div>

          <button className="cta-button" onClick={handleNext} style={{ marginTop: 'auto' }}>
            {t('remindBtn')}
          </button>
        </div>
      )}

      {/* STEP 12: AI Coach Sia Welcome Screen & Personalized Profile Summary */}
      {currentStep.id === 'profileSummary' && (
        <div className="ai-summary-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="avatar-wrapper">
            <img 
              src="/sia_coach.jpg" 
              alt="AI English Coach Sia" 
              className="avatar-img" 
            />
            <div className="voice-wave-dot"></div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
            {t('summaryWelcome')} <span style={{ color: 'var(--text-main)' }}>{profile.name}!</span>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 16 }}>
            {t('summarySubtitle')}
          </p>

          <div className="summary-carousel">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Sparkles size={20} style={{ color: 'var(--primary)' }} />
              <strong style={{ fontSize: '0.95rem' }}>Personalized Learning Plan:</strong>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.88rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Check size={16} style={{ color: '#10B981' }} />
                <span>Target: <strong>{t('timelineOptions')[timeline]}</strong></span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Check size={16} style={{ color: '#10B981' }} />
                <span>Daily Commitment: <strong>{t('dailyTimeOptions')[dailyTime]}</strong></span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Check size={16} style={{ color: '#10B981' }} />
                <span>Primary Goal: <strong>{t('motivationOptions')[motivations[0] || 0]}</strong></span>
              </li>
            </ul>
          </div>

          <button 
            className="cta-button" 
            onClick={handleNext}
            style={{ marginTop: 'auto', background: 'linear-gradient(135deg, #FF4C00 0%, #E04300 100%)' }}
          >
            🚀 {t('startJourney')}
          </button>
        </div>
      )}
    </div>
  );
}
