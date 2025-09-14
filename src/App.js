import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import UserType from './pages/UserType';
import KelompokInfo from './pages/KelompokInfo';
import UserInfo from './pages/UserInfo';
import SelectCategory from './pages/SelectCategory';
import BantuanLainnya from './pages/BantuanLainnya';
import KaryaKreatif from './pages/KaryaKreatif';
import TujuanDetail from './pages/TujuanDetail';
import DataDiri from './pages/DataDiri';
import Penerima from './pages/Penerima';
import TargetDonasiPendidikan from './pages/TargetDonasiPendidikan';
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
import JudulKampanyeKreatif from './pages/JudulKampanyeKreatif';
import CeritaKampanyeKreatif from './pages/CeritaKampanyeKreatif';
import TulisCeritaKreatif from './pages/TulisCeritaKreatif';
import TulisCeritaKreatif2 from './pages/TulisCeritaKreatif2';
import TulisCeritaKreatif3 from './pages/TulisCeritaKreatif3';
import TulisCeritaKreatif4 from './pages/TulisCeritaKreatif4';
import TulisCeritaKreatif5 from './pages/TulisCeritaKreatif5';
import TulisCeritaKreatif6 from './pages/TulisCeritaKreatif6';
import ReviewCeritaKreatif from './pages/ReviewCeritaKreatif';
import AjakanKreatif from './pages/AjakanKreatif';
import KegiatanSosial from './pages/KegiatanSosial';
import BantuanPendidikan from './pages/BantuanPendidikan';
import TujuanDetailSosial from './pages/TujuanDetailSosial';
import DataDiriSosial from './pages/DataDiriSosial';
import PenerimaSosial from './pages/PenerimaSosial';
import TargetDonasiSosial from './pages/TargetDonasiSosial';
import JudulKampanyeSosial from './pages/JudulKampanyeSosial';
import CeritaKampanyeSosial from './pages/CeritaKampanyeSosial';
import TulisCeritaSosial from './pages/TulisCeritaSosial';
import TulisCeritaSosial2 from './pages/TulisCeritaSosial2';
import TulisCeritaSosial3 from './pages/TulisCeritaSosial3';
import TulisCeritaSosial4 from './pages/TulisCeritaSosial4';
import TulisCeritaSosial5 from './pages/TulisCeritaSosial5';
import TulisCeritaSosial6 from './pages/TulisCeritaSosial6';
import ReviewCeritaSosial from './pages/ReviewCeritaSosial';
import AjakanSosial from './pages/AjakanSosial';
import TujuanDetailPendidikan from './pages/TujuanDetailPendidikan';
import DataDiriPendidikan from './pages/DataDiriPendidikan';
import PenerimaPendidikan from './pages/PenerimaPendidikan';
import JudulKampanyePendidikan from './pages/JudulKampanyePendidikan';
import CeritaKampanyePendidikan from './pages/CeritaKampanyePendidikan';
import TulisCeritaPendidikan from './pages/TulisCeritaPendidikan';
import TulisCeritaPendidikan2 from './pages/TulisCeritaPendidikan2';
import TulisCeritaPendidikan3 from './pages/TulisCeritaPendidikan3';
import TulisCeritaPendidikan4 from './pages/TulisCeritaPendidikan4';
import TulisCeritaPendidikan5 from './pages/TulisCeritaPendidikan5';
import TulisCeritaPendidikan6 from './pages/TulisCeritaPendidikan6';
import ReviewCeritaPendidikan from './pages/ReviewCeritaPendidikan';
import AjakanPendidikan from './pages/AjakanPendidikan';
import AdsOfferingPendidikan from './pages/AdsOfferingPendidikan';
import AdsOfferingMedis from './pages/AdsOfferingMedis';
import AdsOfferingKreatif from './pages/AdsOfferingKreatif';
import AdsOfferingSosial from './pages/AdsOfferingSosial';
import AccountRegistration from './pages/AccountRegistration';
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
          <Route path="/kelompok-info" element={<KelompokInfo />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/select-category" element={<SelectCategory />} />
          <Route path="/bantuan-lainnya" element={<BantuanLainnya />} />
          <Route path="/karya-kreatif" element={<KaryaKreatif />} />
          <Route path="/tujuan-detail" element={<TujuanDetail />} />
          <Route path="/data-diri" element={<DataDiri />} />
          <Route path="/penerima" element={<Penerima />} />
          <Route path="/target-donasi-pendidikan" element={<TargetDonasiPendidikan />} />
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
          <Route path="/judul-kampanye-kreatif" element={<JudulKampanyeKreatif />} />
          <Route path="/cerita-kampanye-kreatif" element={<CeritaKampanyeKreatif />} />
          <Route path="/tulis-cerita-kreatif" element={<TulisCeritaKreatif />} />
          <Route path="/tulis-cerita-kreatif-2" element={<TulisCeritaKreatif2 />} />
          <Route path="/tulis-cerita-kreatif-3" element={<TulisCeritaKreatif3 />} />
          <Route path="/tulis-cerita-kreatif-4" element={<TulisCeritaKreatif4 />} />
          <Route path="/tulis-cerita-kreatif-5" element={<TulisCeritaKreatif5 />} />
          <Route path="/tulis-cerita-kreatif-6" element={<TulisCeritaKreatif6 />} />
          <Route path="/review-cerita-kreatif" element={<ReviewCeritaKreatif />} />
          <Route path="/ajakan-kreatif" element={<AjakanKreatif />} />
          <Route path="/kegiatan-sosial" element={<KegiatanSosial />} />
          <Route path="/bantuan-pendidikan" element={<BantuanPendidikan />} />
          <Route path="/tujuan-detail-sosial" element={<TujuanDetailSosial />} />
          <Route path="/data-diri-sosial" element={<DataDiriSosial />} />
          <Route path="/penerima-sosial" element={<PenerimaSosial />} />
          <Route path="/target-donasi-sosial" element={<TargetDonasiSosial />} />
          <Route path="/judul-kampanye-sosial" element={<JudulKampanyeSosial />} />
          <Route path="/cerita-kampanye-sosial" element={<CeritaKampanyeSosial />} />
          <Route path="/tulis-cerita-sosial" element={<TulisCeritaSosial />} />
          <Route path="/tulis-cerita-sosial-2" element={<TulisCeritaSosial2 />} />
          <Route path="/tulis-cerita-sosial-3" element={<TulisCeritaSosial3 />} />
          <Route path="/tulis-cerita-sosial-4" element={<TulisCeritaSosial4 />} />
          <Route path="/tulis-cerita-sosial-5" element={<TulisCeritaSosial5 />} />
          <Route path="/tulis-cerita-sosial-6" element={<TulisCeritaSosial6 />} />
          <Route path="/review-cerita-sosial" element={<ReviewCeritaSosial />} />
          <Route path="/ajakan-sosial" element={<AjakanSosial />} />
          <Route path="/tujuan-detail-pendidikan" element={<TujuanDetailPendidikan />} />
          <Route path="/data-diri-pendidikan" element={<DataDiriPendidikan />} />
          <Route path="/penerima-pendidikan" element={<PenerimaPendidikan />} />
          <Route path="/judul-kampanye-pendidikan" element={<JudulKampanyePendidikan />} />
          <Route path="/cerita-kampanye-pendidikan" element={<CeritaKampanyePendidikan />} />
          <Route path="/tulis-cerita-pendidikan" element={<TulisCeritaPendidikan />} />
          <Route path="/tulis-cerita-pendidikan-2" element={<TulisCeritaPendidikan2 />} />
          <Route path="/tulis-cerita-pendidikan-3" element={<TulisCeritaPendidikan3 />} />
          <Route path="/tulis-cerita-pendidikan-4" element={<TulisCeritaPendidikan4 />} />
          <Route path="/tulis-cerita-pendidikan-5" element={<TulisCeritaPendidikan5 />} />
          <Route path="/tulis-cerita-pendidikan-6" element={<TulisCeritaPendidikan6 />} />
          <Route path="/review-cerita-pendidikan" element={<ReviewCeritaPendidikan />} />
          <Route path="/ajakan-pendidikan" element={<AjakanPendidikan />} />
          <Route path="/ads-offering-pendidikan" element={<AdsOfferingPendidikan />} />
          <Route path="/ads-offering-medis" element={<AdsOfferingMedis />} />
          <Route path="/ads-offering-kreatif" element={<AdsOfferingKreatif />} />
          <Route path="/ads-offering-sosial" element={<AdsOfferingSosial />} />
          <Route path="/account-registration" element={<AccountRegistration />} />
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
