import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./page/Dashboard/Dashboard";
import DataMahasiswa from "./page/Dashboard/data/mahasiswa/DataMahasiswa";
import SetMahasiswa from "./page/Dashboard/data/mahasiswa/SetMahasiswa";
import Login from "./page/login/Login";
import DataDosen from "./page/Dashboard/data/dosen/DataDosen";
import Khs from "./page/Pendaftaran/Khs";
import Irs from "./page/Pendaftaran/Irs";
import Pkl from "./page/Pendaftaran/Pkl";
import Skripsi from "./page/Pendaftaran/Skripsi";
import RekapProgresPkl from "./page/rekapan/RekapProgresPkl";
import RekapMahasiswa from "./page/rekapan/RekapMahasiswa";
import MahasiswaPerwalian from "./page/dosen/pagedosen/MasiswaPerwalian";
import RekapProgresSkripsi from "./page/rekapan/RekapProgresSkripsi";
import DataAdmin from "./page/Dashboard/data/admin/DataAdmin";
import NilaiPkl from "./page/dosen/pagedosen/NilaiPkl";


function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mahasiswa" element={<DataMahasiswa />} />
        <Route path="/dosen" element={<DataDosen />} />
        <Route path="/admin" element={<DataAdmin />} />
        <Route path="/setting" element={<SetMahasiswa />} />
        <Route path="/entrykhs" element={<Khs />} />
        <Route path="/entryirs" element={<Irs />} />
        <Route path="/entrypkl" element={<Pkl />} />
        <Route path="/entryskripsi" element={<Skripsi />} />
        <Route path="/datapkl" element={<RekapProgresPkl />} />
        <Route path="/datamahasiswa" element={<RekapMahasiswa />} />
        <Route path="/walisiswa" element={<MahasiswaPerwalian />} />
        <Route path="/dataskripsi" element={<RekapProgresSkripsi />} />
        <Route path="/nilaipkl" element={<NilaiPkl />} />


      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
