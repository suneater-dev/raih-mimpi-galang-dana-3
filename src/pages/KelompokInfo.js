import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/KelompokInfo.css';

const KelompokInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get organization type from previous page
  const organizationType = location.state?.organizationType || 'lembaga';

  const [formData, setFormData] = useState({
    jenisKelompok: organizationType,
    namaOrganisasi: '',
    alamatOrganisasi: '',
    emailOrganisasi: '',
    teleponOrganisasi: '',
    website: '',
    bidangKegiatan: '',
    tahunBerdiri: '',
    jumlahAnggota: '',

    // Penanggung Jawab
    namaPenanggungJawab: '',
    jabatan: '',
    emailPenanggungJawab: '',
    teleponPenanggungJawab: '',
    ktp: '',
    alamatPenanggungJawab: '',

    // Dokumen Verifikasi
    aktePendirian: null,
    suratIzinOperasional: null,
    npwpOrganisasi: null,
    ktpPenanggungJawab: null,
    suratKuasa: null
  });

  const [errors, setErrors] = useState({});

  // Organization type labels
  const organizationTypeLabels = {
    masjid: 'Masjid',
    lembaga: 'Lembaga',
    yayasan: 'Yayasan',
    komunitas: 'Komunitas'
  };

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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      // Validate file type (PDF, JPG, PNG only)
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [name]: 'Format file harus PDF, JPG, atau PNG'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [name]: 'Ukuran file maksimal 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        [name]: file
      }));

      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validasi data organisasi
    if (!formData.jenisKelompok) {
      newErrors.jenisKelompok = 'Jenis kelompok harus dipilih';
    }

    if (!formData.namaOrganisasi.trim()) {
      newErrors.namaOrganisasi = 'Nama organisasi harus diisi';
    }

    if (!formData.alamatOrganisasi.trim()) {
      newErrors.alamatOrganisasi = 'Alamat organisasi harus diisi';
    }

    if (!formData.emailOrganisasi.trim()) {
      newErrors.emailOrganisasi = 'Email organisasi harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrganisasi)) {
      newErrors.emailOrganisasi = 'Format email tidak valid';
    }

    if (!formData.teleponOrganisasi.trim()) {
      newErrors.teleponOrganisasi = 'Nomor telepon organisasi harus diisi';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.teleponOrganisasi)) {
      newErrors.teleponOrganisasi = 'Format nomor telepon tidak valid';
    }

    if (!formData.tahunBerdiri.trim()) {
      newErrors.tahunBerdiri = 'Tahun berdiri harus diisi';
    } else if (!/^\d{4}$/.test(formData.tahunBerdiri) || parseInt(formData.tahunBerdiri) > new Date().getFullYear()) {
      newErrors.tahunBerdiri = 'Tahun berdiri tidak valid';
    }

    // Validasi penanggung jawab
    if (!formData.namaPenanggungJawab.trim()) {
      newErrors.namaPenanggungJawab = 'Nama penanggung jawab harus diisi';
    }

    if (!formData.jabatan.trim()) {
      newErrors.jabatan = 'Jabatan harus diisi';
    }

    if (!formData.emailPenanggungJawab.trim()) {
      newErrors.emailPenanggungJawab = 'Email penanggung jawab harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailPenanggungJawab)) {
      newErrors.emailPenanggungJawab = 'Format email tidak valid';
    }

    if (!formData.teleponPenanggungJawab.trim()) {
      newErrors.teleponPenanggungJawab = 'Nomor telepon penanggung jawab harus diisi';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.teleponPenanggungJawab)) {
      newErrors.teleponPenanggungJawab = 'Format nomor telepon tidak valid';
    }

    if (!formData.ktp.trim()) {
      newErrors.ktp = 'Nomor KTP harus diisi';
    } else if (!/^\d{16}$/.test(formData.ktp.replace(/\s/g, ''))) {
      newErrors.ktp = 'Nomor KTP harus 16 digit';
    }

    if (!formData.alamatPenanggungJawab.trim()) {
      newErrors.alamatPenanggungJawab = 'Alamat penanggung jawab harus diisi';
    }

    // Validasi dokumen verifikasi berdasarkan jenis organisasi
    // KTP Penanggung Jawab - Required for all types
    if (!formData.ktpPenanggungJawab) {
      newErrors.ktpPenanggungJawab = 'KTP penanggung jawab harus diunggah';
    }

    // Akte Pendirian - Required for Masjid and Yayasan
    if ((organizationType === 'masjid' || organizationType === 'yayasan') && !formData.aktePendirian) {
      newErrors.aktePendirian = 'Akte pendirian harus diunggah';
    }

    // Surat Izin Operasional - Required only for Lembaga
    if (organizationType === 'lembaga' && !formData.suratIzinOperasional) {
      newErrors.suratIzinOperasional = 'Surat izin operasional harus diunggah';
    }

    // NPWP and Surat Kuasa are optional for all types (no validation needed)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For showcase purposes - skip validation and navigate based on organization type
    if (organizationType === 'masjid') {
      // Masjid goes to profile page
      navigate('/masjid-profile', {
        state: {
          userType: 'group',
          groupData: formData
        }
      });
    } else {
      // Other organization types go to category selection
      navigate('/bantuan-lainnya', {
        state: {
          userType: 'group',
          groupData: formData
        }
      });
    }
  };

  // For showcase purposes - button is always enabled
  const isFormValid = true;

  return (
    <div className="container">
      <header className="header gradient">
        <div className="back-arrow white-text" onClick={() => navigate('/kelompok-type')}>←</div>
        <div className="logo white-text">RaihMimpi</div>
        <div className="header-spacer"></div>
      </header>

      <div className="modern-card">
        <div className="form-header-modern">
          <div className="organization-type-badge">
            {organizationTypeLabels[organizationType] || 'Lembaga'}
          </div>
          <h1 className="modern-heading">
            {organizationType === 'masjid' ? 'Informasi Masjid' : 'Informasi Kelompok/Organisasi'}
          </h1>
          <p className="modern-text">
            {organizationType === 'masjid'
              ? 'Lengkapi informasi masjid dan penanggung jawab untuk memverifikasi masjid Anda'
              : 'Lengkapi informasi organisasi dan penanggung jawab untuk memverifikasi kelompok Anda'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="kelompok-form-modern">
          {/* Informasi Organisasi/Masjid */}
          <div className="section-divider-modern">
            <h2 className="section-title-modern">
              📋 {organizationType === 'masjid' ? 'Informasi Masjid' : 'Informasi Organisasi'}
            </h2>
          </div>

          <div className="form-group-modern">
            <label htmlFor="namaOrganisasi" className="form-label-modern">
              {organizationType === 'masjid' ? 'Nama Masjid' : 'Nama Organisasi'} *
            </label>
            <input
              type="text"
              id="namaOrganisasi"
              name="namaOrganisasi"
              value={formData.namaOrganisasi}
              onChange={handleInputChange}
              className={`modern-input ${errors.namaOrganisasi ? 'error' : ''}`}
              placeholder={organizationType === 'masjid' ? 'Contoh: Masjid Al-Ikhlas' : 'Contoh: Yayasan Harapan Bangsa'}
            />
            {errors.namaOrganisasi && (
              <span className="error-message-modern">{errors.namaOrganisasi}</span>
            )}
          </div>

          <div className="form-group-modern">
            <label htmlFor="alamatOrganisasi" className="form-label-modern">
              {organizationType === 'masjid' ? 'Alamat Masjid' : 'Alamat Organisasi'} *
            </label>
            <textarea
              id="alamatOrganisasi"
              name="alamatOrganisasi"
              value={formData.alamatOrganisasi}
              onChange={handleInputChange}
              className={`modern-textarea ${errors.alamatOrganisasi ? 'error' : ''}`}
              placeholder={organizationType === 'masjid' ? 'Alamat lengkap masjid' : 'Alamat lengkap kantor/sekretariat organisasi'}
              rows="3"
            />
            {errors.alamatOrganisasi && (
              <span className="error-message-modern">{errors.alamatOrganisasi}</span>
            )}
          </div>

          <div className="form-row-modern">
            <div className="form-group-modern">
              <label htmlFor="emailOrganisasi" className="form-label-modern">
                {organizationType === 'masjid' ? 'Email Masjid' : 'Email Organisasi'} *
              </label>
              <input
                type="email"
                id="emailOrganisasi"
                name="emailOrganisasi"
                value={formData.emailOrganisasi}
                onChange={handleInputChange}
                className={`modern-input ${errors.emailOrganisasi ? 'error' : ''}`}
                placeholder={organizationType === 'masjid' ? 'masjid@email.com' : 'organisasi@email.com'}
              />
              {errors.emailOrganisasi && (
                <span className="error-message-modern">{errors.emailOrganisasi}</span>
              )}
            </div>

            <div className="form-group-modern">
              <label htmlFor="teleponOrganisasi" className="form-label-modern">
                {organizationType === 'masjid' ? 'Telepon Masjid' : 'Telepon Organisasi'} *
              </label>
              <input
                type="tel"
                id="teleponOrganisasi"
                name="teleponOrganisasi"
                value={formData.teleponOrganisasi}
                onChange={handleInputChange}
                className={`modern-input ${errors.teleponOrganisasi ? 'error' : ''}`}
                placeholder="021-1234567"
              />
              {errors.teleponOrganisasi && (
                <span className="error-message-modern">{errors.teleponOrganisasi}</span>
              )}
            </div>
          </div>

          <div className="form-group-modern">
            <label htmlFor="website" className="form-label-modern">
              Website (Opsional)
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="modern-input"
              placeholder={organizationType === 'masjid' ? 'https://www.masjid.com' : 'https://www.organisasi.com'}
            />
          </div>

          <div className="form-row-modern">
            <div className="form-group-modern">
              <label htmlFor="tahunBerdiri" className="form-label-modern">
                Tahun Berdiri *
              </label>
              <input
                type="number"
                id="tahunBerdiri"
                name="tahunBerdiri"
                value={formData.tahunBerdiri}
                onChange={handleInputChange}
                className={`modern-input ${errors.tahunBerdiri ? 'error' : ''}`}
                placeholder="2020"
                min="1945"
                max={new Date().getFullYear()}
              />
              {errors.tahunBerdiri && (
                <span className="error-message-modern">{errors.tahunBerdiri}</span>
              )}
            </div>

            <div className="form-group-modern">
              <label htmlFor="jumlahAnggota" className="form-label-modern">
                {organizationType === 'masjid' ? 'Kapasitas Jamaah (Opsional)' : 'Jumlah Anggota (Opsional)'}
              </label>
              <input
                type="number"
                id="jumlahAnggota"
                name="jumlahAnggota"
                value={formData.jumlahAnggota}
                onChange={handleInputChange}
                className="modern-input"
                placeholder="50"
                min="1"
              />
            </div>
          </div>

          {/* Informasi Penanggung Jawab */}
          <div className="section-divider-modern">
            <h2 className="section-title-modern">👤 Penanggung Jawab</h2>
          </div>

          <div className="form-row-modern">
            <div className="form-group-modern">
              <label htmlFor="namaPenanggungJawab" className="form-label-modern">
                Nama Lengkap *
              </label>
              <input
                type="text"
                id="namaPenanggungJawab"
                name="namaPenanggungJawab"
                value={formData.namaPenanggungJawab}
                onChange={handleInputChange}
                className={`modern-input ${errors.namaPenanggungJawab ? 'error' : ''}`}
                placeholder="Nama lengkap penanggung jawab"
              />
              {errors.namaPenanggungJawab && (
                <span className="error-message-modern">{errors.namaPenanggungJawab}</span>
              )}
            </div>

            <div className="form-group-modern">
              <label htmlFor="jabatan" className="form-label-modern">
                Jabatan *
              </label>
              <input
                type="text"
                id="jabatan"
                name="jabatan"
                value={formData.jabatan}
                onChange={handleInputChange}
                className={`modern-input ${errors.jabatan ? 'error' : ''}`}
                placeholder="Contoh: Ketua, Direktur, Koordinator"
              />
              {errors.jabatan && (
                <span className="error-message-modern">{errors.jabatan}</span>
              )}
            </div>
          </div>

          <div className="form-row-modern">
            <div className="form-group-modern">
              <label htmlFor="emailPenanggungJawab" className="form-label-modern">
                Email Penanggung Jawab *
              </label>
              <input
                type="email"
                id="emailPenanggungJawab"
                name="emailPenanggungJawab"
                value={formData.emailPenanggungJawab}
                onChange={handleInputChange}
                className={`modern-input ${errors.emailPenanggungJawab ? 'error' : ''}`}
                placeholder="penanggung.jawab@email.com"
              />
              {errors.emailPenanggungJawab && (
                <span className="error-message-modern">{errors.emailPenanggungJawab}</span>
              )}
            </div>

            <div className="form-group-modern">
              <label htmlFor="teleponPenanggungJawab" className="form-label-modern">
                Telepon Penanggung Jawab *
              </label>
              <input
                type="tel"
                id="teleponPenanggungJawab"
                name="teleponPenanggungJawab"
                value={formData.teleponPenanggungJawab}
                onChange={handleInputChange}
                className={`modern-input ${errors.teleponPenanggungJawab ? 'error' : ''}`}
                placeholder="08123456789"
              />
              {errors.teleponPenanggungJawab && (
                <span className="error-message-modern">{errors.telefonPenanggungJawab}</span>
              )}
            </div>
          </div>

          <div className="form-group-modern">
            <label htmlFor="ktp" className="form-label-modern">
              Nomor KTP *
            </label>
            <input
              type="text"
              id="ktp"
              name="ktp"
              value={formData.ktp}
              onChange={handleInputChange}
              className={`modern-input ${errors.ktp ? 'error' : ''}`}
              placeholder="1234567890123456"
              maxLength="16"
            />
            {errors.ktp && (
              <span className="error-message-modern">{errors.ktp}</span>
            )}
          </div>

          <div className="form-group-modern">
            <label htmlFor="alamatPenanggungJawab" className="form-label-modern">
              Alamat Penanggung Jawab *
            </label>
            <textarea
              id="alamatPenanggungJawab"
              name="alamatPenanggungJawab"
              value={formData.alamatPenanggungJawab}
              onChange={handleInputChange}
              className={`modern-textarea ${errors.alamatPenanggungJawab ? 'error' : ''}`}
              placeholder="Alamat lengkap sesuai KTP"
              rows="3"
            />
            {errors.alamatPenanggungJawab && (
              <span className="error-message-modern">{errors.alamatPenanggungJawab}</span>
            )}
          </div>

          {/* Dokumen Verifikasi */}
          <div className="section-divider-modern">
            <h2 className="section-title-modern">📄 Dokumen Verifikasi</h2>
            <p className="section-desc-modern">Unggah dokumen untuk memverifikasi keabsahan organisasi Anda</p>
          </div>

          {/* Akte Pendirian - For Masjid and Yayasan */}
          {(organizationType === 'masjid' || organizationType === 'yayasan') && (
            <div className="form-group-modern">
              <label className="form-label-modern">
                Akte Pendirian / Akta Notaris *
              </label>
            <div className="upload-area-modern">
              <input
                type="file"
                id="aktePendirian"
                name="aktePendirian"
                onChange={handleFileChange}
                className="upload-input-modern"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="aktePendirian" className="upload-label-modern">
                <div className="upload-icon-modern">📁</div>
                <div className="upload-content-modern">
                  {formData.aktePendirian ? (
                    <>
                      <span className="uploaded-file-modern">✅ {formData.aktePendirian.name}</span>
                      <span className="upload-subtext-modern">Klik untuk mengganti file</span>
                    </>
                  ) : (
                    <>
                      <span className="upload-text-modern">Pilih file atau drag & drop</span>
                      <span className="upload-subtext-modern">PDF, JPG, PNG (maks 5MB)</span>
                    </>
                  )}
                </div>
              </label>
            </div>
              {errors.aktePendirian && (
                <span className="error-message-modern">{errors.aktePendirian}</span>
              )}
            </div>
          )}

          {/* Surat Izin Operasional - Only for Lembaga */}
          {organizationType === 'lembaga' && (
            <div className="form-group-modern">
              <label className="form-label-modern">
                Surat Izin Operasional / SIUP / NIB *
              </label>
            <div className="upload-area-modern">
              <input
                type="file"
                id="suratIzinOperasional"
                name="suratIzinOperasional"
                onChange={handleFileChange}
                className="upload-input-modern"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="suratIzinOperasional" className="upload-label-modern">
                <div className="upload-icon-modern">📁</div>
                <div className="upload-content-modern">
                  {formData.suratIzinOperasional ? (
                    <>
                      <span className="uploaded-file-modern">✅ {formData.suratIzinOperasional.name}</span>
                      <span className="upload-subtext-modern">Klik untuk mengganti file</span>
                    </>
                  ) : (
                    <>
                      <span className="upload-text-modern">Pilih file atau drag & drop</span>
                      <span className="upload-subtext-modern">PDF, JPG, PNG (maks 5MB)</span>
                    </>
                  )}
                </div>
              </label>
            </div>
              {errors.suratIzinOperasional && (
                <span className="error-message-modern">{errors.suratIzinOperasional}</span>
              )}
            </div>
          )}

          {/* NPWP - Optional for all types */}
          <div className="form-group-modern">
            <label className="form-label-modern">
              {organizationType === 'masjid' ? 'NPWP Masjid (Opsional)' : 'NPWP Organisasi (Opsional)'}
            </label>
            <div className="upload-area-modern">
              <input
                type="file"
                id="npwpOrganisasi"
                name="npwpOrganisasi"
                onChange={handleFileChange}
                className="upload-input-modern"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="npwpOrganisasi" className="upload-label-modern">
                <div className="upload-icon-modern">📁</div>
                <div className="upload-content-modern">
                  {formData.npwpOrganisasi ? (
                    <>
                      <span className="uploaded-file-modern">✅ {formData.npwpOrganisasi.name}</span>
                      <span className="upload-subtext-modern">Klik untuk mengganti file</span>
                    </>
                  ) : (
                    <>
                      <span className="upload-text-modern">Pilih file atau drag & drop</span>
                      <span className="upload-subtext-modern">PDF, JPG, PNG (maks 5MB)</span>
                    </>
                  )}
                </div>
              </label>
            </div>
          {errors.npwpOrganisasi && (
            <span className="error-message-modern">{errors.npwpOrganisasi}</span>
          )}
          </div>

          {/* KTP Penanggung Jawab - Required for all types */}
          <div className="form-group-modern">
            <label className="form-label-modern">
              KTP Penanggung Jawab *
            </label>
            <div className="upload-area-modern">
              <input
                type="file"
                id="ktpPenanggungJawab"
                name="ktpPenanggungJawab"
                onChange={handleFileChange}
                className="upload-input-modern"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="ktpPenanggungJawab" className="upload-label-modern">
                <div className="upload-icon-modern">📁</div>
                <div className="upload-content-modern">
                  {formData.ktpPenanggungJawab ? (
                    <>
                      <span className="uploaded-file-modern">✅ {formData.ktpPenanggungJawab.name}</span>
                      <span className="upload-subtext-modern">Klik untuk mengganti file</span>
                    </>
                  ) : (
                    <>
                      <span className="upload-text-modern">Pilih file atau drag & drop</span>
                      <span className="upload-subtext-modern">PDF, JPG, PNG (maks 5MB)</span>
                    </>
                  )}
                </div>
              </label>
            </div>
          {errors.ktpPenanggungJawab && (
            <span className="error-message-modern">{errors.ktpPenanggungJawab}</span>
          )}
          </div>

          {/* Surat Kuasa - Optional for all types */}
          <div className="form-group-modern">
            <label className="form-label-modern">
              Surat Kuasa (Opsional)
            </label>
            <div className="upload-area-modern">
              <input
                type="file"
                id="suratKuasa"
                name="suratKuasa"
                onChange={handleFileChange}
                className="upload-input-modern"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="suratKuasa" className="upload-label-modern">
                <div className="upload-icon-modern">📁</div>
                <div className="upload-content-modern">
                  {formData.suratKuasa ? (
                    <>
                      <span className="uploaded-file-modern">✅ {formData.suratKuasa.name}</span>
                      <span className="upload-subtext-modern">Klik untuk mengganti file</span>
                    </>
                  ) : (
                    <>
                      <span className="upload-text-modern">Pilih file atau drag & drop</span>
                      <span className="upload-subtext-modern">PDF, JPG, PNG (maks 5MB)</span>
                    </>
                  )}
                </div>
              </label>
            </div>
          {errors.suratKuasa && (
            <span className="error-message-modern">{errors.suratKuasa}</span>
          )}
          </div>

          <div className="info-note-modern">
            <p className="modern-text small">
              * Dokumen wajib harus diunggah untuk verifikasi {organizationType === 'masjid' ? 'masjid' : 'organisasi'}. Format yang diterima: PDF, JPG, PNG dengan ukuran maksimal 5MB per file.
              {organizationType === 'masjid' && ' Masjid memerlukan Akte Pendirian dan KTP Penanggung Jawab.'}
              {organizationType === 'yayasan' && ' Yayasan memerlukan Akte Pendirian dan KTP Penanggung Jawab.'}
              {organizationType === 'lembaga' && ' Lembaga memerlukan Izin Operasional/SIUP dan KTP Penanggung Jawab.'}
              {organizationType === 'komunitas' && ' Komunitas hanya memerlukan KTP Penanggung Jawab.'}
            </p>
          </div>

          <button
            type="submit"
            className={`modern-btn full-width ${!isFormValid ? 'disabled' : ''}`}
            disabled={!isFormValid}
            style={{opacity: !isFormValid ? 0.5 : 1}}
          >
            Lanjutkan ke Kategori Galang Dana
          </button>
        </form>
      </div>
    </div>
  );
};

export default KelompokInfo;