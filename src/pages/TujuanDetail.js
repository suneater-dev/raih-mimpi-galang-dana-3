import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/TujuanDetail.css';

const TujuanDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [beneficiaryCount, setBeneficiaryCount] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState({
    responsibility: false,
    accountability: false
  });

  // Get selected category from navigation state or default
  const selectedCategory = location.state?.selectedCategory || {
    title: 'Acara/gerakan/kegiatan/program',
    id: 'acara-kegiatan'
  };

  const handleBeneficiaryChange = (e) => {
    setBeneficiaryCount(e.target.value);
  };

  const handleTermsChange = (termType) => {
    setAcceptedTerms(prev => ({
      ...prev,
      [termType]: !prev[termType]
    }));
  };

  const handleBack = () => {
    navigate('/karya-kreatif');
  };

  const handleContinue = () => {
    const isFormValid = beneficiaryCount.trim() !== '' && 
                       acceptedTerms.responsibility && 
                       acceptedTerms.accountability;
    
    if (isFormValid) {
      // Navigate to next step (Data diri)
      navigate('/data-diri', {
        state: {
          selectedCategory,
          beneficiaryCount,
          acceptedTerms
        }
      });
    }
  };

  const handleSaveAndContinueLater = () => {
    // Save progress and navigate to dashboard or save state
    navigate('/dashboard');
  };

  const handleChangeCategory = () => {
    navigate('/karya-kreatif');
  };

  const isFormValid = beneficiaryCount.trim() !== '' && 
                     acceptedTerms.responsibility && 
                     acceptedTerms.accountability;

  const steps = [
    { number: 1, label: 'Tujuan', active: true },
    { number: 2, label: 'Data diri', active: false },
    { number: 3, label: 'Penerima', active: false },
    { number: 4, label: 'Target donasi', active: false },
    { number: 5, label: 'Judul', active: false },
    { number: 6, label: 'Cerita', active: false },
    { number: 7, label: 'Ajakan', active: false }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="logo white-text">Karya Kreatif & Modal Usaha</div>
        <div className="header-spacer"></div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Main Content */}
      <div className="main-content-modern">
        {/* Selected Category */}
        <div className="selected-category-section">
          <div className="selected-category-card">
            <div className="selected-category-content">
              <span className="selected-category-title">{selectedCategory.title}</span>
              <button className="change-category-btn" onClick={handleChangeCategory}>
                Ubah
              </button>
            </div>
          </div>
        </div>

        {/* Beneficiary Count Question */}
        <div className="question-section-modern">
          <h2 className="question-title-modern">Berapa jumlah penerima manfaat yang dituju?</h2>
          
          <div className="input-container-modern">
            <input
              type="number"
              className="modern-input beneficiary-input"
              placeholder="Masukkan jumlah penerima manfaat"
              value={beneficiaryCount}
              onChange={handleBeneficiaryChange}
              min="1"
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="terms-section-modern">
          <h3 className="terms-title-modern">Baca dan beri tanda syarat penggalangan di bawah ini</h3>
          
          <div className="terms-container">
            <div className="term-item-modern">
              <label className="checkbox-container-modern">
                <input
                  type="checkbox"
                  checked={acceptedTerms.responsibility}
                  onChange={() => handleTermsChange('responsibility')}
                />
                <span className="checkmark-modern"></span>
                <span className="term-text-modern">
                  Pemilik rekening bertanggung jawab atas penggunaan dana yang diterima dari galang dana ini.
                </span>
              </label>
            </div>

            <div className="term-item-modern">
              <label className="checkbox-container-modern">
                <input
                  type="checkbox"
                  checked={acceptedTerms.accountability}
                  onChange={() => handleTermsChange('accountability')}
                />
                <span className="checkmark-modern"></span>
                <span className="term-text-modern">
                  Kamu sebagai penggalang dana bertanggung jawab atas permintaan pencairan dan pelaporan penggunaan dana.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-modern">
        <div className="nav-buttons-container">
          <button className="nav-btn-secondary" onClick={handleBack}>
            Sebelumnya
          </button>
          <button 
            className={`nav-btn-primary ${!isFormValid ? 'disabled' : ''}`}
            onClick={handleContinue}
            disabled={!isFormValid}
          >
            Selanjutnya
          </button>
        </div>
        
        <button className="save-continue-later-btn" onClick={handleSaveAndContinueLater}>
          Simpan dan lanjutkan nanti
        </button>
      </div>
    </div>
  );
};

export default TujuanDetail;