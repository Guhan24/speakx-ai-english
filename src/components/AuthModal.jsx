import React, { useState, useEffect } from 'react';
import { Smartphone, Mail, Lock, CheckCircle2, ArrowRight, ShieldCheck, LogOut, KeyRound } from 'lucide-react';
import { getTranslation } from '../data/translations';

export function AuthModal({ isOpen, onClose, onLoginSuccess, currentLang = 'en', initialUser = null }) {
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' | 'email'
  const [step, setStep] = useState('input'); // 'input' | 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Countdown timer for OTP
  useEffect(() => {
    let interval;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const t = (key) => getTranslation(currentLang, key);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (authMethod === 'phone') {
      if (phoneNumber.length < 10) {
        setErrorMsg('Please enter a valid 10-digit mobile number');
        return;
      }
    } else {
      if (!email.includes('@')) {
        setErrorMsg('Please enter a valid email address');
        return;
      }
    }
    setErrorMsg('');
    setStep('otp');
    setTimer(30);
    // Pre-fill mock OTP 5 8 2 4
    setOtp(['5', '8', '2', '4']);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      setErrorMsg('Please enter 4-digit verification code');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifying(false);
      const authenticatedUser = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        name: initialUser?.profile?.name || (authMethod === 'phone' ? `User (${phoneNumber.slice(-4)})` : email.split('@')[0]),
        phone: authMethod === 'phone' ? `${countryCode} ${phoneNumber}` : null,
        email: authMethod === 'email' ? email : null,
        authProvider: authMethod,
        loggedInAt: new Date().toISOString()
      };

      onLoginSuccess(authenticatedUser);
      onClose();
    }, 800);
  };

  const handleGoogleSignIn = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const googleUser = {
        id: 'usr_g_' + Math.random().toString(36).substring(2, 8),
        name: 'Gopi Krishna',
        email: 'gopi.speakx@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        authProvider: 'google',
        loggedInAt: new Date().toISOString()
      };
      onLoginSuccess(googleUser);
      onClose();
    }, 600);
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '20px'
    }}>
      <div style={{
        background: 'var(--bg-card)',
        width: '100%',
        maxWidth: '360px',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        animation: 'fadeIn 0.25s ease'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="brand-logo-icon" style={{ width: 28, height: 28, fontSize: 16 }}>S</div>
            <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--primary)' }}>
              SpeakX Authentication
            </strong>
          </div>
          <button 
            onClick={onClose}
            style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            ✕
          </button>
        </div>

        {step === 'input' ? (
          <>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 4 }}>
                Login to Save Progress 🚀
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Access your personalized streak, voice recordings & AI fluency profile anytime.
              </p>
            </div>

            {/* Auth Method Toggle */}
            <div className="mode-toggle-group" style={{ width: '100%' }}>
              <button 
                className={`mode-btn ${authMethod === 'phone' ? 'active' : ''}`}
                onClick={() => { setAuthMethod('phone'); setErrorMsg(''); }}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Smartphone size={15} /> Phone
              </button>
              <button 
                className={`mode-btn ${authMethod === 'email' ? 'active' : ''}`}
                onClick={() => { setAuthMethod('email'); setErrorMsg(''); }}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Mail size={15} /> Email
              </button>
            </div>

            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {authMethod === 'phone' ? (
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                    Mobile Number
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <select 
                      value={countryCode} 
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{
                        padding: '12px 8px',
                        borderRadius: 'var(--radius-md)',
                        border: '2px solid var(--border-color)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        background: 'var(--bg-main)'
                      }}
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+971">🇦🇪 +971</option>
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
                        fontWeight: 700,
                        letterSpacing: '1px'
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                    Email Address
                  </label>
                  <input 
                    type="email"
                    placeholder="gopi@example.com"
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
                </div>
              )}

              {errorMsg && (
                <span style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 600 }}>{errorMsg}</span>
              )}

              <button type="submit" className="cta-button" style={{ padding: '14px', fontSize: '0.95rem', marginTop: 4 }}>
                Get Verification Code <ArrowRight size={18} style={{ verticalAlign: 'middle', marginLeft: 4 }} />
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }}></div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }}></div>
            </div>

            {/* Social Login Button */}
            <button 
              className="option-card"
              onClick={handleGoogleSignIn}
              style={{ justifyContent: 'center', gap: 10, padding: '12px', fontSize: '0.9rem' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.01 10.05.01 12s.45 3.8 1.26 5.42l4.01-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              Continue with Google
            </button>
          </>
        ) : (
          /* OTP Verification Step */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'center' }}>
            <KeyRound size={36} style={{ color: 'var(--primary)', margin: '0 auto' }} />
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Enter 4-Digit OTP</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
                Sent to <strong>{authMethod === 'phone' ? `${countryCode} ${phoneNumber}` : email}</strong>
              </p>
            </div>

            {/* OTP Boxes */}
            <div style={{ display: 'flex', justifySelf: 'center', gap: 12, margin: '10px 0' }}>
              {otp.map((digit, idx) => (
                <input 
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  style={{
                    width: '54px',
                    height: '58px',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid var(--primary)',
                    textAlign: 'center',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    background: 'var(--primary-light)',
                    color: 'var(--primary)'
                  }}
                />
              ))}
            </div>

            {errorMsg && (
              <span style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 600 }}>{errorMsg}</span>
            )}

            <button 
              className="cta-button"
              onClick={handleVerifyOtp}
              disabled={isVerifying}
              style={{ padding: '14px', fontSize: '0.95rem' }}
            >
              {isVerifying ? 'Verifying OTP...' : 'Verify & Continue 🚀'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <button 
                onClick={() => setStep('input')}
                style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
              >
                Change Number
              </button>
              <span>
                {timer > 0 ? `Resend in ${timer}s` : (
                  <button 
                    onClick={() => setTimer(30)}
                    style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Resend OTP
                  </button>
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
