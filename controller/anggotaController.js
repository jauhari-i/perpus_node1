const controller = {};

// tambahAnggota
const tambah = require("../service/anggota/tambahAnggota");
const semuaAnggota = require("../service/anggota/semuaAnggota");
const satuAnggota = require("../service/anggota/satuAnggota");
const hapusAnggota = require("../service/anggota/hapusAnggota");
const editAnggota = require("../service/anggota/editAnggota");

controller.tambahAnggota = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let data = req.body;
      tambah(conn, data, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

controller.semuaAnggota = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      semuaAnggota(conn, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

controller.satuAnggota = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let id = req.params.kode;
      satuAnggota(conn, id, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

controller.editAnggota = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let id = req.params.kode;
      let data = req.body;
      editAnggota(conn, data, id, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

controller.hapusAnggota = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let id = req.params.kode;
      hapusAnggota(conn, id, (err, result) => {
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
