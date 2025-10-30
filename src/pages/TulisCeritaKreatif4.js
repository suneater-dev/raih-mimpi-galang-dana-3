import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/TulisCerita.css';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const TulisCeritaKreatif4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaKreatif_part4') || '';
  });
  const [showExampleModal, setShowExampleModal] = useState(false);
  const [draftId, setDraftId] = useState(null);

  const previousData = location.state || {};

  useEffect(() => {
    const currentDraftId = sessionStorage.getItem('current_draft_id');
    if (currentDraftId) {
      setDraftId(currentDraftId);
    } else {
      const newDraftId = generateDraftId();
      setDraftId(newDraftId);
      sessionStorage.setItem('current_draft_id', newDraftId);
    }
  }, []);

  const exampleText = "Kondisi UMKM di Indonesia saat ini sangat membutuhkan dukungan dalam hal branding dan pemasaran visual. Berdasarkan survey yang saya lakukan, 78% UMKM mengaku kesulitan dalam membuat desain yang menarik untuk produk mereka. Hal ini berdampak pada daya saing produk di pasar yang semakin kompetitif.\n\nStudio kreatif yang akan saya bangun akan memberikan solusi dengan menyediakan layanan desain profesional dengan harga yang terjangkau untuk UMKM. Kami akan membantu mereka meningkatkan nilai jual produk melalui kemasan dan branding yang menarik.\n\nSelain itu, studio ini juga akan menjadi tempat edukasi bagi para pelaku UMKM tentang pentingnya branding dalam bisnis. Kami akan mengadakan workshop dan seminar gratis setiap bulannya untuk berbagi ilmu tentang desain dan pemasaran visual.\n\nDampak positif yang diharapkan adalah meningkatnya daya saing UMKM lokal, terciptanya lapangan kerja baru untuk desainer muda, dan berkembangnya ekosistem kreatif di kota Bandung.";

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      localStorage.setItem('ceritaKreatif_part4', storyContent);
      navigate('/tulis-cerita-kreatif-5');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-kreatif-3');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye-kreatif');
    }
  };

  const handleSave = () => {
    alert('Cerita telah disimpan!');
  };

  const handleSaveAsDraft = () => {
    if (!draftId) return;

    localStorage.setItem('ceritaKreatif_part4', storyContent);

    const draftData = {
      id: draftId,
      category: 'kreatif',
      title: previousData.campaignTitle || previousData.selectedCategory?.title || 'Draft Karya Kreatif',
      image: previousData.photoPreview || null,
      progress: 83,
      steps: '5 dari 6 tahap',
      lastStep: '/tulis-cerita-kreatif-4',
      target: previousData.targetData?.amount ? parseInt(previousData.targetData.amount.replace(/\./g, '')) : 0,
      daysLeft: previousData.targetData?.duration ? parseInt(previousData.targetData.duration) : 0,
      formData: {
        ...previousData,
        storyPart4: storyContent
      },
      storyData: getCurrentPageData('kreatif')
    };

    const saved = saveDraft(draftData);
    if (saved) {
      alert('Draft berhasil disimpan! Anda dapat melanjutkannya nanti dari Dashboard.');
      navigate('/dashboard');
    } else {
      alert('Gagal menyimpan draft. Silakan coba lagi.');
    }
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
          <h2 className="modern-subheading">Jelaskan dampak positif dan manfaat proyek ini</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Ceritakan bagaimana proyek ini akan memberikan dampak positif bagi Anda, masyarakat, atau lingkungan sekitar. Jelaskan juga manfaat jangka panjang yang akan dihasilkan."
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

        {/* Save as Draft Button */}
        <div className="draft-save-section">
          <button className="draft-save-btn" onClick={handleSaveAsDraft}>
            <svg className="draft-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="17 21 17 13 7 13 7 21" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="7 3 7 8 15 8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Simpan Sebagai Draft
          </button>
          <p className="draft-save-hint">Simpan progress Anda dan lanjutkan nanti dari Dashboard</p>
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

export default TulisCeritaKreatif4;