import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/DetailPasien.css';

const DetailPasien = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('628312412312');
  const [selectedBankOptions, setSelectedBankOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [agreements, setAgreements] = useState({
    agreement1: true,
    agreement2: true,
    agreement3: true,
    agreement4: true
  });


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

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Bantuan Medis & Kesehatan</div>
      </header>

      {/* Progress Section */}
      <ProgressSteps currentStep={2} />

      {/* Form Section */}
      <div className="modern-card">
        {/* Selected Patient */}
        <div className="form-group-modern">
          <h2 className="modern-subheading">Siapa yang sakit?</h2>
          <div className="selected-option-modern">
            <span className="selected-text-modern">Saya sendiri</span>
            <button className="modern-btn secondary" onClick={() => navigate('/bantuan-medis')} style={{padding: '8px 16px'}}>
              Ubah
            </button>
          </div>
        </div>

        {/* Phone Number */}
        <div className="form-group-modern">
          <label className="form-label-modern">Masukkan no. ponsel kamu</label>
          <p className="modern-text small" style={{marginBottom: '16px'}}>Seluruh notifikasi akan dikirim melalui nomor ini</p>
          <input 
            type="tel" 
            className="modern-input" 
            placeholder="628312412312" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Bank Account Selection */}
        <div className="form-group-modern">
          <label className="form-label-modern">Pilih rekening bank penggalangan dana</label>
          <p className="modern-text small" style={{marginBottom: '16px'}}>Donasi hanya bisa dicairkan ke rekening ini.</p>
          
          <div className="modern-checkbox-group">
            {bankOptions.map((option) => (
              <div key={option.id} className="checkbox-option-modern">
                <label className={`modern-option ${selectedBankOptions.includes(option.id) ? 'selected' : ''}`}>
                  <input 
                    type="checkbox"
                    checked={selectedBankOptions.includes(option.id)}
                    onChange={() => handleCheckboxChange(option.id)}
                  />
                  <div className="modern-option-content">
                    <h4>{option.label}</h4>
                  </div>
                </label>
                {option.info && selectedBankOptions.includes(option.id) && (
                  <div className="checkbox-info-modern">
                    <p className="modern-text small">{option.info}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-modern">
        <button className="modern-btn secondary" onClick={handleBack}>
          ← Sebelumnya
        </button>
        <button 
          className="modern-btn"
          onClick={handleNext}
        >
          Selanjutnya →
        </button>
      </div>

    </div>
  );
};

export default DetailPasien;