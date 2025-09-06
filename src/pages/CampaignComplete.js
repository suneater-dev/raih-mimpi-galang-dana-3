import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CampaignComplete.css';

const CampaignComplete = () => {
  const navigate = useNavigate();

  const handleViewCampaign = () => {
    navigate('/dashboard');
  };

  const handleCreateAnother = () => {
    navigate('/select-category');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleGoHome} aria-label="Go back">
          ←
        </button>
        <div className="logo white-text">RaihMimpi</div>
        <div className="header-spacer"></div>
      </header>

      {/* Success Content */}
      <div className="modern-card" style={{margin: '20px', textAlign: 'center'}}>
        <div className="success-icon-modern">
          <div className="checkmark-circle-modern">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#10B981" stroke="#10B981" strokeWidth="2"/>
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="success-content-modern">
          <h2 className="modern-heading" style={{marginBottom: '16px'}}>Galang dana berhasil dibuat!</h2>
          <p className="modern-text" style={{marginBottom: '32px', color: '#6B7280'}}>
            Galang dana Anda telah berhasil dibuat dan sedang dalam proses review oleh tim kami. 
            Anda akan mendapat notifikasi melalui email ketika galang dana sudah aktif dan dapat menerima donasi.
          </p>
        </div>

        <div className="campaign-info-modern">
          <div className="info-item-modern">
            <span className="modern-text" style={{fontWeight: '600'}}>Status:</span>
            <span className="status-badge-modern reviewing">Sedang direview</span>
          </div>
          <div className="info-item-modern">
            <span className="modern-text" style={{fontWeight: '600'}}>Estimasi waktu review:</span>
            <span className="modern-text">1-2 hari kerja</span>
          </div>
        </div>

        <div className="next-steps-modern">
          <h4 className="modern-subheading" style={{marginBottom: '16px'}}>Langkah selanjutnya:</h4>
          <ul className="steps-list-modern">
            <li className="modern-text">Tim kami akan mereview informasi galang dana Anda</li>
            <li className="modern-text">Anda akan mendapat email konfirmasi setelah review selesai</li>
            <li className="modern-text">Galang dana akan aktif dan siap menerima donasi</li>
            <li className="modern-text">Bagikan galang dana ke keluarga, teman, dan media sosial</li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-section-modern">
        <div className="action-buttons-vertical" style={{marginBottom: '20px'}}>
          <button className="modern-btn" onClick={handleViewCampaign} style={{marginBottom: '12px'}}>
            Lihat Galang Dana
          </button>
          <button className="modern-btn secondary" onClick={handleCreateAnother}>
            Buat Galang Dana Lain
          </button>
        </div>
        
        <div className="save-later-modern">
          <button className="save-later-btn-modern" onClick={handleGoHome}>
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignComplete;