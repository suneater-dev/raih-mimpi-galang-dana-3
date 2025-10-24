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
          <h1 className="user-journey-title">Apakah ini pertama kali Anda menggunakan platform ini?</h1>
        </div>

        {/* Journey Options */}
        <div className="journey-options">
          {/* First Time User */}
          <button className="journey-card" onClick={handleFirstTime}>
            <div className="journey-content">
              <h3>Galang Dana Pertama</h3>
              <p>Panduan lengkap untuk kampanye pertama</p>
            </div>
            <div className="journey-arrow">→</div>
          </button>

          {/* Returning User */}
          <button className="journey-card" onClick={handleReturning}>
            <div className="journey-content">
              <h3>Lanjutkan Galang Dana</h3>
              <p>Lewati panduan, mulai kampanye lagi</p>
            </div>
            <div className="journey-arrow">→</div>
          </button>
        </div>

        {/* Info Note */}
        <div className="journey-info">
          <p>💡 Pilih "Lanjutkan Galang Dana" untuk lewati panduan dan langsung mulai kampanye baru.</p>
        </div>
      </div>
    </div>
  );
}

export default UserJourney;
