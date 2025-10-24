import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaPendidikan3 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaPendidikan_part3') || '';
  });

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      localStorage.setItem('ceritaPendidikan_part3', storyContent);
      navigate('/tulis-cerita-pendidikan-4');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-pendidikan-2');
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
    const exampleText = "Dalam upaya mengatasi permasalahan ini, pihak sekolah dan komite sekolah telah melakukan berbagai usaha dengan keterbatasan yang ada. Kami telah mengajukan proposal bantuan ke Dinas Pendidikan setempat dan berhasil mendapatkan bantuan berupa 50 buah buku pelajaran baru tahun lalu.\n\nKami juga menggalang dana mandiri melalui kerja sama dengan masyarakat desa. Para orang tua siswa bergotong-royong mengumpulkan dana untuk perbaikan atap sekolah yang bocor dan pengadaan meja belajar sederhana. Hasilnya, kami berhasil memperbaiki 2 ruang kelas dan membeli 20 set meja-kursi bekas dengan kondisi layak pakai.\n\nSelain itu, saya dan beberapa guru senior memberikan les gratis setiap sore untuk siswa-siswa yang tertinggal dalam pelajaran. Kami juga menjalin kerja sama dengan mahasiswa KKN dari universitas terdekat untuk membantu kegiatan belajar mengajar, terutama dalam bidang bahasa Inggris dan komputer dasar.\n\nNamun, semua upaya yang telah kami lakukan masih belum cukup untuk mengatasi permasalahan mendasar seperti biaya sekolah, seragam, dan alat tulis untuk siswa-siswa dari keluarga kurang mampu.";
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
          <span className="modern-text small">Bagian 3 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '50%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Ceritakan upaya yang sudah dilakukan sebelumnya</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Jelaskan upaya dan bantuan apa saja yang sudah pernah dilakukan untuk mengatasi masalah pendidikan ini, baik oleh sekolah, pemerintah, atau pihak lain."
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

export default TulisCeritaPendidikan3;