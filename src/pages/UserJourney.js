import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserJourney.css';

function UserJourney() {
  const navigate = useNavigate();

  const handleFirstTime = () => {
    navigate('/user-type');
  };

  const handleReturning = () => {
    navigate('/bantuan-lainnya');
  };

  return (
    <div className="container">
      <header className="header gradient">
        <div className="back-arrow white-text" onClick={() => navigate(-1)}>←</div>
        <div className="logo white-text">RaihMimpi</div>
        <div className="header-spacer"></div>
      </header>

      <div className="content">
        {/* Header */}
        <div className="user-journey-header">
          <h1 className="user-journey-title">Pilih Jalur Anda</h1>
          <p className="user-journey-subtitle">
            Apakah ini pertama kali Anda galang dana?
          </p>
        </div>

        {/* Journey Options */}
        <div className="journey-options">
          {/* First Time User */}
          <button className="journey-card" onClick={handleFirstTime}>
            <div className="journey-icon">🆕</div>
            <div className="journey-content">
              <h3>Pertama Kali</h3>
              <p>Mulai dengan panduan lengkap dari awal</p>
            </div>
            <div className="journey-arrow">→</div>
          </button>

          {/* Returning User */}
          <button className="journey-card journey-card-highlight" onClick={handleReturning}>
            <div className="journey-icon">⚡</div>
            <div className="journey-content">
              <h3>Sudah Pernah</h3>
              <p>Lewati registrasi, langsung buat kampanye</p>
            </div>
            <div className="journey-arrow">→</div>
          </button>
        </div>

        {/* Info Note */}
        <div className="journey-info">
          <p>💡 Pilih "Sudah Pernah" jika Anda ingin membuat kampanye baru tanpa mengisi data ulang</p>
        </div>
      </div>
    </div>
  );
}

export default UserJourney;
