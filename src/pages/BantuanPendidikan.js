import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/KaryaKreatif.css';

const BantuanPendidikan = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    // Navigate directly to education flow
    navigate('/tujuan-detail-pendidikan', {
      state: {
        selectedCategory: category
      }
    });
  };

  const categories = [
    {
      id: 'acara-program',
      title: 'Acara/gerakan/kegiatan/program',
      description: 'Contoh: Program beasiswa, dana abadi, gerakan beli buku, dsb.',
      icon: '📋',
      requirements: [
        'Profil penyelenggara program',
        'Nama program/kegiatan pendidikan',
        'Latar belakang kebutuhan',
        'Teknis pelaksanaan program'
      ]
    },
    {
      id: 'bantuan-santunan',
      title: 'Bantuan/santunan',
      description: 'Contoh: Bantuan SPP murid, santunan UKT mahasiswa, uang pangkal, dsb.',
      icon: '🤝',
      requirements: [
        'Profil penerima bantuan pendidikan',
        'Jenis bantuan pendidikan yang diperlukan',
        'Alasan memerlukan bantuan',
        'Jumlah bantuan yang dibutuhkan'
      ]
    },
    {
      id: 'biaya-operasional',
      title: 'Biaya operasional lembaga/yayasan',
      description: 'Contoh: Biaya sewa tempat, pemeliharaan sekolah, pembelian kebutuhan belajar (misal: alat tulis, ponsel) yang mendesak, dsb.',
      icon: '🏢',
      requirements: [
        'Profil lembaga/yayasan pendidikan',
        'Rincian biaya operasional pendidikan',
        'Manfaat untuk pendidikan masyarakat',
        'Laporan keuangan (jika ada)'
      ]
    },
    {
      id: 'infrastruktur',
      title: 'Pembangunan/perbaikan/pembelian infrastruktur',
      description: 'Contoh: Pembangunan gedung sekolah, renovasi prasarana pendukung (perpustakaan, dsb.), atau biaya pembelian lahan sekolah, dsb.',
      icon: '🏗️',
      requirements: [
        'Profil proyek infrastruktur pendidikan',
        'Rencana pembangunan/perbaikan',
        'Manfaat bagi pendidikan komunitas',
        'Estimasi biaya dan timeline'
      ]
    }
  ];

  const steps = [
    { number: 1, label: 'Tujuan', active: true },
    { number: 2, label: 'Penerima', active: false },
    { number: 3, label: 'Target donasi', active: false },
    { number: 4, label: 'Judul', active: false },
    { number: 5, label: 'Cerita', active: false },
    { number: 6, label: 'Ajakan', active: false }
  ];

  const handleBack = () => {
    navigate('/bantuan-lainnya');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="logo white-text">Bantuan Pendidikan</div>
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

    </div>
  );
};

export default BantuanPendidikan;