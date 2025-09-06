import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filters = [
    'Semua',
    'Butuh tindakan', 
    'Aktif',
    'Belum jadi',
    'Berakhir',
    'Dalam review'
  ];

  // Sample campaign data with real images
  const campaigns = [
    {
      id: 1,
      title: 'Hawari Berjuang dengan Selang di Hidung - Butuh Operasi Segera',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      status: 'Aktif',
      progress: 100,
      steps: '7 dari 7 tahap',
      lastUpdated: '05 September 2025',
      hasImage: true,
      collected: 15750000,
      target: 50000000,
      daysLeft: 42,
      donors: 127
    },
    {
      id: 2,
      title: 'Wujudkan Mimpi Anak Pelosok - Bantuan Pendidikan',
      image: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp',
      status: 'Dalam review',
      progress: 85,
      steps: '6 dari 7 tahap',
      lastUpdated: '04 September 2025',
      hasImage: true,
      collected: 0,
      target: 0,
      daysLeft: 0,
      donors: 0
    },
    {
      id: 3,
      title: 'Temani Mimpi Pejuang Pelosok - Program Beasiswa',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      status: 'Berakhir',
      progress: 100,
      steps: '7 dari 7 tahap',
      lastUpdated: '04 September 2025',
      hasImage: true,
      collected: 25000000,
      target: 25000000,
      daysLeft: 0,
      donors: 89
    },
    {
      id: 4,
      title: '[Penggalangan belum ada judul]',
      image: null,
      status: 'Belum jadi',
      progress: 45,
      steps: '3 dari 7 tahap',
      lastUpdated: '29 Agustus 2025',
      hasImage: false,
      collected: 0,
      target: 0,
      daysLeft: 0,
      donors: 0
    },
    {
      id: 5,
      title: '[Penggalangan belum ada judul]',
      image: null,
      status: 'Belum jadi',
      progress: 0,
      steps: '0 dari 7 tahap',
      lastUpdated: '29 Agustus 2025',
      hasImage: false,
      collected: 0,
      target: 0,
      daysLeft: 0,
      donors: 0
    }
  ];

  const handleCreateNew = () => {
    navigate('/select-category');
  };

  const handleContinueDraft = (campaignId) => {
    // Navigate to appropriate step based on campaign progress
    navigate('/select-category');
  };

  const handleDeleteDraft = (campaignId) => {
    alert(`Menghapus draft campaign ${campaignId}`);
  };

  const getProgressBarWidth = (progress) => {
    return `${progress}%`;
  };

  const formatCurrency = (amount) => {
    if (amount === 0) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getProgressPercentage = (collected, target) => {
    if (target === 0) return 0;
    return Math.round((collected / target) * 100);
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Aktif':
        return 'bg-green-100 text-green-800';
      case 'Belum jadi':
        return 'bg-coal text-mineshaft30';
      case 'Dalam review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Berakhir':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-coal text-mineshaft30';
    }
  };

  const getStatusClassesModern = (status) => {
    switch (status) {
      case 'Aktif':
        return 'status-active';
      case 'Belum jadi':
        return 'status-draft';
      case 'Dalam review':
        return 'status-review';
      case 'Berakhir':
        return 'status-ended';
      default:
        return 'status-draft';
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient center">
        <h3 className="header-title white-text">Galang dana saya</h3>
      </header>

      {/* Create New Section */}
      <section className="create-section">
        <div className="create-header">
          <h2 className="section-title">Buat galang dana</h2>
          <span className="quota-text">Kuota galang dana aktif: 1</span>
        </div>
        
        <button className="create-button" onClick={handleCreateNew}>
          Buat baru galang dana +
        </button>
        
        <div className="info-banner">
          <div className="info-icon">ℹ️</div>
          <div className="info-text">
            <p>
              Ingin galang danamu lebih sukses? 
              <a href="#" className="info-link" target="_blank" rel="noopener noreferrer">
                Lihat panduan galang dana
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider"></div>

      {/* Manage Campaigns Section */}
      <section className="manage-section">
        <h2 className="section-title">Kelola galang dana</h2>
        
        {/* Filter Buttons */}
        <div className="filters-container">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Campaign List */}
        <div className="campaigns-list">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="modern-campaign-card">
              <div className="campaign-card-inner">
                <div className="campaign-header-modern">
                  {campaign.hasImage ? (
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="campaign-image-modern"
                    />
                  ) : (
                    <div className="campaign-placeholder-modern">
                      <img 
                        src="/dashboard/img-revision-placeholder.svg" 
                        alt="Campaign placeholder"
                        className="placeholder-icon"
                      />
                    </div>
                  )}
                  
                  <div className="campaign-info-modern">
                    <div className="campaign-title-section">
                      <h3 className="campaign-title-modern">
                        {campaign.title}
                      </h3>
                      <span className={`status-badge-modern ${getStatusClassesModern(campaign.status)}`}>
                        <div className="status-indicator"></div>
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="progress-section-modern">
                  <div className="progress-info-modern">
                    <span className="steps-text">{campaign.steps}</span>
                    <div className="update-info">
                      <span className="update-label">Terakhir diubah</span>
                      <span className="update-date-modern">{campaign.lastUpdated}</span>
                    </div>
                  </div>
                  
                  <div className="progress-container-modern">
                    <div className="progress-track">
                      <div 
                        className="progress-fill-modern"
                        style={{ width: getProgressBarWidth(campaign.progress) }}
                      >
                        <div className="progress-shine"></div>
                      </div>
                    </div>
                    <span className="progress-text-modern">{campaign.progress}%</span>
                  </div>
                </div>

                <div className="actions-section-modern">
                  <button 
                    className="continue-btn-modern"
                    onClick={() => handleContinueDraft(campaign.id)}
                  >
                    <div className="btn-content">
                      <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Lanjutkan
                    </div>
                  </button>
                  
                  <button 
                    className="delete-btn-modern"
                    onClick={() => handleDeleteDraft(campaign.id)}
                  >
                    <svg className="delete-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Menu Button */}
      <div className="back-to-menu-section">
        <button 
          className="back-to-menu-btn"
          onClick={() => navigate('/')}
        >
          <svg className="back-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Kembali Ke Menu
        </button>
      </div>
    </div>
  );
};

export default Dashboard;