import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/UploadDokumenMoU.css';

const UploadDokumenMoU = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousData = location.state || {};

  const [files, setFiles] = useState({
    draftMoU: null,
    signedMoU: null
  });

  const [dragActive, setDragActive] = useState({
    draftMoU: false,
    signedMoU: false
  });

  const handleDrag = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(prev => ({ ...prev, [field]: true }));
    } else if (e.type === "dragleave") {
      setDragActive(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleDrop = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [field]: false }));

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], field);
    }
  };

  const handleFileInput = (e, field) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], field);
    }
  };

  const handleFile = (file, field) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Format file tidak didukung. Gunakan PDF, JPG, atau PNG.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    setFiles(prev => ({ ...prev, [field]: file }));
  };

  const removeFile = (field) => {
    setFiles(prev => ({ ...prev, [field]: null }));
  };

  const handleBack = () => {
    navigate('/pendaftaran-optimasi-iklan', { state: previousData });
  };

  const handleDownloadDraft = () => {
    // Create a dummy PDF blob or use a dummy file
    const dummyContent = `
    MEMORANDUM OF UNDERSTANDING (MoU)

    ANTARA

    RAIH MIMPI

    DAN

    [NAMA LEMBAGA]

    TENTANG
    KERJASAMA OPTIMASI IKLAN CAMPAIGN

    ================================================

    Pasal 1: TUJUAN
    MoU ini dibuat untuk mengatur kerjasama optimasi iklan campaign antara Raih Mimpi dan Lembaga.

    Pasal 2: RUANG LINGKUP
    1. Promosi campaign di platform Raih Mimpi
    2. Optimasi konten dan jangkauan iklan
    3. Pelaporan hasil campaign

    Pasal 3: HAK DAN KEWAJIBAN
    Kedua belah pihak setuju untuk menjalankan kerjasama dengan itikad baik.

    Pasal 4: JANGKA WAKTU
    MoU ini berlaku selama 12 bulan dan dapat diperpanjang.

    Pasal 5: PENUTUP
    MoU ini dibuat dalam 2 rangkap dan ditandatangani oleh kedua belah pihak.


    Raih Mimpi                           [Nama Lembaga]


    (_______________)                    (_______________)
    Direktur                              Ketua Lembaga
    `;

    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Draft_MoU_Template_RaihMimpi.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleNext = () => {
    if (isFormValid) {
      // Navigate to success page
      navigate('/pengajuan-berhasil-iklan', { state: { ...previousData, files } });
    }
  };

  const isFormValid = files.signedMoU !== null;

  const getFileIcon = (fileName) => {
    if (!fileName) return '📄';
    if (fileName.endsWith('.pdf')) return '📕';
    if (fileName.match(/\.(jpg|jpeg|png)$/i)) return '🖼️';
    return '📄';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Upload Dokumen MoU</div>
      </header>

      {/* Info Banner */}
      <div className="mou-info-section">
        <div className="mou-info-card">
          <div className="info-icon-mou">📑</div>
          <p className="info-text-mou">
            Upload dokumen MoU (Memorandum of Understanding) untuk melanjutkan proses optimasi iklan campaign Anda.
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="upload-section-mou">
        {/* Draft MoU - Download Only */}
        <div className="upload-card-mou">
          <h3 className="upload-title-mou">
            Draft Dokumen MoU
          </h3>
          <p className="upload-subtitle-mou">
            Download template draft dokumen MoU untuk ditandatangani
          </p>

          <div className="download-area-mou">
            <div className="download-icon-mou">📄</div>
            <div className="download-text-section">
              <p className="download-title-text">Draft MoU Template</p>
              <p className="download-desc-text">Template MoU yang dapat Anda edit dan tandatangani</p>
            </div>
            <button className="download-btn-mou" onClick={handleDownloadDraft}>
              <svg className="download-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download
            </button>
          </div>
        </div>

        {/* Signed MoU */}
        <div className="upload-card-mou">
          <h3 className="upload-title-mou">
            Dokumen MoU yang sudah ditandatangani <span className="required-mou">*</span>
          </h3>
          <p className="upload-subtitle-mou">
            Upload dokumen MoU yang telah ditandatangani oleh kedua belah pihak
          </p>

          {!files.signedMoU ? (
            <div
              className={`upload-area-mou ${dragActive.signedMoU ? 'drag-active' : ''}`}
              onDragEnter={(e) => handleDrag(e, 'signedMoU')}
              onDragLeave={(e) => handleDrag(e, 'signedMoU')}
              onDragOver={(e) => handleDrag(e, 'signedMoU')}
              onDrop={(e) => handleDrop(e, 'signedMoU')}
            >
              <div className="upload-icon-mou">📤</div>
              <p className="upload-text-mou">
                <strong>Klik untuk upload</strong> atau drag and drop
              </p>
              <p className="upload-hint-mou">PDF, JPG, atau PNG (max. 5MB)</p>
              <input
                type="file"
                id="signedMoU"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileInput(e, 'signedMoU')}
                style={{ display: 'none' }}
              />
              <label htmlFor="signedMoU" className="upload-btn-mou">
                Pilih File
              </label>
            </div>
          ) : (
            <div className="file-preview-mou">
              <div className="file-info-mou">
                <div className="file-icon-mou">{getFileIcon(files.signedMoU.name)}</div>
                <div className="file-details-mou">
                  <p className="file-name-mou">{files.signedMoU.name}</p>
                  <p className="file-size-mou">{formatFileSize(files.signedMoU.size)}</p>
                </div>
              </div>
              <button
                className="remove-file-btn-mou"
                onClick={() => removeFile('signedMoU')}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-mou">
        <button className="btn-mou btn-secondary-mou" onClick={handleBack}>
          ← Sebelumnya
        </button>
        <button
          className={`btn-mou btn-primary-mou ${!isFormValid ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={!isFormValid}
        >
          Lanjutkan →
        </button>
      </div>
    </div>
  );
};

export default UploadDokumenMoU;
