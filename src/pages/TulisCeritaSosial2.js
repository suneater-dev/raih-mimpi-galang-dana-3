import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaSosial2 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaSosial_part2') || '';
  });
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [showExampleModal, setShowExampleModal] = useState(false);

  const exampleText = "Saat ini, para lansia di Panti Jompo Kasih Sayang menghadapi berbagai tantangan serius yang membutuhkan perhatian segera. Sebagian besar dari mereka mengalami masalah kesehatan seperti diabetes, hipertensi, dan gangguan mobilitas yang memerlukan perawatan khusus.\n\nKondisi fisik panti yang sudah berusia puluhan tahun membuat fasilitas menjadi terbatas. Kamar-kamar yang sempit dan kurangnya ventilasi membuat lingkungan kurang nyaman bagi para penghuni. Selain itu, peralatan medis yang tersedia juga sangat minim.\n\nPara pengasuh bekerja dengan dedikasi tinggi namun terbatas dengan jumlah staf yang tidak sebanding dengan kebutuhan 45 lansia. Setiap hari mereka harus mengatur jadwal makan, minum obat, dan kegiatan rutin dengan sumber daya yang sangat terbatas.";

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      // Save to localStorage
      localStorage.setItem('ceritaSosial_part2', storyContent);
      localStorage.setItem('ceritaSosial_photos', JSON.stringify(uploadedPhotos.map(p => p.preview)));
      navigate('/tulis-cerita-sosial-3');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-sosial');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye-sosial');
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
          <h2 className="modern-subheading">Jelaskan kondisi penerima bantuan saat ini</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Ceritakan kondisi terkini dari penerima bantuan, tantangan yang mereka hadapi, dan situasi yang membuat mereka membutuhkan bantuan sosial."
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
          />

          {/* Photo Upload Section */}
          <div className="photo-upload-modern" style={{marginTop: '24px'}}>
            <label className="form-label-modern">Upload foto</label>
            <p className="modern-text small" style={{marginBottom: '12px', color: '#6B7280'}}>
              Upload foto yang menggambarkan kondisi penerima bantuan saat ini
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

export default TulisCeritaSosial2;