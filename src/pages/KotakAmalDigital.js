import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/KotakAmalDigital.css';

const KotakAmalDigital = () => {
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

      {/* Main Content */}
      <div className="kotak-amal-content">
        {/* Page Header */}
        <div className="kotak-amal-header">
          <div className="kotak-amal-badge">
            🕌 Kotak Amal Digital
          </div>
          <h1 className="kotak-amal-title">Kotak Amal Digital</h1>
          <p className="kotak-amal-subtitle">
            4 Kategori Galang Dana untuk Masjid Anda
          </p>
        </div>

        {/* Categories List */}
        <div className="categories-list-kotak-amal">
          {categories.map((category) => (
            <div
              key={category.id}
              className="kotak-amal-card"
            >
              <div className="category-icon-kotak-amal">
                {category.icon}
              </div>
              <div className="category-content-kotak-amal">
                <h3 className="category-title-kotak-amal">
                  {category.title}
                </h3>
                <p className="category-desc-kotak-amal">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Note */}
        <div className="kotak-amal-info">
          <p className="info-text-kotak-amal">
            💡 <strong>Kotak Amal Digital</strong> memudahkan jamaah dan donatur untuk berinfaq secara online ke masjid Anda dengan kategori yang jelas dan transparan
          </p>
        </div>

        {/* Continue Button */}
        <button
          className="modern-btn full-width"
          onClick={() => navigate('/masjid-preview', {
            state: {
              userType: 'group',
              organizationType: 'masjid',
              kelompokData: kelompokData,
              masjidProfile: masjidData
            }
          })}
        >
          Preview Profil Masjid
        </button>
      </div>
    </div>
  );
};

export default KotakAmalDigital;
