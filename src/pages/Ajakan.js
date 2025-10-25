import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/Ajakan.css';

const Ajakan = () => {
  const navigate = useNavigate();
  const [ajakanText, setAjakanText] = useState('');

  const handleBack = () => {
    navigate('/review-cerita');
  };

  const handleNext = () => {
    // Navigate directly to campaign complete page
    navigate('/campaign-complete');
  };

  const handleSaveAndContinueLater = () => {
    console.log('Campaign saved for later');
  };

  const handleAjakanChange = (e) => {
    setAjakanText(e.target.value);
  };

  const steps = [
    { number: 1, label: 'Pasien', active: false },
    { number: 2, label: 'Data diri', active: false },
    { number: 3, label: 'Penerima', active: false },
    { number: 4, label: 'Target donasi', active: false },
    { number: 5, label: 'Judul', active: false },
    { number: 6, label: 'Cerita', active: false },
    { number: 7, label: 'Ajakan', active: true }
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

      {/* Ajakan Form Section */}
      <div className="modern-card" style={{margin: '20px'}}>
        <div className="ajakan-header-modern">
          <h3 className="modern-subheading">Ajakan untuk berdonasi</h3>
          <p className="modern-text" style={{marginBottom: '24px', color: '#6B7280'}}>
            Tulis ajakan yang menarik untuk mengajak orang berdonasi ke galang dana Anda. 
            Ajakan yang baik akan meningkatkan peluang mendapatkan donatur.
          </p>
        </div>
        
        <div className="ajakan-form-modern">
          <label className="form-label-modern" htmlFor="ajakan-input">
            Ajakan Donasi <span className="required-modern">*</span>
          </label>
          <textarea
            id="ajakan-input"
            className="modern-textarea"
            placeholder="Contoh: Mari bersama-sama membantu kesembuhan Andi. Setiap donasi yang Anda berikan sangat berarti bagi keluarga kami. Terima kasih atas kebaikan hati Anda."
            value={ajakanText}
            onChange={handleAjakanChange}
            maxLength={500}
            rows={6}
          />
          <div className="character-count-modern">
            {ajakanText.length}/500 karakter
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
          disabled={ajakanText.trim().length === 0}
        >
          Selesai ✓
        </button>
      </div>
    </div>
  );
};

export default Ajakan;