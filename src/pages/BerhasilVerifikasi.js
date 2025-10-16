import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BerhasilVerifikasi.css';

const BerhasilVerifikasi = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <div className="header-title white-text">Verifikasi Identitas</div>
      </header>

      {/* Success Content */}
      <div className="berhasil-verification-content">
        <div className="berhasil-success-card">
          {/* Success Icon */}
          <div className="berhasil-success-icon-container">
            <div className="berhasil-success-icon-circle">
              <svg className="berhasil-success-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Success Title */}
          <h2 className="berhasil-success-title">Data Verifikasi Berhasil Dikirim!</h2>

          {/* Success Description */}
          <p className="berhasil-success-description">
            Terima kasih telah mengirimkan data verifikasi Anda. Tim kami akan meninjau dan memverifikasi identitas Anda dalam waktu 2-3 hari kerja.
          </p>

          {/* Info Box */}
          <div className="berhasil-info-box">
            <svg className="berhasil-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="berhasil-info-text">
              <strong>Estimasi waktu review:</strong> 2-3 hari kerja
              <br />
              Kami akan mengirim notifikasi melalui email dan WhatsApp.
            </div>
          </div>

          {/* Next Steps */}
          <div className="berhasil-next-steps">
            <h4 className="berhasil-steps-title">Langkah Selanjutnya:</h4>
            <div className="berhasil-steps-list">
              <div className="berhasil-step-item">
                <div className="berhasil-step-number">1</div>
                <div className="berhasil-step-text">Tim kami akan melakukan verifikasi dokumen Anda</div>
              </div>
              <div className="berhasil-step-item">
                <div className="berhasil-step-number">2</div>
                <div className="berhasil-step-text">Anda akan mendapat notifikasi hasil verifikasi</div>
              </div>
              <div className="berhasil-step-item">
                <div className="berhasil-step-number">3</div>
                <div className="berhasil-step-text">Setelah terverifikasi, Anda dapat membuat campaign</div>
              </div>
            </div>
          </div>

          {/* Button */}
          <button className="berhasil-btn-dashboard" onClick={handleBackToDashboard}>
            <svg className="berhasil-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default BerhasilVerifikasi;
