import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaSosial3 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaSosial_part3') || '';
  });
  const [showExampleModal, setShowExampleModal] = useState(false);

  const exampleText = "Sebagai respons terhadap kondisi tersebut, Komunitas Peduli Sesama telah melakukan berbagai upaya untuk membantu para lansia di Panti Jompo Kasih Sayang. Selama 6 bulan terakhir, kami rutin mengunjungi panti setiap minggu untuk memberikan bantuan makanan bergizi dan pendampingan.\n\nKami telah mengorganisir kegiatan pemeriksaan kesehatan gratis dengan mengundang dokter dan perawat volunteer. Hasilnya, kami berhasil mengidentifikasi beberapa lansia yang membutuhkan perawatan khusus dan membantu mereka mendapatkan akses ke layanan kesehatan yang tepat.\n\nSelain itu, kami juga mengadakan kegiatan rekreasi seperti senam lansia, membaca bersama, dan berbagi cerita untuk meningkatkan kesejahteraan mental mereka. Para relawan kami yang berprofesi sebagai terapis fisik juga membantu memberikan latihan-latihan sederhana untuk menjaga mobilitas para lansia.";

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      // Save to localStorage
      localStorage.setItem('ceritaSosial_part3', storyContent);
      navigate('/tulis-cerita-sosial-4');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-sosial-2');
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
          <h2 className="modern-subheading">Ceritakan upaya bantuan yang sudah dilakukan</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>

          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Jelaskan upaya dan bantuan apa saja yang sudah pernah diberikan untuk penerima bantuan, baik oleh Anda, komunitas, atau pihak lain."
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

export default TulisCeritaSosial3;
