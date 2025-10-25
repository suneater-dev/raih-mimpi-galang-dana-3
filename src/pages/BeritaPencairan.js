import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/BeritaPencairan.css';

const BeritaPencairan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const campaign = location.state?.campaign;

  const handleBack = () => {
    navigate('/pencairan-dana');
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

  // Example expense data
  const expenses = [
    { category: 'Bantuan Logistik & Makanan', amount: 20000000, description: 'Distribusi sembako dan makanan siap saji untuk 75 keluarga' },
    { category: 'Perbaikan Rumah', amount: 18000000, description: 'Renovasi dan perbaikan 12 rumah yang rusak akibat bencana' },
    { category: 'Bantuan Pendidikan Anak', amount: 8000000, description: 'Paket sekolah dan bimbingan belajar untuk 45 anak' },
    { category: 'Biaya Operasional', amount: 4000000, description: 'Transport, administrasi, dan koordinasi kegiatan' }
  ];

  // Example photos
  const photos = [
    { id: 1, url: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp', caption: 'Distribusi bantuan logistik kepada warga' },
    { id: 2, url: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp', caption: 'Kegiatan belajar mengajar anak-anak' },
    { id: 3, url: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp', caption: 'Proses perbaikan rumah warga' },
    { id: 4, url: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp', caption: 'Pembagian paket pendidikan' }
  ];

  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Berita Campaign</div>
      </header>

      {/* Content */}
      <div className="berita-content">
        <div className="berita-card">
          {/* Campaign Title & Info */}
          <div className="berita-header">
            <div className="header-icon-berita">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="berita-title">{campaign?.title || 'Bantuan untuk Korban Bencana Alam'}</h2>
            <div className="berita-meta">
              <div className="meta-item">
                <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Dipublikasi: {formatDate(campaign?.withdrawnDate || new Date().toISOString())}</span>
              </div>
              <div className="meta-item">
                <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Total Dana: {formatCurrency(campaign?.collected || 50000000)}</span>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="berita-section">
            <div className="section-header">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="section-title">Ringkasan Penggunaan Dana</h3>
            </div>
            <div className="summary-card">
              <p className="summary-text">
                Alhamdulillah, berkat dukungan dan kepercayaan dari para donatur, kami telah berhasil menyalurkan seluruh dana untuk membantu korban bencana alam. Dana sebesar <strong>{formatCurrency(campaign?.collected || 50000000)}</strong> telah digunakan sepenuhnya untuk meringankan beban para korban melalui berbagai program bantuan yang terencana dan terukur.
              </p>
              <p className="summary-text">
                Bantuan yang kami berikan mencakup distribusi logistik dan makanan, perbaikan rumah yang rusak, bantuan pendidikan untuk anak-anak korban, serta biaya operasional untuk memastikan penyaluran berjalan lancar. Semua kegiatan dilaksanakan dengan penuh tanggung jawab dan transparan.
              </p>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="berita-section">
            <div className="section-header">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="section-title">Rincian Pengeluaran</h3>
            </div>
            <div className="expense-list">
              {expenses.map((expense, index) => (
                <div key={index} className="expense-item">
                  <div className="expense-header">
                    <div className="expense-number">{index + 1}</div>
                    <div className="expense-info">
                      <h4 className="expense-category">{expense.category}</h4>
                      <p className="expense-description">{expense.description}</p>
                    </div>
                    <div className="expense-amount">{formatCurrency(expense.amount)}</div>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="expense-total">
                <span className="total-label">Total Pengeluaran</span>
                <span className="total-amount">{formatCurrency(totalExpense)}</span>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="berita-section">
            <div className="section-header">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="section-title">Dokumentasi Kegiatan</h3>
            </div>
            <div className="photo-gallery">
              {photos.map((photo) => (
                <div key={photo.id} className="photo-item">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="photo-image"
                    onError={(e) => {
                      e.target.src = '/dashboard/placeholder.jpg';
                    }}
                  />
                  <div className="photo-caption">{photo.caption}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Section */}
          <div className="berita-section">
            <div className="section-header">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="section-title">Dampak & Hasil</h3>
            </div>
            <div className="impact-grid">
              <div className="impact-card">
                <div className="impact-number">75</div>
                <div className="impact-label">Keluarga Terbantu</div>
              </div>
              <div className="impact-card">
                <div className="impact-number">12</div>
                <div className="impact-label">Rumah Diperbaiki</div>
              </div>
              <div className="impact-card">
                <div className="impact-number">45</div>
                <div className="impact-label">Anak Dapat Pendidikan</div>
              </div>
              <div className="impact-card">
                <div className="impact-number">100%</div>
                <div className="impact-label">Dana Tersalurkan</div>
              </div>
            </div>
          </div>

          {/* Thank You Section */}
          <div className="berita-section">
            <div className="thankyou-card">
              <svg className="thankyou-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="thankyou-title">Terima Kasih kepada Para Donatur</h3>
              <p className="thankyou-text">
                Kami mengucapkan terima kasih yang sebesar-besarnya kepada seluruh donatur yang telah mempercayai kami untuk menyalurkan bantuan. Semoga kebaikan Anda semua dibalas oleh Allah SWT dengan berlipat ganda. Bantuan Anda telah memberikan harapan baru bagi para korban bencana untuk bangkit dan memulai kehidupan yang lebih baik.
              </p>
              <p className="thankyou-text">
                Jazakumullahu khairan katsiran. Semoga kita semua selalu diberikan kemudahan dan keberkahan dalam setiap langkah kehidupan kita.
              </p>
            </div>
          </div>

          {/* Back Button */}
          <button className="btn-back-berita" onClick={handleBack}>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Kembali ke Pencairan Dana
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeritaPencairan;
