import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/TujuanDetail.css';

const TujuanDetailPendidikan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tujuanDetail, setTujuanDetail] = useState('');

  // Get selected category from previous page
  const selectedCategory = location.state?.selectedCategory;

  const handleNext = () => {
    if (tujuanDetail.trim()) {
      navigate('/data-diri-pendidikan', {
        state: {
          selectedCategory,
          tujuanDetail
        }
      });
    }
  };

  const handleBack = () => {
    navigate('/bantuan-lainnya');
  };

  const isFormValid = tujuanDetail.trim().length > 0;

  const steps = [
    { number: 1, label: 'Tujuan', active: true },
    { number: 2, label: 'Data diri', active: false },
    { number: 3, label: 'Penerima', active: false },
    { number: 4, label: 'Target donasi', active: false },
    { number: 5, label: 'Judul', active: false },
    { number: 6, label: 'Cerita', active: false },
    { number: 7, label: 'Ajakan', active: false }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Bantuan Pendidikan</div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Form Section */}
      <div className="modern-card">
        {/* Category Display */}
        {selectedCategory && (
          <div className="selected-category-display" style={{marginBottom: '24px'}}>
            <h3 className="modern-subheading">Kategori yang dipilih:</h3>
            <div className="category-badge-modern" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'rgba(173, 52, 171, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(173, 52, 171, 0.2)'
            }}>
              <span className="category-icon" style={{fontSize: '20px'}}>🎓</span>
              <span className="category-text" style={{fontWeight: '600', color: '#ad34ab'}}>Bantuan Pendidikan</span>
            </div>
          </div>
        )}

        {/* Tujuan Detail Form */}
        <div className="form-group-modern">
          <h2 className="modern-subheading">Jelaskan tujuan bantuan pendidikan secara detail</h2>
          <p className="modern-text" style={{marginBottom: '16px', color: '#6B7280'}}>
            Ceritakan dengan jelas tujuan, sasaran, dan manfaat dari bantuan pendidikan yang akan diberikan.
          </p>
          <textarea 
            className="modern-textarea" 
            placeholder="Contoh: Bantuan pendidikan ini bertujuan untuk membantu anak-anak kurang mampu di daerah terpencil agar dapat melanjutkan pendidikan ke jenjang yang lebih tinggi. Target bantuan adalah biaya sekolah, buku, seragam, dan transportasi untuk 50 siswa..."
            value={tujuanDetail}
            onChange={(e) => setTujuanDetail(e.target.value)}
            rows="8"
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-modern">
        <button className="modern-btn secondary" onClick={handleBack}>
          ← Sebelumnya
        </button>
        <button 
          className={`modern-btn ${!isFormValid ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={!isFormValid}
        >
          Selanjutnya →
        </button>
      </div>
    </div>
  );
};

export default TujuanDetailPendidikan;