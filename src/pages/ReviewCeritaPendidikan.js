import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/ReviewCerita.css';

const ReviewCeritaPendidikan = () => {
  const navigate = useNavigate();

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
          <div className="story-section-content">
            <p className="modern-text">Halo, nama saya Ibu Sri Rahayu dan saya adalah kepala sekolah di SDN 01 Sukamaju, sebuah sekolah dasar yang terletak di daerah pelosok Kabupaten Garut, Jawa Barat. Kami melayani 120 siswa dari keluarga petani dengan kondisi ekonomi yang sangat terbatas.</p>
            <p className="modern-text">Saat ini, kondisi siswa-siswa di sekolah kami sangat memprihatinkan. Dari 120 siswa, 40% berasal dari keluarga dengan penghasilan di bawah garis kemiskinan. Banyak siswa datang tanpa sarapan dan fasilitas sekolah sangat terbatas.</p>
            
            <img src="/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp" alt="Siswa sekolah di daerah terpencil" className="story-image-modern" />
            
            <p className="modern-text">Kami telah melakukan berbagai upaya dengan keterbatasan yang ada, seperti mengajukan proposal ke Dinas Pendidikan dan menggalang dana mandiri melalui gotong royong masyarakat desa. Namun bantuan yang diperoleh masih sangat terbatas.</p>
            
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginTop: '20px', marginBottom: '12px'}}>Target dan Sasaran:</p>
            <p className="modern-text">Program bantuan pendidikan ini akan membantu 30 siswa kurang mampu untuk mendapatkan beasiswa penuh, perbaikan fasilitas sekolah, dan program pendampingan belajar yang komprehensif.</p>
            
            <img src="/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp" alt="Kegiatan belajar siswa" className="story-image-modern" />
            
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginTop: '20px', marginBottom: '12px'}}>Rencana Penggunaan Dana:</p>
            <p className="modern-text">Dana Rp 60.000.000 akan digunakan untuk beasiswa 30 siswa (Rp 35.000.000), perbaikan fasilitas sekolah (Rp 20.000.000), dan program pendampingan (Rp 5.000.000). Semua rincian telah disusun dengan detail untuk transparansi.</p>
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

export default ReviewCeritaPendidikan;