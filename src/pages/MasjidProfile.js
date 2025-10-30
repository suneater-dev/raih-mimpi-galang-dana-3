import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/MasjidProfile.css';

const MasjidProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const kelompokData = location.state?.groupData || {};

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    namaMasjid: '',
    sejarah: '',
    fasilitasUmum: [],
    fasilitasAnak: [],
    fasilitasDisabilitas: [],
    headerFoto: null,
    galeri: [],
    dokumen: [],
    // Statistics
    jumlahJamaah: '',
    jumlahPengurus: '',
    jumlahImam: '',
    jumlahKhatib: '',
    jumlahMuadzin: '',
    jumlahJamaahMasjid: ''
  });

  const fasilitasUmum = [
    'Tempat Wudhu',
    'Kamar Mandi/WC',
    'Sound System',
    'Penyejuk Udara/AC',
    'Tempat Parkir',
    'Kantor Sekretariat'
  ];

  const fasilitasAnak = [
    'Ruang Belajar (TPA/TPQ)',
    'Perpustakaan Anak',
    'Area Bermain Anak',
    'Kamar Mandi Anak',
    'Ruang Laktasi',
    'Ruang Kelas Mengaji'
  ];

  const fasilitasDisabilitas = [
    'Jalur Landai (Ramp)',
    'Kamar Mandi Disabilitas',
    'Kursi Roda',
    'Toilet Duduk',
    'Tempat Parkir Disabilitas',
    'Lift/Elevator'
  ];

  const [errors, setErrors] = useState({});
  const [previewHeader, setPreviewHeader] = useState(null);
  const [previewGaleri, setPreviewGaleri] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const toggleFasilitas = (fasilitas, category) => {
    setFormData(prev => {
      const currentFasilitas = prev[category];
      const isSelected = currentFasilitas.includes(fasilitas);

      return {
        ...prev,
        [category]: isSelected
          ? currentFasilitas.filter(f => f !== fasilitas)
          : [...currentFasilitas, fasilitas]
      };
    });
  };

  const handleHeaderFotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          headerFoto: 'Format file harus JPG atau PNG'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          headerFoto: 'Ukuran file maksimal 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        headerFoto: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewHeader(reader.result);
      };
      reader.readAsDataURL(file);

      if (errors.headerFoto) {
        setErrors(prev => ({
          ...prev,
          headerFoto: ''
        }));
      }
    }
  };

  const handleGaleriChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      // Validate each file
      const validFiles = [];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      for (const file of files) {
        if (!allowedTypes.includes(file.type)) {
          setErrors(prev => ({
            ...prev,
            galeri: 'Semua file harus berformat JPG atau PNG'
          }));
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          setErrors(prev => ({
            ...prev,
            galeri: 'Ukuran setiap file maksimal 5MB'
          }));
          return;
        }

        validFiles.push(file);
      }

      // Combine with existing files (max 10 total)
      const newGaleri = [...formData.galeri, ...validFiles].slice(0, 10);
      setFormData(prev => ({
        ...prev,
        galeri: newGaleri
      }));

      // Create previews
      const newPreviews = [...previewGaleri];
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          setPreviewGaleri([...newPreviews].slice(0, 10));
        };
        reader.readAsDataURL(file);
      });

      if (errors.galeri) {
        setErrors(prev => ({
          ...prev,
          galeri: ''
        }));
      }
    }
  };

  const handleDokumenChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      // Validate each file
      const validFiles = [];
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

      for (const file of files) {
        if (!allowedTypes.includes(file.type)) {
          setErrors(prev => ({
            ...prev,
            dokumen: 'File harus berformat PDF, JPG, atau PNG'
          }));
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          setErrors(prev => ({
            ...prev,
            dokumen: 'Ukuran setiap file maksimal 5MB'
          }));
          return;
        }

        validFiles.push(file);
      }

      // Combine with existing files (max 10 total)
      const newDokumen = [...formData.dokumen, ...validFiles].slice(0, 10);
      setFormData(prev => ({
        ...prev,
        dokumen: newDokumen
      }));

      if (errors.dokumen) {
        setErrors(prev => ({
          ...prev,
          dokumen: ''
        }));
      }
    }
  };

  const removeGaleriImage = (index) => {
    setFormData(prev => ({
      ...prev,
      galeri: prev.galeri.filter((_, i) => i !== index)
    }));
    setPreviewGaleri(prev => prev.filter((_, i) => i !== index));
  };

  const removeDokumen = (index) => {
    setFormData(prev => ({
      ...prev,
      dokumen: prev.dokumen.filter((_, i) => i !== index)
    }));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === previewGaleri.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? previewGaleri.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For showcase purposes - skip validation and navigate to Kotak Amal Digital
    navigate('/kotak-amal-digital', {
      state: {
        userType: 'group',
        organizationType: 'masjid',
        kelompokData: kelompokData,
        masjidProfile: formData
      }
    });
  };

  // For showcase purposes - button is always enabled
  const isFormValid = true;

  return (
    <div className="container">
      <header className="header gradient">
        <div className="back-arrow white-text" onClick={() => navigate(-1)}>←</div>
        <div className="logo white-text">Raih Mimpi</div>
        <div className="header-spacer"></div>
      </header>

      <div className="modern-card">
        <div className="form-header-modern">
          <div className="masjid-badge">
            🕌 Profil Masjid
          </div>
          <h1 className="modern-heading">Profil Masjid</h1>
          <p className="modern-text">Lengkapi profil masjid Anda untuk mempermudah jamaah mengenal masjid Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="masjid-form-modern">
          {/* Nama Masjid */}
          <div className="section-divider-modern">
            <h2 className="section-title-modern">🕌 Informasi Dasar</h2>
          </div>

          <div className="form-group-modern">
            <label htmlFor="namaMasjid" className="form-label-modern">
              Nama Masjid *
            </label>
            <input
              type="text"
              id="namaMasjid"
              name="namaMasjid"
              value={formData.namaMasjid}
              onChange={handleInputChange}
              className={`modern-input ${errors.namaMasjid ? 'error' : ''}`}
              placeholder="Contoh: Masjid Al-Ikhlas"
            />
            {errors.namaMasjid && (
              <span className="error-message-modern">{errors.namaMasjid}</span>
            )}
          </div>

          {/* Sejarah */}
          <div className="form-group-modern">
            <label htmlFor="sejarah" className="form-label-modern">
              Sejarah Masjid
            </label>
            <p className="form-hint-modern">Ceritakan sejarah berdirinya masjid, tokoh pendiri, dan perkembangan masjid</p>
            <textarea
              id="sejarah"
              name="sejarah"
              value={formData.sejarah}
              onChange={handleInputChange}
              className={`modern-textarea ${errors.sejarah ? 'error' : ''}`}
              placeholder="Contoh: Masjid Al-Ikhlas didirikan pada tahun 1985 oleh tokoh masyarakat setempat..."
              rows="6"
            />
            {errors.sejarah && (
              <span className="error-message-modern">{errors.sejarah}</span>
            )}
          </div>

          {/* Data Masjid */}
          <div className="section-divider-modern">
            <h2 className="section-title-modern">📊 Data Masjid</h2>
          </div>

          <div className="form-row-modern">
            <div className="form-group-modern">
              <label htmlFor="jumlahJamaah" className="form-label-modern">
                Jumlah Jamaah
              </label>
              <input
                type="number"
                id="jumlahJamaah"
                name="jumlahJamaah"
                value={formData.jumlahJamaah}
                onChange={handleInputChange}
                className="modern-input"
                placeholder="1200"
                min="0"
              />
            </div>

            <div className="form-group-modern">
              <label htmlFor="jumlahPengurus" className="form-label-modern">
                Jumlah Pengurus
              </label>
              <input
                type="number"
                id="jumlahPengurus"
                name="jumlahPengurus"
                value={formData.jumlahPengurus}
                onChange={handleInputChange}
                className="modern-input"
                placeholder="15"
                min="0"
              />
            </div>
          </div>

          <div className="form-row-modern">
            <div className="form-group-modern">
              <label htmlFor="jumlahImam" className="form-label-modern">
                Jumlah Imam
              </label>
              <input
                type="number"
                id="jumlahImam"
                name="jumlahImam"
                value={formData.jumlahImam}
                onChange={handleInputChange}
                className="modern-input"
                placeholder="7"
                min="0"
              />
            </div>

            <div className="form-group-modern">
              <label htmlFor="jumlahKhatib" className="form-label-modern">
                Jumlah Khatib
              </label>
              <input
                type="number"
                id="jumlahKhatib"
                name="jumlahKhatib"
                value={formData.jumlahKhatib}
                onChange={handleInputChange}
                className="modern-input"
                placeholder="52"
                min="0"
              />
            </div>
          </div>

          <div className="form-row-modern">
            <div className="form-group-modern">
              <label htmlFor="jumlahMuadzin" className="form-label-modern">
                Jumlah Muadzin
              </label>
              <input
                type="number"
                id="jumlahMuadzin"
                name="jumlahMuadzin"
                value={formData.jumlahMuadzin}
                onChange={handleInputChange}
                className="modern-input"
                placeholder="8"
                min="0"
              />
            </div>

            <div className="form-group-modern">
              <label htmlFor="jumlahJamaahMasjid" className="form-label-modern">
                Jamaah Masjid
              </label>
              <input
                type="number"
                id="jumlahJamaahMasjid"
                name="jumlahJamaahMasjid"
                value={formData.jumlahJamaahMasjid}
                onChange={handleInputChange}
                className="modern-input"
                placeholder="70"
                min="0"
              />
            </div>
          </div>

          {/* Fasilitas */}
          <div className="section-divider-modern">
            <h2 className="section-title-modern">🏢 Fasilitas Masjid</h2>
          </div>

          {/* Fasilitas Umum */}
          <div className="form-group-modern">
            <label className="form-label-modern">
              1. Fasilitas Umum
            </label>
            <p className="form-hint-modern">Fasilitas umum yang tersedia untuk semua jamaah</p>

            <div className="fasilitas-grid">
              {fasilitasUmum.map((fasilitas) => (
                <button
                  key={fasilitas}
                  type="button"
                  className={`fasilitas-btn ${formData.fasilitasUmum.includes(fasilitas) ? 'selected' : ''}`}
                  onClick={() => toggleFasilitas(fasilitas, 'fasilitasUmum')}
                >
                  <span className="fasilitas-check">
                    {formData.fasilitasUmum.includes(fasilitas) ? '✓' : ''}
                  </span>
                  {fasilitas}
                </button>
              ))}
            </div>

            {formData.fasilitasUmum.length > 0 && (
              <p className="fasilitas-count">
                {formData.fasilitasUmum.length} fasilitas dipilih
              </p>
            )}
          </div>

          {/* Fasilitas Anak */}
          <div className="form-group-modern">
            <label className="form-label-modern">
              2. Fasilitas Anak
            </label>
            <p className="form-hint-modern">Fasilitas khusus untuk anak-anak dan kegiatan pendidikan</p>

            <div className="fasilitas-grid">
              {fasilitasAnak.map((fasilitas) => (
                <button
                  key={fasilitas}
                  type="button"
                  className={`fasilitas-btn ${formData.fasilitasAnak.includes(fasilitas) ? 'selected' : ''}`}
                  onClick={() => toggleFasilitas(fasilitas, 'fasilitasAnak')}
                >
                  <span className="fasilitas-check">
                    {formData.fasilitasAnak.includes(fasilitas) ? '✓' : ''}
                  </span>
                  {fasilitas}
                </button>
              ))}
            </div>

            {formData.fasilitasAnak.length > 0 && (
              <p className="fasilitas-count">
                {formData.fasilitasAnak.length} fasilitas dipilih
              </p>
            )}
          </div>

          {/* Fasilitas Disabilitas */}
          <div className="form-group-modern">
            <label className="form-label-modern">
              3. Fasilitas Disabilitas
            </label>
            <p className="form-hint-modern">Fasilitas pendukung untuk jamaah berkebutuhan khusus</p>

            <div className="fasilitas-grid">
              {fasilitasDisabilitas.map((fasilitas) => (
                <button
                  key={fasilitas}
                  type="button"
                  className={`fasilitas-btn ${formData.fasilitasDisabilitas.includes(fasilitas) ? 'selected' : ''}`}
                  onClick={() => toggleFasilitas(fasilitas, 'fasilitasDisabilitas')}
                >
                  <span className="fasilitas-check">
                    {formData.fasilitasDisabilitas.includes(fasilitas) ? '✓' : ''}
                  </span>
                  {fasilitas}
                </button>
              ))}
            </div>

            {formData.fasilitasDisabilitas.length > 0 && (
              <p className="fasilitas-count">
                {formData.fasilitasDisabilitas.length} fasilitas dipilih
              </p>
            )}
          </div>

          {/* Header Foto */}
          <div className="section-divider-modern">
            <h2 className="section-title-modern">📸 Foto & Dokumentasi</h2>
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">
              Foto Sampul Masjid *
            </label>
            <p className="form-hint-modern">Upload foto terbaik masjid sebagai foto sampul (1 foto)</p>

            <div className="upload-area-modern header-photo">
              <input
                type="file"
                id="headerFoto"
                name="headerFoto"
                onChange={handleHeaderFotoChange}
                className="upload-input-modern"
                accept="image/jpeg,image/png,image/jpg"
              />
              <label htmlFor="headerFoto" className="upload-label-modern">
                {previewHeader ? (
                  <div className="header-preview">
                    <img src={previewHeader} alt="Header preview" />
                    <div className="preview-overlay">
                      <span>Klik untuk mengganti foto</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="upload-icon-modern">📷</div>
                    <div className="upload-content-modern">
                      <span className="upload-text-modern">Pilih foto atau drag & drop</span>
                      <span className="upload-subtext-modern">JPG, PNG (maks 5MB)</span>
                    </div>
                  </>
                )}
              </label>
            </div>
            {errors.headerFoto && (
              <span className="error-message-modern">{errors.headerFoto}</span>
            )}
          </div>

          {/* Galeri */}
          <div className="form-group-modern">
            <label className="form-label-modern">
              Galeri Foto Masjid
            </label>
            <p className="form-hint-modern">Upload beberapa foto masjid untuk galeri (maksimal 10 foto)</p>

            <div className="upload-area-modern">
              <input
                type="file"
                id="galeri"
                name="galeri"
                onChange={handleGaleriChange}
                className="upload-input-modern"
                accept="image/jpeg,image/png,image/jpg"
                multiple
              />
              <label htmlFor="galeri" className="upload-label-modern">
                <div className="upload-icon-modern">🖼️</div>
                <div className="upload-content-modern">
                  <span className="upload-text-modern">Pilih foto atau drag & drop</span>
                  <span className="upload-subtext-modern">JPG, PNG (maks 5MB per foto, max 10 foto)</span>
                </div>
              </label>
            </div>

            {/* Gallery Slider */}
            {previewGaleri.length > 0 && (
              <div className="gallery-slider-container">
                <div className="gallery-slider">
                  <div className="gallery-slide">
                    <img src={previewGaleri[currentSlide]} alt={`Gallery ${currentSlide + 1}`} />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => {
                        removeGaleriImage(currentSlide);
                        if (currentSlide >= previewGaleri.length - 1 && currentSlide > 0) {
                          setCurrentSlide(currentSlide - 1);
                        }
                      }}
                    >
                      ×
                    </button>
                  </div>

                  {previewGaleri.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="slider-nav prev"
                        onClick={prevSlide}
                      >
                        ❮
                      </button>
                      <button
                        type="button"
                        className="slider-nav next"
                        onClick={nextSlide}
                      >
                        ❯
                      </button>
                    </>
                  )}
                </div>

                {/* Slide Indicators */}
                {previewGaleri.length > 1 && (
                  <div className="slider-dots">
                    {previewGaleri.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                      />
                    ))}
                  </div>
                )}

                <p className="gallery-counter">
                  Foto {currentSlide + 1} dari {previewGaleri.length}
                </p>
              </div>
            )}

            {errors.galeri && (
              <span className="error-message-modern">{errors.galeri}</span>
            )}
          </div>

          {/* Dokumen */}
          <div className="form-group-modern">
            <label className="form-label-modern">
              Dokumen Pendukung
            </label>
            <p className="form-hint-modern">Upload dokumen pendukung (sertifikat, izin, program kegiatan, dll)</p>

            <div className="upload-area-modern">
              <input
                type="file"
                id="dokumen"
                name="dokumen"
                onChange={handleDokumenChange}
                className="upload-input-modern"
                accept=".pdf,image/jpeg,image/png,image/jpg"
                multiple
              />
              <label htmlFor="dokumen" className="upload-label-modern">
                <div className="upload-icon-modern">📁</div>
                <div className="upload-content-modern">
                  <span className="upload-text-modern">Pilih dokumen atau drag & drop</span>
                  <span className="upload-subtext-modern">PDF, JPG, PNG (maks 5MB per file, max 10 file)</span>
                </div>
              </label>
            </div>

            {/* Document List */}
            {formData.dokumen.length > 0 && (
              <div className="document-list">
                {formData.dokumen.map((doc, index) => (
                  <div key={index} className="document-item">
                    <div className="document-info">
                      <span className="document-icon">
                        {doc.type === 'application/pdf' ? '📄' : '🖼️'}
                      </span>
                      <span className="document-name">{doc.name}</span>
                      <span className="document-size">
                        ({(doc.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      className="remove-doc-btn"
                      onClick={() => removeDokumen(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {errors.dokumen && (
              <span className="error-message-modern">{errors.dokumen}</span>
            )}
          </div>

          <div className="info-note-modern">
            <p className="modern-text small">
              💡 Tip: Lengkapi profil masjid dengan informasi yang detail untuk membantu jamaah dan donatur mengenal masjid Anda lebih baik
            </p>
          </div>

          <button
            type="submit"
            className={`modern-btn full-width ${!isFormValid ? 'disabled' : ''}`}
            disabled={!isFormValid}
          >
            Lanjutkan ke Kotak Amal Digital
          </button>
        </form>
      </div>
    </div>
  );
};

export default MasjidProfile;
