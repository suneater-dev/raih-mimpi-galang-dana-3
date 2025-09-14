import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AdsOffering.css';

const AdsOfferingKreatif = () => {
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
    navigate('/ajakan-kreatif', { state: previousData });
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
            Wujudkan Karya Kreatif Anda dengan Dukungan RaihMimpi
          </h2>
          <p className="ads-page-subtitle">
            Jangkau komunitas kreatif yang lebih luas dengan layanan promosi khusus karya seni dan kreativitas
          </p>
        </div>

        <div className="modern-card">
          {/* Benefits Section */}
          <div className="ads-benefits-section">
            <p className="ads-benefits-text">
              Karya kreatif membutuhkan apresiasi dan dukungan komunitas yang tepat. Tim RaihMimpi akan membantu mempromosikan proyek kreatif Anda ke audiens yang sesuai dan berminat tinggi pada seni dan kreativitas.
            </p>
            <p className="ads-benefits-text">
              Dengan jaringan komunitas kreatif yang luas, kampanye karya seni Anda akan mendapat eksposur maksimal. Proyek kreatif yang dipromosikan memiliki peluang 3x lebih besar untuk mendapat dukungan penuh dari para pecinta seni.
            </p>
          </div>

          {/* Requirements Section */}
          <div className="ads-requirements-section">
            <h3 className="ads-section-title">Syarat & Ketentuan</h3>
            <p className="ads-requirements-intro">
              Untuk menggunakan layanan promosi karya kreatif, Anda perlu:
            </p>
            <ul className="ads-requirements-list">
              <li>Memiliki akun RaihMimpi yang terverifikasi</li>
              <li>Melengkapi verifikasi identitas (KTP/SIM/Paspor)</li>
              <li>Portfolio atau dokumentasi karya sebelumnya</li>
              <li>Rencana proyek yang jelas dan terperinci</li>
              <li>Kampanye telah melewati proses review tim kreatif RaihMimpi</li>
            </ul>
            
            <p className="ads-signup-notice">
              Belum punya akun? Bergabunglah dengan komunitas kreator RaihMimpi dan wujudkan proyek kreatif impian Anda bersama ribuan supporter.
            </p>
          </div>

          {/* Call to Action */}
          <div className="ads-cta-section">
            <p className="ads-cta-text">
              Setiap karya kreatif layak mendapat apresiasi. Mari bersama ciptakan dampak positif melalui seni dan kreativitas
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

export default AdsOfferingKreatif;