import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AdsOffering.css';

const AdsOfferingSosial = () => {
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
    navigate('/ajakan-sosial', { state: previousData });
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
            Perluas Dampak Kegiatan Sosial Anda Bersama RaihMimpi
          </h2>
          <p className="ads-page-subtitle">
            Libatkan lebih banyak relawan dan donatur untuk kegiatan sosial yang bermanfaat bagi masyarakat
          </p>
        </div>

        <div className="modern-card">
          {/* Benefits Section */}
          <div className="ads-benefits-section">
            <p className="ads-benefits-text">
              Kegiatan sosial membutuhkan partisipasi komunitas yang luas untuk menciptakan dampak nyata. Tim RaihMimpi akan membantu mempromosikan inisiatif sosial Anda ke jaringan #PejuangMimpi yang peduli terhadap kesejahteraan masyarakat.
            </p>
            <p className="ads-benefits-text">
              Dengan strategi promosi yang tepat sasaran, kegiatan sosial Anda akan menjangkau lebih banyak orang yang ingin berkontribusi. Program sosial yang dipromosikan memiliki tingkat partisipasi 5x lebih tinggi dan dampak yang lebih berkelanjutan.
            </p>
          </div>

          {/* Requirements Section */}
          <div className="ads-requirements-section">
            <h3 className="ads-section-title">Syarat & Ketentuan</h3>
            <p className="ads-requirements-intro">
              Untuk menggunakan layanan promosi kegiatan sosial, Anda perlu:
            </p>
            <ul className="ads-requirements-list">
              <li>Memiliki akun RaihMimpi yang terverifikasi</li>
              <li>Melengkapi verifikasi identitas (KTP/SIM/Paspor)</li>
              <li>Dokumentasi kegiatan sosial sebelumnya (jika ada)</li>
              <li>Rencana program yang jelas dan terukur</li>
              <li>Kampanye telah melewati proses review tim sosial RaihMimpi</li>
            </ul>
            
            <p className="ads-signup-notice">
              Belum punya akun? Bergabunglah dengan komunitas peduli sosial RaihMimpi dan ciptakan perubahan positif bersama ribuan relawan lainnya.
            </p>
          </div>

          {/* Call to Action */}
          <div className="ads-cta-section">
            <p className="ads-cta-text">
              Setiap tindakan sosial memiliki kekuatan untuk mengubah hidup. Mari bersama wujudkan masyarakat yang lebih baik
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

export default AdsOfferingSosial;