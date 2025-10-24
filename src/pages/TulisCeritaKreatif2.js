import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaKreatif2 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaKreatif_part2') || '';
  });
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [showExampleModal, setShowExampleModal] = useState(false);

  const exampleText = "Proyek studio kreatif ini akan menawarkan layanan desain grafis terpadu untuk UMKM dan startup lokal. Kami akan menyediakan jasa pembuatan logo, identitas visual, kemasan produk, desain website, dan kampanye media sosial yang profesional namun terjangkau.\n\nTarget utama kami adalah UMKM yang memiliki produk berkualitas namun kesulitan dalam hal branding dan pemasaran visual. Banyak usaha kecil yang memiliki potensi besar namun terhambat karena tampilan visual produk mereka kurang menarik atau tidak konsisten.\n\nStudio ini akan berlokasi di kawasan kreatif Bandung dan akan dilengkapi dengan peralatan desain modern seperti komputer high-spec, tablet grafis, printer profesional, dan ruang meeting untuk konsultasi dengan klien.";

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      // Save to localStorage
      localStorage.setItem('ceritaKreatif_part2', storyContent);
      localStorage.setItem('ceritaKreatif_photos', JSON.stringify(uploadedPhotos.map(p => p.preview)));
      navigate('/tulis-cerita-kreatif-3');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-kreatif');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye-kreatif');
    }
  };

  const handleSave = () => {
    alert('Cerita telah disimpan!');
  };

  const showExample = () => {
    setShowExampleModal(true);
  };

  const closeExampleModal = () => {
    setShowExampleModal(false);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setUploadedPhotos(prev => [...prev, ...newPhotos]);
  };

  const handleRemovePhoto = (index) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setUploadedPhotos(prev => [...prev, ...newPhotos]);
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
          <span className="modern-text small">Bagian 2 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '33%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Jelaskan detail proyek atau bisnis yang ingin diwujudkan</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>

          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Berikan penjelasan lengkap tentang produk, layanan, atau karya kreatif yang akan Anda ciptakan. Ceritakan juga target market dan keunikan dari proyek Anda."
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
          />

          {/* Photo Upload Section */}
          <div className="photo-upload-modern" style={{marginTop: '24px'}}>
            <label className="form-label-modern">Upload foto</label>
            <p className="modern-text small" style={{marginBottom: '12px', color: '#6B7280'}}>
              Upload foto yang menggambarkan proyek atau karya kreatif Anda
            </p>

            <label
              htmlFor="photoUpload"
              className="photo-upload-area-modern"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="photo-upload-icon-modern">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="currentColor"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
              </div>
              <span className="photo-upload-text-modern">
                Drag & drop foto atau klik untuk upload
              </span>
              <span className="photo-upload-subtext-modern">
                Format: JPG, PNG, GIF (Max. 5MB per foto)
              </span>
            </label>
            <input
              type="file"
              id="photoUpload"
              className="photo-input-modern"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
            />

            {/* Photo Preview Grid */}
            {uploadedPhotos.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '12px',
                marginTop: '16px'
              }}>
                {uploadedPhotos.map((photo, index) => (
                  <div key={index} style={{position: 'relative'}}>
                    <img
                      src={photo.preview}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        border: '2px solid #e2e8f0'
                      }}
                    />
                    <button
                      onClick={() => handleRemovePhoto(index)}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
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
            className={`modern-btn ${storyContent.trim().length === 0 ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={storyContent.trim().length === 0}
            style={{opacity: storyContent.trim().length === 0 ? 0.5 : 1}}
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

export default TulisCeritaKreatif2;
