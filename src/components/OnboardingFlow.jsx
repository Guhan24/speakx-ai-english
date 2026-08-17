import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Volume2, Search, Sparkles, Bell, ShieldCheck, User, Compass, Calendar, Award, Smartphone, Mail, ArrowRight, KeyRound } from 'lucide-react';
import { LANGUAGES, getTranslation } from '../data/translations';
import { ONBOARDING_STEPS } from '../data/onboardingQuestions';
import { speechService } from '../services/speechService';
import confetti from 'canvas-confetti';

export function OnboardingFlow({ onComplete, soundEnabled, authUser, onLoginSuccess }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Inline Authentication State inside Onboarding Step 1
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' | 'email'
  const [authStep, setAuthStep] = useState('input'); // 'input' | 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState(['5', '8', '2', '4']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [authError, setAuthError] = useState('');
  
  // User Onboarding State
  const [selectedLang, setSelectedLang] = useState('ta'); // Default to Tamil like in video
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [profile, setProfile] = useState({ 
    name: authUser?.name || 'Gopi', 
    gender: 'Male', 
    age: '18-25' 
  });
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

  // 1. Splash Screen Timeout & Entrance Animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      // If user is ALREADY logged in, skip step 0 (auth) and go straight to step 1 (language selection)!
      if (authUser) {
        setCurrentStepIndex(1);
        if (soundEnabled) {
          speechService.speak(getTranslation('en', 'langQuestion'));
        }
      } else {
        if (soundEnabled) {
          speechService.speak("Welcome to SpeakX. Please login or register to begin your journey.");
        }
      }
    }, 2400);
    return () => clearTimeout(timer);
  }, [authUser]);

  // If user logs in during step 0, automatically advance to language selection
  useEffect(() => {
    if (authUser && currentStepIndex === 0 && !showSplash) {
      setCurrentStepIndex(1);
    }
  }, [authUser, currentStepIndex, showSplash]);

  // Update profile name if authUser changes
  useEffect(() => {
    if (authUser && authUser.name) {
      setProfile(prev => ({ ...prev, name: authUser.name }));
    }
  }, [authUser]);

  // Voice narration whenever step changes
  useEffect(() => {
    if (!showSplash && soundEnabled && currentStep) {
      let speechText = t(currentStep.titleKey);
      speechService.speak(speechText);
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

  // Auth Handlers inside Onboarding
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (authMethod === 'phone') {
      if (phoneNumber.length < 10) {
        setAuthError('Please enter a valid 10-digit mobile number');
        return;
      }
    } else {
      if (!email.includes('@')) {
        setAuthError('Please enter a valid email address');
        return;
      }
    }
    setAuthError('');
    setAuthStep('otp');
  };

  const handleVerifyOtp = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const user = {
        id: 'usr_' + Math.random().toString(36).substring(2, 8),
        name: authMethod === 'phone' ? `Gopi (${phoneNumber.slice(-4)})` : email.split('@')[0],
        phone: authMethod === 'phone' ? `${countryCode} ${phoneNumber}` : null,
        email: authMethod === 'email' ? email : null,
        authProvider: authMethod
      };
      onLoginSuccess(user);
      handleNext(); // Move directly to Native Language Selection!
    }, 600);
  };

  const handleGoogleAuth = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const googleUser = {
        id: 'g_' + Math.random().toString(36).substring(2, 8),
        name: 'Gopi Krishna',
        email: 'gopi.speakx@gmail.com',
        authProvider: 'google'
      };
      onLoginSuccess(googleUser);
      handleNext(); // Move directly to Native Language Selection!
    }, 500);
  };

  // 1. SPLASH SCREEN & LOGO ANIMATION
  if (showSplash) {
    return (
      <div className="splash-container">
        <div className="splash-logo" style={{ animation: 'pulse 1.5s infinite' }}>S</div>
        <h1 className="splash-title">SpeakX</h1>
        <p className="splash-tagline">KEY TO CONFIDENCE</p>
        <div style={{ marginTop: '36px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="voice-wave-dot" style={{ position: 'static', animation: 'pulse 1s infinite' }}></div>
          <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>Initializing SpeakX AI Platform...</span>
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

      {/* STEP 1: LOGIN & AUTHENTICATION (Right after Splash!) */}
      {currentStep.id === 'auth' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '14px' }}>
          {authStep === 'input' ? (
                <>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                    Enter your mobile number or email to save your progress & unlock live AI practice.
                  </p>

                  <div className="mode-toggle-group" style={{ width: '100%' }}>
                    <button 
                      className={`mode-btn ${authMethod === 'phone' ? 'active' : ''}`}
                      onClick={() => setAuthMethod('phone')}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <Smartphone size={15} /> Phone
                    </button>
                    <button 
                      className={`mode-btn ${authMethod === 'email' ? 'active' : ''}`}
                      onClick={() => setAuthMethod('email')}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <Mail size={15} /> Email
                    </button>
                  </div>

                  <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {authMethod === 'phone' ? (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <select 
                          value={countryCode} 
                          onChange={(e) => setCountryCode(e.target.value)}
                          style={{
                            padding: '12px 8px',
                            borderRadius: 'var(--radius-md)',
                            border: '2px solid var(--border-color)',
                            fontWeight: 700,
                            fontSize: '0.9rem'
                          }}
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                        </select>
                        <input 
                          type="tel"
                          placeholder="98765 43210"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                          maxLength={10}
                          style={{
                            flex: 1,
                            padding: '12px 14px',
                            borderRadius: 'var(--radius-md)',
                            border: '2px solid var(--border-color)',
                            fontSize: '1rem',
                            fontWeight: 700
                          }}
                        />
                      </div>
                    ) : (
                      <input 
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: 'var(--radius-md)',
                          border: '2px solid var(--border-color)',
                          fontSize: '0.95rem',
                          fontWeight: 600
                        }}
                      />
                    )}

                    {authError && <span style={{ color: '#EF4444', fontSize: '0.8rem', fontWeight: 600 }}>{authError}</span>}

                    <button type="submit" className="cta-button">
                      Get Verification Code <ArrowRight size={18} style={{ verticalAlign: 'middle' }} />
                    </button>
                  </form>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '2px 0' }}>
                    <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }}></div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>OR</span>
                    <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }}></div>
                  </div>

                  <button 
                    className="option-card"
                    onClick={handleGoogleAuth}
                    style={{ justifyContent: 'center', gap: 10, padding: '12px', fontSize: '0.9rem' }}
                  >
                    Continue with Google
                  </button>

                  <button 
                    onClick={handleNext}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-muted)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginTop: 'auto',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Skip & Continue as Guest →
                  </button>
                </>
              ) : (
                /* OTP Step */
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'center' }}>
                  <KeyRound size={36} style={{ color: 'var(--primary)', margin: '0 auto' }} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Enter 4-Digit Verification Code</h3>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                    {otp.map((d, idx) => (
                      <input 
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={d}
                        readOnly
                        style={{
                          width: '50px',
                          height: '54px',
                          borderRadius: 'var(--radius-md)',
                          border: '2px solid var(--primary)',
                          textAlign: 'center',
                          fontSize: '1.3rem',
                          fontWeight: 800,
                          background: 'var(--primary-light)',
                          color: 'var(--primary)'
                        }}
                      />
                    ))}
                  </div>

                  <button className="cta-button" onClick={handleVerifyOtp} disabled={isVerifying}>
                    {isVerifying ? 'Verifying OTP...' : 'Verify OTP & Continue'}
                  </button>
                </div>
              )}
        </div>
      )}

      {/* STEP 2: NATIVE LANGUAGE SELECTION (Right after Auth!) */}
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

      {/* STEP 3: English Level Assessment */}
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

      {/* STEP 4: Profile Form */}
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

      {/* STEP 5: Motivation */}
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

      {/* STEP 6: Profession */}
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

      {/* STEP 7: Target Timeline */}
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

      {/* STEP 8: Challenges */}
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

      {/* STEP 9: Study Time */}
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

      {/* STEP 10: Daily Time */}
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

      {/* STEP 11: Support Style */}
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

      {/* STEP 12: Notification / Habit Reminder */}
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

      {/* STEP 13: AI Coach Sia Welcome Screen & Personalized Profile Summary */}
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
