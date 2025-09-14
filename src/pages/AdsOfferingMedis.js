import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AdsOffering.css';

const AdsOfferingMedis = () => {
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
    navigate('/ajakan-donasi', { state: previousData });
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
            Tim RaihMimpi Siap Membantu Promosikan Kampanye Medis Anda
          </h2>
          <p className="ads-page-subtitle">
            Bantu lebih banyak orang dengan layanan promosi khusus kampanye kesehatan dan medis
          </p>
        </div>

        <div className="modern-card">
          {/* Benefits Section */}
          <div className="ads-benefits-section">
            <p className="ads-benefits-text">
              Kampanye medis membutuhkan perhatian khusus dan jangkauan yang luas. Tim RaihMimpi memahami urgensi setiap kasus medis dan akan memberikan prioritas tinggi untuk kampanye Anda.
            </p>
            <p className="ads-benefits-text">
              Dengan layanan promosi medis kami, kampanye Anda akan tampil di posisi teratas dan menjangkau lebih banyak donatur potensial. Kampanye medis yang dipromosikan memiliki tingkat keberhasilan 4x lebih tinggi dalam mencapai target donasi.
            </p>
          </div>

          {/* Requirements Section */}
          <div className="ads-requirements-section">
            <h3 className="ads-section-title">Syarat & Ketentuan</h3>
            <p className="ads-requirements-intro">
              Untuk menggunakan layanan promosi kampanye medis, Anda perlu:
            </p>
            <ul className="ads-requirements-list">
              <li>Memiliki akun RaihMimpi yang terverifikasi</li>
              <li>Melengkapi verifikasi identitas (KTP/SIM/Paspor)</li>
              <li>Menyediakan dokumen medis yang valid</li>
              <li>Data diri pasien dan keluarga yang lengkap</li>
              <li>Kampanye telah melewati proses review tim medis RaihMimpi</li>
            </ul>
            
            <p className="ads-signup-notice">
              Belum punya akun? Daftar sekarang dan lengkapi verifikasi untuk membantu lebih banyak pasien mendapatkan bantuan yang dibutuhkan.
            </p>
          </div>

          {/* Call to Action */}
          <div className="ads-cta-section">
            <p className="ads-cta-text">
              Setiap detik sangat berharga dalam kasus medis. Mari bersama wujudkan kesembuhan dengan dukungan yang lebih luas
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

export default AdsOfferingMedis;