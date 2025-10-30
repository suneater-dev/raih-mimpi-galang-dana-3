import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/PatientName.css';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const PatientName = () => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState('');
  const [disease, setDisease] = useState('');
  const [draftId, setDraftId] = useState(null);

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
    if (patientName.trim() && disease.trim()) {
      navigate('/riwayat-medis');
    }
  };

  const handlePrevious = () => {
    navigate('/detail-pasien');
  };

  const handleSaveAsDraft = () => {
    if (!draftId) return;

    const draftData = {
      id: draftId,
      category: 'medis',
      title: patientName || 'Draft Bantuan Medis',
      image: null,
      progress: 43,
      steps: '3 dari 7 tahap',
      lastStep: '/nama-pasien',
      target: 0,
      daysLeft: 0,
      formData: {
        patientName,
        disease
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

  const steps = [
    { number: 1, label: 'Pasien', active: false },
    { number: 2, label: 'Data diri', active: false },
    { number: 3, label: 'Penerima', active: true },
    { number: 4, label: 'Target donasi', active: false },
    { number: 5, label: 'Judul', active: false },
    { number: 6, label: 'Cerita', active: false },
    { number: 7, label: 'Ajakan', active: false }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handlePrevious}>
          ←
        </button>
        <div className="logo white-text">Bantuan Medis & Kesehatan</div>
        <div className="header-spacer"></div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Main Content */}
      <div className="modern-card" style={{margin: '20px', marginBottom: '100px'}}>
        <h2 className="modern-subheading" style={{marginBottom: '24px'}}>Data Pasien</h2>

        {/* Patient Name */}
        <div className="form-group-modern">
          <label className="form-label-modern">Nama pasien</label>
          <input
            type="text"
            className="modern-input"
            placeholder="Nama lengkap sesuai dokumen"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>

        {/* Disease/Condition */}
        <div className="form-group-modern">
          <label className="form-label-modern">Diagnosis penyakit</label>
          <input
            type="text"
            className="modern-input"
            placeholder="Nama penyakit sesuai dokumen medis"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
          />
        </div>

        {/* Info Note */}
        <div style={{
          marginTop: '20px',
          padding: '12px 16px',
          backgroundColor: '#F9FAFB',
          borderLeft: '3px solid #983ced',
          borderRadius: '4px'
        }}>
          <p className="modern-text" style={{fontSize: '13px', color: '#6B7280', margin: 0}}>
            💡 Pastikan nama dan penyakit sesuai dengan dokumen medis resmi
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-modern">
        <button className="modern-btn secondary" onClick={handlePrevious}>
          ← Sebelumnya
        </button>
        <button
          className={`modern-btn ${(!patientName.trim() || !disease.trim()) ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={!patientName.trim() || !disease.trim()}
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

export default PatientName;