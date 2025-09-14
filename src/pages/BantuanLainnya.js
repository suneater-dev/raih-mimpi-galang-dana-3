import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BantuanLainnya.css';

const BantuanLainnya = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    console.log('Selected category:', category);
    
    switch (category) {
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
      id: 'karya-kreatif',
      title: 'Karya Kreatif & Modal Usaha',
      icon: '💡',
      description: 'Untuk mendukung proyek kreatif, startup, atau modal usaha'
    },
    {
      id: 'kegiatan-sosial',
      title: 'Kegiatan Sosial',
      icon: '🤝',
      description: 'Untuk kegiatan sosial, bakti sosial, atau program kemasyarakatan'
    },
    {
      id: 'bantuan-pendidikan',
      title: 'Bantuan Pendidikan',
      icon: '🎓',
      description: 'Untuk bantuan biaya sekolah, kuliah, atau program pendidikan'
    }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={() => navigate('/select-category')}>
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
      </div>
    </div>
  );
};

export default BantuanLainnya;