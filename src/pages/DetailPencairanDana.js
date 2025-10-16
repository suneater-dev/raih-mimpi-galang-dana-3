import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/DetailPencairanDana.css';

const DetailPencairanDana = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const campaign = location.state?.campaign;

  const [activeTab, setActiveTab] = useState('rincian');

  // Sample breakdown data
  const donasiOnline = campaign?.collected || 40961000;
  const donasiOffline = 0;
  const operasionalFee = 2048050;
  const totalDonasi = donasiOnline + donasiOffline;
  const danaBisaDicairkan = totalDonasi - operasionalFee;
  const verifikasiMenunggu = 0;

  // Sample withdrawal history
  const [withdrawalHistory] = useState([
    {
      id: 1,
      date: '12 Feb 2025, 1:11 PM',
      amount: 30855399,
      bankName: 'YAYASAN ZILLENIAL AC',
      accountNumber: 'Mandiri - 1320090050080',
      status: 'Berhasil'
    }
  ]);

  const handleBack = () => {
    navigate('/pencairan-dana');
  };

  const handleCairkanDana = () => {
    navigate('/pengajuan-pencairan', { state: { danaBisaDicairkan } });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp');
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
      <div className="detail-pencairan-content">
        {/* Tabs */}
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === 'rincian' ? 'active' : ''}`}
            onClick={() => setActiveTab('rincian')}
          >
            Rincian
          </button>
          <button
            className={`tab-btn ${activeTab === 'riwayat' ? 'active' : ''}`}
            onClick={() => setActiveTab('riwayat')}
          >
            Riwayat
          </button>
        </div>

        {activeTab === 'rincian' && (
          <div className="rincian-content">
            {/* Total Donasi Card */}
            <div className="total-donasi-card">
              <div className="total-donasi-header">
                <div className="donasi-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="total-donasi-info">
                  <div className="total-donasi-label">Total Donasi</div>
                  <div className="total-donasi-subtitle">Donasi offline + online</div>
                </div>
              </div>
              <div className="total-donasi-amount">{formatCurrency(totalDonasi)}</div>
            </div>

            {/* Dana Dapat Dicairkan */}
            <div className="dana-dicairkan-card">
              <div className="dana-dicairkan-amount">{formatCurrency(danaBisaDicairkan)}</div>
              <div className="dana-dicairkan-label">Dana dapat dicairkan</div>
            </div>

            {/* Menunggu Verifikasi */}
            <div className="verifikasi-card">
              <div className="verifikasi-left">
                <span className="verifikasi-label">Menunggu Verifikasi</span>
                <span className="verifikasi-amount">{formatCurrency(verifikasiMenunggu)}</span>
              </div>
              <button className="lihat-detail-btn">Lihat Detail</button>
            </div>

            {/* Detail Dana Section */}
            <div className="detail-dana-section">
              <h3 className="section-title">Detail Dana</h3>

              {/* Donasi Online */}
              <div className="detail-item">
                <div className="detail-item-left">
                  <span className="detail-item-label">Donasi Online</span>
                  <button className="keterangan-btn">Keterangan biaya</button>
                </div>
                <span className="detail-item-amount">{formatCurrency(donasiOnline)}</span>
              </div>

              {/* Donasi Offline */}
              <div className="detail-item">
                <div className="detail-item-left">
                  <span className="detail-item-label">Donasi Offline</span>
                  <button className="keterangan-btn">Keterangan biaya</button>
                </div>
                <span className="detail-item-amount">{formatCurrency(donasiOffline)}</span>
              </div>

              {/* Donasi Operasional */}
              <div className="detail-item negative">
                <div className="detail-item-left">
                  <span className="detail-item-label">Donasi Operasional Yayasan Raih Mimpi 5%</span>
                  <button className="keterangan-btn">Keterangan biaya</button>
                </div>
                <span className="detail-item-amount negative">- {formatCurrency(operasionalFee)}</span>
              </div>
            </div>

            {/* Cairkan Dana Button */}
            <button className="btn-cairkan-dana" onClick={handleCairkanDana}>
              Cairkan Dana
            </button>
          </div>
        )}

        {activeTab === 'riwayat' && (
          <div className="riwayat-content">
            {/* Dana Dapat Dicairkan Summary */}
            <div className="riwayat-summary">
              <span className="riwayat-summary-label">Dana dapat dicairkan</span>
              <span className="riwayat-summary-amount">{formatCurrency(danaBisaDicairkan)}</span>
            </div>

            {/* Withdrawal History List */}
            <div className="withdrawal-history-list">
              {withdrawalHistory.length > 0 ? (
                withdrawalHistory.map((item) => (
                  <div key={item.id} className="withdrawal-history-card">
                    <div className="withdrawal-header">
                      <span className="withdrawal-date">{item.date}</span>
                      <span className={`withdrawal-status ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="withdrawal-amount">{formatCurrency(item.amount)}</div>
                    <div className="withdrawal-bank-info">
                      <div className="bank-name">{item.bankName}</div>
                      <div className="account-number">{item.accountNumber}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3>Belum Ada Riwayat</h3>
                  <p>Riwayat pencairan dana akan muncul di sini setelah Anda melakukan pencairan pertama.</p>
                </div>
              )}
            </div>

            {/* Cairkan Dana Button */}
            <button className="btn-cairkan-dana" onClick={handleCairkanDana}>
              Cairkan Dana
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPencairanDana;
