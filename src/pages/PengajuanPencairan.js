import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/PengajuanPencairan.css';

const PengajuanPencairan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const danaBisaDicairkan = location.state?.danaBisaDicairkan || 7645020;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nominalPengajuan: '',
    keterangan: '',
    selectedAccount: null
  });
  const [errors, setErrors] = useState({});
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Sample bank accounts
  const [bankAccounts] = useState([
    {
      id: 1,
      initial: 'YZ',
      name: 'YAYASAN ZILLENIAL AC',
      bank: 'Mandiri',
      accountNumber: '1320090050080'
    }
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp');
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.nominalPengajuan.trim()) {
      newErrors.nominalPengajuan = 'Nominal pengajuan wajib diisi';
    } else {
      const nominal = parseInt(formData.nominalPengajuan.replace(/\D/g, ''));
      if (isNaN(nominal) || nominal <= 0) {
        newErrors.nominalPengajuan = 'Nominal tidak valid';
      } else if (nominal > danaBisaDicairkan) {
        newErrors.nominalPengajuan = `Nominal tidak boleh melebihi ${formatCurrency(danaBisaDicairkan)}`;
      }
    }

    if (!formData.keterangan.trim()) {
      newErrors.keterangan = 'Keterangan penggunaan dana wajib diisi';
    } else if (formData.keterangan.length < 20) {
      newErrors.keterangan = 'Keterangan minimal 20 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectAccount = (accountId) => {
    setFormData(prev => ({
      ...prev,
      selectedAccount: accountId
    }));
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.selectedAccount) {
        alert('Silakan pilih rekening penerima');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!agreedToTerms) {
      alert('Anda harus menyetujui Syarat & Ketentuan Campaign terlebih dahulu');
      return;
    }
    // Navigate to success page (to be created)
    navigate('/pengajuan-pencairan-berhasil');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Pengajuan Pencairan</div>
      </header>

      {/* Content */}
      <div className="pengajuan-content">
        {/* Dana Summary */}
        <div className="dana-summary-pengajuan">
          <span className="dana-summary-label">Dana dapat dicairkan</span>
          <span className="dana-summary-amount">{formatCurrency(danaBisaDicairkan)}</span>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps-pengajuan">
          <div className={`step-item-pengajuan ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <div className="step-circle-pengajuan">1</div>
            <div className="step-label-pengajuan">Detail</div>
          </div>
          <div className={`step-line-pengajuan ${currentStep > 1 ? 'active' : ''}`}></div>
          <div className={`step-item-pengajuan ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <div className="step-circle-pengajuan">2</div>
            <div className="step-label-pengajuan">Rekening</div>
          </div>
          <div className={`step-line-pengajuan ${currentStep > 2 ? 'active' : ''}`}></div>
          <div className={`step-item-pengajuan ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-circle-pengajuan">3</div>
            <div className="step-label-pengajuan">Summary</div>
          </div>
        </div>

        {/* Form Content */}
        <div className="form-content-pengajuan">
          {/* Step 1: Detail */}
          {currentStep === 1 && (
            <div className="step-form">
              {/* Nominal Pengajuan */}
              <div className="form-group-pengajuan">
                <label className="form-label-pengajuan">
                  Nominal Pengajuan <span className="required-star">*</span>
                </label>
                <div className="input-with-prefix">
                  <span className="input-prefix">Rp</span>
                  <input
                    type="text"
                    name="nominalPengajuan"
                    value={formData.nominalPengajuan}
                    onChange={handleInputChange}
                    className={`form-input-pengajuan with-prefix ${errors.nominalPengajuan ? 'error' : ''}`}
                    placeholder="0"
                  />
                </div>
                {errors.nominalPengajuan && <span className="error-text-pengajuan">{errors.nominalPengajuan}</span>}
              </div>

              {/* Keterangan Penggunaan Dana */}
              <div className="form-group-pengajuan">
                <label className="form-label-pengajuan">
                  Keterangan Penggunaan Dana xxx <span className="required-star">*</span>
                </label>
                <textarea
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                  className={`form-textarea-pengajuan ${errors.keterangan ? 'error' : ''}`}
                  placeholder="Tulis bagaimana penggunaan dana ini didialogkan. Penggunaan dana ini akan muncul di halaman galang dana kamu."
                  rows="6"
                ></textarea>
                {errors.keterangan && <span className="error-text-pengajuan">{errors.keterangan}</span>}
              </div>
            </div>
          )}

          {/* Step 2: Rekening */}
          {currentStep === 2 && (
            <div className="step-form">
              <h3 className="rekening-title">Rekening Penerima</h3>

              {bankAccounts.map((account) => (
                <div
                  key={account.id}
                  className={`bank-account-card ${formData.selectedAccount === account.id ? 'selected' : ''}`}
                  onClick={() => handleSelectAccount(account.id)}
                >
                  <div className="account-initial">{account.initial}</div>
                  <div className="account-details">
                    <div className="account-name">{account.name}</div>
                    <div className="account-number">{account.bank} - {account.accountNumber}</div>
                  </div>
                  <div className="account-radio">
                    {formData.selectedAccount === account.id && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Summary & Agreement */}
          {currentStep === 3 && (
            <div className="step-form">
              {/* Informasi Pencair Dana */}
              <div className="info-section">
                <h3 className="info-section-title">Informasi Pencair Dana</h3>
                <div className="account-info-card">
                  <div className="account-avatar">
                    {bankAccounts[0]?.initial || 'YZ'}
                  </div>
                  <div className="account-info-details">
                    <div className="account-info-name">{bankAccounts[0]?.name || 'YAYASAN ZILLENIAL AC'} | {bankAccounts[0]?.accountNumber || '082121392363'}</div>
                    <div className="account-info-email">zillenialachon@gmail.com</div>
                  </div>
                </div>
              </div>

              {/* Mencairkan donasi untuk halaman galang dana */}
              <div className="campaign-summary-section">
                <h3 className="campaign-summary-title">Mencairkan donasi untuk halaman galang dana</h3>

                <div className="summary-detail-list">
                  <div className="summary-detail-item">
                    <span className="summary-detail-label">Judul</span>
                    <span className="summary-detail-separator">:</span>
                    <span className="summary-detail-value">Bangun Rumah Layak untuk Anak Difabel</span>
                  </div>

                  <div className="summary-detail-item">
                    <span className="summary-detail-label">URL</span>
                    <span className="summary-detail-separator">:</span>
                    <span className="summary-detail-value">raihmimpi.com/bangunrumahlayakuntukanak/difabel</span>
                  </div>

                  <div className="summary-detail-item">
                    <span className="summary-detail-label">Nominal</span>
                    <span className="summary-detail-separator">:</span>
                    <span className="summary-detail-value highlight-amount">Rp. {formData.nominalPengajuan || '100.000'}</span>
                  </div>

                  <div className="summary-detail-item">
                    <span className="summary-detail-label">Penerima</span>
                    <span className="summary-detail-separator">:</span>
                    <span className="summary-detail-value">{bankAccounts[0]?.name || 'YAYASAN ZILLENIAL AC'}</span>
                  </div>

                  <div className="summary-detail-item full-width">
                    <span className="summary-detail-label">Keterangan Penggunaan Dana :</span>
                  </div>
                  <div className="summary-detail-keterangan">
                    {formData.keterangan || 'test'}
                  </div>
                </div>
              </div>

              <h3 className="menyetujui-title">Menyetujui</h3>

              <ol className="agreement-list">
                <li>
                  Melaksanakan segala perencanaan, dan ketentuan yang terdapat dalam deskripsi halaman galang dana yang dibuat oleh saya sendiri selaku penggalang dana.
                </li>
                <li>
                  Menjaga hubungan baik dengan seluruh donatur yaitu dengan melaksanakan serangkaian proses update pada semua halaman galang dana yang saya buat atau halaman yang saya kelola. Serta melakukan pencairan donasi selanjutnya apabila syarat ini tidak dipenuhi.
                </li>
                <li>
                  Memberikan segala dokumen dan informasi yang benar, masih berlaku, dan sah secara hukum. Apabila di kemudian hari ditemukan bahwa dokumen atau informasi yang saya berikan tidak benar atau tidak sah, maka saya bersedia dikenakan sanksi dan/atau pidana sesuai dengan ketentuan dan peraturan perundang-undangan yang berlaku.
                </li>
                <li>
                  Apabila di kemudian hari ada hal yang saya sampaikan pada halaman campaign namun tidak sesuai dengan kenyataan, maka saya bersedia untuk menerima sanksi sesuai dengan syarat dan ketentuan yang berlaku di situs Raih Mimpi.
                </li>
              </ol>

              {/* Checkbox Agreement */}
              <div className="checkbox-agreement">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <span className="checkbox-checkmark"></span>
                  <span className="checkbox-label">
                    Saya setuju dengan <button type="button" className="link-button" onClick={() => setShowTermsModal(true)}>Syarat & Ketentuan Campaign</button> di Raih Mimpi.
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons-pengajuan">
          {currentStep > 1 && (
            <button className="btn-pengajuan secondary" onClick={handlePrevious}>
              Kembali
            </button>
          )}
          {currentStep < 3 ? (
            <button className="btn-pengajuan primary" onClick={handleNext}>
              Selanjutnya
            </button>
          ) : (
            <button className="btn-pengajuan primary" onClick={handleSubmit}>
              Ajukan Pencairan
            </button>
          )}
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Syarat dan Ketentuan Pencairan Dana</h3>
              <button className="modal-close" onClick={() => setShowTermsModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <h4>1. Ketentuan Umum Pencairan Dana</h4>
              <p>Setiap penggalang dana dapat mengajukan pencairan dana yang telah terkumpul dengan memenuhi syarat dan ketentuan yang berlaku. Dana yang dapat dicairkan adalah dana yang telah melewati masa verifikasi dan dikurangi dengan biaya operasional platform.</p>

              <h4>2. Persyaratan Pencairan</h4>
              <ul>
                <li>Penggalang dana harus melengkapi dokumen verifikasi identitas</li>
                <li>Rekening bank penerima harus atas nama penggalang dana atau yayasan terdaftar</li>
                <li>Nominal pencairan minimal Rp 100.000</li>
                <li>Keterangan penggunaan dana harus jelas dan sesuai dengan tujuan kampanye</li>
              </ul>

              <h4>3. Proses Pencairan</h4>
              <p>Setelah pengajuan pencairan disubmit, tim Raih Mimpi akan melakukan verifikasi dalam waktu 2-3 hari kerja. Dana akan ditransfer ke rekening terdaftar setelah pengajuan disetujui.</p>

              <h4>4. Biaya Operasional</h4>
              <p>Raih Mimpi mengenakan biaya operasional sebesar 5% dari total donasi untuk pemeliharaan dan pengembangan platform. Biaya ini sudah termasuk biaya transaksi payment gateway.</p>

              <h4>5. Transparansi Penggunaan Dana</h4>
              <p>Setiap pencairan dana wajib disertai dengan keterangan penggunaan yang akan ditampilkan di halaman kampanye. Penggalang dana bertanggung jawab untuk menggunakan dana sesuai dengan tujuan kampanye yang telah dinyatakan.</p>

              <h4>6. Penolakan Pencairan</h4>
              <p>Raih Mimpi berhak menolak atau menunda pencairan dana jika ditemukan indikasi penyalahgunaan, dokumen tidak lengkap, atau keterangan penggunaan dana tidak sesuai dengan tujuan kampanye.</p>

              <h4>7. Perubahan Ketentuan</h4>
              <p>Raih Mimpi berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Pengguna akan diberitahu melalui email atau notifikasi di platform jika terdapat perubahan material.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-modal-close" onClick={() => setShowTermsModal(false)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PengajuanPencairan;
