const controller = {};

const tambahPeminjaman = require("../service/peminjaman/tambahPeminjaman");
const cek = require("../service/peminjaman/cekPeminjaman");

controller.tambahPeminjaman = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let data = req.body;
      tambahPeminjaman(conn, data, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

controller.cekPinjam = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let id = req.params.kode;
      cek(conn, id, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

module.exports = controller;
