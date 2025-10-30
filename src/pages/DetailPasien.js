import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/DetailPasien.css';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const DetailPasien = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPatient = location.state?.selectedPatient;
  const [phoneNumber, setPhoneNumber] = useState('628312412312');
  const [selectedBankOptions, setSelectedBankOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [agreements, setAgreements] = useState({
    agreement1: true,
    agreement2: true,
    agreement3: true,
    agreement4: true
  });
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


  const bankOptions = [
    { id: 'patient-direct', label: 'Pasien langsung' },
    { 
      id: 'family-same-kk', 
      label: 'Keluarga satu KK',
      info: 'Nama pemilik rekening harus tertera di Kartu Keluarga (KK) pasien atau tertera di akta kelahiran/Surat Keterangan Lahir (SKL) pasien jika pasien baru lahir atau belum ada KK.'
    },
    { 
      id: 'family-diff-kk', 
      label: 'Keluarga inti berbeda KK',
      info: 'Harus terdapat penghubung di antara KK pasien dan KK pemilik rekening (cth. ada nama orang tua yang sama, nama pemilik rekening merupakan orang tua pasien atau sebaliknya)'
    },
    { id: 'hospital', label: 'Rumah sakit' },
    { 
      id: 'others', 
      label: 'Selain pilihan di atas',
      info: 'Memerlukan surat kuasa bahwa pasien setuju atas penggunaan rekening ini serta foto pasien dan pemilik rekening sedang memegang surat kuasa yang bersangkutan.'
    }
  ];

  const handleCheckboxChange = (optionId) => {
    setSelectedBankOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  const handleNext = () => {
    navigate('/nama-pasien');
  };

  const handleAgreementChange = (agreementId) => {
    setAgreements(prev => ({
      ...prev,
      [agreementId]: !prev[agreementId]
    }));
  };

  const handleAcceptAgreement = () => {
    // Just close modal and go to next page - simple!
    setShowModal(false);
    navigate('/nama-pasien');
  };

  const handleBack = () => {
    navigate('/bantuan-medis');
  };

  const handleSaveAsDraft = () => {
    if (!draftId) return;

    const draftData = {
      id: draftId,
      category: 'medis',
      title: 'Draft Bantuan Medis',
      image: null,
      progress: 29,
      steps: '2 dari 7 tahap',
      lastStep: '/detail-pasien',
      target: 0,
      daysLeft: 0,
      formData: {
        ...location.state,
        phoneNumber,
        selectedBankOptions,
        agreements
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
    { number: 2, label: 'Data diri', active: true },
    { number: 3, label: 'Penerima', active: false },
    { number: 4, label: 'Target donasi', active: false },
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
        <div className="logo white-text">Bantuan Medis & Kesehatan</div>
        <div className="header-spacer"></div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Main Content */}
      <div className="main-content-modern">
        <div className="form-section-modern">
          {/* Selected Patient */}
          {selectedPatient && (
            <div className="form-group-modern">
              <h2 className="modern-subheading">Siapa yang sakit?</h2>
              <div className="selected-option-modern">
                <span className="selected-text-modern">{selectedPatient.label}</span>
                <button className="change-btn-modern" onClick={() => navigate('/bantuan-medis')}>
                  Ubah
                </button>
              </div>
            </div>
          )}

          {/* Phone Number */}
          <div className="form-group-modern">
            <label className="form-label-modern">Masukkan no. ponsel kamu</label>
            <p className="form-description-modern">Seluruh notifikasi akan dikirim melalui nomor ini</p>
            <input 
              type="tel" 
              className="modern-input detail-input" 
              placeholder="628312412312" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-modern">
        <div className="nav-buttons-container">
          <button className="nav-btn-secondary" onClick={handleBack}>
            Sebelumnya
          </button>
          <button className="nav-btn-primary" onClick={handleNext}>
            Selanjutnya
          </button>
        </div>
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

export default DetailPasien;