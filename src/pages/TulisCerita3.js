import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCerita3 = () => {
  const navigate = useNavigate();
  const [familyContent, setFamilyContent] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showExampleModal, setShowExampleModal] = useState(false);

  const exampleText = "Keluarga kami adalah keluarga sederhana yang tinggal di perumahan kecil di Yogyakarta. Ayah bekerja sebagai tukang las dengan penghasilan tidak menentu, sedangkan ibu adalah ibu rumah tangga yang sesekali menerima jahitan dari tetangga.\n\nSebelum Andi sakit, kehidupan kami cukup harmonis. Andi sangat aktif bermain dengan teman-teman di kompleks dan selalu menjadi anak yang ceria. Namun sejak didiagnosis leukemia, suasana rumah berubah menjadi sedih dan penuh kekhawatiran.\n\nSaat ini, seluruh keluarga besar kami bergotong royong membantu biaya pengobatan Andi. Kakek dan nenek dari kedua belah pihak, serta paman dan bibi juga ikut membantu secara finansial dan memberikan dukungan moral kepada keluarga kami.";

  useEffect(() => {
    // Load saved content from localStorage
    const saved = localStorage.getItem('cerita_part3');
    const savedPhoto = localStorage.getItem('cerita_part3_photo');
    if (saved) setFamilyContent(saved);
    if (savedPhoto) setPhotoPreview(savedPhoto);
  }, []);

  const handleNext = () => {
    if (familyContent.trim().length > 0) {
      // Save to localStorage
      localStorage.setItem('cerita_part3', familyContent);
      if (photoPreview) {
        localStorage.setItem('cerita_part3_photo', photoPreview);
      }
      navigate('/tulis-cerita-4');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-2');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye');
    }
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('cerita_part3', familyContent);
    if (photoPreview) {
      localStorage.setItem('cerita_part3_photo', photoPreview);
    }
    alert('Cerita telah disimpan!');
  };

  const showExample = () => {
    setShowExampleModal(true);
  };

  const closeExampleModal = () => {
    setShowExampleModal(false);
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
        <button className="save-btn" onClick={handleSave}>
          Simpan cerita
        </button>
      </header>

      {/* Progress Section */}
      <div className="story-progress-section">
        <div className="story-progress-info">
          <span className="modern-text">Pembuatan Cerita</span>
          <span className="modern-text small">Bagian 3 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '50%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Bagaimana keadaan keluarga dan lingkungan hidup pasien?</h2>
        </div>
        
        <div className="modern-card">
          <div className="story-section">
            <button className="modern-btn secondary example-btn-small" onClick={showExample}>
              📄 Lihat contoh
            </button>
            
            <textarea
              className="modern-textarea"
              placeholder="Ceritakan keadaan keluarga dan lingkungan hidup pasien sebelum dan setelah pasien sakit"
              value={familyContent}
              onChange={(e) => setFamilyContent(e.target.value)}
              rows={8}
            />
          </div>

          {/* Section 2 - Photo Upload */}
          <div className="photo-upload-modern">
            <label className="form-label-modern">Upload foto pasien yang sedang beraktivitas dengan keluarganya</label>
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
            disabled={familyContent.trim().length === 0}
          >
            Selanjutnya →
          </button>
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

export default TulisCerita3;