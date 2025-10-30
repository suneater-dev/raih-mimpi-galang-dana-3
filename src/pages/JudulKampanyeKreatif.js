import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/JudulKampanye.css';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const JudulKampanyeKreatif = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignUrl, setCampaignUrl] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [draftId, setDraftId] = useState(null);

  // Get data from previous steps
  const previousData = location.state || {};

  useEffect(() => {
    const currentDraftId = sessionStorage.getItem('current_draft_id');
    if (currentDraftId) {
      setDraftId(currentDraftId);
    } else {
      const newDraftId = generateDraftId();
      setDraftId(newDraftId);
      sessionStorage.setItem('current_draft_id', newDraftId);
    }
  }, []);

  const handlePhotoUpload = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setSelectedPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    navigate('/cerita-kampanye-kreatif');
  };

  const handleBack = () => {
    navigate('/target-donasi-kreatif');
  };

  const handleSaveAsDraft = () => {
    if (!draftId) return;

    const rawAmount = previousData.targetData?.amount ? previousData.targetData.amount.replace(/\./g, '') : '0';

    const draftData = {
      id: draftId,
      category: 'kreatif',
      title: campaignTitle || previousData.selectedCategory?.title || 'Draft Karya Kreatif',
      image: photoPreview || null,
      progress: 67,
      steps: '4 dari 6 tahap',
      lastStep: '/judul-kampanye-kreatif',
      target: rawAmount ? parseInt(rawAmount) : 0,
      daysLeft: previousData.targetData?.duration ? parseInt(previousData.targetData.duration) : 0,
      formData: {
        ...previousData,
        campaignTitle,
        campaignUrl,
        photoPreview
      },
      storyData: getCurrentPageData('kreatif')
    };

    const saved = saveDraft(draftData);
    if (saved) {
      alert('Draft berhasil disimpan! Anda dapat melanjutkannya nanti dari Dashboard.');
      navigate('/dashboard');
    } else {
      alert('Gagal menyimpan draft. Silakan coba lagi.');
    }
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
        <div className="header-title white-text">Karya Kreatif & Modal Usaha</div>
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
            placeholder="Contoh: Bantu Saya Wujudkan Bisnis Kafe Impian"
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
            placeholder="Contoh: bisnis-kafe-impian"
            value={campaignUrl}
            onChange={(e) => setCampaignUrl(e.target.value)}
          />
        </div>

        {/* Photo Upload */}
        <div className="form-group-modern">
          <h2 className="modern-subheading">Upload foto galang dana</h2>
          <p className="modern-text small" style={{marginBottom: '16px'}}>Pilih foto yang paling menggambarkan proyek kreatif atau rencana bisnis Anda.</p>
          
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
            <p className="modern-text small">Upload foto yang menggambarkan proyek kreatif, produk, atau rencana bisnis yang ingin Anda wujudkan.</p>
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

      {/* Save as Draft Button */}
      <div className="draft-save-section">
        <button className="draft-save-btn" onClick={handleSaveAsDraft}>
          <svg className="draft-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="17 21 17 13 7 13 7 21" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="7 3 7 8 15 8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Simpan Sebagai Draft
        </button>
        <p className="draft-save-hint">Simpan progress Anda dan lanjutkan nanti dari Dashboard</p>
      </div>
    </div>
  );
};

export default JudulKampanyeKreatif;