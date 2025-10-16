import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BantuanLainnya.css';

const BantuanLainnya = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleCategorySelect = (category) => {
    console.log('Selected category:', category);

    switch (category) {
      case 'bantuan-medis':
        setShowModal(true);
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

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleUnderstand = () => {
    setShowModal(false);
    navigate('/bantuan-medis');
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
      </div>

      {/* Modal for Medical Category */}
      {showModal && (
        <div className="modal-overlay-modern" onClick={handleModalClose}>
          <div className="modal-content-modern" onClick={(e) => e.stopPropagation()}>
            <div className="modern-card" style={{margin: 0}}>
              <h3 className="modern-subheading">Pastikan kamu orang yang berhak membuat galang dana dengan memiliki dokumen berikut:</h3>
              <ul className="modal-list-modern">
                <li><strong>KTP kamu</strong> sebagai penggalang dana</li>
                <li>
                  <strong>Kartu Keluarga pasien</strong>
                  <ul>
                    <li>Jika pasien belum ada di KK, sertakan <strong>akta/Surat Keterangan Lahir</strong></li>
                  </ul>
                </li>
                <li><strong>Surat keterangan medis</strong> dengan keterangan <strong>diagnosis/penyakit</strong></li>
                <li><strong>Hasil pemeriksaan</strong> (lab, rontgen, dsb.)</li>
              </ul>

              <div className="info-box-modern">
                <div className="info-icon-modern">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm.015-12.839c-.386 0-.719-.119-.997-.356-.271-.237-.407-.573-.407-1.007 0-.394.14-.716.417-.967.285-.258.614-.387.987-.387.36 0 .679.116.957.346.278.231.417.567.417 1.008 0 .427-.136.763-.407 1.007a1.42 1.42 0 0 1-.967.356Zm1.374 2.87v3.94c0 .556-.132.976-.397 1.261-.265.285-.6.428-1.007.428a1.27 1.27 0 0 1-.997-.438c-.251-.292-.377-.709-.377-1.251v-3.86c0-.549.126-.962.377-1.24.257-.279.59-.418.997-.418.407 0 .742.14 1.007.418.265.278.397.664.397 1.16Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="modern-text small">Disclaimer: Pastikan bahwa setiap dokumen yang diunggah dalam galang dana ini telah melalui proses validasi. Dengan demikian, dokumen yang disertakan adalah asli dan dapat dipertanggungjawabkan.</p>
              </div>

              <div className="modal-buttons-modern">
                <button className="modern-btn secondary">Lihat contoh dokumen medis</button>
                <button className="modern-btn" onClick={handleUnderstand}>
                  Mengerti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BantuanLainnya;