import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/Penerima.css';

const Penerima = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    eventName: '',
    eventPurpose: '',
    location: ''
  });

  // Get data from previous steps
  const previousData = location.state || {};

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBack = () => {
    navigate('/data-diri', { state: previousData });
  };

  const handleContinue = () => {
    if (isFormValid) {
      // Navigate to next step (Target donasi)
      navigate('/target-donasi-pendidikan', {
        state: {
          ...previousData,
          recipientData: formData
        }
      });
    }
  };

  const handleSaveAndContinueLater = () => {
    // Save progress and navigate to dashboard
    navigate('/dashboard');
  };

  // Validation
  const isFormValid = 
    formData.eventName.trim() !== '' &&
    formData.eventPurpose.trim() !== '' &&
    formData.location.trim() !== '';

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
        <div className="logo white-text">Karya Kreatif & Modal Usaha</div>
        <div className="header-spacer"></div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Main Content */}
      <div className="main-content-modern">
        <div className="form-section-modern">
          {/* Event Name */}
          <div className="input-group-modern">
            <label className="input-label-modern">Nama acara/gerakan/kegiatan/program</label>
            <textarea
              className="modern-textarea penerima-textarea"
              placeholder="Contoh: Studio Desain Kreatif Indonesia, UMKM Kerajinan Tangan Nusantara, Proyek Film Dokumenter Budaya Lokal"
              value={formData.eventName}
              onChange={(e) => handleInputChange('eventName', e.target.value)}
              rows="4"
            />
          </div>

          {/* Event Purpose */}
          <div className="input-group-modern">
            <label className="input-label-modern">Tujuan penyelenggaraan kegiatan/gerakan/acara/program</label>
            <textarea
              className="modern-textarea penerima-textarea"
              placeholder="Contoh: Membangun studio kreatif untuk membantu UMKM mengembangkan branding produk lokal dengan desain profesional yang terjangkau"
              value={formData.eventPurpose}
              onChange={(e) => handleInputChange('eventPurpose', e.target.value)}
              rows="5"
            />
          </div>

          {/* Location */}
          <div className="input-group-modern">
            <label className="input-label-modern">Lokasi</label>
            <textarea
              className="modern-textarea penerima-textarea"
              placeholder="Contoh: Kelurahan Pulo Gadung, Kecamatan Pulo Gadung, Kota Jakarta Timur"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              rows="4"
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
          <button 
            className={`nav-btn-primary ${!isFormValid ? 'disabled' : ''}`}
            onClick={handleContinue}
            disabled={!isFormValid}
          >
            Selanjutnya
          </button>
        </div>
        
        <button className="save-continue-later-btn" onClick={handleSaveAndContinueLater}>
          Simpan dan lanjutkan nanti
        </button>
      </div>
    </div>
  );
};

export default Penerima;