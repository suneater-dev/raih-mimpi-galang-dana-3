import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/TargetDonasiPendidikan.css';

const TargetDonasiKreatif = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');

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
      navigate('/judul-kampanye-kreatif', {
        state: {
          ...previousData,
          targetData: {
            amount,
            duration
          }
        }
      });
    }
  };

  const handleBack = () => {
    navigate('/penerima-kreatif', { state: previousData });
  };

  const handleSaveAndContinueLater = () => {
    navigate('/dashboard');
  };

  // Form validation
  const isFormValid = amount.trim() !== '' && duration !== '';

  const steps = [
    { number: 1, label: 'Tujuan', active: false },
    { number: 2, label: 'Penerima', active: false },
    { number: 3, label: 'Target donasi', active: true },
    { number: 4, label: 'Judul', active: false },
    { number: 5, label: 'Cerita', active: false },
    { number: 6, label: 'Ajakan', active: false }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Karya Kreatif & Modal Usaha</div>
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
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-modern">
        <button className="modern-btn secondary" onClick={handleBack}>
          ← Sebelumnya
        </button>
        <button
          className={`modern-btn ${!isFormValid ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={!isFormValid}
        >
          Selanjutnya →
        </button>
      </div>
      <button className="save-continue-modern">Simpan dan lanjutkan nanti</button>
    </div>
  );
};

export default TargetDonasiKreatif;
