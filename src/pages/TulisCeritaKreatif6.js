import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TulisCerita.css';

const TulisCeritaKreatif6 = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState('');

  const handleNext = () => {
    if (storyContent.trim().length > 0) {
      navigate('/review-cerita-kreatif');
    }
  };

  const handleBack = () => {
    navigate('/tulis-cerita-kreatif-5');
  };

  const handleClose = () => {
    if (window.confirm('Apakah kamu yakin ingin keluar? Cerita yang sudah ditulis akan hilang.')) {
      navigate('/cerita-kampanye-kreatif');
    }
  };

  const handleSave = () => {
    alert('Cerita telah disimpan!');
  };

  const showExample = () => {
    const exampleText = "Harapan terbesar saya adalah dapat mewujudkan studio kreatif yang tidak hanya menjadi tempat kerja, tetapi juga menjadi pusat pengembangan kreativitas dan inovasi di bidang desain grafis. Saya bermimpi bahwa studio ini akan menjadi jembatan yang menghubungkan dunia desain profesional dengan UMKM yang membutuhkan.\n\nVisi jangka panjang saya adalah menjadikan studio ini sebagai inkubator bagi desainer muda Indonesia. Saya ingin menciptakan lapangan kerja dan memberikan kesempatan kepada fresh graduate untuk mengembangkan karir mereka di industri kreatif. Selain itu, saya juga berharap dapat berkontribusi dalam mengangkat citra produk-produk lokal melalui desain yang berkualitas internasional.\n\nSaya yakin bahwa dengan dukungan dari para donatur, mimpi ini dapat terwujud. Setiap kontribusi yang diberikan tidak hanya membantu saya secara personal, tetapi juga akan memberikan dampak positif bagi ekosistem kreatif dan ekonomi lokal.\n\nTerima kasih kepada semua pihak yang telah memberikan dukungan, baik dalam bentuk doa maupun donasi. Saya berkomitmen untuk menjadikan studio ini sebagai wadah yang bermanfaat dan berkelanjutan untuk kemajuan industri kreatif Indonesia.";
    setStoryContent(exampleText);
  };

  const handleWriteWithoutGuide = () => {
    navigate('/tulis-cerita-bebas-kreatif');
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
          <h2 className="modern-subheading">Doa, harapan, dan komitmen Anda untuk proyek ini</h2>
        </div>

        <div className="modern-card">
          <button className="modern-btn secondary example-btn-small" onClick={showExample} style={{marginBottom: '20px'}}>
            📄 Lihat contoh
          </button>
          
          <textarea
            className="modern-textarea story-textarea-large"
            placeholder="Sampaikan harapan dan komitmen Anda untuk mewujudkan proyek ini. Ungkapkan juga apresiasi kepada para calon donatur yang akan mendukung Anda."
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

export default TulisCeritaKreatif6;