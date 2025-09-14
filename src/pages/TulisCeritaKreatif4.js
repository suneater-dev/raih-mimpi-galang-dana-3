import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaKreatif4 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState('');

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      navigate('/tulis-cerita-kreatif-5');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-kreatif-3');
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
    const exampleText = "Kondisi UMKM di Indonesia saat ini sangat membutuhkan dukungan dalam hal branding dan pemasaran visual. Berdasarkan survey yang saya lakukan, 78% UMKM mengaku kesulitan dalam membuat desain yang menarik untuk produk mereka. Hal ini berdampak pada daya saing produk di pasar yang semakin kompetitif.\n\nStudio kreatif yang akan saya bangun akan memberikan solusi dengan menyediakan layanan desain profesional dengan harga yang terjangkau untuk UMKM. Kami akan membantu mereka meningkatkan nilai jual produk melalui kemasan dan branding yang menarik.\n\nSelain itu, studio ini juga akan menjadi tempat edukasi bagi para pelaku UMKM tentang pentingnya branding dalam bisnis. Kami akan mengadakan workshop dan seminar gratis setiap bulannya untuk berbagi ilmu tentang desain dan pemasaran visual.\n\nDampak positif yang diharapkan adalah meningkatnya daya saing UMKM lokal, terciptanya lapangan kerja baru untuk desainer muda, dan berkembangnya ekosistem kreatif di kota Bandung.";
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
          <span className="modern-text small">Bagian 4 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '67%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Jelaskan dampak positif dan manfaat proyek ini</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Ceritakan bagaimana proyek ini akan memberikan dampak positif bagi Anda, masyarakat, atau lingkungan sekitar. Jelaskan juga manfaat jangka panjang yang akan dihasilkan."
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

export default TulisCeritaKreatif4;