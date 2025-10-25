import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/DetailLaporanPencairan.css';

const DetailLaporanPencairan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const campaign = location.state?.campaign;
  const report = location.state?.report;

  const handleBack = () => {
    navigate('/pencairan-dana');
  };

  const handleRevise = () => {
    navigate('/laporan-pencairan', { state: { campaign } });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Dalam Review': { text: 'Dalam Review', class: 'status-reviewing', icon: '⏳' },
      'Disetujui': { text: 'Disetujui', class: 'status-approved', icon: '✓' },
      'Ditolak': { text: 'Ditolak', class: 'status-rejected', icon: '✕' }
    };
    return badges[status] || badges['Dalam Review'];
  };

  const statusBadge = getStatusBadge(report?.status || campaign?.reportStatus);

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Detail Laporan</div>
      </header>

      {/* Content */}
      <div className="detail-laporan-content">
        <div className="detail-laporan-card">
          {/* Status Badge */}
          <div className="status-section">
            <div className={`status-badge-large ${statusBadge.class}`}>
              <span className="status-icon">{statusBadge.icon}</span>
              <span className="status-text">{statusBadge.text}</span>
            </div>
            {statusBadge.class === 'status-reviewing' && (
              <p className="status-description">
                Laporan Anda sedang direview oleh tim admin. Proses ini biasanya memakan waktu 1-3 hari kerja.
              </p>
            )}
            {statusBadge.class === 'status-approved' && (
              <p className="status-description success">
                Selamat! Laporan Anda telah disetujui. Anda dapat melakukan pencairan dana sekarang.
              </p>
            )}
            {statusBadge.class === 'status-rejected' && (
              <p className="status-description error">
                Laporan Anda ditolak. Silakan perbaiki dan kirim ulang laporan berdasarkan catatan dari admin di bawah.
              </p>
            )}
          </div>

          {/* Campaign Info */}
          <div className="info-section">
            <h3 className="section-title">Informasi Campaign</h3>
            <div className="info-card">
              <div className="info-row">
                <span className="info-label">Nama Campaign</span>
                <span className="info-value">{campaign?.title || report?.campaignTitle}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Total Terkumpul</span>
                <span className="info-value">{formatCurrency(campaign?.collected || 0)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Target</span>
                <span className="info-value">{formatCurrency(campaign?.target || 0)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Tanggal Laporan</span>
                <span className="info-value">{formatDate(report?.submittedAt || new Date().toISOString())}</span>
              </div>
            </div>
          </div>

          {/* Penggunaan Dana */}
          <div className="info-section">
            <h3 className="section-title">Rincian Penggunaan Dana</h3>
            <div className="content-card">
              <p className="content-text">{report?.penggunaanDana || 'Belum ada rincian penggunaan dana'}</p>
            </div>
          </div>

          {/* Keterangan Tambahan */}
          {report?.keterangan && (
            <div className="info-section">
              <h3 className="section-title">Keterangan Tambahan</h3>
              <div className="content-card">
                <p className="content-text">{report.keterangan}</p>
              </div>
            </div>
          )}

          {/* Dokumen & Foto */}
          <div className="info-section">
            <h3 className="section-title">Dokumen & Bukti</h3>
            <div className="files-summary">
              <div className="file-summary-item">
                <svg className="summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="summary-info">
                  <span className="summary-count">{report?.documentCount || 0}</span>
                  <span className="summary-label">Dokumen</span>
                </div>
              </div>
              <div className="file-summary-item">
                <svg className="summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="summary-info">
                  <span className="summary-count">{report?.photoCount || 0}</span>
                  <span className="summary-label">Foto Bukti</span>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Notes (if rejected) */}
          {statusBadge.class === 'status-rejected' && (
            <div className="info-section">
              <h3 className="section-title">Catatan dari Admin</h3>
              <div className="admin-notes-card">
                <svg className="notes-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="notes-content">
                  <p className="notes-text">
                    Mohon lengkapi dokumen pendukung seperti kwitansi rumah sakit dan surat keterangan dokter.
                    Rincian penggunaan dana juga perlu lebih detail untuk setiap item pengeluaran.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            {statusBadge.class === 'status-rejected' && (
              <button className="btn-revise" onClick={handleRevise}>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Revisi Laporan
              </button>
            )}

            {statusBadge.class === 'status-approved' && (
              <button
                className="btn-withdraw-now"
                onClick={() => navigate('/detail-pencairan-dana', { state: { campaign } })}
              >
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Cairkan Dana Sekarang
              </button>
            )}

            <button className="btn-back" onClick={handleBack}>
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLaporanPencairan;
