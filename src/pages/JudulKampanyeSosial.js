import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/JudulKampanye.css';

const JudulKampanyeSosial = () => {
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
    navigate('/cerita-kampanye-sosial');
  };

  const handleBack = () => {
    navigate('/target-donasi-sosial');
  };

  const steps = [
    { number: 1, label: 'Tujuan', active: false },
    { number: 2, label: 'Penerima', active: false },
    { number: 3, label: 'Target donasi', active: false },
    { number: 4, label: 'Judul', active: true },
    { number: 5, label: 'Cerita', active: false },
    { number: 6, label: 'Ajakan', active: false }
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
        {/* Campaign Title */}
        <div className="form-group-modern">
          <h2 className="modern-subheading">Beri judul untuk galang dana ini</h2>
          <input 
            type="text" 
            className="modern-input" 
            placeholder="Contoh: Bakti Sosial untuk Korban Banjir di Desa Sukamaju"
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
            placeholder="Contoh: bakti-sosial-korban-banjir"
            value={campaignUrl}
            onChange={(e) => setCampaignUrl(e.target.value)}
          />
        </div>

        {/* Photo Upload */}
        <div className="form-group-modern">
          <h2 className="modern-subheading">Upload foto galang dana</h2>
          <p className="modern-text small" style={{marginBottom: '16px'}}>Pilih foto yang paling menggambarkan kegiatan sosial yang akan dilaksanakan.</p>
          
          <label 
            htmlFor="photoUpload" 
            className="upload-area-modern"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="upload-icon-modern">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M14.2 11.8L12 9.6L9.8 11.8L8.4 10.4L12 6.8L15.6 10.4L14.2 11.8Z" fill="currentColor"/>
                <path d="M12 8V16H10V8H12Z" fill="currentColor"/>
                <path d="M6 18V20H18V18H20V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V18H6Z" fill="currentColor"/>
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
      <button className="save-continue-modern">Simpan dan lanjutkan nanti</button>
    </div>
  );
};

export default JudulKampanyeSosial;