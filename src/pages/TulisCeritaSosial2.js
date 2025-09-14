import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaSosial2 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState('');

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      navigate('/tulis-cerita-sosial-3');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-sosial');
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
    const exampleText = "Saat ini, para lansia di Panti Jompo Kasih Sayang menghadapi berbagai tantangan serius yang membutuhkan perhatian segera. Sebagian besar dari mereka mengalami masalah kesehatan seperti diabetes, hipertensi, dan gangguan mobilitas yang memerlukan perawatan khusus.\n\nKondisi fisik panti yang sudah berusia puluhan tahun membuat fasilitas menjadi terbatas. Kamar-kamar yang sempit dan kurangnya ventilasi membuat lingkungan kurang nyaman bagi para penghuni. Selain itu, peralatan medis yang tersedia juga sangat minim.\n\nPara pengasuh bekerja dengan dedikasi tinggi namun terbatas dengan jumlah staf yang tidak sebanding dengan kebutuhan 45 lansia. Setiap hari mereka harus mengatur jadwal makan, minum obat, dan kegiatan rutin dengan sumber daya yang sangat terbatas.";
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
          <h2 className="modern-subheading">Jelaskan kondisi penerima bantuan saat ini</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Ceritakan kondisi terkini dari penerima bantuan, tantangan yang mereka hadapi, dan situasi yang membuat mereka membutuhkan bantuan sosial."
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

export default TulisCeritaSosial2;