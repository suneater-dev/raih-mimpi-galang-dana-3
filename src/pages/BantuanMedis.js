import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/BantuanMedis.css';

const BantuanMedis = () => {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState('');


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
      navigate('/detail-pasien');
    }
  };

  const handleBack = () => {
    navigate('/select-category');
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
      <ProgressSteps currentStep={1} />

      {/* Form Section */}
      <div className="modern-card">
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

        <button 
          className={`modern-btn full-width ${!selectedPatient ? 'disabled' : ''}`}
          onClick={handleConfirm}
          disabled={!selectedPatient}
          style={{ 
            marginTop: '32px',
            opacity: !selectedPatient ? 0.5 : 1 
          }}
        >
          Konfirmasi
        </button>
      </div>
    </div>
  );
};

export default BantuanMedis;