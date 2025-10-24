import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaSosial = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaSosial_part1') || '';
  });
  const [showExampleModal, setShowExampleModal] = useState(false);

  const exampleText = "Halo, nama saya Ahmad dan saya adalah koordinator dari Komunitas Peduli Sesama. Kami adalah sekelompok relawan yang berkomitmen membantu masyarakat kurang mampu, terutama lansia di Panti Jompo Kasih Sayang.\n\nPanti Jompo Kasih Sayang merawat 45 lansia yang sebagian besar tidak memiliki keluarga atau ditinggalkan. Mereka sangat membutuhkan perhatian, makanan bergizi, dan perawatan kesehatan yang layak. Banyak dari mereka yang sudah lanjut usia dan memiliki kondisi kesehatan yang memerlukan perhatian khusus.\n\nSebagai relawan, saya sering melihat betapa terbatasnya fasilitas dan sumber daya di panti ini. Para pengurus panti bekerja dengan sangat terbatas, namun tetap berusaha memberikan yang terbaik untuk para lansia.";

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      // Save to localStorage
      localStorage.setItem('ceritaSosial_part1', storyContent);
      navigate('/tulis-cerita-sosial-2');
    }
  };

  const handleBack = () => {
    navigate('/cerita-kampanye-sosial');
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
          <h2 className="modern-subheading">Perkenalkan diri Anda dan komunitas/organisasi sosial</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Ceritakan siapa Anda, komunitas atau organisasi sosial yang Anda wakili, dan latar belakang kepedulian Anda terhadap kegiatan sosial ini."
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

export default TulisCeritaSosial;