import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Volume2, Search, Sparkles, Bell, ShieldCheck, User, Compass, Calendar, Award, Smartphone, Mail, ArrowRight, KeyRound, Eye, EyeOff } from 'lucide-react';
import { LANGUAGES, getTranslation } from '../data/translations';
import { ONBOARDING_STEPS } from '../data/onboardingQuestions';
import { speechService } from '../services/speechService';
import confetti from 'canvas-confetti';

export function OnboardingFlow({ onComplete, soundEnabled, authUser, onLoginSuccess }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Inline Authentication State matching hand-drawn wireframe sketches & auth logic
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' | 'email'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [isVerifying, setIsVerifying] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loginFailedCount, setLoginFailedCount] = useState(0); // Track failed login attempts

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmailPhone, setResetEmailPhone] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  
  // User Onboarding State
  const [selectedLang, setSelectedLang] = useState('ta'); // Default to Tamil
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [profile, setProfile] = useState({ 
    name: authUser?.name || 'Gopi', 
    gender: 'Male', 
    age: '18-25' 
  });
  const [motivations, setMotivations] = useState([3, 4]);
  const [profession, setProfession] = useState(3);
  const [timeline, setTimeline] = useState(2);
  const [challenges, setChallenges] = useState([2, 4]);
  const [studyTime, setStudyTime] = useState(4);
  const [dailyTime, setDailyTime] = useState(3);
  const [supportStyle, setSupportStyle] = useState(0);

  const currentStep = ONBOARDING_STEPS[currentStepIndex];

  // Helper for dynamic translation
  const t = (key) => getTranslation(selectedLang, key);

  // 1. Splash Screen Timeout & Entrance Animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      // If user is ALREADY logged in, skip onboarding and go straight to Dashboard!
      if (authUser) {
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
      } else {
        if (soundEnabled) {
          speechService.speak("Login or Register to SpeakX. Enter your mobile number or email.");
        }
      }
    }, 2400);
    return () => clearTimeout(timer);
  }, [authUser]);

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

  // Auth Submit Handler matching exact user business logic requirement:
  // 1. Login success -> go to main dashboard
  // 2. Invalid User Name & Password -> error
  // 3. 2 Failed attempts -> auto redirect to Forgot Password!
  const handleAuthSubmit = (e) => {
    e.preventDefault();

    if (authMode === 'register') {
      // Registration logic
      if (!email.includes('@')) {
        setAuthError('Please enter a valid email address');
        return;
      }
      if (phoneNumber.length < 10) {
        setAuthError('Please enter a valid 10-digit mobile number');
        return;
      }
      if (!password || password.length < 4) {
        setAuthError('Please enter a password (min 4 characters)');
        return;
      }
      if (password !== confirmPassword) {
        setAuthError('Passwords do not match');
        return;
      }

      setAuthError('');
      setIsVerifying(true);

      setTimeout(() => {
        setIsVerifying(false);
        const user = {
          id: 'usr_' + Math.random().toString(36).substring(2, 8),
          name: email.split('@')[0],
          phone: `${countryCode} ${phoneNumber}`,
          email: email,
          authProvider: 'register'
        };
        onLoginSuccess(user);
        handleNext(); // Advance to language selection
      }, 600);

    } else {
      // LOGIN LOGIC
      const isPhoneValid = authMethod === 'phone' && phoneNumber.length === 10;
      const isEmailValid = authMethod === 'email' && email.includes('@');
      const isPasswordValid = password && password.length >= 4 && password !== 'wrong';

      if (!isPhoneValid && !isEmailValid) {
        setAuthError('Invalid User Name & Password');
        triggerFailedAttempt();
        return;
      }

      if (!isPasswordValid) {
        triggerFailedAttempt();
        return;
      }

      // LOGIN SUCCESS!
      setAuthError('');
      setLoginFailedCount(0);
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

        // Transition directly to Main Dashboard!
        confetti({ particleCount: 60 });
        onComplete({
          selectedLang,
          selectedLevel,
          profile: { ...profile, name: user.name },
          motivations,
          profession,
          timeline,
          challenges,
          studyTime,
          dailyTime,
          supportStyle
        });
      }, 600);
    }
  };

  const triggerFailedAttempt = () => {
    const nextCount = loginFailedCount + 1;
    setLoginFailedCount(nextCount);

    if (nextCount >= 2) {
      setAuthError('Invalid User Name & Password (2 Failed Attempts!). Redirecting to Forgot Password...');
      setTimeout(() => {
        setResetEmailPhone(authMethod === 'phone' ? `${countryCode} ${phoneNumber}` : email);
        setShowForgotModal(true);
        setLoginFailedCount(0);
      }, 800);
    } else {
      setAuthError(`Invalid User Name & Password (Attempt ${nextCount}/2)`);
    }
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

      // Direct transition to Main Dashboard on successful Google login!
      onComplete({
        selectedLang,
        selectedLevel,
        profile: { ...profile, name: googleUser.name },
        motivations,
        profession,
        timeline,
        challenges,
        studyTime,
        dailyTime,
        supportStyle
      });
    }, 500);
  };

  const handleSendPasswordReset = (e) => {
    e.preventDefault();
    if (!resetEmailPhone) return;
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      setShowForgotModal(false);
    }, 2000);
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

          {/* Top Right Audio Speaker Icon matching wireframe sketches! */}
          <button 
            className="icon-btn"
            onClick={() => speechService.speak(
              authMode === 'login' ? "Login to SpeakX" : "Register to SpeakX. Enter your mobile number, email, and password."
            )}
            title="Read Aloud"
          >
            <Volume2 size={20} />
          </button>
        </div>
      </div>

      {/* STEP 1: AUTHENTICATION SCREEN (LOGIN VS REGISTER MATCHING HAND-DRAWN SKETCHES!) */}
      {currentStep.id === 'auth' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
          {authMode === 'login' ? (
            /* ================= LOGIN PAGE (MATCHING WIREFRAME SKETCH #1!) ================= */
            <>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 2 }}>
                Login/Register to SpeakX
              </h2>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.35, marginBottom: 2 }}>
                Enter your mobile number or Email to save your progress & unlock live AI practice.
              </p>

              {/* Segmented Switcher [ Phone ] | [ Email ] */}
              <div className="mode-toggle-group" style={{ width: '100%', padding: '4px', background: 'var(--primary-light)', borderRadius: '24px' }}>
                <button 
                  className={`mode-btn ${authMethod === 'phone' ? 'active' : ''}`}
                  onClick={() => { setAuthMethod('phone'); setAuthError(''); }}
                  style={{ flex: 1, justifyContent: 'center', padding: '10px 16px', borderRadius: '20px', fontWeight: 700 }}
                >
                  <Smartphone size={16} /> Phone
                </button>
                <button 
                  className={`mode-btn ${authMethod === 'email' ? 'active' : ''}`}
                  onClick={() => { setAuthMethod('email'); setAuthError(''); }}
                  style={{ flex: 1, justifyContent: 'center', padding: '10px 16px', borderRadius: '20px', fontWeight: 700 }}
                >
                  <Mail size={16} /> Email
                </button>
              </div>

              <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
                {authMethod === 'phone' ? (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <select 
                      value={countryCode} 
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{
                        padding: '14px 10px',
                        borderRadius: 'var(--radius-md)',
                        border: '2px solid var(--border-color)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        background: 'var(--bg-card)'
                      }}
                    >
                      <option value="+91">IN +91 ∨</option>
                      <option value="+1">US +1 ∨</option>
                      <option value="+44">UK +44 ∨</option>
                    </select>
                    <input 
                      type="tel"
                      placeholder="Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      maxLength={10}
                      style={{
                        flex: 1,
                        padding: '14px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: '2px solid var(--border-color)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                ) : (
                  <input 
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid var(--border-color)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      fontFamily: 'inherit'
                    }}
                  />
                )}

                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 44px 14px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid var(--border-color)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      fontFamily: 'inherit'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: 14,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div style={{ textAlign: 'left', marginTop: -2 }}>
                  <button 
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-muted)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Forgot password
                  </button>
                </div>

                {authError && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#EF4444', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.84rem', fontWeight: 700 }}>
                    ⚠️ {authError}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="cta-button"
                  disabled={isVerifying}
                  style={{ padding: '16px', fontSize: '1.05rem', marginTop: 4 }}
                >
                  {isVerifying ? 'Authenticating...' : 'Login'}
                </button>
              </form>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '2px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }}></div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>or</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }}></div>
              </div>

              <button 
                className="option-card"
                onClick={handleGoogleAuth}
                style={{ justifyContent: 'center', gap: 10, padding: '14px', fontSize: '0.95rem', fontWeight: 700, borderRadius: '28px' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.01 10.05.01 12s.45 3.8 1.26 5.42l4.01-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                continue with google
              </button>

              <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: 8 }}>
                <button 
                  onClick={() => { setAuthMode('register'); setAuthError(''); }}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  without Account Go to Register
                </button>
              </div>
            </>
          ) : (
            /* ================= REGISTER PAGE (MATCHING WIREFRAME SKETCH #2!) ================= */
            <>
              {/* Header Title: Register to SpeakX */}
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 2 }}>
                Register to SpeakX
              </h2>

              {/* Subtitle from sketch */}
              <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.35, marginBottom: 4 }}>
                Enter your mobile number and Email and password to save your progress & unlock live AI practice.
              </p>

              <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* Field 1: Email */}
                <div>
                  <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid var(--border-color)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* Field 2: Row [ IN 91 v ] [ Number ] */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <select 
                    value={countryCode} 
                    onChange={(e) => setCountryCode(e.target.value)}
                    style={{
                      padding: '13px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid var(--border-color)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      background: 'var(--bg-card)'
                    }}
                  >
                    <option value="+91">IN 91 ∨</option>
                    <option value="+1">US 1 ∨</option>
                    <option value="+44">UK 44 ∨</option>
                  </select>
                  <input 
                    type="tel"
                    placeholder="Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    maxLength={10}
                    style={{
                      flex: 1,
                      padding: '13px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid var(--border-color)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* Field 3: Password */}
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '13px 44px 13px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid var(--border-color)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      fontFamily: 'inherit'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: 12,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Field 4: Confirm Password */}
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '13px 44px 13px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid var(--border-color)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      fontFamily: 'inherit'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: 12,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {authError && <span style={{ color: '#EF4444', fontSize: '0.8rem', fontWeight: 700 }}>{authError}</span>}

                {/* Main CTA Button: Continue pill button UPER */}
                <button 
                  type="submit" 
                  className="cta-button"
                  disabled={isVerifying}
                  style={{ padding: '16px', fontSize: '1.05rem', marginTop: '14px' }}
                >
                  {isVerifying ? 'Creating Account...' : 'Continue'}
                </button>
              </form>

              {/* Bottom Switch Link below CTA button */}
              <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: 10 }}>
                <button 
                  onClick={() => { setAuthMode('login'); setAuthError(''); }}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Already have an account? Login
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            width: '100%',
            maxWidth: '340px',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: 14
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Reset Password</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Enter your registered mobile number or email address to receive password reset instructions.
            </p>
            <input 
              type="text"
              placeholder="Mobile number or Email"
              value={resetEmailPhone}
              onChange={(e) => setResetEmailPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--border-color)',
                fontSize: '0.95rem'
              }}
            />
            {resetSuccess && (
              <span style={{ fontSize: '0.82rem', color: '#10B981', fontWeight: 700 }}>
                ✓ Reset link / OTP sent successfully!
              </span>
            )}
            <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
              <button className="cta-button" onClick={handleSendPasswordReset} style={{ padding: '12px' }}>
                Send Reset Link
              </button>
              <button className="option-card" onClick={() => setShowForgotModal(false)} style={{ padding: '12px', justifyContent: 'center' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: NATIVE LANGUAGE SELECTION */}
      {currentStep.id === 'language' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h2 className="question-title">{t(currentStep.titleKey)}</h2>
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
          <h2 className="question-title">{t(currentStep.titleKey)}</h2>
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
          <h2 className="question-title">{t(currentStep.titleKey)}</h2>
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
          <h2 className="question-title">{t(currentStep.titleKey)}</h2>
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
          <h2 className="question-title">{t(currentStep.titleKey)}</h2>
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
          <h2 className="question-title">{t(currentStep.titleKey)}</h2>
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
          <h2 className="question-title">{t(currentStep.titleKey)}</h2>
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
          <h2 className="question-title">{t(currentStep.titleKey)}</h2>
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
          <h2 className="question-title">{t(currentStep.titleKey)}</h2>
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
          <h2 className="question-title">{t(currentStep.titleKey)}</h2>
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
          <h2 className="question-title">{t(currentStep.titleKey)}</h2>
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
    </div>
  );
}
