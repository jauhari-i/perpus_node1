const express = require("express");
const app = express();

// middleware
const cekToken = require("../middleware/cekToken");
const cekAdmin = require("../middleware/cekAdmin");

// controller
const anggotaController = require("../controller/anggotaController");
const petugasController = require("../controller/petugasController");
const authController = require("../controller/authController");
const bukuController = require("../controller/bukuController");
const peminjamanController = require("../controller/peminjamanController");

app.post("/register/anggota", authController.registerAnggota);
app.post("/register/petugas", authController.registerPetugas);
app.post("/login", authController.login);

app.post("/anggota", [cekToken], anggotaController.tambahAnggota);
app.get("/anggota", [cekToken], anggotaController.semuaAnggota);
app.get("/anggota/:kode", [cekToken], anggotaController.satuAnggota);
app.put("/anggota/:kode", [cekToken], anggotaController.editAnggota);
app.delete("/anggota/:kode", [cekToken], anggotaController.hapusAnggota);

app.post("/petugas", [cekToken], petugasController.tambahPetugas);
app.get("/petugas", [cekToken], petugasController.semuaPetugas);
app.get("/petugas/:kode", [cekToken], petugasController.satuPetugas);
app.put("/petugas/:kode", [cekToken], petugasController.editPetugas);
app.delete("/petugas/:kode", [cekToken], petugasController.hapusPetugas);

app.post("/buku", [cekToken], bukuController.tambahBuku);
app.get("/buku", [cekToken], bukuController.semuaBuku);
app.get("/buku/:kode", [cekToken], bukuController.satuBuku);
app.put("/buku/:kode", [cekToken], bukuController.editBuku);
app.delete("/buku/:kode", [cekToken], bukuController.hapusBuku);

app.post("/peminjaman", [cekToken], peminjamanController.tambahPeminjaman);

app.get("/pinjam/:kode", peminjamanController.cekPinjam);

module.exports = app;
