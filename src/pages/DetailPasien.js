import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/DetailPasien.css';

const DetailPasien = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPatient = location.state?.selectedPatient;
  const [phoneNumber, setPhoneNumber] = useState('628312412312');
  const [selectedBankOptions, setSelectedBankOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [agreements, setAgreements] = useState({
    agreement1: true,
    agreement2: true,
    agreement3: true,
    agreement4: true
  });


  const bankOptions = [
    { id: 'patient-direct', label: 'Pasien langsung' },
    { 
      id: 'family-same-kk', 
      label: 'Keluarga satu KK',
      info: 'Nama pemilik rekening harus tertera di Kartu Keluarga (KK) pasien atau tertera di akta kelahiran/Surat Keterangan Lahir (SKL) pasien jika pasien baru lahir atau belum ada KK.'
    },
    { 
      id: 'family-diff-kk', 
      label: 'Keluarga inti berbeda KK',
      info: 'Harus terdapat penghubung di antara KK pasien dan KK pemilik rekening (cth. ada nama orang tua yang sama, nama pemilik rekening merupakan orang tua pasien atau sebaliknya)'
    },
    { id: 'hospital', label: 'Rumah sakit' },
    { 
      id: 'others', 
      label: 'Selain pilihan di atas',
      info: 'Memerlukan surat kuasa bahwa pasien setuju atas penggunaan rekening ini serta foto pasien dan pemilik rekening sedang memegang surat kuasa yang bersangkutan.'
    }
  ];

  const handleCheckboxChange = (optionId) => {
    setSelectedBankOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  const handleNext = () => {
    navigate('/nama-pasien');
  };

  const handleAgreementChange = (agreementId) => {
    setAgreements(prev => ({
      ...prev,
      [agreementId]: !prev[agreementId]
    }));
  };

  const handleAcceptAgreement = () => {
    // Just close modal and go to next page - simple!
    setShowModal(false);
    navigate('/nama-pasien');
  };

  const handleBack = () => {
    navigate('/bantuan-medis');
  };

  const steps = [
    { number: 1, label: 'Pasien', active: false },
    { number: 2, label: 'Data diri', active: true },
    { number: 3, label: 'Penerima', active: false },
    { number: 4, label: 'Target donasi', active: false },
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
        <div className="logo white-text">Bantuan Medis & Kesehatan</div>
        <div className="header-spacer"></div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Main Content */}
      <div className="main-content-modern">
        <div className="form-section-modern">
          {/* Selected Patient */}
          {selectedPatient && (
            <div className="form-group-modern">
              <h2 className="modern-subheading">Siapa yang sakit?</h2>
              <div className="selected-option-modern">
                <span className="selected-text-modern">{selectedPatient.label}</span>
                <button className="change-btn-modern" onClick={() => navigate('/bantuan-medis')}>
                  Ubah
                </button>
              </div>
            </div>
          )}

          {/* Phone Number */}
          <div className="form-group-modern">
            <label className="form-label-modern">Masukkan no. ponsel kamu</label>
            <p className="form-description-modern">Seluruh notifikasi akan dikirim melalui nomor ini</p>
            <input 
              type="tel" 
              className="modern-input detail-input" 
              placeholder="628312412312" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-modern">
        <div className="nav-buttons-container">
          <button className="nav-btn-secondary" onClick={handleBack}>
            Sebelumnya
          </button>
          <button className="nav-btn-primary" onClick={handleNext}>
            Selanjutnya
          </button>
        </div>
      </div>

    </div>
  );
};

export default DetailPasien;