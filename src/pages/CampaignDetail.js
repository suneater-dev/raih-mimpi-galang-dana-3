import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../styles/CampaignDetail.css';

const CampaignDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const campaign = location.state?.campaign;
  const isPreview = location.state?.isPreview || false;
  const [isStoryExpanded, setIsStoryExpanded] = React.useState(false);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Dummy campaign data if not passed via state
  const dummyCampaign = {
    id: id || 1,
    title: 'Hawari Berjuang dengan Selang di Hidung - Butuh Operasi Segera',
    image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
    collected: 15750000,
    target: 50000000,
    donors: 127,
    daysLeft: 42,
    category: 'Medis',
    status: 'Aktif',
    organizer: 'Siti Nurhaliza',
    organizerVerified: true,
    createdDate: '2025-08-15T10:00:00',
    story: `Assalamualaikum warahmatullahi wabarakatuh,

Saya Siti Nurhaliza, ibu dari Hawari yang masih berusia 3 tahun. Saat ini Hawari sedang berjuang melawan penyakit yang memerlukan operasi segera. Hawari harus menggunakan selang di hidungnya setiap hari untuk membantu pernapasannya.

Dokter telah menyarankan untuk segera melakukan operasi agar kondisi Hawari bisa membaik. Namun biaya operasi yang dibutuhkan sangat besar dan kami sebagai keluarga sederhana kesulitan untuk memenuhinya.

Kami sangat berharap bantuan dari para dermawan untuk membantu Hawari mendapatkan kesempatan hidup yang lebih baik. Setiap bantuan yang diberikan akan sangat berarti bagi kami dan Hawari.

Terima kasih atas perhatian dan bantuan yang diberikan. Semoga Allah SWT membalas kebaikan kalian semua dengan berlipat ganda. Aamiin.

Pak Irwan lahir dengan kondisi fisik yang tidak sempurna, namun hal itu tidak pernah menghalanginya untuk berjuang keras dan tetap tersenyum. Kehidupan yang keras telah mengajarkannya untuk tetap tabah, meskipun sering kali menjadi bahan ejekan dan penilaian orang lain.

Di usia lanjut ini, kesehatan Pak Irwan semakin menurun. Tubuhnya yang tidak sempurna membuat kesulitan menempati pekerjaan, sehingga rumahnya pun sangat tidak layak dan rusak. Berbagai tempat di rumahnya bocor, membuat kondisi hidup semakin memprihatinkan.`,
    updates: [
      {
        date: '2025-09-10T14:30:00',
        title: 'Update Kondisi Hawari',
        content: 'Alhamdulillah, kondisi Hawari semakin membaik. Terima kasih atas dukungan dari para donatur yang sudah membantu.'
      },
      {
        date: '2025-09-05T10:15:00',
        title: 'Hasil Konsultasi Dokter',
        content: 'Kami baru saja konsultasi dengan dokter spesialis. Operasi dijadwalkan dalam waktu dekat.'
      }
    ],
    topDonors: [
      { name: 'Hamba Allah', amount: 500000, avatar: null },
      { name: 'Orang Baik', amount: 1000000, avatar: null },
      { name: 'Dermawan', amount: 250000, avatar: null }
    ],
    wordCloud: ['urusan', 'untuk', 'yang', 'cepat', 'ridho', 'kita', 'serta', 'mudah', 'mana', 'para', 'sakit', 'orang', 'semoga', 'diberikan', 'baik', 'yano']
  };

  // Merge campaign data with defaults
  const displayCampaign = campaign ? {
    ...dummyCampaign,
    ...campaign,
    // Ensure required fields exist
    category: campaign.category || 'Umum',
    organizer: campaign.organizer || 'Penggalang Dana',
    createdDate: campaign.createdDate || new Date().toISOString(),
    story: campaign.story || dummyCampaign.story,
    updates: campaign.updates || []
  } : dummyCampaign;

  const percentage = Math.round((displayCampaign.collected / displayCampaign.target) * 100);

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Detail Campaign</div>
        <div className="header-actions">
          <button className="share-btn" onClick={() => alert('Bagikan campaign')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Preview Mode Banner */}
      {isPreview && (
        <div className="preview-banner">
          <svg className="preview-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z"/>
            <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd"/>
          </svg>
          <div className="preview-text">
            <div className="preview-title">Mode Pratinjau</div>
            <div className="preview-subtitle">Ini adalah tampilan pratinjau campaign Anda. Campaign belum dipublikasikan.</div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="campaign-detail-content">
        {/* Campaign Image */}
        <div className="campaign-image-section">
          <img
            src={displayCampaign.image}
            alt={displayCampaign.title}
            className="campaign-hero-image"
            onError={(e) => {
              e.target.src = '/dashboard/placeholder.jpg';
            }}
          />
          <div className="campaign-category-badge">
            {displayCampaign.category}
          </div>
        </div>

        {/* Campaign Title & Status */}
        <div className="campaign-header-section">
          <h1 className="campaign-title-detail">{displayCampaign.title}</h1>
          <div className="campaign-meta">
            <span className={`status-badge-detail ${displayCampaign.status === 'Aktif' ? 'status-active' : 'status-ended'}`}>
              {displayCampaign.status}
            </span>
            <span className="organizer-info">
              Oleh: <strong>{displayCampaign.organizer}</strong>
            </span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="progress-card">
          <div className="amount-raised">
            <div className="raised-label">Terkumpul</div>
            <div className="raised-amount">{formatCurrency(displayCampaign.collected)}</div>
            <div className="target-info">dari target {formatCurrency(displayCampaign.target)}</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${percentage}%` }}
              >
                <div className="progress-shine"></div>
              </div>
            </div>
            <span className="progress-percentage">{percentage}%</span>
          </div>

          <div className="campaign-stats-grid">
            <div className="stat-card">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="stat-value">{displayCampaign.donors}</div>
              <div className="stat-label">Donatur</div>
            </div>
            <div className="stat-card">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="stat-value">{displayCampaign.daysLeft}</div>
              <div className="stat-label">Hari Tersisa</div>
            </div>
          </div>

          <button
            className={`btn-donate ${isPreview ? 'disabled' : ''}`}
            disabled={isPreview}
            onClick={() => !isPreview && alert('Navigasi ke halaman donasi')}
          >
            {isPreview ? 'Pratinjau - Tidak Dapat Menerima Donasi' : 'Donasi Sekarang'}
          </button>
        </div>

        {/* Fundraiser Organizer Card */}
        <div className="organizer-card-section">
          <h2 className="section-title">
            <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Informasi Penggalang Dana
          </h2>
          <div className="organizer-card">
            <div className="organizer-avatar-section">
              <div className="organizer-avatar">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
            <div className="organizer-info-section">
              <div className="organizer-name-wrapper">
                <div className="organizer-name">{displayCampaign.organizer}</div>
                {displayCampaign.organizerVerified && (
                  <svg className="verified-badge" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )}
              </div>
              <div className="organizer-label">Penggalang Dana</div>
            </div>
          </div>
        </div>

        {/* Campaign Story with Read More */}
        <div className="story-section">
          <h2 className="section-title">
            <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Info Campaign
          </h2>
          <div className={`story-content ${!isStoryExpanded ? 'collapsed' : ''}`}>
            {displayCampaign.story ? (
              displayCampaign.story.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>Cerita kampanye akan ditampilkan di sini.</p>
            )}
          </div>
          <button
            className="read-more-btn"
            onClick={() => setIsStoryExpanded(!isStoryExpanded)}
          >
            {isStoryExpanded ? 'Tutup Cerita' : 'Baca Selengkapnya'}
          </button>
        </div>

        {/* Updates Section */}
        {displayCampaign.updates && displayCampaign.updates.length > 0 && (
          <div className="updates-section">
            <h2 className="section-title">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Kabar Terbaru
            </h2>
            <div className="updates-list">
              {displayCampaign.updates.map((update, index) => (
                <div key={index} className="update-card">
                  <div className="update-date">{formatDate(update.date)}</div>
                  <h3 className="update-title">{update.title}</h3>
                  <p className="update-content">{update.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Donors Section */}
        {displayCampaign.topDonors && displayCampaign.topDonors.length > 0 && (
          <div className="top-donors-section">
            <h2 className="section-title-center">Orang Terbaik</h2>
            <div className="top-donors-grid">
              {displayCampaign.topDonors.map((donor, index) => (
                <div key={index} className="donor-card">
                  <div className="donor-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div className="donor-name">{donor.name}</div>
                  <div className="donor-amount">{formatCurrency(donor.amount)}</div>
                </div>
              ))}
            </div>
            <button className="view-all-btn">
              Lihat Selengkapnya
            </button>
          </div>
        )}

        {/* Word Cloud Section */}
        {displayCampaign.wordCloud && displayCampaign.wordCloud.length > 0 && (
          <div className="word-cloud-section">
            <h2 className="section-title-center">Doa-doa orang baik</h2>
            <div className="word-cloud">
              {displayCampaign.wordCloud.map((word, index) => (
                <span
                  key={index}
                  className="word-cloud-item"
                  style={{
                    fontSize: `${Math.random() * 20 + 16}px`,
                    fontWeight: Math.random() > 0.5 ? 700 : 500
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
            <button className="view-all-btn">
              Lihat Selengkapnya
            </button>
          </div>
        )}

        {/* Fundraiser Carousel */}
        <div className="fundraiser-carousel-section">
          <h2 className="section-title-center">Fundraiser</h2>
          <div className="fundraiser-carousel">
            <div className="fundraiser-card">
              <div className="fundraiser-avatar">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="fundraiser-name">Raihmimpi</div>
              <div className="fundraiser-stats">
                <span className="fundraiser-donors">94 donatur</span>
                <span className="fundraiser-dot">•</span>
                <span className="fundraiser-amount">Terkumpul Rp 14.598.000</span>
              </div>
              <button className="fundraiser-next-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="fundraiser-card">
              <div className="fundraiser-avatar">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="fundraiser-name">Raihmimpi.id</div>
              <div className="fundraiser-stats">
                <span className="fundraiser-donors">311 donatur</span>
                <span className="fundraiser-dot">•</span>
                <span className="fundraiser-amount">Terkumpul Rp 13.275.000</span>
              </div>
              <button className="fundraiser-next-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <button className="donate-cta-btn">
            Jadi Fundraiser
          </button>
        </div>

        {/* Contact Footer */}
        <div className="contact-footer-section">
          <div className="contact-brand">
            <svg className="brand-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            <div className="brand-name">Raihmimpi.id</div>
          </div>
          <div className="contact-address">
            <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Jl. Gunung Batu No.578 Kota Bandung Workspace Lt. 2</span>
          </div>
          <div className="contact-info">
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
              </svg>
              <a href="mailto:raihmimpi.id">raihmimpi.id</a>
            </div>
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
              </svg>
              <span>raihmimpi_id</span>
            </div>
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>(+62) 8131636135</span>
            </div>
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>(+62) 8131636135</span>
            </div>
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
              </svg>
              <a href="https://www.raihmimpi.id" target="_blank" rel="noopener noreferrer">www.raihmimpi.id</a>
            </div>
          </div>
          <button className="hubungi-btn">
            Hubungi Kami
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
