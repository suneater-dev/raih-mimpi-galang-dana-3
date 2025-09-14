import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AdsOffering.css';

const AdsOfferingPendidikan = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from previous steps
  const previousData = location.state || {};

  const handleAdvertise = () => {
    navigate('/account-registration', {
      state: {
        ...previousData,
        fromAds: true
      }
    });
  };

  const handlePublishWithoutAds = () => {
    navigate('/campaign-complete', {
      state: {
        ...previousData,
        withAds: false
      }
    });
  };

  const handleBack = () => {
    navigate('/ajakan-pendidikan', { state: previousData });
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Promosi Kampanye</div>
      </header>

      {/* Main Content */}
      <div className="ads-page-container">
        <div className="ads-page-header">
          <h2 className="ads-page-title">
            Tim RaihMimpi Siap Membantu Promosikan Kampanye Anda
          </h2>
          <p className="ads-page-subtitle">
            Tingkatkan visibilitas kampanye hingga 5x lipat dengan layanan promosi profesional kami
          </p>
        </div>

        <div className="modern-card">
          {/* Benefits Section */}
          <div className="ads-benefits-section">
            <p className="ads-benefits-text">
              Biarkan tim RaihMimpi membantu mewujudkan mimpi Anda lebih cepat. Dengan layanan promosi kampanye, kami akan menampilkan kampanye Anda di posisi prioritas dan menjangkau lebih banyak #PejuangMimpi potensial.
            </p>
            <p className="ads-benefits-text">
              Tim kami akan memberikan pendampingan strategi promosi terbaik untuk meningkatkan visibilitas kampanye hingga 5x lipat. Kampanye yang dipromosikan oleh tim RaihMimpi memiliki peluang 3x lebih besar untuk mencapai target donasi.
            </p>
          </div>

          {/* Requirements Section */}
          <div className="ads-requirements-section">
            <h3 className="ads-section-title">Syarat & Ketentuan</h3>
            <p className="ads-requirements-intro">
              Untuk menggunakan layanan promosi ini, Anda perlu:
            </p>
            <ul className="ads-requirements-list">
              <li>Memiliki akun RaihMimpi yang terverifikasi</li>
              <li>Melengkapi verifikasi identitas (KTP/SIM/Paspor)</li>
              <li>Menyediakan data diri lengkap dan valid</li>
              <li>Kampanye telah melewati proses review tim RaihMimpi</li>
            </ul>
            
            <p className="ads-signup-notice">
              Belum punya akun? Daftar sekarang dan lengkapi verifikasi untuk mulai mempromosikan kampanye Anda.
            </p>
          </div>

          {/* Call to Action */}
          <div className="ads-cta-section">
            <p className="ads-cta-text">
              Mari bersama-sama wujudkan mimpi untuk sesama dengan jangkauan yang lebih luas
            </p>
            
            <div className="ads-buttons">
              <button className="ads-btn-primary" onClick={handleAdvertise}>
                Iklankan Kampanye
              </button>
              <button className="ads-btn-secondary" onClick={handlePublishWithoutAds}>
                Publish Tanpa Iklan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsOfferingPendidikan;