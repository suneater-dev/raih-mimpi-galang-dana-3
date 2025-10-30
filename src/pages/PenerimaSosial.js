import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/Penerima.css';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const PenerimaSosial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [penerimaData, setPenerimaData] = useState({
    namaPenerima: '',
    hubungan: '',
    alamat: ''
  });
  const [draftId, setDraftId] = useState(null);

  // Get data from previous steps
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

  const handleInputChange = (field, value) => {
    setPenerimaData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (isFormValid) {
      navigate('/target-donasi-sosial', {
        state: {
          ...previousData,
          penerimaData
        }
      });
    }
  };

  const handleBack = () => {
    navigate('/tujuan-detail-sosial', { state: previousData });
  };

  const handleSaveAsDraft = () => {
    if (!draftId) return;

    const draftData = {
      id: draftId,
      category: 'sosial',
      title: previousData.selectedCategory?.title || 'Draft Kegiatan Sosial',
      image: null,
      progress: 33,
      steps: '2 dari 6 tahap',
      lastStep: '/penerima-sosial',
      target: 0,
      daysLeft: 0,
      formData: {
        ...previousData,
        penerimaData
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

  const isFormValid = penerimaData.namaPenerima.trim() &&
                    penerimaData.hubungan.trim() &&
                    penerimaData.alamat.trim();

  const steps = [
    { number: 1, label: 'Tujuan', active: false },
    { number: 2, label: 'Penerima', active: true },
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
        <h2 className="modern-subheading">Data penerima bantuan</h2>
        <p className="modern-text" style={{marginBottom: '24px', color: '#6B7280'}}>
          Masukkan data lengkap penerima bantuan.
        </p>

          {/* Nama Penerima */}
          <div className="form-group-modern">
            <label className="form-label-modern">Nama penerima bantuan</label>
            <input
              type="text"
              className="modern-input"
              placeholder="Nama lengkap penerima bantuan"
              value={penerimaData.namaPenerima}
              onChange={(e) => handleInputChange('namaPenerima', e.target.value)}
            />
          </div>

          {/* Hubungan */}
          <div className="form-group-modern">
            <label className="form-label-modern">Hubungan dengan Anda</label>
            <input 
              type="text" 
              className="modern-input" 
              placeholder="Contoh: Ketua RT, Koordinator Kegiatan, dll"
              value={penerimaData.hubungan}
              onChange={(e) => handleInputChange('hubungan', e.target.value)}
            />
          </div>

          {/* Alamat */}
          <div className="form-group-modern">
            <label className="form-label-modern">Alamat lengkap</label>
            <textarea
              className="modern-textarea"
              placeholder="Alamat lengkap lokasi kegiatan sosial"
              value={penerimaData.alamat}
              onChange={(e) => handleInputChange('alamat', e.target.value)}
              rows="3"
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

export default PenerimaSosial;