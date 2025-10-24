import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/MasjidPreview.css';

const MasjidPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const masjidData = location.state?.masjidProfile || {};
  const kelompokData = location.state?.kelompokData || {};
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    {
      id: 'infaq-pembangunan',
      title: 'Infaq Pembangunan',
      icon: '',
      description: 'Galang dana untuk pembangunan, renovasi, dan pengembangan fisik masjid'
    },
    {
      id: 'operasional-masjid',
      title: 'Operasional Masjid',
      icon: '',
      description: 'Dana untuk kebutuhan operasional sehari-hari masjid seperti listrik, air, dan kebersihan'
    },
    {
      id: 'santunan-yatim',
      title: 'Santunan Yatim & Lansia',
      icon: '',
      description: 'Program santunan dan bantuan untuk anak yatim dan lansia di lingkungan masjid'
    },
    {
      id: 'pemberdayaan-masjid',
      title: 'Program Pemberdayaan Masjid',
      icon: '',
      description: 'Program pendidikan, pelatihan, dan pemberdayaan masyarakat berbasis masjid'
    }
  ];

  const handlePublish = () => {
    navigate('/campaign-complete', {
      state: {
        userType: 'group',
        organizationType: 'masjid',
        kelompokData: kelompokData,
        masjidProfile: masjidData
      }
    });
  };

  const handleEdit = () => {
    navigate(-1);
  };

  // Get facilities by category or use defaults
  const fasilitasUmum = (masjidData.fasilitasUmum && masjidData.fasilitasUmum.length > 0)
    ? masjidData.fasilitasUmum
    : ['Tempat Wudhu', 'Area Parkir'];

  const fasilitasAnak = (masjidData.fasilitasAnak && masjidData.fasilitasAnak.length > 0)
    ? masjidData.fasilitasAnak
    : ['Ruang Belajar (TPA/TPQ)'];

  const fasilitasDisabilitas = (masjidData.fasilitasDisabilitas && masjidData.fasilitasDisabilitas.length > 0)
    ? masjidData.fasilitasDisabilitas
    : ['Jalur Landai (Ramp)'];

  // Gallery images - use uploaded or dummy images
  const galleryImages = masjidData.galeri && masjidData.galeri.length > 0
    ? masjidData.galeri.map((foto, index) => ({
        src: URL.createObjectURL(foto),
        alt: `Gallery ${index + 1}`
      }))
    : [
        { src: '/masjid cover.webp', alt: 'Gallery 1' },
        { src: '/masjid-2.jpeg', alt: 'Gallery 2' },
        { src: '/masjid-3.jpeg', alt: 'Gallery 3' },
        { src: '/masjid-4.jpeg', alt: 'Gallery 4' }
      ];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={() => navigate(-1)}>
          ←
        </button>
        <div className="logo white-text">Raih Mimpi</div>
        <div className="header-spacer"></div>
      </header>

      {/* Preview Mode Banner */}
      <div className="preview-banner">
        <div className="preview-banner-content">
          <div className="preview-text">
            <strong>Mode Preview</strong>
            <span>Ini adalah tampilan yang akan dilihat oleh donatur</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="masjid-preview-content">
        {/* Header Photo - Always show with dummy or uploaded image */}
        <div className="masjid-hero-image">
          <img
            src={masjidData.headerFoto ? URL.createObjectURL(masjidData.headerFoto) : '/masjid cover.webp'}
            alt={masjidData.namaMasjid || 'Masjid'}
          />
        </div>

        {/* Masjid Profile Card */}
        <div className="masjid-profile-card">
          {/* Masjid Name & Badge */}
          <div className="masjid-profile-header">
            <div className="masjid-type-badge">
              Masjid
            </div>
            <h1 className="masjid-profile-title">
              {masjidData.namaMasjid || 'Masjid Baiturahman'}
            </h1>
          </div>

          {/* Statistics Section */}
          <div className="masjid-statistics">
            <div className="stat-item">
              <div className="stat-value">{masjidData.jumlahJamaah || '1200'}+</div>
              <div className="stat-label">Jamaah</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{masjidData.jumlahPengurus || '15'}</div>
              <div className="stat-label">Pengurus</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{masjidData.jumlahImam || '7'}</div>
              <div className="stat-label">Imam</div>
            </div>
          </div>

          <div className="masjid-statistics secondary">
            <div className="stat-item">
              <div className="stat-value">{masjidData.jumlahKhatib || '52'}</div>
              <div className="stat-label">Khatib</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{masjidData.jumlahMuadzin || '8'}</div>
              <div className="stat-label">Muadzin</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{masjidData.jumlahJamaahMasjid || '70'}</div>
              <div className="stat-label">Jamaah Masjid</div>
            </div>
          </div>

          {/* Kotak Amal Digital Section - Grid Style */}
          <div className="masjid-section kotak-amal-section">
            <div className="kotak-amal-section-header">
              <h2 className="section-heading">Kotak Amal Digital</h2>
              <p className="section-description">
                Pilih program donasi yang ingin Anda dukung
              </p>
            </div>

            <div className="campaigns-grid">
              {categories.map((category) => (
                <div key={category.id} className="campaign-card">
                  <div className="campaign-icon">{category.icon}</div>
                  <h3 className="campaign-title">{category.title}</h3>
                  <p className="campaign-desc">{category.description}</p>
                  <button className="campaign-btn">
                    Donasi
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities Section - Categorized */}
          <div className="masjid-section">
            <h2 className="section-heading">Fasilitas</h2>

            {/* Fasilitas Umum */}
            {fasilitasUmum.length > 0 && (
              <div className="facility-category">
                <h3 className="facility-category-title">Fasilitas Umum</h3>
                <div className="facilities-grid">
                  {fasilitasUmum.map((fasilitas, index) => (
                    <div key={index} className="facility-item">
                      <span className="facility-check">✓</span>
                      <span className="facility-text">{fasilitas}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fasilitas Anak */}
            {fasilitasAnak.length > 0 && (
              <div className="facility-category">
                <h3 className="facility-category-title">Fasilitas Anak</h3>
                <div className="facilities-grid">
                  {fasilitasAnak.map((fasilitas, index) => (
                    <div key={index} className="facility-item">
                      <span className="facility-check">✓</span>
                      <span className="facility-text">{fasilitas}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fasilitas Disabilitas */}
            {fasilitasDisabilitas.length > 0 && (
              <div className="facility-category">
                <h3 className="facility-category-title">Fasilitas Disabilitas</h3>
                <div className="facilities-grid">
                  {fasilitasDisabilitas.map((fasilitas, index) => (
                    <div key={index} className="facility-item">
                      <span className="facility-check">✓</span>
                      <span className="facility-text">{fasilitas}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* History Section - Always show */}
          <div className="masjid-section">
            <h2 className="section-heading">Sejarah</h2>
            <p className="section-text">
              {masjidData.sejarah || 'Lorem ipsum dolor sit amet consectetur. Adipiscing elit donec vel lorem. Donec vestibulum sapien eget molestie iaculis. Amet sollicitudin ipsum at molestie pellentesque consequat vel feugiat. Lacus eget sit pulvinar pellentesque in porttitor. Praesent facilisi aliquam porttitor vel.'}
            </p>
          </div>

          {/* Gallery Section - Slider */}
          <div className="masjid-section">
            <h2 className="section-heading">Galeri</h2>
            <div className="gallery-slider-container">
              <div className="gallery-slider">
                <div className="gallery-slide">
                  <img
                    src={galleryImages[currentSlide].src}
                    alt={galleryImages[currentSlide].alt}
                  />
                </div>

                {galleryImages.length > 1 && (
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

              {galleryImages.length > 1 && (
                <div className="slider-dots">
                  {galleryImages.map((_, index) => (
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
                Foto {currentSlide + 1} dari {galleryImages.length}
              </p>
            </div>
          </div>

          {/* Documents Section - if available */}
          {masjidData.dokumen && masjidData.dokumen.length > 0 && (
            <div className="masjid-section">
              <h2 className="section-heading">Dokumen</h2>
              <div className="documents-list">
                {masjidData.dokumen.map((doc, index) => (
                  <div key={index} className="document-item">
                    <span className="document-name">{doc.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="preview-actions">
          <button className="preview-btn edit-btn" onClick={handleEdit}>
            Edit Profil
          </button>
          <button className="preview-btn publish-btn" onClick={handlePublish}>
            Ajukan
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasjidPreview;
