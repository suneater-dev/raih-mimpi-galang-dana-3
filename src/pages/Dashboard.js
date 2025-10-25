import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    'Semua',
    'Belum Jadi',
    'Dalam Review',
    'Aktif',
    'Berakhir',
    'Diiklankan'
  ];

  // Menu items data
  const menuItems = [
    {
      id: 'verifikasi',
      label: 'Verifikasi',
      icon: 'verification',
      onClick: () => navigate('/verifikasi')
    },
    {
      id: 'iklankan',
      label: 'Iklankan Campaign',
      icon: 'megaphone',
      onClick: () => navigate('/syarat-ketentuan-iklan')
    },
    {
      id: 'pencairan',
      label: 'Pencairan',
      icon: 'card',
      onClick: () => navigate('/pencairan-dana')
    }
  ];

  // Sample campaign data with real images - matching IklankanCampaign
  const campaigns = [
    // Sangat Buruk - Priority campaigns
    {
      id: 1,
      title: 'Renovasi Sekolah Dasar di Daerah Terpencil',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      status: 'Aktif',
      progress: 100,
      steps: '7 dari 7 tahap',
      lastUpdated: '05 September 2025',
      hasImage: true,
      collected: 3500000,
      target: 50000000,
      daysLeft: 45,
      donors: 42
    },
    {
      id: 2,
      title: 'Bantu Anak Yatim untuk Melanjutkan Sekolah',
      image: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp',
      status: 'Aktif',
      progress: 100,
      steps: '7 dari 7 tahap',
      lastUpdated: '04 September 2025',
      hasImage: true,
      collected: 2000000,
      target: 40000000,
      daysLeft: 38,
      donors: 28
    },
    // Buruk
    {
      id: 3,
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
      donors: 127,
      isPromoted: true
    },
    {
      id: 4,
      title: 'Bantuan Operasi untuk Kakek Aminuddin',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      status: 'Aktif',
      progress: 100,
      steps: '7 dari 7 tahap',
      lastUpdated: '06 September 2025',
      hasImage: true,
      collected: 18000000,
      target: 60000000,
      daysLeft: 40,
      donors: 145
    },
    // Baik
    {
      id: 5,
      title: 'Program Beasiswa Anak Berprestasi',
      image: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp',
      status: 'Aktif',
      progress: 100,
      steps: '7 dari 7 tahap',
      lastUpdated: '07 September 2025',
      hasImage: true,
      collected: 22000000,
      target: 35000000,
      daysLeft: 30,
      donors: 167
    },
    {
      id: 6,
      title: 'Pembangunan Perpustakaan Desa',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      status: 'Aktif',
      progress: 100,
      steps: '7 dari 7 tahap',
      lastUpdated: '08 September 2025',
      hasImage: true,
      collected: 28000000,
      target: 45000000,
      daysLeft: 33,
      donors: 198
    },
    // Sangat Baik
    {
      id: 7,
      title: 'Bantu Ibu Siti Melawan Kanker Payudara Stadium 3',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      status: 'Aktif',
      progress: 100,
      steps: '7 dari 7 tahap',
      lastUpdated: '09 September 2025',
      hasImage: true,
      collected: 68000000,
      target: 80000000,
      daysLeft: 25,
      donors: 342,
      isPromoted: true
    },
    {
      id: 8,
      title: 'Bantuan untuk Korban Bencana Alam',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      status: 'Berakhir',
      progress: 100,
      steps: '7 dari 7 tahap',
      lastUpdated: '04 September 2025',
      hasImage: true,
      collected: 50000000,
      target: 50000000,
      daysLeft: 0,
      donors: 278
    },
    // Belum Jadi (Drafts with different completion levels)
    {
      id: 9,
      title: 'Bantuan Biaya Sekolah Anak Yatim',
      image: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp',
      status: 'Belum Jadi',
      progress: 14,
      steps: '1 dari 7 tahap',
      lastUpdated: '12 September 2025',
      hasImage: false,
      lastStep: '/bantuan-lainnya'
    },
    {
      id: 10,
      title: 'Renovasi Sekolah Rusak Pasca Banjir',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      status: 'Belum Jadi',
      progress: 43,
      steps: '3 dari 7 tahap',
      lastUpdated: '11 September 2025',
      hasImage: true,
      lastStep: '/judul-kampanye'
    },
    {
      id: 11,
      title: 'Bantu Operasi Tumor Otak Ibu Siti',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      status: 'Belum Jadi',
      progress: 71,
      steps: '5 dari 7 tahap',
      lastUpdated: '10 September 2025',
      hasImage: true,
      lastStep: '/tulis-cerita-3'
    },
    // Dalam Review
    {
      id: 12,
      title: 'Wujudkan Mimpi Anak Pelosok - Bantuan Pendidikan',
      image: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp',
      status: 'Dalam Review',
      progress: 100,
      steps: '7 dari 7 tahap',
      lastUpdated: '09 September 2025',
      hasImage: true,
      collected: 0,
      target: 30000000,
      daysLeft: 28,
      donors: 0
    },
    {
      id: 13,
      title: 'Renovasi Masjid Al-Ikhlas',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      status: 'Dalam Review',
      progress: 100,
      steps: '7 dari 7 tahap',
      lastUpdated: '08 September 2025',
      hasImage: true,
      collected: 0,
      target: 25000000,
      daysLeft: 35,
      donors: 0
    }
  ];

  const handleCreateNew = () => {
    navigate('/bantuan-lainnya');
  };

  const handleContinueDraft = (campaign) => {
    // Navigate to last saved step for drafts
    if (campaign.lastStep) {
      navigate(campaign.lastStep);
    } else {
      navigate('/bantuan-lainnya');
    }
  };

  const handleViewCampaign = (campaign) => {
    // Navigate to campaign detail page
    navigate(`/campaign/${campaign.id}`, { state: { campaign } });
  };

  const handlePreviewDraft = (campaign) => {
    // Navigate to preview mode with isPreview flag
    navigate(`/campaign/${campaign.id}`, {
      state: {
        campaign,
        isPreview: true
      }
    });
  };

  const handleDeleteDraft = (campaignId) => {
    alert(`Menghapus draft campaign ${campaignId}`);
  };

  // Get appropriate action button based on campaign status
  const getActionButton = (campaign) => {
    switch (campaign.status) {
      case 'Aktif':
        return {
          text: 'Lihat Campaign',
          icon: 'eye',
          className: 'view-btn-modern',
          onClick: () => handleViewCampaign(campaign.id)
        };
      case 'Belum Jadi':
        return {
          text: 'Lanjutkan',
          icon: 'arrow',
          className: 'continue-btn-modern',
          onClick: () => handleContinueDraft(campaign)
        };
      case 'Dalam Review':
        return {
          text: 'Pratinjau',
          icon: 'eye',
          className: 'preview-btn-modern',
          onClick: () => handlePreviewDraft(campaign)
        };
      case 'Berakhir':
        return {
          text: 'Lihat Campaign',
          icon: 'eye',
          className: 'view-btn-modern',
          onClick: () => handleViewCampaign(campaign.id)
        };
      case 'Diiklankan':
        return {
          text: 'Lihat Campaign',
          icon: 'eye',
          className: 'view-btn-modern',
          onClick: () => handleViewCampaign(campaign.id)
        };
      default:
        return {
          text: 'Lanjutkan',
          icon: 'arrow',
          className: 'continue-btn-modern',
          onClick: () => handleContinueDraft(campaign)
        };
    }
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
      case 'Belum Jadi':
      case 'Belum jadi':
        return 'status-draft';
      case 'Dalam Review':
      case 'Dalam review':
        return 'status-review';
      case 'Berakhir':
        return 'status-ended';
      default:
        return 'status-draft';
    }
  };

  // Filter menu items based on search query
  const filteredMenuItems = searchQuery
    ? menuItems.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Filter campaigns based on search query
  const filteredCampaigns = searchQuery
    ? campaigns.filter(campaign =>
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.status.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Check if we have any search results
  const hasSearchResults = filteredMenuItems.length > 0 || filteredCampaigns.length > 0;

  // Filter campaigns by active filter
  const getFilteredCampaigns = () => {
    if (activeFilter === 'Semua') {
      return campaigns;
    }
    if (activeFilter === 'Diiklankan') {
      return campaigns.filter(campaign => campaign.isPromoted === true);
    }
    return campaigns.filter(campaign => campaign.status === activeFilter);
  };

  // Count active campaigns
  const activeCampaignsCount = campaigns.filter(campaign => campaign.status === 'Aktif').length;

  const displayedCampaigns = getFilteredCampaigns();

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient center">
        <h3 className="header-title white-text">Galang dana saya</h3>
      </header>

      {/* Universal Search Bar */}
      <section className="search-section">
        <div className="search-wrapper">
          <div className="search-container">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Cari menu atau galang dana..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchQuery && (
            <div className="search-dropdown">
              {hasSearchResults ? (
                <>
                  {/* Menu Items Results */}
                  {filteredMenuItems.length > 0 && (
                    <div className="search-results-section">
                      <div className="search-section-title">Menu</div>
                      {filteredMenuItems.map((item) => (
                        <button
                          key={item.id}
                          className="search-result-item"
                          onClick={() => {
                            item.onClick();
                            setSearchQuery('');
                          }}
                        >
                          <div className={`search-result-icon ${item.icon === 'verification' ? 'verification' : ''}`}>
                            {item.icon === 'verification' && (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                            {item.icon === 'megaphone' && (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                            {item.icon === 'card' && (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <div className="search-result-content">
                            <div className="search-result-title">{item.label}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Campaign Results */}
                  {filteredCampaigns.length > 0 && (
                    <div className="search-results-section">
                      <div className="search-section-title">Galang Dana</div>
                      {filteredCampaigns.map((campaign) => (
                        <button
                          key={campaign.id}
                          className="search-result-item"
                          onClick={() => {
                            handleContinueDraft(campaign.id);
                            setSearchQuery('');
                          }}
                        >
                          <div className="search-result-campaign-icon">
                            {campaign.hasImage ? (
                              <img src={campaign.image} alt={campaign.title} />
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <div className="search-result-content">
                            <div className="search-result-title">{campaign.title}</div>
                            <div className="search-result-description">
                              {campaign.status} • {campaign.steps}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="search-no-results">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>Tidak ada hasil untuk "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Dashboard Menu Section */}
      <section className="dashboard-menu-section">
        <div className="menu-grid menu-grid-three">
          {menuItems.map((item) => (
            <button key={item.id} className="menu-item" onClick={item.onClick}>
              <div className={`menu-icon ${item.icon === 'verification' ? 'verification' : ''}`}>
                {item.icon === 'verification' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {item.icon === 'megaphone' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {item.icon === 'card' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="menu-label">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="divider"></div>

      {/* Create New Section */}
      <section className="create-section">
        <div className="create-header">
          <h2 className="section-title">Buat galang dana</h2>
          <span className="quota-text">Kuota galang dana aktif: {activeCampaignsCount}</span>
        </div>
        
        <button className="create-button" onClick={handleCreateNew}>
          Buat baru galang dana +
        </button>
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
          {displayedCampaigns.length > 0 ? (
            displayedCampaigns.map((campaign) => (
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
                      <div className="badges-container">
                        <span className={`status-badge-modern ${getStatusClassesModern(campaign.status)}`}>
                          <div className="status-indicator"></div>
                          {campaign.status}
                        </span>
                        {campaign.isPromoted && (
                          <span className="promoted-badge-modern">
                            <svg className="megaphone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Diiklankan
                          </span>
                        )}
                      </div>
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

                {/* Campaign Stats */}
                {campaign.status === 'Aktif' || campaign.status === 'Berakhir' ? (
                  <div className="campaign-stats-section">
                    <div className="stats-row">
                      <div className="stat-item">
                        <span className="stat-label">Terkumpul</span>
                        <span className="stat-value">{formatCurrency(campaign.collected)}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Target</span>
                        <span className="stat-value">{formatCurrency(campaign.target)}</span>
                      </div>
                    </div>
                    <div className="stats-row">
                      <div className="stat-item">
                        <span className="stat-label">Sisa Hari</span>
                        <span className="stat-value">{campaign.daysLeft} hari</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Donatur</span>
                        <span className="stat-value">{campaign.donors} orang</span>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="actions-section-modern">
                  {(() => {
                    const actionBtn = getActionButton(campaign);
                    return (
                      <button
                        className={actionBtn.className}
                        onClick={actionBtn.onClick}
                      >
                        <div className="btn-content">
                          {actionBtn.icon === 'arrow' && (
                            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                          {actionBtn.icon === 'eye' && (
                            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                            </svg>
                          )}
                          {actionBtn.text}
                        </div>
                      </button>
                    );
                  })()}

                  {campaign.status === 'Belum Jadi' && (
                    <button
                      className="delete-btn-modern"
                      onClick={() => handleDeleteDraft(campaign.id)}
                    >
                      <svg className="delete-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            ))
          ) : (
            <div className="no-campaigns-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>Tidak ada galang dana</h3>
              <p>Belum ada galang dana dengan status "{activeFilter}"</p>
            </div>
          )}
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