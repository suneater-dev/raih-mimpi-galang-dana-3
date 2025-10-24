import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/IklankanCampaign.css';

const IklankanCampaign = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [showDropdown, setShowDropdown] = useState(false);

  const [campaigns] = useState([
    // Sangat Buruk - Priority at top
    {
      id: 1,
      title: 'Renovasi Sekolah Dasar di Daerah Terpencil',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      status: 'Aktif',
      collected: 3500000,
      target: 50000000,
      daysLeft: 45,
      performance: 'Sangat Buruk',
      category: 'Sosial'
    },
    {
      id: 2,
      title: 'Bantu Anak Yatim untuk Melanjutkan Sekolah',
      image: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp',
      status: 'Aktif',
      collected: 2000000,
      target: 40000000,
      daysLeft: 38,
      performance: 'Sangat Buruk',
      category: 'Pendidikan'
    },
    // Buruk
    {
      id: 3,
      title: 'Hawari Berjuang dengan Selang di Hidung - Butuh Operasi Segera',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      status: 'Aktif',
      collected: 15750000,
      target: 50000000,
      daysLeft: 42,
      performance: 'Buruk',
      category: 'Medis'
    },
    {
      id: 4,
      title: 'Bantuan Operasi untuk Kakek Aminuddin',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      status: 'Aktif',
      collected: 18000000,
      target: 60000000,
      daysLeft: 40,
      performance: 'Buruk',
      category: 'Medis'
    },
    // Baik
    {
      id: 5,
      title: 'Program Beasiswa Anak Berprestasi',
      image: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp',
      status: 'Aktif',
      collected: 22000000,
      target: 35000000,
      daysLeft: 30,
      performance: 'Baik',
      category: 'Pendidikan'
    },
    {
      id: 6,
      title: 'Pembangunan Perpustakaan Desa',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      status: 'Aktif',
      collected: 28000000,
      target: 45000000,
      daysLeft: 33,
      performance: 'Baik',
      category: 'Sosial'
    },
    // Sangat Baik
    {
      id: 7,
      title: 'Bantu Ibu Siti Melawan Kanker Payudara Stadium 3',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      status: 'Aktif',
      collected: 68000000,
      target: 80000000,
      daysLeft: 25,
      performance: 'Sangat Baik',
      category: 'Medis'
    },
    {
      id: 8,
      title: 'Bantuan untuk Korban Bencana Alam',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      status: 'Berakhir',
      collected: 50000000,
      target: 50000000,
      daysLeft: 0,
      performance: 'Sangat Baik',
      category: 'Sosial'
    },
    // Dalam Review (2 campaigns)
    {
      id: 9,
      title: 'Wujudkan Mimpi Anak Pelosok - Bantuan Pendidikan',
      image: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp',
      status: 'Dalam Review',
      collected: 0,
      target: 30000000,
      daysLeft: 28,
      performance: 'Baik',
      category: 'Pendidikan'
    },
    {
      id: 10,
      title: 'Renovasi Masjid Al-Ikhlas',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      status: 'Dalam Review',
      collected: 0,
      target: 25000000,
      daysLeft: 35,
      performance: 'Buruk',
      category: 'Sosial'
    }
  ]);

  const filters = ['Semua', 'Aktif', 'Dalam Review', 'Berakhir'];

  const handleBack = () => {
    navigate('/syarat-ketentuan-iklan');
  };

  const handlePromote = (campaignId, campaignTitle) => {
    navigate('/pendaftaran-optimasi-iklan', {
      state: {
        campaignId,
        campaignTitle
      }
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getProgressPercentage = (collected, target) => {
    return Math.round((collected / target) * 100);
  };

  const getPerformanceClass = (performance) => {
    switch (performance) {
      case 'Sangat Baik':
        return 'performance-excellent';
      case 'Baik':
        return 'performance-good';
      case 'Buruk':
        return 'performance-poor';
      case 'Sangat Buruk':
        return 'performance-very-poor';
      default:
        return '';
    }
  };

  // Get search results for dropdown
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];

    return campaigns.filter(campaign =>
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Filter campaigns based on active filter (for main list)
  const getFilteredCampaigns = () => {
    let filtered = campaigns;

    // Filter by status
    if (activeFilter !== 'Semua') {
      filtered = filtered.filter(campaign => campaign.status === activeFilter);
    }

    return filtered;
  };

  const searchResults = getSearchResults();
  const displayedCampaigns = getFilteredCampaigns();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(value.trim().length > 0);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setShowDropdown(false);
  };

  const handleSelectCampaign = (campaign) => {
    setSearchQuery('');
    setShowDropdown(false);
    // Scroll to the campaign card
    const element = document.getElementById(`campaign-${campaign.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.style.animation = 'highlightPulse 2s ease';
      setTimeout(() => {
        element.style.animation = '';
      }, 2000);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Iklankan Campaign</div>
      </header>

      {/* Info Banner */}
      <div className="promote-info-section">
        <div className="promote-info-card-compact">
          <div className="info-icon-compact">📢</div>
          <div className="info-content-compact">
            <h3 className="info-title-compact">Tingkatkan Jangkauan Campaign</h3>
            <p className="info-description-compact">
              Promosikan campaign untuk mendapat lebih banyak donatur
            </p>
          </div>
        </div>
      </div>

      {/* Campaign List */}
      <section className="promote-campaigns-section">
        <h2 className="section-title-promote">Campaign Aktif Anda</h2>
        <p className="section-subtitle">Pilih campaign yang ingin Anda promosikan</p>

        {/* Search Bar */}
        <div className="promote-search-section">
          <div className="promote-search-wrapper">
            <div className="promote-search-container">
              <svg className="promote-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Cari campaign berdasarkan judul..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.trim() && setShowDropdown(true)}
                className="promote-search-input"
              />
              {searchQuery && (
                <button
                  className="promote-search-clear"
                  onClick={handleSearchClear}
                >
                  ×
                </button>
              )}
            </div>

            {/* Search Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="search-dropdown-item"
                    onClick={() => handleSelectCampaign(campaign)}
                  >
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="search-dropdown-image"
                    />
                    <div className="search-dropdown-content">
                      <div className="search-dropdown-category">{campaign.category}</div>
                      <div className="search-dropdown-title">{campaign.title}</div>
                      <div className="search-dropdown-status">
                        <span className={`search-status-badge ${campaign.status.toLowerCase().replace(' ', '-')}`}>
                          {campaign.status}
                        </span>
                        <span className="search-dropdown-collected">
                          {formatCurrency(campaign.collected)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showDropdown && searchQuery.trim() && searchResults.length === 0 && (
              <div className="search-dropdown">
                <div className="search-no-results">
                  <svg className="search-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                  <p>Tidak ada campaign ditemukan</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="promote-filters-section">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`promote-filter-button ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="promote-campaigns-list">
          {displayedCampaigns.length > 0 ? (
            displayedCampaigns.map((campaign) => (
            <div key={campaign.id} id={`campaign-${campaign.id}`} className="promote-campaign-card">
              <div className="promote-card-content">
                {/* Campaign Header with Image */}
                <div className="promote-campaign-header">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="promote-campaign-image"
                  />
                  <div className="promote-campaign-info">
                    <div className="category-badge">{campaign.category}</div>
                    <h3 className="promote-campaign-title">{campaign.title}</h3>
                    <div className="status-indicator-promote">
                      <div className="status-dot active"></div>
                      <span className="status-text">{campaign.status}</span>
                    </div>
                  </div>
                </div>

                {/* Campaign Stats */}
                <div className="promote-stats-section">
                  <div className="stat-item">
                    <div className="stat-label">Terkumpul</div>
                    <div className="stat-value collected">{formatCurrency(campaign.collected)}</div>
                    <div className="stat-sublabel">dari {formatCurrency(campaign.target)}</div>
                  </div>

                  <div className="stat-divider"></div>

                  <div className="stat-item">
                    <div className="stat-label">Peforma</div>
                    <div className={`performance-badge ${getPerformanceClass(campaign.performance)}`}>
                      {campaign.performance}
                    </div>
                  </div>

                  <div className="stat-divider"></div>

                  <div className="stat-item">
                    <div className="stat-label">Sisa Waktu</div>
                    <div className="stat-value days">{campaign.daysLeft}</div>
                    <div className="stat-sublabel">hari lagi</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="promote-progress-section">
                  <div className="progress-bar-container-promote">
                    <div className="progress-track-promote">
                      <div
                        className="progress-fill-promote"
                        style={{ width: `${getProgressPercentage(campaign.collected, campaign.target)}%` }}
                      >
                        <div className="progress-shine-promote"></div>
                      </div>
                    </div>
                    <span className="progress-percentage-promote">
                      {getProgressPercentage(campaign.collected, campaign.target)}%
                    </span>
                  </div>
                </div>

                {/* Promote Button */}
                <button
                  className={`promote-button ${getPerformanceClass(campaign.performance)}-btn`}
                  onClick={() => handlePromote(campaign.id, campaign.title)}
                  disabled={campaign.performance === 'Sangat Baik'}
                >
                  <svg className="promote-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {campaign.performance === 'Sangat Buruk' || campaign.performance === 'Buruk'
                    ? 'Tingkatkan Peforma Sekarang!'
                    : campaign.performance === 'Sangat Baik'
                    ? 'Sudah DiPromosikan'
                    : 'Promosikan Campaign Ini'}
                </button>
              </div>
            </div>
            ))
          ) : (
            <div className="no-campaigns-promote">
              <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <h3>Tidak ada campaign ditemukan</h3>
              <p>
                {searchQuery
                  ? `Tidak ada campaign yang cocok dengan pencarian "${searchQuery}"`
                  : `Belum ada campaign dengan status "${activeFilter}"`}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Info */}
      <div className="bottom-info-section">
        <div className="info-card-small">
          <p className="info-text-small">
            💡 <strong>Tips:</strong> Campaign yang dipromosikan memiliki peluang 3x lebih tinggi untuk mencapai target donasi
          </p>
        </div>
      </div>
    </div>
  );
};

export default IklankanCampaign;
