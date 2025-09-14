import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/TargetDonasi.css';

const TargetDonasi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [fundUsage, setFundUsage] = useState('');

  // Get data from previous steps
  const previousData = location.state || {};

  const durationOptions = [
    { id: 'duration-30', value: '30', label: '30 hari' },
    { id: 'duration-60', value: '60', label: '60 hari' },
    { id: 'duration-120', value: '120', label: '120 hari' },
    { id: 'duration-custom', value: 'custom', label: 'pilih tanggal' }
  ];

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value) {
      value = parseInt(value).toLocaleString('id-ID');
    }
    setAmount(value);
  };

  const handleDurationChange = (value) => {
    setDuration(value);
  };

  const handleNext = () => {
    if (isFormValid) {
      navigate('/judul-kampanye', {
        state: {
          ...previousData,
          targetData: {
            amount,
            duration,
            fundUsage
          }
        }
      });
    }
  };

  const handleBack = () => {
    navigate('/riwayat-medis', { state: previousData });
  };

  const handleSaveAndContinueLater = () => {
    navigate('/dashboard');
  };

  // Form validation
  const isFormValid = amount.trim() !== '' && duration !== '' && fundUsage.trim() !== '';

  const steps = [
    { number: 1, label: 'Pasien', active: false },
    { number: 2, label: 'Data diri', active: false },
    { number: 3, label: 'Penerima', active: false },
    { number: 4, label: 'Target donasi', active: true },
    { number: 5, label: 'Judul', active: false },
    { number: 6, label: 'Cerita', active: false },
    { number: 7, label: 'Ajakan', active: false }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Bantuan Medis & Kesehatan</div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Form Section */}
      <div className="modern-card">
        {/* Target Amount */}
        <div className="form-group-modern">
          <h2 className="modern-subheading">Tentukan perkiraan biaya yang dibutuhkan</h2>
          <div className="amount-group-modern">
            <span className="currency-prefix-modern">Rp</span>
            <input 
              type="text" 
              className="amount-input-modern" 
              placeholder="Masukkan jumlah kebutuhan biaya"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
        </div>

        {/* Campaign Duration */}
        <div className="form-group-modern">
          <h2 className="modern-subheading">Tentukan lama galang dana berlangsung</h2>
          
          <div className="duration-grid-modern">
            {durationOptions.map((option) => (
              <label 
                key={option.id}
                className={`duration-option-modern ${duration === option.value ? 'selected' : ''}`}
                onClick={() => handleDurationChange(option.value)}
              >
                <input 
                  type="radio" 
                  name="duration" 
                  value={option.value}
                  checked={duration === option.value}
                  onChange={() => handleDurationChange(option.value)}
                />
                <span className="duration-label-modern">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fund Usage Details */}
        <div className="form-group-modern">
          <label className="form-label-modern">Isi rincian penggunaan dana</label>
          <p className="modern-text small" style={{marginBottom: '16px'}}>Ceritakan secara lengkap rencana penggunaan dana yang didapat dari galang dana ini</p>
          <textarea 
            className="modern-textarea" 
            placeholder="Contoh: Biaya membeli vitamin Rp2.000.000, biaya rawat inap 10 hari Rp5.000.000, biaya operasi katup jantung Rp20.000.000"
            value={fundUsage}
            onChange={(e) => setFundUsage(e.target.value)}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-modern">
        <button className="modern-btn secondary" onClick={handleBack}>
          ← Sebelumnya
        </button>
        <button className="modern-btn" onClick={handleNext}>
          Selanjutnya →
        </button>
      </div>
      <button className="save-continue-modern">Simpan dan lanjutkan nanti</button>
    </div>
  );
};

export default TargetDonasi;