import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PengajuanBerhasilIklan.css';

const PengajuanBerhasilIklan = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <div className="header-title white-text">Pengajuan Optimasi Iklan</div>
      </header>

      {/* Success Content */}
      <div className="success-content-section">
        <div className="success-card">
          {/* Success Icon */}
          <div className="success-icon-container">
            <div className="success-icon-circle">
              <svg className="success-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Success Title */}
          <h1 className="success-title">Pengajuan Berhasil Dikirim!</h1>

          {/* Success Description */}
          <p className="success-description">
            Terima kasih telah mengajukan optimasi iklan campaign Anda. Pengajuan Anda telah kami terima dan sedang dalam proses review oleh tim kami.
          </p>

          {/* Info Box */}
          <div className="success-info-box">
            <div className="info-icon-success">⏱️</div>
            <div className="info-text-container">
              <p className="info-text-success">
                <strong>Estimasi waktu review:</strong> 2-3 hari kerja
              </p>
              <p className="info-text-success">
                Kami akan menghubungi Anda melalui nomor telepon yang terdaftar untuk informasi lebih lanjut.
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="next-steps-section">
            <h3 className="next-steps-title">Langkah Selanjutnya:</h3>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-text">Tim kami akan melakukan verifikasi dokumen MoU</div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-text">Anda akan dihubungi untuk konfirmasi dan detail kerjasama</div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-text">Campaign Anda akan dioptimasi dan dipromosikan</div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-help-box">
            <p className="contact-text">
              Ada pertanyaan? Hubungi kami di <strong>support@raihmimpi.id</strong> atau WhatsApp <strong>0812-3456-7890</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="bottom-action-section">
        <button className="btn-dashboard" onClick={handleBackToDashboard}>
          <svg className="dashboard-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
};

export default PengajuanBerhasilIklan;
