import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaPendidikan2 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaPendidikan_part2') || '';
  });

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      localStorage.setItem('ceritaPendidikan_part2', storyContent);
      navigate('/tulis-cerita-pendidikan-3');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-pendidikan');
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
    const exampleText = "Saat ini, kondisi siswa-siswa di sekolah kami sangat memprihatinkan dari segi ekonomi dan akses pendidikan. Dari 120 siswa yang terdaftar, sekitar 40% dari mereka berasal dari keluarga dengan penghasilan di bawah garis kemiskinan. Banyak siswa yang datang ke sekolah tanpa sarapan dan hanya membawa bekal seadanya.\n\nFasilitas sekolah kami juga sangat terbatas. Kami kekurangan buku pelajaran yang memadai, dengan ratio 1 buku untuk 3-4 siswa. Perpustakaan sekolah hanya memiliki 200 buku yang sebagian besar sudah rusak dan ketinggalan zaman. Laboratorium komputer tidak ada, sehingga siswa tidak mendapat pengenalan teknologi yang sangat penting di era digital ini.\n\nYang paling mengkhawatirkan adalah tingkat putus sekolah yang terus meningkat. Tahun lalu, 15 siswa terpaksa berhenti sekolah karena orang tua mereka tidak mampu membiayai kebutuhan sekolah seperti seragam, sepatu, tas, dan alat tulis. Beberapa anak bahkan harus membantu orang tua bekerja di sawah untuk memenuhi kebutuhan sehari-hari keluarga.";
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
          <span className="modern-text small">Bagian 2 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '33%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Jelaskan kondisi siswa/penerima bantuan saat ini</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Ceritakan kondisi terkini siswa atau penerima bantuan pendidikan, tantangan yang mereka hadapi, dan situasi yang membuat mereka membutuhkan bantuan."
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

export default TulisCeritaPendidikan2;