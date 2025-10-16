import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SyaratKetentuanIklan.css';

const SyaratKetentuanIklan = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleNext = () => {
    navigate('/iklankan-campaign');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Syarat & Ketentuan</div>
      </header>

      {/* Content Section */}
      <div className="syarat-content-section">
        <div className="syarat-card">
          {/* Icon */}
          <div className="syarat-icon-container">
            <div className="syarat-icon">📋</div>
          </div>

          {/* Title */}
          <h1 className="syarat-title">Syarat & Ketentuan</h1>

          {/* Description */}
          <p className="syarat-description">
            Untuk menggunakan layanan promosi ini, Anda perlu:
          </p>

          {/* Requirements List */}
          <ul className="syarat-list">
            <li className="syarat-item">
              <div className="bullet-point"></div>
              <span className="syarat-text">
                Memiliki akun Raih Mimpi yang terverifikasi
              </span>
            </li>

            <li className="syarat-item">
              <div className="bullet-point"></div>
              <span className="syarat-text">
                Melengkapi verifikasi identitas (KTP/SIM/Paspor)
              </span>
            </li>

            <li className="syarat-item">
              <div className="bullet-point"></div>
              <span className="syarat-text">
                Menyediakan data diri lengkap dan valid
              </span>
            </li>

            <li className="syarat-item">
              <div className="bullet-point"></div>
              <span className="syarat-text">
                Kampanye telah melewati proses review tim Raih Mimpi
              </span>
            </li>
          </ul>

          {/* Info Box */}
          <div className="syarat-info-box">
            <div className="info-icon">💡</div>
            <div className="info-text">
              <strong>Catatan:</strong> Proses verifikasi membutuhkan waktu 1-3 hari kerja.
              Pastikan semua dokumen yang Anda upload jelas dan sesuai.
            </div>
          </div>
        </div>
      </div>

      {/* Verification Prompt Section */}
      <div className="verification-prompt-section">
        <div className="verification-prompt-card">
          <p className="verification-prompt-text">Belum verifikasi?</p>
          <button
            className="verification-btn"
            onClick={() => alert('Navigasi ke halaman verifikasi')}
          >
            <svg className="verification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Verifikasi
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-syarat">
        <button className="btn-syarat btn-secondary-syarat" onClick={handleBack}>
          ← Sebelumnya
        </button>
        <button className="btn-syarat btn-primary-syarat" onClick={handleNext}>
          Lanjutkan →
        </button>
      </div>
    </div>
  );
};

export default SyaratKetentuanIklan;
