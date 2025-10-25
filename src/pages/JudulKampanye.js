import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/JudulKampanye.css';

const JudulKampanye = () => {
  const navigate = useNavigate();
  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignUrl, setCampaignUrl] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    if (e.target.files.length > 0) {
      setSelectedPhoto(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedPhoto(files[0]);
    }
  };

  const handleNext = () => {
    navigate('/cerita-kampanye');
  };

  const handleBack = () => {
    navigate('/target-donasi');
  };

  const steps = [
    { number: 1, label: 'Pasien', active: false },
    { number: 2, label: 'Data diri', active: false },
    { number: 3, label: 'Penerima', active: false },
    { number: 4, label: 'Target donasi', active: false },
    { number: 5, label: 'Judul', active: true },
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
        <div className="header-title white-text">Bantuan Medis & Kesehatan</div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Form Section */}
      <div className="modern-card">
        {/* Campaign Title */}
        <div className="form-group-modern">
          <h2 className="modern-subheading">Beri judul untuk galang dana ini</h2>
          <input 
            type="text" 
            className="modern-input" 
            placeholder="Contoh: Bantu Abi Melawan Kanker Hati"
            value={campaignTitle}
            onChange={(e) => setCampaignTitle(e.target.value)}
          />
        </div>

        {/* Campaign URL */}
        <div className="form-group-modern">
          <h2 className="modern-subheading">Tentukan link untuk galang dana ini</h2>
          <input 
            type="text" 
            className="modern-input" 
            placeholder="Contoh : bantuabdolawankanker"
            value={campaignUrl}
            onChange={(e) => setCampaignUrl(e.target.value)}
          />
        </div>

        {/* Photo Upload */}
        <div className="form-group-modern">
          <h2 className="modern-subheading">Upload foto galang dana</h2>
          <p className="modern-text small" style={{marginBottom: '16px'}}>Pilih foto yang paling menggambarkan perjuangan pasien dalam galang dana ini.</p>
          
          <label 
            htmlFor="photoUpload" 
            className="upload-area-modern"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="upload-icon-modern">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="currentColor"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
              </svg>
            </div>
            <span className="upload-text-modern">
              {selectedPhoto ? `📋 ${selectedPhoto.name}` : 'Drag & drop foto atau klik untuk upload'}
            </span>
            <span className="upload-subtext-modern">
              Format: JPG, PNG, GIF (Max. 5MB)
            </span>
          </label>
          <input 
            type="file" 
            id="photoUpload" 
            className="upload-input-modern" 
            accept="image/*"
            onChange={handlePhotoUpload}
          />
          
          <div className="tips-section-modern">
            <div className="tips-header-modern">
              <span className="tips-icon-modern">💡</span>
              <span className="modern-text small" style={{fontWeight: '600'}}>Tips</span>
            </div>
            <p className="modern-text small">Upload foto yang menggambarkan keadaan pasien ketika sakit atau saat sedang dalam pengobatan.</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-modern">
        <button className="modern-btn secondary" onClick={handleBack}>
          ← Sebelumnya
        </button>
        <button className="modern-btn" onClick={handleNext}>
          Selanjutnya →
        </button>
      </div>
    </div>
  );
};

export default JudulKampanye;