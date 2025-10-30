import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/TulisCerita.css';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const TulisCerita2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [section1Content, setSection1Content] = useState('');
  const [section2Content, setSection2Content] = useState('');
  const [showExampleModal1, setShowExampleModal1] = useState(false);
  const [showExampleModal2, setShowExampleModal2] = useState(false);
  const [draftId, setDraftId] = useState(null);

  const previousData = location.state || {};

  const exampleText1 = "Andi didiagnosis menderita leukemia limfoblastik akut (ALL) pada bulan Maret 2024. Sejak diagnosis ini, kondisinya sangat mengkhawatirkan. Andi yang dulu sangat aktif dan ceria sekarang terlihat pucat dan lemah.\n\nGejala yang dialami Andi sangat beragam. Ia sering mengalami demam tinggi yang tidak kunjung turun, mudah memar meski hanya terbentur ringan, dan nafsu makannya menurun drastis. Berat badannya turun dari 25 kg menjadi 20 kg dalam waktu 2 bulan.\n\nSebagai kakak, saya sangat sedih melihat Andi yang dulu suka berlari-larian sekarang lebih banyak berbaring lemah di tempat tidur. Ia sering mengeluh pusing dan mual, terutama setelah menjalani kemoterapi.";

  const exampleText2 = "Sejak diagnosis di bulan Maret, Andi sudah menjalani berbagai upaya pengobatan. Pertama, ia menjalani biopsi sumsum tulang untuk memastikan jenis leukemia yang dideritanya.\n\nAndi telah menjalani 3 siklus kemoterapi di RSUP Dr. Sardjito Yogyakarta. Setiap siklus kemoterapi membutuhkan rawat inap selama 1-2 minggu. Selain kemoterapi, Andi juga rutin mendapat transfusi darah dan trombosit karena kadar dalam tubuhnya yang rendah.\n\nDokter juga memberikan obat-obatan pendukung untuk mengatasi efek samping kemoterapi seperti mual dan muntah. Keluarga kami juga berusaha memberikan nutrisi terbaik dan suplemen untuk menjaga daya tahan tubuh Andi.";

  useEffect(() => {
    const currentDraftId = sessionStorage.getItem('current_draft_id');
    if (currentDraftId) {
      setDraftId(currentDraftId);
    } else {
      const newDraftId = generateDraftId();
      setDraftId(newDraftId);
      sessionStorage.setItem('current_draft_id', newDraftId);
    }

    // Load saved content from localStorage
    const saved1 = localStorage.getItem('cerita_part2_section1');
    const saved2 = localStorage.getItem('cerita_part2_section2');
    if (saved1) setSection1Content(saved1);
    if (saved2) setSection2Content(saved2);
  }, []);

  const handleNext = () => {
    if (section1Content.trim().length > 0 || section2Content.trim().length > 0) {
      // Save to localStorage
      localStorage.setItem('cerita_part2_section1', section1Content);
      localStorage.setItem('cerita_part2_section2', section2Content);
      navigate('/tulis-cerita-3');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye');
    }
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('cerita_part2_section1', section1Content);
    localStorage.setItem('cerita_part2_section2', section2Content);
    alert('Cerita telah disimpan!');
  };

  const showExample1 = () => {
    setShowExampleModal1(true);
  };

  const showExample2 = () => {
    setShowExampleModal2(true);
  };

  const closeExampleModal1 = () => {
    setShowExampleModal1(false);
  };

  const closeExampleModal2 = () => {
    setShowExampleModal2(false);
  };

  const handleSaveAsDraft = () => {
    if (!draftId) return;

    // Save current story content
    localStorage.setItem('cerita_part2_section1', section1Content);
    localStorage.setItem('cerita_part2_section2', section2Content);

    const draftData = {
      id: draftId,
      category: 'medis',
      title: previousData.campaignTitle || previousData.patientName || 'Draft Bantuan Medis',
      image: previousData.photoPreview || null,
      progress: 86,
      steps: '6 dari 7 tahap',
      lastStep: '/tulis-cerita-2',
      target: previousData.targetData?.amount ? parseInt(previousData.targetData.amount.replace(/\./g, '')) : 0,
      daysLeft: previousData.targetData?.duration ? parseInt(previousData.targetData.duration) : 0,
      formData: {
        ...previousData,
        storyPart2Section1: section1Content,
        storyPart2Section2: section2Content
      },
      storyData: getCurrentPageData('medis')
    };

    const saved = saveDraft(draftData);
    if (saved) {
      alert('Draft berhasil disimpan! Anda dapat melanjutkannya nanti dari Dashboard.');
      navigate('/dashboard');
    } else {
      alert('Gagal menyimpan draft. Silakan coba lagi.');
    }
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
          <span className="modern-text small">Bagian 2 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '33%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Kondisi saat ini dan upaya pengobatan</h2>
        </div>
        <div className="modern-card">
          {/* Section 1 */}
          <div className="story-section-modern">
            <h3 className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Jelaskan tentang penyakit pasien dan kondisinya dari awal pasien menderita sakit hingga kondisi terkini!</h3>
            
            <button className="modern-btn secondary example-btn-small" onClick={showExample1} style={{marginBottom: '16px'}}>
              📄 Lihat contoh
            </button>
            
            <textarea
              className="modern-textarea story-textarea-medium"
              placeholder="Ceritakan tentang penyakit yang diderita pasien, gejala yang dialami, dan bagaimana kondisinya saat ini."
              value={section1Content}
              onChange={(e) => setSection1Content(e.target.value)}
            />
          </div>

          {/* Section 2 */}
          <div className="story-section-modern">
            <h3 className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Upaya pengobatan apa saja yang telah dilakukan sejak awal hingga kini?</h3>
            
            <button className="modern-btn secondary example-btn-small" onClick={showExample2} style={{marginBottom: '16px'}}>
              📄 Lihat contoh
            </button>
            
            <textarea
              className="modern-textarea story-textarea-medium"
              placeholder="Jelaskan upaya pengobatan yang sudah dilakukan, rumah sakit yang pernah dikunjungi, dan treatment yang sudah dijalani."
              value={section2Content}
              onChange={(e) => setSection2Content(e.target.value)}
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
            className={`modern-btn ${(section1Content.trim().length === 0 && section2Content.trim().length === 0) ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={section1Content.trim().length === 0 && section2Content.trim().length === 0}
            style={{opacity: (section1Content.trim().length === 0 && section2Content.trim().length === 0) ? 0.5 : 1}}
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

      {/* Example Modal 1 */}
      {showExampleModal1 && (
        <div className="example-modal-overlay" onClick={closeExampleModal1}>
          <div className="example-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="example-modal-header">
              <h3 className="modern-subheading">Contoh Cerita</h3>
              <button className="example-modal-close" onClick={closeExampleModal1}>✕</button>
            </div>
            <div className="example-modal-body">
              <p className="example-text">{exampleText1}</p>
            </div>
            <div className="example-modal-footer">
              <button className="modern-btn" onClick={closeExampleModal1}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Example Modal 2 */}
      {showExampleModal2 && (
        <div className="example-modal-overlay" onClick={closeExampleModal2}>
          <div className="example-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="example-modal-header">
              <h3 className="modern-subheading">Contoh Cerita</h3>
              <button className="example-modal-close" onClick={closeExampleModal2}>✕</button>
            </div>
            <div className="example-modal-body">
              <p className="example-text">{exampleText2}</p>
            </div>
            <div className="example-modal-footer">
              <button className="modern-btn" onClick={closeExampleModal2}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TulisCerita2;