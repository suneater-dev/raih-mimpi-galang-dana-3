import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/TulisCerita.css';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const TulisCeritaPendidikan6 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaPendidikan_part6') || '';
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

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      localStorage.setItem('ceritaPendidikan_part6', storyContent);
      navigate('/review-cerita-pendidikan');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-pendidikan-5');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye-pendidikan');
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

  const handleSaveAsDraft = () => {
    if (!draftId) return;

    localStorage.setItem('ceritaPendidikan_part6', storyContent);

    const draftData = {
      id: draftId,
      category: 'pendidikan',
      title: previousData.campaignTitle || previousData.selectedCategory?.title || 'Draft Bantuan Pendidikan',
      image: previousData.photoPreview || null,
      progress: 86,
      steps: '6 dari 6 tahap',
      lastStep: '/tulis-cerita-pendidikan-6',
      target: previousData.targetData?.amount ? parseInt(previousData.targetData.amount.replace(/\./g, '')) : 0,
      daysLeft: previousData.targetData?.duration ? parseInt(previousData.targetData.duration) : 0,
      formData: {
        ...previousData,
        storyPart6: storyContent
      },
      storyData: getCurrentPageData('pendidikan')
    };

    const saved = saveDraft(draftData);
    if (saved) {
      alert('Draft berhasil disimpan! Anda dapat melanjutkannya nanti dari Dashboard.');
      navigate('/dashboard');
    } else {
      alert('Gagal menyimpan draft. Silakan coba lagi.');
    }
  };

  const exampleText = "Kami berharap dan berdoa agar program bantuan pendidikan ini dapat berjalan dengan lancar dan memberikan dampak positif yang berkelanjutan bagi masa depan anak-anak di desa kami. Semoga dengan bantuan dari para donatur yang mulia hati, anak-anak ini dapat merasakan kebahagiaan belajar tanpa terbebani masalah ekonomi keluarga.\n\nHarapan terbesar kami adalah melihat senyuman ceria di wajah anak-anak ketika mereka dapat bersekolah dengan layak. Mereka berhak mendapatkan pendidikan yang berkualitas sama seperti anak-anak di kota. Dengan fasilitas yang lebih baik dan tanpa beban biaya, kami yakin prestasi akademik mereka akan meningkat pesat.\n\nKami bermimpi suatu hari nanti, anak-anak lulusan sekolah kami dapat melanjutkan pendidikan ke jenjang yang lebih tinggi, bahkan ada di antaranya yang bisa menjadi dokter, guru, atau profesi lain yang dapat membangun daerah ini menjadi lebih maju. Pendidikan adalah kunci untuk memutus rantai kemiskinan.\n\nTerima kasih kepada semua pihak yang telah memberikan dukungan dan kepercayaan. Semoga kebaikan yang diberikan mendapat balasan yang berlipat ganda dari Yang Maha Kuasa.";

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
          <h2 className="modern-subheading">Harapan dan doa untuk masa depan</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Sampaikan harapan, doa, dan aspirasi Anda untuk keberhasilan program bantuan pendidikan ini serta dampak positif yang diinginkan untuk masa depan anak-anak."
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
              <h3 className="example-modal-title">Contoh Cerita - Bagian 6</h3>
              <button className="example-modal-close" onClick={closeExampleModal}>✕</button>
            </div>
            <div className="example-modal-body">
              <p className="example-modal-text">{exampleText}</p>
            </div>
            <div className="example-modal-footer">
              <button className="modern-btn" onClick={closeExampleModal}>Mengerti</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TulisCeritaPendidikan6;