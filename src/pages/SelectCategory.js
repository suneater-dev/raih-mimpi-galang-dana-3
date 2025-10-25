import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SelectCategory.css';

const SelectCategory = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleMedicalCategory = () => {
    setShowModal(true);
  };

  const handleGeneralCategory = () => {
    // Navigate to bantuan lainnya category selection
    navigate('/bantuan-lainnya');
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleUnderstand = () => {
    setShowModal(false);
    navigate('/bantuan-medis');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={() => navigate('/user-info')}>
          ←
        </button>
        <div className="logo white-text">RaihMimpi</div>
        <div className="header-spacer"></div>
      </header>

      {/* Main Content */}
      <div className="main-content-modern">
        {/* Welcome Section */}
        <div className="welcome-section-modern">
          <h1 className="modern-heading">Hai, #OrangBaik!</h1>
          <p className="modern-text text-center">Kamu ingin menggalang dana untuk...</p>
        </div>

        {/* Category Selection */}
        <div className="category-section-modern">
          {/* Medical Category */}
          <div className="modern-card category-card-modern">
            <div className="category-header-modern">
              <div className="category-icon-modern medical">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="category-content-modern">
                <h3 className="modern-subheading">Galang dana bantuan orang sakit</h3>
                <p className="modern-text small">Khusus biaya pengobatan atau perawatan penyakit tertentu.</p>
              </div>
            </div>
            <button className="modern-btn full-width" onClick={handleMedicalCategory}>
              Buat galang dana orang sakit
            </button>
          </div>

          {/* General Category */}
          <div className="modern-card category-card-modern">
            <div className="category-header-modern">
              <div className="category-icon-modern general">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="category-content-modern">
                <h3 className="modern-subheading">Galang dana bantuan lainnya</h3>
                <p className="modern-text small">Untuk bantuan pendidikan, kemanusiaan, bencana alam, dsb.</p>
              </div>
            </div>
            <button className="modern-btn secondary full-width" onClick={handleGeneralCategory}>
              Buat galang dana bantuan lainnya
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
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

export default SelectCategory;