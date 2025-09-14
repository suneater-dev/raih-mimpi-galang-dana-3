import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AccountRegistration.css';

const AccountRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    namaLengkap: '',
    nomorKTP: '',
    email: '',
    nomorTelepon: '',
    alamat: '',
    tanggalLahir: '',
    jenisKelamin: '',
    pekerjaan: '',
    password: '',
    confirmPassword: ''
  });

  // Get data from previous steps
  const previousData = location.state || {};

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Navigate to campaign complete page after account creation
      navigate('/campaign-complete', {
        state: {
          ...previousData,
          accountData: formData,
          withAds: true
        }
      });
    }
  };

  const handleBack = () => {
    navigate('/ads-offering-pendidikan', { state: previousData });
  };

  const isFormValid = formData.namaLengkap.trim() && 
                    formData.nomorKTP.trim() && 
                    formData.email.trim() && 
                    formData.nomorTelepon.trim() && 
                    formData.alamat.trim() && 
                    formData.tanggalLahir && 
                    formData.jenisKelamin && 
                    formData.pekerjaan.trim() && 
                    formData.password.trim() && 
                    formData.confirmPassword.trim() &&
                    formData.password === formData.confirmPassword;

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Buat Akun RaihMimpi</div>
      </header>

      {/* Form Section */}
      <div className="registration-container">
        <div className="registration-header">
          <div className="registration-icon">👤</div>
          <h2 className="registration-title">Lengkapi Data Diri</h2>
          <p className="registration-subtitle">
            Untuk menggunakan layanan promosi kampanye, silakan lengkapi data diri Anda
          </p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="modern-card">
            {/* Nama Lengkap */}
            <div className="form-group-modern">
              <label className="form-label-modern">Nama Lengkap sesuai KTP *</label>
              <input 
                type="text" 
                className="modern-input" 
                placeholder="Masukkan nama lengkap sesuai KTP"
                value={formData.namaLengkap}
                onChange={(e) => handleInputChange('namaLengkap', e.target.value)}
                required
              />
            </div>

            {/* Nomor KTP */}
            <div className="form-group-modern">
              <label className="form-label-modern">Nomor KTP *</label>
              <input 
                type="text" 
                className="modern-input" 
                placeholder="Masukkan 16 digit nomor KTP"
                value={formData.nomorKTP}
                onChange={(e) => handleInputChange('nomorKTP', e.target.value)}
                maxLength="16"
                required
              />
            </div>

            {/* Email */}
            <div className="form-group-modern">
              <label className="form-label-modern">Email *</label>
              <input 
                type="email" 
                className="modern-input" 
                placeholder="Contoh: nama@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>

            {/* Nomor Telepon */}
            <div className="form-group-modern">
              <label className="form-label-modern">Nomor Telepon *</label>
              <div className="phone-input-container" style={{display: 'flex', gap: '8px'}}>
                <span className="country-code" style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  backgroundColor: '#f8fafc',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontWeight: '500',
                  color: '#475569'
                }}>+62</span>
                <input 
                  type="tel" 
                  className="modern-input" 
                  style={{flex: 1}}
                  placeholder="Contoh: 81234567890"
                  value={formData.nomorTelepon}
                  onChange={(e) => handleInputChange('nomorTelepon', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Alamat */}
            <div className="form-group-modern">
              <label className="form-label-modern">Alamat Lengkap *</label>
              <textarea 
                className="modern-textarea" 
                placeholder="Masukkan alamat lengkap sesuai KTP"
                value={formData.alamat}
                onChange={(e) => handleInputChange('alamat', e.target.value)}
                rows="3"
                required
              />
            </div>

            {/* Tanggal Lahir */}
            <div className="form-group-modern">
              <label className="form-label-modern">Tanggal Lahir *</label>
              <input 
                type="date" 
                className="modern-input" 
                value={formData.tanggalLahir}
                onChange={(e) => handleInputChange('tanggalLahir', e.target.value)}
                required
              />
            </div>

            {/* Jenis Kelamin */}
            <div className="form-group-modern">
              <label className="form-label-modern">Jenis Kelamin *</label>
              <select 
                className="modern-input" 
                value={formData.jenisKelamin}
                onChange={(e) => handleInputChange('jenisKelamin', e.target.value)}
                required
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Pekerjaan */}
            <div className="form-group-modern">
              <label className="form-label-modern">Pekerjaan *</label>
              <input 
                type="text" 
                className="modern-input" 
                placeholder="Contoh: Guru, Wiraswasta, Karyawan, dll"
                value={formData.pekerjaan}
                onChange={(e) => handleInputChange('pekerjaan', e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group-modern">
              <label className="form-label-modern">Password *</label>
              <input 
                type="password" 
                className="modern-input" 
                placeholder="Minimal 8 karakter"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                minLength="8"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group-modern">
              <label className="form-label-modern">Konfirmasi Password *</label>
              <input 
                type="password" 
                className="modern-input" 
                placeholder="Ulangi password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p style={{color: '#ef4444', fontSize: '14px', marginTop: '4px'}}>
                  Password tidak cocok
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="registration-submit">
            <button 
              type="submit"
              className={`registration-btn ${!isFormValid ? 'disabled' : ''}`}
              disabled={!isFormValid}
            >
              Buat Akun & Lanjutkan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountRegistration;