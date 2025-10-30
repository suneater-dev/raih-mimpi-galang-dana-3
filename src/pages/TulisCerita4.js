import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/TulisCerita.css';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const TulisCerita4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [conditionContent, setConditionContent] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showExampleModal, setShowExampleModal] = useState(false);
  const [draftId, setDraftId] = useState(null);

  const previousData = location.state || {};

  const exampleText = "Sejak Andi didiagnosis leukemia, banyak perubahan yang terjadi dalam kehidupan keluarga kami. Kondisi kesehatan Andi yang semakin menurun membuat kami sebagai keluarga harus lebih waspada dan memberikan perhatian ekstra kepadanya.\n\nSebelumnya, Andi adalah anak yang sangat aktif dan ceria. Ia selalu bermain dengan teman-temannya di lingkungan rumah dan rajin bersekolah. Namun sekarang, aktivitas Andi sangat terbatas karena kondisi tubuhnya yang lemah dan mudah lelah.\n\nDampak terbesar yang kami rasakan adalah dari segi finansial. Ayah harus sering izin atau bahkan cuti dari pekerjaan untuk menemani Andi berobat. Penghasilan keluarga menurun drastis, sementara biaya pengobatan terus bertambah setiap bulannya.";

  useEffect(() => {
    const currentDraftId = sessionStorage.getItem('current_draft_id');
    if (currentDraftId) {
      setDraftId(currentDraftId);
    } else {
      const newDraftId = generateDraftId();
      setDraftId(newDraftId);
      sessionStorage.setItem('current_draft_id', newDraftId);
    }

    // Load saved content from localStorage
    const saved = localStorage.getItem('cerita_part4');
    const savedPhoto = localStorage.getItem('cerita_part4_photo');
    if (saved) setConditionContent(saved);
    if (savedPhoto) setPhotoPreview(savedPhoto);
  }, []);

  const handleNext = () => {
    if (conditionContent.trim().length > 0) {
      // Save to localStorage
      localStorage.setItem('cerita_part4', conditionContent);
      if (photoPreview) {
        localStorage.setItem('cerita_part4_photo', photoPreview);
      }
      navigate('/tulis-cerita-5');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-3');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye');
    }
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('cerita_part4', conditionContent);
    if (photoPreview) {
      localStorage.setItem('cerita_part4_photo', photoPreview);
    }
    alert('Cerita telah disimpan!');
  };

  const showExample = () => {
    setShowExampleModal(true);
  };

  const closeExampleModal = () => {
    setShowExampleModal(false);
  };

  const handleSaveAsDraft = () => {
    if (!draftId) return;

    // Save current story content
    localStorage.setItem('cerita_part4', conditionContent);
    if (photoPreview) {
      localStorage.setItem('cerita_part4_photo', photoPreview);
    }

    const draftData = {
      id: draftId,
      category: 'medis',
      title: previousData.campaignTitle || previousData.patientName || 'Draft Bantuan Medis',
      image: previousData.photoPreview || null,
      progress: 86,
      steps: '6 dari 7 tahap',
      lastStep: '/tulis-cerita-4',
      target: previousData.targetData?.amount ? parseInt(previousData.targetData.amount.replace(/\./g, '')) : 0,
      daysLeft: previousData.targetData?.duration ? parseInt(previousData.targetData.duration) : 0,
      formData: {
        ...previousData,
        storyPart4: conditionContent,
        storyPart4Photo: photoPreview
      },
      storyData: getCurrentPageData('medis')
    };

    const saved = saveDraft(draftData);
    if (saved) {
      alert('Draft berhasil disimpan! Anda dapat melanjutkannya nanti dari Dashboard.');
      navigate('/dashboard');
    } else {
      alert('Gagal menyimpan draft. Silakan coba lagi.');
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
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
      if (file.type.startsWith('image/')) {
        setUploadedPhoto(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotoPreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header white">
        <button className="close-btn" onClick={handleClose}>
          ✕
        </button>
      </header>

      {/* Progress Section */}
      <div className="story-progress-section">
        <div className="story-progress-info">
          <span className="modern-text">Pembuatan Cerita</span>
          <span className="modern-text small">Bagian 4 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '67%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Bagaimana kondisi setelah pasien mengidap penyakit?</h2>
        </div>
        
        <div className="modern-card">
          <div className="story-section">
            <button className="modern-btn secondary example-btn-small" onClick={showExample}>
              📄 Lihat contoh
            </button>
            
            <textarea
              className="modern-textarea"
              placeholder="Ceritakan perubahan yang terjadi di sekitar pasien setelah pasien sakit"
              value={conditionContent}
              onChange={(e) => setConditionContent(e.target.value)}
              rows={8}
            />
          </div>

          {/* Section 2 - Photo Upload */}
          <div className="photo-upload-modern">
            <label className="form-label-modern">Upload foto pasien yang sedang sakit</label>
            <p className="modern-text small" style={{marginBottom: '16px'}}>
              Ceritamu bisa lebih meyakinkan donatur jika dilengkapi foto pendukung di bagian ini.
            </p>
            
            <label
              htmlFor="photoUpload"
              className="photo-upload-area-modern"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="photo-upload-icon-modern">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="currentColor"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
              </div>
              <span className="photo-upload-text-modern">
                {uploadedPhoto ? `📷 ${uploadedPhoto.name}` : 'Drag & drop foto atau klik untuk upload'}
              </span>
              <span className="photo-upload-subtext-modern">
                JPG, PNG, GIF (Max. 5MB)
              </span>
            </label>
            
            <input 
              type="file" 
              id="photoUpload" 
              className="photo-input-modern" 
              accept="image/*"
              onChange={handlePhotoUpload}
            />
            
            {photoPreview && (
              <div className="photo-preview-modern">
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className="photo-preview-image-modern"
                />
                <br />
                <button 
                  className="photo-remove-btn-modern"
                  onClick={() => {
                    setUploadedPhoto(null);
                    setPhotoPreview(null);
                  }}
                >
                  Hapus Foto
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="story-actions-modern">
        <div className="bottom-nav-modern">
          <button className="modern-btn secondary" onClick={handleBack}>
            ← Sebelumnya
          </button>
          <button
            className="modern-btn"
            onClick={handleNext}
            disabled={conditionContent.trim().length === 0}
          >
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

      {/* Example Modal */}
      {showExampleModal && (
        <div className="example-modal-overlay" onClick={closeExampleModal}>
          <div className="example-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="example-modal-header">
              <h3 className="modern-subheading">Contoh Cerita</h3>
              <button className="example-modal-close" onClick={closeExampleModal}>✕</button>
            </div>
            <div className="example-modal-body">
              <p className="example-text">{exampleText}</p>
            </div>
            <div className="example-modal-footer">
              <button className="modern-btn" onClick={closeExampleModal}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TulisCerita4;