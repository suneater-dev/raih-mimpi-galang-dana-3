import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import UserType from './pages/UserType';
import UserInfo from './pages/UserInfo';
import SelectCategory from './pages/SelectCategory';
import PatientName from './pages/PatientName';
import BantuanMedis from './pages/BantuanMedis';
import DetailPasien from './pages/DetailPasien';
import RiwayatMedis from './pages/RiwayatMedis';
import TargetDonasi from './pages/TargetDonasi';
import JudulKampanye from './pages/JudulKampanye';
import CeritaKampanye from './pages/CeritaKampanye';
import TulisCerita from './pages/TulisCerita';
import TulisCerita2 from './pages/TulisCerita2';
import TulisCerita3 from './pages/TulisCerita3';
import TulisCerita4 from './pages/TulisCerita4';
import TulisCerita5 from './pages/TulisCerita5';
import TulisCerita6 from './pages/TulisCerita6';
import ReviewCerita from './pages/ReviewCerita';
import Ajakan from './pages/Ajakan';
import CampaignComplete from './pages/CampaignComplete';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-type" element={<UserType />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/select-category" element={<SelectCategory />} />
          <Route path="/bantuan-medis" element={<BantuanMedis />} />
          <Route path="/detail-pasien" element={<DetailPasien />} />
          <Route path="/nama-pasien" element={<PatientName />} />
          <Route path="/patient-name" element={<PatientName />} />
          <Route path="/riwayat-medis" element={<RiwayatMedis />} />
          <Route path="/target-donasi" element={<TargetDonasi />} />
          <Route path="/judul-kampanye" element={<JudulKampanye />} />
          <Route path="/cerita-kampanye" element={<CeritaKampanye />} />
          <Route path="/tulis-cerita" element={<TulisCerita />} />
          <Route path="/tulis-cerita-2" element={<TulisCerita2 />} />
          <Route path="/tulis-cerita-3" element={<TulisCerita3 />} />
          <Route path="/tulis-cerita-4" element={<TulisCerita4 />} />
          <Route path="/tulis-cerita-5" element={<TulisCerita5 />} />
          <Route path="/tulis-cerita-6" element={<TulisCerita6 />} />
          <Route path="/review-cerita" element={<ReviewCerita />} />
          <Route path="/ajakan-donasi" element={<Ajakan />} />
          <Route path="/campaign-complete" element={<CampaignComplete />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Placeholder routes */}
          <Route path="/general-form" element={<div>General Form Page (To be implemented)</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
