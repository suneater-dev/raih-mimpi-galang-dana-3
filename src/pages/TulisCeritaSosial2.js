import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaSosial2 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
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
    const exampleText = "Saat ini, para lansia di Panti Jompo Kasih Sayang menghadapi berbagai tantangan serius yang membutuhkan perhatian segera. Sebagian besar dari mereka mengalami masalah kesehatan seperti diabetes, hipertensi, dan gangguan mobilitas yang memerlukan perawatan khusus.\n\nKondisi fisik panti yang sudah berusia puluhan tahun membuat fasilitas menjadi terbatas. Kamar-kamar yang sempit dan kurangnya ventilasi membuat lingkungan kurang nyaman bagi para penghuni. Selain itu, peralatan medis yang tersedia juga sangat minim.\n\nPara pengasuh bekerja dengan dedikasi tinggi namun terbatas dengan jumlah staf yang tidak sebanding dengan kebutuhan 45 lansia. Setiap hari mereka harus mengatur jadwal makan, minum obat, dan kegiatan rutin dengan sumber daya yang sangat terbatas.";
    setStoryContent(exampleText);
  };

  const handleWriteWithoutGuide = () => {
    navigate('/tulis-cerita-bebas-sosial');
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
                  <path d="M14.2 11.8L12 9.6L9.8 11.8L8.4 10.4L12 6.8L15.6 10.4L14.2 11.8Z" fill="currentColor"/>
                  <path d="M12 8V16H10V8H12Z" fill="currentColor"/>
                  <path d="M6 18V20H18V18H20V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V18H6Z" fill="currentColor"/>
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
        <button className="write-without-guide-modern" onClick={handleWriteWithoutGuide}>
          Saya ingin menulis cerita sendiri tanpa panduan
        </button>
        
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
    </div>
  );
};

export default TulisCeritaSosial2;