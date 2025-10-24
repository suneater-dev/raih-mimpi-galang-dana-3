import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaSosial5 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaSosial_part5') || '';
  });
  const [showExampleModal, setShowExampleModal] = useState(false);

  const exampleText = "Untuk mengatasi masalah ini secara komprehensif, kami membutuhkan dana sebesar Rp 15.000.000. Rencana penggunaan dana tersebut adalah sebagai berikut:\n\n1. Renovasi kamar dan fasilitas panti (Rp 7.000.000): Memperbaiki ventilasi, cat ulang dinding, dan memperbaiki saluran air yang rusak.\n\n2. Pembelian peralatan medis dasar (Rp 3.000.000): Tensimeter digital, kursi roda, alat bantu jalan, dan kotak P3K lengkap.\n\n3. Program gizi dan kesehatan selama 6 bulan (Rp 4.000.000): Menyediakan makanan bergizi seimbang dan vitamin untuk semua penghuni panti.\n\n4. Pelatihan untuk pengasuh (Rp 1.000.000): Mengundang tenaga profesional untuk memberikan pelatihan perawatan lansia yang baik dan benar.\n\nDengan bantuan ini, kami yakin dapat meningkatkan kualitas hidup para lansia dan memberikan perawatan yang lebih layak bagi mereka.";

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      // Save to localStorage
      localStorage.setItem('ceritaSosial_part5', storyContent);
      navigate('/tulis-cerita-sosial-6');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-sosial-4');
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
          <span className="modern-text small">Bagian 5 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '83%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Rencana penggunaan dana dan alasan membutuhkan bantuan</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>

          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Jelaskan secara detail rencana penggunaan dana yang akan dikumpulkan dan alasan mengapa bantuan dari masyarakat sangat dibutuhkan untuk kegiatan sosial ini."
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

export default TulisCeritaSosial5;
