import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/ReviewCerita.css';

const ReviewCeritaSosial = () => {
  const navigate = useNavigate();

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
            <p className="modern-text">Halo, nama saya Ahmad dan saya adalah koordinator kegiatan sosial dari Komunitas Peduli Sesama. Kami adalah sekelompok relawan yang berkomitmen membantu masyarakat kurang mampu di daerah terpencil.</p>
            <p className="modern-text">Saat ini kami sedang mempersiapkan kegiatan bakti sosial untuk membantu korban banjir di Desa Sukamaju. Banjir yang terjadi minggu lalu telah merusak rumah-rumah warga dan menghanyutkan barang-barang berharga mereka. Banyak keluarga yang kehilangan tempat tinggal dan sumber mata pencaharian.</p>
            
            <img src="/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp" alt="Kegiatan sosial" className="story-image-modern" />
            
            <p className="modern-text">Kami berencana mengadakan kegiatan pembagian bantuan berupa sembako, pakaian layak pakai, dan kebutuhan sehari-hari lainnya. Selain itu, kami juga akan membantu membersihkan rumah-rumah yang terkena dampak banjir dan memberikan bantuan perbaikan darurat.</p>
            
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginTop: '20px', marginBottom: '12px'}}>Target dan Sasaran:</p>
            <p className="modern-text">Kegiatan ini akan membantu sekitar 50 keluarga terdampak banjir di Desa Sukamaju. Kami menargetkan dapat memberikan bantuan sembako untuk 1 bulan, pakaian layak pakai, serta perbaikan darurat untuk rumah-rumah yang rusak ringan.</p>
            
            <img src="/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp" alt="Bantuan kegiatan sosial" className="story-image-modern" />
            
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginTop: '20px', marginBottom: '12px'}}>Rencana Penggunaan Dana:</p>
            <p className="modern-text">Dana yang terkumpul akan digunakan untuk pembelian 200 paket sembako (@ Rp 75.000), pembelian material perbaikan rumah, biaya transportasi relawan, dan kebutuhan operasional kegiatan. Total kebutuhan dana Rp 25.000.000.</p>
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