import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/KaryaKreatif.css';

const KegiatanSosial = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalCategory, setModalCategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    setModalCategory(category);
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    // Navigate to social activities flow
    navigate('/tujuan-detail-sosial', {
      state: {
        selectedCategory: modalCategory
      }
    });
  };

  const handleModalCancel = () => {
    setShowModal(false);
    // Navigate to alternative flow (Bantuan/santunan)
    navigate('/user-info');
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalCategory(null);
  };

  const categories = [
    {
      id: 'acara-kegiatan',
      title: 'Acara/gerakan/kegiatan/program',
      description: 'Contoh: Kegiatan sosial himpunan mahasiswa, gerakan sosial komunitas, dsb.',
      icon: '📋',
      requirements: [
        'Profil penyelenggara',
        'Nama acara/gerakan/kegiatan/program',
        'Latar belakang',
        'Teknis penyelenggaraan'
      ]
    },
    {
      id: 'bantuan-santunan',
      title: 'Bantuan/santunan',
      description: 'Contoh: Bantuan untuk seorang duafa, kelompok tunawisma, ojek online, dsb.',
      icon: '🤝',
      requirements: [
        'Profil penerima bantuan',
        'Jenis bantuan yang diperlukan',
        'Alasan memerlukan bantuan',
        'Jumlah bantuan yang dibutuhkan'
      ]
    },
    {
      id: 'biaya-operasional',
      title: 'Biaya operasional lembaga/yayasan',
      description: 'Contoh: Biaya sewa tempat, pemeliharaan tempat, pembelian barang, dsb.',
      icon: '🏢',
      requirements: [
        'Profil lembaga/yayasan',
        'Rincian biaya operasional',
        'Manfaat untuk masyarakat',
        'Laporan keuangan (jika ada)'
      ]
    },
    {
      id: 'pembangunan-infrastruktur',
      title: 'Pembangunan/perbaikan/pembelian infrastruktur',
      description: 'Contoh: Pembangunan rumah masyarakat pra-sejahtera, perbaikan tempat tinggal lansia, dsb.',
      icon: '🏗️',
      requirements: [
        'Profil proyek infrastruktur',
        'Rencana pembangunan/perbaikan',
        'Manfaat bagi komunitas',
        'Estimasi biaya dan timeline'
      ]
    }
  ];

  const steps = [
    { number: 1, label: 'Tujuan', active: true },
    { number: 2, label: 'Data diri', active: false },
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
        <button className="back-arrow white-text" onClick={() => navigate('/bantuan-lainnya')}>
          ←
        </button>
        <div className="logo white-text">Kegiatan Sosial</div>
        <div className="header-spacer"></div>
      </header>

      {/* Progress Steps */}
      <div className="progress-section-modern">
        <ProgressSteps steps={steps} />
      </div>

      {/* Main Content */}
      <div className="main-content-modern">
        {/* Instructions */}
        <div className="instructions-section-modern">
          <h2 className="modern-subheading">Donasi akan ditujukan kepada...</h2>
        </div>

        {/* Categories */}
        <div className="categories-container-modern">
          {categories.map((category) => (
            <div key={category.id} className="modern-card category-option-kreatif">
              <div className="category-option-content">
                <div className="category-text-content">
                  <h3 className="category-title-kreatif">{category.title}</h3>
                  <p className="category-description-kreatif">{category.description}</p>
                </div>
                <button 
                  className="pilih-btn-modern"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  Pilih
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && modalCategory && (
        <div className="modal-overlay-modern" onClick={handleModalClose}>
          <div className="modal-content-modern" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-modern">
              <h6 className="modal-title-modern">Tujuan galang dana sudah benar?</h6>
              <p className="modal-description-modern">
                Galang dana <strong>{modalCategory.title.toLowerCase()}</strong> memerlukan informasi berikut:
              </p>
              <ul className="modal-requirements-list">
                {modalCategory.requirements.map((requirement, index) => (
                  <li key={index} className="modal-requirement-item">
                    {requirement}
                  </li>
                ))}
              </ul>
              <p className="modal-alternative-text">
                Jika informasi di atas tidak kamu miliki, silakan galang dana <strong>Bantuan/santunan</strong>.
              </p>
              
              <div className="modal-buttons-container">
                <button className="modal-btn-confirm" onClick={handleModalConfirm}>
                  Ya, lanjutkan
                </button>
                <button className="modal-btn-alternative" onClick={handleModalCancel}>
                  Galang dana bantuan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default KegiatanSosial;