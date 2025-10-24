import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaKreatif5 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaKreatif_part5') || '';
  });
  const [showExampleModal, setShowExampleModal] = useState(false);

  const exampleText = "Untuk mewujudkan studio kreatif ini, saya membutuhkan dana sebesar Rp 150.000.000 dengan rincian sebagai berikut:\n\n1. Sewa tempat dan renovasi ruangan (24 bulan): Rp 60.000.000\n2. Peralatan desain dan teknologi:\n   - 3 unit komputer high-spec dengan software desain: Rp 45.000.000\n   - Printer profesional dan peralatan pendukung: Rp 15.000.000\n   - Furniture dan interior ruang kerja: Rp 10.000.000\n3. Marketing dan promosi awal: Rp 8.000.000\n4. Modal kerja operasional 6 bulan: Rp 12.000.000\n\nDana ini sangat penting karena sebagai fresh graduate, saya belum memiliki modal yang cukup untuk memulai bisnis ini. Meskipun saya sudah memiliki beberapa klien tetap dari pengalaman freelance, namun income tersebut masih belum mencukupi untuk investasi awal yang besar ini.\n\nSaya telah mencoba mengajukan pinjaman ke bank, namun sebagai fresh graduate tanpa jaminan yang memadai, pengajuan tersebut sulit untuk disetujui. Oleh karena itu, galang dana ini menjadi harapan saya untuk dapat mewujudkan mimpi membangun studio kreatif yang dapat bermanfaat bagi banyak UMKM.";

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      localStorage.setItem('ceritaKreatif_part5', storyContent);
      navigate('/tulis-cerita-kreatif-6');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-kreatif-4');
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
            placeholder="Berikan rincian detail bagaimana dana akan digunakan dan jelaskan mengapa Anda membutuhkan bantuan untuk mewujudkan proyek ini."
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

export default TulisCeritaKreatif5;