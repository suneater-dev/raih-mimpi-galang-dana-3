import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [phoneEmail, setPhoneEmail] = useState('');

  const handleInputChange = (e) => {
    setPhoneEmail(e.target.value);
  };

  const handleLogin = () => {
    if (phoneEmail.trim().length > 0) {
      navigate('/bantuan-lainnya');
    }
  };

  const handleSocialLogin = (provider) => {
    navigate('/bantuan-lainnya');
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header gradient">
        <button className="back-arrow white-text" onClick={() => navigate('/')}>
          ←
        </button>
        <div className="header-title white-text">Masuk</div>
      </div>

      {/* Main Content */}
      <div className="modern-card">
        <h1 className="modern-heading">Masuk untuk mulai tolong-menolong sesama</h1>
        
        <input 
          type="text" 
          className="modern-input" 
          placeholder="Nomor WhatsApp atau Email"
          value={phoneEmail}
          onChange={handleInputChange}
          autoComplete="username"
        />
        
        <button 
          className={`modern-btn full-width ${phoneEmail.trim().length === 0 ? 'disabled' : ''}`}
          onClick={handleLogin}
          disabled={phoneEmail.trim().length === 0}
          style={{ 
            marginTop: '20px',
            opacity: phoneEmail.trim().length === 0 ? 0.5 : 1 
          }}
        >
          Masuk
        </button>
        
        <p className="modern-text text-center" style={{ marginTop: '24px' }}>
          Belum punya akun? {' '}
          <button
            className="register-link-modern"
            onClick={() => navigate('/bantuan-lainnya')}
          >
            Daftar
          </button>
        </p>
        
        <div className="divider-modern">
          <span>Atau lebih cepat</span>
        </div>
        
        <div className="social-buttons-modern">
          <button 
            className="modern-btn secondary full-width social-btn-modern"
            onClick={() => handleSocialLogin('apple')}
          >
            <span className="social-emoji">🍎</span>
            Masuk dengan Apple ID
          </button>
          
          <button 
            className="modern-btn secondary full-width social-btn-modern"
            onClick={() => handleSocialLogin('google')}
          >
            <span className="social-emoji google">G</span>
            Masuk dengan Google
          </button>
          
          <button 
            className="modern-btn secondary full-width social-btn-modern"
            onClick={() => handleSocialLogin('facebook')}
          >
            <span className="social-emoji facebook">f</span>
            Masuk dengan Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;