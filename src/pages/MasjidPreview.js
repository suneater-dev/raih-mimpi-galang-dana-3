import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/MasjidPreview.css';

const MasjidPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const masjidData = location.state?.masjidProfile || {};
  const kelompokData = location.state?.kelompokData || {};

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
          <span className="preview-icon">👁️</span>
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
              🕌 Masjid
            </div>
            <h1 className="masjid-profile-title">
              {masjidData.namaMasjid || 'Masjid Baiturahman'}
            </h1>
            <p className="masjid-profile-subtitle">
              {kelompokData.namaOrganisasi || 'Yayasan Masjid Baiturahman'}
            </p>
          </div>

          {/* Statistics Section */}
          <div className="masjid-statistics">
            <div className="stat-item">
              <div className="stat-value">1200+</div>
              <div className="stat-label">Jamaah</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">15</div>
              <div className="stat-label">Pengurus</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">7</div>
              <div className="stat-label">Imam</div>
            </div>
          </div>

          <div className="masjid-statistics secondary">
            <div className="stat-item">
              <div className="stat-value">52</div>
              <div className="stat-label">Khatib</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">8</div>
              <div className="stat-label">Muadzin</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">70</div>
              <div className="stat-label">Jamaah Masjid</div>
            </div>
          </div>

          {/* Kotak Amal Digital Section - Grid Style */}
          <div className="masjid-section kotak-amal-section">
            <div className="kotak-amal-section-header">
              <h2 className="section-heading">🪙 Kotak Amal Digital</h2>
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

          {/* Facilities Section - Always show */}
          <div className="masjid-section">
            <h2 className="section-heading">Fasilitas</h2>
            <div className="facilities-grid">
              {(masjidData.fasilitas && masjidData.fasilitas.length > 0
                ? masjidData.fasilitas
                : ['Tempat Wudhu', 'Area Parkir', 'Toilet', 'AC']).map((fasilitas, index) => (
                <div key={index} className="facility-item">
                  <span className="facility-check">☑</span>
                  <span className="facility-text">{fasilitas}</span>
                </div>
              ))}
            </div>
          </div>

          {/* History Section - Always show */}
          <div className="masjid-section">
            <h2 className="section-heading">Sejarah</h2>
            <p className="section-text">
              {masjidData.sejarah || 'Lorem ipsum dolor sit amet consectetur. Adipiscing elit donec vel lorem. Donec vestibulum sapien eget molestie iaculis. Amet sollicitudin ipsum at molestie pellentesque consequat vel feugiat. Lacus eget sit pulvinar pellentesque in porttitor. Praesent facilisi aliquam porttitor vel.'}
            </p>
          </div>

          {/* Gallery Section - Always show */}
          <div className="masjid-section">
            <h2 className="section-heading">Galeri</h2>
            <div className="masjid-gallery">
              {(masjidData.galeri && masjidData.galeri.length > 0
                ? masjidData.galeri.map((foto, index) => (
                    <div key={index} className="gallery-image">
                      <img
                        src={URL.createObjectURL(foto)}
                        alt={`Gallery ${index + 1}`}
                      />
                    </div>
                  ))
                : [1, 2, 3, 4].map((num) => (
                    <div key={num} className="gallery-image">
                      <img
                        src="/masjid cover.webp"
                        alt={`Gallery ${num}`}
                      />
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Documents Section - if available */}
          {masjidData.dokumen && masjidData.dokumen.length > 0 && (
            <div className="masjid-section">
              <h2 className="section-heading">Dokumen</h2>
              <div className="documents-list">
                {masjidData.dokumen.map((doc, index) => (
                  <div key={index} className="document-item">
                    <span className="document-icon">📄</span>
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
            ✏️ Edit Profil
          </button>
          <button className="preview-btn publish-btn" onClick={handlePublish}>
            ✅ Terbitkan Profil Masjid
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasjidPreview;
