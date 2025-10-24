import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaKreatif = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaKreatif_part1') || '';
  });
  const [showExampleModal, setShowExampleModal] = useState(false);

  const exampleText = "Halo, nama saya Andi dan saya adalah seorang lulusan desain grafis yang baru menyelesaikan kuliah tahun ini. Sejak kecil, saya memiliki passion yang besar dalam dunia desain dan seni visual. Impian saya adalah membuka studio kreatif yang dapat membantu UMKM dan startup lokal mengembangkan branding mereka dengan desain yang menarik dan profesional.\n\nSaya telah berpengalaman mengerjakan berbagai proyek freelance selama kuliah, mulai dari desain logo, kemasan produk, hingga kampanye visual untuk media sosial. Melalui pengalaman ini, saya melihat betapa banyak UMKM yang memiliki produk berkualitas namun kesulitan dalam hal branding dan pemasaran visual.\n\nStudio kreatif yang ingin saya bangun akan fokus pada pelayanan desain grafis, branding, dan konsultasi visual untuk bisnis skala kecil menengah. Saya percaya bahwa dengan desain yang tepat, bisnis lokal dapat bersaing di pasar yang semakin kompetitif.";

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      // Save to localStorage
      localStorage.setItem('ceritaKreatif_part1', storyContent);
      navigate('/tulis-cerita-kreatif-2');
    }
  };

  const handleBack = () => {
    navigate('/cerita-kampanye-kreatif');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye-kreatif');
    }
  };

  const handleSave = () => {
    alert('Cerita telah disimpan!');
  };

  const showExample = () => {
    setShowExampleModal(true);
  };

  const closeExampleModal = () => {
    setShowExampleModal(false);
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header white">
        <button className="close-btn" onClick={handleClose}>
          ✕
        </button>
        <button className="save-btn" onClick={handleSave}>
          Simpan cerita
        </button>
      </header>

      {/* Progress Section */}
      <div className="story-progress-section">
        <div className="story-progress-info">
          <span className="modern-text">Pembuatan Cerita</span>
          <span className="modern-text small">Bagian 1 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '17%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Perkenalkan diri Anda dan proyek yang ingin diwujudkan</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Ceritakan siapa Anda, latar belakang Anda, dan proyek kreatif atau bisnis apa yang ingin Anda wujudkan melalui galang dana ini."
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
          />
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="story-actions-modern">
        <div className="bottom-nav-modern">
          <button className="modern-btn secondary" onClick={handleBack}>
            ← Sebelumnya
          </button>

          <button
            className={`modern-btn ${storyContent.trim().length === 0 ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={storyContent.trim().length === 0}
            style={{opacity: storyContent.trim().length === 0 ? 0.5 : 1}}
          >
            Selanjutnya →
          </button>
        </div>
      </div>

      {/* Example Modal */}
      {showExampleModal && (
        <div className="example-modal-overlay" onClick={closeExampleModal}>
          <div className="example-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="example-modal-header">
              <h3 className="modern-subheading">Contoh Cerita</h3>
              <button className="example-modal-close" onClick={closeExampleModal}>✕</button>
            </div>
            <div className="example-modal-body">
              <p className="example-text">{exampleText}</p>
            </div>
            <div className="example-modal-footer">
              <button className="modern-btn" onClick={closeExampleModal}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TulisCeritaKreatif;