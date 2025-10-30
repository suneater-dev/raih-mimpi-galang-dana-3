import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/TulisCerita.css';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const TulisCerita5 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [costPlanContent, setCostPlanContent] = useState('');
  const [reasonContent, setReasonContent] = useState('');
  const [showExampleModal1, setShowExampleModal1] = useState(false);
  const [showExampleModal2, setShowExampleModal2] = useState(false);
  const [draftId, setDraftId] = useState(null);

  const previousData = location.state || {};

  const exampleText1 = "Untuk pengobatan Andi, kami membutuhkan dana sebesar Rp 150.000.000. Rincian biayanya adalah sebagai berikut:\n\n1. Biaya kemoterapi selama 6 bulan: Rp 80.000.000\n2. Biaya rawat inap: Rp 30.000.000\n3. Obat-obatan dan suplemen: Rp 25.000.000\n4. Biaya pemeriksaan rutin dan lab: Rp 15.000.000\n\nDana ini akan digunakan secara bertahap sesuai dengan jadwal pengobatan yang telah ditetapkan oleh dokter.";

  const exampleText2 = "Ayah Andi bekerja sebagai buruh harian dengan penghasilan tidak menentu, sekitar Rp 2.500.000 per bulan. Ibu Andi adalah ibu rumah tangga. Dengan kondisi ekonomi keluarga yang terbatas, sangat sulit bagi kami untuk membiayai pengobatan yang membutuhkan dana besar ini.\n\nSebelumnya, kami sudah menjual beberapa barang berharga dan meminjam dari kerabat, namun masih belum mencukupi. Kondisi Andi yang semakin memburuk membuat kami harus segera mendapatkan pengobatan intensif.";

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
    const saved1 = localStorage.getItem('cerita_part5_section1');
    const saved2 = localStorage.getItem('cerita_part5_section2');
    if (saved1) setCostPlanContent(saved1);
    if (saved2) setReasonContent(saved2);
  }, []);

  const handleNext = () => {
    if (costPlanContent.trim().length > 0 && reasonContent.trim().length > 0) {
      // Save to localStorage
      localStorage.setItem('cerita_part5_section1', costPlanContent);
      localStorage.setItem('cerita_part5_section2', reasonContent);
      navigate('/tulis-cerita-6');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-4');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye');
    }
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('cerita_part5_section1', costPlanContent);
    localStorage.setItem('cerita_part5_section2', reasonContent);
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
    localStorage.setItem('cerita_part5_section1', costPlanContent);
    localStorage.setItem('cerita_part5_section2', reasonContent);

    const draftData = {
      id: draftId,
      category: 'medis',
      title: previousData.campaignTitle || previousData.patientName || 'Draft Bantuan Medis',
      image: previousData.photoPreview || null,
      progress: 86,
      steps: '6 dari 7 tahap',
      lastStep: '/tulis-cerita-5',
      target: previousData.targetData?.amount ? parseInt(previousData.targetData.amount.replace(/\./g, '')) : 0,
      daysLeft: previousData.targetData?.duration ? parseInt(previousData.targetData.duration) : 0,
      formData: {
        ...previousData,
        storyPart5Section1: costPlanContent,
        storyPart5Section2: reasonContent
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
          <h2 className="modern-subheading">Rencana Biaya & Alasan Pendanaan</h2>
        </div>
        
        <div className="modern-card">
          {/* Section 1 - Cost and Usage Plan */}
          <div className="story-section-modern">
            <h3 className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Berapa biaya yang dibutuhkan dan bagaimana rencana penggunaannya?</h3>
            
            <button className="modern-btn secondary example-btn-small" onClick={showExample1}>
              📄 Lihat contoh
            </button>
            
            <textarea
              className="modern-textarea"
              placeholder="Tuliskan secara detail biaya apa saja yang dibutuhkan beserta dengan total kebutuhan biayanya"
              value={costPlanContent}
              onChange={(e) => setCostPlanContent(e.target.value)}
              rows={6}
            />
          </div>

          {/* Section 2 - Reason Patient Needs Funds */}
          <div className="story-section-modern">
            <h3 className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Jelaskan alasan pasien membutuhkan dana tersebut</h3>
            
            <button className="modern-btn secondary example-btn-small" onClick={showExample2}>
              📄 Lihat contoh
            </button>
            
            <textarea
              className="modern-textarea"
              placeholder="Sertakan alasan, perbandingan kebutuhan dan keadaan ekonomi pasien dan keluarga pasien"
              value={reasonContent}
              onChange={(e) => setReasonContent(e.target.value)}
              rows={6}
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
            onClick={handleNext}
            disabled={costPlanContent.trim().length === 0 || reasonContent.trim().length === 0}
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

export default TulisCerita5;