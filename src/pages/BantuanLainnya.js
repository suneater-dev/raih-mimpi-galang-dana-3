import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BantuanLainnya.css';

const BantuanLainnya = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    console.log('Selected category:', category);

    switch (category) {
      case 'bantuan-medis':
        navigate('/bantuan-medis');
        break;
      case 'karya-kreatif':
        navigate('/karya-kreatif');
        break;
      case 'kegiatan-sosial':
        navigate('/kegiatan-sosial');
        break;
      case 'bantuan-pendidikan':
        navigate('/bantuan-pendidikan');
        break;
      default:
        navigate('/user-info');
    }
  };

  const categories = [
    {
      id: 'kegiatan-sosial',
      title: 'Kegiatan Sosial',
      icon: '🤝',
      description: 'Ciptakan dampak positif untuk masyarakat melalui program sosial dan kegiatan berbagi'
    },
    {
      id: 'bantuan-medis',
      title: 'Bantuan Orang Sakit',
      icon: '🏥',
      description: 'Wujudkan kesembuhan dan harapan baru melalui bantuan biaya pengobatan & perawatan medis'
    },
    {
      id: 'karya-kreatif',
      title: 'Karya Kreatif & Modal Usaha',
      icon: '💡',
      description: 'Realisasikan ide kreatif dan kembangkan bisnis impian dengan dukungan modal usaha'
    },
    {
      id: 'bantuan-pendidikan',
      title: 'Bantuan Pendidikan',
      icon: '🎓',
      description: 'Raih mimpi pendidikan dan masa depan cerah dengan bantuan biaya sekolah & kuliah'
    }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={() => navigate(-1)}>
          ←
        </button>
        <div className="logo white-text">Pilih kategori galang dana</div>
        <div className="header-spacer"></div>
      </header>

      {/* Main Content */}
      <div className="main-content-modern">
        {/* Categories List */}
        <div className="categories-list-modern">
          {categories.map((category) => (
            <div
              key={category.id}
              className="modern-card category-item-modern"
              onClick={() => handleCategorySelect(category.id)}
            >
              <div className="category-item-content">
                <div className="category-icon-large">
                  {category.icon}
                </div>
                <div className="category-info">
                  <h3 className="modern-subheading category-title-modern">
                    {category.title}
                  </h3>
                  <p className="modern-text small category-desc-modern">
                    {category.description}
                  </p>
                </div>
                <div className="category-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home Button */}
        <button
          className="back-to-home-btn"
          onClick={() => navigate('/')}
        >
          Kembali ke Halaman Utama
        </button>
      </div>
    </div>
  );
};

export default BantuanLainnya;