import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/Penerima.css';

const PenerimaSosial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [penerimaData, setPenerimaData] = useState({
    namaPenerima: '',
    hubungan: '',
    alamat: '',
    nomorRekening: '',
    bankName: ''
  });

  // Get data from previous steps
  const previousData = location.state || {};

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
    navigate('/data-diri-sosial', { state: previousData });
  };

  const isFormValid = penerimaData.namaPenerima.trim() && 
                    penerimaData.hubungan.trim() && 
                    penerimaData.alamat.trim() && 
                    penerimaData.nomorRekening.trim() && 
                    penerimaData.bankName.trim();

  const steps = [
    { number: 1, label: 'Tujuan', active: false },
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
          Masukkan data lengkap penerima bantuan atau penanggung jawab kegiatan sosial.
        </p>

          {/* Nama Penerima */}
          <div className="form-group-modern">
            <label className="form-label-modern">Nama penerima bantuan / Penanggung jawab</label>
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

          {/* Nomor Rekening */}
          <div className="form-group-modern">
            <label className="form-label-modern">Nomor rekening</label>
            <input 
              type="text" 
              className="modern-input" 
              placeholder="Nomor rekening untuk pencairan dana"
              value={penerimaData.nomorRekening}
              onChange={(e) => handleInputChange('nomorRekening', e.target.value)}
            />
          </div>

          {/* Bank */}
          <div className="form-group-modern">
            <label className="form-label-modern">Nama bank</label>
            <input 
              type="text" 
              className="modern-input" 
              placeholder="Contoh: BCA, BRI, Mandiri"
              value={penerimaData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
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

export default PenerimaSosial;