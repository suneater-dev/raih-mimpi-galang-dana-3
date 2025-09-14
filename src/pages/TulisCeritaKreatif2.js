import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaKreatif2 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState('');

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      navigate('/tulis-cerita-kreatif-3');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-kreatif');
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
    const exampleText = "Proyek studio kreatif ini akan menawarkan layanan desain grafis terpadu untuk UMKM dan startup lokal. Kami akan menyediakan jasa pembuatan logo, identitas visual, kemasan produk, desain website, dan kampanye media sosial yang profesional namun terjangkau.\n\nTarget utama kami adalah UMKM yang memiliki produk berkualitas namun kesulitan dalam hal branding dan pemasaran visual. Banyak usaha kecil yang memiliki potensi besar namun terhambat karena tampilan visual produk mereka kurang menarik atau tidak konsisten.\n\nStudio ini akan berlokasi di kawasan kreatif Bandung dan akan dilengkapi dengan peralatan desain modern seperti komputer high-spec, tablet grafis, printer profesional, dan ruang meeting untuk konsultasi dengan klien.";
    setStoryContent(exampleText);
  };

  const handleWriteWithoutGuide = () => {
    navigate('/tulis-cerita-bebas-kreatif');
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
          <span className="modern-text small">Bagian 2 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '33%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Jelaskan detail proyek atau bisnis yang ingin diwujudkan</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Berikan penjelasan lengkap tentang produk, layanan, atau karya kreatif yang akan Anda ciptakan. Ceritakan juga target market dan keunikan dari proyek Anda."
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
          />
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="story-actions-modern">
        <button className="write-without-guide-modern" onClick={handleWriteWithoutGuide}>
          Saya ingin menulis cerita sendiri tanpa panduan
        </button>
        
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
    </div>
  );
};

export default TulisCeritaKreatif2;