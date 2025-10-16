import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PembayaranVirtualAccount.css';

const PembayaranVirtualAccount = () => {
  const navigate = useNavigate();
  const [showFeeModal, setShowFeeModal] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCloseFeeModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowFeeModal(false);
  };

  const handleChangePayment = (e) => {
    console.log('handleChangePayment clicked');
    e.preventDefault();
    e.stopPropagation();
    setShowFeeModal(false);
    setTimeout(() => {
      setShowPaymentModal(true);
    }, 100);
  };

  const handleClosePaymentModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowPaymentModal(false);
  };

  const handleSelectPayment = (method) => {
    console.log('Selected payment method:', method);
    setShowPaymentModal(false);
    // Handle payment method selection
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Pembayaran Virtual Account</div>
      </header>

      {/* Content */}
      <div className="payment-content">
        <div className="payment-info-card">
          <h2>Informasi Pembayaran</h2>
          <p>Silakan pilih metode pembayaran yang sesuai dengan kebutuhan Anda.</p>
        </div>
      </div>

      {/* Fee Info Modal */}
      {showFeeModal && (
        <>
          <div className="modal-overlay"></div>
          <div className="payment-modal">
            <div className="fee-info-modal-content">
              <p className="fee-info-message">
                Biaya yang dikenakan oleh penyedia layanan pembayaran. Ganti ke metode{' '}
                <span className="payment-brand">Gopay</span> atau{' '}
                <span className="payment-brand">ShopeePay</span> jika tidak ingin ada biaya.
              </p>
              <div className="fee-info-actions">
                <button type="button" className="btn-change-method" onClick={handleChangePayment}>
                  Ganti Metode Pembayaran
                </button>
                <button type="button" className="btn-close-fee-info" onClick={handleCloseFeeModal}>
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Payment Selection Modal */}
      {showPaymentModal && (
        <>
          <div className="modal-overlay"></div>
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
                <span className="chevron-arrow">›</span>
              </button>
              <button type="button" className="payment-option-btn" onClick={() => handleSelectPayment('GoPay')}>
                <div className="payment-option-content">
                  <div className="payment-logo-box gopay">
                    <span className="gopay-logo">gopay</span>
                  </div>
                  <span className="payment-option-name">GoPay</span>
                </div>
                <span className="chevron-arrow">›</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PembayaranVirtualAccount;
