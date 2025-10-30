import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/TargetDonasiPendidikan.css';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const TargetDonasiSosial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [draftId, setDraftId] = useState(null);

  // Get data from previous steps
  const previousData = location.state || {};

  useEffect(() => {
    const currentDraftId = sessionStorage.getItem('current_draft_id');
    if (currentDraftId) {
      setDraftId(currentDraftId);
    } else {
      const newDraftId = generateDraftId();
      setDraftId(newDraftId);
      sessionStorage.setItem('current_draft_id', newDraftId);
    }
  }, []);

  const durationOptions = [
    { id: 'duration-30', value: '30', label: '30 hari' },
    { id: 'duration-60', value: '60', label: '60 hari' },
    { id: 'duration-120', value: '120', label: '120 hari' },
    { id: 'duration-custom', value: 'custom', label: 'Pilih Tanggal' }
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
    if (value !== 'custom') {
      setCustomDate('');
    }
  };

  const handleCustomDateChange = (e) => {
    setCustomDate(e.target.value);
  };

  const calculateDaysFromDate = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleNext = () => {
    if (isFormValid) {
      const finalDuration = duration === 'custom' ? calculateDaysFromDate(customDate).toString() : duration;
      navigate('/judul-kampanye-sosial', {
        state: {
          ...previousData,
          targetData: {
            amount,
            duration: finalDuration,
            customDate: duration === 'custom' ? customDate : null
          }
        }
      });
    }
  };

  const handleBack = () => {
    navigate('/penerima-sosial', { state: previousData });
  };

  const handleSaveAsDraft = () => {
    if (!draftId) return;

    const finalDuration = duration === 'custom' ? calculateDaysFromDate(customDate).toString() : duration;
    const rawAmount = amount.replace(/\./g, '');

    const draftData = {
      id: draftId,
      category: 'sosial',
      title: previousData.selectedCategory?.title || 'Draft Kegiatan Sosial',
      image: null,
      progress: 50,
      steps: '3 dari 6 tahap',
      lastStep: '/target-donasi-sosial',
      target: rawAmount ? parseInt(rawAmount) : 0,
      daysLeft: finalDuration ? parseInt(finalDuration) : 0,
      formData: {
        ...previousData,
        targetData: {
          amount,
          duration: finalDuration,
          customDate: duration === 'custom' ? customDate : null
        }
      },
      storyData: getCurrentPageData('sosial')
    };

    const saved = saveDraft(draftData);
    if (saved) {
      alert('Draft berhasil disimpan! Anda dapat melanjutkannya nanti dari Dashboard.');
      navigate('/dashboard');
    } else {
      alert('Gagal menyimpan draft. Silakan coba lagi.');
    }
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Form validation
  const isFormValid = amount.trim() !== '' && duration !== '' &&
    (duration !== 'custom' || (duration === 'custom' && customDate !== ''));

  const steps = [
    { number: 1, label: 'Tujuan', active: false },
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
        <div className="header-title white-text">Kegiatan Sosial</div>
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

            {/* Custom Date Picker - Only show when "Tentukan Sendiri" is selected */}
            {duration === 'custom' && (
              <div className="custom-date-picker-modern">
                <label className="date-label-modern">Pilih tanggal berakhir kampanye</label>
                <input
                  type="date"
                  className="date-input-modern"
                  value={customDate}
                  onChange={handleCustomDateChange}
                  min={getMinDate()}
                />
                {customDate && (
                  <p className="date-info-modern">
                    Kampanye akan berlangsung selama <strong>{calculateDaysFromDate(customDate)} hari</strong>
                  </p>
                )}
              </div>
            )}
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

      {/* Save as Draft Button */}
      <div className="draft-save-section">
        <button className="draft-save-btn" onClick={handleSaveAsDraft}>
          <svg className="draft-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="17 21 17 13 7 13 7 21" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="7 3 7 8 15 8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Simpan Sebagai Draft
        </button>
        <p className="draft-save-hint">Simpan progress Anda dan lanjutkan nanti dari Dashboard</p>
      </div>
    </div>
  );
};

export default TargetDonasiSosial;