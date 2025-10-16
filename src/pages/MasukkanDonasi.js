import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/MasukkanDonasi.css';

const MasukkanDonasi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const campaignData = location.state || {};

  const [selectedAmount, setSelectedAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('SHOPEE PAY');
  const [wantsReport, setWantsReport] = useState(false);
  const [wantsMessage, setWantsMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [accountHolderName, setAccountHolderName] = useState('');

  const quickAmounts = [
    { emoji: '😊', amount: 30000 },
    { emoji: '🤑', amount: 50000 },
    { emoji: '😂', amount: 100000 },
    { emoji: '🤑', amount: 200000 },
    { emoji: '😘', amount: 300000 },
    { emoji: '😍', amount: 500000 }
  ];

  const handleQuickAmount = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCustomAmount(value);
    setSelectedAmount(parseInt(value) || 0);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleChangePayment = () => {
    setShowModal(true);
  };

  const handleSelectBankTransfer = () => {
    setShowModal(false);
    setShowBankTransferModal(true);
    setPaymentMethod('Bank Transfer (Manual)');
  };

  const handleCloseBankTransferModal = () => {
    setShowBankTransferModal(false);
    setAccountHolderName('');
  };

  const handleConfirmBankTransfer = () => {
    if (accountHolderName.trim()) {
      setShowBankTransferModal(false);
      // Handle bank transfer confirmation
    }
  };

  const handleNext = () => {
    if (selectedAmount > 0) {
      navigate('/pembayaran-virtual-account', {
        state: {
          ...campaignData,
          amount: selectedAmount,
          paymentMethod,
          wantsReport,
          wantsMessage
        }
      });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  const isFormValid = selectedAmount > 0;

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Masukkan Donasi</div>
      </header>

      {/* Content */}
      <div className="donasi-content">
        {/* Quick Amount Buttons */}
        <div className="quick-amounts-grid">
          {quickAmounts.map((item, index) => (
            <button
              key={index}
              className={`quick-amount-btn ${selectedAmount === item.amount && !customAmount ? 'active' : ''}`}
              onClick={() => handleQuickAmount(item.amount)}
            >
              <span className="amount-emoji">{item.emoji}</span>
              <span className="amount-text">Rp{formatCurrency(item.amount)}</span>
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <div className="custom-amount-section">
          <label className="custom-amount-label">Nominal Lainnya</label>
          <div className="custom-amount-input-wrapper">
            <span className="currency-prefix">Rp</span>
            <input
              type="text"
              className="custom-amount-input"
              value={customAmount}
              onChange={handleCustomAmount}
              placeholder="0"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment-method-selector">
          <div className="payment-method-info">
            <div className="payment-logo-container">
              <img
                src="/dashboard/shopee-pay-logo.png"
                alt="ShopeePay"
                className="payment-logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'inline-block';
                }}
              />
              <span className="payment-logo-fallback" style={{ display: 'none' }}>🛒</span>
            </div>
            <span className="payment-method-name">{paymentMethod}</span>
          </div>
          <button className="change-payment-btn" onClick={handleChangePayment}>
            Ganti
          </button>
        </div>

        {/* Checkboxes */}
        <div className="donation-options">
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={wantsReport}
              onChange={(e) => setWantsReport(e.target.checked)}
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-label">
              Saya ingin mendapatkan laporan progress pengumpulan dan penyaluran campaign
            </span>
          </label>

          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={wantsMessage}
              onChange={(e) => setWantsMessage(e.target.checked)}
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-label">
              Saya ingin menyertakan doa dan dukungan
            </span>
          </label>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="bottom-action">
        <button
          className={`btn-lanjutkan ${!isFormValid ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={!isFormValid}
        >
          Lanjutkan Pembayaran
        </button>
      </div>

      {/* Payment Method Selection Modal */}
      {showModal && (
        <>
          <div className="modal-overlay"></div>
          <div className="payment-selection-modal">
            <div className="payment-selection-header">
              <h3>Pilih Metode Pembayaran</h3>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="payment-methods-list">
              <button type="button" className="payment-method-item" onClick={() => { setPaymentMethod('SHOPEE PAY'); setShowModal(false); }}>
                <div className="payment-method-content">
                  <div className="payment-logo-box-modal shopee">
                    <span className="shopee-logo-text">S Pay</span>
                  </div>
                  <span className="payment-method-text">ShopeePay</span>
                </div>
                <span className="chevron-arrow">›</span>
              </button>
              <button type="button" className="payment-method-item" onClick={() => { setPaymentMethod('GOPAY'); setShowModal(false); }}>
                <div className="payment-method-content">
                  <div className="payment-logo-box-modal gopay">
                    <span className="gopay-logo-text">gopay</span>
                  </div>
                  <span className="payment-method-text">GoPay</span>
                </div>
                <span className="chevron-arrow">›</span>
              </button>
              <button type="button" className="payment-method-item" onClick={handleSelectBankTransfer}>
                <div className="payment-method-content">
                  <div className="payment-logo-box-modal bank">
                    <span className="bank-icon">🏦</span>
                  </div>
                  <span className="payment-method-text">Bank Transfer (Manual Konfirmasi)</span>
                </div>
                <span className="chevron-arrow">›</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Bank Transfer Modal */}
      {showBankTransferModal && (
        <>
          <div className="modal-overlay"></div>
          <div className="bank-transfer-modal">
            <div className="bank-transfer-modal-content">
              <h3 className="bank-transfer-title">Nama Pemilik Rekening</h3>
              <p className="bank-transfer-message">
                Mohon isi nama lengkap <strong>sesuai dengan nama di rekening bank</strong> Anda.
                Ini diperlukan untuk memudahkan verifikasi donasi via transfer manual.
              </p>
              <input
                type="text"
                className="bank-transfer-input"
                placeholder="Contoh: Ahmad Prasetyo"
                value={accountHolderName}
                onChange={(e) => setAccountHolderName(e.target.value)}
              />
              <div className="bank-transfer-actions">
                <button type="button" className="btn-batal" onClick={handleCloseBankTransferModal}>
                  Batal
                </button>
                <button
                  type="button"
                  className={`btn-lanjutkan-modal ${!accountHolderName.trim() ? 'disabled' : ''}`}
                  onClick={handleConfirmBankTransfer}
                  disabled={!accountHolderName.trim()}
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MasukkanDonasi;
