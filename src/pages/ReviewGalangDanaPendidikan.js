import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ReviewGalangDana.css';

const ReviewGalangDanaPendidikan = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from previous steps
  const previousData = location.state || {};
  const withAds = previousData.withAds || false;

  const handleEdit = (section) => {
    // Navigate back to specific section for editing
    switch (section) {
      case 'tujuan':
        navigate('/tujuan-detail-pendidikan', { state: previousData });
        break;
      case 'data':
        navigate('/data-diri-pendidikan', { state: previousData });
        break;
      case 'penerima':
        navigate('/penerima-pendidikan', { state: previousData });
        break;
      case 'target':
        navigate('/target-donasi-pendidikan', { state: previousData });
        break;
      case 'judul':
        navigate('/judul-kampanye-pendidikan', { state: previousData });
        break;
      case 'cerita':
        navigate('/cerita-kampanye-pendidikan', { state: previousData });
        break;
      case 'ajakan':
        navigate('/ajakan-pendidikan', { state: previousData });
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    // Navigate to final completion page
    navigate('/campaign-complete', {
      state: {
        ...previousData,
        campaignType: 'pendidikan',
        withAds
      }
    });
  };

  const handleBack = () => {
    if (withAds) {
      navigate('/account-registration', { state: previousData });
    } else {
      navigate('/ads-offering-pendidikan', { state: previousData });
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Review Galang Dana</div>
      </header>

      {/* Review Content */}
      <div className="review-container">
        <div className="review-header">
          <div className="review-icon">📋</div>
          <h2 className="review-title">Review Kampanye Bantuan Pendidikan</h2>
          <p className="review-subtitle">
            Periksa kembali semua informasi sebelum mempublikasikan kampanye Anda
          </p>
          {withAds && (
            <div className="ads-badge">
              <span className="ads-badge-icon">📢</span>
              <span className="ads-badge-text">Dengan Promosi RaihMimpi</span>
            </div>
          )}
        </div>

        {/* Review Sections */}
        <div className="review-sections">
          {/* Tujuan */}
          <div className="review-section">
            <div className="review-section-header">
              <h3 className="review-section-title">1. Tujuan Kampanye</h3>
              <button className="review-edit-btn" onClick={() => handleEdit('tujuan')}>
                ✏️ Edit
              </button>
            </div>
            <div className="review-section-content">
              <p className="review-text">
                Bantuan pendidikan untuk anak-anak kurang mampu di daerah terpencil agar dapat melanjutkan pendidikan ke jenjang yang lebih tinggi. Target bantuan adalah biaya sekolah, buku, seragam, dan transportasi untuk 50 siswa...
              </p>
            </div>
          </div>

          {/* Data Diri */}
          <div className="review-section">
            <div className="review-section-header">
              <h3 className="review-section-title">2. Data Diri</h3>
              <button className="review-edit-btn" onClick={() => handleEdit('data')}>
                ✏️ Edit
              </button>
            </div>
            <div className="review-section-content">
              <p className="review-text">
                <strong>Nama:</strong> {withAds ? previousData.accountData?.namaLengkap || 'John Doe' : 'John Doe'}<br/>
                <strong>Email:</strong> {withAds ? previousData.accountData?.email || 'john@email.com' : 'john@email.com'}<br/>
                <strong>No. Telepon:</strong> {withAds ? previousData.accountData?.nomorTelepon || '+62 812 3456 7890' : '+62 812 3456 7890'}
              </p>
            </div>
          </div>

          {/* Penerima */}
          <div className="review-section">
            <div className="review-section-header">
              <h3 className="review-section-title">3. Data Penerima</h3>
              <button className="review-edit-btn" onClick={() => handleEdit('penerima')}>
                ✏️ Edit
              </button>
            </div>
            <div className="review-section-content">
              <p className="review-text">
                <strong>Nama Sekolah:</strong> SDN 01 Sukamaju<br/>
                <strong>Alamat:</strong> Desa Sukamaju, Garut, Jawa Barat<br/>
                <strong>Hubungan:</strong> Kepala Sekolah
              </p>
            </div>
          </div>

          {/* Target Donasi */}
          <div className="review-section">
            <div className="review-section-header">
              <h3 className="review-section-title">4. Target Donasi</h3>
              <button className="review-edit-btn" onClick={() => handleEdit('target')}>
                ✏️ Edit
              </button>
            </div>
            <div className="review-section-content">
              <p className="review-text">
                <strong>Target:</strong> Rp 60.000.000<br/>
                <strong>Durasi:</strong> 120 hari<br/>
                <strong>Penggunaan:</strong> Beasiswa untuk 30 siswa, perbaikan fasilitas sekolah, dan program pendampingan
              </p>
            </div>
          </div>

          {/* Judul */}
          <div className="review-section">
            <div className="review-section-header">
              <h3 className="review-section-title">5. Judul Kampanye</h3>
              <button className="review-edit-btn" onClick={() => handleEdit('judul')}>
                ✏️ Edit
              </button>
            </div>
            <div className="review-section-content">
              <p className="review-text">
                <strong>"Bantu Biaya Sekolah Anak-anak di Desa Terpencil"</strong>
              </p>
              <div className="review-image-placeholder">
                📸 Foto kampanye telah diupload
              </div>
            </div>
          </div>

          {/* Cerita */}
          <div className="review-section">
            <div className="review-section-header">
              <h3 className="review-section-title">6. Cerita Kampanye</h3>
              <button className="review-edit-btn" onClick={() => handleEdit('cerita')}>
                ✏️ Edit
              </button>
            </div>
            <div className="review-section-content">
              <p className="review-text">
                Cerita lengkap tentang kondisi pendidikan, upaya yang telah dilakukan, dan harapan masa depan telah dibuat dalam 6 bagian yang komprehensif.
              </p>
            </div>
          </div>

          {/* Ajakan */}
          <div className="review-section">
            <div className="review-section-header">
              <h3 className="review-section-title">7. Ajakan Donasi</h3>
              <button className="review-edit-btn" onClick={() => handleEdit('ajakan')}>
                ✏️ Edit
              </button>
            </div>
            <div className="review-section-content">
              <p className="review-text">
                "Mari bersama-sama kita wujudkan mimpi anak-anak di desa untuk mendapatkan pendidikan yang layak! Dengan bantuan Anda, mereka bisa terus bersekolah tanpa khawatir dengan biaya pendidikan..."
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="review-submit">
          <div className="review-warning">
            <div className="warning-icon">⚠️</div>
            <p className="warning-text">
              Setelah dipublikasikan, beberapa informasi tidak dapat diubah. Pastikan semua data sudah benar.
            </p>
          </div>
          
          <button className="review-submit-btn" onClick={handleSubmit}>
            🚀 Publikasikan Kampanye
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewGalangDanaPendidikan;