import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/ReviewCerita.css';

const ReviewCerita = () => {
  const navigate = useNavigate();
  const [storyData, setStoryData] = useState({
    part1: '',
    part2_section1: '',
    part2_section2: '',
    part3: '',
    part3_photo: '',
    part4: '',
    part4_photo: '',
    part5_section1: '',
    part5_section2: '',
    part6: ''
  });

  useEffect(() => {
    // Load all story parts from localStorage
    setStoryData({
      part1: localStorage.getItem('cerita_part1') || '',
      part2_section1: localStorage.getItem('cerita_part2_section1') || '',
      part2_section2: localStorage.getItem('cerita_part2_section2') || '',
      part3: localStorage.getItem('cerita_part3') || '',
      part3_photo: localStorage.getItem('cerita_part3_photo') || '',
      part4: localStorage.getItem('cerita_part4') || '',
      part4_photo: localStorage.getItem('cerita_part4_photo') || '',
      part5_section1: localStorage.getItem('cerita_part5_section1') || '',
      part5_section2: localStorage.getItem('cerita_part5_section2') || '',
      part6: localStorage.getItem('cerita_part6') || ''
    });
  }, []);

  const handleEdit = () => {
    navigate('/tulis-cerita');
  };

  const handleBack = () => {
    navigate('/tulis-cerita-6');
  };

  const handleNext = () => {
    // Navigate to next step in fundraising process
    navigate('/ajakan-donasi'); // Placeholder route
  };

  const handleSaveAndContinueLater = () => {
    // Save functionality without popup
    console.log('Story saved for later');
  };

  const steps = [
    { number: 1, label: 'Pasien', active: false },
    { number: 2, label: 'Data diri', active: false },
    { number: 3, label: 'Penerima', active: false },
    { number: 4, label: 'Target donasi', active: false },
    { number: 5, label: 'Judul', active: false },
    { number: 6, label: 'Cerita', active: true },
    { number: 7, label: 'Ajakan', active: false }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Bantuan Medis & Kesehatan</div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Story Section */}
      <div className="modern-card" style={{margin: '20px'}}>
        <div className="story-header-modern">
          <h3 className="modern-subheading">Cerita galang dana ini</h3>
          <button className="modern-btn secondary small" onClick={handleEdit} style={{padding: '8px 16px', fontSize: '14px'}}>
            ✏️ Ubah Cerita
          </button>
        </div>

        <div className="story-content-modern">
          {/* Section 1: About You and Patient */}
          {storyData.part1 && (
            <div className="story-section-content">
              <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Tentang Kami dan Pasien:</p>
              <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part1}</p>
            </div>
          )}

          {/* Section 2: Patient's Disease and Current Condition */}
          {(storyData.part2_section1 || storyData.part2_section2) && (
            <div className="story-section-content">
              {storyData.part2_section1 && (
                <>
                  <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Kondisi Penyakit Pasien:</p>
                  <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part2_section1}</p>
                </>
              )}

              {storyData.part2_section2 && (
                <>
                  <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px', marginTop: '20px'}}>Upaya Pengobatan:</p>
                  <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part2_section2}</p>
                </>
              )}
            </div>
          )}

          {/* Section 3: Family and Living Environment */}
          {storyData.part3 && (
            <div className="story-section-content">
              <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Keadaan Keluarga:</p>
              <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part3}</p>

              {storyData.part3_photo && (
                <img src={storyData.part3_photo} alt="Foto keluarga" className="story-image-modern" style={{marginTop: '16px'}} />
              )}
            </div>
          )}

          {/* Section 4: Impact of Patient's Condition */}
          {storyData.part4 && (
            <div className="story-section-content">
              <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Dampak Kondisi Pasien:</p>
              <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part4}</p>

              {storyData.part4_photo && (
                <img src={storyData.part4_photo} alt="Foto kondisi pasien" className="story-image-modern" style={{marginTop: '16px'}} />
              )}
            </div>
          )}

          {/* Section 5: Cost Planning and Funding Reasons */}
          {(storyData.part5_section1 || storyData.part5_section2) && (
            <div className="story-section-content">
              {storyData.part5_section1 && (
                <>
                  <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Kebutuhan Dana:</p>
                  <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part5_section1}</p>
                </>
              )}

              {storyData.part5_section2 && (
                <>
                  <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px', marginTop: '20px'}}>Alasan Membutuhkan Dana:</p>
                  <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part5_section2}</p>
                </>
              )}
            </div>
          )}

          {/* Section 6: Prayers, Hopes and Aspirations */}
          {storyData.part6 && (
            <div className="story-section-content">
              <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Doa dan Harapan:</p>
              <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part6}</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-modern">
        <button className="modern-btn secondary" onClick={handleBack}>
          ← Sebelumnya
        </button>
        
        <button className="modern-btn" onClick={handleNext}>
          Selanjutnya →
        </button>
      </div>
      
      <div className="save-later-modern">
        <button className="save-later-btn-modern" onClick={handleSaveAndContinueLater}>
          Simpan dan lanjutkan nanti
        </button>
      </div>
    </div>
  );
};

export default ReviewCerita;