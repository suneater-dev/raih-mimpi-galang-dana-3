import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/ReviewCerita.css';

const ReviewCerita = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/tulis-cerita');
  };

  const handleBack = () => {
    navigate('/tulis-cerita-6');
  };

  const handleNext = () => {
    // Navigate to next step in fundraising process
    navigate('/ajakan-donasi'); // Placeholder route
  };

  const handleSaveAndContinueLater = () => {
    // Save functionality without popup
    console.log('Story saved for later');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Bantuan Medis & Kesehatan</div>
      </header>

      {/* Progress Steps */}
      <ProgressSteps currentStep={7} />

      {/* Story Section */}
      <div className="modern-card" style={{margin: '20px'}}>
        <div className="story-header-modern">
          <h3 className="modern-subheading">Cerita galang dana ini</h3>
          <button className="modern-btn secondary small" onClick={handleEdit} style={{padding: '8px 16px', fontSize: '14px'}}>
            ✏️ Ubah Cerita
          </button>
        </div>

        <div className="story-content-modern">
          {/* Section 1: About You and Patient */}
          <div className="story-section-content">
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Tentang Kami dan Pasien:</p>
            <p className="modern-text">Halo, nama saya Sarah dan saya adalah kakak dari Andi yang berusia 8 tahun. Andi adalah adik kesayangan saya yang sangat ceria dan pintar. Sejak kecil, Andi selalu menjadi anak yang aktif dan suka bermain bersama teman-temannya.</p>
            <p className="modern-text">Namun, beberapa bulan yang lalu, kami mendapat kabar yang sangat mengejutkan dari dokter bahwa Andi didiagnosis menderita leukemia. Sebagai keluarga, kami sangat terpukul mendengar kabar ini, tetapi kami berkomitmen untuk memberikan yang terbaik bagi kesembuhan Andi.</p>
          </div>
          
          {/* Section 2: Patient's Disease and Current Condition */}
          <div className="story-section-content">
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Kondisi Penyakit Pasien:</p>
            <p className="modern-text">Andi didiagnosis menderita leukemia limfoblastik akut (ALL) pada bulan Maret 2024. Sejak diagnosis ini, kondisinya sangat mengkhawatirkan. Andi yang dulu sangat aktif dan ceria sekarang terlihat pucat dan lemah.</p>
            <p className="modern-text">Gejala yang dialami Andi sangat beragam. Ia sering mengalami demam tinggi yang tidak kunjung turun, mudah memar meski hanya terbentur ringan, dan nafsu makannya menurun drastis. Berat badannya turun dari 25 kg menjadi 20 kg dalam waktu 2 bulan.</p>
            
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px', marginTop: '20px'}}>Upaya Pengobatan:</p>
            <p className="modern-text">Sejak diagnosis di bulan Maret, Andi sudah menjalani berbagai upaya pengobatan. Pertama, ia menjalani biopsi sumsum tulang untuk memastikan jenis leukemia yang dideritanya. Andi telah menjalani 3 siklus kemoterapi di RSUP Dr. Sardjito Yogyakarta. Setiap siklus kemoterapi membutuhkan rawat inap selama 1-2 minggu.</p>
          </div>
          
          {/* Section 3: Family and Living Environment */}
          <div className="story-section-content">
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Keadaan Keluarga:</p>
            <p className="modern-text">Keluarga kami adalah keluarga sederhana yang tinggal di perumahan kecil di Yogyakarta. Ayah bekerja sebagai tukang las dengan penghasilan tidak menentu, sedangkan ibu adalah ibu rumah tangga yang sesekali menerima jahitan dari tetangga.</p>
            <p className="modern-text">Sebelum Andi sakit, kehidupan kami cukup harmonis. Andi sangat aktif bermain dengan teman-teman di kompleks dan selalu menjadi anak yang ceria. Namun sejak didiagnosis leukemia, suasana rumah berubah menjadi sedih dan penuh kekhawatiran.</p>
            
            <img src="/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp" alt="Foto keluarga" className="story-image-modern" />
          </div>
          
          {/* Section 4: Impact of Patient's Condition */}
          <div className="story-section-content">
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Dampak Kondisi Pasien:</p>
            <p className="modern-text">Sejak Andi didiagnosis leukemia, banyak perubahan yang terjadi dalam kehidupan keluarga kami. Kondisi kesehatan Andi yang semakin menurun membuat kami sebagai keluarga harus lebih waspada dan memberikan perhatian ekstra kepadanya.</p>
            <p className="modern-text">Sebelumnya, Andi adalah anak yang sangat aktif dan ceria. Ia selalu bermain dengan teman-temannya di lingkungan rumah dan rajin bersekolah. Namun sekarang, aktivitas Andi sangat terbatas karena kondisi tubuhnya yang lemah dan mudah lelah.</p>
            <p className="modern-text">Dampak terbesar yang kami rasakan adalah dari segi finansial. Ayah harus sering izin atau bahkan cuti dari pekerjaan untuk menemani Andi berobat. Penghasilan keluarga menurun drastis, sementara biaya pengobatan terus bertambah setiap bulannya.</p>
            
            <img src="/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp" alt="Foto kondisi pasien" className="story-image-modern" />
          </div>
          
          {/* Section 5: Cost Planning and Funding Reasons */}
          <div className="story-section-content">
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Kebutuhan Dana:</p>
            <p className="modern-text">Untuk pengobatan Andi, kami membutuhkan dana sebesar Rp 150.000.000. Rincian biayanya adalah sebagai berikut:</p>
            <p className="modern-text">1. Biaya kemoterapi selama 6 bulan: Rp 80.000.000<br/>
            2. Biaya rawat inap: Rp 30.000.000<br/>
            3. Obat-obatan dan suplemen: Rp 25.000.000<br/>
            4. Biaya pemeriksaan rutin dan lab: Rp 15.000.000</p>
            
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px', marginTop: '20px'}}>Alasan Membutuhkan Dana:</p>
            <p className="modern-text">Ayah Andi bekerja sebagai buruh harian dengan penghasilan tidak menentu, sekitar Rp 2.500.000 per bulan. Ibu Andi adalah ibu rumah tangga. Dengan kondisi ekonomi keluarga yang terbatas, sangat sulit bagi kami untuk membiayai pengobatan yang membutuhkan dana besar ini.</p>
            <p className="modern-text">Sebelumnya, kami sudah menjual beberapa barang berharga dan meminjam dari kerabat, namun masih belum mencukupi. Kondisi Andi yang semakin memburuk membuat kami harus segera mendapatkan pengobatan intensif.</p>
          </div>
          
          {/* Section 6: Prayers, Hopes and Aspirations */}
          <div className="story-section-content">
            <p className="modern-text" style={{fontWeight: '600', fontSize: '16px', marginBottom: '12px'}}>Doa dan Harapan:</p>
            <p className="modern-text">Doa kami yang paling dalam adalah agar Andi dapat sembuh total dari penyakitnya dan kembali menjadi anak yang sehat dan ceria seperti sebelumnya. Kami berharap suatu hari nanti Andi bisa kembali bersekolah, bermain bersama teman-temannya, dan meraih cita-citanya menjadi dokter untuk membantu anak-anak lain yang sakit.</p>
            <p className="modern-text">Kami percaya bahwa dengan bantuan dari orang-orang baik seperti Anda, doa kami akan terkabul. Semoga Allah SWT memberikan kesembuhan dan kekuatan bagi Andi untuk melewati masa-masa sulit ini.</p>
            <p className="modern-text">Terima kasih atas dukungan dan doa dari semua pihak. Semoga kebaikan Anda dibalas berlipat ganda. Amin.</p>
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

export default ReviewCerita;