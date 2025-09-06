import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCerita4 = () => {
  const navigate = useNavigate();
  const [conditionContent, setConditionContent] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleNext = () => {
    if (conditionContent.trim().length > 0) {
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
    alert('Cerita telah disimpan!');
  };

  const showExample = () => {
    const exampleText = "Sejak Andi didiagnosis leukemia, banyak perubahan yang terjadi dalam kehidupan keluarga kami. Kondisi kesehatan Andi yang semakin menurun membuat kami sebagai keluarga harus lebih waspada dan memberikan perhatian ekstra kepadanya.\n\nSebelumnya, Andi adalah anak yang sangat aktif dan ceria. Ia selalu bermain dengan teman-temannya di lingkungan rumah dan rajin bersekolah. Namun sekarang, aktivitas Andi sangat terbatas karena kondisi tubuhnya yang lemah dan mudah lelah.\n\nDampak terbesar yang kami rasakan adalah dari segi finansial. Ayah harus sering izin atau bahkan cuti dari pekerjaan untuk menemani Andi berobat. Penghasilan keluarga menurun drastis, sementara biaya pengobatan terus bertambah setiap bulannya.";
    setConditionContent(exampleText);
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

  const handleWriteWithoutGuide = () => {
    navigate('/tulis-cerita-bebas');
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
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M14.2 11.8L12 9.6L9.8 11.8L8.4 10.4L12 6.8L15.6 10.4L14.2 11.8Z" fill="currentColor"/>
                  <path d="M12 8V16H10V8H12Z" fill="currentColor"/>
                  <path d="M6 18V20H18V18H20V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V18H6Z" fill="currentColor"/>
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
        <button className="write-without-guide-modern" onClick={handleWriteWithoutGuide}>
          Saya ingin menulis cerita sendiri tanpa panduan
        </button>
        
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
      </div>
    </div>
  );
};

export default TulisCerita4;