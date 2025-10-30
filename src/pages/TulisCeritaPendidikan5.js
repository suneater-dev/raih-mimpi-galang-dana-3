import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/TulisCerita.css';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const TulisCeritaPendidikan5 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaPendidikan_part5') || '';
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
      localStorage.setItem('ceritaPendidikan_part5', storyContent);
      navigate('/tulis-cerita-pendidikan-6');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-pendidikan-4');
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

    localStorage.setItem('ceritaPendidikan_part5', storyContent);

    const draftData = {
      id: draftId,
      category: 'pendidikan',
      title: previousData.campaignTitle || previousData.selectedCategory?.title || 'Draft Bantuan Pendidikan',
      image: previousData.photoPreview || null,
      progress: 83,
      steps: '5 dari 6 tahap',
      lastStep: '/tulis-cerita-pendidikan-5',
      target: previousData.targetData?.amount ? parseInt(previousData.targetData.amount.replace(/\./g, '')) : 0,
      daysLeft: previousData.targetData?.duration ? parseInt(previousData.targetData.duration) : 0,
      formData: {
        ...previousData,
        storyPart5: storyContent
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

  const exampleText = "Untuk mengatasi permasalahan ini secara komprehensif, kami membutuhkan dana sebesar Rp 60.000.000. Rencana penggunaan dana tersebut telah kami susun dengan detail sebagai berikut:\n\n1. Beasiswa pendidikan untuk 30 siswa kurang mampu (Rp 35.000.000):\n   - Biaya SPP bulanan @ Rp 50.000 x 12 bulan x 30 siswa = Rp 18.000.000\n   - Seragam sekolah lengkap @ Rp 300.000 x 30 siswa = Rp 9.000.000\n   - Alat tulis dan buku pelajaran @ Rp 200.000 x 30 siswa = Rp 6.000.000\n   - Tas dan sepatu sekolah @ Rp 150.000 x 30 siswa = Rp 4.500.000\n\n2. Perbaikan fasilitas sekolah (Rp 20.000.000):\n   - Pengadaan buku perpustakaan baru = Rp 10.000.000\n   - Perbaikan dan penambahan meja kursi belajar = Rp 7.000.000\n   - Pengadaan alat peraga pendidikan = Rp 3.000.000\n\n3. Program pendampingan dan pelatihan (Rp 5.000.000):\n   - Pelatihan guru dalam metode pembelajaran modern = Rp 3.000.000\n   - Program bimbingan belajar intensif = Rp 2.000.000\n\nDengan bantuan ini, kami yakin dapat memberikan kesempatan pendidikan yang layak bagi anak-anak desa dan memutus rantai kemiskinan melalui pendidikan.";

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
          <h2 className="modern-subheading">Rencana penggunaan dana secara detail</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Jelaskan secara detail bagaimana dana yang terkumpul akan digunakan untuk program bantuan pendidikan, termasuk rincian biaya dan alasan mengapa bantuan dari masyarakat sangat dibutuhkan."
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
              <h3 className="example-modal-title">Contoh Cerita - Bagian 5</h3>
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

export default TulisCeritaPendidikan5;