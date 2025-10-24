import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCerita6 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState('');
  const [showExampleModal, setShowExampleModal] = useState(false);

  const exampleText = "Doa kami yang paling dalam adalah agar Andi dapat sembuh total dari penyakitnya dan kembali menjadi anak yang sehat dan ceria seperti sebelumnya. Kami berharap suatu hari nanti Andi bisa kembali bersekolah, bermain bersama teman-temannya, dan meraih cita-citanya menjadi dokter untuk membantu anak-anak lain yang sakit.\n\nKami percaya bahwa dengan bantuan dari orang-orang baik seperti Anda, doa kami akan terkabul. Semoga Allah SWT memberikan kesembuhan dan kekuatan bagi Andi untuk melewati masa-masa sulit ini.\n\nTerima kasih atas dukungan dan doa dari semua pihak. Semoga kebaikan Anda dibalas berlipat ganda. Amin.";

  useEffect(() => {
    // Load saved content from localStorage
    const saved = localStorage.getItem('cerita_part6');
    if (saved) setStoryContent(saved);
  }, []);

  const handleFinish = () => {
    if (storyContent.trim().length > 0) {
      // Save to localStorage
      localStorage.setItem('cerita_part6', storyContent);
      navigate('/review-cerita');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-5');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye');
    }
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('cerita_part6', storyContent);
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
          <h2 className="modern-subheading">Tuliskan doa, harapan, dan cita-cita untuk kesembuhan pasien</h2>
        </div>
        
        <div className="modern-card">
          <div className="story-section">
            <button className="modern-btn secondary example-btn-small" onClick={showExample}>
              📄 Lihat contoh
            </button>
            
            <textarea
              className="modern-textarea"
              placeholder="Ceritakan doa, harapan, dan cita-cita bagi pasien, baik dari pasien sendiri ataupun keluarga"
              value={storyContent}
              onChange={(e) => setStoryContent(e.target.value)}
              rows={8}
            />
          </div>
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="story-actions-modern">
        <div className="bottom-nav-modern">
          <button className="modern-btn secondary" onClick={handleBack}>
            ← Sebelumnya
          </button>
          <button
            className="modern-btn"
            onClick={handleFinish}
            disabled={storyContent.trim().length === 0}
          >
            Selesai ✓
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

export default TulisCerita6;