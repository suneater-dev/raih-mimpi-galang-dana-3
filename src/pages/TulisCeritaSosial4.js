import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaSosial4 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState('');

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      navigate('/tulis-cerita-sosial-5');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-sosial-3');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye-sosial');
    }
  };

  const handleSave = () => {
    alert('Cerita telah disimpan!');
  };

  const showExample = () => {
    const exampleText = "Kondisi ini sangat memprihatinkan karena berdampak luas, tidak hanya pada para lansia tetapi juga pada keluarga dan masyarakat sekitar. Banyak keluarga yang merasa bersalah karena tidak dapat merawat orang tua mereka secara optimal di rumah, sementara biaya perawatan di tempat yang lebih baik sangat mahal.\n\nSecara finansial, pihak pengelola panti mengalami kesulitan besar dalam membiayai operasional harian. Biaya makanan bergizi, obat-obatan, dan perawatan kesehatan rutin membutuhkan dana yang tidak sedikit. Dengan donasi yang terbatas, mereka sering kali harus berkompromi dengan kualitas layanan.\n\nDampak sosial yang terlihat adalah menurunnya semangat hidup para lansia. Mereka yang seharusnya menikmati masa tua dengan tenang, kini harus menghadapi keterbatasan fasilitas dan perawatan. Ini juga mempengaruhi kesehatan mental mereka yang sudah rapuh di usia senja.";
    setStoryContent(exampleText);
  };

  const handleWriteWithoutGuide = () => {
    navigate('/tulis-cerita-bebas-sosial');
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
          <h2 className="modern-subheading">Jelaskan dampak sosial dan finansial yang dialami</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Ceritakan dampak sosial dan finansial yang dialami oleh penerima bantuan dan masyarakat sekitar akibat kondisi yang ada."
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

export default TulisCeritaSosial4;