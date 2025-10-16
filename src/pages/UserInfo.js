import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/UserInfo.css';

const UserInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'individual';
  const [formData, setFormData] = useState({
    namaLengkap: '',
    noTelpon: '',
    alamatEmail: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.namaLengkap.trim()) {
      newErrors.namaLengkap = 'Nama lengkap harus diisi';
    }
    
    if (!formData.noTelpon.trim()) {
      newErrors.noTelpon = 'Nomor telepon harus diisi';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.noTelpon)) {
      newErrors.noTelpon = 'Format nomor telepon tidak valid';
    }
    
    if (!formData.alamatEmail.trim()) {
      newErrors.alamatEmail = 'Alamat email harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.alamatEmail)) {
      newErrors.alamatEmail = 'Format email tidak valid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Pass user data including userType to next page
      navigate('/bantuan-lainnya', {
        state: {
          userType: userType,
          userData: formData
        }
      });
    }
  };

  const isFormValid = formData.namaLengkap.trim() && 
                     formData.noTelpon.trim() && 
                     formData.alamatEmail.trim();

  return (
    <div className="container">
      <header className="header gradient">
        <div className="back-arrow white-text" onClick={() => navigate(-1)}>←</div>
        <div className="logo white-text">RaihMimpi</div>
        <div className="header-spacer"></div>
      </header>

      <div className="modern-card">
        <div className="form-header-modern">
          <h1 className="modern-heading">Informasi Penggalang Dana</h1>
          <p className="modern-text">Isi informasi pribadi Anda untuk memulai galang dana sebagai <strong>{userType === 'individual' ? 'individu' : 'kelompok'}</strong></p>
        </div>

        <form onSubmit={handleSubmit} className="user-info-form-modern">
          <div className="form-group-modern">
            <label htmlFor="namaLengkap" className="form-label-modern">
              Nama Lengkap *
            </label>
            <input
              type="text"
              id="namaLengkap"
              name="namaLengkap"
              value={formData.namaLengkap}
              onChange={handleInputChange}
              className={`modern-input ${errors.namaLengkap ? 'error' : ''}`}
              placeholder="Masukkan nama lengkap Anda"
            />
            {errors.namaLengkap && (
              <span className="error-message-modern">{errors.namaLengkap}</span>
            )}
          </div>

          <div className="form-group-modern">
            <label htmlFor="noTelpon" className="form-label-modern">
              No Telepon *
            </label>
            <div className="phone-input-container-modern">
              <div className="country-selector-modern">
                <img 
                  width="20" 
                  src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/flags/2020/11/18/608dd8da-a07c-419b-bf96-83369c802b54-1605688145924-ee24949240fd44431bbd0fc9d9c2cadc.png" 
                  alt="Indonesia" 
                  className="flag-icon"
                />
                <span className="country-code">+62</span>
                <svg className="dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M15.2 7.692c.39-.39.39-1.024 0-1.414-.391-.39-1.024-.39-1.415 0l-4.96 4.96c-.387.387-.39 1.014-.006 1.406l4.96 5.063c.386.395 1.019.401 1.413.015.395-.387.401-1.02.015-1.414L10.94 11.95l4.26-4.26z" fill="#4d4f56" fillRule="nonzero" transform="rotate(-90 12.013 11.996)"></path>
                </svg>
              </div>
              <input
                type="tel"
                id="noTelpon"
                name="noTelpon"
                value={formData.noTelpon}
                onChange={handleInputChange}
                className={`phone-input-modern ${errors.noTelpon ? 'error' : ''}`}
                placeholder="Nomor Telepon"
              />
            </div>
            {errors.noTelpon && (
              <span className="error-message-modern">{errors.noTelpon}</span>
            )}
          </div>

          <div className="form-group-modern">
            <label htmlFor="alamatEmail" className="form-label-modern">
              Alamat Email *
            </label>
            <input
              type="email"
              id="alamatEmail"
              name="alamatEmail"
              value={formData.alamatEmail}
              onChange={handleInputChange}
              className={`modern-input ${errors.alamatEmail ? 'error' : ''}`}
              placeholder="Contoh: nama@email.com"
            />
            {errors.alamatEmail && (
              <span className="error-message-modern">{errors.alamatEmail}</span>
            )}
          </div>

          <div className="info-note-modern">
            <p className="modern-text small">* Informasi ini akan digunakan untuk verifikasi dan komunikasi terkait galang dana Anda</p>
          </div>

          <button
            type="submit"
            className={`modern-btn full-width ${!isFormValid ? 'disabled' : ''}`}
            disabled={!isFormValid}
            style={{opacity: !isFormValid ? 0.5 : 1}}
          >
            Lanjutkan
          </button>

          <div className="login-option-modern">
            <p className="modern-text text-center">Sudah punya akun? <button className="register-link-modern" onClick={() => navigate('/login')}>Masuk</button></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;