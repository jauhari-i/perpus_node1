const express = require('express');
const app = express();

// middleware
const cekToken = require('../middleware/cekToken');
const cekAdmin = require('../middleware/cekAdmin');

// controller
const anggotaController = require('../controller/anggotaController');
const petugasController = require('../controller/petugasController');
const authController = require('../controller/authController');
const bukuController = require('../controller/bukuController');
const peminjamanController = require('../controller/peminjamanController');

app.post('/register/anggota', authController.registerAnggota);
app.post('/register/petugas', authController.registerPetugas);
app.post('/login', authController.login);

app.post('/anggota', [cekToken, cekAdmin], anggotaController.tambahAnggota);
app.get('/anggota', [cekToken, cekAdmin], anggotaController.semuaAnggota);
app.get('/anggota/:kode', [cekToken, cekAdmin], anggotaController.satuAnggota);
app.put('/anggota/:kode', [cekToken, cekAdmin], anggotaController.editAnggota);
app.delete('/anggota/:kode', [cekToken, cekAdmin], anggotaController.hapusAnggota);

app.post('/petugas', [cekToken, cekAdmin], petugasController.tambahPetugas);
app.get('/petugas', [cekToken, cekAdmin], petugasController.semuaPetugas);
app.get('/petugas/:kode', [cekToken, cekAdmin], petugasController.satuPetugas);
app.put('/petugas/:kode', [cekToken, cekAdmin], petugasController.editPetugas);
app.delete('/petugas/:kode', [cekToken, cekAdmin], petugasController.hapusPetugas);

app.post('/buku', [cekToken, cekAdmin], bukuController.tambahBuku);
app.get('/buku', [cekToken], bukuController.semuaBuku);
app.get('/buku/:kode', [cekToken], bukuController.satuBuku);
app.put('/buku/:kode', [cekToken, cekAdmin], bukuController.editBuku);
app.delete('/buku/:kode', [cekToken, cekAdmin], bukuController.hapusBuku);

app.post('/pinjam', [cekToken], peminjamanController.tambahPeminjaman);
app.get('/pinjam', [cekToken], peminjamanController.semuaPeminjaman);
app.get('/pinjam/:kode', [cekToken], peminjamanController.cekPinjam);
app.put('/pinjam/:kode/:status', [cekToken, cekAdmin], peminjamanController.editPeminjaman);
app.delete('/pinjam/:kode', [cekToken, cekAdmin], peminjamanController.deletePeminjaman);

module.exports = app;
