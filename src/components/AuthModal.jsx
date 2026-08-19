import React, { useState } from 'react';
import { Smartphone, Mail, Lock, ArrowRight, Eye, EyeOff, Volume2 } from 'lucide-react';
import { speechService } from '../services/speechService';

export function AuthModal({ isOpen, onClose, onLoginSuccess, currentLang = 'en', initialUser = null }) {
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' | 'email'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetInput, setResetInput] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAuthSubmit = (e) => {
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

    if (!password || password.length < 4) {
      setErrorMsg('Please enter your password (min 4 characters)');
      return;
    }

    setErrorMsg('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      const user = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        name: initialUser?.profile?.name || (authMethod === 'phone' ? `User (${phoneNumber.slice(-4)})` : email.split('@')[0]),
        phone: authMethod === 'phone' ? `${countryCode} ${phoneNumber}` : null,
        email: authMethod === 'email' ? email : null,
        authProvider: authMethod,
        loggedInAt: new Date().toISOString()
      };

      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const googleUser = {
        id: 'usr_g_' + Math.random().toString(36).substring(2, 8),
        name: 'Gopi Krishna',
        email: 'gopi.speakx@gmail.com',
        authProvider: 'google',
        loggedInAt: new Date().toISOString()
      };
      onLoginSuccess(googleUser);
      onClose();
    }, 500);
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
        maxWidth: '370px',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        animation: 'fadeIn 0.25s ease'
      }}>
        {/* Header matching wireframe with audio button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="brand-logo-icon" style={{ width: 26, height: 26, fontSize: 15 }}>S</div>
            <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--primary)' }}>
              SpeakX
            </strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button 
              className="icon-btn" 
              style={{ width: 32, height: 32 }}
              onClick={() => speechService.speak("Login or Register to SpeakX")}
            >
              <Volume2 size={16} />
            </button>
            <button 
              onClick={onClose}
              style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Title matching wireframe */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 900, marginBottom: 2 }}>
            {authMode === 'login' ? 'Login/Register to SpeakX' : 'Register to SpeakX'}
          </h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
            Enter your mobile number or Email to save your progress & unlock live AI practice.
          </p>
        </div>

        {/* Segmented Switcher [Phone] [Email] */}
        <div className="mode-toggle-group" style={{ width: '100%', padding: '4px', background: 'var(--primary-light)', borderRadius: '24px' }}>
          <button 
            className={`mode-btn ${authMethod === 'phone' ? 'active' : ''}`}
            onClick={() => { setAuthMethod('phone'); setErrorMsg(''); }}
            style={{ flex: 1, justifyContent: 'center', padding: '8px 14px', borderRadius: '20px', fontWeight: 700 }}
          >
            <Smartphone size={15} /> Phone
          </button>
          <button 
            className={`mode-btn ${authMethod === 'email' ? 'active' : ''}`}
            onClick={() => { setAuthMethod('email'); setErrorMsg(''); }}
            style={{ flex: 1, justifyContent: 'center', padding: '8px 14px', borderRadius: '20px', fontWeight: 700 }}
          >
            <Mail size={15} /> Email
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Row 1: [IN +91 v] [Number] */}
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
                  fontSize: '0.88rem'
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
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--border-color)',
                  fontSize: '0.95rem',
                  fontWeight: 700
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
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--border-color)',
                fontSize: '0.92rem',
                fontWeight: 600
              }}
            />
          )}

          {/* Row 2: [ Password ] */}
          <div style={{ position: 'relative' }}>
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 40px 12px 14px',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--border-color)',
                fontSize: '0.92rem',
                fontWeight: 600
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

          {/* Forgot Password Link */}
          <div style={{ textAlign: 'left', marginTop: -2 }}>
            <button 
              type="button"
              onClick={() => setShowForgotModal(true)}
              style={{
                border: 'none',
                background: 'transparent',
                color: 'var(--text-muted)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Forgot password
            </button>
          </div>

          {errorMsg && <span style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 600 }}>{errorMsg}</span>}

          {/* Switch Link UPER (above CTA button) */}
          <div style={{ textAlign: 'center', margin: '4px 0 2px 0' }}>
            {authMode === 'login' ? (
              <button 
                type="button"
                onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                without Account Go to Register
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Already have an account? Login
              </button>
            )}
          </div>

          <button type="submit" className="cta-button" disabled={isVerifying} style={{ padding: '14px', fontSize: '0.95rem' }}>
            {isVerifying ? 'Authenticating...' : (authMode === 'login' ? 'Login' : 'Continue')}
          </button>
        </form>

        {/* Divider: or */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '2px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }}></div>
        </div>

        {/* Social button: continue with google */}
        <button 
          className="option-card"
          onClick={handleGoogleSignIn}
          style={{ justifyContent: 'center', gap: 10, padding: '12px', fontSize: '0.9rem', fontWeight: 700, borderRadius: '28px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.01 10.05.01 12s.45 3.8 1.26 5.42l4.01-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          continue with google
        </button>
      </div>

      {/* Forgot Password Sub-Modal */}
      {showForgotModal && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 300,
          padding: 20
        }}>
          <div style={{ background: 'var(--bg-card)', padding: 20, borderRadius: 16, width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h4 style={{ fontWeight: 800 }}>Forgot Password</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Enter your Mobile number or Email to receive reset code.</p>
            <input 
              type="text"
              placeholder="Mobile number or Email"
              value={resetInput}
              onChange={(e) => setResetInput(e.target.value)}
              style={{ padding: '10px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
            />
            {resetSuccess && <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700 }}>✓ Reset instructions sent!</span>}
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button className="cta-button" style={{ padding: 10, fontSize: '0.85rem' }} onClick={() => { setResetSuccess(true); setTimeout(() => { setResetSuccess(false); setShowForgotModal(false); }, 1500); }}>Send</button>
              <button className="option-card" style={{ padding: 10, fontSize: '0.85rem', justifyContent: 'center' }} onClick={() => setShowForgotModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
