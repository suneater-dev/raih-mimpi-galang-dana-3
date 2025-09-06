import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCerita2 = () => {
  const navigate = useNavigate();
  const [section1Content, setSection1Content] = useState('');
  const [section2Content, setSection2Content] = useState('');

  const handleNext = () => {
    if (section1Content.trim().length > 0 || section2Content.trim().length > 0) {
      navigate('/tulis-cerita-3');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye');
    }
  };

  const handleSave = () => {
    alert('Cerita telah disimpan!');
  };

  const showExample1 = () => {
    const exampleText = "Andi didiagnosis menderita leukemia limfoblastik akut (ALL) pada bulan Maret 2024. Sejak diagnosis ini, kondisinya sangat mengkhawatirkan. Andi yang dulu sangat aktif dan ceria sekarang terlihat pucat dan lemah.\n\nGejala yang dialami Andi sangat beragam. Ia sering mengalami demam tinggi yang tidak kunjung turun, mudah memar meski hanya terbentur ringan, dan nafsu makannya menurun drastis. Berat badannya turun dari 25 kg menjadi 20 kg dalam waktu 2 bulan.\n\nSebagai kakak, saya sangat sedih melihat Andi yang dulu suka berlari-larian sekarang lebih banyak berbaring lemah di tempat tidur. Ia sering mengeluh pusing dan mual, terutama setelah menjalani kemoterapi.";
    setSection1Content(exampleText);
  };

  const showExample2 = () => {
    const exampleText = "Sejak diagnosis di bulan Maret, Andi sudah menjalani berbagai upaya pengobatan. Pertama, ia menjalani biopsi sumsum tulang untuk memastikan jenis leukemia yang dideritanya.\n\nAndi telah menjalani 3 siklus kemoterapi di RSUP Dr. Sardjito Yogyakarta. Setiap siklus kemoterapi membutuhkan rawat inap selama 1-2 minggu. Selain kemoterapi, Andi juga rutin mendapat transfusi darah dan trombosit karena kadar dalam tubuhnya yang rendah.\n\nDokter juga memberikan obat-obatan pendukung untuk mengatasi efek samping kemoterapi seperti mual dan muntah. Keluarga kami juga berusaha memberikan nutrisi terbaik dan suplemen untuk menjaga daya tahan tubuh Andi.";
    setSection2Content(exampleText);
  };

  const handleWriteWithoutGuide = () => {
    navigate('/tulis-cerita-bebas');
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
          <h2 className="modern-subheading">Kondisi saat ini dan upaya pengobatan</h2>
        </div>
        <div className="modern-card">
          {/* Section 1 */}
          <div className="story-section-modern">
            <h3 className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Jelaskan tentang penyakit pasien dan kondisinya dari awal pasien menderita sakit hingga kondisi terkini!</h3>
            
            <button className="modern-btn secondary example-btn-small" onClick={showExample1} style={{marginBottom: '16px'}}>
              📄 Lihat contoh
            </button>
            
            <textarea
              className="modern-textarea story-textarea-medium"
              placeholder="Ceritakan tentang penyakit yang diderita pasien, gejala yang dialami, dan bagaimana kondisinya saat ini."
              value={section1Content}
              onChange={(e) => setSection1Content(e.target.value)}
            />
          </div>

          {/* Section 2 */}
          <div className="story-section-modern">
            <h3 className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Upaya pengobatan apa saja yang telah dilakukan sejak awal hingga kini?</h3>
            
            <button className="modern-btn secondary example-btn-small" onClick={showExample2} style={{marginBottom: '16px'}}>
              📄 Lihat contoh
            </button>
            
            <textarea
              className="modern-textarea story-textarea-medium"
              placeholder="Jelaskan upaya pengobatan yang sudah dilakukan, rumah sakit yang pernah dikunjungi, dan treatment yang sudah dijalani."
              value={section2Content}
              onChange={(e) => setSection2Content(e.target.value)}
            />
          </div>
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
            className={`modern-btn ${(section1Content.trim().length === 0 && section2Content.trim().length === 0) ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={section1Content.trim().length === 0 && section2Content.trim().length === 0}
            style={{opacity: (section1Content.trim().length === 0 && section2Content.trim().length === 0) ? 0.5 : 1}}
          >
            Selanjutnya →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TulisCerita2;