import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/DataDiri.css';

const DataDiriSosial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [namaLengkap, setNamaLengkap] = useState('');
  const [nomorHP, setNomorHP] = useState('');
  const [email, setEmail] = useState('');

  // Get data from previous steps
  const previousData = location.state || {};

  const handleNext = () => {
    if (isFormValid) {
      navigate('/penerima-sosial', {
        state: {
          ...previousData,
          dataDiri: {
            namaLengkap,
            nomorHP,
            email
          }
        }
      });
    }
  };

  const handleBack = () => {
    navigate('/tujuan-detail-sosial', { state: previousData });
  };

  const isFormValid = namaLengkap.trim() && nomorHP.trim() && email.trim();

  const steps = [
    { number: 1, label: 'Tujuan', active: false },
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
        <div className="header-title white-text">Kegiatan Sosial</div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Form Section */}
      <div className="modern-card">
        <h2 className="modern-subheading">Lengkapi data diri Anda</h2>
        <p className="modern-text" style={{marginBottom: '24px', color: '#6B7280'}}>
          Data ini akan digunakan untuk verifikasi dan komunikasi terkait kegiatan sosial.
        </p>

        {/* Nama Lengkap */}
        <div className="form-group-modern">
          <label className="form-label-modern">Nama lengkap</label>
          <input 
            type="text" 
            className="modern-input" 
            placeholder="Masukkan nama lengkap sesuai KTP"
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
          />
        </div>

        {/* Nomor HP */}
        <div className="form-group-modern">
          <label className="form-label-modern">Nomor HP</label>
          <div className="phone-input-container" style={{display: 'flex', gap: '8px'}}>
            <span className="country-code" style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              backgroundColor: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontWeight: '500',
              color: '#475569'
            }}>+62</span>
            <input 
              type="tel" 
              className="modern-input" 
              style={{flex: 1}}
              placeholder="Contoh: 81234567890"
              value={nomorHP}
              onChange={(e) => setNomorHP(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-group-modern">
          <label className="form-label-modern">Email</label>
          <input 
            type="email" 
            className="modern-input" 
            placeholder="Contoh: nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
    </div>
  );
};

export default DataDiriSosial;