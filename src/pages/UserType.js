import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserType.css';

const UserType = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    if (type === 'group') {
      // Navigate to KelompokInfo for group registration
      navigate('/kelompok-info', { state: { userType: type } });
    } else {
      // Navigate to UserInfo after selection for individuals
      navigate('/user-info', { state: { userType: type } });
    }
  };

  return (
    <div className="container">
      <header className="header gradient">
        <div className="back-arrow white-text" onClick={() => navigate(-1)}>←</div>
        <div className="logo white-text">RaihMimpi</div>
        <div className="header-spacer"></div>
      </header>

      <div className="content">
        <section className="hero">
          <h1>Siapa yang akan menggalang dana?</h1>
          <p>Pilih sesuai dengan status anda untuk memulai proses galang dana</p>
        </section>

        <div className="type-selection">
          <button
            className="type-button individual"
            onClick={() => handleTypeSelection('individual')}
          >
            <div className="type-icon">👤</div>
            <div className="type-content">
              <h3>Individu</h3>
              <p>Saya menggalang dana untuk diri sendiri atau orang terdekat</p>
            </div>
          </button>

          <button
            className="type-button group"
            onClick={() => handleTypeSelection('group')}
          >
            <div className="type-icon">👥</div>
            <div className="type-content">
              <h3>Kelompok</h3>
              <p>Saya mewakili organisasi, yayasan, lembaga, atau komunitas</p>
            </div>
          </button>
        </div>

        <div className="info-note">
          <p>💡 Pilihan ini akan membantu kami menyesuaikan proses verifikasi dan persyaratan yang diperlukan</p>
        </div>
      </div>
    </div>
  );
};

export default UserType;