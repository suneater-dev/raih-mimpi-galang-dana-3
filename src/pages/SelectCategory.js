import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SelectCategory.css';

const SelectCategory = () => {
  const navigate = useNavigate();

  const handleMedicalCategory = () => {
    navigate('/bantuan-medis');
  };

  const handleGeneralCategory = () => {
    // Navigate to bantuan lainnya category selection
    navigate('/bantuan-lainnya');
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
    </div>
  );
};

export default SelectCategory;