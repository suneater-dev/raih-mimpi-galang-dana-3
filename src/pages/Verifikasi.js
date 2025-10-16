import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Verifikasi.css';

const Verifikasi = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaLengkap: '',
    nomorTelepon: '',
    nomorKTP: '',
    fotoKTP: null
  });

  const [previews, setPreviews] = useState({
    fotoKTP: null
  });

  const [errors, setErrors] = useState({});

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'File harus berupa gambar'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'Ukuran file maksimal 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({
          ...prev,
          [fieldName]: reader.result
        }));
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors[fieldName]) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.namaLengkap.trim()) {
      newErrors.namaLengkap = 'Nama lengkap wajib diisi';
    }

    if (!formData.nomorTelepon.trim()) {
      newErrors.nomorTelepon = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9]{10,13}$/.test(formData.nomorTelepon)) {
      newErrors.nomorTelepon = 'Nomor telepon harus 10-13 digit';
    }

    if (!formData.nomorKTP.trim()) {
      newErrors.nomorKTP = 'Nomor KTP wajib diisi';
    } else if (!/^[0-9]{16}$/.test(formData.nomorKTP)) {
      newErrors.nomorKTP = 'Nomor KTP harus 16 digit';
    }

    if (!formData.fotoKTP) {
      newErrors.fotoKTP = 'Foto KTP wajib diunggah';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Navigate to success page
      navigate('/berhasil-verifikasi');
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Verifikasi Identitas</div>
      </header>

      {/* Content */}
      <div className="verification-content">
        <div className="verification-card">
          {/* Title & Description */}
          <div className="verification-header">
            <div className="header-icon-verify">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="verification-title">Verifikasi Identitas</h2>
            <p className="verification-description">
              Verifikasi identitas diperlukan untuk memastikan keaslian campaign dan meningkatkan kepercayaan donatur. Semua data Anda akan dijaga kerahasiaannya.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="verification-form">
            {/* Nama Lengkap */}
            <div className="form-group-verify">
              <label className="form-label-verify">
                <svg className="label-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Nama Lengkap Sesuai KTP
                <span className="required-mark">*</span>
              </label>
              <input
                type="text"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleInputChange}
                className={`form-input-verify ${errors.namaLengkap ? 'error' : ''}`}
                placeholder="Contoh: Ahmad Fadli Budiman"
              />
              {errors.namaLengkap && <span className="error-text">{errors.namaLengkap}</span>}
            </div>

            {/* Nomor Telepon */}
            <div className="form-group-verify">
              <label className="form-label-verify">
                <svg className="label-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Nomor Telepon/WhatsApp
                <span className="required-mark">*</span>
              </label>
              <input
                type="tel"
                name="nomorTelepon"
                value={formData.nomorTelepon}
                onChange={handleInputChange}
                className={`form-input-verify ${errors.nomorTelepon ? 'error' : ''}`}
                placeholder="Contoh: 081234567890"
              />
              {errors.nomorTelepon && <span className="error-text">{errors.nomorTelepon}</span>}
            </div>

            {/* Nomor KTP */}
            <div className="form-group-verify">
              <label className="form-label-verify">
                <svg className="label-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Nomor KTP (16 digit)
                <span className="required-mark">*</span>
              </label>
              <input
                type="text"
                name="nomorKTP"
                value={formData.nomorKTP}
                onChange={handleInputChange}
                className={`form-input-verify ${errors.nomorKTP ? 'error' : ''}`}
                placeholder="Contoh: 3201234567891234"
                maxLength="16"
              />
              {errors.nomorKTP && <span className="error-text">{errors.nomorKTP}</span>}
            </div>

            {/* Upload Foto KTP */}
            <div className="form-group-verify">
              <label className="form-label-verify">
                <svg className="label-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Upload Foto KTP
                <span className="required-mark">*</span>
              </label>
              <div className="upload-area">
                <input
                  type="file"
                  id="fotoKTP"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'fotoKTP')}
                  className="file-input-hidden"
                />
                <label htmlFor="fotoKTP" className="upload-label">
                  {previews.fotoKTP ? (
                    <div className="preview-container">
                      <img src={previews.fotoKTP} alt="Preview KTP" className="preview-image" />
                      <div className="preview-overlay">
                        <span>Klik untuk ubah foto</span>
                      </div>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="upload-text">Klik untuk upload foto KTP</span>
                      <span className="upload-hint">PNG, JPG (maks. 5MB)</span>
                    </div>
                  )}
                </label>
              </div>
              {errors.fotoKTP && <span className="error-text">{errors.fotoKTP}</span>}
            </div>

            {/* Info Box */}
            <div className="info-box-verify">
              <svg className="info-icon-box-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="info-text-box">
                <strong>Tips:</strong> Pastikan foto jelas, tidak buram, dan semua informasi pada KTP dapat terbaca dengan baik.
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-verify primary">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Kirim Verifikasi
            </button>

            {/* Back Button */}
            <button type="button" className="btn-verify secondary" onClick={handleBack}>
              Kembali ke Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verifikasi;
