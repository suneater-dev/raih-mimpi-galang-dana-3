import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/Ajakan.css';

const AjakanPendidikan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ajakan, setAjakan] = useState('');

  // Get data from previous steps
  const previousData = location.state || {};

  const handleNext = () => {
    if (ajakan.trim()) {
      navigate('/campaign-complete', {
        state: {
          ...previousData,
          ajakan,
          campaignType: 'pendidikan'
        }
      });
    }
  };

  const handleBack = () => {
    navigate('/review-cerita-pendidikan', { state: previousData });
  };

  const isFormValid = ajakan.trim().length > 0;

  const steps = [
    { number: 1, label: 'Tujuan', active: false },
    { number: 2, label: 'Penerima', active: false },
    { number: 3, label: 'Target donasi', active: false },
    { number: 4, label: 'Judul', active: false },
    { number: 5, label: 'Cerita', active: false },
    { number: 6, label: 'Ajakan', active: true }
  ];

  const showExample = () => {
    const exampleText = "Mari bersama-sama kita wujudkan mimpi anak-anak di desa untuk mendapatkan pendidikan yang layak! Dengan bantuan Anda, mereka bisa terus bersekolah tanpa khawatir dengan biaya pendidikan.\n\nSetiap rupiah yang Anda donasikan akan memberikan harapan baru bagi masa depan mereka. Bersama-sama, kita bisa memutus rantai kemiskinan melalui pendidikan.\n\nDonasi Anda, sekecil apapun, sangat berarti bagi mereka. Mari berbagi kebahagiaan dan berikan kesempatan kepada anak-anak ini untuk meraih cita-cita mereka!";
    setAjakan(exampleText);
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Bantuan Pendidikan</div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Form Section */}
      <div className="modern-card">
        <h2 className="modern-subheading">Buat ajakan yang menggerakkan hati</h2>
        <p className="modern-text" style={{marginBottom: '24px', color: '#6B7280'}}>
          Tulis ajakan yang dapat menggerakkan hati para donatur untuk membantu program bantuan pendidikan ini.
        </p>

        <button 
          className="modern-btn secondary example-btn" 
          onClick={showExample}
          style={{marginBottom: '20px'}}
        >
          📄 Lihat contoh ajakan
        </button>

        <div className="form-group-modern">
          <textarea 
            className="modern-textarea ajakan-textarea" 
            placeholder="Tulis ajakan yang menyentuh hati untuk mengajak orang membantu program bantuan pendidikan ini..."
            value={ajakan}
            onChange={(e) => setAjakan(e.target.value)}
            rows="8"
          />
        </div>

        {/* Preview Section */}
        {ajakan.trim() && (
          <div className="ajakan-preview">
            <h4 className="preview-title">Preview ajakan:</h4>
            <div className="preview-content">
              <p className="modern-text">{ajakan}</p>
            </div>
          </div>
        )}
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
          Selesai
        </button>
      </div>
    </div>
  );
};

export default AjakanPendidikan;