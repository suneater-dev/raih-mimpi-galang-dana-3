import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/KelompokType.css';

const KelompokType = () => {
  const navigate = useNavigate();

  const handleTypeSelection = (type) => {
    navigate('/kelompok-info', { state: { organizationType: type } });
  };

  const handleBack = () => {
    navigate('/user-type');
  };

  const organizationTypes = [
    {
      id: 'masjid',
      title: 'Masjid',
      description: 'Tempat ibadah umat Islam dan pusat kegiatan keagamaan',
      icon: '🕌',
      gradient: 'linear-gradient(135deg, rgba(152, 60, 237, 0.13) 0%, rgba(152, 60, 237, 0.13) 100%)'
    },
    {
      id: 'lembaga',
      title: 'Lembaga',
      description: 'Organisasi formal yang didirikan untuk tujuan tertentu',
      icon: '🏢',
      gradient: 'linear-gradient(135deg, rgba(152, 60, 237, 0.1) 0%, rgba(152, 60, 237, 0.1) 100%)'
    },
    {
      id: 'yayasan',
      title: 'Yayasan',
      description: 'Badan hukum nirlaba yang bergerak di bidang sosial',
      icon: '🏛️',
      gradient: 'linear-gradient(135deg, rgba(152, 60, 237, 0.15) 0%, rgba(152, 60, 237, 0.15) 100%)'
    },
    {
      id: 'komunitas',
      title: 'Komunitas',
      description: 'Kelompok masyarakat dengan tujuan dan minat yang sama',
      icon: '👥',
      gradient: 'linear-gradient(135deg, rgba(152, 60, 237, 0.12) 0%, rgba(152, 60, 237, 0.12) 100%)'
    }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="logo white-text">Raih Mimpi</div>
        <div className="header-spacer"></div>
      </header>

      {/* Main Content */}
      <div className="kelompok-type-content">
        {/* Page Header */}
        <div className="kelompok-type-header">
          <h1 className="kelompok-type-title">Pilih Jenis Organisasi</h1>
          <p className="kelompok-type-subtitle">
            Pilih jenis organisasi Anda untuk melanjutkan
          </p>
        </div>

        {/* Organization Type Options */}
        <div className="type-options">
          {organizationTypes.map((type) => (
            <button
              key={type.id}
              className="type-card"
              onClick={() => handleTypeSelection(type.id)}
              style={{ '--card-gradient': type.gradient }}
            >
              <div className="type-icon">{type.icon}</div>
              <div className="type-content">
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </div>
              <div className="type-arrow">→</div>
            </button>
          ))}
        </div>

        {/* Info Note */}
        <div className="type-info">
          <p>💡 Pilih jenis organisasi yang sesuai dengan lembaga Anda untuk mempermudah proses verifikasi</p>
        </div>
      </div>
    </div>
  );
};

export default KelompokType;
