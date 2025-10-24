import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaPendidikan6 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState(() => {
    return localStorage.getItem('ceritaPendidikan_part6') || '';
  });

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      localStorage.setItem('ceritaPendidikan_part6', storyContent);
      navigate('/review-cerita-pendidikan');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-pendidikan-5');
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
    const exampleText = "Kami berharap dan berdoa agar program bantuan pendidikan ini dapat berjalan dengan lancar dan memberikan dampak positif yang berkelanjutan bagi masa depan anak-anak di desa kami. Semoga dengan bantuan dari para donatur yang mulia hati, anak-anak ini dapat merasakan kebahagiaan belajar tanpa terbebani masalah ekonomi keluarga.\n\nHarapan terbesar kami adalah melihat senyuman ceria di wajah anak-anak ketika mereka dapat bersekolah dengan layak. Mereka berhak mendapatkan pendidikan yang berkualitas sama seperti anak-anak di kota. Dengan fasilitas yang lebih baik dan tanpa beban biaya, kami yakin prestasi akademik mereka akan meningkat pesat.\n\nKami bermimpi suatu hari nanti, anak-anak lulusan sekolah kami dapat melanjutkan pendidikan ke jenjang yang lebih tinggi, bahkan ada di antaranya yang bisa menjadi dokter, guru, atau profesi lain yang dapat membangun daerah ini menjadi lebih maju. Pendidikan adalah kunci untuk memutus rantai kemiskinan.\n\nTerima kasih kepada semua pihak yang telah memberikan dukungan dan kepercayaan. Semoga kebaikan yang diberikan mendapat balasan yang berlipat ganda dari Yang Maha Kuasa.";
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
          <span className="modern-text small">Bagian 6 dari 6</span>
        </div>
        <div className="modern-progress-bar">
          <div className="modern-progress-fill" style={{width: '100%'}}>
            <div className="modern-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="story-writing-container">
        <div className="story-step-header">
          <h2 className="modern-subheading">Harapan dan doa untuk masa depan</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Sampaikan harapan, doa, dan aspirasi Anda untuk keberhasilan program bantuan pendidikan ini serta dampak positif yang diinginkan untuk masa depan anak-anak."
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

export default TulisCeritaPendidikan6;