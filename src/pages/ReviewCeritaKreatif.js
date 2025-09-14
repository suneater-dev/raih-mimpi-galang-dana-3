import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/ReviewCerita.css';

const ReviewCeritaKreatif = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/tulis-cerita-kreatif');
  };

  const handleBack = () => {
    navigate('/tulis-cerita-kreatif-6');
  };

  const handleNext = () => {
    navigate('/ajakan-kreatif');
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
        <div className="header-title white-text">Karya Kreatif & Modal Usaha</div>
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
          {/* Section 1: About You and Project */}
          <div className="story-section-content">
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Tentang Kami dan Proyek:</p>
            <p className="modern-text">Halo, nama saya Andi dan saya adalah seorang lulusan desain grafis yang baru menyelesaikan kuliah tahun ini. Sejak kecil, saya memiliki passion yang besar dalam dunia desain dan seni visual. Impian saya adalah membuka studio kreatif yang dapat membantu UMKM dan startup lokal mengembangkan branding mereka dengan desain yang menarik dan profesional.</p>
            <p className="modern-text">Saya telah berpengalaman mengerjakan berbagai proyek freelance selama kuliah, mulai dari desain logo, kemasan produk, hingga kampanye visual untuk media sosial. Melalui pengalaman ini, saya melihat betapa banyak UMKM yang memiliki produk berkualitas namun kesulitan dalam hal branding dan pemasaran visual.</p>
          </div>
          
          {/* Section 2: Project Details */}
          <div className="story-section-content">
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Detail Proyek:</p>
            <p className="modern-text">Proyek studio kreatif ini akan menawarkan layanan desain grafis terpadu untuk UMKM dan startup lokal. Kami akan menyediakan jasa pembuatan logo, identitas visual, kemasan produk, desain website, dan kampanye media sosial yang profesional namun terjangkau.</p>
            <p className="modern-text">Target utama kami adalah UMKM yang memiliki produk berkualitas namun kesulitan dalam hal branding dan pemasaran visual. Studio ini akan berlokasi di kawasan kreatif Bandung dan akan dilengkapi dengan peralatan desain modern.</p>
            
            <img src="/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp" alt="Rencana studio kreatif" className="story-image-modern" />
          </div>
          
          {/* Section 3: Experience and Skills */}
          <div className="story-section-content">
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Pengalaman dan Keahlian:</p>
            <p className="modern-text">Sebagai lulusan desain grafis dengan IPK 3.7 dari Universitas Padjadjaran, saya telah mengembangkan keahlian dalam berbagai software desain seperti Adobe Creative Suite, Figma, dan Sketch. Selama kuliah, saya aktif mengikuti berbagai kompetisi desain dan berhasil meraih juara 2 dalam Lomba Desain Logo Kota Bandung 2023.</p>
            <p className="modern-text">Pengalaman freelance saya dimulai sejak semester 4, dimana saya telah menangani lebih dari 30 proyek dari berbagai klien, mulai dari UMKM kuliner, fashion, hingga startup teknologi.</p>
          </div>
          
          {/* Section 4: Impact and Benefits */}
          <div className="story-section-content">
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Dampak Positif:</p>
            <p className="modern-text">Studio kreatif yang akan saya bangun akan memberikan solusi dengan menyediakan layanan desain profesional dengan harga yang terjangkau untuk UMKM. Kami akan membantu mereka meningkatkan nilai jual produk melalui kemasan dan branding yang menarik.</p>
            <p className="modern-text">Dampak positif yang diharapkan adalah meningkatnya daya saing UMKM lokal, terciptanya lapangan kerja baru untuk desainer muda, dan berkembangnya ekosistem kreatif di kota Bandung.</p>
            
            <img src="/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp" alt="Dampak positif proyek" className="story-image-modern" />
          </div>
          
          {/* Section 5: Funding Plan */}
          <div className="story-section-content">
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Rencana Penggunaan Dana:</p>
            <p className="modern-text">Untuk mewujudkan studio kreatif ini, saya membutuhkan dana sebesar Rp 150.000.000 dengan rincian sebagai berikut:</p>
            <p className="modern-text">1. Sewa tempat dan renovasi ruangan (24 bulan): Rp 60.000.000<br/>
            2. Peralatan desain dan teknologi: Rp 60.000.000<br/>
            3. Marketing dan promosi awal: Rp 8.000.000<br/>
            4. Modal kerja operasional 6 bulan: Rp 22.000.000</p>
          </div>
          
          {/* Section 6: Hopes and Commitment */}
          <div className="story-section-content">
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Harapan dan Komitmen:</p>
            <p className="modern-text">Harapan terbesar saya adalah dapat mewujudkan studio kreatif yang tidak hanya menjadi tempat kerja, tetapi juga menjadi pusat pengembangan kreativitas dan inovasi di bidang desain grafis. Saya bermimpi bahwa studio ini akan menjadi jembatan yang menghubungkan dunia desain profesional dengan UMKM yang membutuhkan.</p>
            <p className="modern-text">Terima kasih kepada semua pihak yang telah memberikan dukungan, baik dalam bentuk doa maupun donasi. Saya berkomitmen untuk menjadikan studio ini sebagai wadah yang bermanfaat dan berkelanjutan untuk kemajuan industri kreatif Indonesia.</p>
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

export default ReviewCeritaKreatif;