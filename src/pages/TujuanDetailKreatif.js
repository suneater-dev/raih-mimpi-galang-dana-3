import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/TujuanDetail.css';

const TujuanDetailKreatif = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tujuanDetail, setTujuanDetail] = useState('');

  // Get selected category from previous page
  const selectedCategory = location.state?.selectedCategory;

  const handleNext = () => {
    if (tujuanDetail.trim()) {
      navigate('/penerima-kreatif', {
        state: {
          selectedCategory,
          tujuanDetail
        }
      });
    }
  };

  const handleBack = () => {
    navigate('/karya-kreatif');
  };

  const isFormValid = tujuanDetail.trim().length > 0;

  const steps = [
    { number: 1, label: 'Tujuan', active: true },
    { number: 2, label: 'Penerima', active: false },
    { number: 3, label: 'Target donasi', active: false },
    { number: 4, label: 'Judul', active: false },
    { number: 5, label: 'Cerita', active: false },
    { number: 6, label: 'Ajakan', active: false }
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
        {/* Category Display */}
        {selectedCategory && (
          <div className="selected-category-display" style={{marginBottom: '24px'}}>
            <h3 className="modern-subheading">Kategori yang dipilih:</h3>
            <div className="category-badge-modern" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'rgba(152, 60, 237, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(152, 60, 237, 0.2)'
            }}>
              <span className="category-icon" style={{fontSize: '20px'}}>{selectedCategory.icon}</span>
              <span className="category-text" style={{fontWeight: '600', color: '#983ced'}}>{selectedCategory.title}</span>
            </div>
          </div>
        )}

        {/* Tujuan Detail Form */}
        <div className="form-group-modern">
          <h2 className="modern-subheading">Jelaskan tujuan karya kreatif atau modal usaha secara detail</h2>
          <p className="modern-text" style={{marginBottom: '16px', color: '#6B7280'}}>
            Ceritakan dengan jelas tujuan, sasaran, dan manfaat dari karya kreatif atau modal usaha yang akan dijalankan.
          </p>
          <textarea
            className="modern-textarea"
            placeholder="Contoh: Proyek ini bertujuan untuk mengembangkan usaha kecil kerajinan tangan lokal yang mempekerjakan ibu-ibu di desa. Dengan modal usaha ini, kami bisa membeli bahan baku berkualitas dan meningkatkan produksi untuk memenuhi permintaan pasar..."
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

export default TujuanDetailKreatif;
