import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/ReviewCerita.css';

const ReviewCeritaSosial = () => {
  const navigate = useNavigate();
  const [storyData, setStoryData] = useState({
    part1: '',
    part2: '',
    part3: '',
    part4: '',
    part5: '',
    part6: '',
    photos: []
  });

  useEffect(() => {
    // Load story data from localStorage
    setStoryData({
      part1: localStorage.getItem('ceritaSosial_part1') || '',
      part2: localStorage.getItem('ceritaSosial_part2') || '',
      part3: localStorage.getItem('ceritaSosial_part3') || '',
      part4: localStorage.getItem('ceritaSosial_part4') || '',
      part5: localStorage.getItem('ceritaSosial_part5') || '',
      part6: localStorage.getItem('ceritaSosial_part6') || '',
      photos: JSON.parse(localStorage.getItem('ceritaSosial_photos') || '[]')
    });
  }, []);

  const handleEdit = () => {
    navigate('/tulis-cerita-sosial');
  };

  const handleBack = () => {
    navigate('/tulis-cerita-sosial-6');
  };

  const handleNext = () => {
    navigate('/ajakan-sosial');
  };

  const handleSaveAndContinueLater = () => {
    console.log('Story saved for later');
  };

  const steps = [
    { number: 1, label: 'Tujuan', active: false },
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
        <div className="header-title white-text">Kegiatan Sosial</div>
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
          {/* Story Content */}
          <div className="story-section-content">
            {/* Part 1: Perkenalan */}
            {storyData.part1 && (
              <>
                <h4 className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px', color: '#983ced'}}>Perkenalan Diri dan Komunitas</h4>
                <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part1}</p>
              </>
            )}

            {/* Part 2: Kondisi Penerima + Photos */}
            {storyData.part2 && (
              <>
                <h4 className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginTop: '24px', marginBottom: '12px', color: '#983ced'}}>Kondisi Penerima Bantuan Saat Ini</h4>
                <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part2}</p>

                {/* Display uploaded photos */}
                {storyData.photos && storyData.photos.length > 0 && (
                  <div style={{margin: '20px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px'}}>
                    {storyData.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Kondisi penerima bantuan ${index + 1}`}
                        className="story-image-modern"
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Part 3: Upaya Bantuan */}
            {storyData.part3 && (
              <>
                <h4 className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginTop: '24px', marginBottom: '12px', color: '#983ced'}}>Upaya Bantuan yang Sudah Dilakukan</h4>
                <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part3}</p>
              </>
            )}

            {/* Part 4: Dampak */}
            {storyData.part4 && (
              <>
                <h4 className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginTop: '24px', marginBottom: '12px', color: '#983ced'}}>Dampak Sosial dan Finansial</h4>
                <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part4}</p>
              </>
            )}

            {/* Part 5: Rencana Dana */}
            {storyData.part5 && (
              <>
                <h4 className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginTop: '24px', marginBottom: '12px', color: '#983ced'}}>Rencana Penggunaan Dana</h4>
                <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part5}</p>
              </>
            )}

            {/* Part 6: Harapan */}
            {storyData.part6 && (
              <>
                <h4 className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginTop: '24px', marginBottom: '12px', color: '#983ced'}}>Doa dan Harapan</h4>
                <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part6}</p>
              </>
            )}

            {/* Show message if no content */}
            {!storyData.part1 && !storyData.part2 && !storyData.part3 && !storyData.part4 && !storyData.part5 && !storyData.part6 && (
              <p className="modern-text" style={{textAlign: 'center', color: '#6B7280', padding: '40px 20px'}}>
                Belum ada cerita yang ditulis. Silakan klik "✏️ Ubah Cerita" untuk menulis cerita galang dana Anda.
              </p>
            )}
          </div>
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

export default ReviewCeritaSosial;