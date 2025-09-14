import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/DataDiri.css';

const DataDiri = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    job: '',
    workplace: '',
    socialMedia: {
      facebook: false,
      instagram: false,
      twitter: false,
      linkedin: false
    }
  });

  // Get data from previous steps
  const previousData = location.state || {};

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: !prev.socialMedia[platform]
      }
    }));
  };

  const handleBack = () => {
    navigate('/tujuan-detail', { state: previousData });
  };

  const handleContinue = () => {
    if (isFormValid) {
      // Navigate to next step (Penerima)
      navigate('/penerima', {
        state: {
          ...previousData,
          personalData: formData
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
    formData.fullName.trim() !== '' &&
    formData.phoneNumber.trim() !== '' &&
    formData.job.trim() !== '' &&
    formData.workplace.trim() !== '';

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
        <div className="logo white-text">Karya Kreatif & Modal Usaha</div>
        <div className="header-spacer"></div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Main Content */}
      <div className="main-content-modern">
        {/* Personal Information Form */}
        <div className="form-section-modern">
          {/* Full Name */}
          <div className="input-group-modern">
            <label className="input-label-modern">Nama kamu sesuai KTP</label>
            <input
              type="text"
              className="modern-input data-diri-input"
              placeholder="Nama kamu sesuai KTP"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
            />
            {formData.fullName.trim() === '' && (
              <div className="input-note error">Nama tidak boleh kosong</div>
            )}
          </div>

          {/* Phone Number */}
          <div className="input-group-modern">
            <label className="input-label-modern">Masukkan no. ponsel kamu</label>
            <p className="input-description">Seluruh notifikasi akan dikirim melalui nomor ini</p>
            <input
              type="tel"
              className="modern-input data-diri-input"
              placeholder="628312412232312"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            />
          </div>

          {/* Job */}
          <div className="input-group-modern">
            <label className="input-label-modern">Pekerjaan kamu saat ini</label>
            <input
              type="text"
              className="modern-input data-diri-input"
              placeholder="Contoh: Karyawan swasta, Pelajar"
              value={formData.job}
              onChange={(e) => handleInputChange('job', e.target.value)}
            />
          </div>

          {/* Workplace */}
          <div className="input-group-modern">
            <label className="input-label-modern">Nama sekolah/tempat kerja</label>
            <input
              type="text"
              className="modern-input data-diri-input"
              placeholder="Masukkan nama sekolah/tempat kerja"
              value={formData.workplace}
              onChange={(e) => handleInputChange('workplace', e.target.value)}
            />
          </div>

          {/* Social Media */}
          <div className="social-media-section">
            <label className="input-label-modern">Akun media sosial kamu</label>
            <p className="social-media-description">
              Galang dana akan ditolak jika akun media sosial kamu tidak dapat ditemukan oleh tim Raih Mimpi.
            </p>

            <div className="social-media-options">
              <label className="social-media-option">
                <input
                  type="checkbox"
                  checked={formData.socialMedia.facebook}
                  onChange={() => handleSocialMediaChange('facebook')}
                />
                <span className="checkmark-social"></span>
                <span className="social-media-text">Facebook</span>
              </label>

              <label className="social-media-option">
                <input
                  type="checkbox"
                  checked={formData.socialMedia.instagram}
                  onChange={() => handleSocialMediaChange('instagram')}
                />
                <span className="checkmark-social"></span>
                <span className="social-media-text">Instagram</span>
              </label>

              <label className="social-media-option">
                <input
                  type="checkbox"
                  checked={formData.socialMedia.twitter}
                  onChange={() => handleSocialMediaChange('twitter')}
                />
                <span className="checkmark-social"></span>
                <span className="social-media-text">Twitter</span>
              </label>

              <label className="social-media-option">
                <input
                  type="checkbox"
                  checked={formData.socialMedia.linkedin}
                  onChange={() => handleSocialMediaChange('linkedin')}
                />
                <span className="checkmark-social"></span>
                <span className="social-media-text">LinkedIn</span>
              </label>
            </div>
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

export default DataDiri;