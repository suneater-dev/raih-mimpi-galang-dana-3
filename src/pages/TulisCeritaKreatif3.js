import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaKreatif3 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState('');

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      navigate('/tulis-cerita-kreatif-4');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-kreatif-2');
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
    const exampleText = "Sebagai lulusan desain grafis dengan IPK 3.7 dari Universitas Padjadjaran, saya telah mengembangkan keahlian dalam berbagai software desain seperti Adobe Creative Suite, Figma, dan Sketch. Selama kuliah, saya aktif mengikuti berbagai kompetisi desain dan berhasil meraih juara 2 dalam Lomba Desain Logo Kota Bandung 2023.\n\nPengalaman freelance saya dimulai sejak semester 4, dimana saya telah menangani lebih dari 30 proyek dari berbagai klien, mulai dari UMKM kuliner, fashion, hingga startup teknologi. Beberapa achievement yang saya raih antara lain:\n- Desain logo dan branding untuk 15+ UMKM lokal\n- Menciptakan kemasan produk yang meningkatkan penjualan klien hingga 40%\n- Mengelola media sosial visual untuk 5 brand dengan total followers 50K+";
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
          <span className="modern-text small">Bagian 3 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '50%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Ceritakan pengalaman dan keahlian yang Anda miliki</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Jelaskan latar belakang pendidikan, pengalaman kerja, keahlian, dan pencapaian yang mendukung proyek ini. Tunjukkan bahwa Anda memiliki kapasitas untuk mewujudkan proyek tersebut."
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

export default TulisCeritaKreatif3;