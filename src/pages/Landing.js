import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "Apakah RaihMimpi memberikan bantuan dana langsung?",
      answer: (
        <>
          <p><strong>Tidak.</strong></p>
          <br />
          <p>Raih Mimpi.id hanya menyediakan sarana untuk menggalang dana secara online melalui sebuah halaman campaign.</p>
          <br />
          <p>Keberhasilan menggalang dana di Raih Mimpi bergantung pada beragam faktor seperti kualitas konten, luas jaringan, dan upaya dari campaigner (pihak yang menggalang dana).</p>
        </>
      )
    },
    {
      question: "Apakah galang dana di Raih Mimpi gratis?",
      answer: (
        <>
          <p><strong>Perlu diketahui bahwa:</strong></p>
          <br />
          <p>• Raih Mimpi.id tidak mengenakan biaya administrasi ketika Anda membuat halaman galang dana.</p>
          <br />
          <p>• Raih Mimpi.id hanya mengenakan biaya administrasi dari donasi online yang terkumpul.</p>
          <br />
          <p>• Perolehan donasi yang ditampilkan pada halaman galang dana merupakan total dari donasi offline dan donasi online sebelum dikenakan biaya administrasi.</p>
          <br />
          <p>• Biaya administrasi yang dikenakan Raih Mimpi.id dapat dikategorikan menjadi dua jenis, yaitu Platform fee dan Payment Processing fees.</p>
        </>
      )
    },
    {
      question: "Bagaimana jika donasi yang saya terima tidak mencapai target?",
      answer: (
        <p>Setelah melakukan verifikasi akun, Anda dapat mencairkan donasi kapan saja meski target belum/tidak tercapai.</p>
      )
    }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={() => navigate(-1)} aria-label="Go back">
          ←
        </button>
        <div className="logo white-text">RaihMimpi</div>
        <div className="header-spacer"></div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-illustration">
          <img src="/main-icon.svg" alt="Raih Mimpi" />
        </div>
        <h1>Galang dana untuk semua yang membutuhkan!</h1>
        <p>Di Raih Mimpi ada jutaan #OrangBaik yang berdonasi ke segala jenis galang dana tiap harinya.</p>
        <button 
          className="cta-button" 
          onClick={() => navigate('/user-type')}
        >
          Galang dana sekarang!
        </button>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <h2 className="process-title">Cara galang dana di Raih Mimpi</h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-icon-content">
              <div className="step-icon">
                <img src="/cara-galang-dana/heartbeat.svg" alt="Choose fundraising type" />
              </div>
              <div className="step-content">
                <h3>Pilih jenis galang dana</h3>
                <p>Galang dana di Raih Mimpi ada 2 jenis, yaitu galang dana kebutuhan medis dan non-medis.</p>
              </div>
            </div>
          </div>

          <div className="process-step">
            <div className="step-icon-content">
              <div className="step-icon">
                <img src="/cara-galang-dana/icon-isi-form.svg" alt="Fill fundraising form" />
              </div>
              <div className="step-content">
                <h3>Isi form pembuatan galang dana</h3>
                <p>Isi form secara lengkap dengan mengikuti instruksi yang diberikan.</p>
              </div>
            </div>
          </div>

          <div className="process-step">
            <div className="step-icon-content">
              <div className="step-icon">
                <img src="/cara-galang-dana/icon-verifikasi-galang-dana.svg" alt="Verify fundraising campaign" />
              </div>
              <div className="step-content">
                <h3>Verifikasi galang dana kamu</h3>
                <p>Lakukan verifikasi identitas dan dokumen medis (khusus galang dana medis)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="tips-section">
        <h2 className="tips-title">Tips galang dana</h2>
        <p className="tips-subtitle">Agar galang dana kamu lancar, kamu perlu memperhatikan beberapa hal berikut ini:</p>
        
        <div className="tips-cards">
          <div className="tip-card">
            <div className="tip-icon">
              <img src="/tips/identity.svg" alt="Identity verification" />
            </div>
            <div className="tip-content">
              <h4>Verifikasi identitas & dokumen medis</h4>
              <p>Lakukan verifikasi agar galang danamu lebih meyakinkan orang-orang untuk berdonasi.</p>
            </div>
          </div>

          <div className="tip-card">
            <div className="tip-icon">
              <img src="/tips/megaphone.svg" alt="Promote fundraising" />
            </div>
            <div className="tip-content">
              <h4>Sebarkan galang dana kamu sesering mungkin</h4>
              <p>Makin sering disebarkan, makin besar peluang galang danamu mendapatkan donasi!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bottom-cta">
        <h2>Sudah tahu tata caranya, 'kan?</h2>
        <p>Yuk, buat galang dana kamu dan dapatkan donasi dari jutaan #OrangBaik di Raih Mimpi!</p>
        <button 
          className="cta-button-white"
          onClick={() => navigate('/user-type')}
        >
          Galang Dana Sekarang
        </button>

        <div className="faq-section">
          <h3>🤔 Masih punya pertanyaan?</h3>
          <p style={{ fontSize: '14px', marginBottom: '16px', opacity: '0.9' }}>
            Lihat pertanyaan yang sering ditanyakan oleh penggalang dana lain.
          </p>
          
          <div className="faq-questions">
            {faqData.map((faq, index) => (
              <div className="faq-item" key={index}>
                <div 
                  className={`faq-question ${activeFaq === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                </div>
                <div className={`faq-answer ${activeFaq === index ? 'active' : ''}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;