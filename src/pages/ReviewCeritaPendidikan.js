import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/ReviewCerita.css';

const ReviewCeritaPendidikan = () => {
  const navigate = useNavigate();
  const [storyData, setStoryData] = useState({
    part1: '',
    part2: '',
    part3: '',
    part4: '',
    part5: '',
    part6: ''
  });

  useEffect(() => {
    setStoryData({
      part1: localStorage.getItem('ceritaPendidikan_part1') || '',
      part2: localStorage.getItem('ceritaPendidikan_part2') || '',
      part3: localStorage.getItem('ceritaPendidikan_part3') || '',
      part4: localStorage.getItem('ceritaPendidikan_part4') || '',
      part5: localStorage.getItem('ceritaPendidikan_part5') || '',
      part6: localStorage.getItem('ceritaPendidikan_part6') || ''
    });
  }, []);

  const handleEdit = () => {
    navigate('/tulis-cerita-pendidikan');
  };

  const handleBack = () => {
    navigate('/tulis-cerita-pendidikan-6');
  };

  const handleNext = () => {
    navigate('/ajakan-pendidikan');
  };

  const handleSaveAndContinueLater = () => {
    console.log('Story saved for later');
  };

  const steps = [
    { number: 1, label: 'Tujuan', active: false },
    { number: 2, label: 'Penerima', active: false },
    { number: 3, label: 'Target donasi', active: false },
    { number: 4, label: 'Judul', active: false },
    { number: 5, label: 'Cerita', active: true },
    { number: 6, label: 'Ajakan', active: false }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Bantuan Pendidikan</div>
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
          {!storyData.part1 && !storyData.part2 && !storyData.part3 && !storyData.part4 && !storyData.part5 && !storyData.part6 ? (
            <div className="empty-story-modern">
              <p className="modern-text" style={{textAlign: 'center', color: '#666'}}>
                Belum ada cerita yang ditulis. Silakan tulis cerita kampanye Anda terlebih dahulu.
              </p>
            </div>
          ) : (
            <div className="story-section-content">
              {storyData.part1 && (
                <div className="story-section-modern">
                  <h4 className="section-header-modern">Perkenalan Diri dan Hubungan dengan Penerima</h4>
                  <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part1}</p>
                </div>
              )}

              {storyData.part2 && (
                <div className="story-section-modern">
                  <h4 className="section-header-modern">Kondisi Siswa/Penerima Bantuan Saat Ini</h4>
                  <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part2}</p>
                </div>
              )}

              {storyData.part3 && (
                <div className="story-section-modern">
                  <h4 className="section-header-modern">Upaya yang Sudah Dilakukan Sebelumnya</h4>
                  <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part3}</p>
                </div>
              )}

              {storyData.part4 && (
                <div className="story-section-modern">
                  <h4 className="section-header-modern">Dampak Jika Tidak Mendapat Bantuan</h4>
                  <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part4}</p>
                </div>
              )}

              {storyData.part5 && (
                <div className="story-section-modern">
                  <h4 className="section-header-modern">Rencana Penggunaan Dana Secara Detail</h4>
                  <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part5}</p>
                </div>
              )}

              {storyData.part6 && (
                <div className="story-section-modern">
                  <h4 className="section-header-modern">Harapan dan Doa untuk Masa Depan</h4>
                  <p className="modern-text" style={{whiteSpace: 'pre-wrap'}}>{storyData.part6}</p>
                </div>
              )}
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
      </div></div>
  );
};

export default ReviewCeritaPendidikan;