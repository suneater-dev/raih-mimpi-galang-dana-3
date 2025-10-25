import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/LaporanPencairan.css';

const LaporanPencairan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const campaign = location.state?.campaign;

  const [formData, setFormData] = useState({
    penggunaanDana: '',
    keterangan: ''
  });

  const [documents, setDocuments] = useState([]);
  const [photos, setPhotos] = useState([]);

  const handleBack = () => {
    navigate('/pencairan-dana');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const fileType = file.type;
      const fileSize = file.size;

      // Accept PDF and images, max 5MB
      const isValid = (fileType === 'application/pdf' || fileType.startsWith('image/')) && fileSize <= 5 * 1024 * 1024;

      if (!isValid) {
        alert(`File ${file.name} tidak valid. Hanya PDF dan gambar (max 5MB) yang diperbolehkan.`);
      }

      return isValid;
    });

    setDocuments(prev => [...prev, ...validFiles]);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const fileType = file.type;
      const fileSize = file.size;

      // Accept images only, max 5MB
      const isValid = fileType.startsWith('image/') && fileSize <= 5 * 1024 * 1024;

      if (!isValid) {
        alert(`File ${file.name} tidak valid. Hanya gambar (max 5MB) yang diperbolehkan.`);
      }

      return isValid;
    });

    setPhotos(prev => [...prev, ...validFiles]);
  };

  const removeDocument = (index) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.penggunaanDana.trim()) {
      alert('Mohon isi rincian penggunaan dana');
      return;
    }

    if (documents.length === 0) {
      alert('Mohon upload minimal 1 dokumen pendukung');
      return;
    }

    if (photos.length === 0) {
      alert('Mohon upload minimal 1 foto bukti');
      return;
    }

    // Save to localStorage (simulating report submission)
    const reportData = {
      campaignId: campaign?.id,
      campaignTitle: campaign?.title,
      penggunaanDana: formData.penggunaanDana,
      keterangan: formData.keterangan,
      documentCount: documents.length,
      photoCount: photos.length,
      submittedAt: new Date().toISOString(),
      status: 'Dalam Review'
    };

    localStorage.setItem(`report_${campaign?.id}`, JSON.stringify(reportData));

    // Navigate to detail report page
    navigate('/detail-laporan-pencairan', { state: { campaign, report: reportData } });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp');
  };

  const isFormValid = () => {
    return formData.penggunaanDana.trim() && documents.length > 0 && photos.length > 0;
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Buat Laporan Pencairan</div>
      </header>

      {/* Content */}
      <div className="laporan-content">
        <div className="laporan-card">
          {/* Campaign Info */}
          <div className="campaign-info-box">
            <div className="campaign-info-header">
              <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="campaign-info-title">{campaign?.title || 'Campaign'}</h3>
            </div>
            <div className="campaign-info-stats">
              <div className="stat-box">
                <span className="stat-label">Total Terkumpul</span>
                <span className="stat-value">{formatCurrency(campaign?.collected || 0)}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Target</span>
                <span className="stat-value">{formatCurrency(campaign?.target || 0)}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="laporan-form">
            {/* Penggunaan Dana */}
            <div className="form-section">
              <h3 className="section-title">Rincian Penggunaan Dana *</h3>
              <p className="section-description">
                Jelaskan secara detail bagaimana dana yang terkumpul telah digunakan
              </p>
              <textarea
                name="penggunaanDana"
                value={formData.penggunaanDana}
                onChange={handleInputChange}
                className="modern-textarea"
                rows="8"
                placeholder="Contoh:&#10;&#10;1. Biaya operasi: Rp 30.000.000&#10;2. Biaya perawatan rumah sakit: Rp 15.000.000&#10;3. Obat-obatan: Rp 5.000.000&#10;4. Biaya administrasi: Rp 1.000.000&#10;&#10;Total: Rp 51.000.000"
              ></textarea>
            </div>

            {/* Keterangan Tambahan */}
            <div className="form-section">
              <h3 className="section-title">Keterangan Tambahan</h3>
              <p className="section-description">
                Informasi tambahan atau catatan penting terkait penggunaan dana (opsional)
              </p>
              <textarea
                name="keterangan"
                value={formData.keterangan}
                onChange={handleInputChange}
                className="modern-textarea"
                rows="4"
                placeholder="Tambahkan keterangan jika ada..."
              ></textarea>
            </div>

            {/* Upload Dokumen */}
            <div className="form-section">
              <h3 className="section-title">Dokumen Pendukung *</h3>
              <p className="section-description">
                Upload bukti transaksi, kwitansi, atau dokumen pendukung lainnya (PDF/Gambar, max 5MB)
              </p>

              <div className="upload-area">
                <input
                  type="file"
                  id="document-upload"
                  accept=".pdf,image/*"
                  multiple
                  onChange={handleDocumentUpload}
                  className="upload-input"
                />
                <label htmlFor="document-upload" className="upload-label">
                  <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="upload-text">Klik untuk upload dokumen</span>
                  <span className="upload-hint">PDF atau Gambar (max 5MB)</span>
                </label>
              </div>

              {/* Document List */}
              {documents.length > 0 && (
                <div className="file-list">
                  {documents.map((doc, index) => (
                    <div key={index} className="file-item">
                      <svg className="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="file-info">
                        <span className="file-name">{doc.name}</span>
                        <span className="file-size">{(doc.size / 1024).toFixed(1)} KB</span>
                      </div>
                      <button type="button" className="remove-btn" onClick={() => removeDocument(index)}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upload Foto Bukti */}
            <div className="form-section">
              <h3 className="section-title">Foto Bukti *</h3>
              <p className="section-description">
                Upload foto bukti penggunaan dana seperti foto pasien, kegiatan, atau hasil pembangunan
              </p>

              <div className="upload-area">
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="upload-input"
                />
                <label htmlFor="photo-upload" className="upload-label">
                  <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="upload-text">Klik untuk upload foto</span>
                  <span className="upload-hint">Gambar (max 5MB per file)</span>
                </label>
              </div>

              {/* Photo Grid */}
              {photos.length > 0 && (
                <div className="photo-grid">
                  {photos.map((photo, index) => (
                    <div key={index} className="photo-item">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Foto ${index + 1}`}
                        className="photo-preview"
                      />
                      <button type="button" className="remove-photo-btn" onClick={() => removePhoto(index)}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info Note */}
            <div className="info-note">
              <svg className="note-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="note-text">
                Laporan akan direview oleh admin dalam waktu 1-3 hari kerja. Pastikan semua informasi yang Anda berikan akurat dan lengkap.
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-submit" disabled={!isFormValid()}>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Kirim Laporan
            </button>

            {/* Cancel Button */}
            <button type="button" className="btn-cancel" onClick={handleBack}>
              Batal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LaporanPencairan;
