import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PengajuanPencairanBerhasil.css';

const PengajuanPencairanBerhasil = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/detail-pencairan-dana');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Pengajuan Pencairan</div>
      </header>

      {/* Content */}
      <div className="success-content">
        {/* Success Icon */}
        <div className="success-icon-wrapper">
          <div className="success-icon-circle">
            <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="success-title">Pengajuan Pencairan Berhasil!</h2>
        <p className="success-description">
          Pengajuan pencairan dana Anda telah berhasil dikirim. Tim Raih Mimpi akan memverifikasi pengajuan Anda dalam waktu 2-3 hari kerja.
        </p>

        {/* Info Card */}
        <div className="info-card-success">
          <div className="info-card-header">
            <svg className="info-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 className="info-card-title">Informasi Penting</h3>
          </div>

          <ul className="info-list">
            <li>Pastikan nomor rekening yang Anda daftarkan sudah benar dan aktif.</li>
            <li>Dana akan ditransfer ke rekening Anda setelah pengajuan disetujui.</li>
            <li>Anda akan menerima notifikasi melalui email dan dashboard setelah proses verifikasi selesai.</li>
            <li>Jika ada pertanyaan, hubungi tim support Raih Mimpi.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons-success">
          <button className="btn-success secondary" onClick={() => navigate('/detail-pencairan-dana')}>
            Lihat Detail
          </button>
          <button className="btn-success primary" onClick={() => navigate('/dashboard')}>
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PengajuanPencairanBerhasil;
