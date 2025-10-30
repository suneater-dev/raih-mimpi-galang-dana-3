import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/RiwayatMedis.css';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const RiwayatMedis = () => {
  const navigate = useNavigate();
  const [hospitalStatus, setHospitalStatus] = useState('');
  const [treatmentHistory, setTreatmentHistory] = useState('');
  const [fundingSource, setFundingSource] = useState('');
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
    navigate('/target-donasi');
  };

  const handleBack = () => {
    navigate('/nama-pasien');
  };

  const handleHospitalSearch = () => {
    alert('Hospital search functionality would open here');
  };

  const handleSaveAsDraft = () => {
    if (!draftId) return;

    // Get previous data from sessionStorage or state
    const previousData = JSON.parse(sessionStorage.getItem('riwayat_medis_data') || '{}');

    const draftData = {
      id: draftId,
      category: 'medis',
      title: previousData.patientName || 'Draft Bantuan Medis',
      image: null,
      progress: 43,
      steps: '3 dari 7 tahap',
      lastStep: '/riwayat-medis',
      target: 0,
      daysLeft: 0,
      formData: {
        ...previousData,
        hospitalStatus,
        treatmentHistory,
        fundingSource
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
    { number: 3, label: 'Penerima', active: false },
    { number: 4, label: 'Target donasi', active: true },
    { number: 5, label: 'Judul', active: false },
    { number: 6, label: 'Cerita', active: false },
    { number: 7, label: 'Ajakan', active: false }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Bantuan Medis & Kesehatan</div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Form Section */}
      <div className="modern-card">
        {/* Hospital Status */}
        <div className="form-group-modern">
          <h2 className="modern-subheading">Apakah pasien sedang menjalani rawat inap di rumah sakit?</h2>
          
          <div className="modern-radio-group">
            <label 
              className={`modern-option ${hospitalStatus === 'yes' ? 'selected' : ''}`}
              onClick={() => setHospitalStatus('yes')}
            >
              <input 
                type="radio" 
                name="hospital" 
                value="yes"
                checked={hospitalStatus === 'yes'}
                onChange={() => setHospitalStatus('yes')}
              />
              <div className="modern-option-content">
                <h4>Ya, sedang rawat inap</h4>
              </div>
            </label>
            
            <label 
              className={`modern-option ${hospitalStatus === 'no' ? 'selected' : ''}`}
              onClick={() => setHospitalStatus('no')}
            >
              <input 
                type="radio" 
                name="hospital" 
                value="no"
                checked={hospitalStatus === 'no'}
                onChange={() => setHospitalStatus('no')}
              />
              <div className="modern-option-content">
                <h4>Tidak</h4>
              </div>
            </label>
          </div>
        </div>

        {/* Hospital Selection */}
        {hospitalStatus === 'yes' && (
          <div className="hospital-section-modern">
            <label className="form-label-modern">Rumah sakit tempat pasien dirawat inap</label>
            <button className="hospital-input-modern" onClick={handleHospitalSearch}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.199 17.035a8.312 8.312 0 1 1 1.837-1.837l4.584 4.585a1.299 1.299 0 1 1-1.837 1.837l-4.584-4.585Zm.827-6.723a5.714 5.714 0 1 1-11.429 0 5.714 5.714 0 0 1 11.429 0Z" fill="#94a3b8"></path>
              </svg>
              <span>Nama rumah sakit</span>
            </button>
            <div className="hospital-info-modern">
              <p className="modern-text small">Tanggal pada surat keterangan rawat inap maks. 6 bulan ke belakang</p>
            </div>
          </div>
        )}

        {/* Treatment Details */}
        <div className="form-group-modern">
          <label className="form-label-modern">Upaya pengobatan yang sudah atau sedang dilakukan</label>
          <textarea 
            className="modern-textarea" 
            placeholder="Jelaskan secara lengkap upaya apa yang dilakukan dan tempat dilakukannya. (Cth. Operasi shunt jantung di RS Pusat Jantung, terapi wicara di RSCM, dsb.)"
            value={treatmentHistory}
            onChange={(e) => setTreatmentHistory(e.target.value)}
          />
        </div>

        {/* Funding Source */}
        <div className="form-group-modern">
          <h2 className="modern-subheading">Dari mana sumber biaya pengobatan/perawatan yang telah dilakukan sebelumnya?</h2>
          
          <div className="modern-radio-group">
            <label 
              className={`modern-option ${fundingSource === 'self' ? 'selected' : ''}`}
              onClick={() => setFundingSource('self')}
            >
              <input 
                type="radio" 
                name="funding" 
                value="self"
                checked={fundingSource === 'self'}
                onChange={() => setFundingSource('self')}
              />
              <div className="modern-option-content">
                <h4>Biaya mandiri</h4>
              </div>
            </label>
            
            <label 
              className={`modern-option ${fundingSource === 'insurance' ? 'selected' : ''}`}
              onClick={() => setFundingSource('insurance')}
            >
              <input 
                type="radio" 
                name="funding" 
                value="insurance"
                checked={fundingSource === 'insurance'}
                onChange={() => setFundingSource('insurance')}
              />
              <div className="modern-option-content">
                <h4>Asuransi (BPJS dan/atau swasta)</h4>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-modern">
        <button className="modern-btn secondary" onClick={handleBack}>
          ← Sebelumnya
        </button>
        <button className="modern-btn" onClick={handleNext}>
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

export default RiwayatMedis;