import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/PendaftaranOptimasiIklan.css';

const PendaftaranOptimasiIklan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const campaignData = location.state || {};

  const [formData, setFormData] = useState({
    namaLembaga: '',
    alamatKelurahan: '',
    kecamatan: '',
    kotaKabupaten: '',
    provinsi: '',
    kodePos: '',
    alamatLengkap: '',
    namaKetuaLembaga: '',
    namaPenanggungJawab: '',
    noWhatsapp: ''
  });

  // Autocomplete states
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Sample Indonesian location data (kelurahan database)
  const indonesianLocations = [
    { kelurahan: 'Menteng', kecamatan: 'Menteng', kota: 'Jakarta Pusat', provinsi: 'DKI Jakarta', kodePos: '10310' },
    { kelurahan: 'Gondangdia', kecamatan: 'Menteng', kota: 'Jakarta Pusat', provinsi: 'DKI Jakarta', kodePos: '10350' },
    { kelurahan: 'Cikini', kecamatan: 'Menteng', kota: 'Jakarta Pusat', provinsi: 'DKI Jakarta', kodePos: '10330' },
    { kelurahan: 'Kebon Sirih', kecamatan: 'Menteng', kota: 'Jakarta Pusat', provinsi: 'DKI Jakarta', kodePos: '10340' },
    { kelurahan: 'Gelora', kecamatan: 'Tanah Abang', kota: 'Jakarta Pusat', provinsi: 'DKI Jakarta', kodePos: '10270' },
    { kelurahan: 'Karet Tengsin', kecamatan: 'Tanah Abang', kota: 'Jakarta Pusat', provinsi: 'DKI Jakarta', kodePos: '10220' },
    { kelurahan: 'Kebayoran Baru', kecamatan: 'Kebayoran Baru', kota: 'Jakarta Selatan', provinsi: 'DKI Jakarta', kodePos: '12110' },
    { kelurahan: 'Senayan', kecamatan: 'Kebayoran Baru', kota: 'Jakarta Selatan', provinsi: 'DKI Jakarta', kodePos: '12190' },
    { kelurahan: 'Melawai', kecamatan: 'Kebayoran Baru', kota: 'Jakarta Selatan', provinsi: 'DKI Jakarta', kodePos: '12160' },
    { kelurahan: 'Gandaria Utara', kecamatan: 'Kebayoran Baru', kota: 'Jakarta Selatan', provinsi: 'DKI Jakarta', kodePos: '12140' },
    { kelurahan: 'Tebet Barat', kecamatan: 'Tebet', kota: 'Jakarta Selatan', provinsi: 'DKI Jakarta', kodePos: '12810' },
    { kelurahan: 'Tebet Timur', kecamatan: 'Tebet', kota: 'Jakarta Selatan', provinsi: 'DKI Jakarta', kodePos: '12820' },
    { kelurahan: 'Kuningan Timur', kecamatan: 'Setiabudi', kota: 'Jakarta Selatan', provinsi: 'DKI Jakarta', kodePos: '12950' },
    { kelurahan: 'Setiabudi', kecamatan: 'Setiabudi', kota: 'Jakarta Selatan', provinsi: 'DKI Jakarta', kodePos: '12910' },
    { kelurahan: 'Pondok Pinang', kecamatan: 'Kebayoran Lama', kota: 'Jakarta Selatan', provinsi: 'DKI Jakarta', kodePos: '12310' },
    { kelurahan: 'Cipete Selatan', kecamatan: 'Cilandak', kota: 'Jakarta Selatan', provinsi: 'DKI Jakarta', kodePos: '12410' },
    { kelurahan: 'Kelapa Gading Barat', kecamatan: 'Kelapa Gading', kota: 'Jakarta Utara', provinsi: 'DKI Jakarta', kodePos: '14240' },
    { kelurahan: 'Kelapa Gading Timur', kecamatan: 'Kelapa Gading', kota: 'Jakarta Utara', provinsi: 'DKI Jakarta', kodePos: '14250' },
    { kelurahan: 'Pluit', kecamatan: 'Penjaringan', kota: 'Jakarta Utara', provinsi: 'DKI Jakarta', kodePos: '14450' },
    { kelurahan: 'Ancol', kecamatan: 'Pademangan', kota: 'Jakarta Utara', provinsi: 'DKI Jakarta', kodePos: '14430' },
    { kelurahan: 'Sunter Agung', kecamatan: 'Tanjung Priok', kota: 'Jakarta Utara', provinsi: 'DKI Jakarta', kodePos: '14350' },
    { kelurahan: 'Kebon Jeruk', kecamatan: 'Kebon Jeruk', kota: 'Jakarta Barat', provinsi: 'DKI Jakarta', kodePos: '11530' },
    { kelurahan: 'Tanjung Duren Utara', kecamatan: 'Grogol Petamburan', kota: 'Jakarta Barat', provinsi: 'DKI Jakarta', kodePos: '11470' },
    { kelurahan: 'Cengkareng Barat', kecamatan: 'Cengkareng', kota: 'Jakarta Barat', provinsi: 'DKI Jakarta', kodePos: '11730' },
    { kelurahan: 'Kalideres', kecamatan: 'Kalideres', kota: 'Jakarta Barat', provinsi: 'DKI Jakarta', kodePos: '11840' },
    { kelurahan: 'Duren Sawit', kecamatan: 'Duren Sawit', kota: 'Jakarta Timur', provinsi: 'DKI Jakarta', kodePos: '13440' },
    { kelurahan: 'Jatinegara', kecamatan: 'Jatinegara', kota: 'Jakarta Timur', provinsi: 'DKI Jakarta', kodePos: '13310' },
    { kelurahan: 'Rawamangun', kecamatan: 'Pulogadung', kota: 'Jakarta Timur', provinsi: 'DKI Jakarta', kodePos: '13220' },
    { kelurahan: 'Cipayung', kecamatan: 'Cipayung', kota: 'Jakarta Timur', provinsi: 'DKI Jakarta', kodePos: '13840' },
    { kelurahan: 'Bogor Tengah', kecamatan: 'Bogor Tengah', kota: 'Bogor', provinsi: 'Jawa Barat', kodePos: '16121' },
    { kelurahan: 'Paledang', kecamatan: 'Bogor Tengah', kota: 'Bogor', provinsi: 'Jawa Barat', kodePos: '16122' },
    { kelurahan: 'Gudang', kecamatan: 'Bogor Tengah', kota: 'Bogor', provinsi: 'Jawa Barat', kodePos: '16123' },
    { kelurahan: 'Babakan', kecamatan: 'Bogor Tengah', kota: 'Bogor', provinsi: 'Jawa Barat', kodePos: '16128' },
    { kelurahan: 'Rancamaya', kecamatan: 'Bogor Selatan', kota: 'Bogor', provinsi: 'Jawa Barat', kodePos: '16133' },
    { kelurahan: 'Pasir Jaya', kecamatan: 'Bogor Barat', kota: 'Bogor', provinsi: 'Jawa Barat', kodePos: '16119' },
    { kelurahan: 'Bantarjati', kecamatan: 'Bogor Utara', kota: 'Bogor', provinsi: 'Jawa Barat', kodePos: '16153' },
    { kelurahan: 'Tegal Gundil', kecamatan: 'Bogor Utara', kota: 'Bogor', provinsi: 'Jawa Barat', kodePos: '16152' },
    { kelurahan: 'Astana Anyar', kecamatan: 'Bandung Kidul', kota: 'Bandung', provinsi: 'Jawa Barat', kodePos: '40241' },
    { kelurahan: 'Batununggal', kecamatan: 'Bandung Kidul', kota: 'Bandung', provinsi: 'Jawa Barat', kodePos: '40266' },
    { kelurahan: 'Cipaganti', kecamatan: 'Coblong', kota: 'Bandung', provinsi: 'Jawa Barat', kodePos: '40131' },
    { kelurahan: 'Dago', kecamatan: 'Coblong', kota: 'Bandung', provinsi: 'Jawa Barat', kodePos: '40135' },
    { kelurahan: 'Antapani Kidul', kecamatan: 'Antapani', kota: 'Bandung', provinsi: 'Jawa Barat', kodePos: '40291' },
    { kelurahan: 'Cibiru Hilir', kecamatan: 'Cileunyi', kota: 'Bandung', provinsi: 'Jawa Barat', kodePos: '40625' },
    { kelurahan: 'Sukajadi', kecamatan: 'Sukajadi', kota: 'Bandung', provinsi: 'Jawa Barat', kodePos: '40164' },
    { kelurahan: 'Buah Batu', kecamatan: 'Buah Batu', kota: 'Bandung', provinsi: 'Jawa Barat', kodePos: '40286' },
    { kelurahan: 'Surabaya', kecamatan: 'Bubutan', kota: 'Surabaya', provinsi: 'Jawa Timur', kodePos: '60174' },
    { kelurahan: 'Wonokromo', kecamatan: 'Wonokromo', kota: 'Surabaya', provinsi: 'Jawa Timur', kodePos: '60243' },
    { kelurahan: 'Gubeng', kecamatan: 'Gubeng', kota: 'Surabaya', provinsi: 'Jawa Timur', kodePos: '60281' },
    { kelurahan: 'Tegalsari', kecamatan: 'Tegalsari', kota: 'Surabaya', provinsi: 'Jawa Timur', kodePos: '60262' }
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length >= 2) {
      const filtered = indonesianLocations.filter(location =>
        location.kelurahan.toLowerCase().includes(value.toLowerCase()) ||
        location.kecamatan.toLowerCase().includes(value.toLowerCase()) ||
        location.kota.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowDropdown(true);
    } else {
      setFilteredLocations([]);
      setShowDropdown(false);
    }
  };

  // Handle location selection
  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setSearchQuery(`${location.kelurahan}, ${location.kecamatan}, ${location.kota}, ${location.provinsi}`);
    setFormData(prev => ({
      ...prev,
      alamatKelurahan: location.kelurahan,
      kecamatan: location.kecamatan,
      kotaKabupaten: location.kota,
      provinsi: location.provinsi,
      kodePos: location.kodePos
    }));
    setShowDropdown(false);
  };

  // Clear selection
  const handleClearSelection = () => {
    setSelectedLocation(null);
    setSearchQuery('');
    setFormData(prev => ({
      ...prev,
      alamatKelurahan: '',
      kecamatan: '',
      kotaKabupaten: '',
      provinsi: '',
      kodePos: ''
    }));
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBack = () => {
    navigate('/iklankan-campaign');
  };

  const handleNext = () => {
    // Showcase mode: Allow navigation even if form is incomplete
    navigate('/upload-dokumen-mou', { state: { ...campaignData, ...formData } });
  };

  const isFormValid =
    formData.namaLembaga.trim() &&
    formData.alamatKelurahan.trim() &&
    formData.alamatLengkap.trim() &&
    formData.namaKetuaLembaga.trim() &&
    formData.namaPenanggungJawab.trim() &&
    formData.noWhatsapp.trim() &&
    formData.noWhatsapp.length >= 10;

  return (
    <div className="container">
      {/* Header */}
      <header className="header gradient">
        <button className="back-arrow white-text" onClick={handleBack}>
          ←
        </button>
        <div className="header-title white-text">Pendaftaran Optimasi Iklan</div>
      </header>

      {/* Info Banner */}
      {campaignData.campaignTitle && (
        <div className="campaign-info-banner">
          <div className="banner-content">
            <div className="banner-icon">📢</div>
            <div className="banner-text">
              <div className="banner-label">Campaign yang akan dipromosikan:</div>
              <div className="banner-campaign-title">{campaignData.campaignTitle}</div>
            </div>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="form-section-optimasi">
        <div className="modern-card-optimasi">
          <h2 className="form-title-optimasi">Data Lembaga</h2>
          <p className="form-subtitle-optimasi">
            Lengkapi data lembaga Anda untuk melanjutkan proses optimasi iklan campaign
          </p>

          <form className="optimasi-form">
            {/* 1. Nama Lembaga */}
            <div className="form-group-optimasi">
              <label className="form-label-optimasi">
                Nama Lembaga <span className="required">*</span>
              </label>
              <input
                type="text"
                name="namaLembaga"
                className="form-input-optimasi"
                placeholder="Masukkan nama lembaga"
                value={formData.namaLembaga}
                onChange={handleChange}
              />
            </div>

            {/* 2. Alamat Kelurahan - Autocomplete */}
            <div className="form-group-optimasi">
              <label className="form-label-optimasi">
                Alamat Kelurahan <span className="required">*</span>
              </label>
              <div className="autocomplete-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  className="form-input-optimasi autocomplete-input"
                  placeholder="Ketik nama kelurahan (min 2 karakter)..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if (filteredLocations.length > 0) {
                      setShowDropdown(true);
                    }
                  }}
                />
                {selectedLocation && (
                  <button
                    type="button"
                    className="clear-btn"
                    onClick={handleClearSelection}
                    title="Hapus pilihan"
                  >
                    ✕
                  </button>
                )}

                {/* Dropdown */}
                {showDropdown && (
                  <div ref={dropdownRef} className="autocomplete-dropdown">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((location, index) => (
                        <div
                          key={index}
                          className="dropdown-item"
                          onClick={() => handleSelectLocation(location)}
                        >
                          <div className="location-name">{location.kelurahan}</div>
                          <div className="location-details">
                            {location.kecamatan}, {location.kota}, {location.provinsi}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item no-results">
                        <div className="no-results-icon">🔍</div>
                        <div className="no-results-text">Kelurahan tidak ditemukan</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Auto-filled Location Details - Only show when location is selected */}
            {selectedLocation && (
              <>
                <div className="form-group-optimasi">
                  <label className="form-label-optimasi">Kecamatan</label>
                  <input
                    type="text"
                    className="form-input-optimasi auto-filled"
                    value={formData.kecamatan}
                    readOnly
                  />
                </div>

                <div className="form-group-optimasi">
                  <label className="form-label-optimasi">Kota/Kabupaten</label>
                  <input
                    type="text"
                    className="form-input-optimasi auto-filled"
                    value={formData.kotaKabupaten}
                    readOnly
                  />
                </div>

                <div className="form-group-optimasi">
                  <label className="form-label-optimasi">Provinsi</label>
                  <input
                    type="text"
                    className="form-input-optimasi auto-filled"
                    value={formData.provinsi}
                    readOnly
                  />
                </div>

                <div className="form-group-optimasi">
                  <label className="form-label-optimasi">Kode Pos</label>
                  <input
                    type="text"
                    className="form-input-optimasi auto-filled"
                    value={formData.kodePos}
                    readOnly
                  />
                </div>
              </>
            )}

            {/* 3. Alamat Lengkap */}
            <div className="form-group-optimasi">
              <label className="form-label-optimasi">
                Alamat Lengkap <span className="required">*</span>
              </label>
              <textarea
                name="alamatLengkap"
                className="form-textarea-optimasi"
                placeholder="Masukkan alamat lengkap (Jalan, No, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten, Provinsi, Kode Pos)"
                value={formData.alamatLengkap}
                onChange={handleChange}
                rows="3"
              />
            </div>

            {/* 4. Nama Ketua Lembaga */}
            <div className="form-group-optimasi">
              <label className="form-label-optimasi">
                Nama Ketua Lembaga <span className="required">*</span>
              </label>
              <input
                type="text"
                name="namaKetuaLembaga"
                className="form-input-optimasi"
                placeholder="Masukkan nama ketua lembaga"
                value={formData.namaKetuaLembaga}
                onChange={handleChange}
              />
            </div>

            {/* 5. Nama Penanggung Jawab */}
            <div className="form-group-optimasi">
              <label className="form-label-optimasi">
                Nama Penanggung Jawab <span className="required">*</span>
              </label>
              <input
                type="text"
                name="namaPenanggungJawab"
                className="form-input-optimasi"
                placeholder="Masukkan nama penanggung jawab"
                value={formData.namaPenanggungJawab}
                onChange={handleChange}
              />
            </div>

            {/* 6. No Whatsapp Penanggung Jawab */}
            <div className="form-group-optimasi">
              <label className="form-label-optimasi">
                No Whatsapp Penanggung Jawab <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="noWhatsapp"
                className="form-input-optimasi"
                placeholder="Contoh: 081234567890"
                value={formData.noWhatsapp}
                onChange={handleChange}
                maxLength="15"
              />
              <div className="input-hint">
                Minimal 10 digit nomor WhatsApp
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-optimasi">
        <button className="btn-optimasi btn-secondary" onClick={handleBack}>
          ← Sebelumnya
        </button>
        <button
          className="btn-optimasi btn-primary"
          onClick={handleNext}
        >
          Lanjutkan →
        </button>
      </div>
    </div>
  );
};

export default PendaftaranOptimasiIklan;
