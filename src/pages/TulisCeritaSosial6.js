import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaSosial6 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaSosial_part6') || '';
  });
  const [showExampleModal, setShowExampleModal] = useState(false);

  const exampleText = "Kami berharap dan berdoa agar kegiatan sosial ini dapat berjalan lancar dan memberikan manfaat yang besar bagi para lansia di Panti Jompo Kasih Sayang. Semoga dengan bantuan dari para donatur yang mulia hati, para lansia dapat merasakan kasih sayang dan perhatian yang selama ini mereka rindukan.\n\nHarapan terbesar kami adalah melihat senyuman kembali terpancar di wajah-wajah para lansia. Mereka berhak mendapatkan masa tua yang tenang, sehat, dan bermartabat. Dengan fasilitas yang lebih baik dan perawatan yang optimal, kami yakin mereka dapat menjalani hari-hari dengan lebih bahagia.\n\nKami juga berharap kegiatan ini dapat menjadi inspirasi bagi masyarakat luas untuk lebih peduli terhadap sesama, khususnya para lansia yang membutuhkan perhatian khusus. Semoga usaha kecil ini dapat menciptakan dampak positif yang berkelanjutan dan menumbuhkan semangat gotong royong dalam masyarakat.\n\nTerima kasih atas kepercayaan dan dukungan yang akan diberikan.";

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      // Save to localStorage
      localStorage.setItem('ceritaSosial_part6', storyContent);
      navigate('/review-cerita-sosial');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-sosial-5');
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
          <span className="modern-text small">Bagian 6 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '100%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Doa, harapan, dan aspirasi untuk masa depan</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>

          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Sampaikan doa, harapan, dan aspirasi Anda untuk keberhasilan kegiatan sosial ini serta dampak positif yang diinginkan untuk masa depan."
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

export default TulisCeritaSosial6;
