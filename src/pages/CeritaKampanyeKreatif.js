import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/CeritaKampanye.css';

const CeritaKampanyeKreatif = () => {
  const navigate = useNavigate();

  const handleCreateStory = () => {
    navigate('/tulis-cerita-kreatif');
  };

  const handleBack = () => {
    navigate('/judul-kampanye-kreatif');
  };

  const steps = [
    { number: 1, label: 'Tujuan', active: false },
    { number: 2, label: 'Data diri', active: false },
    { number: 3, label: 'Penerima', active: false },
    { number: 4, label: 'Target donasi', active: false },
    { number: 5, label: 'Judul', active: false },
    { number: 6, label: 'Cerita', active: true },
    { number: 7, label: 'Ajakan', active: false }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Karya Kreatif & Modal Usaha</div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Form Section */}
      <div className="modern-card">
        {/* Story Title */}
        <div className="form-group-modern">
          <h2 className="modern-heading">Tuliskan cerita tentang galang dana ini</h2>
          <p className="modern-text" style={{marginBottom: '24px'}}>Cerita kamu akan ditulis dalam beberapa tahap, ceritakan sesuai instruksi di setiap tahap.</p>
          
          {/* Story Importance */}
          <div className="importance-section-modern">
            <div className="importance-icon-modern">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="importance-content-modern">
              <h3 className="modern-subheading" style={{fontSize: '18px', marginBottom: '8px'}}>Kenapa cerita itu penting?</h3>
              <p className="modern-text small">Dengan membuat cerita yang lengkap tentang proyek kreatif atau bisnis Anda, kamu akan berkesempatan mendapatkan donasi yang lebih banyak</p>
            </div>
          </div>

          {/* Info Alert */}
          <div className="info-alert-modern">
            <div className="info-icon-modern">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor"/>
              </svg>
            </div>
            <p className="modern-text small">Cerita dan deskripsi tidak bisa diubah setelah penggalangan danamu terverifikasi. Pastikan kamu sudah menuliskannya dengan benar.</p>
          </div>

          {/* Create Story Button */}
          <button className="create-story-btn-modern" onClick={handleCreateStory}>
            📝 Buat cerita galang dana
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-modern">
        <button className="modern-btn secondary" onClick={handleBack}>
          ← Sebelumnya
        </button>
        <button className="modern-btn" disabled style={{opacity: 0.5}}>
          Selanjutnya →
        </button>
      </div>
      <button className="save-continue-modern">Simpan dan lanjutkan nanti</button>
    </div>
  );
};

export default CeritaKampanyeKreatif;