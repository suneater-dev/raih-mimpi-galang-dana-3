import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/MasjidPreview.css';

const MasjidCampaignView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const campaign = location.state?.campaign || {};
  const [currentSlide, setCurrentSlide] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock Masjid Data (in real app, this would come from backend based on campaign)
  const masjidData = {
    namaMasjid: 'Masjid Nurul Huda',
    jumlahJamaah: '350',
    jumlahPengurus: '15',
    jumlahImam: '3',
    jumlahKhatib: '52',
    jumlahMuadzin: '8',
    jumlahJamaahMasjid: '70',
    sejarah: 'Masjid Nurul Huda didirikan pada tahun 1985 oleh masyarakat setempat dengan gotong royong. Awalnya hanya berupa musholla kecil, kemudian berkembang menjadi masjid yang dapat menampung hingga 500 jamaah. Masjid ini telah mengalami beberapa kali renovasi untuk meningkatkan kualitas fasilitas ibadah.',
    fasilitasUmum: ['Tempat Wudhu', 'Kamar Mandi/WC', 'Sound System', 'Penyejuk Udara/AC', 'Tempat Parkir'],
    fasilitasAnak: ['Ruang Belajar (TPA/TPQ)', 'Perpustakaan Anak', 'Area Bermain Anak'],
    fasilitasDisabilitas: ['Jalur Landai (Ramp)', 'Kamar Mandi Disabilitas']
  };

  const categories = [
    {
      id: 'infaq-pembangunan',
      title: 'Infaq Pembangunan',
      icon: '🏗️',
      description: 'Galang dana untuk pembangunan, renovasi, dan pengembangan fisik masjid'
    },
    {
      id: 'operasional-masjid',
      title: 'Operasional Masjid',
      icon: '💰',
      description: 'Dana untuk kebutuhan operasional sehari-hari masjid seperti listrik, air, dan kebersihan'
    },
    {
      id: 'santunan-yatim',
      title: 'Santunan Yatim & Lansia',
      icon: '🤲',
      description: 'Program santunan dan bantuan untuk anak yatim dan lansia di lingkungan masjid'
    },
    {
      id: 'pemberdayaan-masjid',
      title: 'Program Pemberdayaan Masjid',
      icon: '📚',
      description: 'Program pendidikan, pelatihan, dan pemberdayaan masyarakat berbasis masjid'
    }
  ];

  // Gallery images - use masjid images
  const galleryImages = [
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

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleDonate = () => {
    alert('Fitur donasi akan segera tersedia!');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="logo white-text">Raih Mimpi</div>
        <div className="header-spacer"></div>
      </header>

      {/* Main Content */}
      <div className="masjid-preview-content">
        {/* Header Photo */}
        <div className="masjid-hero-image">
          <img
            src="/masjid cover.webp"
            alt={masjidData.namaMasjid}
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
              {masjidData.namaMasjid}
            </h1>
          </div>

          {/* Statistics Section */}
          <div className="masjid-statistics">
            <div className="stat-item">
              <div className="stat-value">{masjidData.jumlahJamaah}+</div>
              <div className="stat-label">Jamaah</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{masjidData.jumlahPengurus}</div>
              <div className="stat-label">Pengurus</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{masjidData.jumlahImam}</div>
              <div className="stat-label">Imam</div>
            </div>
          </div>

          <div className="masjid-statistics secondary">
            <div className="stat-item">
              <div className="stat-value">{masjidData.jumlahKhatib}</div>
              <div className="stat-label">Khatib</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{masjidData.jumlahMuadzin}</div>
              <div className="stat-label">Muadzin</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{masjidData.jumlahJamaahMasjid}</div>
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
                  <button className="campaign-btn" onClick={handleDonate}>
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
            {masjidData.fasilitasUmum.length > 0 && (
              <div className="facility-category">
                <h3 className="facility-category-title">Fasilitas Umum</h3>
                <div className="facilities-grid">
                  {masjidData.fasilitasUmum.map((fasilitas, index) => (
                    <div key={index} className="facility-item">
                      <span className="facility-check">✓</span>
                      <span className="facility-text">{fasilitas}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fasilitas Anak */}
            {masjidData.fasilitasAnak.length > 0 && (
              <div className="facility-category">
                <h3 className="facility-category-title">Fasilitas Anak</h3>
                <div className="facilities-grid">
                  {masjidData.fasilitasAnak.map((fasilitas, index) => (
                    <div key={index} className="facility-item">
                      <span className="facility-check">✓</span>
                      <span className="facility-text">{fasilitas}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fasilitas Disabilitas */}
            {masjidData.fasilitasDisabilitas.length > 0 && (
              <div className="facility-category">
                <h3 className="facility-category-title">Fasilitas Disabilitas</h3>
                <div className="facilities-grid">
                  {masjidData.fasilitasDisabilitas.map((fasilitas, index) => (
                    <div key={index} className="facility-item">
                      <span className="facility-check">✓</span>
                      <span className="facility-text">{fasilitas}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* History Section */}
          <div className="masjid-section">
            <h2 className="section-heading">Sejarah</h2>
            <p className="section-text">
              {masjidData.sejarah}
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
        </div>

        {/* Floating Donate Button */}
        <div className="preview-actions" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', padding: '16px 20px', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)', zIndex: 100 }}>
          <button className="preview-btn publish-btn" onClick={handleDonate} style={{ width: '100%', maxWidth: '500px', margin: '0 auto', display: 'block' }}>
            Donasi Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasjidCampaignView;
