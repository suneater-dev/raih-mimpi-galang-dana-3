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
    </div>
  );
};

export default PatientName;