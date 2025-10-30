import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/BantuanMedis.css';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const BantuanMedis = () => {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState('');
  const [otherRelationship, setOtherRelationship] = useState('');
  const [draftId, setDraftId] = useState(null);

  // Initialize or get draft ID
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

  const patientOptions = [
    { id: 'myself', value: 'myself', label: 'Saya sendiri' },
    { id: 'family-same-kk', value: 'family-same-kk', label: 'Keluarga yang satu KK dengan saya' },
    { id: 'family-different-kk', value: 'family-different-kk', label: 'Keluarga inti (ayah/ibu/kakak/adik/anak) yang sudah pisah KK dengan saya' },
    { id: 'others', value: 'others', label: 'Selain pilihan di atas' }
  ];

  const handlePatientSelect = (value) => {
    setSelectedPatient(value);
  };

  const handleConfirm = () => {
    if (selectedPatient) {
      const selectedOption = patientOptions.find(opt => opt.value === selectedPatient);

      // If "others" is selected, include the custom relationship
      const patientData = selectedPatient === 'others'
        ? { ...selectedOption, customRelationship: otherRelationship }
        : selectedOption;

      navigate('/detail-pasien', {
        state: {
          selectedPatient: patientData
        }
      });
    }
  };

  const handleSaveAsDraft = () => {
    if (!draftId) return;

    const selectedOption = patientOptions.find(opt => opt.value === selectedPatient);
    const draftData = {
      id: draftId,
      category: 'medis',
      title: 'Draft Bantuan Medis',
      image: null,
      progress: 14, // 1 out of 7 steps
      steps: '1 dari 7 tahap',
      lastStep: '/bantuan-medis',
      target: 0,
      daysLeft: 0,
      formData: {
        selectedPatient: selectedOption
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
    { number: 1, label: 'Pasien', active: true },
    { number: 2, label: 'Data diri', active: false },
    { number: 3, label: 'Penerima', active: false },
    { number: 4, label: 'Target donasi', active: false },
    { number: 5, label: 'Judul', active: false },
    { number: 6, label: 'Cerita', active: false },
    { number: 7, label: 'Ajakan', active: false }
  ];

  const handleBack = () => {
    navigate('/bantuan-lainnya');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="logo white-text">Bantuan Medis & Kesehatan</div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Main Content */}
      <div className="main-content-modern">
        <h2 className="modern-heading">Siapa yang sakit?</h2>
        
        <div className="modern-radio-group">
          {patientOptions.map((option) => (
            <label
              key={option.id}
              className={`modern-option ${selectedPatient === option.value ? 'selected' : ''}`}
              onClick={() => handlePatientSelect(option.value)}
            >
              <input
                type="radio"
                name="patient"
                value={option.value}
                checked={selectedPatient === option.value}
                onChange={() => handlePatientSelect(option.value)}
              />
              <div className="modern-option-content">
                <h4>{option.label}</h4>
              </div>
            </label>
          ))}
        </div>

        {/* Dropdown/Input for "Others" option */}
        {selectedPatient === 'others' && (
          <div className="other-relationship-input">
            <label className="input-label">Hubungan dengan pasien</label>
            <input
              type="text"
              className="modern-input"
              placeholder="Contoh: Teman, Tetangga, Rekan kerja, dsb."
              value={otherRelationship}
              onChange={(e) => setOtherRelationship(e.target.value)}
            />
          </div>
        )}

        <button
          className={`modern-btn full-width ${(!selectedPatient || (selectedPatient === 'others' && !otherRelationship)) ? 'disabled' : ''}`}
          onClick={handleConfirm}
          disabled={!selectedPatient || (selectedPatient === 'others' && !otherRelationship)}
        >
          Konfirmasi
        </button>

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
    </div>
  );
};

export default BantuanMedis;