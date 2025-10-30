import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PencairanDana.css';

const PencairanDana = () => {
  const navigate = useNavigate();

  // Filter and search state
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state for blocking withdrawal
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [blockingCampaignData, setBlockingCampaignData] = useState(null);
  const [unreportedCampaigns, setUnreportedCampaigns] = useState([]);

  // Filter options
  const filters = [
    'Semua',
    'Perlu Laporan',
    'Siap Dicairkan',
    'Sudah Dicairkan'
  ];

  // Campaign data matching Dashboard with report status
  const [campaigns] = useState([
    // NEW Campaign: Ready to withdraw - NO BLOCKING (withdrawalOrder: 0.5)
    {
      id: 14,
      title: 'Bantuan Operasi Tumor untuk Ibu Sari',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      collected: 85000000,
      target: 85000000,
      donors: 523,
      status: 'Berakhir',
      daysLeft: 0,
      category: 'Medis',
      reportStatus: 'Disetujui',
      canWithdraw: true,
      hasReport: true,
      withdrawn: false,
      withdrawnDate: null,
      withdrawalReported: false,
      withdrawalOrder: 0.5
    },
    // Berakhir campaigns with different report statuses
    // Campaign 1: Already withdrawn and reported (completed)
    {
      id: 8,
      title: 'Bantuan untuk Korban Bencana Alam',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      collected: 50000000,
      target: 50000000,
      donors: 278,
      status: 'Berakhir',
      daysLeft: 0,
      category: 'Sosial',
      reportStatus: 'Dilaporkan',
      canWithdraw: true,
      hasReport: true,
      withdrawn: true,
      withdrawnDate: '2025-01-15T10:30:00',
      withdrawalReported: true,
      withdrawalOrder: 1
    },
    // Campaign 2: Withdrawn but NOT reported (blocking Campaign 4)
    {
      id: 9,
      title: 'Wujudkan Mimpi Anak Pelosok - Bantuan Pendidikan',
      image: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp',
      collected: 30000000,
      target: 30000000,
      donors: 198,
      status: 'Berakhir',
      daysLeft: 0,
      category: 'Pendidikan',
      reportStatus: 'Belum Lapor',
      canWithdraw: false,
      hasReport: false,
      withdrawn: true,
      withdrawnDate: '2025-01-20T14:20:00',
      withdrawalReported: false,
      withdrawalOrder: 2
    },
    // Campaign 3: Ready to withdraw but BLOCKED (needs Campaign 2 report first)
    {
      id: 10,
      title: 'Renovasi Masjid Al-Ikhlas',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      collected: 25000000,
      target: 25000000,
      donors: 156,
      status: 'Berakhir',
      daysLeft: 0,
      category: 'Sosial',
      reportStatus: 'Disetujui',
      canWithdraw: true,
      hasReport: true,
      withdrawn: false,
      withdrawnDate: null,
      withdrawalReported: false,
      withdrawalOrder: 3
    },
    // NEW Campaign 4: Ready to withdraw - DIRECT ACCESS (no blocking, withdrawalOrder comes before unreported withdrawal)
    {
      id: 11,
      title: 'Operasi Jantung untuk Bayi Raffa',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      collected: 75000000,
      target: 75000000,
      donors: 523,
      status: 'Berakhir',
      daysLeft: 0,
      category: 'Medis',
      reportStatus: 'Disetujui',
      canWithdraw: true,
      hasReport: true,
      withdrawn: false,
      withdrawnDate: null,
      withdrawalReported: false,
      withdrawalOrder: 1.5
    },
    // Campaign 5: Ready to withdraw - Need to submit report first
    {
      id: 12,
      title: 'Bantu Adik Zahra Melawan Leukemia',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      collected: 120000000,
      target: 120000000,
      donors: 687,
      status: 'Berakhir',
      daysLeft: 0,
      category: 'Medis',
      reportStatus: 'Belum Lapor',
      canWithdraw: false,
      hasReport: false,
      withdrawn: false,
      withdrawnDate: null,
      withdrawalReported: false,
      withdrawalOrder: 4
    },
    // Campaign 6: Ready to withdraw - Need to submit report first
    {
      id: 13,
      title: 'Beasiswa S1 untuk Anak Yatim Berprestasi',
      image: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp',
      collected: 45000000,
      target: 45000000,
      donors: 298,
      status: 'Berakhir',
      daysLeft: 0,
      category: 'Pendidikan',
      reportStatus: 'Belum Lapor',
      canWithdraw: false,
      hasReport: false,
      withdrawn: false,
      withdrawnDate: null,
      withdrawalReported: false,
      withdrawalOrder: 5
    },
    // Campaign 7: Ready to withdraw - Need to submit report first
    {
      id: 14,
      title: 'Pembangunan Sumur Bor untuk Desa Terpencil',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      collected: 35000000,
      target: 35000000,
      donors: 234,
      status: 'Berakhir',
      daysLeft: 0,
      category: 'Sosial',
      reportStatus: 'Belum Lapor',
      canWithdraw: false,
      hasReport: false,
      withdrawn: false,
      withdrawnDate: null,
      withdrawalReported: false,
      withdrawalOrder: 6
    },
    // Campaign 8: Ready to withdraw - Need to submit report first
    {
      id: 15,
      title: 'Operasi Tulang Belakang Pak Ahmad',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      collected: 95000000,
      target: 95000000,
      donors: 512,
      status: 'Berakhir',
      daysLeft: 0,
      category: 'Medis',
      reportStatus: 'Belum Lapor',
      canWithdraw: false,
      hasReport: false,
      withdrawn: false,
      withdrawnDate: null,
      withdrawalReported: false,
      withdrawalOrder: 7
    },
    // Campaign 9: Ready to withdraw - Need to submit report first
    {
      id: 16,
      title: 'Renovasi Gedung Sekolah Dasar Negeri 05',
      image: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp',
      collected: 80000000,
      target: 80000000,
      donors: 445,
      status: 'Berakhir',
      daysLeft: 0,
      category: 'Pendidikan',
      reportStatus: 'Belum Lapor',
      canWithdraw: false,
      hasReport: false,
      withdrawn: false,
      withdrawnDate: null,
      withdrawalReported: false,
      withdrawalOrder: 8
    },
    // Campaign 10: Ready to withdraw - Need to submit report first
    {
      id: 17,
      title: 'Santunan untuk Keluarga Korban Kebakaran',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      collected: 55000000,
      target: 55000000,
      donors: 367,
      status: 'Berakhir',
      daysLeft: 0,
      category: 'Sosial',
      reportStatus: 'Belum Lapor',
      canWithdraw: false,
      hasReport: false,
      withdrawn: false,
      withdrawnDate: null,
      withdrawalReported: false,
      withdrawalOrder: 9
    },
    // Aktif campaigns
    {
      id: 1,
      title: 'Renovasi Sekolah Dasar di Daerah Terpencil',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      collected: 3500000,
      target: 50000000,
      donors: 42,
      status: 'Aktif',
      daysLeft: 45,
      category: 'Sosial',
      reportStatus: null,
      canWithdraw: false,
      hasReport: false
    },
    {
      id: 2,
      title: 'Bantu Anak Yatim untuk Melanjutkan Sekolah',
      image: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp',
      collected: 2000000,
      target: 40000000,
      donors: 28,
      status: 'Aktif',
      daysLeft: 38,
      category: 'Pendidikan',
      reportStatus: null,
      canWithdraw: false,
      hasReport: false
    },
    {
      id: 3,
      title: 'Hawari Berjuang dengan Selang di Hidung - Butuh Operasi Segera',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      collected: 15750000,
      target: 50000000,
      donors: 127,
      status: 'Aktif',
      daysLeft: 42,
      category: 'Medis',
      reportStatus: null,
      canWithdraw: false,
      hasReport: false
    },
    {
      id: 4,
      title: 'Bantuan Operasi untuk Kakek Aminuddin',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      collected: 18000000,
      target: 60000000,
      donors: 145,
      status: 'Aktif',
      daysLeft: 40,
      category: 'Medis',
      reportStatus: null,
      canWithdraw: false,
      hasReport: false
    },
    {
      id: 5,
      title: 'Program Beasiswa Anak Berprestasi',
      image: '/dashboard/wujudkan-mimpi-anak-pelosok-1756351894-334.webp',
      collected: 22000000,
      target: 35000000,
      donors: 167,
      status: 'Aktif',
      daysLeft: 30,
      category: 'Pendidikan',
      reportStatus: null,
      canWithdraw: false,
      hasReport: false
    },
    {
      id: 6,
      title: 'Pembangunan Perpustakaan Desa',
      image: '/dashboard/hawari-berjuang-dengan-selang-di-hidung-1756370366-572.webp',
      collected: 28000000,
      target: 45000000,
      donors: 198,
      status: 'Aktif',
      daysLeft: 33,
      category: 'Sosial',
      reportStatus: null,
      canWithdraw: false,
      hasReport: false
    },
    {
      id: 7,
      title: 'Bantu Ibu Siti Melawan Kanker Payudara Stadium 3',
      image: '/dashboard/temani-mimpi-pejuang-pelosok-1756798332-465.webp',
      collected: 68000000,
      target: 80000000,
      donors: 342,
      status: 'Aktif',
      daysLeft: 25,
      category: 'Medis',
      reportStatus: null,
      canWithdraw: false,
      hasReport: false
    }
  ]);

  // Filter campaigns for dropdown (real-time search)
  const dropdownFilteredCampaigns = searchQuery
    ? campaigns.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Check if we have any search results for dropdown
  const hasDropdownResults = dropdownFilteredCampaigns.length > 0;

  // Filter campaigns based on active filter and search query
  const getFilteredCampaigns = () => {
    let filtered = campaigns;

    // Apply filter
    if (activeFilter === 'Perlu Laporan') {
      filtered = filtered.filter(c => c.reportStatus === 'Belum Lapor');
    } else if (activeFilter === 'Siap Dicairkan') {
      filtered = filtered.filter(c => c.reportStatus === 'Disetujui' && !c.withdrawn);
    } else if (activeFilter === 'Sudah Dicairkan') {
      filtered = filtered.filter(c => c.withdrawn === true);
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort campaigns by priority:
    // 1. Cairkan Dana (reportStatus === 'Disetujui' && !withdrawn)
    // 2. Buat Laporan (reportStatus === 'Belum Lapor')
    // 3. Others (Lihat Berita, etc.)
    filtered.sort((a, b) => {
      const getPriority = (campaign) => {
        // Priority 1: Can withdraw (Disetujui and not withdrawn)
        if (campaign.reportStatus === 'Disetujui' && !campaign.withdrawn) return 1;
        // Priority 2: Needs report (Belum Lapor)
        if (campaign.reportStatus === 'Belum Lapor') return 2;
        // Priority 3: Others (already withdrawn, in review, etc.)
        return 3;
      };

      const priorityA = getPriority(a);
      const priorityB = getPriority(b);

      // Sort by priority first
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      // If same priority, sort by withdrawalOrder
      return (a.withdrawalOrder || 999) - (b.withdrawalOrder || 999);
    });

    return filtered;
  };

  const filteredCampaigns = getFilteredCampaigns();

  // Check if there are unreported withdrawals blocking new withdrawals
  const checkUnreportedWithdrawals = (currentCampaign) => {
    // Find all campaigns that were withdrawn before this one
    const previousWithdrawals = campaigns.filter(c =>
      c.withdrawn &&
      c.withdrawalOrder < currentCampaign.withdrawalOrder &&
      !c.withdrawalReported
    );

    if (previousWithdrawals.length > 0) {
      // Sort by order and return the first unreported one
      const blockingCampaign = previousWithdrawals.sort((a, b) => a.withdrawalOrder - b.withdrawalOrder)[0];
      return {
        canWithdraw: false,
        blockingCampaign: blockingCampaign
      };
    }

    return {
      canWithdraw: true,
      blockingCampaign: null
    };
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleCreateReport = (campaign) => {
    // Navigate to report creation page
    navigate('/laporan-pencairan', { state: { campaign } });
  };

  const handleViewReport = (campaign) => {
    // Navigate to view report page
    navigate('/detail-laporan-pencairan', { state: { campaign } });
  };

  const handleWithdraw = (campaign) => {
    // Only accessible if report is approved
    if (campaign.reportStatus === 'Disetujui') {
      // Special case: Campaign with withdrawalOrder < 1 can withdraw without checking
      if (campaign.withdrawalOrder < 1) {
        // Allow direct withdrawal for priority campaigns
        navigate('/detail-pencairan-dana', { state: { campaign } });
        return;
      }

      // For other campaigns, check if there are ANY unreported campaigns
      const allUnreported = campaigns.filter(c =>
        c.status === 'Berakhir' &&
        c.reportStatus === 'Belum Lapor'
      ).sort((a, b) => a.withdrawalOrder - b.withdrawalOrder);

      if (allUnreported.length > 0) {
        // Show modal with ALL unreported campaigns that need reports first
        setUnreportedCampaigns(allUnreported);
        setShowBlockModal(true);
      } else {
        // Allow withdrawal
        navigate('/detail-pencairan-dana', { state: { campaign } });
      }
    }
  };

  const getReportStatusBadge = (reportStatus) => {
    const badges = {
      'Belum Lapor': { text: 'Belum Lapor', class: 'report-status-not-reported' },
      'Dalam Review': { text: 'Dalam Review', class: 'report-status-reviewing' },
      'Disetujui': { text: 'Laporan Disetujui', class: 'report-status-approved' },
      'Ditolak': { text: 'Laporan Ditolak', class: 'report-status-rejected' },
      'Dilaporkan': { text: 'Sudah Dilaporkan', class: 'report-status-reported' }
    };
    return badges[reportStatus] || null;
  };

  const getActionButton = (campaign) => {
    if (campaign.status === 'Aktif') {
      return {
        text: 'Buat Laporan',
        disabled: true,
        className: 'btn-report-disabled',
        tooltip: 'Campaign masih berjalan',
        onClick: null
      };
    }

    // Campaign has ended (Berakhir)
    if (campaign.reportStatus === 'Belum Lapor') {
      return {
        text: 'Buat Laporan',
        disabled: false,
        className: 'btn-create-report',
        tooltip: null,
        onClick: () => handleCreateReport(campaign)
      };
    }

    if (campaign.reportStatus === 'Dalam Review') {
      return {
        text: 'Lihat Laporan',
        disabled: false,
        className: 'btn-view-report',
        tooltip: 'Laporan sedang direview admin',
        onClick: () => handleViewReport(campaign)
      };
    }

    if (campaign.reportStatus === 'Ditolak') {
      return {
        text: 'Revisi Laporan',
        disabled: false,
        className: 'btn-revise-report',
        tooltip: 'Perbaiki laporan berdasarkan catatan admin',
        onClick: () => handleCreateReport(campaign)
      };
    }

    if (campaign.reportStatus === 'Disetujui') {
      return {
        text: 'Cairkan Dana',
        disabled: false,
        className: 'btn-withdraw-approved',
        tooltip: null,
        onClick: () => handleWithdraw(campaign)
      };
    }

    if (campaign.reportStatus === 'Dilaporkan') {
      return {
        text: 'Lihat Berita',
        disabled: false,
        className: 'btn-view-news',
        tooltip: null,
        onClick: () => navigate('/berita-pencairan', { state: { campaign } })
      };
    }

    return null;
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
              Untuk mencairkan dana campaign yang telah berakhir, Anda harus melaporkan penggunaan dana terlebih dahulu. Laporan akan direview oleh admin sebelum pencairan dapat dilakukan.
            </p>
          </div>

          {/* Info Box */}
          <div className="info-box-pencairan">
            <svg className="info-icon-pencairan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="info-text-pencairan">
              <strong>Alur Pencairan:</strong> Campaign Berakhir → Buat Laporan → Review Admin → Pencairan Dana. Dana akan ditransfer dalam waktu 2-3 hari kerja setelah pengajuan pencairan disetujui.
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-wrapper-pencairan">
            <div className="search-container-pencairan">
              <svg className="search-icon-pencairan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                className="search-input-pencairan"
                placeholder="Cari campaign..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="search-clear-pencairan"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {searchQuery && (
              <div className="search-dropdown-pencairan">
                {hasDropdownResults ? (
                  <>
                    {/* Campaign Results */}
                    <div className="search-results-section-pencairan">
                      <div className="search-section-title-pencairan">Campaign ({dropdownFilteredCampaigns.length})</div>
                      {dropdownFilteredCampaigns.slice(0, 5).map((campaign) => (
                        <button
                          key={campaign.id}
                          className="search-result-item-pencairan"
                          onClick={() => {
                            setSearchQuery(campaign.title);
                          }}
                        >
                          <div className="search-result-campaign-icon-pencairan">
                            <img
                              src={campaign.image}
                              alt={campaign.title}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                          <div className="search-result-info-pencairan">
                            <div className="search-result-title-pencairan">{campaign.title}</div>
                            <div className="search-result-meta-pencairan">
                              <span className="search-result-category-pencairan" style={{ color: getCategoryColor(campaign.category) }}>
                                {campaign.category}
                              </span>
                              <span className="search-result-separator-pencairan">•</span>
                              <span className="search-result-status-pencairan">{campaign.status}</span>
                            </div>
                          </div>
                          <svg className="search-result-arrow-pencairan" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      ))}
                      {dropdownFilteredCampaigns.length > 5 && (
                        <div className="search-more-results-pencairan">
                          +{dropdownFilteredCampaigns.length - 5} campaign lainnya
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="search-no-results-pencairan">
                    <svg className="search-no-results-icon-pencairan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="search-no-results-text-pencairan">Tidak ada campaign yang cocok</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Filter Pills */}
          <div className="filters-container-pencairan">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-pill-pencairan ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Campaign List */}
          <div className="campaigns-list">
            <h3 className="campaigns-section-title">
              {activeFilter === 'Semua' ? 'Semua Campaign' : activeFilter} ({filteredCampaigns.length})
            </h3>

            {filteredCampaigns.length === 0 ? (
              <div className="empty-state-pencairan">
                <svg className="empty-icon-pencairan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="empty-text-pencairan">Tidak ada campaign yang sesuai dengan filter</p>
              </div>
            ) : (
              filteredCampaigns.map((campaign) => (
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
                  <div className="campaign-header-row">
                    <h4 className="campaign-title-pencairan">{campaign.title}</h4>
                    {/* Status Badges */}
                    <div className="status-badges-row">
                      {campaign.withdrawn ? (
                        <span className="withdrawal-badge withdrawn">
                          Dana Sudah Dicairkan
                        </span>
                      ) : (
                        campaign.status === 'Berakhir' && (
                          <span className="withdrawal-badge not-withdrawn">
                            Dana Belum Dicairkan
                          </span>
                        )
                      )}
                      {campaign.reportStatus && (
                        <span className={`report-badge ${getReportStatusBadge(campaign.reportStatus)?.class}`}>
                          {getReportStatusBadge(campaign.reportStatus)?.text}
                        </span>
                      )}
                    </div>
                  </div>

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
                      <span>{campaign.status === 'Berakhir' ? 'Telah berakhir' : `${campaign.daysLeft} hari lagi`}</span>
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

                  {/* Action Button (Dynamic based on status) */}
                  {(() => {
                    const actionBtn = getActionButton(campaign);
                    if (!actionBtn) return null;

                    return actionBtn.tooltip ? (
                      <div className="btn-wrapper">
                        <button
                          className={actionBtn.className}
                          onClick={actionBtn.onClick}
                          disabled={actionBtn.disabled}
                        >
                          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {actionBtn.className.includes('report') ? (
                              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                            ) : (
                              <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
                            )}
                          </svg>
                          {actionBtn.text}
                        </button>
                        {actionBtn.tooltip && <div className="btn-tooltip">{actionBtn.tooltip}</div>}
                      </div>
                    ) : (
                      <button
                        className={actionBtn.className}
                        onClick={actionBtn.onClick}
                        disabled={actionBtn.disabled}
                      >
                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          {actionBtn.className.includes('report') ? (
                            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                          ) : (
                            <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
                          )}
                        </svg>
                        {actionBtn.text}
                      </button>
                    );
                  })()}
                </div>
              </div>
              ))
            )}
          </div>

          {/* Back Button */}
          <button type="button" className="btn-pencairan secondary" onClick={handleBack}>
            Kembali ke Dashboard
          </button>
        </div>
      </div>

      {/* Blocking Modal - Shows ALL Unreported Campaigns */}
      {showBlockModal && unreportedCampaigns.length > 0 && (
        <div className="modal-overlay" onClick={() => setShowBlockModal(false)}>
          <div className="modal-content-unreported" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header-unreported">
              <div className="modal-icon-warning">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="modal-title">Laporan Campaign Diperlukan</h3>
              <button className="modal-close-btn" onClick={() => setShowBlockModal(false)}>✕</button>
            </div>

            {/* Modal Message */}
            <div className="modal-body-unreported">
              <p className="modal-message-unreported">
                Anda memiliki <strong>{unreportedCampaigns.length} campaign</strong> yang belum dilaporkan. Harap buat laporan untuk campaign berikut sebelum melakukan pencairan dana:
              </p>

              {/* Unreported Campaigns List */}
              <div className="unreported-campaigns-list">
                {unreportedCampaigns.map((campaign, index) => (
                  <div key={campaign.id} className="unreported-campaign-item">
                    <div className="unreported-item-left">
                      <div className="unreported-item-number">{index + 1}</div>
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="unreported-item-image"
                      />
                      <div className="unreported-item-info">
                        <div className="unreported-item-title">{campaign.title}</div>
                        <div className="unreported-item-meta">
                          <span className={`category-badge-${campaign.category.toLowerCase()}`}>
                            {campaign.category}
                          </span>
                          <span className="unreported-item-amount">
                            Rp {campaign.collected.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn-create-report-modal"
                      onClick={() => {
                        setShowBlockModal(false);
                        navigate('/laporan-pencairan', { state: { campaign } });
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '18px', height: '18px'}}>
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Buat Laporan
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer-unreported">
              <button className="btn-modal-close" onClick={() => setShowBlockModal(false)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PencairanDana;
