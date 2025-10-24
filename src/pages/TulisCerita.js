import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCerita = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState('');
  const [showExampleModal, setShowExampleModal] = useState(false);

  const exampleText = "Halo, nama saya Sarah dan saya adalah kakak dari Andi yang berusia 8 tahun. Andi adalah adik kesayangan saya yang sangat ceria dan pintar. Sejak kecil, Andi selalu menjadi anak yang aktif dan suka bermain bersama teman-temannya.\n\nNamun, beberapa bulan yang lalu, kami mendapat kabar yang sangat mengejutkan dari dokter bahwa Andi didiagnosis menderita leukemia. Sebagai keluarga, kami sangat terpukul mendengar kabar ini, tetapi kami berkomitmen untuk memberikan yang terbaik bagi kesembuhan Andi.";

  useEffect(() => {
    // Load saved content from localStorage
    const saved = localStorage.getItem('cerita_part1');
    if (saved) {
      setStoryContent(saved);
    }
  }, []);

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      // Save to localStorage
      localStorage.setItem('cerita_part1', storyContent);
      navigate('/tulis-cerita-2');
    }
  };

  const handleBack = () => {
    navigate('/cerita-kampanye');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye');
    }
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('cerita_part1', storyContent);
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
          <h2 className="modern-subheading">Ceritakan tentang dirimu dan pasien</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Perkenalkan identitas dirimu dan pasien, serta hubungan kamu dengan pasien."
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
          />
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="story-actions-modern">
        <div className="bottom-nav-modern">
          <button className="modern-btn secondary" disabled style={{opacity: 0.5}}>
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

export default TulisCerita;