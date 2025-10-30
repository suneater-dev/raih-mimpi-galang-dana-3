import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/TujuanDetail.css';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const TujuanDetailSosial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tujuanDetail, setTujuanDetail] = useState('');
  const [draftId, setDraftId] = useState(null);

  // Get selected category from previous page
  const selectedCategory = location.state?.selectedCategory;

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
    if (tujuanDetail.trim()) {
      navigate('/penerima-sosial', {
        state: {
          selectedCategory,
          tujuanDetail
        }
      });
    }
  };

  const handleBack = () => {
    navigate('/kegiatan-sosial');
  };

  const handleSaveAsDraft = () => {
    if (!draftId) return;

    const draftData = {
      id: draftId,
      category: 'sosial',
      title: selectedCategory?.title || 'Draft Kegiatan Sosial',
      image: null,
      progress: 17,
      steps: '1 dari 6 tahap',
      lastStep: '/tujuan-detail-sosial',
      target: 0,
      daysLeft: 0,
      formData: {
        selectedCategory,
        tujuanDetail
      },
      storyData: getCurrentPageData('sosial')
    };

    const saved = saveDraft(draftData);
    if (saved) {
      alert('Draft berhasil disimpan! Anda dapat melanjutkannya nanti dari Dashboard.');
      navigate('/dashboard');
    } else {
      alert('Gagal menyimpan draft. Silakan coba lagi.');
    }
  };

  const isFormValid = tujuanDetail.trim().length > 0;

  const steps = [
    { number: 1, label: 'Tujuan', active: true },
    { number: 2, label: 'Penerima', active: false },
    { number: 3, label: 'Target donasi', active: false },
    { number: 4, label: 'Judul', active: false },
    { number: 5, label: 'Cerita', active: false },
    { number: 6, label: 'Ajakan', active: false }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Kegiatan Sosial</div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Form Section */}
      <div className="modern-card">
        {/* Category Display */}
        {selectedCategory && (
          <div className="selected-category-display" style={{marginBottom: '24px'}}>
            <h3 className="modern-subheading">Kategori yang dipilih:</h3>
            <div className="category-badge-modern" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'rgba(152, 60, 237, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(152, 60, 237, 0.2)'
            }}>
              <span className="category-icon" style={{fontSize: '20px'}}>{selectedCategory.icon}</span>
              <span className="category-text" style={{fontWeight: '600', color: '#983ced'}}>{selectedCategory.title}</span>
            </div>
          </div>
        )}

        {/* Tujuan Detail Form */}
        <div className="form-group-modern">
          <h2 className="modern-subheading">Jelaskan tujuan kegiatan sosial secara detail</h2>
          <p className="modern-text" style={{marginBottom: '16px', color: '#6B7280'}}>
            Ceritakan dengan jelas tujuan, sasaran, dan manfaat dari kegiatan sosial yang akan dilaksanakan.
          </p>
          <textarea 
            className="modern-textarea" 
            placeholder="Contoh: Kegiatan bakti sosial ini bertujuan untuk membantu masyarakat kurang mampu di daerah terpencil dengan memberikan bantuan sembako, kesehatan, dan pendidikan. Target kegiatan adalah 200 keluarga pra-sejahtera..."
            value={tujuanDetail}
            onChange={(e) => setTujuanDetail(e.target.value)}
            rows="8"
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-modern">
        <button className="modern-btn secondary" onClick={handleBack}>
          ← Sebelumnya
        </button>
        <button
          className={`modern-btn ${!isFormValid ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={!isFormValid}
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
  );
};

export default TujuanDetailSosial;