import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaPendidikan = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaPendidikan_part1') || '';
  });

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      localStorage.setItem('ceritaPendidikan_part1', storyContent);
      navigate('/tulis-cerita-pendidikan-2');
    }
  };

  const handleBack = () => {
    navigate('/cerita-kampanye-pendidikan');
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
    const exampleText = "Halo, nama saya Ibu Sri Rahayu dan saya adalah kepala sekolah di SDN 01 Sukamaju, sebuah sekolah dasar yang terletak di daerah pelosok Kabupaten Garut, Jawa Barat. Kami adalah sekolah kecil yang melayani 120 siswa dari keluarga petani dan buruh tani yang kondisi ekonominya sangat terbatas.\n\nSekolah kami telah berdiri sejak tahun 1985 dan menjadi satu-satunya sekolah dasar di desa ini. Sebagian besar siswa harus berjalan kaki sejauh 3-5 kilometer untuk sampai ke sekolah karena tidak ada transportasi umum yang menjangkau daerah kami.\n\nSebagai pendidik, saya sangat prihatin melihat banyak anak-anak cerdas di desa ini yang terancam putus sekolah karena keterbatasan ekonomi keluarga. Banyak orang tua yang terpaksa memprioritaskan kebutuhan makan sehari-hari daripada biaya pendidikan anak-anak mereka.";
    setStoryContent(exampleText);
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
          <span className="modern-text small">Bagian 1 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '17%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Perkenalkan diri Anda dan institusi pendidikan</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Ceritakan siapa Anda, sekolah atau institusi pendidikan yang Anda wakili, dan latar belakang kepedulian Anda terhadap program bantuan pendidikan ini."
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
          />
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="story-actions-modern">
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

export default TulisCeritaPendidikan;