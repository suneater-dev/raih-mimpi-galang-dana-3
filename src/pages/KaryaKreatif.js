import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../components/ProgressSteps';
import '../styles/KaryaKreatif.css';

const KaryaKreatif = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    // Navigate directly to Kreatif flow
    navigate('/tujuan-detail-kreatif', {
      state: {
        selectedCategory: category
      }
    });
  };

  const categories = [
    {
      id: 'acara-kegiatan',
      title: 'Acara/gerakan/kegiatan/program',
      description: 'Contoh: Kegiatan pemberdayaan masyarakat, acara pementasan budaya, dsb.',
      icon: '📋',
      requirements: [
        'Profil penyelenggara',
        'Nama acara/gerakan/kegiatan/program',
        'Latar belakang',
        'Teknis penyelenggaraan'
      ]
    },
    {
      id: 'karya-proyek-modal',
      title: 'Karya, proyek, modal usaha',
      description: 'Contoh: Patungan untuk proyek pesawat nasional, modal untuk kelompok usaha di desa, dsb.',
      icon: '🚀',
      requirements: [
        'Profil pengusul proyek',
        'Detail karya/proyek/usaha',
        'Rencana penggunaan dana',
        'Target dan timeline proyek'
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

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <div className="logo white-text">Karya Kreatif & Modal Usaha</div>
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

export default KaryaKreatif;