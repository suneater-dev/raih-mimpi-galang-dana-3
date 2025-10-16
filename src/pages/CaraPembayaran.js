import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CaraPembayaran.css';

const CaraPembayaran = () => {
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(true);
  const [showTotalDropdown, setShowTotalDropdown] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handleSelectPayment = (method) => {
    console.log('Selected payment method:', method);
    setShowPaymentModal(false);
    // Navigate or handle payment method selection
  };

  const handleCopyVA = () => {
    navigator.clipboard.writeText('6810048766045682');
    alert('Nomor Virtual Account disalin!');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Cara Pembayaran</div>
      </header>

      {/* Content */}
      <div className="payment-details-content">
        {/* Virtual Account Section */}
        <div className="va-section">
          <div className="va-header">
            <h3>PERMATA VIRTUAL ACCOUNT</h3>
            <img src="/dashboard/permata-logo.png" alt="Permata" className="bank-logo" onError={(e) => e.target.style.display = 'none'} />
          </div>

          <div className="va-number-section">
            <label className="va-label">Nomor Virtual Account</label>
            <div className="va-number-container">
              <span className="va-number">6810048766045682</span>
              <button type="button" className="btn-copy" onClick={handleCopyVA}>Salin</button>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="payment-summary">
          <div className="summary-row">
            <span className="summary-label">Komitmen Donasi</span>
            <span className="summary-value">Rp. 300.000</span>
          </div>

          <div className="summary-row highlight">
            <span className="summary-label">
              Biaya VA <span className="info-icon-red">⚠</span>
            </span>
            <span className="summary-value">Rp. 5.000</span>
          </div>

          <div className="summary-row total" onClick={() => setShowTotalDropdown(!showTotalDropdown)}>
            <span className="summary-label">
              Total Pembayaran <span className={`dropdown-arrow ${showTotalDropdown ? 'up' : 'down'}`}>▼</span>
            </span>
            <span className="summary-value-total">Rp. 305.000</span>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="payment-instructions">
          <div className="instruction-section">
            <div className="instruction-header" onClick={() => {}}>
              <span>ATM Permata</span>
              <span className="chevron">›</span>
            </div>
          </div>

          <div className="instruction-section">
            <div className="instruction-header" onClick={() => {}}>
              <span>Via bank lain</span>
              <span className="chevron">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Selection Modal */}
      {showPaymentModal && (
        <>
          <div className="modal-overlay" onClick={handleClosePaymentModal}></div>
          <div className="payment-selection-modal">
            <div className="payment-selection-header">
              <h3>Pilih E-Wallet</h3>
              <button type="button" className="close-btn" onClick={handleClosePaymentModal}>×</button>
            </div>
            <div className="payment-options-list">
              <button type="button" className="payment-option-btn" onClick={() => handleSelectPayment('ShopeePay')}>
                <div className="payment-option-content">
                  <div className="payment-logo-box shopee">
                    <span className="shopee-logo">S Pay</span>
                  </div>
                  <span className="payment-option-name">ShopeePay</span>
                </div>
              </button>
              <button type="button" className="payment-option-btn" onClick={() => handleSelectPayment('GoPay')}>
                <div className="payment-option-content">
                  <div className="payment-logo-box gopay">
                    <span className="gopay-logo">gopay</span>
                  </div>
                  <span className="payment-option-name">GoPay</span>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CaraPembayaran;
