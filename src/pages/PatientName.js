import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/PatientName.css';

const PatientName = () => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState('');
  const [disease, setDisease] = useState('');


  const handleNext = () => {
    if (patientName.trim() && disease.trim()) {
      navigate('/riwayat-medis');
    }
  };

  const handlePrevious = () => {
    navigate('/detail-pasien');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handlePrevious}>
          ←
        </button>
        <div className="header-title white-text">Bantuan Medis & Kesehatan</div>
      </header>

      {/* Progress Section */}
      <ProgressSteps currentStep={3} />

      {/* Form Section */}
      <div className="modern-card">
        {/* Patient Name */}
        <div className="form-group-modern">
          <label className="form-label-modern">Nama pasien</label>
          <input 
            type="text" 
            className="modern-input" 
            placeholder="Nama pasien sesuai KK & dokumen medis"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>

        {/* Disease/Condition */}
        <div className="form-group-modern">
          <label className="form-label-modern">Penyakit atau kondisi yang diderita</label>
          <p className="modern-text small" style={{marginBottom: '16px'}}>Pastikan nama penyakit sesuai dengan yang tertera di dokumen medis</p>
          <input 
            type="text" 
            className="modern-input" 
            placeholder="Nama penyakit sesuai dokumen medis"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
          />
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
          style={{opacity: (!patientName.trim() || !disease.trim()) ? 0.5 : 1}}
        >
          Selanjutnya →
        </button>
      </div>
    </div>
  );
};

export default PatientName;