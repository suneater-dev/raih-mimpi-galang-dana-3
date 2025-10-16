import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PencairanDana.css';

const PencairanDana = () => {
  const navigate = useNavigate();

  // Sample active campaigns data
  const [campaigns] = useState([
    {
      id: 1,
      title: 'Hawari Berjuang dengan Selang di Hidung - Butuh Operasi Segera',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      collected: 45000000,
      target: 50000000,
      donors: 1234,
      status: 'Aktif',
      daysLeft: 15,
      category: 'Medis'
    },
    {
      id: 2,
      title: 'Wujudkan Mimpi Anak Pelosok - Bantuan Pendidikan',
      image: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp',
      collected: 28500000,
      target: 35000000,
      donors: 892,
      status: 'Aktif',
      daysLeft: 22,
      category: 'Pendidikan'
    },
    {
      id: 3,
      title: 'Temani Mimpi Pejuang Pelosok - Program Beasiswa',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      collected: 62000000,
      target: 75000000,
      donors: 2156,
      status: 'Aktif',
      daysLeft: 8,
      category: 'Pendidikan'
    }
  ]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleWithdraw = (campaign) => {
    // Navigate to detail page with campaign data
    navigate('/detail-pencairan-dana', { state: { campaign } });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp');
  };

  const getProgress = (collected, target) => {
    return Math.min(Math.round((collected / target) * 100), 100);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Medis': '#ef4444',
      'Pendidikan': '#3b82f6',
      'Sosial': '#10b981',
      'Kreatif': '#f59e0b'
    };
    return colors[category] || '#983ced';
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Pencairan Dana</div>
      </header>

      {/* Content */}
      <div className="pencairan-content">
        <div className="pencairan-card">
          {/* Title & Description */}
          <div className="pencairan-header">
            <div className="header-icon-pencairan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="pencairan-title">Pencairan Dana Campaign</h2>
            <p className="pencairan-description">
              Berikut adalah daftar campaign aktif Anda. Anda dapat mencairkan dana yang telah terkumpul untuk setiap campaign.
            </p>
          </div>

          {/* Info Box */}
          <div className="info-box-pencairan">
            <svg className="info-icon-pencairan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="info-text-pencairan">
              <strong>Informasi:</strong> Dana akan ditransfer ke rekening yang Anda daftarkan dalam waktu 2-3 hari kerja setelah pengajuan pencairan disetujui.
            </div>
          </div>

          {/* Campaign List */}
          <div className="campaigns-list">
            <h3 className="campaigns-section-title">Campaign Aktif ({campaigns.length})</h3>

            {campaigns.map((campaign) => (
              <div key={campaign.id} className="campaign-card-pencairan">
                {/* Campaign Image */}
                <div className="campaign-image-container">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="campaign-image"
                    onError={(e) => {
                      e.target.src = '/dashboard/placeholder.jpg';
                    }}
                  />
                  <div className="campaign-category-badge" style={{ background: getCategoryColor(campaign.category) }}>
                    {campaign.category}
                  </div>
                </div>

                {/* Campaign Info */}
                <div className="campaign-info-pencairan">
                  <h4 className="campaign-title-pencairan">{campaign.title}</h4>

                  {/* Stats Row */}
                  <div className="campaign-stats-row">
                    <div className="stat-item">
                      <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{campaign.donors} donatur</span>
                    </div>
                    <div className="stat-item">
                      <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{campaign.daysLeft} hari lagi</span>
                    </div>
                  </div>

                  {/* Progress Info */}
                  <div className="campaign-progress-info">
                    <div className="progress-amounts">
                      <span className="collected-amount">{formatCurrency(campaign.collected)}</span>
                      <span className="target-amount">dari {formatCurrency(campaign.target)}</span>
                    </div>
                    <div className="progress-percentage">{getProgress(campaign.collected, campaign.target)}%</div>
                  </div>

                  {/* Progress Bar */}
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${getProgress(campaign.collected, campaign.target)}%` }}
                    ></div>
                  </div>

                  {/* Withdraw Button */}
                  <button
                    className="btn-withdraw"
                    onClick={() => handleWithdraw(campaign)}
                  >
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Cairkan Dana
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <button type="button" className="btn-pencairan secondary" onClick={handleBack}>
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PencairanDana;
