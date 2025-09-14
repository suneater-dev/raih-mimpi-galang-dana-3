import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaPendidikan5 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState('');

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      navigate('/tulis-cerita-pendidikan-6');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-pendidikan-4');
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
    const exampleText = "Untuk mengatasi permasalahan ini secara komprehensif, kami membutuhkan dana sebesar Rp 60.000.000. Rencana penggunaan dana tersebut telah kami susun dengan detail sebagai berikut:\n\n1. Beasiswa pendidikan untuk 30 siswa kurang mampu (Rp 35.000.000):\n   - Biaya SPP bulanan @ Rp 50.000 x 12 bulan x 30 siswa = Rp 18.000.000\n   - Seragam sekolah lengkap @ Rp 300.000 x 30 siswa = Rp 9.000.000\n   - Alat tulis dan buku pelajaran @ Rp 200.000 x 30 siswa = Rp 6.000.000\n   - Tas dan sepatu sekolah @ Rp 150.000 x 30 siswa = Rp 4.500.000\n\n2. Perbaikan fasilitas sekolah (Rp 20.000.000):\n   - Pengadaan buku perpustakaan baru = Rp 10.000.000\n   - Perbaikan dan penambahan meja kursi belajar = Rp 7.000.000\n   - Pengadaan alat peraga pendidikan = Rp 3.000.000\n\n3. Program pendampingan dan pelatihan (Rp 5.000.000):\n   - Pelatihan guru dalam metode pembelajaran modern = Rp 3.000.000\n   - Program bimbingan belajar intensif = Rp 2.000.000\n\nDengan bantuan ini, kami yakin dapat memberikan kesempatan pendidikan yang layak bagi anak-anak desa dan memutus rantai kemiskinan melalui pendidikan.";
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
          <span className="modern-text small">Bagian 5 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '83%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Rencana penggunaan dana secara detail</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Jelaskan secara detail bagaimana dana yang terkumpul akan digunakan untuk program bantuan pendidikan, termasuk rincian biaya dan alasan mengapa bantuan dari masyarakat sangat dibutuhkan."
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

export default TulisCeritaPendidikan5;