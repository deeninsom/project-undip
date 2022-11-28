const express = require("express");
const mahasiswa = express.Router();

const Mahasiswa = require("../../controller/mahasiswa/mhs_controller");
const bio = require("../../controller/mahasiswa/bio_mahasiswa");
const berkasPkl = require("../../controller/mahasiswa/pkl");
const berkasKhs = require("../../controller/mahasiswa/khs");
const berkasIrs = require("../../controller/mahasiswa/irs");
const nilai = require("../../controller/mahasiswa/nilaiPkl");
const berkasSkripsi = require("../../controller/mahasiswa/skripsi");
const VerifyOn = require("../../middleware/verifyUser");

//Data Mahasiswa
mahasiswa.get("/mahasiswa", VerifyOn.verifyUser, Mahasiswa.getMahasiswa);
mahasiswa.post("/mahasiswa", Mahasiswa.createMahasiswa);
mahasiswa.get("/mahasiswa/:id",VerifyOn.verifyUser,Mahasiswa.getMahasiswaById);
mahasiswa.put("/mahasiswa/update/:id",VerifyOn.verifyUser,Mahasiswa.updateMahasiswa);
mahasiswa.delete("/mahasiswa/deleted/:id",VerifyOn.verifyUser,Mahasiswa.deletedMahasiswa);

mahasiswa.put("/verifikasi/:id",VerifyOn.verifyUser, Mahasiswa.verifMahasisiswa);

mahasiswa.get("/nilai",VerifyOn.verifyUser, nilai.getNilai);
mahasiswa.put("/nilai/:id", VerifyOn.verifyUser, nilai.createNilai);

//routes data bio
mahasiswa.get("/biodata",VerifyOn.verifyUser, bio.getBio);
mahasiswa.post("/biodata",VerifyOn.verifyUser, bio.createBio);
mahasiswa.get("/biodata/:id",VerifyOn.verifyUser, bio.getBioById);
mahasiswa.put("/biodata/update",VerifyOn.verifyUser, bio.updateBio);
mahasiswa.delete("/biodata/deleted",VerifyOn.verifyUser, bio.deletedBio);

//routes berkas pkl
mahasiswa.get("/berkas/pkl",VerifyOn.verifyUser, berkasPkl.getPkl);
mahasiswa.post("/berkas/pkl", VerifyOn.verifyUser, berkasPkl.createBerkasPkl);
mahasiswa.get("/berkas/pkl/:id", VerifyOn.verifyUser,  berkasPkl.getPklById);
mahasiswa.put("/berkas/pkl/update",VerifyOn.verifyUser, berkasPkl.updateBerkasPkl);
mahasiswa.delete("/berkas/pkl/deleted",VerifyOn.verifyUser, berkasPkl.deletedBerkasPkl);

//routes berkas khs
mahasiswa.get("/berkas/khs", VerifyOn.verifyUser,berkasKhs.getKhs);
mahasiswa.post("/berkas/khs", VerifyOn.verifyUser,berkasKhs.createBerkasKhs);
mahasiswa.get("/berkas/khs/:id", VerifyOn.verifyUser, berkasKhs.getKhsById);
mahasiswa.put("/berkas/khs/update", VerifyOn.verifyUser,berkasKhs.updateBerkasKhs);
mahasiswa.delete("/berkas/khs/deleted",VerifyOn.verifyUser, berkasKhs.deletedBerkasKhs);

//routes berkas skripsi
mahasiswa.get("/berkas/skripsi",VerifyOn.verifyUser, berkasSkripsi.getBerkasSkripsi);
mahasiswa.post("/berkas/skripsi", VerifyOn.verifyUser,berkasSkripsi.createBerkasSkripsi);
mahasiswa.get("/berkas/skripsi/:id",VerifyOn.verifyUser, berkasSkripsi.getBerkasSkripsiById);
mahasiswa.put("/berkas/skripsi/update",VerifyOn.verifyUser, berkasSkripsi.updateBerkasSkripsi);
mahasiswa.delete("/berkas/skripsi/deleted",VerifyOn.verifyUser, berkasSkripsi.deletedBerkasSkripsi);

//routes berkas irs
mahasiswa.get("/berkas/irs",VerifyOn.verifyUser, berkasIrs.getIrs);
mahasiswa.post("/berkas/irs",VerifyOn.verifyUser, berkasIrs.createBerkasIrs);
mahasiswa.get("/berkas/irs/:id",VerifyOn.verifyUser, berkasIrs.getIrsById);
mahasiswa.put("/berkas/irs/update",VerifyOn.verifyUser, berkasIrs.updateBerkasIrs);
mahasiswa.delete("/berkas/irs/deleted",VerifyOn.verifyUser, berkasIrs.deletedBerkasIrs);


module.exports = mahasiswa;
