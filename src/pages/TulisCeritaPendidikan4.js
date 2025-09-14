import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaPendidikan4 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState('');

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      navigate('/tulis-cerita-pendidikan-5');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-pendidikan-3');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye-pendidikan');
    }
  };

  const handleSave = () => {
    alert('Cerita telah disimpan!');
  };

  const showExample = () => {
    const exampleText = "Jika kondisi ini terus berlanjut tanpa ada bantuan yang memadai, dampaknya akan sangat serius bagi masa depan anak-anak di desa kami. Tingkat putus sekolah yang sudah tinggi diprediksi akan terus meningkat, dan banyak anak cerdas akan kehilangan kesempatan untuk mengembangkan potensi mereka.\n\nDari segi ekonomi, keluarga-keluarga di desa kami semakin terbebani dengan biaya pendidikan yang terus meningkat, sementara penghasilan mereka sebagai petani sangat tergantung pada hasil panen yang tidak menentu. Banyak orang tua yang terpaksa berhutang untuk membiayai sekolah anak-anak mereka, yang justru menambah beban ekonomi keluarga.\n\nDampak jangka panjangnya adalah terciptanya lingkaran kemiskinan yang sulit diputus. Anak-anak yang tidak mendapat pendidikan yang layak akan sulit mendapatkan pekerjaan yang baik di masa depan, sehingga mereka akan tetap hidup dalam kemiskinan seperti orang tua mereka. Hal ini akan berdampak pada kemajuan desa secara keseluruhan.\n\nSelain itu, kesenjangan pendidikan antara anak-anak di desa dengan anak-anak di kota akan semakin melebar, membuat mereka sulit bersaing di era globalisasi ini.";
    setStoryContent(exampleText);
  };

  const handleWriteWithoutGuide = () => {
    navigate('/tulis-cerita-bebas-pendidikan');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header white">
        <button className="close-btn" onClick={handleClose}>
          ✕
        </button>
        <button className="save-btn" onClick={handleSave}>
          Simpan cerita
        </button>
      </header>

      {/* Progress Section */}
      <div className="story-progress-section">
        <div className="story-progress-info">
          <span className="modern-text">Pembuatan Cerita</span>
          <span className="modern-text small">Bagian 4 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '67%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Jelaskan dampak jika tidak mendapat bantuan</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Ceritakan dampak yang akan terjadi pada siswa dan masyarakat jika program bantuan pendidikan ini tidak terlaksana."
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
          />
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="story-actions-modern">
        <button className="write-without-guide-modern" onClick={handleWriteWithoutGuide}>
          Saya ingin menulis cerita sendiri tanpa panduan
        </button>
        
        <div className="bottom-nav-modern">
          <button className="modern-btn secondary" onClick={handleBack}>
            ← Sebelumnya
          </button>
          
          <button 
            className={`modern-btn ${storyContent.trim().length === 0 ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={storyContent.trim().length === 0}
            style={{opacity: storyContent.trim().length === 0 ? 0.5 : 1}}
          >
            Selanjutnya →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TulisCeritaPendidikan4;